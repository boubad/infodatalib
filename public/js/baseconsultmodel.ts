//baseconsultmodel.ts
//
import {UserInfo} from './userinfo';
import {BaseModel} from './basemodel';
import {FileDesc} from './filedesc';
import {IBaseItem, IFileDesc} from 'infodata';
//
export class BaseConsultViewModel<T extends IBaseItem> extends BaseModel {
	//
	private _items: T[];
	private _current_item: T;

	protected fileDesc: IFileDesc = null;
	private _item_model: T = null;
	private _page_size: number = 16;
	private _current_page: number = 0;
	private _pages_count: number = 0;
	private _allIds: string[] = [];
	private _pageStatus: string = null;
	//
	constructor(info: UserInfo) {
		super(info);
		this.fileDesc = new FileDesc();
	}// constructor
	
	protected create_item(): T {
		return null;
	}
	protected prepare_model(): any {
		return {};
	}// prepare_model
	public get items(): T[] {
		return ((this._items !== undefined) && (this._items !== null)) ? this._items : [];
	}
	public set items(s: T[]) {
		this._items = s;
	}
	public get modelItem(): T {
		if ((this._item_model === undefined) || (this._item_model === null)) {
			this._item_model = this.create_item();
		}
		return this._item_model;
	}
	public get allIds(): string[] {
		if ((this._allIds === undefined) || (this._allIds === null)) {
			this._allIds = [];
		}
		return this._allIds;
	}
	//
	protected post_change_item(): Promise<any> {
		return Promise.resolve(true);
	}// post_change_item
	public get currentItem(): T {
		if ((this._current_item === undefined) || (this._current_item === null)) {
			this._current_item = this.create_item();
		}
		return this._current_item;
	}
	public set currentItem(s: T) {
		this._current_item = s;
		this.fileDesc.clear();
		let x = this.currentItem;
		if ((x.avatarid !== null) && (x.avatardocid() !== null) &&
			(x.url === null)) {
			this.retrieve_one_avatar(x).then((x) => {
				this.post_change_item();
			});
		} else {
			this.post_change_item();
		}
	}
	//
	protected get_all_ids(): Promise<string[]> {
		let sel: any = this.prepare_model();
		return this.dataService.query_ids(sel);
	}// get_all_ids
	//
	public get canShowForm(): boolean {
		return this.is_refresh();
	}
	protected is_refresh(): boolean {
		return true;
	}
	public refresh(): Promise<any> {
		this.clear_error();
		let model = this.modelItem;
		if (this.items.length > 0) {
			for (let elem of this.items) {
				let x = elem.url;
				if (x !== null) {
					this.uiManager.revokeUrl(x);
					elem.url = null;
				}
			}// elem
		}
		this.items = [];
		if (!this.is_refresh()) {
			return Promise.resolve(true);
		}
		let nbItems = this.allIds.length;
		if (nbItems < 1){
			return Promise.resolve(true);
		}
		let nc = this.itemsPerPage;
		let istart = (this.currentPage - 1) * nc;
		if (istart < 0) {
			istart = 0;
		}
		let iend = istart + nc - 1;
		if (iend >= nbItems) {
			iend = nbItems - 1;
		}
		let xids: string[] = [];
		for (let i = istart; i <= iend; ++i) {
			xids.push(this.allIds[i]);
		}
		let oldid: string = this.currentItem.id;
		return this.dataService.get_items_array(xids).then((rr: T[]) => {
			let rx = ((rr !== undefined) && (rr !== null)) ? rr : [];
			return this.retrieve_avatars(rx);
		}).then((xx: T[]) => {
			this.items = [];
			for (let xc of xx) {
				this.add_item_to_array(this.items, xc);
			}
			let p = this.sync_array(this.items, oldid);
			this.currentItem = p;
			return true;
		});
	}// refresh
	public get pageStatus(): string {
		return (this.pagesCount > 1) ?
			('Page ' + this.currentPage + ' sur ' + this.pagesCount) : null;
	}
	protected prepare_refresh(): void {
		this._allIds = [];
		this._pages_count = 0;
		this._current_page = 0;
		this.items = [];
	}
	public refreshAll(): Promise<any> {
		this.prepare_refresh();
		if (!this.is_refresh()) {
			return Promise.resolve(true);
		}
		let nc = this.itemsPerPage;
		this.clear_error();
		return this.get_all_ids().then((ids) => {
			this._allIds = ((ids !== undefined) && (ids !== null)) ? ids : [];
			let nt = this._allIds.length;
			let np = Math.floor(nt / nc);
			if ((np * nc) < nt) {
				++np;
				this.pagesCount = np;
			}
			return this.refresh();
		}).catch((err) => {
			this.set_error(err);
			return false;
		})
	}// refreshAll
	public get hasItems(): boolean {
		return (this.allIds.length > 0);
	}
	public get hasPages(): boolean {
		return (this.pagesCount > 1);
	}
	public get pagesCount(): number {
		return this._pages_count;
	}
	public set pagesCount(s: number) {
		this._pages_count = ((s !== undefined) && (s !== null) && (s >= 0)) ? s : 0;
	}
	public get itemsPerPage(): number {
		return this._page_size;
	}
	public set itemsPerPage(s: number) {
		let n = this.check_number(s);
		if ((n !== null) && (n > 0) && (n != this._page_size)) {
			this._page_size = n;
			this.refreshAll();
		}
	}
	public get currentPage(): number {
		return (this._current_page + 1);
	}
	public set currentPage(s: number) {
		let n = this.check_number(s);
		if ((n !== null) && (n > 0)) {
			--n;
			if ((n >= 0) && (n != this._current_page)) {
				this._current_page = n;
				this.refresh();
			}
		}// n
	}// set currentPage
	public get canPrevPage(): boolean {
		return (this._current_page > 0);
	}
	public set canPrevPage(s: boolean) { }
	public get canNextPage(): boolean {
		return ((this._current_page + 1) < this._pages_count);
	}
	public set canNextPage(s: boolean) { }
	public firstPage(): void {
		if (this.currentPage > 1) {
			this.currentPage = 1;
		}
	}
	public prevPage(): void {
		if (this.currentPage > 1) {
			let n = this.currentPage - 1;
			this.currentPage = n;
		}
	}
	public nextPage(): void {
		let n = this.currentPage;
		if (n < this._pages_count) {
			this.currentPage = n + 1;
		}
	}// nextPage
	public lastPage(): void {
		let n = this.currentPage;
		if (n < this._pages_count) {
			this.currentPage = this._pages_count;
		}
	}
	protected perform_activate(): Promise<any> {
		if (this._item_model === null) {
			this._item_model = this.create_item();
		}
		if (this._current_item === null) {
			this._current_item = this.create_item();
		}
		if (this.fileDesc === null) {
			this.fileDesc = new FileDesc();
		} else {
			this.fileDesc.clear();
		}
		return Promise.resolve(true);
	}
	public activate(params?: any, config?: any, instruction?: any): any {
		return this.perform_activate().then((x) => {
			return this.refreshAll();
		});
	}// activate
}// class BaseConsultViewModel
