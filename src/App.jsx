import { useState, useMemo, useEffect } from 'react'
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
  // useState ki jagah yeh likho
const [todos, setTodos] = useState(() => {
  const saved = localStorage.getItem("taskflow-todos")
  return saved ? JSON.parse(saved) : INITIAL_TODOS
})

// Aur yeh useEffect add karo (import mein useEffect bhi add karo)
useEffect(() => {
  localStorage.setItem("taskflow-todos", JSON.stringify(todos))
}, [todos])
  const [filter, setFilter] = useState("all")
  const [sort, setSort] = useState("newest")
  const [search, setSearch] = useState("")

  // ── ADD ──────────────────────────────────────────────
  const addTodo = (newTodo) => {
    setTodos(prev => [
      { ...newTodo, id: Date.now(), completed: false, createdAt: Date.now() },
      ...prev
    ])
  }

  // ── TOGGLE ───────────────────────────────────────────
  const toggleTodo = (id) => {
    setTodos(prev =>
      prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    )
  }

  // ── DELETE ───────────────────────────────────────────
  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  // ── EDIT ─────────────────────────────────────────────
  const editTodo = (id, newText) => {
    setTodos(prev =>
      prev.map(t => t.id === id ? { ...t, text: newText } : t)
    )
  }

  // ── CLEAR COMPLETED ──────────────────────────────────
  const clearCompleted = () => {
    setTodos(prev => prev.filter(t => !t.completed))
  }

  // ── STATS ────────────────────────────────────────────
  const stats = useMemo(() => ({
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    pending: todos.filter(t => !t.completed).length,
    highPriority: todos.filter(t => t.priority === 'high' && !t.completed).length,
  }), [todos])

  // ── FILTER + SORT + SEARCH ───────────────────────────
  const visibleTodos = useMemo(() => {
    let result = todos

    // search
    if (search.trim()) {
      result = result.filter(t =>
        t.text.toLowerCase().includes(search.toLowerCase())
      )
    }

    // filter
    if (filter === "completed") result = result.filter(t => t.completed)
    else if (filter === "pending") result = result.filter(t => !t.completed)
    else if (filter === "high") result = result.filter(t => t.priority === "high")

    // sort
    if (sort === "newest") result = [...result].sort((a, b) => b.createdAt - a.createdAt)
    else if (sort === "oldest") result = [...result].sort((a, b) => a.createdAt - b.createdAt)
    else if (sort === "priority") {
      const order = { high: 0, medium: 1, low: 2 }
      result = [...result].sort((a, b) => order[a.priority] - order[b.priority])
    }
    else if (sort === "az") result = [...result].sort((a, b) => a.text.localeCompare(b.text))

    return result
  }, [todos, filter, sort, search])

  return (
    <div className="app-shell">
      {/* Ambient background blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <main className="app-card">
        {/* Header */}
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

        {/* Stats */}
        <Stats stats={stats} />

        {/* Add Form */}
        <AddTodo addTodo={addTodo} />

        {/* Search */}
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

        {/* Filter + Sort */}
        <FilterBar
          filter={filter} setFilter={setFilter}
          sort={sort} setSort={setSort}
          counts={{
            all: todos.length,
            pending: stats.pending,
            completed: stats.completed,
            high: stats.highPriority,
          }}
        />

        {/* List */}
        <TodoList
          todos={visibleTodos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
          search={search}
        />

        {/* Footer */}
        <footer className="app-footer">
          {visibleTodos.length} task{visibleTodos.length !== 1 ? 's' : ''} shown
          {search && ` · searching "${search}"`}
        </footer>
      </main>
    </div>
  )
}

export default App