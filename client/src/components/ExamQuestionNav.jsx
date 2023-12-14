import React, {useState} from 'react'
import flag from "../assets/blackFlag.png"
import notePresent from "../assets/notePresent.png"

export default function ExamQuestionNav() {
  const [flagged, setFlagged] = useState(false)
  const [noteAvailable, setNoteAvailable] = useState(false)

  return (
    <div className="w-20 h-full left-0 top-0 bottom-0 absolute flex flex-col bg-100 overflow-y-scroll text-exam-black border-r border-exam-primary">
        <div className="flex p-2 cursor-pointer">
          <span className="w-1/3 flex items-center">•</span>
          <span className="w-1/3 text-xl flex items-center">1</span>
          <div className="w-1/3 flex items-center">
            <img src={flag} alt="flag icon" className={flagged ? "h-5" : "hidden"} />
            <img src={notePresent} alt="note present" className={noteAvailable ? "h-5" : "hidden"} />
          </div>
        </div>
    </div>
  )
}
