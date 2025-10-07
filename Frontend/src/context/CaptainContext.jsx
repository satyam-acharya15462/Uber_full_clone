import React, { useState } from 'react'
import { CaptainDataContext } from './CaptainDataContext'

function CaptainContext({ children }) {
  const [captain, setCaptain] = useState({
    email: "",
    fullName: {
      firstName: "",
      lastName: ""
    },
    vehicle: {
      color: "",
      plate: "",
      capacity: 1,
      vehicleType: "" // car, motorcycle, auto
    },
    location: {
      latitude: null,
      longitude: null
    },
    status: "offline" // offline, online, busy
  })

  return (
    <CaptainDataContext.Provider value={{ captain, setCaptain }}>
      {children}
    </CaptainDataContext.Provider>
  )
}

export default CaptainContext
