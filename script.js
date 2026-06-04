// musica

const music = document.getElementById("bgMusic");
const btn = document.getElementById("musicToggle");

let playing = false;

function startMusic(){
    if (!playing) {
        music.play();
        btn.textContent = "⏸";
    } else {
        music.pause();
        btn.textContent = "▶";
    }
    playing = !playing;
};