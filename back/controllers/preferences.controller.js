const models = require("./../models/index.model.js")

create = async function create(req, res) {
    try {
        // const { teacher, dayOffPreference, coursedayPreference, coursePeriodPreference, breakBetweenCoursesPreference } = req.body;
        const { teacher, preferredNumberOfHour, havingDayOff, courseOnEvening, courseOnMorning } = req.body;


        // Création d'une nouvelle préférence d'enseignant
        const teacherPreference = await models.TeacherPreference.create({
            teacher,
            // dayOffPreference,
            // coursedayPreference,
            // coursePeriodPreference,
            // breakBetweenCoursesPreference,
            preferredNumberOfHour,
            courseOnMorning,
            havingDayOff,
            courseOnEvening,
            courseOnEvening
            // roomPreference
        });
        console.log(teacher)

        // Renvoyer la réponse avec la nouvelle préférence créée
        res.status(201).json(teacherPreference);
    } catch (err) {
        // Gestion des erreurs
        res.status(400).json({ message: err.message });
    }
};

read = async function read(req, res) {
    try {
        // Récupération de toutes les préférences des enseignants
        const teacherPreferences = await models.TeacherPreference.find();
        // const teacherPreferences = await models.TeacherPreference.find().populate('teacher', 'email');

        // Renvoyer la réponse avec la liste des préférences
        res.status(200).json(teacherPreferences);
    } catch (err) {
        // Gestion des erreurs
        res.status(500).json({ message: err.message });
    }
};

module.exports = { create, read };
