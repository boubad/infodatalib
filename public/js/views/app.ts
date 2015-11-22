// app.ts
///
import {UserInfo} from '../userinfo';
import {Router, RouterConfiguration} from 'aurelia-router';
import {ETUDDETAIL_ROUTE, GRPEVTDETAIL_ROUTE, ETUDEVTDETAIL_ROUTE,
ETUDNOTES_ROUTE} from '../infoconstants';
import {IInfoRouter} from 'infodata';	
//
class AureliaInfoRouter implements IInfoRouter {
	private router: Router = null;
	constructor(rt: Router) {
		this.router = rt;
	}
	public navigate_to(xroute: string, opts?: any): any {
		if ((this.router !== undefined) && (this.router !== null)) {
			if ((xroute !== undefined) && (xroute !== null)) {
				let args: any = ((opts !== undefined) && (opts !== null)) ? opts : {};
				this.router.navigateToRoute(xroute, opts);
			}
		}
	}// navigate_to
}// class AureliaInfoRouter
//
export class App  {
    public router: Router;
	private userinfo:UserInfo;
	//
	static inject() { return [UserInfo]; }
    //
    constructor(user: UserInfo) {
		this.userinfo = user;
		this.router = null;
    }
    //
    public configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'InfoApp';
        config.map([
            { route: ['', 'home'], name: 'home', moduleId: './home', nav: true, title: 'Accueil' },
			{ route: 'consult', name: 'consult', moduleId: './consult/consult-router', nav: true, title: 'Consultation' },
			{ route: 'profil', name: 'profil', moduleId: './profil', nav: true, title: 'Profil' },
			{ route: 'admin', name: 'admin', moduleId: './admin/admin-router', nav: true, title: 'Admin' }
			/*
			{ route: 'synchro', name: 'synchro', moduleId: './synchro-view', nav: true, title: 'Synchro' }
			{ route: 'etudnotes/:id', name: 'etudnotes', moduleId: './consult/etudiant-notes', nav: false },
			{ route: 'etudevt/:id', name: ETUDEVTDETAIL_ROUTE, moduleId: './consult/etudeventdetail', nav: false },
			{ route: 'etud/:id', name: ETUDDETAIL_ROUTE, moduleId: './consult/etudiants-sumary', nav: false },
			{ route: 'grpevt/:id', name: 'grpevt', moduleId: './consult/groupeeventdetail', nav: false },
			{ route: 'attacheddoc/:id', name: 'attacheddoc', moduleId: './attacheddocs', nav: false }
			*/
        ]);
        this.router = router;
		if ((this.userinfo !== undefined) && (this.userinfo !== null)) {
			this.userinfo.router = new AureliaInfoRouter(router);
		}
    }
}
