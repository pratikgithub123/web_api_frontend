import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { registerApi } from '../apis/Api'
import { toast } from 'react-toastify'

const Register = () => {
    // step 1 : Create a state variable
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // step 2 : Create a function for changing the state variable
    const changeFirstName = (e) => {
        setFirstName(e.target.value)
    }

    const changeLastName = (e) => {
        setLastName(e.target.value)
    }

    const changeEmail = (e) => {
        setEmail(e.target.value)
    }

    const changePassword = (e) => {
        setPassword(e.target.value)
    }

    //  After clicking the submit button
    const handleSubmit = (e) => {
        e.preventDefault()

        // step 1 : Check data in console
        console.log(firstName, lastName, email, password)

        // Creating json data (fieldName-)
        const data = {
            firstName : firstName,
            lastName : lastName,
            email : email,
            password : password
        }

        // Send data to backend
        registerApi(data).then((res) =>{
            if(res.data.success == true){
                toast.success(res.data.message)
            } else {
                toast.error(res.data.message)
            }
        }).catch((err) =>{
            console.log(err)
            toast.error('Internal Server Error!')
        })
        
    }

    return (
        <>
            <h1 className='m-3'>Create an Account!</h1>
            <form className='m-3 w-25'>
                <label>Firstname</label>
                <input onChange={changeFirstName} className='form-control mb-2' type="text" placeholder='Enter your firstname' />

                <label>Lastname</label>
                <input onChange={changeLastName} className='form-control mb-2' type="text" placeholder='Enter your lastname' />

                <label>Email</label>
                <input onChange={changeEmail} className='form-control mb-2' type="email" placeholder='Enter your email' />

                <label>Password</label>
                <input onChange={changePassword} className='form-control mb-2' type="password" placeholder='Enter your password' />

                <button onClick={handleSubmit} className='btn btn-danger w-100'>Submit</button>
                <a href="" className='text-decoration-none text-black'>Already have account?</a>
            </form>
        </>
    )
}

export default Register