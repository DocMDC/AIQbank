import React from 'react'
import { Outlet } from "react-router-dom"

export default function ExamInSessionLayout() {
  return (
    <div className="w-full h-screen fixed bg-gradient-to-tr from-exam-mainBG via-transparent to-exam-secondaryBG">
        <Outlet/>
    </div>
  )
}
