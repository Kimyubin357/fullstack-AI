var express = require('express');
var router = express.Router();

router.get('/list',(req,res)=>{
    res.render('member/list.ejs');
})

router.get('/modify',(req,res)=>{
    res.render('member/modify.ejs');
})

router.post('/modify',(req,res)=>{
    const user = {

    }
})

router.get('/delete',(req,res)=>{
    
})



module.exports = router;
