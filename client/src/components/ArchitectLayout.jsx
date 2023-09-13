import React from 'react'
import { Outlet } from "react-router-dom"
import ArchitectNav from "./ArchitectNav"
import AdminNav from "./AdminNav"
import TeacherNav from "./TeacherNav"
import UserNav from "./UserNav"

export default function ArchitectLayout() {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 flex items-center bg-blue-200 h-20 px-4">
          <ArchitectNav/>
      </div>
      <div className="mt-20">
        <Outlet/>
      </div>
    </>

  )
}
