import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

async function UserLogout ()  {
    const token = localStorage.getItem("token")
    const navigate = useNavigate
await axios.get(`${import.meta.env.VITE_BASE_URL}/users/v3/api/logout` , {
    headers:{
     Authorization : `Bearer ${token}`
    },
  }).then((response)=>{
    if(response.status === 200){
      localStorage.removeItem("token")
      navigate("/")
    }
  })   
      
   
  return (
    <div></div>
  )
}

export default UserLogout