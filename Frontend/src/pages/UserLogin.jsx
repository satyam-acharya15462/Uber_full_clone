import React , {useState} from 'react'
import UberLogo from '../assets/Uber_logo_2018.png'
import { Link ,  } from 'react-router-dom'
const UserLogin = () => {
   const [Email, setEmail] = useState('')
   const [Password , setPassword] = useState('')
   const [UserData, setUserData] = useState({})
   const SumbitHandler = (e) => {
    e.preventDefault()
    setUserData({
      Email : Email,
      Password : Password
    })
    setEmail('')
    setPassword('')
   }

  return (
    <div className='p-7 flex justify-between flex-col h-screen'>
    <div>
    <img className="w-16 mb-5" src={UberLogo} alt="Uber Logo" />
      
      <form onSubmit={(e)=>{
        SumbitHandler(e)
      }}>

      <h3 className='text-xl font-bold mb-2'>What's your email</h3>

      <input 
      className='bg-[#eeeeee]  rounded px-2 py-2  w-full text-lg placeholder:text-base ml-1'
      type="email" 
      value={Email}
      onChange={(e)=>{
         setEmail(e.target.value)
      }}
      required 
      placeholder='Email@Example.com' 
      />

      <h3 className='text-xl mb-2 mt-4 font-bold'>Enter password</h3>

      <input 
      type="password" 
      required  
      value={Password}
      onChange={
        (e)=>{
          setPassword(e.target.value)
        }
      }
      placeholder='password'
      className='bg-[#eeee] rounded px-2 py-2  w-full text-lg placeholder:text-base ml-1'
      />

      <button className='bg-black text-white font-semibold mt-7 rounded px-2 py-2  w-full text-lg placeholder:text-base'>Login</button>
      </form>
       <p className='text-center mt-4'>New here? <Link className='text-blue-800' to='/signUp'>Create New Account</Link></p>
    </div> 
    <div>
    <Link to='/captain-login' className='bg-[#2E7D32] flex justify-center items-center text-white font-semibold mt-1 rounded px-2 py-2  w-full text-lg placeholder:text-base'>sign in as captain</Link>
    </div>
    </div>
  )
}

export default UserLogin