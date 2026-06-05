import TodoItem from './TodoItem'

const TodoList = ({ todos, toggleTodo, deleteTodo, editTodo, search }) => {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon">{search ? '🔍' : '✦'}</span>
        <p>{search ? `"${search}" ke liye koi task nahi mila` : 'Koi task nahi! Add karo ऊपर se.'}</p>
      </div>
    )
  }

  return (
    <ul className="todo-list">
      {todos.map((todo, index) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          index={index}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
          search={search}
        />
      ))}
    </ul>
  )
}

export default TodoList