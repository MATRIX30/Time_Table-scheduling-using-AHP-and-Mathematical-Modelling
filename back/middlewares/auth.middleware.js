const jwt = require('jsonwebtoken');
const models = require('../models/index.model');
const mongoose = require('mongoose');

// auth.middleware.js

// Importez les dépendances nécessaires

// Middleware pour vérifier l'authentification de l'utilisateur
const authMiddleware = async (req, res, next) => {
    // Récupérez le token d'authentification depuis l'en-tête de la requête
    const token = req.headers.authorization;

    // Vérifiez si le token existe
    if (!token) {
        return res.status(401).json({ message: 'Accès non autorisé. Token manquant.' });
    }

    try {
        // Vérifiez et décodez le token
        const decodedToken = jwt.verify(token, 'justfolong201');

        // Ajoutez les informations de l'utilisateur authentifié à l'objet de requête
        req.user = await models.User.findOne({ _id: mongoose.Types.ObjectId(decodedToken.userId) });
        console.log(req.user)

        // Passez au middleware suivant
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Accès non autorisé. Token invalide.' });
    }
};

// Exportez le middleware
module.exports = authMiddleware;