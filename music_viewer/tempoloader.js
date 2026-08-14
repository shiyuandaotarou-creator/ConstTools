const req = indexedDB.open("tempoCounter", 1);
/** @type { IDBDatabase } */
let db;
/** @type { IDBObjectStore } */
let store;
let tempoLoaded;
let IstempoLoaded = false;
let tempo = 0;
let previousTime = 0;
let deltaTime;
let t = 0;
let tempoCounter = 0;
const tempoInput = document.getElementById('tempoInput');
const inputDiv = document.getElementById('inputDiv');
const colorBox1 = document.getElementById('colorBox1');
const colorBox2 = document.getElementById('colorBox2');
document.addEventListener("pointerdown", () => {
    t = 0;
})
tempoInput.onchange = () => {
    let input = tempoInput.value;
    tempo = input;
    IstempoLoaded = true;
    store = db.transaction("tempoStore", "readwrite").objectStore("tempoStore");
    store.put(input, "tempo");
}
function update(time = 0) {
    if (!IstempoLoaded) {
        tempo = tempoLoaded;
        if (tempo !== undefined) {
            tempoInput.value = tempo;
            IstempoLoaded = true;

        }
    }
    deltaTime = time - previousTime;
    previousTime = time;
    t += deltaTime / 1000;
    tempoCounter = Math.floor((t * tempo) / 60 % 4 + 1);
    if (tempoCounter % 2 === 0) {
        inputDiv.style.backgroundColor = colorBox1.value;
    } else {
        inputDiv.style.backgroundColor = colorBox2.value;
    }
    requestAnimationFrame(update)
}
update();
req.onupgradeneeded = (e) => {
    db = e.target.result;
    db.createObjectStore("tempoStore");
}
req.onsuccess = (e) => {
    db = e.target.result;
    store = db.transaction("tempoStore", "readwrite").objectStore("tempoStore");
    let getReq = store.get("tempo");
    getReq.onsuccess = (e) => {
        tempoLoaded = e.target.result;
    }
}