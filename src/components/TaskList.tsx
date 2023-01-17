import React, { useEffect } from 'react'
import { useTasks } from '../context/TaskContext'
import TaskCard from './TaskCard'

const TaskList = ({ done = false }: { done: boolean }) => {
  const { tasks, getTasks, isLoading } = useTasks()
  // console.log(tasks)

  useEffect(() => {
    getTasks(done)
  }, [done])

  function renderTasks() {
    if (isLoading) {
      return <p>Loading...</p>
    } else if (tasks.length === 0) {
      return <p>No tasks found</p>
    } else {
      return (
        <div>
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )
    }
  }
  return <div>{renderTasks()}</div>
}

export default TaskList
