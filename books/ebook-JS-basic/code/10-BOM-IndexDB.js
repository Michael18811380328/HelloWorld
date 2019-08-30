// IndexDB 基本操作

/**
 * [openDB: if there is a DB named dbName, open it; else create a DB named dbName]
 * @author Michael An
 * @DateTime 2019-08-10T10:50:51+0800
 * @param    {[string]}                 dbName  [database name]
 * @param    {[number]}                 version [DB version]
 * @return   {[null]}
 */
function openDB(dbName, version) {
  let request = window.indexedDB.open(dbName, version);
  let db;
  request.onerror = (e) => {
    console.log(e);
    console.log('database open error');
  }
  request.onsuccess = (e) => {
    db = request.result;
    console.log('database open successfully');
  }
  // if version > actual version, DB will upgrade
  request.onupgradeneeded = (e) => {
    db = e.target.result;
    if (db.objectStoreNames.contains('person')) return;
    // if no table, create a table (primary key is person)
    let objectStore = db.createObjectStore('person', {
      keyPath: 'id'
    });
    // create a student table auto-increase
    let objectStore2 = db.createObjectStore('student', {
      autoIncrement: true
    });
    // create index
    objectStore.createIndex('name', 'name', {
      unique: false
    });
    objectStore.createIndex('email', 'email', {
      unique: true
    });
  }
}

/**
 * [addData add a data thouth transaction]
 * @author Michael An
 * @DateTime 2019-08-10T10:57:31+0800
 */
function addData() {
  let request = db.transaction(['student'], 'readwrite').objectStore('student').add({
    id: 1,
    name: "Michael",
    age: 26,
    email: "Michael@qq.com"
  });
  request.onsuccess = () => {
    console.log('add data success');
  }
  request.onerror = () => {
    console.log('add data error');
  }
}

function readData() {
  let transaction = db.transaction(['person']);
  let objectStore = transaction.objectStore('person');
  let request = objectStore.get(1);

  request.onerror = (e) => {
    //
  }
  request.onsuccess = (e) => {
    if (request.result) {
      console.log(request.result);
    } else {
      console.log('no data');
    }
  }
}

function readAllData() {
  let objectStore = db.transaction('person').objectStore('person');
  objectStore.openCursor().onsuccess = (e) => {
    let cursor = e.target.result;
    if (cursor) {
      console.log(cursor.key);
      console.log(cursor.value);
    } else {
      console.log('no data');
    }
  }
}

function updateData() {
  let request = db.tarnsaction(['person'], 'readwrite').objectStore('person').put({
    id: 1,
    name: "Tom",
    age: 20
  });
  request.onerror = (e) => {
    console.log(e);
  }
  request.onsuccess = (e) => {
    console.log('update data success');
  }
}

function deleteData() {
  let request = db.transaction(['person'], 'readwrite').objectStore('person').delete(1);
  request.onsuccess = () => {
    console.log('delete data success');
  }
}

function useIndex() {
  let transaction = db.transaction(['person'], 'readonly');
  let objectStore = transaction.objectStore('person');
  objectStore.create('name', 'name', { unique: false });
  let index = store.index('name');
  let request = index.get("Mike");
  request.onsuccess = (e) => {
    let result = e.target.result;
    if (result) {
      console.log(result);
    }
  }
}

