import React, {useState} from 'react'
import { useAiChatMutation } from "../../redux/slices/authApiSlice"

export default function TeacherExams() {
  const [getAi, {isLoading}] = useAiChatMutation()
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  
  async function handleGetAi(e) {
    e.preventDefault()
    try {
      const response = await getAi(question).unwrap()
      const aiAnswer = response.choices[0].message.content
      setAnswer(aiAnswer)
      console.log(aiAnswer)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <div>TeacherExams</div>
      <form onSubmit={handleGetAi} className="flex flex-col items-center bg-qbank-bg-300 h-56 w-1/2">
        <label htmlFor="aiQuestion" className="text-xl mb-2">Question</label>
        <textarea 
          id="aiQuestion"
          onChange={(e) => setQuestion(e.target.value)}
          value={question}
          className="w-3/4 h-1/2"
        />
        <button className="primary-btn mt-4">Ask AI</button>
      </form>
      <div className="h-56 w-1/2 bg-qbank-bg-200 mt-4 p-2">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <p>{answer ? answer : ''}</p>
        )}
      </div>
    </>
  )
}
