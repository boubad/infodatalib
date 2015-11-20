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
	protected  format_name(s: string) {
        var ss: string = ((s !== undefined) && (s !== null)) ? s.trim() : null;
        if ((ss !== null) && (ss.length > 0)) {
            if (ss.length > 1) {
                ss = ss.substr(0, 1).toUpperCase() + ss.substr(1);
            } else {
                ss = ss.toUpperCase();
            }
        }// ss
      return ss;
    }
	 protected string_to_date(s: any): Date {
        let dRet: Date = null;
        if ((s !== undefined) && (s !== null)) {
            try {
                let t = Date.parse(s.toString());
                if (!isNaN(t)) {
                    dRet = new Date(t);
                }
            } catch (e) {
            }
        }
        return dRet;
    }
    protected date_to_string(d: Date): string {
        let sRet: string = null;
        if ((d !== undefined) && (d !== null)) {
            try {
                let t = Date.parse(d.toString());
                if (!isNaN(t)) {
                    let dd = new Date(t);
                    sRet = dd.toISOString().substr(0, 10);
                }
            } catch (e) { }
        }
        return sRet;
    }
    protected number_to_string(n: number): string {
        return ((n !== undefined) && (n !== null)) ? n.toString() : null;
    }
    protected string_to_number(s: any): number {
        let dRet: number = null;
        if ((s !== undefined) && (s !== null)) {
            try {
                let x = parseFloat(s);
                if (!isNaN(x)) {
                    dRet = x;
                }
            } catch (e) { }
        }// s
        return dRet;
    }
    protected check_date(d: any): Date {
        return this.string_to_date(d);
    } // check_date
    protected  check_number(s: any): number {
        return this.string_to_number(s);
    }
	//
    protected format_note(s: number): number {
        return (Math.floor(s * 100.0 + 0.5)) / 100.0;
    }
	protected  create_username(slast: string, sfirst: string): string {
        let sRet: string = null;
        if ((slast !== undefined) && (slast !== null)) {
            let us = slast.trim().toLowerCase();
            if (us.length > 5) {
                sRet = us.substr(0, 5).trim();
            } else {
                sRet = us;
            }
        }
        if ((sfirst !== undefined) && (sfirst !== null)) {
            let us = sfirst.trim().toLowerCase();
            if (us.length > 3) {
                sRet = sRet + us.substr(0, 3).trim();
            } else {
                sRet = sRet + us;
            }
        }
        if ((sRet !== null) && (sRet.length < 1)) {
            sRet = null;
        }
        return sRet;
    }// create_username
	protected create_date_key(d:Date) : string {
		let sRet:string = null;
		if ((d !== undefined) && (d !== null)){
			let ss = d.toISOString().substr(0,10);
			sRet = ss.replace("-","");
		}
		return sRet;
	}
	protected sync_array<T extends IInfoElement>(cont: T[], id: string): T {
        let pSel: T = null;
        if ((cont !== undefined) && (cont !== null) && (cont.length > 0)) {
            if ((id !== undefined) && (id !== null)) {
                for (let x of cont) {
                    if ((x !== null) && (x.id == id)) {
                        pSel = x;
                        break;
                    }
                }// x
            }// id
            if (pSel === null) {
                pSel = cont[0];
            }
        }// cont
        return pSel;
    }// sync_departements
	protected add_item_to_array<T extends IInfoElement>(cont: T[], item: T): boolean {
		if ((cont == undefined) || (cont == null)) {
			cont = [];
		}
        if ((item === undefined) || (item === null)) {
            return false;
        }
		let id: string = item.id;
		if ((id === undefined) || (id === null)) {
            return false;
        }
        let bFound = false;
        for (let p of cont) {
            if (p.id == id) {
                bFound = true;
            }
        }// p
        if (!bFound) {
            cont.push(item);
            return true;
        }
        return false;
    }// add_id_to_array
    protected  add_id_to_array(cont: string[], id: string): boolean {
		if ((cont == undefined) || (cont == null)) {
			cont = [];
		}
        if ((id === undefined) || (id === null)) {
            return false;
        }
        let bFound = false;
        for (let p of cont) {
            if (p == id) {
                bFound = true;
            }
        }// p
        if (!bFound) {
            cont.push(id);
            return true;
        }
        return false;
    }// add_id_to_array
	protected  add_array_to_array(cont: string[], oAr: string[]): void {
		if ((oAr !== undefined) && (oAr !== null)) {
			let n = oAr.length;
			for (let i = 0; i < n; ++i) {
				this.add_id_to_array(cont, oAr[i]);
			}// i
		}// oAr
	}//add_array_to_array
    public static string_to_date(s: any): Date {
        let dRet: Date = null;
        if ((s !== undefined) && (s !== null)) {
            try {
                let t = Date.parse(s.toString());
                if (!isNaN(t)) {
                    dRet = new Date(t);
                }
            } catch (e) {
            }
        }
        return dRet;
    }
	 protected  contains_array_id(cont: string[], id: string): boolean {
		if ((cont == undefined) || (cont == null)) {
			return false;
		}
        if ((id === undefined) || (id === null)) {
            return false;
        }
        let bFound = false;
        for (let p of cont) {
            if (p == id) {
                bFound = true;
				break;
            }
        }// p
        return bFound;
    }// add_id_to_array
}// class InfoElement
