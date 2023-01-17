import React from 'react'
import { ITask, TaskContextType } from '../types/task'
import { useTasks } from '../context/TaskContext'

const TaskCard = ({ task }: any) => {
  const { deleteTask, updateTask } = useTasks()

  const handleDelete = () => {
    deleteTask(task.id)
  }
  const handleToggleDone = () => {
    updateTask(task.id, { done: !task.done })
  }

  return (
    <div className='card card-body mb-2'>
      <h3 className='h5'>
        {task.id}. {task.name}
      </h3>
      <span className=''>{task.done ? 'Done ✅' : 'Not done ❌'}</span>
      <div className='ms-auto'>
        <button
          onClick={() => handleDelete()}
          className='btn btn-danger btn-sm me-1'
        >
          Delete
        </button>
        <button
          onClick={() => handleToggleDone()}
          className='btn btn-secondary btn-sm'
        >
          Done
        </button>
      </div>
    </div>

    // <div>
    //   <h1>{task.name}</h1>
    //   <p>{JSON.stringify(task.done)}</p>
    //   <button onClick={() => handleDelete()}>Delete</button>
    //   <button onClick={() => handleToggleDone()}>Done</button>
    // </div>
  )
}

export default TaskCard
