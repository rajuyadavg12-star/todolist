import type { Task } from '../types'
import type { TaskFormValues } from './TaskForm'
import TaskItem from './TaskItem'

interface TaskListProps {
  tasks: Task[]
  editingId: string | null
  onToggle: (id: string) => void
  onEdit: (id: string) => void
  onSaveEdit: (id: string, values: TaskFormValues) => void
  onCancelEdit: () => void
  onDelete: (id: string) => void
}

export default function TaskList({
  tasks,
  editingId,
  onToggle,
  onEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
}: TaskListProps) {
  return (
    <div className="flex flex-col gap-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          isEditing={editingId === task.id}
          onToggle={onToggle}
          onEdit={onEdit}
          onSaveEdit={onSaveEdit}
          onCancelEdit={onCancelEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
