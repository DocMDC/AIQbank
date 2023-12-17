import ExamQuestionModel from "../models/ExamQuestions.js";

const handleFilterQuestionsByMode = async (req, res) => {
    const {unused, incorrect } = req.body

    try {
        console.log(unused)
        const result = await ExamQuestionModel.find({ used: "false" })
        
        res.json({ questions: result })

    } catch (err) {
        console.error('Search for question type failed:', err.message)
        res.status(500).json({ message: 'Internal server error' })
    }    
}

export { handleFilterQuestionsByMode }