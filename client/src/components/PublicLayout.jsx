import React from 'react'
import { Outlet } from "react-router-dom"
import PublicNav from "./PublicNav"

export default function PublicLayout() {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 flex items-center bg-blue-200 h-20 px-4">
          <PublicNav/>
      </div>
      <div className="mt-20">
        <Outlet/>
      </div>
    </>

  )
}
