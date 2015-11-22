//userinfo.ts
//
import {IItemFactory, IDataService, IPerson, IDepartement, IAnnee, IUnite, IGroupe, ISemestre,
IMatiere,  IUIManager,IInfoRouter} from 'infodata';
import {LoginInfo} from './logininfo';
import {InfoElement} from './infoelement';
import {UIManager} from './uimanager';

//
export class UserInfo extends InfoElement {
	//
	private _router: IInfoRouter;
	private _loginInfo: LoginInfo;
	private _uimanager: IUIManager;
	//
    private _annees: IAnnee[];
    private _semestres: ISemestre[];
    private _unites: IUnite[];
    private _matieres: IMatiere[];
    private _groupes: IGroupe[];
    //
    private _annee: IAnnee;
    private _unite: IUnite;
    private _semestre: ISemestre;
    private _matiere: IMatiere;
    private _groupe: IGroupe;
    //
	constructor() {
		super();
	}// constructor
	public get router(): IInfoRouter {
		return (this._router !== undefined) ? this._router : null;
	}
	public set router(s: IInfoRouter) {
		this._router = s;
	}
	public navigate_to(route: string, args?: any): any {
		if ((this.router !== null) && (route !== undefined) && (route !== null)) {
			this.router.navigate_to(route, args);
		}
	}
	public get loginInfo(): LoginInfo {
		if ((this._loginInfo === undefined) || (this._loginInfo === null)) {
			this._loginInfo = new LoginInfo();
		}
		return this._loginInfo;
	}
	public get uiManager(): IUIManager {
		if ((this._uimanager === undefined) || (this._uimanager === null)) {
			this._uimanager = new UIManager();
		}
		return this._uimanager;
	}
	public get dataService(): IDataService {
		return this.loginInfo.dataService;
	}
	public get itemFactory(): IItemFactory {
		return this.loginInfo.itemfactory;
	}
	public get groupes(): IGroupe[] {
		return ((this._groupes !== undefined) && (this._groupes !== null)) ? this._groupes : [];
	}
	public get matieres(): IMatiere[] {
		return ((this._matieres !== undefined) && (this._matieres !== null)) ? this._matieres : [];
	}
	public get unites(): IUnite[] {
		return ((this._unites !== undefined) && (this._unites !== null)) ? this._unites : [];
	}
	public get semestres(): ISemestre[] {
		return ((this._semestres !== undefined) && (this._semestres !== null)) ? this._semestres : [];
	}
	public get annees(): IAnnee[] {
		return ((this._annees !== undefined) && (this._annees !== null)) ? this._annees : [];
	}
    //
    public get departements(): IDepartement[] {
        return (this.loginInfo.all_departements !== null) ? this.loginInfo.all_departements : [];
    }
	public get departement(): IDepartement {
		return this.loginInfo.departement;
    }
    public set departement(s: IDepartement) {
        let cur = (s !== undefined) ? s : null;
		this.loginInfo.departement = cur;
	}
    //
    public get semestre(): ISemestre {
        return (this._semestre !== undefined) ? this._semestre : null;
    }
    public set semestre(s: ISemestre) {
		this._semestre = (s !== undefined) ? s : null;
    }
    public get groupe(): IGroupe {
        return (this._groupe !== undefined) ? this._groupe : null;
    }
    public set groupe(s: IGroupe) {
		this._groupe = (s !== undefined) ? s : null;
    }
    //
    public get matiere(): IMatiere {
        return (this._matiere !== undefined) ? this._matiere : null;
    }
    public set matiere(s: IMatiere) {
		this._matiere = (s !== undefined) ? s : null;
    }
    public get annee(): IAnnee {
        return (this._annee !== undefined) ? this._annee : null;
    }
    public set annee(s: IAnnee) {
		this._annee = (s !== undefined) ? s : null;
    }
    public get unite(): IUnite {
        return (this._unite !== undefined) ? this._unite : null;
    }
    public set unite(s: IUnite) {
		this._unite = (s !== undefined) ? s : null;
    }
    //
    public get person(): IPerson {
        return this.loginInfo.person;
    }// get person
	private clear_data(): void {
        if ((this.person !== null) && (this.person.url !== null)) {
            this.uiManager.revokeUrl(this.person.url);
			this.person.url = null;
        }
        this.loginInfo.disconnect();
        this._annees = [];
        this._semestres = [];
        this._unites = [];
        this._matieres = [];
        this._groupes = [];
		this._annee = null;
		this._semestre = null;
		this._unite = null;
		this._matiere = null;
		this._groupe = null;
    }// clear_data
    public login(username: string, spass: string): Promise<boolean> {
        this.clear_data();
        let bRet: boolean = false;
		let pPers: IPerson = null;
        return this.loginInfo.login(username, spass).then((b) => {
			pPers = this.person;
			let id = (pPers !== null) ? pPers.id : null;
			let avid = (pPers !== null) ? pPers.avatarid : null;
			return this.dataService.find_attachment(id, avid);
		}).then((data) => {
			if ((data !== undefined) && (data !== null)) {
				pPers.url = this.uiManager.createUrl(data);
			}
			bRet = (pPers !== null);
			return bRet;
		}).catch((err) => {
			return bRet;
		});
    }// login
    public logout(): void {
        this.clear_data();
    }// logout
    public get is_super(): boolean {
		return this.loginInfo.is_super;
    }
    public get is_admin(): boolean {
		return this.loginInfo.is_admin;
    }
    public get is_prof(): boolean {
        return this.loginInfo.is_prof;
    }
    public get is_etud(): boolean {
        return this.loginInfo.is_etud;
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
    public post_update_departement(): Promise<any> {
        //
        let xannees: IAnnee[] = [];
        let xunites: IUnite[] = [];
        let xgroupes: IGroupe[] = [];
        //
		let dep = this.departement;
        if (dep === null) {
            this._annees = xannees;
            this._unites = xunites;
            this._groupes = xgroupes;
			this.annee = null;
			this.unite = null;
			this.groupe = null;
            return Promise.resolve(true);
        }
        let pPers: IPerson = this.person;
        if (pPers === null) {
            this._annees = xannees;
            this._unites = xunites;
            this._groupes = xgroupes;
			this.annee = null;
			this.unite = null;
			this.groupe = null;
            return Promise.resolve(true);
        }
		let depid: string = dep.id;
		let sel: any = { departementid: depid };
        if (this.is_super || this.is_admin) {
            let service = this.dataService;
			let model = this.itemFactory.create_annee();
			let stype: string = model.type();
			return this.dataService.query_items(stype, sel).then((dd: IAnnee[]) => {
				xannees = ((dd !== undefined) && (dd !== null)) ? dd : [];
				let model = this.itemFactory.create_groupe();
				let stype: string = model.type();
				return this.dataService.query_items(stype, sel);
			}).then((gg: IGroupe[]) => {
				xgroupes = ((gg !== undefined) && (gg !== null)) ? gg : [];
				let model = this.itemFactory.create_unite();
				let stype: string = model.type();
				return this.dataService.query_items(stype, sel);
			}).then((uu: IUnite[]) => {
				xunites = ((uu !== undefined) && (uu !== null)) ? uu : [];
				this._annees = xannees;
				this._unites = xunites;
				this._groupes = xgroupes;
				if (this._annees.length > 0) {
					this.annee = this._annees[0];
				} else {
					this.annee = null;
				}
				if (this._unites.length > 0) {
					this.unite = this._unites[0];
				} else {
					this.unite = null;
				}
				if (this._groupes.length > 0) {
					this.groupe = this._groupes[0];
				} else {
					this.groupe = null;
				}
				return true;
			});
		} else {
			if (this.loginInfo.all_annees !== null) {
				for (let x of this.loginInfo.all_annees) {
					if (x.departementid == depid) {
						xannees.push(x);
					}
				}//x
			}
			if (this.loginInfo.all_unites !== null) {
				for (let x of this.loginInfo.all_unites) {
					if (x.departementid == depid) {
						xunites.push(x);
					}
				}//x
			}
			if (this.loginInfo.all_groupes !== null) {
				for (let x of this.loginInfo.all_groupes) {
					if (x.departementid == depid) {
						xgroupes.push(x);
					}
				}//x
			}
			this._unites = xunites;
			this._annees = xannees;
			this._groupes = xgroupes;
			if (this._annees.length > 0) {
				this.annee = this._annees[0];
			} else {
				this.annee = null;
			}
			if (this._unites.length > 0) {
				this.unite = this._unites[0];
			} else {
				this.unite = null;
			}
			if (this._groupes.length > 0) {
				this.groupe = this._groupes[0];
			} else {
				this.groupe = null;
			}
			return Promise.resolve(true);
		}
    }// post_update_departement
    public post_update_annee(): Promise<any> {
		let xsemestres: ISemestre[] = [];
		let an = this.annee;
		if (an === null) {
			this._semestres = xsemestres;
			this.semestre = null;
			return Promise.resolve(true);
		}
        let anneeid = an.id;
		let pPers: IPerson = this.person;
		if (pPers === null) {
			this._semestres = xsemestres;
			this.semestre = null;
			return Promise.resolve(true);
		}
        if (this.is_admin || this.is_super) {
			let sel:any = {anneeid:anneeid};
			let model = this.itemFactory.create_semestre();
			let stype:string = model.type();
			return this.dataService.query_items(stype,sel).then((dd:ISemestre[]) => {
				this._semestres = ((dd !== undefined) && (dd !== null)) ? dd : [];
				if (this._semestres.length > 0) {
					this.semestre = this._semestres[0];
				} else {
					this.semestre = null;
				}
				return true;
			});
		} else if (this.loginInfo.all_semestres !== null) {
			for (let x of this.loginInfo.all_semestres) {
				if (x.anneeid == anneeid) {
					xsemestres.push(x);
				}
			}//x
			this._semestres = xsemestres;
			if (this._semestres.length > 0) {
				this.semestre = this._semestres[0];
			} else {
				this.semestre = null;
			}
			return Promise.resolve(true);
		}
    }// post_change_annee
    public post_update_unite(): Promise<any> {
		let xmatieres: IMatiere[] = [];
		let un = this.unite;
		if (un === null) {
			this._matieres = xmatieres;
			this.matiere = null;
			return Promise.resolve(true);
		}
        let uniteid = un.id;
		let pPers: IPerson = this.person;
		if (pPers === null) {
			this._matieres = xmatieres;
			this.matiere = null;
			return Promise.resolve(true);
		}
        if (this.is_admin || this.is_super) {
			let sel:any = {uniteid:uniteid};
			let model = this.itemFactory.create_matiere();
			let stype:string = model.type();
			return this.dataService.query_items(stype,sel).then((dd:IMatiere[]) => {
				this._matieres = ((dd !== undefined) && (dd !== null)) ? dd : [];
				if (this._matieres.length > 0) {
					this.matiere = this._matieres[0];
				} else {
					this.matiere = null;
				}
				return true;
			});
		} else if (this.loginInfo.all_matieres !== null) {
			for (let x of this.loginInfo.all_matieres) {
				if (x.uniteid == uniteid) {
					xmatieres.push(x);
				}
			}//x
			this._matieres = xmatieres;
			if (this._matieres.length > 0) {
				this.matiere = this._matieres[0];
			} else {
				this.matiere = null;
			}
			return Promise.resolve(true);
		}
    }// post_change_unite
}// class UserInfo
