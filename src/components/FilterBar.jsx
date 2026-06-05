const FILTERS = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "completed", label: "Done" },
  { key: "high", label: "🔥 Urgent" },
]

const SORTS = [
  { key: "newest", label: "Newest" },
  { key: "oldest", label: "Oldest" },
  { key: "priority", label: "Priority" },
  { key: "az", label: "A→Z" },
]

const FilterBar = ({ filter, setFilter, sort, setSort, counts }) => {
  return (
    <div className="filterbar">
      <div className="filter-chips">
        {FILTERS.map(f => (
          <button
            key={f.key}
            className={`chip ${filter === f.key ? 'chip--active' : ''}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
            <span className="chip-count">{counts[f.key] ?? 0}</span>
          </button>
        ))}
      </div>

      <select
        className="sort-select"
        value={sort}
        onChange={e => setSort(e.target.value)}
      >
        {SORTS.map(s => (
          <option key={s.key} value={s.key}>{s.label}</option>
        ))}
      </select>
    </div>
  )
}

export default FilterBar