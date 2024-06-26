const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const preferenceSchema= new Schema({
    name:{
        type:String,
        required:false
    },
    courseOnMorning:{
        type:Number,
        required:true
    },
    courseOnEvening:{
        type:Number,
        required:true
    },
      havingDayOff:{
        type:String,
        required:true
    },
     preferredNumberOfHour:{
        type:String,
        required:true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'admin'
    }


});
module.exports = mongoose.model('AdministrationPreference',preferenceSchema);  //Employee is the collection name in the


