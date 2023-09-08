import React from 'react'
import { Link } from "react-router-dom"

export default function PublicNav() {
  return (
    <>
        <h1 className="mr-auto">Logo</h1>
        <ul className="flex space-x-6">
            <Link to="about">
                <li>About</li>
            </Link>
            <Link to="purchase">
                <li>Pricing</li>
            </Link>
            <Link to="login">
                <li>Login</li>
            </Link>
            <Link to="register">
                <li>Register</li>
            </Link>
        </ul>
    </>
  )
}
