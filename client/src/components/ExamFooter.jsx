import React from 'react'
import lock from "../assets/lock.png"
import hexagon from "../assets/hexagon.png"
import { FaPauseCircle } from "react-icons/fa";

export default function ExamFooter({handleSuspendExam}) {
  const hours = "00"
  const minutes = "23"
  const seconds = "44"

  return (
    <div className="fixed bottom-0 left-20 right-0 h-14 bg-exam-secondary flex items-center justify-between py-2 px-8 text-exam-white">

        <div className="border-t-2 border-l-2 border-exam-boxShadow rounded-md px-2 h-full flex items-center md:text-lg">
          <p>Block Time Elapsed:
            <span> {hours}</span>
            <span>:</span>
            <span>{minutes}</span>
            <span>:</span>
            <span>{seconds}</span>
          </p>
        </div>

        <div className="flex flex-col items-center justify-center cursor-pointer p-1 w-24 h-12 hover:rounded-md hover:border hover:border-black hover:bg-[#4783bd99]">
          <img src={lock} alt="lock icon" className="h-6" />
          <p className="text-sm">Lock</p>
        </div>

        <div className="flex">
          <div className="flex flex-col items-center justify-center cursor-pointer p-1 w-24 h-12 hover:rounded-md hover:border hover:border-black hover:bg-[#4783bd99]" onClick={() => handleSuspendExam()}>
            <FaPauseCircle className="h-6 text-lg"/>
            <p className="text-sm">Suspend</p>
          </div>

          <div className="flex flex-col items-center justify-center cursor-pointer p-1 w-24 h-12 hover:rounded-md hover:border hover:border-black hover:bg-[#4783bd99]">
            <img src={hexagon} alt="stop icon" className="h-6"/>
            <p className="text-sm">End Block</p>
          </div>
        </div>
    </div>
  )
}
