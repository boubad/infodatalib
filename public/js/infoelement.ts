// infoelement.ts
//
import {IInfoElement} from 'infodata';
//
export class InfoElement implements IInfoElement {
	private _id: string;
	//
	constructor(oMap?: any) {
		if ((oMap !== undefined) && (oMap !== null)) {
			if (oMap._id !== undefined) {
				this.id = oMap._id;
			}
			if (oMap.id !== undefined) {
				this.id = oMap.id;
			}
		}
	}
	public get id(): string {
		return (this._id !== undefined) ? this._id : null;
	}
	public set id(s: string) {
		this._id = this.check_string(s);
	}
	public get has_id(): boolean {
		return (this.id !== null);
	}
	protected check_string(s: string): string {
		let ss = ((s !== undefined) && (s !== null)) ? s.trim() : null;
		return ((ss !== null) && (ss.length > 0)) ? ss : null;
	}
	protected check_upper_string(s: string): string {
		let ss = ((s !== undefined) && (s !== null)) ? s.trim() : null;
		return ((ss !== null) && (ss.length > 0)) ? ss.toUpperCase() : null;
	}
}// class InfoElement
