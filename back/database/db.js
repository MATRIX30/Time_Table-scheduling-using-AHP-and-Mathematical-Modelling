const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://user-app2:1234567890@cluster0.fwcs94e.mongodb.net/?retryWrites=true&w=majority';


mongoose.connect(connectionString, )
    .then(() => {
        console.log('Connexion à la base de données MongoDB réussie');
    })
    .catch((err) => {
        console.error('Erreur lors de la connexion à la base de données MongoDB:', err);
    });

module.exports = mongoose;