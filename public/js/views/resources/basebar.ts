//basebar.ts
//
import {BaseModel} from '../../basemodel'
import {UserInfo} from '../../userinfo';
//
export class BaseBar<T extends BaseModel> {
	//
	private _model: T;
	//
	constructor() {
	}
	public bind(s: T) {
		this._model = s;
	}
	protected get parent():T {
      return (this._model !== undefined) ? this._model : null;
  }
	protected get info(): UserInfo {
		return ((this._model !== undefined) && (this !== null)) ? this._model.userInfo : null;
	}
	public get is_connected(): boolean {
		return ((this.info !== undefined) && (this.info !== null)) ? this.info.is_connected : false;
	}
	public get is_notconnected(): boolean {
		return (!this.is_connected);
	}
	public get fullname(): string {
		return ((this.info !== undefined) && (this.info !== null)) ? this.info.fullname : null;
	}
	public get has_url(): boolean {
		return ((this.info !== undefined) && (this.info !== null)) ? this.info.has_url : false;
	}
	public get url(): string {
		return ((this.info !== undefined) && (this.info !== null)) ? this.info.url : null;
	}
	public logout(): void {
		if ((this.info !== undefined) && (this.info !== null)) {
			this.info.logout();
			this.info.navigate_to('home');
		}
	}
}// class BaseBar
