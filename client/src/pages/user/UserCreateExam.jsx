import React, { useContext } from 'react'
import { useNavigate } from "react-router-dom"
import TestMode from "../../components/TestMode"
import QuestionMode from "../../components/QuestionMode"
import SelectSubjects from "../../components/SelectSubjects"
import SelectOrgans from "../../components/SelectOrgans"
import SelectNumberOfQuestions from "../../components/SelectNumberOfQuestions"
import { Context } from "../../Context"
import { nanoid } from "nanoid"

export default function UserCreateExam() {

  const {createExamForm, updateCreateExamForm} = useContext(Context)

  const navigate = useNavigate()

  function submitCreateExam() {
    const examSessionId = nanoid()
    console.log(examSessionId)
    navigate(`/exam/${examSessionId}`)
  }
  
  return (
    <>
    <div className="bg-300 w-full pb-4">
      <div className="bg-100 h-12 flex items-center justify-center text-2xl tracking-wider text-500">
        <h1>Create Exam</h1>
      </div>
      
      <div className="bg-100 mt-4 pb-4 min-h-[1000px]">
        <form onSubmit={submitCreateExam}>
          <TestMode/>
          <QuestionMode/>
          <SelectSubjects/>
          <SelectOrgans/>
          <SelectNumberOfQuestions/>
          <button className="ml-6 primary-btn">Create Exam</button>
        </form>
      </div>
    </div>
    </>
  );
}