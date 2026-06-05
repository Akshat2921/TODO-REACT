import { useForm } from 'react-hook-form'
import { nanoid } from 'nanoid'

const CATEGORIES = ["work", "study", "health", "personal"]
const PRIORITIES = ["high", "medium", "low"]

const AddTodo = ({ addTodo }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm({ defaultValues: { priority: "medium", category: "work", urgent: false } })

  const onSubmit = (data) => {
    addTodo({
      id: nanoid(),
      text: data.urgent ? `🚨 ${data.text}` : data.text,
      priority: data.priority,
      category: data.category,
    })
    reset()
  }

  const watchUrgent = watch("urgent")

  return (
    <form className="add-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Text */}
      <div className="input-row">
        <div className={`text-field ${errors.text ? 'has-error' : ''}`}>
          <input
            {...register("text", {
              required: "Task naam likhna zaroori hai",
              minLength: { value: 2, message: "Kam se kam 2 characters" },
              maxLength: { value: 100, message: "100 characters se zyada nahi" },
            })}
            type="text"
            placeholder="Kya karna hai aaj...?"
            autoComplete="off"
            className={watchUrgent ? 'urgent-input' : ''}
          />
          {errors.text && <span className="field-error">{errors.text.message}</span>}
        </div>

        <button type="submit" className="add-btn">
          <span>+</span>
        </button>
      </div>

      {/* Meta row */}
      <div className="meta-row">
        {/* Category */}
        <select className="meta-select" {...register("category")}>
          {CATEGORIES.map(c => (
            <option key={c} value={c}>
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </option>
          ))}
        </select>

        {/* Priority */}
        <div className="priority-row">
          {PRIORITIES.map(p => (
            <label key={p} className={`priority-radio priority-radio--${p}`}>
              <input type="radio" value={p} {...register("priority")} />
              <span>{p}</span>
            </label>
          ))}
        </div>

        {/* Urgent */}
        <label className={`urgent-toggle ${watchUrgent ? 'active' : ''}`}>
          <input type="checkbox" {...register("urgent")} />
          <span>🚨 Urgent</span>
        </label>
      </div>
    </form>
  )
}

export default AddTodo