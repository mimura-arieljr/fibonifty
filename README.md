# fibonifty
is a minimal, real-time web application that allows agile teams to collaboratively estimate story points. Each team member joins a room, enters their name, submits a point value, and waits for the reveal. Built with WebSockets to ensure everyone stays in sync.

---

## 🚀 Features

- 🔗 Real-time collaboration via **Socket.IO**
- 🏠 Join any room with a custom **Room ID**
- 👤 Submit your **name** and **story points**
- 🙈 Points remain hidden until revealed
- 👁 Admin can **reveal** or **reset** votes
- 💡 Fully client-side UI using Bootstrap
- 🔌 Node.js + Express backend

---

## 🖼 Preview

> *(Add a screenshot or demo gif here if available)*

---

## 🛠 Tech Stack

- **Node.js**
- **Express.js**
- **Socket.IO**
- **Bootstrap 5**
- **Vanilla JavaScript / HTML**

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/mimura-arieljr/fibonifty.git
cd fibonifty
```

### 2. Install Dependencies

```bash
npm install
```

---

## ▶️ Run the App

```bash
npm start
```

This runs `server.js` and serves the app at:  
📍 `http://localhost:3000`

---

## 🔧 Project Structure

```
reveal/
├── public/               # Frontend (HTML, CSS, JS)
│   └── index.html
├── server.js             # Express + WebSocket backend
├── package.json
└── README.md
```

---

## ⚙️ How It Works

1. **User enters a Room ID** to join a shared session.
2. They input a **name** and select **story points** to submit.
3. Submissions are stored in a shared object for the room.
4. Points remain hidden until the host clicks **Reveal**.
5. A **Reset** button clears submissions for the next round.

---

## 📌 Future Improvements

- [ ] Admin vs Participant roles
- [ ] Persistent rooms with history
- [ ] Shareable invite links
- [ ] Timed voting sessions
- [ ] Customizable point scales (e.g. Fibonacci, T-shirt sizing)


