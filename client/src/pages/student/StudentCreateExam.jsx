import React, {useState} from 'react'
import NameExamModel from '../../components/NameExamModel'
import { selectExamNameModal } from '../../redux/slices/modalSlice'
import { useSelector } from 'react-redux'
import TestModes from "../../components/TestModes"

export default function StudentCreateExam() {
  const [createExamForm, setCreateExamForm] = useState({
    tutorMode: false,
    timedMode: false,
    unused: false,
    incorrect: false,
    flagged: false,
    allSubjects: false,
    anatomy: false,
    microbiology: false,
    biochemistry: false,
    embryology: false,
    immunology: false,
    pathology: false,
    physiology: false,
    pharmacology: false,
    allOrganSystems: false,
    cardiology: false,
    dermatology: false,
    endocrinology: false,
    reproduction: false,
    gasteroenterology: false,
    hematology: false,
    neurology: false,
    musculoskeletal: false,
    numberOfQuestions: 0
  })

  function updateCreateExamForm(event) {
    const { name, value, type, checked } = event.target;
  
    setCreateExamForm((prevData) => {
      //If all subjects button is clicked, change all subjects to true or false
      if (name === "allSubjects") {
        if (checked) {
          return {
            ...prevData,
            allSubjects: checked,
            anatomy: checked,
            microbiology: checked,
            biochemistry: checked,
            embryology: checked,
            immunology: checked,
            pathology: checked,
            physiology: checked,
            pharmacology: checked,
          };
        } else {
          return {
            ...prevData,
            allSubjects: false,
            anatomy: false,
            microbiology: false,
            biochemistry: false,
            embryology: false,
            immunology: false,
            pathology: false,
            physiology: false,
            pharmacology: false,
          }
        }
        //If all organ systems button is clicked, change all subjects to true or false
      } else if (name === "allOrganSystems") {
        if (checked) {
          return {
            ...prevData,
            allOrganSystems: checked,
            cardiology: checked,
            dermatology: checked,
            endocrinology: checked,
            reproduction: checked,
            gasteroenterology: checked,
            hematology: checked,
            neurology: checked,
            musculoskeletal: checked,
          };
        } else {
          return {
            ...prevData,
            allOrganSystems: false,
            cardiology: false,
            dermatology: false,
            endocrinology: false,
            reproduction: false,
            gasteroenterology: false,
            hematology: false,
            neurology: false,
            musculoskeletal: false
          }
        }
      } else {
        return {
          ...prevData,
          [name]: type === "checkbox" ? checked : value,
        };
      }
    });
  }

  return (
    <>
    <div className="bg-300 w-full pb-4">
          <div className="bg-100 h-12 flex items-center justify-center text-2xl tracking-wider text-500">
            <h1>Create Exam</h1>
          </div>
          <div className="bg-100 mt-4 min-h-[1000px]">
            <form>
              {/* ------------------TEST MODE------------------ */}

              <div className="h-36 border-b-2 border-400 p-6">
                <h2 className="text-xl mb-6">Test mode</h2>
                <div className="flex items-center">
                  <label className="relative inline-block w-20 h-8 mx-2">
                    <input 
                    type="checkbox" 
                    name="tutorMode"
                    id="tutorMode"
                    value={createExamForm.tutorMode}
                    className="hidden"
                    onChange={updateCreateExamForm}
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
                    onChange={updateCreateExamForm}
                    />
                    <span className={createExamForm.timedMode 
                      ? "absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-600 duration-300 rounded-full before:absolute before:h-6 before:w-6 before:left-1 before:bottom-1 before:bg-100 before:duration-500 before:rounded-full before:translate-x-12" 
                      : "absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-500 duration-300 rounded-full before:absolute before:h-6 before:w-6 before:left-1 before:bottom-1 before:bg-100 before:duration-500 before:rounded-full"}></span>
                  </label>
                  <h3>Timed</h3>
                </div>
              </div> 

              {/* ------------------QUESTION MODE------------------ */}

              <div className="h-36 border-b-2 border-400 p-6">
                <h2 className="text-xl mb-6">Question Mode</h2>
                <div className="flex items-center">
                  <input 
                    id="unused"
                    name="unused"
                    type="checkbox" 
                    className="mr-2 w-5 h-5 cursor-pointer"
                    value={createExamForm.unused}
                    onChange={updateCreateExamForm}
                  />
                  <label htmlFor="unused" className="text-lg mr-10 cursor-pointer">Unused</label>

                  <input 
                    id="incorrect"
                    name="incorrect"
                    type="checkbox" 
                    className="mr-2 w-5 h-5 cursor-pointer"
                    value={createExamForm.incorrect}
                    onChange={updateCreateExamForm}
                  />
                  <label htmlFor="incorrect" className="text-lg mr-10 cursor-pointer">Incorrect</label>

                  <input 
                    id="flagged"
                    name="flagged"
                    type="checkbox" 
                    className="mr-2 w-5 h-5 cursor-pointer"
                    value={createExamForm.flagged}
                    onChange={updateCreateExamForm}
                  />
                  <label htmlFor="flagged" className="text-lg cursor-pointer">Flagged</label>
                </div>
              </div>

              {/* ------------------SUBJECTS------------------ */}

              <div className="h-96 border-b-2 border-400 p-6">
                <div className="mb-6 flex items-center">
                  <label htmlFor="allSubjects" className="text-xl mr-2 cursor-pointer">Subjects</label>
                  <input 
                    id="allSubjects"
                    name="allSubjects"
                    type="checkbox" 
                    className="w-5 h-5 cursor-pointer"
                    checked={createExamForm.allSubjects}
                    onChange={updateCreateExamForm}
                  />
                </div>
                
                <div className="flex flex-col items-left">
                  <div className="flex items-center mb-2">
                    <input 
                        id="anatomy"
                        name="anatomy"
                        type="checkbox" 
                        className="mr-2 w-5 h-5 cursor-pointer"
                        checked={createExamForm.anatomy}
                        onChange={updateCreateExamForm}
                      />
                    <label htmlFor="anatomy" className="text-lg mr-10 cursor-pointer">Anatomy</label>
                  </div>
                  
                  <div className="flex items-center mb-2">
                    <input 
                        id="microbiology"
                        name="microbiology"
                        type="checkbox" 
                        className="mr-2 w-5 h-5 cursor-pointer"
                        checked={createExamForm.microbiology}
                        onChange={updateCreateExamForm}
                      />
                    <label htmlFor="microbiology" className="text-lg mr-10 cursor-pointer">Microbiology</label>
                  </div>

                  <div className="flex items-center mb-2">
                    <input 
                      id="biochemistry"
                      name="biochemistry"
                      type="checkbox" 
                      className="mr-2 w-5 h-5 cursor-pointer"
                      checked={createExamForm.biochemistry}
                      onChange={updateCreateExamForm}
                    />
                    <label htmlFor="biochemistry" className="text-lg mr-10 cursor-pointer">Biochemistry</label>
                  </div>
                  
                  <div className="flex items-center mb-2">
                    <input 
                        id="embryology"
                        name="embryology"
                        type="checkbox" 
                        className="mr-2 w-5 h-5 cursor-pointer"
                        checked={createExamForm.embryology}
                        onChange={updateCreateExamForm}
                      />
                    <label htmlFor="embryology" className="text-lg mr-10 cursor-pointer">Embryology</label>
                  </div>

                  <div className="flex items-center mb-2">
                    <input 
                        id="immunology"
                        name="immunology"
                        type="checkbox" 
                        className="mr-2 w-5 h-5 cursor-pointer"
                        checked={createExamForm.immunology}
                        onChange={updateCreateExamForm}
                      />
                    <label htmlFor="immunology" className="text-lg mr-10 cursor-pointer">Immunology</label>
                  </div>

                  <div className="flex items-center mb-2">
                    <input 
                        id="pathology"
                        name="pathology"
                        type="checkbox" 
                        className="mr-2 w-5 h-5 cursor-pointer"
                        checked={createExamForm.pathology}
                        onChange={updateCreateExamForm}
                      />
                    <label htmlFor="pathology" className="text-lg mr-10 cursor-pointer">Pathology</label>
                  </div>

                  <div className="flex items-center mb-2">
                    <input 
                        id="physiology"
                        name="physiology"
                        type="checkbox" 
                        className="mr-2 w-5 h-5 cursor-pointer"
                        checked={createExamForm.physiology}
                        onChange={updateCreateExamForm}
                      />
                    <label htmlFor="physiology" className="text-lg mr-10 cursor-pointer">Physiology</label>
                  </div>

                  <div className="flex items-center mb-2">
                    <input 
                        id="pharmacology"
                        name="pharmacology"
                        type="checkbox" 
                        className="mr-2 w-5 h-5 cursor-pointer"
                        checked={createExamForm.pharmacology}
                        onChange={updateCreateExamForm}
                      />
                    <label htmlFor="pharmacology" className="text-lg mr-10 cursor-pointer">Pharmacology</label>
                  </div>
                  
                </div>
              </div>

              {/* ------------------ORGAN SYSTEMS------------------ */}
              <div className="h-96 border-b-2 border-400 p-6">
                <div className="mb-6 flex items-center">
                  <label htmlFor="allOrganSystems" className="text-xl mr-2 cursor-pointer">Organ Systems</label>
                  <input 
                    id="allOrganSystems"
                    name="allOrganSystems"
                    type="checkbox" 
                    className="w-5 h-5 cursor-pointer"
                    checked={createExamForm.allOrganSystems}
                    onChange={updateCreateExamForm}
                  />
                </div>
                
                <div className="flex flex-col items-left">
                  <div className="flex items-center mb-2">
                    <input 
                        id="cardiology"
                        name="cardiology"
                        type="checkbox" 
                        className="mr-2 w-5 h-5 cursor-pointer"
                        checked={createExamForm.cardiology}
                        onChange={updateCreateExamForm}
                      />
                    <label htmlFor="cardiology" className="text-lg mr-10 cursor-pointer">Cardiology</label>
                  </div>
                  
                  <div className="flex items-center mb-2">
                    <input 
                        id="dermatology"
                        name="dermatology"
                        type="checkbox" 
                        className="mr-2 w-5 h-5 cursor-pointer"
                        checked={createExamForm.dermatology}
                        onChange={updateCreateExamForm}
                      />
                    <label htmlFor="dermatology" className="text-lg mr-10 cursor-pointer">Dermatology</label>
                  </div>

                  <div className="flex items-center mb-2">
                    <input 
                      id="endocrinology"
                      name="endocrinology"
                      type="checkbox" 
                      className="mr-2 w-5 h-5 cursor-pointer"
                      checked={createExamForm.endocrinology}
                      onChange={updateCreateExamForm}
                    />
                    <label htmlFor="endocrinology" className="text-lg mr-10 cursor-pointer">Endocrinology</label>
                  </div>
                  
                  <div className="flex items-center mb-2">
                    <input 
                        id="reproduction"
                        name="reproduction"
                        type="checkbox" 
                        className="mr-2 w-5 h-5 cursor-pointer"
                        checked={createExamForm.reproduction}
                        onChange={updateCreateExamForm}
                      />
                    <label htmlFor="reproduction" className="text-lg mr-10 cursor-pointer">Reproduction</label>
                  </div>

                  <div className="flex items-center mb-2">
                    <input 
                        id="gasteroenterology"
                        name="gasteroenterology"
                        type="checkbox" 
                        className="mr-2 w-5 h-5 cursor-pointer"
                        checked={createExamForm.gasteroenterology}
                        onChange={updateCreateExamForm}
                      />
                    <label htmlFor="gasteroenterology" className="text-lg mr-10 cursor-pointer">Gasteroenterology</label>
                  </div>

                  <div className="flex items-center mb-2">
                    <input 
                        id="hematology"
                        name="hematology"
                        type="checkbox" 
                        className="mr-2 w-5 h-5 cursor-pointer"
                        checked={createExamForm.hematology}
                        onChange={updateCreateExamForm}
                      />
                    <label htmlFor="hematology" className="text-lg mr-10 cursor-pointer">Hematology</label>
                  </div>

                  <div className="flex items-center mb-2">
                    <input 
                        id="neurology"
                        name="neurology"
                        type="checkbox" 
                        className="mr-2 w-5 h-5 cursor-pointer"
                        checked={createExamForm.neurology}
                        onChange={updateCreateExamForm}
                      />
                    <label htmlFor="neurology" className="text-lg mr-10 cursor-pointer">Neurology</label>
                  </div>

                  <div className="flex items-center mb-2">
                    <input 
                        id="musculoskeletal"
                        name="musculoskeletal"
                        type="checkbox" 
                        className="mr-2 w-5 h-5 cursor-pointer"
                        checked={createExamForm.musculoskeletal}
                        onChange={updateCreateExamForm}
                      />
                    <label htmlFor="musculoskeletal" className="text-lg mr-10 cursor-pointer">Musculoskeletal</label>
                  </div>
                  
                </div>
              </div>

              {/* ------------------Number of Questions------------------ */}
              <div className="h-40 border-b-2 border-400 p-6 text-xl flex flex-col">
                <label htmlFor="numberOfQuestions" className="text-xl mr-2 cursor-pointer">Number of Questions</label>
                <div className="flex items-center h-14 mt-4">
                  <input 
                    id="numberOfQuestions"
                    name="numberOfQuestions"
                    type="number" 
                    className="w-12 h-12 border border-800 text-center"
                    checked={createExamForm.numberOfQuestions}
                    onChange={updateCreateExamForm}
                  />
                  <p className="ml-4 text-sm">Maximum allowed based on your selection <span>(get number from database)</span></p>
                </div>
              </div>

            </form>
          </div>
        </div>
    </>
  );
}