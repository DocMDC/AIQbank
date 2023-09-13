import React from 'react'
import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"

export default function AdminNav() {
    const logout = useLogout()

  return (
    <>
        <h1 className="mr-auto">Logo</h1>
        <ul className="flex space-x-6">
            <Link to="teachers">
                <li>Teachers</li>
            </Link>
            <Link to="all-students">
                <li>Students</li>
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
