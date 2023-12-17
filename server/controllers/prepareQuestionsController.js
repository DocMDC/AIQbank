import ExamQuestionModel from "../models/ExamQuestions.js";
import ExamModel from "../models/Exam.js"

const handlePrepareQuestions = async (req, res) => {
    const { filteredList, timed, tutor } = req.body
    

    if (filteredList[0].choices.length <=0 || timed === null || tutor === null) {
        return res.status(400).json({ message: 'Required to send an object with all of the question information' });
    }

    try {
        // Use Promise.all to wait for all asynchronous operations to complete
        await Promise.all(filteredList.map(async (question) => {
            const questionFound = await ExamQuestionModel.findOne({ _id: question._id });
    
            if (!questionFound) {
                return res.status(404).json({ message: 'Question not found.' });
            }
    
            // Update the used value to true
            await questionFound.updateOne({
                used: true,
            })
        }))

        //Generate a unique exam
        await ExamModel.create({
            "mode": {
                "timed": timed,
                "tutor": tutor,
            },
            "numberOfQuestions": filteredList.length,
            "listOfQuestions": filteredList
        })
    
        res.json({ message: 'Questions successfully edited' });

    } catch (err) {
        console.error('Unable to add question:', err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export { handlePrepareQuestions }