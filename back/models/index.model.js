const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
});

const teacherPreferenceSchema = new mongoose.Schema({
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dayOffPreference: {
        type: Number,
        min: 1,
        max: 9,
        required: true
    },
    coursedayPreference: {
        type: Number,
        min: 1,
        max: 9,
        required: true
    },
    coursePeriodPreference: {
        type: Number,
        min: 1,
        max: 9,
        required: true
    },
    breakBetweenCoursesPreference: {
        type: Number,
        min: 1,
        max: 9,
        required: true
    },
    // roomPreference: {
    //     type: [mongoose.Schema.Types.ObjectId],
    //     ref: 'Room',
    //     required: true
    // }
});


const User = mongoose.model('User', userSchema);
const TeacherPreference = mongoose.model('TeacherPreference', teacherPreferenceSchema);

module.exports = {
    User,
    TeacherPreference
};
