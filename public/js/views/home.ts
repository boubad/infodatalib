//home.ts
import {HomeModel} from '../homemodel';
import {UserInfo} from '../userinfo';
//
export class Home extends HomeModel {
	//
	static inject() { return [UserInfo] }
	//
	constructor(info: UserInfo) {
		super(info);
	}
}// class Home

