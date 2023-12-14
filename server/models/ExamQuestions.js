import mongoose from 'mongoose';
const { Schema } = mongoose;

const examQuestionSchema = new Schema({
    subject: {
        type: String,
        required: true,
    },
    organSystem: {
        type: String,
        required: true,
    },
    vignette: {
        type: String,
        required: true
    },
    choices: {
        type: [String],
        required: true
    }, 
    explanations: {
        type: [String],
        required: true
    },
    correctChoice: {
        type: Number,
        required: true
    }
});

export default mongoose.model('ExamQuestion', examQuestionSchema);