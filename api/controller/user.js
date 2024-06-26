const PreferenceModel = require("../model/preferencesmodele");
const Admin = require("../model/adminmodel");
const { preProcessFile } = require("typescript");

// signup
async function UserSignup(req, res) {
  try {
    // Vérifier si l'email existe déjà dans la bd
    const existingUser = await Admin.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send({
        message:
          "Cette adresse e-mail est déjà utilisée. Veuillez en choisir une autre.",
      });
    }
    const admin = new Admin(req.body);
    // Vérifier si toutes les validations sont passées
    const errors = admin.validateSync();
    if (errors) {
      return res.status(400).send({ message: errors.message });
    }
    const authToken = admin.generateAuthToken();
    res.status(201).send({ admin, authToken });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}

async function UserLogin(req, res) {
    try {
      const user = await Admin.findUser(req.body.email, req.body.password);
      const authToken = Admin.generateAuthToken;
      res.send({ user, authToken });
    } catch (error) {
      if (
        error.message === "ce compte n'existe pas, veuillez créer un compte svp"
      )
        return res.status(401).send({ message: error.message });
      if (error.message === "mot de passe incorrect!")
        return res.status(401).send({ message: error.message });
      res.status(400).send({ message: error.message });
    }
  }

 const addpreference = async(req,res)=>
 {
  try
  {
const preferencesdata= new PreferenceModel({
  name:req.body.name,
  courseOnMorning: req.body.courseOnMorning,
  courseOnEvening: req.body.courseOnEvening,
  havingDayOff: req.body.havingDayOff,
  preferredNumberOfHour:req.body.preferredNumberOfHour,
  userId:req.body.userId

})
await preferencesdata.save()
res.status(200).send({
  "status":true, "message":"Your Preference has been registered"
})
  }catch(error){
  console.log(error)
  }
 }
  
const getpreference = async (req,res) => {
  console.log("ifufusufffffffffffffffffffff")
  console.log(req.query.userId)
 try{

  const userpreferences= await PreferenceModel.find({
    userId: req.params.userId
  })
  res.status(200).send({
    "preferences":userpreferences

  })
 }
 catch(error){
  console.log(error)
 }
}

const updatepreference = async(req,res)=>{
  try{
 
  }
  catch(error){
    console.log(error);
  }
}
  
  module.exports={UserSignup,UserLogin,addpreference,getpreference}