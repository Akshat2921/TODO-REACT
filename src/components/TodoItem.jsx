import { useState, memo, useCallback, useRef } from 'react'

const Highlight = memo(({ text, search }) => {
  // memo: text aur search same hain toh re-render nahi
  if (!search.trim()) return <>{text}</>
  const parts = text.split(new RegExp(`(${search})`, 'gi'))
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === search.toLowerCase()
          ? <mark key={i} className="search-highlight">{part}</mark>
          : part
      )}
    </>
  )
})
Highlight.displayName = 'Highlight'

const CATEGORY_ICONS = {
  work: '💼', study: '📚', health: '🏃', personal: '✨'
}

const timeAgo = (ts) => {
  const diff = Date.now() - ts
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

// memo: todo object same ho, functions same hon — re-render nahi
// toggleTodo, deleteTodo, editTodo useCallback se stable hain
const TodoItem = memo(({ todo, toggleTodo, deleteTodo, editTodo, search, index }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  // useRef: edit input pe autoFocus already hai
  // lekin programmatically bhi focus karna ho toh ref useful
  // ye ek meaningful use hai — edit mode toggle hone par focus
  const editInputRef = useRef(null)

  // useCallback: ye functions isEditing state pe depend karte hain
  // TodoItem ke andar hain — parent se nahi aate
  // NOTE: TodoItem pehle se memo se wrap hai
  // Andar ke functions ke liye useCallback ka fayda limited hai
  // kyunki TodoItem khud re-render hoga jab isEditing badle
  // Comment: Ye useCallback yahan technically zaroori nahi
  // concept apply karne ke liye use kiya — avoid kar sakte hain
  const handleEdit = useCallback(() => {
    if (editText.trim().length < 2) return
    editTodo(todo.id, editText.trim())
    setIsEditing(false)
  }, [editText, editTodo, todo.id])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') handleEdit()
    if (e.key === 'Escape') {
      setEditText(todo.text)
      setIsEditing(false)
    }
  }, [handleEdit, todo.text])

  const handleEditToggle = useCallback(() => {
    setIsEditing(e => !e)
  }, [])

  return (
    <li
      className={`todo-item todo-item--${todo.priority} ${todo.completed ? 'todo-item--done' : ''}`}
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <button
        className={`check-btn ${todo.completed ? 'check-btn--done' : ''}`}
        onClick={() => toggleTodo(todo.id)}
        aria-label="Toggle complete"
      >
        {todo.completed && <span>✓</span>}
      </button>

      <div className="item-content">
        {isEditing ? (
          <input
            ref={editInputRef}
            className="edit-input"
            value={editText}
            onChange={e => setEditText(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <p className={`item-text ${todo.completed ? 'item-text--done' : ''}`}>
            <Highlight text={todo.text} search={search} />
          </p>
        )}

        <div className="item-meta">
          <span className="meta-category">
            {CATEGORY_ICONS[todo.category]} {todo.category}
          </span>
          <span className={`meta-priority priority--${todo.priority}`}>
            {todo.priority}
          </span>
          <span className="meta-time">{timeAgo(todo.createdAt)}</span>
        </div>
      </div>

      <div className="item-actions">
        {!todo.completed && (
          <button
            className="action-btn action-btn--edit"
            onClick={handleEditToggle}
            aria-label="Edit"
          >
            ✎
          </button>
        )}
        <button
          className="action-btn action-btn--delete"
          onClick={() => deleteTodo(todo.id)}
          aria-label="Delete"
        >
          ✕
        </button>
      </div>
    </li>
  )
})

TodoItem.displayName = 'TodoItem'
export default TodoItem

// import { useState } from 'react'

// // Highlight matching search text
// const Highlight = ({ text, search }) => {
//   if (!search.trim()) return <>{text}</>
//   const parts = text.split(new RegExp(`(${search})`, 'gi'))
//   return (
//     <>
//       {parts.map((part, i) =>
//         part.toLowerCase() === search.toLowerCase()
//           ? <mark key={i} className="search-highlight">{part}</mark>
//           : part
//       )}
//     </>
//   )
// }

// const CATEGORY_ICONS = {
//   work: '💼', study: '📚', health: '🏃', personal: '✨'
// }
//  const timeAgo = (ts) => {
//     const diff = Date.now() - ts
//     const mins = Math.floor(diff / 60000)
//     if (mins < 1) return 'just now'
//     if (mins < 60) return `${mins}m ago`
//     const hrs = Math.floor(mins / 60)
//     if (hrs < 24) return `${hrs}h ago`
//     return `${Math.floor(hrs / 24)}d ago`
//   }
// const TodoItem = ({ todo, toggleTodo, deleteTodo, editTodo, search, index }) => {
//   const [isEditing, setIsEditing] = useState(false)
//   const [editText, setEditText] = useState(todo.text)

//   const handleEdit = () => {
//     if (editText.trim().length < 2) return
//     editTodo(todo.id, editText.trim())
//     setIsEditing(false)
//   }

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') handleEdit()
//     if (e.key === 'Escape') { setEditText(todo.text); setIsEditing(false) }
//   }


//   return (
//     <li
//       className={`todo-item todo-item--${todo.priority} ${todo.completed ? 'todo-item--done' : ''}`}
//       style={{ animationDelay: `${index * 40}ms` }}
//     >
//       {/* Checkbox */}
//       <button
//         className={`check-btn ${todo.completed ? 'check-btn--done' : ''}`}
//         onClick={() => toggleTodo(todo.id)}
//         aria-label="Toggle complete"
//       >
//         {todo.completed && <span>✓</span>}
//       </button>

//       {/* Content */}
//       <div className="item-content">
//         {isEditing ? (
//           <input
//             className="edit-input"
//             value={editText}
//             onChange={e => setEditText(e.target.value)}
//             onBlur={handleEdit}
//             onKeyDown={handleKeyDown}
//             autoFocus
//           />
//         ) : (
//           <p className={`item-text ${todo.completed ? 'item-text--done' : ''}`}>
//             <Highlight text={todo.text} search={search} />
//           </p>
//         )}

//         <div className="item-meta">
//           <span className="meta-category">
//             {CATEGORY_ICONS[todo.category]} {todo.category}
//           </span>
//           <span className={`meta-priority priority--${todo.priority}`}>
//             {todo.priority}
//           </span>
//           <span className="meta-time">{timeAgo(todo.createdAt)}</span>
//         </div>
//       </div>

//       {/* Actions */}
//       <div className="item-actions">
//         {!todo.completed && (
//           <button
//             className="action-btn action-btn--edit"
//             onClick={() => setIsEditing(e => !e)}
//             aria-label="Edit"
//           >
//             ✎
//           </button>
//         )}
//         <button
//           className="action-btn action-btn--delete"
//           onClick={() => deleteTodo(todo.id)}
//           aria-label="Delete"
//         >
//           ✕
//         </button>
//       </div>
//     </li>
//   )
// }

// export default TodoItem
