import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Priority, Task } from '../types'

export interface TaskFormValues {
  title: string
  priority: Priority
  dueDate: string | null
}

interface TaskFormProps {
  initialTask?: Task
  onSubmit: (values: TaskFormValues) => void
  onCancel?: () => void
  submitLabel?: string
}

const priorities: Priority[] = ['Low', 'Medium', 'High']

export default function TaskForm({
  initialTask,
  onSubmit,
  onCancel,
  submitLabel,
}: TaskFormProps) {
  const [title, setTitle] = useState(initialTask?.title ?? '')
  const [priority, setPriority] = useState<Priority>(
    initialTask?.priority ?? 'Medium',
  )
  const [dueDate, setDueDate] = useState(initialTask?.dueDate ?? '')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    onSubmit({
      title: trimmed,
      priority,
      dueDate: dueDate ? dueDate : null,
    })
    if (!initialTask) {
      setTitle('')
      setPriority('Medium')
      setDueDate('')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900"
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-800 placeholder-slate-400 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-indigo-500 dark:focus:ring-indigo-900"
      />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-700 outline-none transition focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        >
          {priorities.map((p) => (
            <option key={p} value={p}>
              {p} priority
            </option>
          ))}
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-700 outline-none transition focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        />
        <div className="flex flex-1 gap-2 sm:justify-end">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-slate-600 transition hover:bg-slate-100 sm:flex-none dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={!title.trim()}
            className="flex-1 rounded-xl bg-indigo-600 px-5 py-2.5 font-medium text-white shadow-sm transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
          >
            {submitLabel ?? (initialTask ? 'Save' : 'Add Task')}
          </button>
        </div>
      </div>
    </form>
  )
}
