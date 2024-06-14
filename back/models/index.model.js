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

    courseOnMorning: {
        type: Number,
        min: 1,
        max: 9,
        required: true
    },
    courseOnEvening: {
        type: Number,
        min: 1,
        max: 9,
        required: true
    },
    havingDayOff: {
        type: Number,
        min: 1,
        max: 7,
        required: true
    },
    preferredNumberOfHour: {
        type: Number,
        min: 0,
        max: 15,
        required: true,
        validate: {
            validator: function (value) {
                return value % 3 === 0;
            },
            message: props => `${props.value} n'est pas un multiple de 3`
        }
    }
});


const User = mongoose.model('Teacher', userSchema);
const TeacherPreference = mongoose.model('TeacherPreference', teacherPreferenceSchema);

module.exports = {
    User,
    TeacherPreference
};
