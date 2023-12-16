import ExamQuestionModel from "../models/ExamQuestions.js";

const handleFilterQuestions = async (req, res) => {
    try {
        const unusedQuestions = await ExamQuestionModel.find({ used: "false"})

        const incorrectQuestions = await ExamQuestionModel.find({ used: "true", answeredCorrectly: "false" })

        // const flaggedQuestions = await ExamQuestionModel.find({ used: "true", flagged: "true" })


        const anatomyQuestions = await ExamQuestionModel.find({ subject: "anatomy" })
        const microbiologyQuestions = await ExamQuestionModel.find({ subject: "microbiology" })
        const biochemistryQuestions = await ExamQuestionModel.find({ subject: "biochemistry" })
        const embryologyQuestions = await ExamQuestionModel.find({ subject: "embryology" })
        const immunologyQuestions = await ExamQuestionModel.find({ subject: "immunology" })
        const pathologyQuestions = await ExamQuestionModel.find({ subject: "pathology" })
        const physiologyQuestions = await ExamQuestionModel.find({ subject: "physiology" })
        const pharmacologyQuestions = await ExamQuestionModel.find({ subject: "pharmacology" })

        const cardiologyQuestions = await ExamQuestionModel.find({ organSystem: "cardiology" })
        const dermatologyQuestions = await ExamQuestionModel.find({ organSystem: "dermatology" })
        const endocrinologyQuestions = await ExamQuestionModel.find({ organSystem: "endocrinology" })
        const reproductionQuestions = await ExamQuestionModel.find({ organSystem: "reproduction" })
        const gastroenterologyQuestions = await ExamQuestionModel.find({ organSystem: "gastroenterology" })
        const hematologyQuestions = await ExamQuestionModel.find({ organSystem: "hematology" })
        const neurologyQuestions = await ExamQuestionModel.find({ organSystem: "neurology" })
        const musculoskeletalQuestions = await ExamQuestionModel.find({ organSystem: "musculoskeletal" })

        const allSubjectsQuestions = {
            anatomy: anatomyQuestions,
            microbiology: microbiologyQuestions,
            biochemistry: biochemistryQuestions,
            embryology: embryologyQuestions,
            immunology: immunologyQuestions,
            pathology: pathologyQuestions,
            physiology: physiologyQuestions,
            pharmacology: pharmacologyQuestions
        }

        const allOrganSystemsQuestions = {
            cardiology: cardiologyQuestions,
            dermatology: dermatologyQuestions,
            endocrinology: endocrinologyQuestions,
            reproduction: reproductionQuestions,
            gastroenterology: gastroenterologyQuestions,
            hematology: hematologyQuestions,
            neurology: neurologyQuestions,
            musculoskeletal: musculoskeletalQuestions
        }

        

        res.json({ allSubjectsQuestions, allOrganSystemsQuestions, unusedQuestions, incorrectQuestions })

    } catch (err) {
        console.error('Search for question type failed:', err.message);
        res.status(500).json({ message: 'Internal server error' });
    }    
}

export { handleFilterQuestions }