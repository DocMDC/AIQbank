import React, {useState} from 'react'
import questionImage from "../assets/questionImage.png"

export default function ExamMainContent() {

  const [choices, setChoices] = useState("")

function handleSelectChoice(e) {
  setChoices(e.target.value)
}

  return (
    <div className="fixed left-20 top-14 right-0 bottom-14 overflow-y-scroll -z-10">
      <div className="w-full flex flex-col items-center p-8 lg:flex-row lg:items-start">
        <p className="lg:mr-20 lg:max-w-[700px]">A 17-year-old female is brought to the emergency room by her parents after being hit in the side of the head with a softball during a softball game. She initially blacked out momentarily but appeared to be ok until an hour later when she developed a severe headache and started to vomit. It was at this point that she came to the ER. In the ER she is afebrile with a blood pressure of 131/82, pulse of 119/min, oxygen saturation of 97 percent. She is distressed and unable to consistently respond to questions. Neurologic exam reveals a 7mm left pupil, the right pupil is 3mm, with 5/5 strength in all four limbs. Her head CT is shown below. Damage to a branch of which of the following arteries is most likely causing this patient’s symptoms?</p>
          <img src={questionImage} alt="vignette image" className="w-96 mt-10 lg:mt-0"/>
      </div>

      <form action="" className="mt-10 ml-8 h-64 min-w-64 border border-exam-secondary inline-block text-left p-2 shadow-md border-b-8 mb-8">
        <div className="flex items-center cursor-pointer p-1 hover:bg-gray-300 hover:rounded-md">
          <input 
            id="A"
            type="radio" 
            className="mr-2"
            value={"A. Anterior cerebral artery"}
            checked={choices === "A. Anterior cerebral artery"}
            onChange={handleSelectChoice}
          />
          <label htmlFor="A" className="text-lg cursor-pointer">A. Anterior cerebral artery</label>
        </div>
        <div className="flex items-center cursor-pointer p-1 hover:bg-gray-300 hover:rounded-md">
          <input 
            id="B"
            type="radio" 
            className="mr-2"
            value={"B. Middle cerebral artery"}
            checked={choices === "B. Middle cerebral artery"}
            onChange={handleSelectChoice}
          />
          <label htmlFor="B" className="text-lg cursor-pointer">B. Middle cerebral artery</label>
        </div>

        <button className="border-2 border-black text-center py-1 px-5 mt-4 rounded-md bg-gradient-to-t from-[#D3D3D3] via-transparent to-exam-white font-bold hover:bg-gradient-to-t hover:from-exam-white hover:via-transparent hover:to-[#D3D3D3]">Show Answer</button>
      </form>

    </div>
  )
}
