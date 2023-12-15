import React, {useContext} from 'react'
import {Context} from "../Context"

export default function SelectOrgans({ allOrgans, selectedSubjects }) {

    const {createExamForm, updateCreateExamForm} = useContext(Context)

    console.log(selectedSubjects)
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
            <div className="w-48 mr-10">

                <div className="flex items-center mb-2 h-10 text-lg">
                    <input 
                        id="cardiology"
                        name="cardiology"
                        type="checkbox" 
                        className="mr-2 w-5 h-5 cursor-pointer"
                        checked={createExamForm.cardiology}
                        onChange={updateCreateExamForm}
                        />
                    <label htmlFor="cardiology" className="cursor-pointer mr-2">Cardiology</label>
                    <p className="text-blue-500 border rounded-full px-4 border-gray-600 text-base font-bold">{allOrgans.cardiology.length}</p>
                </div>
                
                <div className="flex items-center mb-2 h-10 text-lg">
                    <input 
                        id="dermatology"
                        name="dermatology"
                        type="checkbox" 
                        className="mr-2 w-5 h-5 cursor-pointer"
                        checked={createExamForm.dermatology}
                        onChange={updateCreateExamForm}
                        />
                    <label htmlFor="dermatology" className="cursor-pointer mr-2">Dermatology</label>
                    <p className="text-blue-500 border rounded-full px-4 border-gray-600 text-base font-bold">{allOrgans.dermatology.length}</p>
                </div>

                <div className="flex items-center mb-2 h-10 text-lg">
                    <input 
                        id="endocrinology"
                        name="endocrinology"
                        type="checkbox" 
                        className="mr-2 w-5 h-5 cursor-pointer"
                        checked={createExamForm.endocrinology}
                        onChange={updateCreateExamForm}
                    />
                    <label htmlFor="endocrinology" className="cursor-pointer mr-2">Endocrinology</label>
                    <p className="text-blue-500 border rounded-full px-4 border-gray-600 text-base font-bold">{allOrgans.endocrinology.length}</p>
                </div>
                
                <div className="flex items-center mb-2 h-10 text-lg">
                    <input 
                        id="reproduction"
                        name="reproduction"
                        type="checkbox" 
                        className="mr-2 w-5 h-5 cursor-pointer"
                        checked={createExamForm.reproduction}
                        onChange={updateCreateExamForm}
                        />
                    <label htmlFor="reproduction" className="cursor-pointer mr-2">Reproduction</label>
                    <p className="text-blue-500 border rounded-full px-4 border-gray-600 text-base font-bold">{allOrgans.reproduction.length}</p>
                </div>
            </div>

            <div>
                <div className="flex items-center mb-2 h-10 text-lg">
                    <input 
                        id="gastroenterology"
                        name="gastroenterology"
                        type="checkbox" 
                        className="mr-2 w-5 h-5 cursor-pointer"
                        checked={createExamForm.gastroenterology}
                        onChange={updateCreateExamForm}
                        />
                    <label htmlFor="gastroenterology" className="cursor-pointer mr-2">Gastroenterology</label>
                    <p className="text-blue-500 border rounded-full px-4 border-gray-600 text-base font-bold">{allOrgans.gastroenterology.length}</p>
                </div>

                <div className="flex items-center mb-2 h-10 text-lg">
                    <input 
                        id="hematology"
                        name="hematology"
                        type="checkbox" 
                        className="mr-2 w-5 h-5 cursor-pointer"
                        checked={createExamForm.hematology}
                        onChange={updateCreateExamForm}
                        />
                    <label htmlFor="hematology" className="cursor-pointer mr-2">Hematology</label>
                    <p className="text-blue-500 border rounded-full px-4 border-gray-600 text-base font-bold">{allOrgans.hematology.length}</p>
                </div>

                <div className="flex items-center mb-2 h-10 text-lg">
                    <input 
                        id="neurology"
                        name="neurology"
                        type="checkbox" 
                        className="mr-2 w-5 h-5 cursor-pointer"
                        checked={createExamForm.neurology}
                        onChange={updateCreateExamForm}
                        />
                    <label htmlFor="neurology" className="cursor-pointer mr-2">Neurology</label>
                    <p className="text-blue-500 border rounded-full px-4 border-gray-600 text-base font-bold">{allOrgans.neurology.length}</p>
                </div>

                <div className="flex items-center mb-2 h-10 text-lg">
                    <input 
                        id="musculoskeletal"
                        name="musculoskeletal"
                        type="checkbox" 
                        className="mr-2 w-5 h-5 cursor-pointer"
                        checked={createExamForm.musculoskeletal}
                        onChange={updateCreateExamForm}
                        />
                    <label htmlFor="musculoskeletal" className="cursor-pointer mr-2">Musculoskeletal</label>
                    <p className="text-blue-500 border rounded-full px-4 border-gray-600 text-base font-bold">{allOrgans.musculoskeletal.length}</p>
                </div>
            </div>
            
        </div>
    </div>
  )
}
