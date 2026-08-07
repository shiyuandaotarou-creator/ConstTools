/** @type {IDBOpenDBRequest} */
const req = indexedDB.open("lyricDatabase",1);
/** @type {IDBDatabase} */
let db;
let store;
req.onupgradeneeded = (e) =>{
    db = e.target.result;
    db.createObjectStore("lyricStore");
}
req.onsuccess = (e)=>{
    db =e.target.result;
    console.log("接続完了");
    
}
export function Save(songName,lyricData){
    store = db.transaction("lyricStore","readwrite").objectStore("lyricStore");
    store.put(lyricData,songName)
}
export function Load(songName){
    return new Promise((resolve) =>{
        store = db.transaction("lyricStore","readwrite").objectStore("lyricStore");
        const getReq = store.get(songName);
        getReq.onsuccess = (e)=>{
            console.log("ゲット開始");
            resolve(e.target.result);
        }
    })
}