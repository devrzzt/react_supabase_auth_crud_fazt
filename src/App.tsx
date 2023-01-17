import Home from './pages/Home'
import Login from './pages/Login'
import { Routes, Route, useNavigate } from 'react-router-dom'
import NotFound from './pages/NotFound'
import { useEffect } from 'react'
import { supabase } from './db/client'
import { TaskContentProvider } from './context/TaskContext'
import Navbar from './components/Navbar'

function App() {
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      !session ? navigate('/login') : navigate('/')
      console.log(event, session)
    })
  }, [])

  return (
    <div className='App'>
      <TaskContentProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </TaskContentProvider>
    </div>
  )
}

export default App
