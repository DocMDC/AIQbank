import React, {useState} from 'react'

export default function TestModes() {
    const [createExamForm, setCreateExamForm] = useState({
        tutorMode: false,
        timedMode: false
      })
    
      function handleToggleModes(name) {
        setCreateExamForm({ 
          ...createExamForm, 
          [name]: !createExamForm[name]
        })
      }
    
      return (
        <div className="bg-300 w-full pb-4">
          <div className="bg-100 h-12 flex items-center justify-center text-2xl tracking-wider text-500">
            <h1>Create Exam</h1>
          </div>
          <div className="bg-100 mt-4 min-h-[1000px]">
            <form>
              <div className="h-36 border-b-2 border-400 p-6">
                <h2 className="text-xl mb-4">Test mode</h2>
                <div className="flex items-center">
                  <label className="relative inline-block w-20 h-8 mx-2">
                    <input 
                    type="checkbox" 
                    name="tutorMode"
                    id="tutorMode"
                    value={createExamForm.tutorMode}
                    className="hidden"
                    onChange={() => handleToggleModes('tutorMode')}
                    />
                    <span className={createExamForm.tutorMode 
                      ? "absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-600 duration-300 rounded-full before:absolute before:h-6 before:w-6 before:left-1 before:bottom-1 before:bg-100 before:duration-500 before:rounded-full before:translate-x-12" 
                      : "absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-500 duration-300 rounded-full before:absolute before:h-6 before:w-6 before:left-1 before:bottom-1 before:bg-100 before:duration-500 before:rounded-full"}></span>
                  </label>
                  <h3>Tutor</h3>
                  <label className="relative inline-block w-20 h-8 mx-2">
                    <input 
                    type="checkbox" 
                    name="timedMode"
                    id="timedMode"
                    value={createExamForm.timedMode}
                    className="hidden"
                    onChange={() => handleToggleModes('timedMode')}
                    />
                    <span className={createExamForm.timedMode 
                      ? "absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-600 duration-300 rounded-full before:absolute before:h-6 before:w-6 before:left-1 before:bottom-1 before:bg-100 before:duration-500 before:rounded-full before:translate-x-12" 
                      : "absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-500 duration-300 rounded-full before:absolute before:h-6 before:w-6 before:left-1 before:bottom-1 before:bg-100 before:duration-500 before:rounded-full"}></span>
                  </label>
                  <h3>Timed</h3>
                </div>
              </div>          
            </form>
          </div>
        </div>
      )
}



/* alternative approach using redux below: 

import React, {useState} from 'react'
import { selectTutorMode, selectTimedMode, setCreateExamForm } from "../redux/slices/createExamSlice"
import { useSelector, useDispatch } from 'react-redux'


export default function TestModes() {
    const tutorModeState = useSelector(selectTutorMode)
    const timedModeState = useSelector(selectTimedMode)
    const dispatch = useDispatch()

      function toggleTutorMode() {
        dispatch(setCreateExamForm({
          tutorMode: !tutorModeState,
          timedMode: timedModeState
        }))
      }

      function toggleTimedMode() {
        dispatch(setCreateExamForm({
          tutorMode: tutorModeState,
          timedMode: !timedModeState
        }))
      }

    //   function handleToggleModes(e) {
    //     const {name, value} = e.target
    //     dispatch(setCreateExamForm(prev => {
    //         return ({
    //             ...prev,
    //             [name]: value
    //         })
    //     }))
    // }   
    
      return (
        <div className="h-36 border-b-2 border-400 p-6">
          <h2 className="text-xl mb-4">Test mode</h2>
          <div className="flex items-center">
            <label className="relative inline-block w-20 h-8 mx-2">
              <input 
              type="checkbox" 
              name="tutorMode"
              id="tutorMode"
              value={tutorModeState}
              className="hidden"
              onChange={toggleTutorMode}
              />
              <span className={tutorModeState 
                ? "absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-600 duration-300 rounded-full before:absolute before:h-6 before:w-6 before:left-1 before:bottom-1 before:bg-100 before:duration-500 before:rounded-full before:translate-x-12" 
                : "absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-500 duration-300 rounded-full before:absolute before:h-6 before:w-6 before:left-1 before:bottom-1 before:bg-100 before:duration-500 before:rounded-full"}></span>
            </label>
            <h3>Tutor</h3>
            <label className="relative inline-block w-20 h-8 mx-2">
              <input 
              type="checkbox" 
              name="timedMode"
              id="timedMode"
              value={timedModeState}
              className="hidden"
              onChange={toggleTimedMode}
              />
              <span className={timedModeState 
                ? "absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-600 duration-300 rounded-full before:absolute before:h-6 before:w-6 before:left-1 before:bottom-1 before:bg-100 before:duration-500 before:rounded-full before:translate-x-12" 
                : "absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-500 duration-300 rounded-full before:absolute before:h-6 before:w-6 before:left-1 before:bottom-1 before:bg-100 before:duration-500 before:rounded-full"}></span>
            </label>
            <h3>Timed</h3>
          </div>
        </div>          

      )
}


*/