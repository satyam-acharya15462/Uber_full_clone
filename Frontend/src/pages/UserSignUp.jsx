import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import UberLogo from '../assets/Uber_logo_2018.png'

const UserSignUp = () => {
  // Simple form state - direct two-way binding
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [UserData, setUserData] = useState({})
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Simple validation
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim()) {
      alert('Please fill all fields')
      return
    }
    
    if (password.length < 8) {
      alert('Password must be at least 8 characters')
      return
    }
    
  // Process registration
  setUserData({
    FullName:{   
      firstName : firstName,
      lastName : lastName,
   },
   email:email,
   password:password
  })
   

    
    // Reset form
    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
    

  }
   
  return (
    <div className='p-7 flex justify-between flex-col min-h-screen'>
      <div>
        <img className="w-16 mb-5" src={UberLogo} alt="Uber Logo" />
        
        <h2 className='text-2xl font-bold mb-6'>Create your account</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Name Fields */}
          <div className='flex gap-4 mb-4'>
            <div className='flex-1'>
              <h3 className='text-lg font-semibold mb-2'>First Name</h3>
              <input
                className='bg-[#eeeeee] rounded px-3 py-2 w-full text-lg placeholder:text-base'
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder='John'
                required
              />
            </div>
            
            <div className='flex-1'>
              <h3 className='text-lg font-semibold mb-2'>Last Name</h3>
              <input
                className='bg-[#eeeeee] rounded px-3 py-2 w-full text-lg placeholder:text-base'
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder='Doe'
                required
              />
            </div>
          </div>
          
          {/* Email Field */}
          <div className='mb-4'>
            <h3 className='text-lg font-semibold mb-2'>Email Address</h3>
            <input
              className='bg-[#eeeeee] rounded px-3 py-2 w-full text-lg placeholder:text-base'
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='john.doe@example.com'
              required
            />
          </div>
          
          {/* Password Field */}
          <div className='mb-6'>
            <h3 className='text-lg font-semibold mb-2'>Create Password</h3>
            <input
              className='bg-[#eeeeee] rounded px-3 py-2 w-full text-lg placeholder:text-base'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Minimum 8 characters'
              required
            />
          </div>
          
          <button className='bg-black text-white font-semibold rounded px-3 py-3 w-full text-lg hover:bg-gray-800 transition-colors'>
            Create Account
          </button>
        </form>
        
        <p className='text-center mt-2'>
          Want to join a fleet? 
          <Link className='text-blue-600 font-semibold ml-1' to='/captain-signup'>
            Register as Captain
          </Link>
        </p>
      </div>
      
      <div className='mt-8'>
     <p className='text-[8px]'>No part of this material may be reproduced or distributed without written permission.
     Unauthorized use is strictly prohibited under applicable copyright laws.</p>
      </div>
    </div>
  )
}

export default UserSignUp