README.md — AI‑Free Chat Replay Simulator
🚀 AI‑Free Chat Replay Simulator
A modern, smooth, JSON‑powered chat replay engine built with HTML, CSS, and Vanilla JavaScript — without using any AI / ML libraries.
This project simulates a realistic chat conversation with:

Typing animations

Timed message playback

Reactions appearing after each message

Play / Pause / Resume / Restart controls

Adjustable playback speed (0.5x → 2x)

Clean, modern UI with avatars

JSON‑driven message data

🎯 Project Objective
To create an AI‑free, fully front‑end chat replay simulation engine where predefined messages appear one by one in a natural, human‑like flow.
This is especially useful for:

UI demos

App prototypes

Chat simulations for presentations

Replay visualizations

Educational projects

🛠️ Tech Stack
Component	Technology
UI Markup	HTML5
Styling	CSS3 (modern UI, gradients, shadows, animations)
Logic	Vanilla JavaScript (async timing engine)
Data	External JSON file (code.json)
Assets	Avatars from Pravatar API
🧩 Project Structure
📁 project-folder
│── index.html        # Main UI
│── style.css         # Styling + animations
│── script.js         # Playback engine logic
│── code.json         # Chat message + reaction data
└── README.md         # Project documentation
⚙️ Features
✔ Typing Animation
Each message triggers a typing indicator based on message length.

✔ Timed Replay
Messages appear with natural pauses using an async interval-based system.

✔ Playback Controls
Play

Pause

Resume

Restart

✔ Adjustable Speed
Supported speeds:
2x, 1.5x, 1x, 0.75x, 0.5x

✔ JSON-Based Messages
Each message includes:

{
  "id": "m001",
  "name": "Aditya",
  "avatar": "image-url",
  "text": "Hello world",
  "side": "left",
  "reaction": "❤️"
}
✔ Reactions System
Reactions appear shortly after the message with an animation.

✔ Restart Without Bugs
Uses a session-based cleanup system to avoid duplicate messages and async conflicts.

📥 How It Works
script.js loads code.json using fetch().

For each message:

Show typing indicator

Calculate typing duration

Wait based on replay speed

Append message bubble

Schedule reaction appearance

The engine tracks playback speed, pauses, and restart logic safely.


✨ Screenshots
<img width="1919" height="869" alt="image" src="https://github.com/user-attachments/assets/c9f8d303-0afd-4e52-b428-d24734049e7a" />

📌 Key Files
index.html
Contains the UI layout for the chat window, controls, typing box, and footer.

style.css
Handles:

Chat bubbles

Animations

Modern gradients

Reaction styling

Layout and responsiveness

script.js
Core engine powering:

Async replay

Speed scaling

Pause/resume

Reaction scheduling

Safe restart handling

code.json
Message list with:

Avatar

Name

Side

Message text

Reaction emoji

👨‍💻 Developers
Team Members:

Aditya Shinde

Rajdeep Mallick

