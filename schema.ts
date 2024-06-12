import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

export const PreferenceSchema = new Schema({
    hoursWeekend: Number,
    equilibreProgrammation: Number,
    matiereMultipleProfesseurs: Number,
    userId: Number
});
