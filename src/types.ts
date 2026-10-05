export type Priority = 'Low' | 'Medium' | 'High'

export interface Task {
  id: string
  title: string
  priority: Priority
  dueDate: string | null
  completed: boolean
  createdAt: number
}

export type Filter = 'All' | 'Active' | 'Completed'
