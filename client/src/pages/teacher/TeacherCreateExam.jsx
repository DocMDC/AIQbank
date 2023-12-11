import React, {useState} from 'react'
import NameExamModel from '../../components/NameExamModel'
import { selectExamNameModal } from '../../redux/slices/modalSlice'
import { useSelector } from 'react-redux'
//Name of exam

//Upload any PDFs for AI to reference 

//Select question type (open response, multiple choice, true false)
//Add question
//Add choices
//Designate correct
//Designate incorrect
//Link explanations to choices
//Add references 
//Link question to subject directory 

//As a question is added, a div is created containing the question number and an ability to edit / remove the question
//Drag and drop questions in order desired



export default function TeacherCreateExam() {
  const examNameModalState = useSelector(selectExamNameModal) 

  return (
    <>
      {examNameModalState ? (
        <NameExamModel />
      ) : (
        <div className="bg-300 w-full pb-4">
          <div className="bg-100 h-12 flex items-center justify-center text-2xl tracking-wider text-500">
            <h1>Create Exam</h1>
          </div>
          <div className="bg-100 mt-4 min-h-[1000px]">
            <form>
              <div className="h-24 border-b-2 border-400 px-6 flex items-center">
                <label htmlFor="examName" className="text-md">
                  Exam name:
                </label>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
