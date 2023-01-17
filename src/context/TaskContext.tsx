import React, { createContext, useContext, useState } from 'react'
import { ITask, TaskContextType, Props } from '../types/task'
import { supabase } from '../db/client'

export const TaskContent = createContext<TaskContextType | null>(null)

export const useTasks = () => {
  const context = useContext(TaskContent)
  if (!context) throw new Error('useTasks must be used within a TaskContext')
  return context
}

export const TaskContentProvider = ({ children }: Props) => {
  const [tasks, setTasks] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const getTasks = async (done = false) => {
    setIsLoading(true)
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const { data, error } = await supabase
      .from('tasks')
      .select()
      .eq('user_id', user?.id)
      .eq('done', done)
      .order('id', { ascending: true })

    if (error) throw error

    setTasks(data)
    setIsLoading(false)
  }

  const createTask = async (taskName: string) => {
    setIsLoading(true)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        const { data, error } = await supabase
          .from('tasks')
          .insert({
            name: taskName,
            user_id: user.id,
          })
          .select()

        if (error) throw error

        setTasks([...tasks, ...data])
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteTask = async (id: string) => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id)
      .eq('user_id', user?.id)

    if (error) throw error

    setTasks(tasks.filter(task => task.id !== id))
  }

  // * Has a Error
  const updateTask = async (id: string, updateFields: any) => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const { error, data } = await supabase
      .from('tasks')
      .update(updateFields)
      .eq('user_id', user?.id)
      .eq('id', id)
      .select()

    if (error) throw error

    console.log(data)

    setTasks(tasks.filter(task => task.id !== id))
  }

  return (
    <TaskContent.Provider
      value={{ tasks, getTasks, createTask, isLoading, deleteTask, updateTask }}
    >
      {children}
    </TaskContent.Provider>
  )
}
