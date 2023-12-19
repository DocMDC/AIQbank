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
  const [countSelections, setCountSelections] = useState(0)

  useEffect(() => {
    refetch()
  }, [countSelections])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }
  
  const currentQuestion = examData?.exam[0]?.listOfQuestions[questionIndex]
  const listOfQuestions = examData?.exam[0]?.listOfQuestions
  const selection = examData?.exam[0]?.listOfQuestions[questionIndex]?.selection

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
          listOfQuestions={listOfQuestions}
        />
        <ExamQuestionNav
          listOfQuestions={listOfQuestions}
          questionIndex ={questionIndex}
          modifyQuestionIndex={modifyQuestionIndex}
          selection={selection}
        />
        <ExamMainContent
          currentQuestion={currentQuestion}
          questionIndex={questionIndex}
          id={id}
          selection={selection}
          countSelections={countSelections}
          setCountSelections={setCountSelections}
        />
        <ExamFooter
          handleSuspendExam={handleSuspendExam}
        />
    </>
  )
}


/*
import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from "react-router-dom"
import ExamHeader from "../../components/ExamHeader"
import ExamQuestionNav from "../../components/ExamQuestionNav"
import ExamMainContent from "../../components/ExamMainContent"
import ExamFooter from "../../components/ExamFooter"
import { useGetExamQuery, useUpdateSelectionMutation } from '../../redux/slices/examsApiSlice'

export default function UserExamInSession() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: examData, error, isLoading, refetch } = useGetExamQuery(id)
  const [updateSelection] = useUpdateSelectionMutation()
  const [questionIndex, setQuestionIndex] = useState(0)

  useEffect(() => {
    refetch()
  }, [updateSelection])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }
  
  const currentQuestion = examData?.exam[0]?.listOfQuestions[questionIndex]
  const listOfQuestions = examData?.exam[0]?.listOfQuestions

  // const [choices, setChoices] = useState(Array(listOfQuestions.length).fill(''))

  //Update/save user selected answers/choices for each question when they make a selection
  // function handleSelectChoice(e, inputIndex) {
  //   const newChoices = [...choices]
  //   newChoices[questionIndex] = e.target.value
  //   setChoices(newChoices)
  // }

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

  console.log(currentQuestion)

  async function sendSelectionUpdate(choiceIndex) {
    try {
      const response = await updateSelection({
        examId: id,
        questionIndex: questionIndex,
        selectionByNumber: choiceIndex
      })
      console.log(response)
    } catch (err) {
      console.log(err)
    }
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
          sendSelectionUpdate={sendSelectionUpdate}
          
        />
        <ExamFooter
          handleSuspendExam={handleSuspendExam}
        />
    </>
  )
}


*/