const models = require("./../models/index.model.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const secretcharacter = "justfolong201"


register = async function register(req, res) {
    try {
        const { email, password } = req.body;
        console.log(email)
        console.log(password)

        // Hasher le mot de passe avec bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Création d'un nouvel utilisateur
        const user = await models.User.create({ email, password: hashedPassword });

        // Renvoyer la réponse avec le nouvel utilisateur créé
        res.status(201).json(user);
    } catch (err) {
        // Gestion des erreurs
        console.log(err)
        res.status(400).json({ message: err.message });
    }
};


login = async function login(req, res) {
    try {
        const { email, password } = req.body;

        // Récupérer l'utilisateur par email
        const user = await models.User.findOne({ email });

        // Vérifier si l'utilisateur existe
        if (!user) {
            return res.status(401).json({ message: "Identifiants invalides" });
        }

        // Vérifier le mot de passe
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Identifiants invalides" });
        }

        // Générer les tokens d'accès et de rafraîchissement
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // Renvoyer les tokens
        res.json({ accessToken, refreshToken });
    } catch (err) {
        // Gestion des erreurs
        res.status(500).json({ message: err.message });
    }
};

// Fonction pour générer un token d'accès
function generateAccessToken(user) {
    return jwt.sign({ id: user.id }, secretcharacter, { expiresIn: '15m' });
}

// Fonction pour générer un token de rafraîchissement
function generateRefreshToken(user) {
    return jwt.sign({ id: user.id }, secretcharacter);
}
me = async function me(req, res) {
    try {
        // Récupérer l'utilisateur à partir de l'ID stocké dans le token
        const user = await models.User.findById(req.user.id);

        // Renvoyer l'utilisateur
        res.json(user);
    } catch (err) {
        // Gestion des erreurs
        res.status(500).json({ message: err.message });
    }
}

logout = async function logout(req, res) {
    // suprimer la durer de vie du token
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Déconnexion réussie" });
}


module.exports = { login, register, me, logout };
