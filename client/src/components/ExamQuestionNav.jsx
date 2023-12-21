import React, {useState} from 'react'
import flag from "../assets/blackFlag.png"
import notePresent from "../assets/notePresent.png"

export default function ExamQuestionNav({listOfQuestions, questionIndex, modifyQuestionIndex}) {
  const [noteAvailable, setNoteAvailable] = useState(false)

  function renderNavBackground(mapIndex) {
    if (mapIndex === questionIndex) {
      return "flex p-2 cursor-pointer bg-exam-secondary"
    } else if (mapIndex % 2 === 0) {
      return "flex p-2 cursor-pointer bg-400"
    } else {
      return "flex p-2 cursor-pointer bg-100"
    }
  }

  return (
    <div className="w-20 h-full left-0 top-0 bottom-0 absolute flex flex-col bg-100 overflow-y-scroll text-exam-black border-r border-exam-primary">
      {listOfQuestions?.map((question, index) => (
          <div className={renderNavBackground(index)} key={index} onClick={() => modifyQuestionIndex(index)}>
            <span className="w-1/3 flex items-center">{(question.selection === null && !question.hasAnswered) ? "•" : " "}</span>
            <span className="w-1/3 text-xl flex items-center">{index + 1}</span>
            <div className="w-1/3 flex items-center">
              <img src={flag} alt="flag icon" className={question.flagged ? "h-5" : "hidden"} />
              <img src={notePresent} alt="note present" className={noteAvailable ? "h-5" : "hidden"} />
            </div>
          </div>
      ))}
    </div>
  )
}
