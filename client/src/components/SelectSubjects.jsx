import React, {useContext} from 'react'
import {Context} from "../Context"

export default function SelectSubjects() {
    const {createExamForm, updateCreateExamForm} = useContext(Context)

  return (
    <div className="h-72 border-b-2 border-400 p-6">
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
        
        <div className="flex">
            <div className="w-48">
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
            </div>

            <div>
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
    </div>
  )
}
