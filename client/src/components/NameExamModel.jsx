import React, {useState} from 'react'
import {AiFillCloseCircle} from "react-icons/ai"
import { setExamNameModal, selectExamNameModal } from '../redux/slices/modalSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function NameExamModel() {
  const [examName, setExamName] = useState('')

  const dispatch = useDispatch()
  const examNameModalState = useSelector(selectExamNameModal) 

  function toggleModal() {
    dispatch(setExamNameModal(!examNameModalState))
  }

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 opacity-80 bg-500 z-50 flex items-center justify-center">
        <div className="h-72 w-96 bg-200 rounded-md flex flex-col items-center py-6 relative">
            <AiFillCloseCircle className="absolute top-2 right-2 h-6 w-6 text-600 cursor-pointer transition-all ease-in-out hover:text-700"
            onClick={toggleModal}
            />
            <h1 className="text-xl pb-4 border-b border-800 w-full text-center">Exam Name</h1>
            <input 
            type="text" 
            id="examName"
            name="examName"
            value={examName}
            onChange={(e) => setExamName(e.target.value)}
            placeholder="Eg, Cardiology Final"
            className="border-2 border-400 rounded-md h-12 w-80 px-2 mb-10 mt-10"
            />
            <button className="secondary-btn h-12 text-xl">Save</button>
        </div>
    </div>
  )
}
