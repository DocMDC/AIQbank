import React, {useState, useEffect, useRef} from 'react'

export default function TeacherNewExam() {
  const [newExam, setNewExam] = useState({
    name: ''
  })
  return (
    <div>
      <form>
        <label htmlFor="name"></label>
        <input 
          id="name"
          type="text" 
          value={newExam.name}
          className=""
        />
        <label htmlFor=""></label>
      </form>
    </div>
  )
}
