import React, { FormEvent, useEffect, useState } from 'react'
import { supabase } from '../db/client'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await supabase.auth.signInWithOtp({
        email,
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const getUserData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      console.log(user)
      //  if(user) {
      // navigate('/')
      //  }
    }
    getUserData()
  }, [navigate])

  return (
    <>
      <div className='row p-4'>
        <div className='col-md-4 offset-md-4'>
          <form onSubmit={handleSubmit} className='card card-body'>
            <label htmlFor='email'>Write your email:</label>
            <input
              type='email'
              value={email}
              name='email'
              onChange={e => setEmail(e.target.value)}
              className='form-control mb-2'
              placeholder='youremail@site.com'
              required
            />
            <div className='ms-auto'>
              <button className='btn btn-primary '>
                {/* {loading ? 'Loading...' : 'Login'} */}
                login
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* <form onSubmit={handleSubmit}>
        <input
          type='email'
          name='email'
          placeholder='youremail@site.com'
          onChange={e => setEmail(e.target.value)}
        />
        <button>Send</button>
      </form> */}
    </>
  )
}

export default Login
