import React from 'react'
import { Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrentToken, selectCurrentUser, selectCurrentRoles } from "../redux/slices/authSlice"
export default function RequireAuth({ allowedRoles }) {
    const token = useSelector(selectCurrentToken)
    const email = useSelector(selectCurrentUser)
    const roles = useSelector(selectCurrentRoles)

    console.log(token)
    console.log(email)
    console.log(roles)
    const hasAccess = roles.find(role => allowedRoles.includes(role))
    console.log(hasAccess)

  return (
    hasAccess 
        ? <Outlet/>
        : <Navigate to="/login"/>
  )
}
