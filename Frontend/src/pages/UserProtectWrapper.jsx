import React, { useContext, useEffect } from 'react'
import { UserDataContext } from '../context/UserDataContext'
import { useNavigate } from 'react-router-dom'

function UserProtectWrapper({ children }) {
  const { User } = useContext(UserDataContext)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  return (
    <div>
      {children}
    </div>
  )
}

export default UserProtectWrapper