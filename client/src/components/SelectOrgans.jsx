import React, {useContext} from 'react'
import {Context} from "../Context"

export default function SelectOrgans() {

    const {createExamForm, updateCreateExamForm} = useContext(Context)

  return (
    <div className="h-72 border-b-2 border-400 p-6">
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
        
        <div className="flex">
            <div className="w-48">
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
            </div>

            <div>
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
    </div>
  )
}
