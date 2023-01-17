import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../db/client'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'

function Home() {
  const [showTaskDone, setShowTaskDone] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const getUserData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        navigate('/login')
      }
    }
    getUserData()
  }, [navigate])

  return (
    <>
      <div className='row pt-4'>
        <div className='col-md-4 offset-md-4'>
          <TaskForm />
          <header className='d-flex justify-content-between my-3'>
            <span className='h5'>{showTaskDone ? `Done Tasks` : 'Tasks'}</span>
            <button
              onClick={() => setShowTaskDone(!showTaskDone)}
              className='btn btn-dark btn-sm'
            >
              {showTaskDone ? 'Show tasks to do' : 'Show tasks done'}
            </button>
          </header>

          <TaskList done={showTaskDone} />
        </div>
      </div>

      {/* Home
      <TaskForm />
      <header>
        <span>Task pending</span>
        <button onClick={() => setShowTaskDone(!showTaskDone)}>
          Show tasks done
        </button>
      </header>
      <TaskList done={showTaskDone} /> */}
    </>
  )
}

export default Home
