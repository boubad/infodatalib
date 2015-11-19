// infoservice.d.ts
//
/// <reference path='./infodata.d.ts' />
//
declare module 'infodata' {
	//
    export interface IMenuDesc {
        id: string;
        display: string;
        text?: string;
        description?: string;
        url?: string;
    }// interface IMenuDesc
    //
    export interface IDocPersist {
        name: string;
        exists_doc: (docid: string) => Promise<string>;
        read_doc: (docid: string, bAttachments?: boolean, bMeta?: Boolean) => Promise<any>;
        insert_doc: (doc: any) => Promise<any>;
        update_doc: (doc: any) => Promise<any>;
        remove_doc: (doc: any) => Promise<any>;
        bulk_maintains: (docs: any[]) => Promise<any>;
        docs_ids_range: (startkey: string, endkey: string) => Promise<string[]>;
        docs_read_range: (startkey: string, endkey: string, skip?: number, limit?: number) => Promise<any[]>;
        docs_array: (ids: string[]) => Promise<any[]>;
        remove_all_items: (startKey: string, endKey: string) => Promise<any>;
        isOnline: () => Promise<boolean>;
        find_attachment: (docid: string, attachmentId: string) => Promise<Blob>;
        maintains_attachment: (docid: string, attachmentId: string,
            attachmentData: Blob, attachmentType: string) => Promise<any>;
        remove_attachment: (docid: string, attachmentId: string) => Promise<any>;
        //
        replicate: (from: string, to: string, ids?: string[]) => Promise<boolean>;
        //
        create_one_index: (field: string) => Promise<boolean>;
        create_indexes: (fields: string[]) => Promise<boolean>;
        create_all_indexes: (fields: string[]) => Promise<boolean[]>;
        find_docs: (temp: any, fields?: string[], skip?: number, limit?: number) => Promise<any[]>;
    }// interface IIDocPersist
    //
    export interface IDataService {
        service: IDocPersist;
        itemFactory: IItemFactory;
        name: string;
        is_valid: boolean;
		//
        get_groupe_parents: (p: IGroupe) => Promise<IGroupe[]>;
        get_etudiantevent_etudaffectation: (e: IEtudiantEvent) => Promise<IEtudiantAffectation>;
        get_etudiantevent_groupeevent: (e: IEtudiantEvent) => Promise<IGroupeEvent>;
        get_groupeevent_profaffectation: (a: IGroupeEvent) => Promise<IEnseignantAffectation>;
        get_profaffectation_matiere: (a: IEnseignantAffectation) => Promise<IMatiere>;
        get_profaffectation_enseignant: (a: IEnseignantAffectation) => Promise<IEnseignant>;
        get_etudaffectation_etudiant: (a: IEtudiantAffectation) => Promise<IEtudiant>;
        get_affectation_semestre: (a: IAffectation) => Promise<ISemestre>;
        get_affectation_groupe: (a: IAffectation) => Promise<IGroupe>;
        get_matiere_unite: (a: IMatiere) => Promise<IUnite>;
        get_semestre_annee: (a: ISemestre) => Promise<IAnnee>;
        get_groupe_departement: (a: IGroupe) => Promise<IDepartement>;
        get_annee_departement: (a: IAnnee) => Promise<IDepartement>;
        get_unite_departement: (a: IUnite) => Promise<IDepartement>;
        //
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
        isOnline: () => Promise<boolean>;
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
        get_departement_annees: (p: IDepartement) => Promise<IAnnee[]>;
        get_departement_groupes: (p: IDepartement) => Promise<IGroupe[]>;
        get_departement_unites: (p: IDepartement) => Promise<IUnite[]>;
        get_unite_matieres: (p: IUnite) => Promise<IMatiere[]>;
        get_annee_semestres: (p: IAnnee) => Promise<ISemestre[]>;
        //
        check_super_admin: () => Promise<boolean>;
        //
        get_semestre_matiere_enseignantaffectations: (sem: ISemestre, mat: IMatiere) => Promise<IEnseignantAffectation[]>;
        get_semestre_groupe_etudaffectations: (sem: ISemestre, grp: IGroupe) => Promise<IEtudiantAffectation[]>;
        get_semestre_groupeevents: (sem: ISemestre, skip?: number, limit?: number) => Promise<IGroupeEvent[]>;
        get_semestre_matiere_groupeevents: (sem: ISemestre, mat: IMatiere, skip?: number, limit?: number) => Promise<IGroupeEvent[]>;
        get_groupeevent_events: (gvt: IGroupeEvent, genre?: string) => Promise<IEtudiantEvent[]>;
        get_semestre_matiere_etudevents: (sem: ISemestre, mat: IMatiere, genre?: string) => Promise<IEtudiantEvent[]>;
        get_semestre_etudevents: (sem: ISemestre, genre?: string) => Promise<IEtudiantEvent[]>;
        //
        check_groupeevent_notes: (gvt: IGroupeEvent) => Promise<boolean>;
        get_etudiant_events: (pEtud: IEtudiant) => Promise<IEtudiantEvent[]>;
        //
        query_items: (type: string, selector?: any, skip?: number, limit?: number) => Promise<IBaseItem[]>;
        query_by_template: (temp: IBaseItem, skip?: number, limit?: number) => Promise<IBaseItem[]>;
        query_ids: (selector?: any, skip?: number, limit?: number) => Promise<string[]>;
    }// interface IDataService
    //
    export interface IInfoMessage {
        type: string;
        categ?: string;
        value?: any;
        info?: string;
        source?: any;
        error?: string;
        tag?: string;
    }// interface IInfoMessage
    export interface IUIManager {
        createUrl: (data: Blob) => string;
        revokeUrl: (s: string) => void;
        confirm: (question: string) => boolean;
    }// interface IUIManager
    export interface IObjectStore {
        get_value: (key: string) => string;
        store_value: (key: string, value: string) => any;
        remove_value: (key: string) => any;
        clear: () => any;
    }// interface IObjectStore
    export interface IFileDesc {
        name: string;
        type: string;
        data: Blob;
        url: string;
        //
        has_url: boolean;
        is_storeable: boolean;
        clear: () => void;
        changed: (evt: any) => any;
		changed_misc: (evt: any) => any;
        remove_url: () => string;
    }// interface IFileDesc
    export interface IMessageManager {
        publish: (type: string, payload: any) => void;
        subscribe: (type: string, callback: (payload: any) => any) => void;
        unsubscribe: (type: string) => void;
    }
    export interface ILogManager {
        error: (s: string) => void;
        warn: (s: string) => void;
        info: (s: string) => void;
        debug: (s: string) => void;
    }

    export interface ITransformArray {
		read_file: (file: File) => Promise<any[]>;
        transform_map: (oMap: any) => IBaseItem;
        transform_file: (file: File, stype: string) => Promise<any>;
    }
	export interface IInfoRouter {
		navigate_to: (xroute: string, opts?: any) => any;
	}
}// module infodaya