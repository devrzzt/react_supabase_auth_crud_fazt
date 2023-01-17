import { ReactNode } from 'react'

export interface ITask {
  id: string
  created_at: string
  name: string
  done: boolean
  user_id: string
}

export type TaskContextType = {
  tasks: ITask[]
  isLoading: boolean
  getTasks: (done: boolean) => void
  createTask: (taskName: string) => void
  deleteTask: (id: string) => void
  updateTask: (id: string, updateFields: Object) => void
}

export interface Props {
  children?: ReactNode
}
