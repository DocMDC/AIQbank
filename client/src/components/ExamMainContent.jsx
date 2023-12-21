//TODOS:
//Lab values
//Notes
//Calculator
//Reverse color
//AI chat
//Dashboard home page
//Front-end polish

import React from 'react'
import {useUpdateSelectionMutation, useSubmitAnswerMutation} from "../redux/slices/examsApiSlice"
import { IoPersonCircleOutline } from "react-icons/io5"
import { FaRegCalendarAlt } from "react-icons/fa"

export default function ExamMainContent({currentQuestion, questionIndex, id, selection, refetchCount, setRefetchCount, mode, incrementQuestionIndex}) {
  const [updateSelection] = useUpdateSelectionMutation()
  const [submitAnswer] = useSubmitAnswerMutation()

  async function sendSelectionUpdate(choiceIndex) {
    if (currentQuestion?.hasAnswered) return

    try {
      await updateSelection({
        examId: id,
        questionIndex: questionIndex,
        selectionByNumber: choiceIndex + 1
      })
      setRefetchCount(refetchCount + 1)
    } catch (err) {
      console.log(err)
    }
  }

  async function handleSubmitAnswer(e) {
    e.preventDefault()

    if (currentQuestion?.hasAnswered) return
    
    try {
      await submitAnswer({
        examId: id,
        questionIndex: questionIndex,
        selectionNumber: selection || null,
      })
      setRefetchCount(refetchCount + 1)
    } catch (err) {
      console.log(err)
    }
  }

function renderLetters(index) {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F']
  return letters[index] || ''
}

  return (
    <div className="fixed left-20 top-14 right-0 bottom-14 overflow-y-scroll -z-10">
      <div className="w-full flex flex-col items-center p-8 lg:flex-row lg:items-start">
        <p className="lg:mr-20 lg:max-w-[700px]">{currentQuestion?.vignette}</p>
      </div>
      
      <form onSubmit={(e) => handleSubmitAnswer(e)} className="mt-10 mx-8 min-w-64 border border-exam-secondary inline-block text-left p-2 shadow-md border-b-8 mb-8">
        {currentQuestion?.choices?.map((choice, index) => (
          <div className="flex items-center cursor-pointer p-1 hover:bg-gray-300 hover:rounded-md" key={index}>
            <input
              id={renderLetters(index)}
              type="radio"
              className="mr-2"
              value={`${renderLetters(index)}. ${choice}`}
              checked={index + 1 === selection}
              onChange={() => {
                sendSelectionUpdate(index)
              }}
            />
            <label htmlFor={renderLetters(index)} className="text-lg cursor-pointer">
              {renderLetters(index)}. {choice}
            </label>
          </div>
        ))}
        {mode?.tutor &&
          <button className="border-2 border-black text-center py-1 px-5 mt-4 rounded-md bg-gradient-to-t from-[#D3D3D3] via-transparent to-exam-white font-bold hover:bg-gradient-to-t hover:from-exam-white hover:via-transparent hover:to-[#D3D3D3]">Show Answer</button>
        }
      </form>

      {!mode?.tutor &&
        <div className="max-w-[1200px] text-center flex items-center justify-center h-24">
          <button className="bg-exam-secondary py-2 px-8 text-100 rounded-md crusor-pointer hover:bg-[#4783bd99]" onClick={(e) => incrementQuestionIndex()}>Proceed To Next Item</button>
        </div>
      }
      
      {currentQuestion?.hasAnswered &&
      <>
        <div className={currentQuestion?.answeredCorrectly ? "h-32 max-w-[800px] bg-200 shadow-lg mx-8 border-l-8 border-green-500 flex items-center justify-between px-5 mt-10" : "h-32 max-w-[800px] bg-200 shadow-lg mx-8 border-l-8 border-red-500 flex items-center justify-between px-5 mt-10"}>
          <div className="flex flex-col h-24 justify-center">
            <h6 className={currentQuestion?.answeredCorrectly ? "text-green-500" : "text-red-500"}>{currentQuestion?.answeredCorrectly ? "Correct" : "Incorrect"}</h6>
            <p className="text-exam-gray">Correct answer:</p>
            <p className="text-exam-gray">{renderLetters(currentQuestion?.correctChoice - 1)}</p>
          </div>

          <div className="flex flex-col h-24 justify-center">
            <IoPersonCircleOutline className="text-xl"/>
            <p className="text-exam-gray">Your answer:</p>
            <p className="text-exam-gray">{currentQuestion?.selection === null ? "N/A" : renderLetters(currentQuestion?.selection - 1)}</p>
          </div>

          <div className="flex flex-col h-24 justify-center">
            <FaRegCalendarAlt className="text-xl"/>
            <p className="text-exam-gray">Version</p>
            <p className="text-exam-gray">2024</p>
          </div>
        </div>

        <div className="px-10 max-w-[800px] my-10">
          {currentQuestion?.explanations.map((explanation, index) => (
            <div className="mt-6" key={index}>
              <span className="font-bold">(Choice {`${renderLetters(index)}`}) </span> 
              <span>{`${explanation}`}</span>
            </div>
          ))}
        </div>

        <div className="max-w-[800px] border-t-2 border-gray-300 mx-10 flex px-12 pt-4 mb-10 md:px-24">
          <div className="flex flex-col mr-auto">
            <h6 className="font-bold">{(currentQuestion?.subject).toUpperCase()}</h6>
            <p className="text-exam-gray">Subject</p>
          </div>
          <div className="flex flex-col">
            <h6 className="font-bold">{(currentQuestion?.organSystem).toUpperCase()}</h6>
            <p className="text-exam-gray">Chapter</p>
          </div>
        </div>

        <div className="max-w-[800px] mb-10 mx-10">
          <h6 className="text-xs text-exam-gray text-center">Copyright © Edge Up Learning. All rights reserved.</h6>
        </div>
      </>
      }
    </div>
  )
}