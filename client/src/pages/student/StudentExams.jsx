import React, {useState} from 'react'
import { useAiChatMutation } from "../../redux/slices/aiApiSlice"

export default function StudentExams() {
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
      <div className="bg-300 w-full pb-4">
        <div className="bg-100 h-12 flex items-center justify-center text-xl tracking-wider text-500">
          <h1>My Exams</h1>
        </div>
          <div className="bg-100 mt-4 min-h-[1000px]">
            <h1>Form</h1>
            <form onSubmit={handleGetAi} className="flex flex-col items-center bg-600 h-56 w-1/2">
              <label htmlFor="aiQuestion" className="text-xl mb-2">Question</label>
              <textarea 
                id="aiQuestion"
                onChange={(e) => setQuestion(e.target.value)}
                value={question}
                className="w-3/4 h-1/2"
              />
              <button className="primary-btn mt-4">Ask AI</button>
            </form>
            <div className="h-56 w-1/2 bg-qbank-bg-400 mt-4 p-2 text-100 overflow-y-scroll">
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <p>{answer ? answer : ''}</p>
              )}
            </div>
          </div>
      </div>
    </>
  )
}
