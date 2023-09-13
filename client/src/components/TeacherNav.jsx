import React, {useState, useRef} from 'react'
import { Link } from "react-router-dom"
import {GiHamburgerMenu} from "react-icons/gi"
import {AiFillCloseCircle} from "react-icons/ai"
import useToggleOnResize from "../hooks/useToggleOnResize"
import useClickOutNav from "../hooks/useClickOutNav"
import { useLogout } from "../hooks/useLogout"
import { IoIosCreate } from 'react-icons/io'

export default function TeacherNav() {
    const logout = useLogout()
    const dropDownRef = useRef(null)
    const hamburgerRef = useRef(null)
    const [hamburgerIsClicked, setHamburgerIsClicked] = useState(false)

    useToggleOnResize(hamburgerIsClicked, setHamburgerIsClicked)

    useClickOutNav(dropDownRef, hamburgerRef, () => {
        setHamburgerIsClicked(false)
    })

  return (
    <>
        <Link to="/teacher-dashboard" className="mr-auto md:min-h-[192px] md:flex md:items-center md:justify-center md:mr-0 md:w-full md:border-b md:border-public-200">
            <h1 className="hover:text-public-200">Edge Up Learning</h1>
        </Link>
        <div className="flex items-center md:w-full md:flex-grow">
            <div 
                className="text-3xl text-public-100 cursor-pointer md:hidden hover:text-public-200 transition ease-in-out delay-100"
                onClick={() => setHamburgerIsClicked(!hamburgerIsClicked)}
                ref={hamburgerRef}
            >
                <GiHamburgerMenu/>
            </div>
            <ul 
                className={hamburgerIsClicked ? "text-public-400 fixed top-0 mt-20 p-4 h-64 flex flex-col items-center justify-center space-y-4 rounded-b-md left-0 right-0 bg-public-100 shadow-lg transition-all ease-in-out z-40 md:flex md:justify-between md:items-center md:w-96" : "hidden md:flex md:flex-col md:w-full md:h-96 md:justify-between md:px-4"}
                ref={dropDownRef}
            >
                <AiFillCloseCircle className="absolute top-2 right-2 h-6 w-6 text-public-200 cursor-pointer transition-all ease-in-out hover:text-public-300 md:hidden" 
                    onClick={() => setHamburgerIsClicked(false)}
                    />
                <div className="md:flex md:items-center md:space-x-4">
                    <IoIosCreate className="hidden md:block md:text-public-100 md:text-lg"/>
                    <Link to="new-exam" className="hover:text-public-200 transition ease-in-out delay-100">New Exam</Link>
                </div>
                
                <Link to="exams" className="hover:text-public-200 transition ease-in-out delay-100">My Exams</Link>
                <Link to="students" className="hover:text-public-200 transition ease-in-out delay-100">Students</Link>
                <Link to="account" className="hover:text-public-200 transition ease-in-out delay-100">Account</Link>
                <button onClick={() => logout()}>
                <Link to="/login" >
                    <li className="text-white text-center bg-public-200 p-1 w-18 rounded-lg border transition ease-in-out delay-100 border-public-200 hover:border hover:border-public-300 hover:bg-public-300">Logout</li>
                </Link>
                </button>
            </ul>
        </div>
    </>
  )
}



/*

// previous code
import React, {useState, useRef} from 'react'
import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import {GiHamburgerMenu} from "react-icons/gi"
import {AiFillCloseCircle} from "react-icons/ai"
import useClickOutNav from "../hooks/useClickOutNav"

export default function TeacherNav() {
    const logout = useLogout()
    const [hamburgerIsClicked, setHamburgerIsClicked] = useState(false)
    const dropDownRef = useRef(null)
    const hamburgerRef = useRef(null)

    useClickOutNav(dropDownRef, hamburgerRef, () => {
        setHamburgerIsClicked(false)
    })
    
  return (
    <div className="fixed top-0 left-0 right-0 flex h-12 sm:h-auto sm:flex-col sm:bottom-0 sm:w-44 sm:overflow-y-scroll sm:justify-between">
        <div className="bg-qbank-bg-500 text-lg flex items-center pl-2 sm:w-auto sm:border-b sm:border-qbank-bg-300 sm:min-h-[200px]">
            <Link to="/teacher-dashboard">
                <h1 className="text-qbank-text-100">Edge Up Learning</h1>
            </Link>
        </div>

        <div 
        className="bg-qbank-bg-500 flex flex-grow items-center justify-end pr-8 sm:hidden">
            <div ref={hamburgerRef}>
                <GiHamburgerMenu className="text-4xl text-qbank-text-100 cursor-pointer hover:text-qbank-text-400"
                onClick={() => setHamburgerIsClicked(!hamburgerIsClicked)}
                />
            </div>
            
             <ul className={hamburgerIsClicked ? "dropdown-nav mt-12 h-64" : "hidden"} ref={dropDownRef}>
                    <AiFillCloseCircle className="absolute top-2 right-2 h-6 w-6 cursor-pointer hover:text-qbank-bg-300" 
                    onClick={() => setHamburgerIsClicked(false)}
                    />
                    <Link to="new-exam" className="hover:text-qbank-bg-300">
                        <li>Create exam</li>
                    </Link>
                    <Link to="exams" className="hover:text-qbank-bg-300">
                        <li>My Exams</li>
                    </Link>
                    <Link to="students" className="hover:text-qbank-bg-300">
                        <li>Students</li>
                    </Link>
                    <Link to="account" className="hover:text-qbank-bg-300">
                        <li>Account</li>
                    </Link>
                <button onClick={() => logout()}>
                <Link to="/login" className="hover:text-qbank-bg-300">
                    <li>Logout</li>
                </Link>
                </button>
            </ul>
        </div>
        
        
        <div className="hidden sm:bg-qbank-bg-400 sm:text-qbank-text-200 sm:flex sm:pl-4 sm:pt-8 sm:min-h-[400px] sm:flex-grow">
            <ul className="sm:space-y-6">
                <div>
                    <Link to="exams">
                        <li>My Exams</li>
                    </Link>
                </div>
                <div>
                    <Link to="new-exam">
                        <li>Create exam</li>
                    </Link>
                </div>
                <div>
                    <Link to="students">
                        <li>Students</li>
                    </Link>
                </div>
                <div>
                    <Link to="account">
                        <li>Account</li>
                    </Link>
                </div>
                <button onClick={() => logout()}>
                <Link to="/login">
                    <li>Logout</li>
                </Link>
                </button>
            </ul>
        </div>
        
        <div className="hidden sm:fixed sm:bottom-0 sm:left-0 sm:w-44 sm:h-11 sm:bg-qbank-bg-300 sm:text-xs sm:text-qbank-text-100 sm:flex sm:items-center sm:justify-center">
            <h5>All rights reserved 2023</h5>
        </div>
    </div>
  )
}
*/