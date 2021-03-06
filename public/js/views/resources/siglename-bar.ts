//siglename-bar.ts
//
import {ISigleNamedItem} from 'infodata';
import {customElement} from 'aurelia-framework';
import {BaseBar} from './basebar';
import {SigleNamedViewModel} from '../../siglenamedmodel';
//
@customElement('siglename-bar')
export class SiglenameBar extends BaseBar<SigleNamedViewModel<ISigleNamedItem>>  {
    //
    constructor() {
		super();
    }
    public get isReadOnly():boolean {
      return (this.parent !== null) ? this.parent.isReadOnly : true;
    }
    public get sigle(): string {
        return (this.parent !== null) ? this.parent.sigle : null;
    }
    public set sigle(s: string) {
        if (this.parent !== null) {
            this.parent.sigle = s;
        }
    }
    public get name(): string {
        return (this.parent !== null) ? this.parent.name : null;
    }
    public set name(s: string) {
        if (this.parent !== null) {
            this.parent.name = s;
        }
    }
    public get description(): string {
        return (this.parent !== null) ? this.parent.description : null;
    }
    public set description(s: string) {
        if (this.parent !== null) {
            this.parent.description = s;
        }
    }
	public get status(): string {
        return (this.parent !== null) ? this.parent.status : null;
    }
    public set status(s: string) {
        if (this.parent !== null) {
            this.parent.status = s;
        }
    }
}
