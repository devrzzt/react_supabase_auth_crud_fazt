import React, { FormEvent, useState } from 'react'
import { useTasks } from '../context/TaskContext'
const TaskForm = () => {
  const [taskName, setTaskName] = useState('')

  const { createTask, isLoading } = useTasks()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createTask(taskName)
    setTaskName('')
  }

  return (
    <form onSubmit={handleSubmit} className='card card-body'>
      <input
        type='text'
        value={taskName}
        name='taskName'
        onChange={e => setTaskName(e.target.value)}
        required
        placeholder='Write a task name'
        className='form-control mb-2'
      />
      <div className='bg-dark ms-auto'>
        <button disabled={isLoading} className='btn btn-primary btn-sm'>
          {isLoading ? 'Loading...' : 'Add'}
        </button>
      </div>
    </form>

    // <div>
    //   <form onSubmit={handleSubmit}>
    //     <input
    //       type='text'
    //       name='taskName'
    //       placeholder='Write a task'
    //       onChange={e => setTaskName(e.target.value)}
    //       value={taskName}
    //     />
    //     <button disabled={isLoading}>{isLoading ? 'Loading...' : 'Add'}</button>
    //   </form>
    // </div>
  )
}

export default TaskForm
