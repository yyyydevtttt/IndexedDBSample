import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'db-test-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private inputData: string[] = [];

  private db: IDBDatabase;
  private store: IDBObjectStore;
  private indexedDB: IDBFactory;
  private dbName = 'sampleDB';
  private indexName = 'index';
  private storeName = 'sampleStore';

  ngOnInit() {
    // ベンタープレフィックス（webkit:Chrome、moz：FireFox）
    this.indexedDB = window.indexedDB;
    // DB接続
    let db = null;
    const openReq  = this.indexedDB.open(this.dbName, 2);

    // 接続成功（初回 or DBのバージョンが変わった時）
    openReq.addEventListener('upgradeneeded', (event) => {
      db = (<IDBRequest>event.target).result;
      console.log('db upgrade1');

      // オブジェクトストア作成
      this.store = db.createObjectStore('sampleStore', { keyPath: 'id' });
      // インデックスの作成
      this.store.createIndex('index', 'id');
      console.log('db upgrade');
    // };

    // // 接続成功（すでにDBが存在する場合）
    // openReq.onsuccess = (event) => {
      // this.db = (<IDBRequest>event.target).result;
      console.log('db open success');

      // const trans = this.db.transaction(this.storeName, 'readwrite');
      // const store = trans.objectStore(this.storeName);

      const data = {id : 'A1', name : 'test'};

      // データの登録・更新
      const putReq = this.store.put(data);

      putReq.addEventListener('success', function(e) {
        console.log('success!!');
      });
      putReq.addEventListener('error', function(e) {
        console.log('error!!');
      });

    });

    // 接続に失敗
    openReq.addEventListener('error', (event) => {
      console.log('db open error', event);
    });

  }

  onSubmit(form: NgForm) {
    this.inputData.push(form.value.input1);

    // DB接続
    const openReq  = this.indexedDB.open(this.dbName, 2);
    const storeName = this.storeName;

    openReq.addEventListener('success', function(event) {
      const db = openReq.result;
      console.log(db);
      console.log('submit start');
      // トランザクションの準備
      const trans = db.transaction(storeName, 'readwrite');
      const store = trans.objectStore(storeName);
      const data = {id : form.value.input1, name : 'hoge'};

      console.log('submit set up');

      // データの登録・更新
      // const putReq = store.put(data);
      const putReq = store.put(form.value.input1);

      console.log('submit finish');

      // 登録・更新処理成功
      putReq.onsuccess = function(event_) {
        console.log('put data success');
      };
      // 登録・更新処理に失敗
      putReq.onerror = function(event_) {
        console.log('登録失敗:' + event_);
      };
    });
  }

  search() {
    const key = 'AAA';
    let result;

    // DB接続
    const openReq  = this.indexedDB.open(this.dbName, 2);

    openReq.addEventListener('success', (event) => {
      const db = openReq.result;
      console.log('test 1');
      // トランザクションの準備
      const store = db   .transaction(this.storeName, 'readonly');
      store.addEventListener('error', (e_error1) => {
        // console.log(e_error1);
      });

      // .objectStore(this.storeName);
      console.log('test 2');

      // データ取得
      const readReq = store.get(key);
      console.log('test 3');
      result = (<IDBRequest>event.target).result;
      console.log('test 4');
      if (result) {
        console.log(result);
      } else {
        console.log('データはありません');
      }
    });

  }
}
