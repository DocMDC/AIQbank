import React, { useContext, useState, useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom"
import TestMode from "../../components/TestMode"
import QuestionMode from "../../components/QuestionMode"
import SelectSubjects from "../../components/SelectSubjects"
import SelectOrgans from "../../components/SelectOrgans"
import SelectNumberOfQuestions from "../../components/SelectNumberOfQuestions"
import { nanoid } from "nanoid"
import { useFilterQuestionsQuery } from "../../redux/slices/questionsApiSlice"
import {Context} from "../../Context"


export default function UserCreateExam() {

  const { data: filteredQuestionData, error, isLoading } = useFilterQuestionsQuery()
  const navigate = useNavigate()
  const { createExamForm } = useContext(Context)
  const incorrectCountRef = useRef()
  const unusedCountRef = useRef()

  const [incorrectCountValue, setIncorrectCountValue] = useState(null)
  const [unusedCountValue, setUnusedCountValue] = useState(null)
  const [selectedSubjects, setSelectedSubjects] = useState([])

  useEffect(() => {
    setIncorrectCountValue(parseInt(incorrectCountRef.current?.innerHTML))
    setUnusedCountValue(parseInt(unusedCountRef.current?.innerHTML))
  }, [filteredQuestionData])

  if (isLoading) {
      return <div>Loading...</div>
  }
  
  if (error) {
    return <div>Error: {error.message}</div>
  }

  const incorrectQuestions = filteredQuestionData.incorrectQuestions
  const unusedQuestions = filteredQuestionData.unusedQuestions
  const allOrgans = filteredQuestionData.allOrganSystemsQuestions
  const allSubjects = filteredQuestionData.allSubjectsQuestions

  function submitCreateExam() {
    const examSessionId = nanoid()
    console.log(examSessionId)
    navigate(`/exam/${examSessionId}`)
  }

  //Reformat unused and incorrect question data from server so that it's in JSON format and can be easily passed down to the SelectSubjects component as props
  let unusedQuestionsBySubject = {}
  let incorrectQuestionsBySubject = {}

  function filterUnusedAndIncorrectQuestions() {
    const subjects = [
      "anatomy",
      "microbiology",
      "biochemistry",
      "embryology",
      "immunology",
      "pathology",
      "physiology",
      "pharmacology",
    ]

    subjects.forEach((subject) => {
      unusedQuestionsBySubject[subject] = unusedQuestions.filter(
        (question) => question.subject === subject
      )
    })

    subjects.forEach((subject) => {
      incorrectQuestionsBySubject[subject] = incorrectQuestions.filter(
        (question) => question.subject === subject
      )
    })
  }

  filterUnusedAndIncorrectQuestions()

  // Function to handle subject selection in SelectSubjects
  function handleSubjectSelection(subject, isSelected) {
    if (isSelected) {
      // Add subject to selectedSubjects
      setSelectedSubjects((prevSelectedSubjects) => [...prevSelectedSubjects, subject])
    } else {
      // Remove subject from selectedSubjects
      setSelectedSubjects((prevSelectedSubjects) =>
        prevSelectedSubjects.filter((selectedSubject) => selectedSubject !== subject)
      )
    }
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
          <QuestionMode
            unusedQuestions={unusedQuestions}
            incorrectQuestions={incorrectQuestions}
            incorrectCountRef={incorrectCountRef}
            unusedCountRef={unusedCountRef}
            incorrectCountValue={incorrectCountValue}
            unusedCountValue={unusedCountValue}
          />
           <SelectSubjects
            filteredSubjectsObj={createExamForm.unused ? unusedQuestionsBySubject : incorrectQuestionsBySubject}
            incorrectCountValue={incorrectCountValue}
            unusedCountValue={unusedCountValue}
            onSubjectSelection={handleSubjectSelection}
          />
          
          <SelectOrgans
            allOrgans={allOrgans}
            selectedSubjects={selectedSubjects}
          />
          <SelectNumberOfQuestions/>
          <button className="ml-6 primary-btn">Create Exam</button>
        </form>
      </div>
    </div>
    </>
  );
}