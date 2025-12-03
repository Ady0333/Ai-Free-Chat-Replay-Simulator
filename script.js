let chatData = [];
let index = 0;
let playing = false;
let speed = 1;

const chatWindow = document.getElementById("chatWindow");
const typingBox = document.getElementById("typingBox");
const typingAvatar = document.getElementById("typingAvatar");
const typingName = document.getElementById("typingName");

const statusLabel = document.getElementById("statusLabel");
const progressLabel = document.getElementById("progressLabel");

const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const speedSelect = document.getElementById("speedSelect");


async function loadChat() {
    const res = await fetch("chat_data.json");
    chatData = await res.json();

    document.getElementById("topAvatar").querySelector("img").src = chatData[0].avatar;
    progressLabel.textContent = 0/${chatData.length};
}
loadChat();


function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }


function showTyping(msg) {
    typingAvatar.src = msg.avatar;
    typingName.textContent = msg.name + " is typing…";
    typingBox.classList.remove("hidden");
}

function hideTyping() {
    typingBox.classList.add("hidden");
}


function addMessage(msg) {
    const div = document.createElement("div");
    div.className = msg ${msg.side};

    div.innerHTML = `
        <div class="avatar"><img src="${msg.avatar}"></div>
        <div>
            <div class="metaRow">${msg.name}</div>
            <div class="bubble">${msg.text}</div>
            ${msg.reaction ? <div class="react">${msg.reaction}</div> : ""}
        </div>
    `;

    chatWindow.appendChild(div);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}


async function playChat() {
    playing = true;

    while (playing && index < chatData.length) {
        const msg = chatData[index];

        showTyping(msg);
        await sleep(900 / speed);
        hideTyping();

        addMessage(msg);
        index++;
        progressLabel.textContent = ${index}/${chatData.length};

        await sleep(600 / speed);
    }

    if (index >= chatData.length) {
        playing = false;
        playBtn.disabled = false;
        pauseBtn.disabled = true;
        statusLabel.textContent = "Finished";
    }
}


playBtn.addEventListener("click", () => {
    if (index >= chatData.length) {
        chatWindow.innerHTML = "";
        index = 0;
    }
    playBtn.disabled = true;
    pauseBtn.disabled = false;

    speed = parseFloat(speedSelect.value);
    statusLabel.textContent = "Playing";

    playChat();
});

pauseBtn.addEventListener("click", () => {
    playing = false;
    playBtn.disabled = false;
    pauseBtn.disabled = true;
    statusLabel.textContent = "Paused";
});