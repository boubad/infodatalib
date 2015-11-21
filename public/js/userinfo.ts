//userinfo.ts
//
import {IDocPersist,IDataService,IPerson,IDepartement, IAnnee, IUnite, IGroupe, ISemestre,
IMatiere, IEtudiant, IEnseignant, IAdministrator} from 'infodata';
import {LoginInfo} from './logininfo';
import {InfoElement} from './infoelement';

//
export class UserInfo extends InfoElement {
	//
	private _loginInfo: LoginInfo;
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
    private _m_busy: boolean;
	//
	constructor(){
		super();
		this._m_busy = false;
	}// constructor
	public get loginInfo(): LoginInfo {
		if ((this._loginInfo === undefined) || (this._loginInfo === null)){
			this._loginInfo = new LoginInfo();
		}
		return this._loginInfo;
	}
}// class UserInfo
