import { useState, useMemo, useEffect, useCallback } from 'react'
import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'
import Stats from './components/Stats'
import FilterBar from './components/FilterBar'
import './App.css'

const INITIAL_TODOS = [
  { id: 1, text: "React seekhna", priority: "high", category: "study", completed: false, createdAt: Date.now() - 86400000 },
  { id: 2, text: "Exercise karna", priority: "medium", category: "health", completed: true, createdAt: Date.now() - 43200000 },
  { id: 3, text: "Portfolio banana", priority: "high", category: "work", completed: false, createdAt: Date.now() - 3600000 },
]

const App = () => {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("taskflow-todos")
    return saved ? JSON.parse(saved) : INITIAL_TODOS
  })
  const [filter, setFilter] = useState("all")
  const [sort, setSort] = useState("newest")
  const [search, setSearch] = useState("")

  useEffect(() => {
    localStorage.setItem("taskflow-todos", JSON.stringify(todos))
  }, [todos])

  // ── ADD ──────────────────────────────────────────────
  // useCallback: addTodo AddTodo component ko prop mein jaata hai
  // AddTodo React.memo se wrap hai — stable reference chahiye
  // warna har App re-render pe AddTodo bhi re-render hoga
  const addTodo = useCallback((newTodo) => {
    setTodos(prev => [
      { ...newTodo, completed: false, createdAt: Date.now() },
      ...prev
    ])
  }, []) // koi dependency nahi — prev use kiya, todos nahi

  // ── TOGGLE ───────────────────────────────────────────
  // useCallback: TodoItem ko prop mein jaata hai
  // TodoItem React.memo se wrap hai
  // search type karo — search state badli — App re-render
  // bina useCallback ke nayi toggleTodo banti — TodoItem re-render
  const toggleTodo = useCallback((id) => {
    setTodos(prev =>
      prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    )
  }, []) // prev use kiya — todos pe depend nahi

  // ── DELETE ───────────────────────────────────────────
  // useCallback: same reason — TodoItem ko jaata hai
  const deleteTodo = useCallback((id) => {
    setTodos(prev => prev.filter(t => t.id !== id))
  }, [])

  // ── EDIT ─────────────────────────────────────────────
  // useCallback: TodoItem ko jaata hai
  const editTodo = useCallback((id, newText) => {
    setTodos(prev =>
      prev.map(t => t.id === id ? { ...t, text: newText } : t)
    )
  }, [])

  // ── CLEAR COMPLETED ──────────────────────────────────
  // useCallback: Header button ko jaata hai
  // Stats component mein pass hota hai — React.memo ke saath useful
  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(t => !t.completed))
  }, [])

  // ── STATS ────────────────────────────────────────────
  // useMemo: Sahi jagah — todos pe 4 alag filter calculations
  // filter/sort/search badle toh stats dobara nahi chahiye
  // todos badle tabhi recalculate karo
  const stats = useMemo(() => ({
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    pending: todos.filter(t => !t.completed).length,
    highPriority: todos.filter(t => t.priority === 'high' && !t.completed).length,
  }), [todos])

  // ── FILTER + SORT + SEARCH ───────────────────────────
  // useMemo: Sahi jagah — multiple operations chain hoti hain
  // filter → sort → search — sab milake heavy ho sakta hai
  // 4 dependencies — inme se koi bhi badle toh recalculate
  const visibleTodos = useMemo(() => {
    let result = todos

    if (search.trim()) {
      result = result.filter(t =>
        t.text.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (filter === "completed") result = result.filter(t => t.completed)
    else if (filter === "pending") result = result.filter(t => !t.completed)
    else if (filter === "high") result = result.filter(t => t.priority === "high")

    if (sort === "newest") result = [...result].sort((a, b) => b.createdAt - a.createdAt)
    else if (sort === "oldest") result = [...result].sort((a, b) => a.createdAt - b.createdAt)
    else if (sort === "priority") {
      const order = { high: 0, medium: 1, low: 2 }
      result = [...result].sort((a, b) => order[a.priority] - order[b.priority])
    }
    else if (sort === "az") result = [...result].sort((a, b) => a.text.localeCompare(b.text))

    return result
  }, [todos, filter, sort, search])

  // ── COUNTS ───────────────────────────────────────────
  // useMemo: FilterBar ko counts object jaata hai
  // FilterBar React.memo se wrap hai
  // Har render pe naya object banta — React.memo fail ho jaata
  // useMemo se stable reference — FilterBar unnecessary re-render nahi
  const counts = useMemo(() => ({
    all: todos.length,
    pending: stats.pending,
    completed: stats.completed,
    high: stats.highPriority,
  }), [todos, stats])

  return (
    <div className="app-shell">
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <main className="app-card">
        <header className="app-header">
          <div className="header-left">
            <span className="app-logo">✦</span>
            <h1 className="app-title">Taskflow</h1>
          </div>
          {stats.completed > 0 && (
            <button className="clear-btn" onClick={clearCompleted}>
              Clear done ({stats.completed})
            </button>
          )}
        </header>

        <Stats stats={stats} />

        <AddTodo addTodo={addTodo} />

        <div className="search-wrap">
          <span className="search-icon">⌕</span>
          <input
            className="search-input"
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button className="search-clear" onClick={() => setSearch("")}>✕</button>
          )}
        </div>

        <FilterBar
          filter={filter} setFilter={setFilter}
          sort={sort} setSort={setSort}
          counts={counts}
        />

        <TodoList
          todos={visibleTodos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
          search={search}
        />

        <footer className="app-footer">
          {visibleTodos.length} task{visibleTodos.length !== 1 ? 's' : ''} shown
          {search && ` · searching "${search}"`}
        </footer>
      </main>
    </div>
  )
}

export default App



// import { useState, useMemo, useEffect } from 'react'
// import AddTodo from './components/AddTodo'
// import TodoList from './components/TodoList'
// import Stats from './components/Stats'
// import FilterBar from './components/FilterBar'
// import './App.css'

// const INITIAL_TODOS = [
//   { id: 1, text: "React seekhna", priority: "high", category: "study", completed: false, createdAt: Date.now() - 86400000 },
//   { id: 2, text: "Exercise karna", priority: "medium", category: "health", completed: true, createdAt: Date.now() - 43200000 },
//   { id: 3, text: "Portfolio banana", priority: "high", category: "work", completed: false, createdAt: Date.now() - 3600000 },
// ]

// const App = () => {
//   // useState ki jagah yeh likho
// const [todos, setTodos] = useState(() => {
//   const saved = localStorage.getItem("taskflow-todos")
//   return saved ? JSON.parse(saved) : INITIAL_TODOS
// })

// // Aur yeh useEffect add karo (import mein useEffect bhi add karo)
// useEffect(() => {
//   localStorage.setItem("taskflow-todos", JSON.stringify(todos))
// }, [todos])
//   const [filter, setFilter] = useState("all")
//   const [sort, setSort] = useState("newest")
//   const [search, setSearch] = useState("")

//   // ── ADD ──────────────────────────────────────────────
//   const addTodo = (newTodo) => {
//     setTodos(prev => [
//       { ...newTodo, id: Date.now(), completed: false, createdAt: Date.now() },
//       ...prev
//     ])
//   }

//   // ── TOGGLE ───────────────────────────────────────────
//   const toggleTodo = (id) => {
//     setTodos(prev =>
//       prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
//     )
//   }

//   // ── DELETE ───────────────────────────────────────────
//   const deleteTodo = (id) => {
//     setTodos(prev => prev.filter(t => t.id !== id))
//   }

//   // ── EDIT ─────────────────────────────────────────────
//   const editTodo = (id, newText) => {
//     setTodos(prev =>
//       prev.map(t => t.id === id ? { ...t, text: newText } : t)
//     )
//   }

//   // ── CLEAR COMPLETED ──────────────────────────────────
//   const clearCompleted = () => {
//     setTodos(prev => prev.filter(t => !t.completed))
//   }

//   // ── STATS ────────────────────────────────────────────
//   const stats = useMemo(() => ({
//     total: todos.length,
//     completed: todos.filter(t => t.completed).length,
//     pending: todos.filter(t => !t.completed).length,
//     highPriority: todos.filter(t => t.priority === 'high' && !t.completed).length,
//   }), [todos])

//   // ── FILTER + SORT + SEARCH ───────────────────────────
//   const visibleTodos = useMemo(() => {
//     let result = todos

//     // search
//     if (search.trim()) {
//       result = result.filter(t =>
//         t.text.toLowerCase().includes(search.toLowerCase())
//       )
//     }

//     // filter
//     if (filter === "completed") result = result.filter(t => t.completed)
//     else if (filter === "pending") result = result.filter(t => !t.completed)
//     else if (filter === "high") result = result.filter(t => t.priority === "high")

//     // sort
//     if (sort === "newest") result = [...result].sort((a, b) => b.createdAt - a.createdAt)
//     else if (sort === "oldest") result = [...result].sort((a, b) => a.createdAt - b.createdAt)
//     else if (sort === "priority") {
//       const order = { high: 0, medium: 1, low: 2 }
//       result = [...result].sort((a, b) => order[a.priority] - order[b.priority])
//     }
//     else if (sort === "az") result = [...result].sort((a, b) => a.text.localeCompare(b.text))

//     return result
//   }, [todos, filter, sort, search])

//   return (
//     <div className="app-shell">
//       {/* Ambient background blobs */}
//       <div className="blob blob-1" />
//       <div className="blob blob-2" />
//       <div className="blob blob-3" />

//       <main className="app-card">
//         {/* Header */}
//         <header className="app-header">
//           <div className="header-left">
//             <span className="app-logo">✦</span>
//             <h1 className="app-title">Taskflow</h1>
//           </div>
//           {stats.completed > 0 && (
//             <button className="clear-btn" onClick={clearCompleted}>
//               Clear done ({stats.completed})
//             </button>
//           )}
//         </header>

//         {/* Stats */}
//         <Stats stats={stats} />

//         {/* Add Form */}
//         <AddTodo addTodo={addTodo} />

//         {/* Search */}
//         <div className="search-wrap">
//           <span className="search-icon">⌕</span>
//           <input
//             className="search-input"
//             type="text"
//             placeholder="Search tasks..."
//             value={search}
//             onChange={e => setSearch(e.target.value)}
//           />
//           {search && (
//             <button className="search-clear" onClick={() => setSearch("")}>✕</button>
//           )}
//         </div>

//         {/* Filter + Sort */}
//         <FilterBar
//           filter={filter} setFilter={setFilter}
//           sort={sort} setSort={setSort}
//           counts={{
//             all: todos.length,
//             pending: stats.pending,
//             completed: stats.completed,
//             high: stats.highPriority,
//           }}
//         />

//         {/* List */}
//         <TodoList
//           todos={visibleTodos}
//           toggleTodo={toggleTodo}
//           deleteTodo={deleteTodo}
//           editTodo={editTodo}
//           search={search}
//         />

//         {/* Footer */}
//         <footer className="app-footer">
//           {visibleTodos.length} task{visibleTodos.length !== 1 ? 's' : ''} shown
//           {search && ` · searching "${search}"`}
//         </footer>
//       </main>
//     </div>
//   )
// }

// export default App
