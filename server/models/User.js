import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    roles: {
        User: Number,
        Teacher: Number,
        Admin: Number,
        Architect: Number
    }, 
    password: {
        type: String,
        required: true
    },
    refreshToken: String
});

export default mongoose.model('User', userSchema);