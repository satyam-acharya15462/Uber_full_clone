import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Start from './pages/Start'
import UserSignUp from './pages/UserSignUp'
import UserLogin from './pages/UserLogin'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignUp from './pages/CaptainSignUp'
import  Home  from './pages/Home'
import UserContext from './context/UserContext'
import UserProtectWrapper from './pages/UserProtectWrapper'
import UserLogout from './pages/UserLogout'

const App = () => {
  return (
    <div>
      <UserContext>
        <Routes>
          <Route path='/' element={<Start/>}/>
          <Route path='/home' element={<UserProtectWrapper><Home/></UserProtectWrapper> }/>
          <Route path='/login' element={<UserLogin/>}/>
          <Route path='/signUp' element={<UserSignUp/>}/>
          <Route path='/captain-login' element={<CaptainLogin/>}/>
          <Route path='/captain-signUp' element={<CaptainSignUp/>}/>
          <Route path='/user/logout' element= {<UserProtectWrapper><UserLogout/></UserProtectWrapper>}/>
        </Routes>
      </UserContext>
    </div>
  )
}

export default App
