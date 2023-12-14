import React, {useContext} from 'react'
import {Context} from "../Context"            

export default function SelectNumberOfQuestions() {
    const {createExamForm, updateCreateExamForm} = useContext(Context)

  return (
    <div className="h-40 p-6 text-xl flex flex-col">
        <label htmlFor="numberOfQuestions" className="text-xl mr-2 cursor-pointer">Number of Questions</label>
        <div className="flex items-center h-14 mt-4">
            <input 
            id="numberOfQuestions"
            name="numberOfQuestions"
            type="number" 
            className="w-12 h-12 border border-800 text-center"
            checked={createExamForm.numberOfQuestions}
            onChange={updateCreateExamForm}
            />
            <p className="ml-4 text-sm">Maximum allowed based on your selection <span>(get number from database)</span></p>
        </div>
    </div>
  )
}