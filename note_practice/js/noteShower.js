/** @type {HTMLCanvasElement} */
const noteDisplayCanvas = document.getElementById('noteDisplayCanvas');
const noteDisplayArea = document.getElementById('noteDisplayArea');
const pointer = document.getElementById('pointer');
const clef = document.getElementById('clef');
const note = document.getElementById('note');
const ctx = noteDisplayCanvas.getContext("2d");
const remainTime = document.getElementById('remainTime');
let wwid, w, h, wc, hc, lineWidth, lineHeight, pitchDisplay, pitch, rate, DetailNoteName, noteName, leftWidth, keySigs, noteNumber, noteNameRequest, fullNoteNumber;
DetailNoteName = ["C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B"];
fullNoteNumber = [0, 2, 4, 5, 7, 9, 11];
noteName = ["C", "D", "E", "F", "G", "A", "B"]
keySigs = ["o", "#", "b"]
rate = 5;
pitch = 0;
noteNumber = (pitch + 49) % 7
noteNameRequest = fullNoteNumber[noteNumber]
pitchDisplay = pitch - 6;
window.addEventListener("resize", draw);
window.addEventListener("pointerdown", () => {
    location.href = "../index.html"
})
draw();
refresh();
update();
const game = setInterval(() => {
    update();
}, 5 * 1000);
function update() {
    ctx.clearRect(0, 0, w, h)
    pointer.style.display = "none";
    pitch = Math.round(Math.random() * 13) - 2;
    // pitch = 1-pitch;
    pitchDisplay = pitch - 6;
    noteNumber = (pitch + 49) % 7
    noteNameRequest = fullNoteNumber[noteNumber];
    refresh();
    pointerMove(pitch);
    remainTime.textContent = 3;
    setTimeout(() => {
        remainTime.textContent = 2;
    }, 1000);
    setTimeout(() => {
        remainTime.textContent = 1;
    }, 2000);
    setTimeout(() => {
        remainTime.textContent = DetailNoteName[noteNameRequest];
        pointer.style.display = "block";
    }, 3 * 1000);
}
function pointerMove(pitch) {
    wwid = window.screen.width;
    pointer.style.left = wwid * 0.362 + wwid * 0.043 * pitch + "px"
}
function refresh() {
    drawNote(pitchDisplay);
    additionalLine();
    originalFive();
}
function draw() {
    w = noteDisplayArea.clientWidth;
    h = noteDisplayArea.clientHeight;
    wc = w / 2;
    hc = h / 2;
    lineWidth = w / 2.5;
    lineHeight = h / 16;
    noteDisplayCanvas.width = w;
    noteDisplayCanvas.height = h;
    leftWidth = 0;
    originalFive();
    drawToClef(0);
}
function originalFive() {
    for (let i = -2; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(wc - lineWidth, hc + i * lineHeight);
        ctx.lineTo(wc + lineWidth, hc + i * lineHeight);
        ctx.stroke();
    }

}
function additionalLine() {
    if (pitchDisplay >= 6) {
        for (let i = 0; i < Math.floor(pitchDisplay / 2) - 2; i++) {
            ctx.beginPath();
            ctx.moveTo(wc - lineWidth / rate + leftWidth, hc - (i + 3) * lineHeight);
            ctx.lineTo(wc + lineWidth / rate + leftWidth, hc - (i + 3) * lineHeight);
            ctx.stroke();
        }
    } else if (pitchDisplay <= -6) {
        for (let i = 0; i < Math.floor(-pitchDisplay / 2) - 2; i++) {
            ctx.beginPath();
            ctx.moveTo(wc - lineWidth / rate + leftWidth, hc + (i + 3) * lineHeight);
            ctx.lineTo(wc + lineWidth / rate + leftWidth, hc + (i + 3) * lineHeight);
            ctx.stroke();
        }
    }
}

function drawNote(pitchDisplay) {
    if (pitchDisplay < 0) {
        note.src = "images/note.png"
        Object.assign(note.style, {
            left: wc + leftWidth + "px",
            height: 5 * lineHeight + "px",
            top: hc + lineHeight * 1.7 - pitchDisplay * lineHeight / 2 + "px",
        })
    } else {
        note.src = "images/note_inverse.png"
        Object.assign(note.style, {
            left: wc + leftWidth + "px",
            height: 5 * lineHeight + "px",
            top: hc + lineHeight * 1.8 - pitchDisplay * lineHeight / 2 + "px",
        })
    }

}
/** type=0がト音記号(default)でtype=1がへ音記号*/
function drawToClef(type = 0) {
    if (type == 0) {
        clef.src = "images/to_sign.png"
        Object.assign(clef.style, {
            position: "absolute",
            top: "42%",
            left: "2%",
            height: 4 * lineHeight + "px",
        })
    } else {
        clef.src = "images/fe_sign.png"
        Object.assign(clef.style, {
            position: "absolute",
            top: "45%",
            left: "20%",
            transform: "translate(-50%,-50%)",
            height: 1.8 * lineHeight + "px",
        })
    }
}
