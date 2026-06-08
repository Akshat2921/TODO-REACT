import { memo } from 'react'

// memo: stats object badle tabhi re-render
// search/filter/sort se Stats re-render nahi hoga
// stats sirf todos badle tab badlta hai — useMemo se
const Stats = memo(({ stats }) => {
  const percent = stats.total === 0
    ? 0
    : Math.round((stats.completed / stats.total) * 100)

  return (
    <div className="stats-section">
      <div className="stats-grid">
        <div className="stat-pill stat-total">
          <span className="stat-num">{stats.total}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-pill stat-done">
          <span className="stat-num">{stats.completed}</span>
          <span className="stat-label">Done</span>
        </div>
        <div className="stat-pill stat-pending">
          <span className="stat-num">{stats.pending}</span>
          <span className="stat-label">Pending</span>
        </div>
        <div className="stat-pill stat-urgent">
          <span className="stat-num">{stats.highPriority}</span>
          <span className="stat-label">Urgent</span>
        </div>
      </div>

      {stats.total > 0 && (
        <div className="progress-wrap">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${percent}%` }} />
          </div>
          <span className="progress-label">{percent}% complete</span>
        </div>
      )}
    </div>
  )
})

Stats.displayName = 'Stats'
export default Stats

// const Stats = ({ stats }) => {
//   const percent = stats.total === 0 ? 0 : Math.round((stats.completed / stats.total) * 100)

//   return (
//     <div className="stats-section">
//       <div className="stats-grid">
//         <div className="stat-pill stat-total">
//           <span className="stat-num">{stats.total}</span>
//           <span className="stat-label">Total</span>
//         </div>
//         <div className="stat-pill stat-done">
//           <span className="stat-num">{stats.completed}</span>
//           <span className="stat-label">Done</span>
//         </div>
//         <div className="stat-pill stat-pending">
//           <span className="stat-num">{stats.pending}</span>
//           <span className="stat-label">Pending</span>
//         </div>
//         <div className="stat-pill stat-urgent">
//           <span className="stat-num">{stats.highPriority}</span>
//           <span className="stat-label">Urgent</span>
//         </div>
//       </div>

//       {/* Progress bar */}
//       {stats.total > 0 && (
//         <div className="progress-wrap">
//           <div className="progress-bar">
//             <div
//               className="progress-fill"
//               style={{ width: `${percent}%` }}
//             />
//           </div>
//           <span className="progress-label">{percent}% complete</span>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Stats

