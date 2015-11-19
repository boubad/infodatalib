//departementtest.ts
/// <reference path='../../typings/qunit/qunit.d.ts' />
//
import {IDocPersist, IDataService} from 'infodata';
import {PouchDatabase} from '../js/pouchdatabase';
//////////////////////////////
const TEST_DATABASE: string = "test";
const MODULE_NAME: string = "PouchDatabase Tests  ";
const NB_DEPS: number = 10;
const TEST_SIGLE: string = "TESTDEP";
const TEST_NAME: string = "Test dep Name";
const TEST_DESC: string = "Test dep desc";
const TEST_STATUS: string = "TESTSTATUS";
///////////////////////////////
class PouchDatabaseTest {
	private pdb: IDocPersist;
	//
	constructor() { }
	//
	public run(): void {
		let self = this;
		QUnit.module(MODULE_NAME, {
			setup: (assert) => {
				var done = assert.async();
				this.pdb = new PouchDatabase();
				this.pdb.name = TEST_DATABASE;
				this.pdb.isOnline().then((bRet) => {
					assert.ok((bRet !== undefined) && (bRet !== null), "is online returned value");
					assert.deepEqual(bRet, true, "db is on line");
					done();
				}).catch((err) => {
					assert.ok(false, "Exception occured...");
					done();
				});
			},
			teardown: (assert) => {
				var done = assert.async();
				done();
			}
		}); // module
		//
		QUnit.test("test one doc", (assert) => {
			var done = assert.async();
			var docid: string = "testdocid";
			var doc: IPouchDocument = { _id: docid };
			this.pdb.exists_doc(docid).then((rev) => {
				if ((rev !== undefined) && (rev !== null)) {
					return this.pdb.update_doc(doc);
				} else {
					return this.pdb.insert_doc(doc);
				}
			}).then((r) => {
				assert.ok((r !== undefined) && (r !== null), "return of insert/update");
				assert.ok((r.ok !== undefined) && (r.ok !== null));
				assert.ok((r.id !== undefined) && (r.id !== null), "reponse id " + r.id);
				assert.ok((r.rev !== undefined) && (r.rev !== null), "response rev " + r.rev);
				assert.ok(r.ok == true, "insert/update success");
				return this.pdb.read_doc(docid);
			}).then((xdoc) => {
				assert.ok((xdoc !== undefined) && (xdoc !== null));
				assert.ok(doc._id !== undefined);
				assert.ok(doc._id == docid);
				return this.pdb.remove_doc(xdoc);
			}).then((rx) => {
				assert.ok((rx !== undefined) && (rx !== null), "return of remove");
				assert.ok((rx.ok !== undefined) && (rx.ok !== null));
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
			var done = assert.async();
			var nb: number = 20;
			var docs: any[] = [];
			var ids: string[] = [];
			var startkey: string = "id";
			var endkey: string = startkey + "\uffff";
			for (var i = 0; i < nb; ++i) {
				var id: string = "id" + i;
				ids.push(id);
				docs.push({ _id: id, ival: i });
			}// i
			this.pdb.bulk_maintains(docs).then((r) => {
				assert.ok((r !== undefined) && (r !== null));
				return this.pdb.docs_ids_range(startkey, endkey);
			}).then((xids) => {
				assert.ok((xids !== undefined) && (xids !== null));
				assert.ok(xids.length >= nb);
				return this.pdb.docs_read_range(startkey, endkey, 0, nb);
			}).then((xdocs) => {
				assert.ok((xdocs !== undefined) && (xdocs !== null));
				assert.ok(xdocs.length >= nb);
				return this.pdb.docs_array(ids);
			}).then((ydocs) => {
				assert.ok((ydocs !== undefined) && (ydocs !== null));
				assert.ok(ydocs.length >= nb);
				return this.pdb.remove_all_items(startkey, endkey);
			}).then((xx) => {
				assert.ok((xx !== undefined) && (xx !== null));
				return this.pdb.docs_array(ids);
			}).then((zdocs) => {
				assert.ok((zdocs !== undefined) && (zdocs !== null));
				assert.ok(zdocs.length < 1);
				done();
			}).catch((err) => {
				assert.ok(false, "Exception occured...");
				done();
			});
		});
		//
		QUnit.test(" create_indexes", (assert) => {
			var done = assert.async();
			var nb: number = 20;
			var docs: any[] = [];
			var ids: string[] = [];
			var startkey: string = "id";
			var endkey: string = startkey + "\uffff";
			for (var i = 0; i < nb; ++i) {
				var id: string = "id" + i;
				ids.push(id);
				docs.push({ _id: id, ival: i, sval: "s" + i });
			}// i
			this.pdb.bulk_maintains(docs).then((r) => {
				assert.ok((r !== undefined) && (r !== null));
				let fields: string[] = ["ival", "sval"];
				return this.pdb.create_indexes(fields);
			}).then((bRet) => {
				assert.ok(bRet == true);
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
