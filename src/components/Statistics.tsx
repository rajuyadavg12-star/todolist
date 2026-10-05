import type { Task } from '../types'

interface StatisticsProps {
  tasks: Task[]
}

export default function Statistics({ tasks }: StatisticsProps) {
  const total = tasks.length
  const completed = tasks.filter((t) => t.completed).length
  const active = total - completed
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100)

  const stats = [
    { label: 'Total', value: total, color: 'text-indigo-600 dark:text-indigo-400' },
    { label: 'Active', value: active, color: 'text-amber-600 dark:text-amber-400' },
    { label: 'Completed', value: completed, color: 'text-emerald-600 dark:text-emerald-400' },
  ]

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
      <div className="grid grid-cols-3 divide-x divide-slate-100 dark:divide-slate-800">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center gap-0.5">
            <span className={`text-2xl font-bold ${s.color}`}>{s.value}</span>
            <span className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
              {s.label}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div
          className="h-full rounded-full bg-emerald-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-2 text-right text-xs text-slate-400 dark:text-slate-500">
        {progress}% complete
      </p>
    </div>
  )
}
