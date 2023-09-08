import React from 'react'
import { Link } from "react-router-dom"

export default function PrivateNav() {
  return (
    <>
        <Link to="/dashboard" className="mr-auto"><h1>Logo</h1></Link>
        <ul className="flex space-x-6">
            <Link to="my-exams">
                <li>My exams</li>
            </Link>
            <Link to="new-exam">
                <li>New exam</li>
            </Link>
            <Link to="account">
                <li>Account</li>
            </Link>
            <Link to="/login">
                <li>Logout</li>
            </Link>
        </ul>
    </>
  )
}
