const express = require('express')
const router = express.Router()
const Ownermodel = require('../model/Ownerregmodel')
const hostel = require('../model/Hostelmodel')

router.post('/Ownerreg',async(req,res)=>{
    try{
        console.log(req.body)
       await Ownermodel.create(req.body) ;
       res.send("Owner details added");
    }
    catch{
        console.log(error);
    }
})

router.post('/Login', async(req,res)=>{
    try {
        const {email} = req.body
        const {password} = req.body
        let hostal = await Ownermodel.find({emal:email,password:password})
        res.json({hostal})
    } catch (error) {
        res.json({hostel:false})
    }
})

router.post('/viewBook',async(req,res)=>{
    try {
        //view booking
    } catch (error) {
        
    }
})
module.exports = router