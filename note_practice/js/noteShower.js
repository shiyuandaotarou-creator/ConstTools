/** @type {HTMLCanvasElement} */
const noteDisplayCanvas = document.getElementById('noteDisplayCanvas');
const noteDisplayArea = document.getElementById('noteDisplayArea');
const noteNameText = document.getElementById('noteNameText');
const clef = document.getElementById('clef');
const note = document.getElementById('note');
const ctx = noteDisplayCanvas.getContext("2d");
let w, h, wc, hc, lineWidth, lineHeight,pitchDisplay,pitch,rate,DetailNoteName,noteName;
DetailNoteName = ["C","C#/Db","D","D#/Eb","E","F","F#/Gb","G","G#/Ab","A","A#/Bb","B"];
noteName = ["C","D","E","F","G","A","B"]
rate = 5;
pitch =Math.round(22*Math.random())-4;

pitchDisplay = pitch-6;
window.addEventListener("resize", draw);
draw();
update();

function update() {
    noteNameText.textContent = noteName[ (pitch+49)%7 ]
    drawNote(pitchDisplay);
    additionalLine();
    requestAnimationFrame(update);
}
function draw() {
    w = noteDisplayArea.clientWidth;
    h = noteDisplayArea.clientHeight;
    wc = w / 2;
    hc = h / 2;
    lineWidth = w / 4;
    lineHeight = h / 16;
    noteDisplayCanvas.width = w;
    noteDisplayCanvas.height = h;
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
function additionalLine(){
    if(pitchDisplay >= 6){
        for(let i=0; i<Math.floor(pitchDisplay/2)-2;i++){
            ctx.beginPath();
            ctx.moveTo(wc - lineWidth/rate, hc - (i+3) * lineHeight);
            ctx.lineTo(wc + lineWidth/rate, hc - (i+3) * lineHeight);
            ctx.stroke();
        }
    }else if(pitchDisplay<=-6){
        for(let i=0; i<Math.floor(-pitchDisplay/2)-2;i++){
            ctx.beginPath();
            ctx.moveTo(wc - lineWidth/rate, hc +(i+3) * lineHeight);
            ctx.lineTo(wc + lineWidth/rate, hc + (i+3) * lineHeight);
            ctx.stroke();
        }
    }
}
function drawNote(pitchDisplay) {
    if (pitchDisplay < 0) {
        Object.assign(note.style, {
            height: 5 * lineHeight + "px",
            top:hc+lineHeight*1.7-pitchDisplay*lineHeight/2+"px",
        })
    }else{
        note.src = "images/note_inverse.png"
        Object.assign(note.style, {
            height: 5 * lineHeight + "px",
            top:hc+lineHeight*1.8-pitchDisplay*lineHeight/2+"px",
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
            left: "20%",
            height: 4 * lineHeight + "px",
        })
    } else {
        clef.src = "images/fe_sign.png"
        Object.assign(clef.style, {
            position: "absolute",
            top: "45%",
            left: "30%",
            transform: "translate(-50%,-50%)",
            height: 1.8 * lineHeight + "px",
        })
    }
}
