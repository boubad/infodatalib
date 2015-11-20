//dataservice.d.ts
/// <reference path='./infodata.d.ts' />
/// <reference path='./docpersist.d.ts' />
//
declare module 'infodata' {
	//
	export interface IDataService {
        service: IDocPersist;
        itemFactory: IItemFactory;
        name: string;
        is_valid: boolean;
		//
		is_online: () => Promise<boolean>;
        find_item_by_id: (id: string, bAttach?: boolean) => Promise<IBaseItem>;
        save_item: (p: IBaseItem) => Promise<boolean>;
        save_personitem: (p: IPersonItem) => Promise<boolean>;
        load_item: (p: IBaseItem) => Promise<boolean>;
        remove_item: (p: IBaseItem) => Promise<boolean>;
        maintains_items: (pp: IBaseItem[], bDelete?: boolean) => Promise<boolean[]>;
        maintains_personitems: (pp: IPersonItem[]) => Promise<boolean[]>;
        get_ids: (startkey: string, endkey?: string) => Promise<string[]>;
        get_items_range: (startkey: string, endkey: string, skip?: number, limit?: number) => Promise<IBaseItem[]>;
        get_items_all: (startkey: string, endkey: string) => Promise<IBaseItem[]>;
        get_items_array: (ids: string[]) => Promise<IBaseItem[]>;
        remove_all_items: (startKey: string, endKey: string) => Promise<boolean>;
        exists_item: (id: string) => Promise<string>;
        //
       
        find_attachment: (docid: string, attachmentId: string) => Promise<Blob>;
        maintains_attachment: (docid: string, attachmentId: string,
            attachmentData: Blob, attachmentType: string) => Promise<boolean>;
        remove_attachment: (docid: string, attachmentId: string) => Promise<boolean>;
        //
        get_departements: (skip?: number, limit?: number) => Promise<IDepartement[]>;
        get_person_by_username: (suser: string) => Promise<IPerson>;
        //
        replicate_all: (from: string, to: string) => Promise<any>;
        replicate_person: (pPers: IPerson, from: string, to: string) => Promise<any>;
        replicate_to: (to: string) => Promise<any>;
        replicate_person_to: (pPers: IPerson, to: string) => Promise<any>;
        replicate_from: (from: string) => Promise<any>;
        replicate_person_from: (pPers: IPerson, from: string) => Promise<any>;
        //
        check_super_admin: () => Promise<boolean>;
        //
        query_items: (type: string, selector?: any, skip?: number, limit?: number) => Promise<IBaseItem[]>;
        query_by_template: (temp: IBaseItem, skip?: number, limit?: number) => Promise<IBaseItem[]>;
        query_ids: (selector?: any, skip?: number, limit?: number) => Promise<string[]>;
    }// interface IDataService
}
//