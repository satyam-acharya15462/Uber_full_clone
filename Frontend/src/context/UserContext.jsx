import React, { useState } from 'react'
import { UserDataContext} from './UserDataContext'

function UserContext({children}) {
 const [User, setUser] = useState({
  email : "",
  fullName : {
    FirstName: "",
    LastName : ""
  }
 })
  return (
    <div>
      <UserDataContext.Provider value={[User, setUser]}>
          {children}
      </UserDataContext.Provider>
   </div>
  )
}

export default UserContext