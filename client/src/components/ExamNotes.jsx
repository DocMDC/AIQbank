import React, {useState} from 'react'
import {AiFillCloseCircle} from "react-icons/ai"

export default function ExamNotes({isNotesOpen, setIsNotesOpen}) {
    const [notesText, setNotesText] = useState('')

  return (
    <>
        {isNotesOpen &&
            <div className="fixed top-20 right-14 overflow-y-scroll bg-300 shadow-md h-96 w-80 border border-exam-secondary z-50">
                <AiFillCloseCircle className="absolute top-2 right-2 text-xl cursor-pointer hover:text-exam-secondary" onClick={() => setIsNotesOpen(!isNotesOpen)}/>
                <h1 className="text-lg text-center border-b border-black py-2">Question Notes</h1>
                <div className="flex flex-col m-4">
                    <textarea 
                        name="notes" 
                        id="notes" 
                        cols="30" 
                        rows="10"
                        className="p-2 rounded-md"
                        value={notesText}
                        onChange={(e) => setNotesText(e.target.value)}
                    >
                    </textarea>
                    <div className="flex px-8 mt-8">
                        <button className="bg-exam-secondary p-2 text-100 rounded-md crusor-pointer hover:bg-[#4783bd99] mr-auto">Save note</button>
                        <button className="bg-exam-secondary p-2 text-100 rounded-md crusor-pointer hover:bg-[#4783bd99]">Delete note</button>
                    </div>
                </div>
            </div>
        }
    </>
  )
}
