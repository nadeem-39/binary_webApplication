const express = require('express');
const router = express.Router();
const Events = require('../models/eventSchema.js');
const {validateEvent,isLoggedIn,isOwner} = require('../middleware.js');
const { valid } = require('joi');
const multer = require('multer');
const storage = require('../cloud_config.js');
const upload = multer(storage);
const asycnWrap = require('../utils/asyncWrap.js');



//new form render for event
router.get('/new',isLoggedIn,isOwner,(req,res)=>{
    res.render('webPage/eventForm.ejs');
})

//creating new event
router.post('/create',isLoggedIn, isOwner,upload.single('events[image]'), validateEvent ,asycnWrap(async(req, res)=>{
    if(req.file){
        req.body.events.image = req.file.path;
    }else{
        req.body.events.image = "../images/noImage.webp";
    }
        const newEvent = new Events(req.body.events);
        const eventData = await newEvent.save();
        req.flash('success','Event successfully added');
        res.redirect(`/event/${newEvent.type}`);
    
    
}));

//similar event data
router.get('/show/:_id', asycnWrap(async(req,res)=>{
    const {_id} = req.params;
    const currEvent = await Events.findById(_id);
    if(!currEvent){
        req.flash('error','Event no longer exist')
        res.redirect('/')
    }else res.render('webPage/singleEventShow.ejs',{currEvent});
}))

// delete event
router.delete('/delete/:id',isLoggedIn , isOwner, asycnWrap( async (req, res)=>{
        const {id} = req.params;
        let data  = await Events.findById(id);
        if(!data){
            req.flash('error','Event no longer exist')
            res.redirect('/')
        }else{
            await Events.findByIdAndDelete(id);
            req.flash('success','Event successfully deleted');
            res.redirect(`/event/${data.type}`);
        }
    
    
}));

//render edit form of event

router.get('/editForm/:id',isLoggedIn,isOwner, asycnWrap( async (req, res)=>{
    let {id} = req.params;
    let currEvent = await Events.findById(id);
    if(!currEvent){
        req.flash('error','Event no longer exist')
        res.redirect('/')
    }else res.render('webPage/editEvent.ejs',{currEvent});
    
}))



router.put('/edit/:id', isLoggedIn, isOwner, upload.single('events[image]'),validateEvent, asycnWrap(async(req, res)=>{
    let {id} = req.params;
    let {events} = req.body;
    if(req.file){
        events.image = req.file.path;
    }else{
        events.image = "../images/noImage.webp";
    }

    await Events.findByIdAndUpdate(id,{...events});
    req.flash('success','Event successfylly edited');
    res.redirect(`/event/show/${id}`);
    
}))

router.get('/:type', asycnWrap( async(req,res)=>{
    const type = req.params.type;
    let similarEvents = await Events.find({type:type});
    res.render('webPage/eventsShow.ejs',{similarEvents,type});
}));


module.exports = router;
