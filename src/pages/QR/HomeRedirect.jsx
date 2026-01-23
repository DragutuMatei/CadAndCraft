import React from 'react'
import { Navigate } from 'react-router-dom'

function HomeRedirect() {
  return (
         <Navigate replace to={`/`} />
  )
}

export default HomeRedirect;