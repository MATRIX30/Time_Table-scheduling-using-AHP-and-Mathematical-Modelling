import mongoose, { Document, Schema } from "mongoose";

export interface IPreferences extends Document {
    hoursWeekend: number,
    equilibreProgrammation: number,
    matiereMultipleProfesseurs: number,
    userId: number
}

const preferenceShema:Schema = new mongoose.Schema({
    hoursWeekend:{
        type:Number,
        require:true
    },
    equilibreProgrammation:{
        type:Number,
        require:true
    },
    matiereMultipleProfesseurs:{
        type:Number,
        require:true
    },
    userId:{
        type:Number,
        require:true
    }
});

const Preference = mongoose.model<IPreferences>("Preference",preferenceShema)

export default Preference;