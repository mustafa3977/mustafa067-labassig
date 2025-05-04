import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    questionNumber: Number,
    questionText: String,
    rating: {
        type: String,
        enum: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'],
        required: true
    }
});

const facultySchema = new mongoose.Schema({
    facultyName: { type: String, required: true },
    questions: [questionSchema],
    comments: { type: String }
}, { timestamps: true });

const FacultyFeedback = mongoose.model('FacultyFeedback', facultySchema);
export default FacultyFeedback;