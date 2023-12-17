import ExamQuestionModel from "../models/ExamQuestions.js";
import ExamModel from "../models/Exam.js"
import UserModel from '../models/User.js'

const handleResetAccount = async (req, res) => {
    const userEmail = req.user
    console.log(userEmail)

    try {
        // Find user in database
        const user = await UserModel.findOne({ email: userEmail }).exec()

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        //Remove user exams
        //Update questions so that the used, hasAnswered, answeredCorrectly, and flagged values are set back to false

        /*
        old code:

        await ExamModel.deleteMany( {documentType: 'exam'})

        await ExamQuestionModel.updateMany( {documentType: 'question'}, { $set: { used: false, hasAnswered: false, answeredCorrectly: false, flagged: false } })

        */

        // Remove user exams
        user.exams = []

        // Reset questions to default values
        user.questions.forEach((question) => {
            question.used = false
            question.hasAnswered = false
            question.answeredCorrectly = false
            question.flagged = false
        })

        await user.save()

        res.json({ message: 'Account successfully reset'})

    } catch (err) {
        console.error('Unable to reset account:', err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export { handleResetAccount }