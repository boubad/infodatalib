//departementtest.ts
/// <reference path='../../typings/qunit/qunit.d.ts' />
//
import {IDocPersist, IDataService} from 'infodata';
import {PouchDatabase} from '../js/pouchdatabase';
//////////////////////////////
const TEST_DATABASE: string = "test";
const TEST_REMOTE_DATABASE: string = "http://localhost:5984/test";
const MODULE_NAME: string = "PouchDatabase Tests  ";
const NB_DOCS: number = 20;
///////////////////////////////
class PouchDatabaseTest {
	private pdb: IDocPersist;
	private doc_prefix: string;
	//
	constructor() {
		this.doc_prefix = "docid";
	}
	//
	private get_doc_fields(): string[] {
		return ["ival", "dval", "bval", "sval"];
	}
	private create_blob(): Blob {
		let aFileParts = ["<a id=\"a\"><b id=\"b\">hey!<\/b><\/a>"];
		let oMyBlob = new Blob(aFileParts, { "type": "text\/xml" }); // the blob
		return oMyBlob;
	}
	private get_attachment_type(): string {
		return "text\/xml";
	}
	private get_attachment_id(): string {
		return "toto.xml";
	}
	private create_one_doc(ipar?: number): any {
		let b = (ipar !== undefined) && (ipar !== null) && (ipar >= 0);
		let oRet: any = {
			_id: (b) ? this.doc_prefix + ipar : this.doc_prefix,
			ival: (b) ? ipar : 1234,
			dval: (b) ? (ipar * ipar) : 1958.0,
			bval: (b) ? true : false,
			sval: (b) ? "sval" + ipar : "testval"
		};
		return oRet;
	}// create_one_doc
	private create_docs(n?: number): any[] {
		let oRet: any[] = [];
		let nn = ((n !== undefined) && (n !== null) && (n > 0)) ? n : NB_DOCS;
		for (let i = 0; i < nn; ++i) {
			oRet.push(this.create_one_doc(i));
		}// i
		return oRet;
	}// create_docs
	//
	public run(): void {
		let self = this;
		QUnit.module(MODULE_NAME, {
			setup: (assert) => {
				let done = assert.async();
				this.pdb = new PouchDatabase();
				this.pdb.name = TEST_DATABASE;
				this.pdb.isOnline().then((bRet) => {
					assert.ok((bRet !== undefined) && (bRet !== null), "setup - is online returned value");
					assert.deepEqual(bRet, true, "setup - db is on line");
					done();
				}).catch((err) => {
					assert.ok(false, "setup - Exception occured...");
					done();
				});
			},
			teardown: (assert) => {
				let done = assert.async();
				done();
			}
		}); // module
		//
		QUnit.test("test one doc", (assert) => {
			let done = assert.async();
			let doc: any = this.create_one_doc();
			let docid: string = doc._id;
			this.pdb.exists_doc(docid).then((rev) => {
				if ((rev !== undefined) && (rev !== null)) {
					assert.ok(true, "exists_doc returns ok - trying to update doc");
					return this.pdb.update_doc(doc);
				} else {
					assert.ok(true, "exists_doc returns ok - trying to insert doc");
					return this.pdb.insert_doc(doc);
				}
			}).then((r) => {
				assert.ok((r !== undefined) && (r !== null), "return of insert/update");
				assert.ok((r.ok !== undefined) && (r.ok !== null), "insert/update ok " + r.ok);
				assert.ok((r.id !== undefined) && (r.id !== null), "reponse id " + r.id);
				assert.ok((r.rev !== undefined) && (r.rev !== null), "response rev " + r.rev);
				assert.ok(r.ok == true, "insert/update success");
				return this.pdb.read_doc(docid);
			}).then((xdoc) => {
				assert.ok((xdoc !== undefined) && (xdoc !== null), "read_doc returns ok");
				assert.ok(doc._id !== undefined, "xdoc id is defined");
				assert.ok(doc._id == docid, "xdoc id ok");
				return this.pdb.remove_doc(xdoc);
			}).then((rx) => {
				assert.ok((rx !== undefined) && (rx !== null), "return of remove");
				assert.ok((rx.ok !== undefined) && (rx.ok !== null), "response ok " + rx.ok);
				assert.ok((rx.id !== undefined) && (rx.id !== null), "reponse id " + rx.id);
				assert.ok((rx.rev !== undefined) && (rx.rev !== null), "response rev " + rx.rev);
				assert.ok(rx.ok == true, "remove success");
				done();
			}).catch((err) => {
				assert.ok(false, "Exception occured...");
				done();
			});
		});
		//
		QUnit.test("all docs tests", (assert) => {
			let done = assert.async();
			let docs: any[] = this.create_docs();
			let nb = docs.length;
			let ids: string[] = [];
			for (let x of docs) {
				ids.push(x._id);
			}// x
			let startkey: string = this.doc_prefix;
			let endkey: string = startkey + "\uffff";
			this.pdb.bulk_maintains(docs).then((r) => {
				assert.ok((r !== undefined) && (r !== null), "bulk_maintains returnd ok");
				return this.pdb.docs_ids_range(startkey, endkey);
			}).then((xids) => {
				assert.ok((xids !== undefined) && (xids !== null), "docs_ids_range returns ok");
				assert.ok(xids.length >= nb, "ids length ok");
				return this.pdb.docs_read_range(startkey, endkey, 0, nb);
			}).then((xdocs) => {
				assert.ok((xdocs !== undefined) && (xdocs !== null), "docs_read_range returns ok");
				assert.ok(xdocs.length >= nb, "docs range ok");
				return this.pdb.docs_array(ids);
			}).then((ydocs) => {
				assert.ok((ydocs !== undefined) && (ydocs !== null), "docs_array returns ok");
				assert.ok(ydocs.length >= nb, "docs length ok");
				return this.pdb.remove_all_items(startkey, endkey);
			}).then((xx) => {
				assert.ok((xx !== undefined) && (xx !== null), "remove_all_items returns ok");
				return this.pdb.docs_array(ids);
			}).then((zdocs) => {
				assert.ok((zdocs !== undefined) && (zdocs !== null), "check remove_all_items_ok");
				assert.ok(zdocs.length < 1, "docs length ok");
				done();
			}).catch((err) => {
				assert.ok(false, "Exception occured...");
				done();
			});
		});
		//
		QUnit.test(" query tests", (assert) => {
			let done = assert.async();
			var docs: any[] = this.create_docs();
			let fields: string[] = this.get_doc_fields();
			this.pdb.bulk_maintains(docs).then((r) => {
				assert.ok((r !== undefined) && (r !== null), "ok bulk_maintains");
				return this.pdb.create_indexes(fields);
			}).then((bRet) => {
				assert.ok((bRet !== undefined) && (bRet !== null) && (bRet.length > 0), "create indexes returns ok");
				let f: string = fields[0];
				return this.pdb.query_docs({ sval: "sval1" });
			}).then((xx) => {
				assert.ok((xx !== undefined) && (xx !== null) && (xx.length > 0), "query_docs ok");
				done();
			}).catch((err) => {
				assert.ok(false, "Exception occured...");
				done();
			});
		});
		//
		QUnit.test(" attachments tests", (assert) => {
			let done = assert.async();
			let doc: any = this.create_one_doc();
			let docid: string = doc._id;
			let data: Blob = this.create_blob();
			let type: string = this.get_attachment_type();
			let attachmentid: string = this.get_attachment_id();
			this.pdb.exists_doc(docid).then((rev) => {
				if ((rev !== undefined) && (rev !== null)) {
					assert.ok(true, "exists_doc returns ok - trying to update doc");
					return this.pdb.update_doc(doc);
				} else {
					assert.ok(true, "exists_doc returns ok - trying to insert doc");
					return this.pdb.insert_doc(doc);
				}
			}).then((r) => {
				assert.ok((r !== undefined) && (r !== null), "return of insert/update");
				assert.ok((r.ok !== undefined) && (r.ok !== null), "insert/update ok " + r.ok);
				assert.ok((r.id !== undefined) && (r.id !== null), "reponse id " + r.id);
				assert.ok((r.rev !== undefined) && (r.rev !== null), "response rev " + r.rev);
				assert.ok(r.ok == true, "insert/update success");
				return this.pdb.maintains_attachment(docid, attachmentid, data, type);
			}).then((rx) => {
				assert.ok((rx !== undefined) && (rx !== null), "return of maintains_attachment");
				assert.ok((rx.ok !== undefined) && (rx.ok !== null), "response ok " + rx.ok);
				assert.ok((rx.id !== undefined) && (rx.id !== null), "reponse id " + rx.id);
				assert.ok((rx.rev !== undefined) && (rx.rev !== null), "response rev " + rx.rev);
				return this.pdb.find_attachment(docid, attachmentid);
			}).then((xdata) => {
				assert.ok((xdata !== undefined) && (xdata !== null), "find_attachement returns ok");
				return this.pdb.remove_attachment(docid, attachmentid);
			}).then((ry) => {
				assert.ok((ry !== undefined) && (ry !== null), "return of maintains_attachment");
				assert.ok((ry.ok !== undefined) && (ry.ok !== null), "response ok " + ry.ok);
				assert.ok((ry.id !== undefined) && (ry.id !== null), "reponse id " + ry.id);
				assert.ok((ry.rev !== undefined) && (ry.rev !== null), "response rev " + ry.rev);
				return this.pdb.find_attachment(docid, attachmentid);
			}).then((xdata) => {
				assert.ok((xdata !== undefined) && (xdata === null), "find_attachement returns ok");
				done();
			}).catch((err) => {
				assert.ok(false, "Exception occured...");
				done();
			});
		});
		//
		QUnit.test(" replicate tests", (assert) => {
			let done = assert.async();
			this.pdb.replicate(TEST_DATABASE,TEST_REMOTE_DATABASE).then((r) => {
				assert.ok((r !== undefined) && (r !== null) && (r == true), "ok replicate local --> remote");
				return this.pdb.replicate(TEST_REMOTE_DATABASE,TEST_DATABASE);
			}).then((bRet) => {
				assert.ok((bRet !== undefined) && (bRet !== null) && (bRet  == true), "ok replicate remote --> local");
				done();
			}).catch((err) => {
				assert.ok(false, "Exception occured...");
				done();
			});
		});
		//
		QUnit.module(MODULE_NAME);
	}// run
}// class PouchDatabaseTest
/////////////////////
export var main = new PouchDatabaseTest();
////////////////////////////
