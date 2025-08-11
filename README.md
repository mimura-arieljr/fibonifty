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
![App Preview](client/public/images/fibonifty.png)

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

On the root folder,
```bash
npm install
```
This installs dependencies on the root.

Then on the same directory, run:
```
npm run build
```

This installs all dependecies for both client and server

---

## ▶️ Run the App

On the root folder, run:
```bash
npm run dev
```

This runs both client and server

---

## 🔧 Project Structure

```
├── 📁 client/
│   ├── 📁 public/
│   │   └── 📁 fonts/
│   │   └── 📁 images/
│   ├── 📁 src/
│   │   ├── 📁 assets/
│   │   ├── 📁 components/
│   │   │   ├── 📁 animation/
│   │   │   │   ├── 📄 GradientText.tsx
│   │   │   │   └── 📄 Threads.tsx
│   │   │   ├── 📄 Dropdown.tsx
│   │   │   ├── 📄 Index.tsx
│   │   │   └── 📄 Users.tsx
│   │   ├── 📁 pages/
│   │   │   └── 📄 Home.tsx
│   │   ├── 📄 App.tsx
│   │   ├── 🎨 index.css
│   │   ├── 📄 main.tsx
│   │   └── 📄 vite-env.d.ts
│   ├── 📖 README.md
│   ├── 📄 eslint.config.js
│   ├── 🌐 index.html
│   ├── 📄 package.json
│   ├── 📄 tsconfig.app.json
│   ├── 📄 tsconfig.json
│   ├── 📄 tsconfig.node.json
│   └── 📄 vite.config.ts
├── 📁 server/
│   ├── 📁 src/
│   │   └── 📄 index.ts
│   ├── 📄 package.json
│   └── 📄 tsconfig.json
├── 📖 README.md
└── 📄 package.json
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


