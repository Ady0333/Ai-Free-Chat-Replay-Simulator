
let chatData = [];
let index = 0;
let sessionActive = false; 
let isPaused = false;      
let speed = 1;
let currentSessionId = 0; 


const chatWindow = document.getElementById("chatWindow");
const typingBox = document.getElementById("typingBox");
const typingText = document.getElementById("typingText");
const topAvatar = document.getElementById("topAvatar");
const topName = document.getElementById("topName");
const progressLabel = document.getElementById("progressLabel");
const statusLabel = document.getElementById("statusLabel");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const speedSelect = document.getElementById("speedSelect");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");


async function loadChat() {
    try {
        const res = await fetch("chat_data.json");
        chatData = await res.json();

        if (chatData.length > 0) {
            topAvatar.src = "./images (2).jpeg";
        }
        updateProgress();
    } catch (e) {
        console.error("Failed to load chat data", e);
    }
}
loadChat();

function updateProgress() {
    progressLabel.textContent = `${index}/${chatData.length}`;
}

function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}


function showTyping(msg) {
    typingBox.classList.add("active");
    typingText.textContent = `${msg.name} is typing...`;
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function hideTyping() {
    typingBox.classList.remove("active");
}

function resetChatUI() {
    chatWindow.innerHTML = "";
    index = 0;
    updateProgress();
    hideTyping();
    statusLabel.textContent = "Ready";
    startBtn.textContent = "Start Chat";
    pauseBtn.disabled = true;
    pauseBtn.textContent = "⏸";
}

function addMessage(msg) {
    const div = document.createElement("div");
    const isRight = msg.side === "right";
    div.className = `msg-row ${isRight ? "right" : "left"}`;

    div.innerHTML = `
        <img src="${msg.avatar}" class="msg-avatar" alt="${msg.name}">
        <div class="msg-bubble-group">
            <div class="msg-name">${msg.name}</div>
            <div class="msg-bubble">
                ${msg.text}
            </div>
        </div>
    `;

    chatWindow.appendChild(div);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    
    return div.querySelector(".msg-bubble");
}

async function triggerReaction(container, emoji) {
    await sleep(1500 / speed);

    
    if (!sessionActive) return;

    if (emoji) {
        const reactDiv = document.createElement("div");
        reactDiv.className = "reaction";
        reactDiv.textContent = emoji;
        container.appendChild(reactDiv);
    }
}


async function runChatLoop() {
    const thisSessionId = currentSessionId; 

    statusLabel.textContent = "Live Simulation";
    pauseBtn.disabled = false;
    pauseBtn.textContent = "⏸"; 

    while (sessionActive && index < chatData.length && currentSessionId === thisSessionId) {
        
        if (isPaused) {
            statusLabel.textContent = "Paused";
            await sleep(200);
            continue;
        } else {
            if (statusLabel.textContent === "Paused") {
                statusLabel.textContent = "Live Simulation";
            }
        }

        let msg = chatData[index];

        
        showTyping(msg);

        let typingTime = Math.min(1500, Math.max(800, msg.text.length * 30));
        let elapsed = 0;
        const step = 100;

        while (elapsed < (typingTime / speed)) {
            if (!sessionActive || currentSessionId !== thisSessionId) break;

            if (isPaused) {
                hideTyping(); // Hide while paused
                await sleep(step);
                continue;
            }

            if (!typingBox.classList.contains("active")) {
                showTyping(msg);
            }

            await sleep(step);
            elapsed += step;
        }

        if (!sessionActive || currentSessionId !== thisSessionId) break;

        hideTyping();
        const bubbleEl = addMessage(msg);

        if (msg.reaction) {
            triggerReaction(bubbleEl, msg.reaction);
        }

        index++;
        updateProgress();

        let delayTime = 800 / speed;
        elapsed = 0;
        while (elapsed < delayTime) {
            if (!sessionActive || currentSessionId !== thisSessionId) break;
            if (isPaused) {
                await sleep(step);
                continue;
            }
            await sleep(step);
            elapsed += step;
        }
    }

    if (index >= chatData.length && currentSessionId === thisSessionId) {
        finishPlayback();
    }
}

function startSession() {
    sessionActive = true;
    isPaused = false;
    currentSessionId++;

    startBtn.textContent = "Replay Again"; 

    if (index >= chatData.length) {
        chatWindow.innerHTML = "";
        index = 0;
        updateProgress();
    }

    runChatLoop();
}

function endSession() {
    sessionActive = false;
    isPaused = false;
    currentSessionId++; 
    resetChatUI();
}

function finishPlayback() {
    sessionActive = false;
    startBtn.textContent = "Replay Again";
    pauseBtn.disabled = true;
    statusLabel.textContent = "Session Finished";
}

startBtn.addEventListener("click", () => {
    if (sessionActive) {
        endSession();
        startSession();
    } else {
        startSession();
    }
});

pauseBtn.addEventListener("click", () => {
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? "▶" : "⏸";
});

speedSelect.addEventListener("change", (e) => {
    speed = parseFloat(e.target.value);
});

function updateThemeIcon() {
    const isDark = document.body.classList.contains("dark");
    themeIcon.textContent = isDark ? "🌙" : "☀️";
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    updateThemeIcon();

    const theme = document.body.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem("theme", theme);
});

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.body.classList.add("dark");
}
updateThemeIcon();
