let selectedSlot = null;

let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
let hours = ["15:00", "16:00", "17:00", "18:00", "19:00"];

// calendario
for (let i = 0; i < days.length; i++) {

    let day = document.createElement("div");
    day.className = "day";

    let title = document.createElement("h5");
    title.textContent = days[i];
    day.appendChild(title);

    for (let j = 0; j < hours.length; j++) {

        let slot = document.createElement("div");
        slot.className = "slot";

        slot.textContent = hours[j];

        slot.onclick = function () {

            selectedSlot = slot;

            let title = slot.getAttribute("data-title");
            let desc = slot.getAttribute("data-desc");

            if (title != null && title != "") document.getElementById("title").value = title;
            else document.getElementById("title").value = "";

            if (desc != null && desc != "") document.getElementById("desc").value = desc;
            else document.getElementById("desc").value = "";

            let modal = new bootstrap.Modal(
                document.getElementById("bookingModal")
            );

            modal.show();
        };

        day.appendChild(slot);
    }

    document.getElementById("calendar").appendChild(day);
}

// salvataggio

document.getElementById("save").onclick = function () {

    let title = document.getElementById("title").value;
    let desc = document.getElementById("desc").value;

    if (!title || !selectedSlot) return;

    selectedSlot.textContent = title;
    selectedSlot.classList.add("bg-success");

    selectedSlot.setAttribute("data-title", title);
    selectedSlot.setAttribute("data-desc", desc);

    let modalElement = document.getElementById("bookingModal");
    let modalInstance = bootstrap.Modal.getInstance(modalElement);

    modalInstance.hide();
};

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