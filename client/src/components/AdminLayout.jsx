import React from 'react'
import { Outlet } from "react-router-dom"
import AdminNav from "./AdminNav"

export default function AdminLayout() {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 flex items-center bg-blue-200 h-20 px-4">
          <AdminNav/>
      </div>
      <div className="mt-20">
        <Outlet/>
      </div>
    </>

  )
}
