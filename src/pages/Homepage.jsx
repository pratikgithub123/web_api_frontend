import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { testApi } from '../apis/Api'

const Homepage = () => {
  useEffect(() =>{
    testApi().then((res) =>{
      console.log(res.data)
    })
  })
  return (
    <div>
      <h1>Homepage form page folder</h1>
    </div>
  )
}

export default Homepage