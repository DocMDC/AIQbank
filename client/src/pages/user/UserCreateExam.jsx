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
  /* TODOs: */
  //Fix final question count - perhaps use useRef on each element in Organ Systems and get the number and then add them up
  //Fix createExamForm update function so that when an organ system is selected and the corresponding subject is deselected, this is reflected appropriately (right now organ system stays true even though it's not displayed with css)
  //Restrict number of questions input from 1 to max allowed
  //Pass filters and selections to server and then generate exam with appropriate questions 

  const { data: filteredQuestionData, error, isLoading } = useFilterQuestionsQuery()
  const navigate = useNavigate()
  
  const { createExamForm } = useContext(Context)
  const incorrectCountRef = useRef()
  const unusedCountRef = useRef()
  // const cardiologyCountRef = useRef()
  // console.log(cardiologyCountRef)

  const [incorrectCountValue, setIncorrectCountValue] = useState(null)
  const [unusedCountValue, setUnusedCountValue] = useState(null)
  const [selectedSubjects, setSelectedSubjects] = useState([])
  const [selectedOrgans, setSelectedOrgans] = useState([])
  const [filteredOrgansBySubjects, setFilteredOrgansBySubjects] = useState({})
  const [finalFilteredQuestions, setFinalFilteredQuestions] = useState({})

  useEffect(() => {
    if (incorrectCountRef.current) {
      setIncorrectCountValue(parseInt(incorrectCountRef.current.innerHTML, 10))
    }
    if (unusedCountRef.current) {
      setUnusedCountValue(parseInt(unusedCountRef.current.innerHTML, 10))
    }
  }, [filteredQuestionData])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  const incorrectQuestions = filteredQuestionData?.incorrectQuestions 
  const unusedQuestions = filteredQuestionData?.unusedQuestions
  const allOrgans = filteredQuestionData?.allOrganSystemsQuestions
  const allSubjects = filteredQuestionData?.allSubjectsQuestions

  

  //Create refs for each organ system and use these in the SelectOrgans component to reference the number of questions available

  // const organSystemCountRefs = Object.fromEntries(
  //   Object.keys(allOrgans).map((organSystem) => [
  //     organSystem,
  //     useRef(null),
  //   ])
  // )

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

  //Update subject selection and filter allOrgans data such that only those questions with the corresponding selected subjects are available in the filteredOrgansBySubjects state
  function handleSubjectSelection(subject, isSelected) {
    setSelectedSubjects((prevSelectedSubjects) => {
      const updatedSubjects = isSelected
        ? [...prevSelectedSubjects, subject]
        : prevSelectedSubjects.filter((selectedSubject) => selectedSubject !== subject)
  
      const newFilteredOrgansBySubjects = {}
  
      Object.keys(allOrgans).forEach((organSystem) => {
        const filteredQuestions = allOrgans[organSystem].filter((organ) =>
          updatedSubjects.includes(organ.subject)
        )
  
        if (filteredQuestions.length > 0) {
          newFilteredOrgansBySubjects[organSystem] = filteredQuestions
        }
      })
  
      setFilteredOrgansBySubjects(newFilteredOrgansBySubjects)
  
      return updatedSubjects
    })
  }

  //Update the SelectOrgans.jsx component and all of the questions obtained from the server so that there is a JSON formatted object containing the questions of interest, ultimately used to generate a set of filtered questions matching the user's selection  
  function handleOrganSelection(organ, isSelected) {
    setSelectedOrgans((prevSelectedOrgans) => {
      const updatedOrgans = isSelected
        ? [...prevSelectedOrgans, organ]
        : prevSelectedOrgans.filter((selectedOrgan) => selectedOrgan !== organ)

      const newFinalFilteredQuestions = {}

      Object.keys(filteredOrgansBySubjects).forEach((system) => {
        const filteredQuestions = filteredOrgansBySubjects[system].filter((organ) => updatedOrgans.includes(organ.organSystem))
        
        if (filteredQuestions.length > 0) {
          newFinalFilteredQuestions[system] = filteredQuestions
        }
      })

      setFinalFilteredQuestions(newFinalFilteredQuestions)

      return updatedOrgans
    })
  }

  const finalQuestionCountLength = Object.keys(finalFilteredQuestions).length
  console.log(finalFilteredQuestions)

  //finalFilteredQuestions     <---- this will be the final object used to generate the exam
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
            filteredOrgansBySubjects={filteredOrgansBySubjects}
            onOrganSelection={handleOrganSelection}
            // organSystemCountRefs={organSystemCountRefs}

          />
          <SelectNumberOfQuestions
            finalQuestionCountLength={finalQuestionCountLength}
          />
          <button className="ml-6 primary-btn">Create Exam</button>
        </form>
      </div>
    </div>
    </>
  );
}

