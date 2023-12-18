import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from "react-router-dom"
import ExamHeader from "../../components/ExamHeader"
import ExamQuestionNav from "../../components/ExamQuestionNav"
import ExamMainContent from "../../components/ExamMainContent"
import ExamFooter from "../../components/ExamFooter"
import { useGetExamQuery } from '../../redux/slices/examsApiSlice'

export default function UserExamInSession() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: examData, error, isLoading, refetch } = useGetExamQuery(id)
  const [questionIndex, setQuestionIndex] = useState(0)

  

  // useEffect(() => {
  //   refetch()
  // }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }
  
  const currentQuestion = examData?.exam[0]?.listOfQuestions[questionIndex]
  const listOfQuestions = examData?.exam[0]?.listOfQuestions

  function incrementQuestionIndex() {
    if (questionIndex >= listOfQuestions.length - 1) {
      setQuestionIndex(0)
    } else {
      setQuestionIndex(questionIndex + 1)
    }
  }

  function decrementQuestionIndex() {
    if (questionIndex <= 0) {
      setQuestionIndex(listOfQuestions.length - 1)
    } else {
      setQuestionIndex(questionIndex - 1)
    }
  }

  function modifyQuestionIndex(mappedIndex) {
    setQuestionIndex(mappedIndex)
  }

  function handleSuspendExam() {
    navigate("/dashboard/my-exams")
  }

  return (
    <>
        <ExamHeader 
          questionIndex={questionIndex}
          incrementQuestionIndex={incrementQuestionIndex}
          decrementQuestionIndex={decrementQuestionIndex}
        />
        <ExamQuestionNav
          listOfQuestions={listOfQuestions}
          questionIndex ={questionIndex}
          modifyQuestionIndex={modifyQuestionIndex}
        />
        <ExamMainContent
          currentQuestion={currentQuestion}
        />
        <ExamFooter
          handleSuspendExam={handleSuspendExam}
        />
    </>
  )
}
