import React, {useState} from "react"

const Context = React.createContext()

function ContextProvider({children}) {

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
        gastroenterology: false,
        hematology: false,
        neurology: false,
        musculoskeletal: false,
        numberOfQuestions: 0
      })
    
    function updateCreateExamForm(event) {
      const { name, value, type, checked } = event.target;
    
      setCreateExamForm((prevData) => {
        return {
          ...prevData,
          [name]: type === "checkbox" ? checked : value,
        }
      })
    }

      
    

    return (
        <Context.Provider value={{
            createExamForm,
            setCreateExamForm,
            updateCreateExamForm
        }}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}
