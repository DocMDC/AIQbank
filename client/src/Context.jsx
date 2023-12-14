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
