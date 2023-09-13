import React from 'react'
import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"

export default function UserNav() {
    const logout = useLogout()
    
  return (
    <>
        <Link to="/dashboard" className="mr-auto"><h1>Logo</h1></Link>
        <ul className="flex space-x-6">
            <Link to="my-exams">
                <li>My exams</li>
            </Link>
            <Link to="account">
                <li>Account</li>
            </Link>
            <button onClick={() => logout()}>
            <Link to="/login">
                <li>Logout</li>
            </Link>
            </button>
        </ul>
    </>
  )
}
