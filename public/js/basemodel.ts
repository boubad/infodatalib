//basemodel.ts
import {InfoElement} from './infoelement';
import {LoginInfo} from './logininfo';
import {UserInfo} from './userinfo';
import {IDataService, IUIManager, IItemFactory, ISemestre, IBaseItem,
IDepartement, IGroupe, IUnite, IAnnee, IMatiere, IPerson, IInfoRouter} from 'infodata';
//
declare var window;
//
export class BaseModel extends InfoElement {
	
	private _userinfo: UserInfo;
	private _bInDep: boolean;
	private _bInAnnee: boolean;
	private _bInUnite: boolean;
	private _bInMatiere: boolean;
	private _bInGroupe: boolean;
	private _bInSemestre: boolean;
	private _baseUrl: string;
	private _title: string;
    private _errorMessage: string;
    private _infoMessage: string;
	private _anneeMinDate: string;
	private _anneeMaxDate: string;
	private _semestreMinDate: string;
	private _semestreMaxDate: string;
	//
	constructor(user: UserInfo) {
		super();
		this._userinfo = user;
	}// constructor
	//
	public get anneeMinDate(): string {
		return (this._anneeMinDate !== undefined) ? this._anneeMinDate : null;
	}
	public get anneeMaxDate(): string {
		return (this._anneeMaxDate !== undefined) ? this._anneeMaxDate : null;
	}
	public get semestreMinDate(): string {
		return (this._semestreMinDate !== undefined) ? this._semestreMinDate : null;
	}
	public get semestreMaxDate(): string {
		return (this._semestreMaxDate !== undefined) ? this._semestreMaxDate : null;
	}
	public get title(): string {
		return (this._title !== undefined) ? this._title : null;
	}
	public set title(s: string) {
		this._title = this.check_string(s);
	}
	public get error_message(): string {
		return (this._errorMessage !== undefined) ? this._errorMessage : null;
	}
	public set error_message(s: string) {
		this._errorMessage = this.check_string(s);
	}
	public get has_error_message(): boolean {
		return (this.error_message !== null) && (this.error_message.length > 0);
	}
	public get info_message(): string {
		return (this._infoMessage !== undefined) ? this._infoMessage : null;
	}
	public set info_message(s: string) {
		this._infoMessage = this.check_string(s);
	}
	public get has_info_message(): boolean {
		return (this.info_message !== null) && (this.info_message.length > 0);
	}
	protected clear_error(): void {
		this.info_message = null;
		this.error_message = null;
	}
	protected set_error(err: any) {
		this.error_message = this.convert_error(err);
	}
	public get baseUrl(): string {
		if ((this._baseUrl === undefined) || (this._baseUrl === null)) {
			let origin = window.location.origin;
			let pathname = window.location.pathname;
			this._baseUrl = origin + pathname.toLowerCase().replace("index.html", "");
			if (!this._baseUrl.endsWith("/")) {
				this._baseUrl = this._baseUrl + "/";
			}
		}
		return this._baseUrl;
	}
	public get images_dir(): string {
        return this.baseUrl + "images/";
	}
	//
	public get is_in_departement_change(): boolean {
		return ((this._bInDep !== undefined) && (this._bInDep !== null)) ? this._bInDep : false;
	}
	public get is_in_annee_change(): boolean {
		if (this.is_in_departement_change) {
			return true;
		}
		return ((this._bInAnnee !== undefined) && (this._bInAnnee !== null)) ? this._bInAnnee : false;
	}
	public get is_in_unite_change(): boolean {
		if (this.is_in_departement_change) {
			return true;
		}
		return ((this._bInUnite !== undefined) && (this._bInUnite !== null)) ? this._bInUnite : false;
	}
	public get is_in_semestre_change(): boolean {
		if (this.is_in_annee_change) {
			return true;
		}
		return ((this._bInSemestre !== undefined) && (this._bInSemestre !== null)) ? this._bInSemestre : false;
	}
	public get is_in_matiere_change(): boolean {
		if (this.is_in_unite_change) {
			return true;
		}
		return ((this._bInMatiere !== undefined) && (this._bInMatiere !== null)) ? this._bInMatiere : false;
	}
	public get is_in_groupe_change(): boolean {
		if (this.is_in_departement_change) {
			return true;
		}
		return ((this._bInGroupe !== undefined) && (this._bInGroupe !== null)) ? this._bInGroupe : false;
	}
	//
	protected post_update_departement(): Promise<boolean> {
		return Promise.resolve(true);
	}
	protected post_update_annee(): Promise<boolean> {
		return Promise.resolve(true);
	}
	protected post_update_unite(): Promise<boolean> {
		return Promise.resolve(true);
	}
	protected post_update_groupe(): Promise<boolean> {
		return Promise.resolve(true);
	}
	protected post_update_semestre(): Promise<boolean> {
		return Promise.resolve(true);
	}
	protected post_update_matiere(): Promise<boolean> {
		return Promise.resolve(true);
	}
	//
	public get userInfo(): UserInfo {
		return (this._userinfo !== undefined) ? this._userinfo : null;
	}
	public navigate_to(route: string, args?: any): any {
		if (this.userInfo !== null){
			this.userInfo.navigate_to(route,args);
		}
	}
	protected createUrl(blob: Blob): string {
        if (this.uiManager !== null) {
            return this.uiManager.createUrl(blob);
        } else {
            return null;
        }
    }
	protected confirm(s: string): boolean {
        if (this.uiManager !== null) {
            return this.uiManager.confirm(s);
        } else {
            return false;
        }
    }
	//
	public get loginInfo(): LoginInfo {
		return (this.userInfo !== null) ? this.userInfo.loginInfo : null;
	}
	public get uiManager(): IUIManager {
		return (this.userInfo !== null) ? this.userInfo.uiManager : null;
	}
	public get dataService(): IDataService {
		return this.loginInfo.dataService;
	}
	public get itemFactory(): IItemFactory {
		return this.loginInfo.itemfactory;
	}
	public get groupes(): IGroupe[] {
		return (this.userInfo !== null) ? this.userInfo.groupes : [];
	}
	public get matieres(): IMatiere[] {
		return (this.userInfo !== null) ? this.userInfo.matieres : [];
	}
	public get unites(): IUnite[] {
		return (this.userInfo !== null) ? this.userInfo.unites : [];
	}
	public get semestres(): ISemestre[] {
		return (this.userInfo !== null) ? this.userInfo.semestres : [];
	}
	public get annees(): IAnnee[] {
		return (this.userInfo !== null) ? this.userInfo.annees : [];
	}
    //
    public get departements(): IDepartement[] {
        return (this.loginInfo !== null) ? this.loginInfo.all_departements : [];
    }
	public get departement(): IDepartement {
		return (this.loginInfo !== null) ? this.loginInfo.departement : null;
    }
    public set departement(s: IDepartement) {
		if (this.is_in_departement_change) {
			return;
		}
		this._bInDep = true;
		this._anneeMinDate = null;
		this._anneeMaxDate = null;
		this._semestreMinDate = null;
		this._semestreMaxDate = null;
        let cur = (s !== undefined) ? s : null;
		this.userInfo.departement = cur;
		this.userInfo.post_update_departement().then((b1) => {
			if (this.annee !== null) {
				this._anneeMinDate = (this.annee.startDate !== null) ? this.annee.startDate.toISOString().substr(0, 10) : null;
				this._anneeMaxDate = (this.annee.endDate !== null) ? this.annee.endDate.toISOString().substr(0, 10) : null;
			}
			if (this.semestre !== null) {
				this._semestreMinDate = (this.semestre.startDate !== null) ? this.semestre.startDate.toISOString().substr(0, 10) : null;
				this._semestreMaxDate = (this.semestre.endDate !== null) ? this.semestre.endDate.toISOString().substr(0, 10) : null;
			}
			return this.userInfo.post_update_annee();
		}).then((b2) => {
			return this.userInfo.post_update_unite();
		}).then((vc) => {
			return this.post_update_departement();
		}).then((xx) => {
			return this.post_update_annee();
		}).then((bv) => {
			return this.post_update_unite();
		}).then((bvx) => {
			return this.post_update_groupe();
		}).then((by) => {
			return this.post_update_semestre();
		}).then((bvz) => {
			return this.post_update_matiere();
		}).then((hh) => {
			this._bInDep = false;
		})
	}
    //
    public get semestre(): ISemestre {
		return (this.userInfo !== null) ? this.userInfo.semestre : null;
    }
    public set semestre(s: ISemestre) {
		if (this.is_in_semestre_change) {
			return;
		}
		if (this.userInfo !== null) {
			this.userInfo.semestre = s;
			this._bInSemestre = true;
			this._semestreMinDate = null;
			this._semestreMaxDate = null;
			if (this.semestre !== null) {
				this._semestreMinDate = (this.semestre.startDate !== null) ? this.semestre.startDate.toISOString().substr(0, 10) : null;
				this._semestreMaxDate = (this.semestre.endDate !== null) ? this.semestre.endDate.toISOString().substr(0, 10) : null;
			}
			this.post_update_semestre().then((x) => {
				this._bInSemestre = false;
			})
		}
    }
    public get groupe(): IGroupe {
		return (this.userInfo !== null) ? this.userInfo.groupe : null;
    }
    public set groupe(s: IGroupe) {
		if (this.is_in_groupe_change) {
			return;
		}
		if (this.userInfo !== null) {
			this.userInfo.groupe = s;
			this._bInGroupe = true;
			this.post_update_groupe().then((x) => {
				this._bInGroupe = false;
			})
		}
    }
    //
    public get matiere(): IMatiere {
		return (this.userInfo !== null) ? this.userInfo.matiere : null;
    }
    public set matiere(s: IMatiere) {
		if (this.is_in_matiere_change) {
			return;
		}
		if (this.userInfo !== null) {
			this.userInfo.matiere = s;
			this._bInMatiere = true;
			this.post_update_matiere().then((x) => {
				this._bInMatiere = false;
			})
		}
	}
    public get annee(): IAnnee {
        return (this.userInfo !== null) ? this.userInfo.annee : null;
    }
    public set annee(s: IAnnee) {
		if (this.is_in_annee_change) {
			return;
		}
		if (this.userInfo !== null) {
			this.userInfo.annee = s;
			this._bInAnnee = true;
			this._anneeMinDate = null;
			this._anneeMaxDate = null;
			this._semestreMinDate = null;
			this._semestreMaxDate = null;
			if (this.annee !== null) {
				this._anneeMinDate = (this.annee.startDate !== null) ? this.annee.startDate.toISOString().substr(0, 10) : null;
				this._anneeMaxDate = (this.annee.endDate !== null) ? this.annee.endDate.toISOString().substr(0, 10) : null;
			}
			if (this.semestre !== null) {
				this._semestreMinDate = (this.semestre.startDate !== null) ? this.semestre.startDate.toISOString().substr(0, 10) : null;
				this._semestreMaxDate = (this.semestre.endDate !== null) ? this.semestre.endDate.toISOString().substr(0, 10) : null;
			}
			this.userInfo.post_update_annee().then((xx) => {
				return this.post_update_annee();
			}).then((cc) => {
				return this.post_update_semestre();
			}).then((zx) => {
				this._bInAnnee = false;
			})
		}
    }
    public get unite(): IUnite {
		return (this.userInfo !== null) ? this.userInfo.unite : null;
    }
    public set unite(s: IUnite) {
		if (this.is_in_unite_change) {
			return;
		}
		if (this.userInfo !== null) {
			this.userInfo.unite = s;
			this._bInUnite = true;
			this.post_update_unite().then((xx) => {
				this._bInUnite = false;
			})
		}
    }
    //
    public get person(): IPerson {
        return (this.userInfo !== null) ? this.userInfo.person : null;
    }// get person
	
    public login(username: string, spass: string): Promise<boolean> {
		if (this.userInfo !== null) {
			return this.userInfo.login(username, spass);
		} else {
			return Promise.resolve(false);
		}
    }// login
    public logout(): void {
		if (this.userInfo !== null) {
			this.userInfo.logout();
		}
    }// logout
    public get is_super(): boolean {
		return (this.loginInfo !== null) ? this.loginInfo.is_super : false;
    }
    public get is_admin(): boolean {
		return (this.loginInfo !== null) ? this.loginInfo.is_admin : false;
    }
    public get is_prof(): boolean {
        return (this.loginInfo !== null) ? this.loginInfo.is_prof : false;
    }
    public get is_etud(): boolean {
        return (this.loginInfo !== null) ? this.loginInfo.is_etud : false;
    }
    public get url(): string {
        return (this.person !== null) ? this.person.url : null;
    }
    public get has_url(): boolean {
        return (this.url !== null);
    }
    public get personid(): string {
        return (this.person !== null) ? this.person.id : null;
    }
    public get fullname(): string {
        return (this.person !== null) ? this.person.fullname : null;
    }
    public get is_connected(): boolean {
        return this.loginInfo.is_connected;
    }
    public get is_notconnected(): boolean {
        return (!this.is_connected);
    }
    //
	protected retrieve_one_avatar(item: IBaseItem): Promise<IBaseItem> {
        if ((item === undefined) || (item === null)) {
            return Promise.resolve(item);
        }
		if ((item.url !== undefined) && (item.url !== null)) {
			return Promise.resolve(item);
		}
		item.url = null;
		let id = item.avatarid;
		let docid = item.avatardocid();
		if ((id === undefined) || (id === null) || (docid === undefined) || (docid === null)) {
			return Promise.resolve(item);
		}
		let service = this.dataService;
		let man = this.uiManager;
		if ((service === undefined) || (service === null) || (man === undefined) || (man === null)) {
			return Promise.resolve(item);
		}
        return service.find_attachment(docid, id).then((b) => {
			if ((b !== undefined) && (b !== null)) {
				item.url = man.createUrl(b);
			}
			return item;
		}).catch((e) => {
			return item;
		});
    }// rerieve_one_avatar
    protected retrieve_avatars(items: IBaseItem[]): Promise<IBaseItem[]> {
        if ((items === undefined) || (items === null)) {
            return Promise.resolve([]);
        }
        if (items.length < 1) {
            return Promise.resolve([]);
        }
        let pp: Promise<IBaseItem>[] = [];
        for (let p of items) {
            let x = this.retrieve_one_avatar(p);
            pp.push(x);
        }// p
        return Promise.all(pp);
    }// retrive_avatars
}// class BaseModel