import React, {useContext} from 'react'
import {Context} from "../Context"

export default function SelectSubjects({ filteredSubjectsObj, incorrectCountValue, unusedCountValue, onSubjectSelection }) {
    const {createExamForm, updateCreateExamForm} = useContext(Context)

    const styles = {
        enabledInput: "mr-2 w-5 h-5 cursor-pointer",
        disabledInput: "mr-2 w-5 h-5 text-500",
        enabledLabelTitle: "mr-2 cursor-pointer text-xl",
        disabledLabelTitle: "mr-2 text-500 text-xl",
        enabledLabel: "mr-2 cursor-pointer text-lg",
        disabledLabel: "mr-2 text-500 text-lg",
        enabledParagraph: "text-blue-500 border rounded-full px-4 border-gray-600 text-base font-bold",
        disabledParagraph: "text-500 border rounded-full px-4 border-gray-600 text-base font-bold"
    }

  return (
    <div className="h-[500px] border-b-2 border-400 p-6">
        <div className="mb-6 flex items-center">
            {/* if the unused or incorrect modes are not selected gray out the label and input fields*/}
            <label htmlFor="allSubjects" className={((!createExamForm.incorrect && !createExamForm.unused) || (createExamForm.incorrect && !incorrectCountValue > 0) || (createExamForm.unused && !unusedCountValue > 0)) ? styles.disabledLabelTitle : styles.enabledLabelTitle }>Subjects</label>
            <input 
            id="allSubjects"
            name="allSubjects"
            type="checkbox" 
            className={((!createExamForm.incorrect && !createExamForm.unused) || (createExamForm.incorrect && !incorrectCountValue > 0) || (createExamForm.unused && !unusedCountValue > 0)) ? styles.disabledInput : styles.enabledInput }
            checked={createExamForm.allSubjects}
            onChange={updateCreateExamForm}
            disabled={((!createExamForm.incorrect && !createExamForm.unused) || (createExamForm.incorrect && !incorrectCountValue > 0) || (createExamForm.unused && !unusedCountValue > 0)) ? true : false}
            />
        </div>
        
        <div className="flex">
            <div className="w-56">
                {/* 
                
                //create an array of filteredSubjectsObj using Object.keys and then map over these to significantly reduce lines of code (8 repeated inputs with similar logic vs 1 input using map method)

                //The className logic looks complex but I'm essentially toggling enabled or disabled tailwind styling based on if the count is > 0 and if questions are available for use 
                
                */}
                {Object.keys(filteredSubjectsObj).map((subject) => (
                <div key={subject} className="flex items-center mb-2 h-10 text-lg">
                    <input 
                        id={subject}
                        name={subject}
                        type="checkbox" 
                        className={((!createExamForm.incorrect && !createExamForm.unused) || (createExamForm.incorrect && !incorrectCountValue > 0) || (createExamForm.unused && !unusedCountValue > 0) || filteredSubjectsObj[subject].length === 0) ? styles.disabledInput : styles.enabledInput}
                        checked={createExamForm[subject]}
                        onChange={(e) => {
                            updateCreateExamForm(e)
                            onSubjectSelection(subject, e.target.checked)
                        }}
                        disabled={((!createExamForm.incorrect && !createExamForm.unused) || (createExamForm.incorrect && !incorrectCountValue > 0) || (createExamForm.unused && !unusedCountValue > 0) || filteredSubjectsObj[subject].length === 0) ? true : false}
                        />
                    <label htmlFor={subject} className={((!createExamForm.incorrect && !createExamForm.unused) || (createExamForm.incorrect && !incorrectCountValue > 0) || (createExamForm.unused && !unusedCountValue > 0) || filteredSubjectsObj[subject].length === 0) ? styles.disabledLabel : styles.enabledLabel}>
                        {subject}
                    </label>
                    
                    <p className={((!createExamForm.incorrect && !createExamForm.unused) || (createExamForm.incorrect && !incorrectCountValue > 0) || (createExamForm.unused && !unusedCountValue > 0) || filteredSubjectsObj[subject].length === 0) ? styles.disabledParagraph : styles.enabledParagraph}>
                        {filteredSubjectsObj[subject].length}
                    </p>
                </div>
                ))}
            </div>
        </div>
    </div>
  )
}

/*
import React, {useContext} from 'react'
import {Context} from "../Context"

export default function SelectSubjects({ filteredSubjectsObj, incorrectCountValue, unusedCountValue }) {
    const {createExamForm, updateCreateExamForm} = useContext(Context)

    const styles = {
        enabledInput: "mr-2 w-5 h-5 cursor-pointer",
        disabledInput: "mr-2 w-5 h-5 text-500",
        enabledLabelTitle: "mr-2 cursor-pointer text-xl",
        disabledLabelTitle: "mr-2 text-500 text-xl",
        enabledLabel: "mr-2 cursor-pointer text-lg",
        disabledLabel: "mr-2 text-500 text-lg",
        enabledParagraph: "text-blue-500 border rounded-full px-4 border-gray-600 text-base font-bold",
        disabledParagraph: "text-500 border rounded-full px-4 border-gray-600 text-base font-bold"
      }

    const anatomyCount = filteredSubjectsObj.anatomy.length
    const microbiologyCount = filteredSubjectsObj.microbiology.length
    const biochemistryCount = filteredSubjectsObj.biochemistry.length
    const embryologyCount = filteredSubjectsObj.embryology.length
    const immunologyCount = filteredSubjectsObj.immunology.length
    const pathologyCount = filteredSubjectsObj.pathology.length
    const physiologyCount = filteredSubjectsObj.physiology.length
    const pharmacologyCount = filteredSubjectsObj.pharmacology.length

  return (
    <div className="h-72 border-b-2 border-400 p-6">
        <div className="mb-6 flex items-center">

            <label htmlFor="allSubjects" className={((!createExamForm.incorrect && !createExamForm.unused) || (createExamForm.incorrect && !incorrectCountValue > 0) || (createExamForm.unused && !unusedCountValue > 0)) ? styles.disabledLabelTitle : styles.enabledLabelTitle }>Subjects</label>
            <input 
            id="allSubjects"
            name="allSubjects"
            type="checkbox" 
            className={((!createExamForm.incorrect && !createExamForm.unused) || (createExamForm.incorrect && !incorrectCountValue > 0) || (createExamForm.unused && !unusedCountValue > 0)) ? styles.disabledInput : styles.enabledInput }
            checked={createExamForm.allSubjects}
            onChange={updateCreateExamForm}
            disabled={((!createExamForm.incorrect && !createExamForm.unused) || (createExamForm.incorrect && !incorrectCountValue > 0) || (createExamForm.unused && !unusedCountValue > 0)) ? true : false}
            />
        </div>
        
        <div className="flex">
            <div className="w-48 mr-10">

                <div className="flex items-center mb-2 h-10 text-lg">
                    <input 
                        id="anatomy"
                        name="anatomy"
                        type="checkbox" 
                        className={((!createExamForm.incorrect && !createExamForm.unused) || (createExamForm.incorrect && !incorrectCountValue > 0) || (createExamForm.unused && !unusedCountValue > 0) || anatomyCount === 0) ? styles.disabledInput : styles.enabledInput}
                        checked={createExamForm.anatomy}
                        onChange={updateCreateExamForm}
                        disabled={((!createExamForm.incorrect && !createExamForm.unused) || (createExamForm.incorrect && !incorrectCountValue > 0) || (createExamForm.unused && !unusedCountValue > 0) || anatomyCount === 0) ? true : false}
                        />
                    <label htmlFor="anatomy" className={((!createExamForm.incorrect && !createExamForm.unused) || (createExamForm.incorrect && !incorrectCountValue > 0) || (createExamForm.unused && !unusedCountValue > 0) || anatomyCount === 0) ? styles.disabledLabel : styles.enabledLabel}>Anatomy</label>
                    <p className={((!createExamForm.incorrect && !createExamForm.unused) || (createExamForm.incorrect && !incorrectCountValue > 0) || (createExamForm.unused && !unusedCountValue > 0) || anatomyCount === 0) ? styles.disabledParagraph : styles.enabledParagraph}>{filteredSubjectsObj.anatomy.length}</p>
                </div>
                
                <div className="flex items-center mb-2 h-10 text-lg">
                    <input 
                        id="microbiology"
                        name="microbiology"
                        type="checkbox" 
                        className={((!createExamForm.incorrect && !createExamForm.unused) || (createExamForm.incorrect && !incorrectCountValue > 0) || (createExamForm.unused && !unusedCountValue > 0) || microbiologyCount === 0) ? styles.disabledInput : styles.enabledInput}
                        checked={createExamForm.microbiology}
                        onChange={updateCreateExamForm}
                        disabled={((!createExamForm.incorrect && !createExamForm.unused) || (createExamForm.incorrect && !incorrectCountValue > 0) || (createExamForm.unused && !unusedCountValue > 0) || microbiologyCount === 0) ? true : false}
                    />
                    <label htmlFor="microbiology" className={((!createExamForm.incorrect && !createExamForm.unused) || (createExamForm.incorrect && !incorrectCountValue > 0) || (createExamForm.unused && !unusedCountValue > 0) || microbiologyCount === 0) ? styles.disabledLabel : styles.enabledLabel}>Microbiology</label>
                    <p className={((!createExamForm.incorrect && !createExamForm.unused) || (createExamForm.incorrect && !incorrectCountValue > 0) || (createExamForm.unused && !unusedCountValue > 0) || microbiologyCount === 0) ? styles.disabledParagraph : styles.enabledParagraph}>{filteredSubjectsObj.microbiology.length}</p>
                </div>

                <div className="flex items-center mb-2 h-10 text-lg">
                    <input 
                        id="biochemistry"
                        name="biochemistry"
                        type="checkbox" 
                        className={((!createExamForm.incorrect && !createExamForm.unused) || (createExamForm.incorrect && !incorrectCountValue > 0) || (createExamForm.unused && !unusedCountValue > 0) || biochemistryCount === 0) ? styles.disabledInput : styles.enabledInput}
                        checked={createExamForm.biochemistry}
                        onChange={updateCreateExamForm}
                        disabled={((!createExamForm.incorrect && !createExamForm.unused) || (createExamForm.incorrect && !incorrectCountValue > 0) || (createExamForm.unused && !unusedCountValue > 0) || biochemistryCount === 0) ? true : false}
                    />
                    <label htmlFor="biochemistry" className={((!createExamForm.incorrect && !createExamForm.unused) || (createExamForm.incorrect && !incorrectCountValue > 0) || (createExamForm.unused && !unusedCountValue > 0) || biochemistryCount === 0) ? styles.disabledLabel : styles.enabledLabel}>Biochemistry</label>
                    <p className={((!createExamForm.incorrect && !createExamForm.unused) || (createExamForm.incorrect && !incorrectCountValue > 0) || (createExamForm.unused && !unusedCountValue > 0) || biochemistryCount === 0) ? styles.disabledParagraph : styles.enabledParagraph}>{filteredSubjectsObj.biochemistry.length}</p>
                </div>

                <div className="flex items-center mb-2 h-10 text-lg">
                    <input 
                        id="embryology"
                        name="embryology"
                        type="checkbox" 
                        className={((!createExamForm.incorrect && !createExamForm.unused) || (createExamForm.incorrect && !incorrectCountValue > 0) || (createExamForm.unused && !unusedCountValue > 0) || embryologyCount === 0) ? styles.disabledInput : styles.enabledInput}
                        checked={createExamForm.embryology}
                        onChange={updateCreateExamForm}
                        disabled={((!createExamForm.incorrect && !createExamForm.unused) || (createExamForm.incorrect && !incorrectCountValue > 0) || (createExamForm.unused && !unusedCountValue > 0) || embryologyCount === 0) ? true : false}
                    />
                    <label htmlFor="embryology" className={((!createExamForm.incorrect && !createExamForm.unused) || (createExamForm.incorrect && !incorrectCountValue > 0) || (createExamForm.unused && !unusedCountValue > 0) || embryologyCount === 0) ? styles.disabledLabel : styles.enabledLabel}>Embryology</label>
                    <p className={((!createExamForm.incorrect && !createExamForm.unused) || (createExamForm.incorrect && !incorrectCountValue > 0) || (createExamForm.unused && !unusedCountValue > 0) || embryologyCount === 0) ? styles.disabledParagraph : styles.enabledParagraph}>{filteredSubjectsObj.embryology.length}</p>
                </div>
            </div>

            <div>
                <div className="flex items-center mb-2 h-10 text-lg">
                    <input 
                        id="immunology"
                        name="immunology"
                        type="checkbox" 
                        className={((!createExamForm.incorrect && !createExamForm.unused) || (createExamForm.incorrect && !incorrectCountValue > 0) || (createExamForm.unused && !unusedCountValue > 0) || immunologyCount === 0) ? styles.disabledInput : styles.enabledInput}
                        checked={createExamForm.immunology}
                        onChange={updateCreateExamForm}
                        disabled={((!createExamForm.incorrect && !createExamForm.unused) || (createExamForm.incorrect && !incorrectCountValue > 0) || (createExamForm.unused && !unusedCountValue > 0) || immunologyCount === 0) ? true : false}
                    />
                    <label htmlFor="immunology" className={((!createExamForm.incorrect && !createExamForm.unused) || (createExamForm.incorrect && !incorrectCountValue > 0) || (createExamForm.unused && !unusedCountValue > 0) || immunologyCount === 0) ? styles.disabledLabel : styles.enabledLabel}>Immunology</label>
                    <p className={((!createExamForm.incorrect && !createExamForm.unused) || (createExamForm.incorrect && !incorrectCountValue > 0) || (createExamForm.unused && !unusedCountValue > 0) || immunologyCount === 0) ? styles.disabledParagraph : styles.enabledParagraph}>{filteredSubjectsObj.immunology.length}</p>
                </div>

                <div className="flex items-center mb-2 h-10 text-lg">
                    <input 
                        id="pathology"
                        name="pathology"
                        type="checkbox" 
                        className={((!createExamForm.incorrect && !createExamForm.unused) || (createExamForm.incorrect && !incorrectCountValue > 0) || (createExamForm.unused && !unusedCountValue > 0) || pathologyCount === 0) ? styles.disabledInput : styles.enabledInput}
                        checked={createExamForm.pathology}
                        onChange={updateCreateExamForm}
                        disabled={((!createExamForm.incorrect && !createExamForm.unused) || (createExamForm.incorrect && !incorrectCountValue > 0) || (createExamForm.unused && !unusedCountValue > 0) || pathologyCount === 0) ? true : false}
                    />
                    <label htmlFor="pathology" className={((!createExamForm.incorrect && !createExamForm.unused) || (createExamForm.incorrect && !incorrectCountValue > 0) || (createExamForm.unused && !unusedCountValue > 0) || pathologyCount === 0) ? styles.disabledLabel : styles.enabledLabel}>Pathology</label>
                    <p className={((!createExamForm.incorrect && !createExamForm.unused) || (createExamForm.incorrect && !incorrectCountValue > 0) || (createExamForm.unused && !unusedCountValue > 0) || pathologyCount === 0) ? styles.disabledParagraph : styles.enabledParagraph}>{filteredSubjectsObj.pathology.length}</p>
                </div>

                <div className="flex items-center mb-2 h-10 text-lg">
                    <input 
                        id="physiology"
                        name="physiology"
                        type="checkbox" 
                        className={((!createExamForm.incorrect && !createExamForm.unused) || (createExamForm.incorrect && !incorrectCountValue > 0) || (createExamForm.unused && !unusedCountValue > 0) || physiologyCount === 0) ? styles.disabledInput : styles.enabledInput}
                        checked={createExamForm.physiology}
                        onChange={updateCreateExamForm}
                        disabled={((!createExamForm.incorrect && !createExamForm.unused) || (createExamForm.incorrect && !incorrectCountValue > 0) || (createExamForm.unused && !unusedCountValue > 0) || physiologyCount === 0) ? true : false}
                    />
                    <label htmlFor="physiology" className={((!createExamForm.incorrect && !createExamForm.unused) || (createExamForm.incorrect && !incorrectCountValue > 0) || (createExamForm.unused && !unusedCountValue > 0) || physiologyCount === 0) ? styles.disabledLabel : styles.enabledLabel}>Physiology</label>
                    <p className={((!createExamForm.incorrect && !createExamForm.unused) || (createExamForm.incorrect && !incorrectCountValue > 0) || (createExamForm.unused && !unusedCountValue > 0) || physiologyCount === 0) ? styles.disabledParagraph : styles.enabledParagraph}>{filteredSubjectsObj.physiology.length}</p>
                </div>

                <div className="flex items-center mb-2 h-10 text-lg">
                    <input 
                        id="pharmacology"
                        name="pharmacology"
                        type="checkbox" 
                        className={((!createExamForm.incorrect && !createExamForm.unused) || (createExamForm.incorrect && !incorrectCountValue > 0) || (createExamForm.unused && !unusedCountValue > 0) || pharmacologyCount === 0) ? styles.disabledInput : styles.enabledInput}
                        checked={createExamForm.pharmacology}
                        onChange={updateCreateExamForm}
                        disabled={((!createExamForm.incorrect && !createExamForm.unused) || (createExamForm.incorrect && !incorrectCountValue > 0) || (createExamForm.unused && !unusedCountValue > 0) || pharmacologyCount === 0) ? true : false}
                    />
                    <label htmlFor="pharmacology" className={((!createExamForm.incorrect && !createExamForm.unused) || (createExamForm.incorrect && !incorrectCountValue > 0) || (createExamForm.unused && !unusedCountValue > 0) || pharmacologyCount === 0) ? styles.disabledLabel : styles.enabledLabel}>Pharmacology</label>
                    <p className={((!createExamForm.incorrect && !createExamForm.unused) || (createExamForm.incorrect && !incorrectCountValue > 0) || (createExamForm.unused && !unusedCountValue > 0) || pharmacologyCount === 0) ? styles.disabledParagraph : styles.enabledParagraph}>{filteredSubjectsObj.pharmacology.length}</p>
                </div>
            </div>
            
        </div>
    </div>
  )
}
 */