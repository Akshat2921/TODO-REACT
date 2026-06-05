<div align="center">

# ✦ Taskflow

### A sleek, feature-rich todo app built with React

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-todo--react--chi--seven.vercel.app-7c6cff?style=for-the-badge)](https://todo-react-chi-seven.vercel.app)
[![React](https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646cff?style=for-the-badge&logo=vite)](https://vitejs.dev)

![Taskflow Preview](https://todo-react-chi-seven.vercel.app/og-preview.png)

</div>

---

## 🌟 Features

| Feature | Description |
|---|---|
| ➕ **Add Tasks** | Create todos with title, category, priority & urgent flag |
| ✏️ **Inline Edit** | Click edit button to rename any task in place |
| ✅ **Toggle Complete** | Check/uncheck tasks with smooth visual feedback |
| 🗑️ **Delete** | Remove individual tasks or clear all completed at once |
| 🔍 **Live Search** | Search tasks with real-time keyword highlight |
| 🎯 **Filter** | View All / Pending / Done / Urgent tasks |
| ↕️ **Sort** | Sort by Newest, Oldest, Priority, or A→Z |
| 📊 **Stats** | Live count of total, completed, pending & urgent tasks |
| 📈 **Progress Bar** | Visual completion percentage tracker |
| 💾 **Persistence** | Data saved in localStorage — survives page refresh |
| 🚨 **Urgent Flag** | Mark tasks as urgent with 🚨 prefix |

---

## 🛠️ Tech Stack

- **React 18** — Component-based UI
- **Vite** — Lightning fast dev server & build tool
- **React Hook Form** — Performant form handling with validation
- **nanoid** — Unique ID generation
- **localStorage** — Client-side data persistence
- **CSS Custom Properties** — Dark theme with ambient design

---

## 🧠 React Concepts Used

```
✦ useState          — managing todos, filter, sort, search state
✦ useMemo           — optimized filtering, sorting & stats computation  
✦ useEffect         — localStorage sync on state change
✦ Props & Callbacks — data down, events up pattern
✦ Controlled Inputs — two-way binding for search
✦ React Hook Form   — uncontrolled form with validation
✦ Conditional CSS   — dynamic classNames based on state
✦ Array methods     — .map(), .filter(), .sort() for list operations
```

---

## 📁 Project Structure

```
src/
├── App.jsx              # Root component — state & logic
├── App.css              # Global dark theme styles
├── main.jsx             # Entry point
└── components/
    ├── AddTodo.jsx      # Form with react-hook-form + validation
    ├── Stats.jsx        # Stats grid + progress bar
    ├── FilterBar.jsx    # Filter chips + sort dropdown
    ├── TodoList.jsx     # List renderer + empty state
    └── TodoItem.jsx     # Individual card with edit/delete
```

---

## 🚀 Run Locally

```bash
# Clone the repo
git clone https://github.com/Akshat2921/Todo-React.git

# Go into the folder
cd Todo-React

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📸 Preview

> Dark themed UI with ambient gradient background, smooth animations, and fully responsive layout.

---

<div align="center">

Made with ❤️ by [Akshat](https://github.com/Akshat2921)

</div>
