import React from 'react'
import lock from "../assets/lock.png"
import { useTimer, useStopwatch } from "react-timer-hook"
import hexagon from "../assets/hexagon.png"
import { FaPauseCircle } from "react-icons/fa"
// import { setEndExamModal, selectEndExamModal } from '../redux/slices/modalSlice'
// import { useDispatch, useSelector } from 'react-redux'

export default function ExamFooter({handleSuspendExam, endExamModalState, setEndExamModalState, score, handleSubmitExam, expiryTimestamp, mode}) {
  
  let seconds, minutes, hours, timer, stopWatch

  if (mode?.timed) {
    timer = useTimer({ expiryTimestamp, onExpire: () => handleSubmitExam() })
    seconds = timer.seconds
    minutes = timer.minutes
    hours = timer.hours
  } else {
    stopWatch = useStopwatch({ autoStart: true})
    seconds = stopWatch.seconds
    minutes = stopWatch.minutes
    hours = stopWatch.hours
  }

  
  // const dispatch = useDispatch()
  // const endExamModalState = useSelector(selectEndExamModal) 

  return (
    <div className="fixed bottom-0 left-20 right-0 h-14 bg-exam-secondary flex items-center justify-between py-2 px-8 text-exam-white">

        <div className="border-t-2 border-l-2 border-exam-boxShadow rounded-md px-4 h-full flex items-center text-sm md:text-lg">
          <p>Block Time Elapsed:
            <span> {hours}</span>
            <span>:</span>
            <span>{minutes}</span>
            <span>:</span>
            <span>{seconds}</span>
          </p>
        </div>

        {/* <div className="flex flex-col items-center justify-center cursor-pointer p-1 w-24 h-12 hover:rounded-md hover:border hover:border-black hover:bg-[#4783bd99]">
          <img src={lock} alt="lock icon" className="h-6" />
          <p className="text-sm">Lock</p>
        </div> */}

      <div className="flex">
        <div className="flex flex-col items-center justify-center cursor-pointer p-1 w-24 h-12 hover:rounded-md hover:border hover:border-black hover:bg-[#4783bd99]" onClick={() => handleSuspendExam()}>
          <FaPauseCircle className="h-6 text-lg"/>
          <p className="text-sm">Suspend</p>
        </div>

        {score === "-" &&
          <div className="flex flex-col items-center justify-center cursor-pointer p-1 w-24 h-12 hover:rounded-md hover:border hover:border-black hover:bg-[#4783bd99]" onClick={() => setEndExamModalState(!endExamModalState)}>
            <img src={hexagon} alt="stop icon" className="h-6"/>
            <p className="text-sm">End Block</p>
          </div>
        }
      </div>
    </div>
  )
}
