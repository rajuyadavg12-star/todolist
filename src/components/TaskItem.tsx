import type { Priority, Task } from '../types'
import type { TaskFormValues } from './TaskForm'
import TaskForm from './TaskForm'

interface TaskItemProps {
  task: Task
  isEditing: boolean
  onToggle: (id: string) => void
  onEdit: (id: string) => void
  onSaveEdit: (id: string, values: TaskFormValues) => void
  onCancelEdit: () => void
  onDelete: (id: string) => void
}

const priorityStyles: Record<Priority, string> = {
  Low: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  Medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  High: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
}

function formatDate(date: string) {
  const parsed = new Date(`${date}T00:00:00`)
  if (Number.isNaN(parsed.getTime())) return date
  return parsed.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function isOverdue(task: Task) {
  if (!task.dueDate || task.completed) return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const due = new Date(`${task.dueDate}T00:00:00`)
  return due < today
}

export default function TaskItem({
  task,
  isEditing,
  onToggle,
  onEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
}: TaskItemProps) {
  if (isEditing) {
    return (
      <div className="animate-fade-in">
        <TaskForm
          initialTask={task}
          onSubmit={(values) => onSaveEdit(task.id, values)}
          onCancel={onCancelEdit}
          submitLabel="Save"
        />
      </div>
    )
  }

  return (
    <div
      className={`group flex items-center gap-3 rounded-2xl border p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md animate-fade-in ${
        task.completed
          ? 'border-slate-100 bg-slate-50/70 dark:border-slate-800/60 dark:bg-slate-900/50'
          : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900'
      }`}
    >
      <button
        type="button"
        onClick={() => onToggle(task.id)}
        aria-label={task.completed ? 'Mark as active' : 'Mark as completed'}
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 ${
          task.completed
            ? 'border-emerald-500 bg-emerald-500 text-white'
            : 'border-slate-300 hover:border-indigo-400 dark:border-slate-600'
        }`}
      >
        {task.completed && (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        )}
      </button>

      <div className="min-w-0 flex-1">
        <p
          className={`truncate font-medium transition-all duration-200 ${
            task.completed
              ? 'text-slate-400 line-through dark:text-slate-500'
              : 'text-slate-800 dark:text-slate-100'
          }`}
        >
          {task.title}
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
          <span className={`rounded-full px-2 py-0.5 font-medium ${priorityStyles[task.priority]}`}>
            {task.priority}
          </span>
          {task.dueDate && (
            <span
              className={`inline-flex items-center gap-1 ${
                isOverdue(task)
                  ? 'font-medium text-rose-500 dark:text-rose-400'
                  : 'text-slate-400 dark:text-slate-500'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              {isOverdue(task) ? 'Overdue · ' : ''}
              {formatDate(task.dueDate)}
            </span>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={() => onEdit(task.id)}
        aria-label="Edit task"
        className="rounded-lg p-2 text-slate-400 opacity-0 transition-all duration-200 hover:bg-indigo-50 hover:text-indigo-600 focus:opacity-100 group-hover:opacity-100 dark:hover:bg-indigo-900/30 dark:hover:text-indigo-400"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => onDelete(task.id)}
        aria-label="Delete task"
        className="rounded-lg p-2 text-slate-400 opacity-0 transition-all duration-200 hover:bg-rose-50 hover:text-rose-600 focus:opacity-100 group-hover:opacity-100 dark:hover:bg-rose-900/30 dark:hover:text-rose-400"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
        </svg>
      </button>
    </div>
  )
}
