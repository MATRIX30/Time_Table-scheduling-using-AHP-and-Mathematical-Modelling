const express = require('express');
var mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
var Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");

const token ='oajsijvnsfusanjioiaoisanovisnvisojoadjvjdfiuodfnavoaifisa'

const userSchema = new mongoose.Schema({
    nom: {
      type: String,
      required: true,
    },
    email: {
      type: String,
       required: true,
     
    },
    password: {
      type: String,
      required: true,
    },
    tel: {
        type: String,
        required: true,
      },
  
    authTokens: [
      {
        authToken: {
          type: String,
          required: true,
        },
      },
    ],
  });
  
  // fonction pour générer un token
  userSchema.methods.generateAuthToken = async function () {
    const authToken = jwt.sign(
      { _id: this._id.toString()},
      token
    );
    //envoi du tokens de l'utilisateur dans le tableau de token
    this.authTokens.push({ authToken});
    await this.save();
    return authToken;
  };
  
  // verification des informations de connexion
  userSchema.statics.findUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user)
      throw new Error("ce compte n'existe pas, veuillez créer un compte svp");
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) throw new Error("mot de passe incorrect!");
    return user;
  };
  
  //hasher le mdp avant de sauvegarder
  
  userSchema.pre('save', async function(){
    if( this.isModified('password')) this.password= await bcrypt.hash(this.password,8);
  
  });
  
  const User = new mongoose.model("admin", userSchema);
  
  module.exports = User;
  