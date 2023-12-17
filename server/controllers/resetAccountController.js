import ExamQuestionModel from "../models/ExamQuestions.js";
import ExamModel from "../models/Exam.js"

const handleResetAccount = async (req, res) => {
    try {
        await ExamModel.deleteMany( {documentType: 'exam'})

        await ExamQuestionModel.updateMany( {documentType: 'question'}, { $set: { used: false, hasAnswered: false, answeredCorrectly: false, flagged: false } })

        res.json({ message: 'Account successfully reset'})

    } catch (err) {
        console.error('Unable to reset account:', err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export { handleResetAccount }