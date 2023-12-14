import React, { useState } from 'react'
import { loginApi } from '../apis/Api'
import { toast } from 'react-toastify'

const Login = () => {
    // make useState
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // make change function
    const changeEmail = (e) => {
        setEmail(e.target.value)
    }

    const changePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email, password)

        const data = {
          email : email,
          password : password
        }

        // api call
        loginApi(data).then((res) =>{
          if(res.data.success == false){
            toast.error(res.data.message)
          } else{
            toast.success(res.data.message)
            // set token and user data in local storage
            localStorage.setItem("token", res.data.token)

            // Converting incomming json
            const convertedJson = JSON.stringify(res.data.userData)
            localStorage.setItem("user", convertedJson)

          }

        }).catch((err) => {
          console.log(err)
          toast.error("Server Error!")
        })


    }

  return (
    <div>
      <h1 className='m-4'>Sign in to your account!</h1>
      <form className="w-25 m-4">
        <label>Email Address</label>
        <input onChange={changeEmail} className='form-control mb-2' type="email" placeholder='Enter your email' />

        <label>Password</label>
        <input onChange={changePassword} className='form-control mb-2' type="password" placeholder='Enter your password' />

        <button onClick={handleSubmit} className='btn btn-outline-primary w-100' type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login