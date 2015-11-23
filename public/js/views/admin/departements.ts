//departements.ts
//
import {UserInfo} from '../../userinfo';
import {DepartementsModel} from '../../departementsmodel';
//
export class Departements extends DepartementsModel {
	//
	static inject() { return [UserInfo]; }
	//
    constructor(info: UserInfo) {
        super(info);
    }// constructor
}// class Departements
