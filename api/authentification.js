const jwt = require("jsonwebtoken");
const User = require("./model/adminmodel")


const token ='oajsijvnsfusanjioiaoisanovisnvisojoadjvjdfiuodfnavoaifisa'

const authentification = async (req, res, next) => {
  try {
    const authToken = req.header("Authorization").replace("Bearer ", "");
    //console.log(authToken);
    const decodedToken = jwt.verify(authToken, token);
    

    let user;
    
      user = await User.findOne({
        _id: decodedToken._id,
        "authTokens.authToken": authToken,
      });
    
   

    if (!user) throw new Error();

    req.authToken = authToken; // on accède au token actuel de l'utilisateur
    req.user = user; // on stocke les infos de l'utilisateur  pour pouvoir utiliser sur une nouvelle route
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send("Veuillez vous authentifier");
  }
};

module.exports = authentification;
