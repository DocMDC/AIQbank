import React, {useEffect} from 'react'
import { useParams } from "react-router-dom"
import ExamQuestionNav from "../../components/ExamQuestionNav"
import ExamMainContent from "../../components/ExamMainContent"
import ExamFooter from "../../components/ExamFooter"
import { useGetExamQuery } from '../../redux/slices/examsApiSlice'


export default function UserExamInSession() {
  const { id } = useParams()
  const { data: examData, error, isLoading, refetch } = useGetExamQuery(id)

  // useEffect(() => {
  //   refetch()
  // }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  console.log(examData)
  return (
    <>
        <ExamQuestionNav/>
        <ExamMainContent/>
        <ExamFooter/>
    </>
  )
}
