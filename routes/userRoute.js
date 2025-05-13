const express = require('express');
const router= express.Router();
const { isLoggedIn, saveRedirectUrl} = require('../middleware.js');
const User = require('../models/userSchema.js');
const { route } = require('./memberRoute.js');
const passport = require('passport');
const asycnWrap = require('../utils/asyncWrap.js');
const asyncWrap = require('../utils/asyncWrap.js');


router.get('/signUpForm', (req,res)=>{
    res.render('webPage/signup.ejs');
})

router.post('/signup', asycnWrap(async (req,res)=>{
    let{username, email,password} = req.body;
    const newUser= new User({email,username});
    
    const registeredUser = await User.register(newUser,password);
    req.login(registeredUser,(err)=>{
        if(err) return next;
        else{
            req.flash('success',`@${username} thankyou for registration`);
    
            res.redirect('/');
        }
    })
    
}))

router.get('/signInForm',   (req,res)=>{
    res.render('webPage/signin.ejs');
})


router.post('/signin', saveRedirectUrl, passport.authenticate('local',{failureRedirect:'/user/signInForm', failureFlash: true}), asyncWrap( async(req,res)=>{
    req.flash('success','Welcome back to Binary club');
   if(res.locals.redirectUrl){
    res.redirect(res.locals.redirectUrl)
   }else{
    res.redirect('/');
   }
    
}));

router.get('/signout', isLoggedIn, (req,res, next)=>{
    req.logout((err)=>{
        if(err){
            return next(err)
        }
        req.flash('success','you are signout');
        res.redirect('/');
    })
    
})


module.exports = router;