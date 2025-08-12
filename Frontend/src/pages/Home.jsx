import React from 'react'
import UberLogo from '../assets/Uber_logo_2018.png'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <div className='h-screen pt-8  w-full bg-red-400 flex justify-between flex-col bg-[url(https://images.unsplash.com/photo-1601858854756-653284945918?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fHN0cmVldCUyMGxpZ2h0fGVufDB8fDB8fHww)] bg-cover bg-no-repeat bg-center'> 
            <img className="w-16 ml-8" src={UberLogo} alt="Uber Logo" />
            <div className='bg-white py-4 px-4 pb-7'>
                <h2 className='text-3xl font-bold'> Get started with Uber </h2>
                <Link to='/login' className='flex justify-center items-center w-full bg-black text-white py-3 rounded mt-5'>Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Home