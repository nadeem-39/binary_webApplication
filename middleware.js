const express = require('express');
const app = express();
const {memberSchemaValidateFunct, eventSchemaValidateFunct} = require('./schemaValidation/schemaValidateFile.js');
const ExpressError = require('./utils/ExpressError.js');
const flash = require('connect-flash');

app.use(flash());
//validate function members
module.exports.validateMember = (req ,res, next)=>{
    let  {error} = memberSchemaValidateFunct.validate(req.body);
    if(error){
     throw new ExpressError(error);
    }
    next();
 
 }


 //validate function enent

 module.exports.validateEvent = (req, res, next)=>{
    let {error} = eventSchemaValidateFunct.validate(req.body);
    if(error){
        throw new ExpressError(error);
    }
    next();
 }

 module.exports.isLoggedIn = (req, res, next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash('error','You need to sign in first');
        res.redirect('/user/signInForm');
    }else{
        next();
    }
 }

 module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl
    }
    next();
 }

 module.exports.isOwner = (req,res,next)=>{
    if(req.user.username !="binaryclub"){
        req.flash('error','You are not the owner');
        return res.redirect('/');
    }
    next();
    
 }