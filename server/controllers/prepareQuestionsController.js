import ExamQuestionModel from "../models/ExamQuestions.js";

const handlePrepareQuestions = async (req, res) => {
    const { filteredList, timed, tutor } = req.body


    if (!filteredList || !timed || !tutor) {
        return res.status(400).json({ message: 'Required to send an object with all of the question information' });
    }

    console.log('printing to console the object')
    console.log('Timed is set to:' + timed)
    console.log('Tutor is set to:' + tutor)
    console.log(filteredList)

    try {
        // const questionFound = await ExamQuestionModel.findOne({_id: questionId}).exec()

        // if (!questionFound) {
        //     return res.status(404).json({ message: 'Question not found.' });
        // }

        // await questionFound.updateOne({
        //     "subject": subject,
        //     "organSystem": organSystem,
        //     "vignette": vignette,
        //     "choices": choices,
        //     "explanations": explanations,
        //     "correctChoice": correctChoice
        // })

        res.json({ message: 'Questions successfully edited'})

    } catch (err) {
        console.error('Unable to add question:', err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export { handlePrepareQuestions }