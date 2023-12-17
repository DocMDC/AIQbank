import ExamModel from "../models/Exam.js"

const handleGetExams = async (req, res) => { 
    try {
        const allExams = await ExamModel.find().exec()

        if (!allExams) {
            return res.status(401).json({ message: 'No exams in database'})
        }

        res.json({ allExams })
    } catch (err) {
        console.error('Unable to get exams:', err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export { handleGetExams }
