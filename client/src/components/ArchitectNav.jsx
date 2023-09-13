import React, {useState, useRef} from 'react'
import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import {AiFillCloseCircle} from "react-icons/ai"
import useClickOutside from "../hooks/useClickOutside"
export default function ArchitectNav() {
    const logout = useLogout()

    const [adminClicked, setAdminClicked] = useState(false)
    const [teacherClicked, setTeacherClicked] = useState(false)
    const [userClicked, setUserClicked] = useState(false)

    const adminRef = useRef(null)
    const teacherRef = useRef(null)
    const userRef = useRef(null)

    useClickOutside(adminRef, () => {
        setAdminClicked(false)
    })
    useClickOutside(teacherRef, () => {
        setTeacherClicked(false)
    })
    useClickOutside(userRef, () => {
        setUserClicked(false)
    })


  return (
    <>
        <Link to="/architect" className="mr-auto"><h1>Edge Up</h1></Link>
        <ul className="flex space-x-6">
            <Link to="all-users">
                <li>All Users</li>
            </Link>
            <div>
                <h2 onClick={() => setAdminClicked(!adminClicked)} className="cursor-pointer hover:text-gray-700">Admin</h2>
                <ul className={adminClicked ? "dropdown-nav" : "hidden"}
                ref={adminRef}
                >
                    <AiFillCloseCircle className="absolute top-2 right-2 h-6 w-6 cursor-pointer hover:text-gray-300" 
                    onClick={() => setAdminClicked(false)}
                    />
                    <Link to="/admin-dashboard" className="cursor-pointer hover:text-gray-300">
                        <li>Dashboard</li>
                    </Link>
                    <Link to="/admin-dashboard/teachers">
                        <li>Teachers</li>
                    </Link>
                    <Link to="/admin-dashboard-all-students">
                        <li>Students</li>
                    </Link>
                    <Link to="/admin-dashboard-account">
                        <li>Account</li>
                    </Link>
                </ul>
            </div>
            <div>
                <h2 onClick={() => setTeacherClicked(!teacherClicked)} className="cursor-pointer hover:text-gray-700">Teacher</h2>
                <ul className={teacherClicked ? "dropdown-nav" : "hidden"}
                ref={teacherRef}
                >
                    <AiFillCloseCircle className="absolute top-2 right-2 h-6 w-6 cursor-pointer hover:text-gray-300" 
                    onClick={() => setTeacherClicked(false)}
                    />
                    <Link to="/teacher-dashboard">
                        <li>Dashboard</li>
                    </Link>
                    <Link to="/teacher-dashboard/new-exam">
                        <li>New Exam</li>
                    </Link>
                    <Link to="/teacher-dashboard/students">
                        <li>Students</li>
                    </Link>
                    <Link to="/teacher-dashboard/account">
                        <li>Account</li>
                    </Link>
                </ul>
            </div>
            <div>
                <h2 onClick={() => setUserClicked(!userClicked)} className="cursor-pointer hover:text-gray-700">User</h2>
                <ul className={userClicked ? "dropdown-nav" : "hidden"}
                ref={userRef}
                >
                    <AiFillCloseCircle className="absolute top-2 right-2 h-6 w-6 cursor-pointer hover:text-gray-300" 
                    onClick={() => setUserClicked(false)}
                    />
                    <Link to="/dashboard">
                        <li>Dashboard</li>
                    </Link>
                    <Link to="/dashboard/my-exams">
                        <li>My exams</li>
                    </Link>
                    <Link to="/dashboard/account">
                        <li>Account</li>
                    </Link>
                </ul>
            </div>
            <button onClick={() => logout()}>
            <Link to="/login">
                <li>Logout</li>
            </Link>
            </button>
        </ul>
    </>
  )
}
