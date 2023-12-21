import React, {useState, useEffect} from 'react'
import {AiFillCloseCircle} from "react-icons/ai"
import { useUpdateCurrentNoteMutation, useDeleteCurrentNoteMutation } from '../redux/slices/examsApiSlice'

export default function ExamNotes({isNotesOpen, setIsNotesOpen, currentQuestion, setRefetchCount, id, questionIndex}) {
    const [questionNoteText, setQuestionNoteText] = useState({})
    const [updateNote] = useUpdateCurrentNoteMutation()
    const [deleteNote] = useDeleteCurrentNoteMutation()

    useEffect(() => {
        // When a new question is selected, update the local state with the note for that question
        if (currentQuestion?.hasNote) {
            setQuestionNoteText((prevNotes) => ({
            ...prevNotes,
            [questionIndex]: currentQuestion?.note || '',
          }));
        }
      }, [currentQuestion, questionIndex]);

    async function handleUpdateCurrentNote(e) {
        e.preventDefault()

        try {
            await updateNote({
                noteText: questionNoteText[questionIndex],
                examId: id,
                questionIndex: questionIndex
            })
            setRefetchCount((prevCount) => prevCount + 1)
        } catch (err) {
            console.log(err)
        }
    }

    async function handleDeleteCurrentNote(e) {
        e.preventDefault()

        try {
            const response = await deleteNote({
                examId: id,
                questionIndex: questionIndex
            })
            console.log(response)
            // Reset the local state for the deleted note
            setQuestionNoteText((prevNotes) => ({
                ...prevNotes,
                [questionIndex]: '',
            }))

            setRefetchCount((prevCount) => prevCount + 1)
        } catch (err) {
            console.log(err)
        }
    }

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
                        rows="9"
                        className="p-2 rounded-md"
                        value={questionNoteText[questionIndex] || ''}
                        onChange={(e) =>
                            setQuestionNoteText((prevNotes) => ({
                              ...prevNotes,
                              [questionIndex]: e.target.value,
                            }))
                          }
                    >
                    </textarea>
                    <div className="flex px-8 mt-8">
                        <button className="bg-exam-secondary p-2 text-100 rounded-md crusor-pointer hover:bg-[#4783bd99] mr-auto" onClick={(e) => handleUpdateCurrentNote(e)}>Save note</button>
                        <button className="bg-exam-secondary p-2 text-100 rounded-md crusor-pointer hover:bg-[#4783bd99]" onClick={(e) => handleDeleteCurrentNote(e)}>Delete note</button>
                    </div>
                </div>
            </div>
        }
    </>
  )
}
