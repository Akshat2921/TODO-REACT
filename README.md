# ✦ Taskflow

> A modern, feature-rich Todo application built with React — demonstrating real-world usage of React Hooks, performance optimization, and component architecture.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## 🚀 Live Demo

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-todo--react--chi--seven.vercel.app-7c6cff?style=for-the-badge)](https://todo-react-chi-seven.vercel.app)

---

## 📸 Preview

```
✦ Taskflow
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  12 Total  |  8 Done  |  4 Pending  |  2 Urgent
  ████████████████░░░░ 66% complete
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  [ Kya karna hai aaj...?          ] [+]
  Category ▾  ● High  ○ Med  ○ Low  🚨 Urgent
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ⌕ Search tasks...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  All(12)  Pending(4)  Done(8)  🔥Urgent(2)    Sort: Newest ▾
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ▌ ☐  React seekhna          📚 study  high   2h ago  ✎ ✕
  ▌ ✓  Exercise karna         🏃 health  med   1d ago      ✕
```

---

## ✨ Features

- **Add Tasks** — Text input with validation (min 2, max 100 chars)
- **Priority System** — High / Medium / Low with color-coded indicators
- **Category Tags** — Work, Study, Health, Personal
- **Urgent Flag** — Mark tasks as urgent with 🚨 prefix
- **Complete Toggle** — Click checkbox to mark done/undone
- **Inline Edit** — Edit task text directly in the list (Enter to save, Esc to cancel)
- **Delete Tasks** — Remove individual tasks
- **Clear Completed** — Remove all done tasks at once
- **Filter** — All / Pending / Done / Urgent
- **Sort** — Newest / Oldest / Priority / A→Z
- **Live Search** — Real-time search with highlighted matching text
- **Progress Bar** — Visual completion percentage
- **Stats Dashboard** — Total, Done, Pending, Urgent counts
- **Persistent Storage** — Data saved in `localStorage` — survives page refresh
- **Time Stamps** — "just now", "2h ago", "1d ago" relative time
- **Toast Notifications** — Dynamic contextual alerts for every action (add, edit, delete, clear)
---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI Library |
| Vite | Build Tool & Dev Server |
| React Hook Form | Form state & validation |
| nanoid | Unique ID generation |
| CSS Custom Properties | Theming & dark UI |
| localStorage API | Client-side persistence |
| React Toastify | Toast notifications |
| Vercel | Deployment |
---

## ⚙️ React Concepts Used

### Hooks

| Hook | Where Used | Why |
|---|---|---|
| `useState` | App, TodoItem, AddTodo | Local state management |
| `useEffect` | App | Sync todos → localStorage |
| `useMemo` | App | Cache stats, visibleTodos, counts |
| `useCallback` | App, TodoItem | Stable function references for memoized children |
| `useRef` | AddTodo, TodoItem | Input focus on mount & edit mode |
| `cssTransition` | App | Custom zoom-in toast animation from center screen |

### Performance Optimization

| Technique | Where Applied | Benefit |
|---|---|---|
| `React.memo` | All child components | Prevent unnecessary re-renders |
| `useMemo` — stats | App | Recalculate only when `todos` changes |
| `useMemo` — visibleTodos | App | Recalculate only when todos/filter/sort/search changes |
| `useMemo` — counts | App | Stable object reference for memoized FilterBar |
| `useCallback` — CRUD functions | App | Children don't re-render on unrelated state changes |
| Lazy `useState` init | App | `localStorage` read only once on mount |

### Architecture

```
src/
├── App.jsx                 # Root — state, handlers, layout
├── App.css                 # Global styles & design tokens
└── components/
    ├── AddTodo.jsx         # Form with react-hook-form
    ├── FilterBar.jsx       # Filter chips + sort select
    ├── Stats.jsx           # Stats grid + progress bar
    ├── TodoList.jsx        # List renderer + empty state
    └── TodoItem.jsx        # Single item — edit, delete, toggle
```

**Data flow:**
```
App (state owner)
  ├── stats      → Stats       (read only)
  ├── addTodo    → AddTodo     (write)
  ├── counts     → FilterBar   (read only)
  └── visibleTodos
      toggleTodo
      deleteTodo  → TodoList → TodoItem  (read + write)
      editTodo
      search
```

---

## 📦 Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/Akshat2921

# 2. Go into the project
cd taskflow

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

---

## 🧠 Key Implementation Decisions

### Why `useMemo` for `visibleTodos` and not `useEffect`?

`visibleTodos` is a **derived value** needed during render. `useMemo` computes it synchronously during render — no extra state, no double render. `useEffect` would require an extra `useState`, causing two render cycles (once with stale data, once with fresh).

### Why `useCallback` on CRUD handlers?

All child components are wrapped in `React.memo`. Without `useCallback`, every App re-render creates new function references — `React.memo`'s shallow comparison detects a change and re-renders all children. `useCallback` with `[]` dependency ensures stable references since all handlers use the `prev` updater pattern.

### Why Lazy Initialization in `useState`?

```js
useState(() => {
  return localStorage.getItem("taskflow-todos") || INITIAL_TODOS
})
```

Passing a function instead of a value means `localStorage.getItem` runs only once on mount — not on every re-render. This is important for expensive or side-effectful initializations.

### Why `useRef` in AddTodo?

To programmatically focus the input on mount and after form submit — without causing a re-render. `useState` would trigger a re-render; `useRef` does not.

---

## 📁 Component Responsibilities

### `App.jsx`
State owner. Holds `todos`, `filter`, `sort`, `search`. Computes `stats`, `visibleTodos`, `counts` via `useMemo`. All CRUD handlers defined here with `useCallback` and passed as props.

### `AddTodo.jsx`
Controlled form using `react-hook-form`. Handles text, category (select), priority (radio), urgent (checkbox). Validates on submit. Uses `useRef` for input focus management.

### `FilterBar.jsx`
Stateless display component. Renders filter chips and sort dropdown. Wrapped in `React.memo` — only re-renders when `filter`, `sort`, or `counts` change.

### `Stats.jsx`
Purely presentational. Displays 4 stat pills and a progress bar. Wrapped in `React.memo` — re-renders only when `stats` object changes (which only happens when `todos` changes).

### `TodoList.jsx`
Maps `todos` array to `TodoItem` components. Handles empty state — different message for empty search vs empty list.

### `TodoItem.jsx`
Most complex child. Manages local `isEditing` state. Inline edit with keyboard support (Enter/Escape). Search highlight via `Highlight` sub-component. Time-ago display.

---

## 🎨 Design Decisions

- **Dark theme** with CSS custom properties (`--bg`, `--surface`, `--accent` etc.)
- **Ambient blobs** — fixed background decorations using CSS blur
- **Priority color coding** — Red (high), Amber (medium), Green (low)
- **Left border accent** on each todo item — instant visual priority indicator
- **Hover-only actions** — Edit/Delete buttons appear on hover to reduce visual noise
- **Smooth animations** — `slideIn` on new items, `fadeUp` on card mount
- **Toast notifications** — Every CRUD action triggers a dynamic toast: shows old→new text on edit, count on clear, task name on delete. Custom `cssTransition` creates a zoom-from-center animation that lands at bottom-right. Styled to match dark theme — `#1a1a24` surface, left border accent per type (green/red/purple), gradient progress bar
---

## 🔮 Future Improvements

- [ ] Drag & drop reordering
- [ ] Due dates with reminders
- [ ] Multiple lists / boards
- [ ] Dark / Light theme toggle
- [ ] Backend sync with user auth
- [ ] PWA support — offline usage

---

## 👨‍💻 Author

**Akshat**
- GitHub: [@your-Akshat Jain](https://github.com/Akshat2921)
<!-- - LinkedIn: [your-linkedin](https://linkedin.com/in/your-linkedin) -->

---

## 📸 Preview

> Dark themed UI with ambient gradient background, smooth animations, and fully responsive layout.

---
---

## 📄 License

MIT License — feel free to use this project for learning or as a template.

---


<div align="center">

Made with ❤️ by [Akshat](https://github.com/Akshat2921) while learning React

</div> -->

<!-- <div align="center">

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

</div> -->
