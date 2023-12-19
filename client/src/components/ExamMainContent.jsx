import React from 'react'
import {useUpdateSelectionMutation} from "../redux/slices/examsApiSlice"

export default function ExamMainContent({currentQuestion, questionIndex, id, selection, refetchCount, setRefetchCount}) {
  const [updateSelection] = useUpdateSelectionMutation()

  async function sendSelectionUpdate(choiceIndex) {
    try {
      await updateSelection({
        examId: id,
        questionIndex: questionIndex,
        selectionByNumber: choiceIndex
      })
      setRefetchCount(refetchCount + 1)
    } catch (err) {
      console.log(err)
    }
  }

  async function submitAnswer(e) {
    e.preventDefault()
    try {
      //pass selection to back end
      //if selection === correctChoice set answeredCorrectly to true else false
      //set hasAnswered to true

      console.log('submitting answer')
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
      
      <form onSubmit={(e) => submitAnswer(e)} className="mt-10 ml-8 min-w-64 border border-exam-secondary inline-block text-left p-2 shadow-md border-b-8 mb-8">
        {currentQuestion?.choices?.map((choice, index) => (
          <div className="flex items-center cursor-pointer p-1 hover:bg-gray-300 hover:rounded-md" key={index}>
            <input
              id={renderLetters(index)}
              type="radio"
              className="mr-2"
              value={`${renderLetters(index)}. ${choice}`}
              checked={index === selection}
              onChange={() => {
                sendSelectionUpdate(index)
              }}
            />
            <label htmlFor={renderLetters(index)} className="text-lg cursor-pointer">
              {renderLetters(index)}. {choice}
            </label>
          </div>
        ))}
        <button className="border-2 border-black text-center py-1 px-5 mt-4 rounded-md bg-gradient-to-t from-[#D3D3D3] via-transparent to-exam-white font-bold hover:bg-gradient-to-t hover:from-exam-white hover:via-transparent hover:to-[#D3D3D3]">Show Answer</button>
      </form>
    </div>
  )
}