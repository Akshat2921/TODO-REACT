import { useForm } from 'react-hook-form'
import { nanoid } from 'nanoid'
import { memo, useRef, useEffect } from 'react'
import { toast } from 'react-toastify'
const CATEGORIES = ["work", "study", "health", "personal"]
const PRIORITIES = ["high", "medium", "low"]

const AddTodo = memo(({ addTodo }) => {
  // memo: addTodo prop stable hai (useCallback se)
  // search type karo — App re-render — AddTodo re-render nahi

  // useRef: Input pe focus karna on mount
  // Meaningful use — user seedha type kar sake bina click kiye
  // useState se karte toh re-render hota — useRef se nahi
  const inputRef = useRef(null)

  useEffect(() => {
    // Page load hone par input pe focus
    inputRef.current?.focus()
  }, []) // sirf ek baar — mount pe

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: { priority: "medium", category: "work", urgent: false }
  })

  const onSubmit = (data) => {
    addTodo({
      id: nanoid(),
      text: data.urgent ? `🚨 ${data.text}` : data.text,
      priority: data.priority,
      category: data.category,
    })
    toast.success(`"${data.text.slice(0, 30)}" add ho gaya ✦`)
    reset()
    // Submit ke baad focus wapas input pe
    inputRef.current?.focus()
  }

  const watchUrgent = watch("urgent")

  // register se jo ref aata hai usse merge karna zaroori hai
  // react-hook-form apna ref rakhta hai — hum apna bhi rakhna chahte hain
  const { ref: registerRef, ...textRegister } = register("text", {
    required: "Task naam likhna zaroori hai",
    minLength: { value: 2, message: "Kam se kam 2 characters" },
    maxLength: { value: 100, message: "100 characters se zyada nahi" },
  })

  return (
    <form className="add-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="input-row">
        <div className={`text-field ${errors.text ? 'has-error' : ''}`}>
          <input
            {...textRegister}
            ref={(e) => {
              registerRef(e)      // react-hook-form ka ref
              inputRef.current = e // hamara ref
            }}
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

      <div className="meta-row">
        <select className="meta-select" {...register("category")}>
          {CATEGORIES.map(c => (
            <option key={c} value={c}>
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </option>
          ))}
        </select>

        <div className="priority-row">
          {PRIORITIES.map(p => (
            <label key={p} className={`priority-radio priority-radio--${p}`}>
              <input type="radio" value={p} {...register("priority")} />
              <span>{p}</span>
            </label>
          ))}
        </div>

        <label className={`urgent-toggle ${watchUrgent ? 'active' : ''}`}>
          <input type="checkbox" {...register("urgent")} />
          <span>🚨 Urgent</span>
        </label>
      </div>
    </form>
  )
})

AddTodo.displayName = 'AddTodo'
export default AddTodo

// import { useForm } from 'react-hook-form'
// import { nanoid } from 'nanoid'

// const CATEGORIES = ["work", "study", "health", "personal"]
// const PRIORITIES = ["high", "medium", "low"]

// const AddTodo = ({ addTodo }) => {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     watch,
//     formState: { errors }
//   } = useForm({ defaultValues: { priority: "medium", category: "work", urgent: false } })

//   const onSubmit = (data) => {
//     addTodo({
//       id: nanoid(),
//       text: data.urgent ? `🚨 ${data.text}` : data.text,
//       priority: data.priority,
//       category: data.category,
//     })
//     reset()
//   }

//   const watchUrgent = watch("urgent")

//   return (
//     <form className="add-form" onSubmit={handleSubmit(onSubmit)} noValidate>
//       {/* Text */}
//       <div className="input-row">
//         <div className={`text-field ${errors.text ? 'has-error' : ''}`}>
//           <input
//             {...register("text", {
//               required: "Task naam likhna zaroori hai",
//               minLength: { value: 2, message: "Kam se kam 2 characters" },
//               maxLength: { value: 100, message: "100 characters se zyada nahi" },
//             })}
//             type="text"
//             placeholder="Kya karna hai aaj...?"
//             autoComplete="off"
//             className={watchUrgent ? 'urgent-input' : ''}
//           />
//           {errors.text && <span className="field-error">{errors.text.message}</span>}
//         </div>

//         <button type="submit" className="add-btn">
//           <span>+</span>
//         </button>
//       </div>

//       {/* Meta row */}
//       <div className="meta-row">
//         {/* Category */}
//         <select className="meta-select" {...register("category")}>
//           {CATEGORIES.map(c => (
//             <option key={c} value={c}>
//               {c.charAt(0).toUpperCase() + c.slice(1)}
//             </option>
//           ))}
//         </select>

//         {/* Priority */}
//         <div className="priority-row">
//           {PRIORITIES.map(p => (
//             <label key={p} className={`priority-radio priority-radio--${p}`}>
//               <input type="radio" value={p} {...register("priority")} />
//               <span>{p}</span>
//             </label>
//           ))}
//         </div>

//         {/* Urgent */}
//         <label className={`urgent-toggle ${watchUrgent ? 'active' : ''}`}>
//           <input type="checkbox" {...register("urgent")} />
//           <span>🚨 Urgent</span>
//         </label>
//       </div>
//     </form>
//   )
// }

// export default AddTodo

