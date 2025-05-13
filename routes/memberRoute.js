const express = require('express');
const router= express.Router();
const {validateMember,isLoggedIn,isOwner} = require('../middleware.js');
const Members = require('../models/memberSchma.js')
const multer = require('multer');
const storage = require('../cloud_config.js');
const upload = multer(storage);
const asycnWrap = require('../utils/asyncWrap.js');



// new member form 
router.get('/new',isLoggedIn, isOwner,(req,res)=>{
        res.render('webPage/memberForm.ejs');     
    
})

// new member creater

router.post('/create',isLoggedIn,isOwner, upload.single('members[image]'), validateMember, asycnWrap( async(req,res)=>{
    if(req.file){
        req.body.members.image = req.file.path;
    }else{
        req.body.members.image = "../images/noImage.webp";
    }
    const newMember = new Members(req.body.members);
    await newMember.save();
    req.flash('success','Successfully added new member')
    res.redirect('/');
    
}))

// member deletion
router.delete('/delete/:id',isLoggedIn, isOwner, asycnWrap( async(req, res)=>{
    const {id} = req.params;
    const data = await Members.findByIdAndDelete(id);

    req.flash('success','Successfully deleted new member');
    
    res.redirect('/');
    
}))


module.exports = router;
