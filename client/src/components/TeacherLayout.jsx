import React from 'react'
import { Outlet } from "react-router-dom"
import TeacherNav from "./TeacherNav"

export default function TeacherLayout() {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 flex items-center bg-public-400 text-public-100 h-20 px-8 shadow-lg z-50 md:right-auto md:top-0 md:left-0 md:bottom-0 md:h-auto md:w-48 md:flex-col md:px-0">
          <TeacherNav/>
      </div>
      <div className="mt-20 md:fixed md:top-0 md:right-0 md:bottom-0 md:left-48 md:m-auto">
        <Outlet/>
      </div>
    </>

  )
}


//fixed top-12 left-0 hidden bottom-0 sm:left-52 sm:top-0 sm:right-0