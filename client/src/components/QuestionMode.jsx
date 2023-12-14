import React, {useContext} from 'react'
import {Context} from "../Context"

export default function QuestionMode() {
    
    const {createExamForm, updateCreateExamForm} = useContext(Context)

  return (
    <div className="h-36 border-b-2 border-400 p-6">
        <h2 className="text-xl mb-6">Question Mode</h2>
        <div className="flex items-center">
            <input 
            id="unused"
            name="unused"
            type="checkbox" 
            className="mr-2 w-5 h-5 cursor-pointer"
            value={createExamForm.unused}
            onChange={updateCreateExamForm}
            />
            <label htmlFor="unused" className="text-lg mr-10 cursor-pointer">Unused</label>

            <input 
            id="incorrect"
            name="incorrect"
            type="checkbox" 
            className="mr-2 w-5 h-5 cursor-pointer"
            value={createExamForm.incorrect}
            onChange={updateCreateExamForm}
            />
            <label htmlFor="incorrect" className="text-lg mr-10 cursor-pointer">Incorrect</label>

            <input 
            id="flagged"
            name="flagged"
            type="checkbox" 
            className="mr-2 w-5 h-5 cursor-pointer"
            value={createExamForm.flagged}
            onChange={updateCreateExamForm}
            />
            <label htmlFor="flagged" className="text-lg cursor-pointer">Flagged</label>
        </div>
    </div>
  )
}
