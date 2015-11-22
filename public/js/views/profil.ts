//profil.ts
//
import {UserInfo} from '../userinfo';
import {ProfilModel} from '../profilmodel';
//
//
export class Profil extends ProfilModel {
	//
	public static inject(){return [UserInfo];}
  //
  constructor(info: UserInfo) {
		super(info);
  }
}// class Profil
