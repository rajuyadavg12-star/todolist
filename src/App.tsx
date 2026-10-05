import { useMemo, useState } from 'react'
import ConfirmDialog from './components/ConfirmDialog'
import EmptyState from './components/EmptyState'
import Filters from './components/Filters'
import Statistics from './components/Statistics'
import TaskForm from './components/TaskForm'
import type { TaskFormValues } from './components/TaskForm'
import TaskList from './components/TaskList'
import ThemeToggle from './components/ThemeToggle'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useTheme } from './hooks/useTheme'
import type { Filter, Task } from './types'

function createId() {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export default function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('todo-tasks', [])
  const [filter, setFilter] = useState<Filter>('All')
  const [search, setSearch] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const { theme, toggleTheme } = useTheme()

  const filteredTasks = useMemo(() => {
    const query = search.trim().toLowerCase()
    return tasks.filter((task) => {
      if (filter === 'Active' && task.completed) return false
      if (filter === 'Completed' && !task.completed) return false
      if (query && !task.title.toLowerCase().includes(query)) return false
      return true
    })
  }, [tasks, filter, search])

  const taskToDelete = tasks.find((t) => t.id === deletingId) ?? null

  function addTask(values: TaskFormValues) {
    const task: Task = {
      id: createId(),
      title: values.title,
      priority: values.priority,
      dueDate: values.dueDate,
      completed: false,
      createdAt: Date.now(),
    }
    setTasks((prev) => [task, ...prev])
  }

  function saveEdit(id: string, values: TaskFormValues) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, title: values.title, priority: values.priority, dueDate: values.dueDate }
          : t,
      ),
    )
    setEditingId(null)
  }

  function toggleTask(id: string) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    )
  }

  function confirmDelete() {
    if (deletingId) {
      setTasks((prev) => prev.filter((t) => t.id !== deletingId))
      setDeletingId(null)
    }
  }

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-5">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              My Tasks
            </h1>
            <p className="text-sm text-slate-400 dark:text-slate-500">
              Stay organized and get things done.
            </p>
          </div>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </header>

        <Statistics tasks={tasks} />

        <TaskForm onSubmit={addTask} />

        <Filters
          filter={filter}
          onChange={setFilter}
          search={search}
          onSearchChange={setSearch}
        />

        {filteredTasks.length > 0 ? (
          <TaskList
            tasks={filteredTasks}
            editingId={editingId}
            onToggle={toggleTask}
            onEdit={(id) => setEditingId(id)}
            onSaveEdit={saveEdit}
            onCancelEdit={() => setEditingId(null)}
            onDelete={(id) => setDeletingId(id)}
          />
        ) : (
          <EmptyState
            hasTasks={tasks.length > 0}
            isSearching={search.trim().length > 0}
          />
        )}
      </div>

      <ConfirmDialog
        open={deletingId !== null}
        taskTitle={taskToDelete?.title ?? ''}
        onConfirm={confirmDelete}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  )
}
