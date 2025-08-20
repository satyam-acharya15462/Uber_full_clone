import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import UberLogo from '../assets/Uber_logo_2018.png'

const UserSignUp = () => {
  // Form state
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  // Two-step authentication state
  const [step, setStep] = useState(1)
  const [verificationCode, setVerificationCode] = useState('')
  const [sentCode, setSentCode] = useState('')
  const [userData, setUserData] = useState({})
  
  // Error state
  const [errors, setErrors] = useState({})
  
  // Generate random 6-digit code
  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }
  
  // Validate form
  const validateForm = () => {
    const newErrors = {}
    
    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }
    
    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  // Handle first step submission
  const handleFirstStep = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      const code = generateVerificationCode()
      setSentCode(code)
      
      // Store user data temporarily
      setUserData({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      })
      
     
      // Move to step 2
      setStep(2)
    }
  }
  
  // Handle verification
  const handleVerification = (e) => {
    e.preventDefault()
    
    if (verificationCode === sentCode) {
      // Success - register user
      console.log('User registered successfully:', userData)
      alert('Registration successful! Redirecting to login...')
      
      // Reset form
      setFirstName('')
      setLastName('')
      setEmail('')
      setPassword('')
      setVerificationCode('')
      setStep(1)
      
      // Redirect to login (you can use navigate here)
      window.location.href = '/login'
    } else {
      alert('Invalid verification code. Please try again.')
    }
  }
  
  // Resend verification code
  const resendCode = () => {
    const code = generateVerificationCode()
    setSentCode(code)
    console.log('New verification code:', code)
    alert(`New verification code sent to ${userData.email}. (Check console for code: ${code})`)
  }
   
  return (
    <div className='p-7 flex justify-between flex-col min-h-screen'>
      <div>
        <img className="w-16 mb-5" src={UberLogo} alt="Uber Logo" />
        
        {step === 1 ? (
          // Step 1: Registration Form
          <>
            <h2 className='text-2xl font-bold mb-6'>Create your account</h2>
            
            <form onSubmit={handleFirstStep}>
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
                  {errors.firstName && (
                    <p className='text-red-500 text-sm mt-1'>{errors.firstName}</p>
                  )}
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
                  {errors.lastName && (
                    <p className='text-red-500 text-sm mt-1'>{errors.lastName}</p>
                  )}
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
                {errors.email && (
                  <p className='text-red-500 text-sm mt-1'>{errors.email}</p>
                )}
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
                {errors.password && (
                  <p className='text-red-500 text-sm mt-1'>{errors.password}</p>
                )}
              </div>
              
              <button className='bg-black text-white font-semibold rounded px-3 py-3 w-full text-lg hover:bg-gray-800 transition-colors'>
                Continue
              </button>
            </form>
            
            <p className='text-center mt-2'>
              Want to join a fleet? 
              <Link className='text-blue-600 font-semibold ml-1' to='/captain-signup'>
                Register as Captain
              </Link>
            </p>
          </>
        ) : (
          // Step 2: Verification
          <>
            <h2 className='text-2xl font-bold mb-2'>Verify your email</h2>
            <p className='text-gray-600 mb-6'>
              We've sent a verification code to {userData.email}
            </p>
            
            <form onSubmit={handleVerification}>
              <div className='mb-6'>
                <h3 className='text-lg font-semibold mb-2'>Enter Verification Code</h3>
                <input
                  className='bg-[#eeeeee] rounded px-3 py-3 w-full text-2xl text-center tracking-widest placeholder:text-base'
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder='000000'
                  maxLength="6"
                  required
                />
              </div>
              
              <button className='bg-black text-white font-semibold rounded px-3 py-3 w-full text-lg hover:bg-gray-800 transition-colors'>
                Verify & Create Account
              </button>
            </form>
            
            <div className='mt-6 text-center'>
              <p className='text-gray-600'>
                Didn't receive the code?
              </p>
              <button
                onClick={resendCode}
                className='text-blue-600 font-semibold mt-2'
              >
                Resend Code
              </button>
            </div>
            
            <button
              onClick={() => setStep(1)}
              className='mt-4 text-gray-600 underline w-full text-center'
            >
              ← Back to registration
            </button>
          </>
        )}
      </div>
      
      <div className='mt-8'>
        <Link
          to='/login'
          className='bg-[#FFAB00] flex justify-center items-center text-white font-semibold rounded px-3 py-3 w-full text-lg hover:bg-[#E59900] transition-colors'>
          Sign in to existing account
        </Link>
      </div>
      </div>
  )
}

export default UserSignUp