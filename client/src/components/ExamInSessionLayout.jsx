import React from 'react'
import { Outlet } from "react-router-dom"
import ExamHeader from "./ExamHeader"

export default function ExamInSessionLayout() {
  return (
    <>
    <div className="w-full h-screen fixed bg-gradient-to-tr from-exam-mainBG via-transparent to-exam-secondaryBG">
      <div className="fixed top-0 left-20 right-0 h-14 p-2 bg-exam-secondary text-exam-white flex items-center">
        <ExamHeader/>
      </div>
      <div>
        <Outlet/>
      </div>
    </div>
    </>
  )
}
