var express = require('express');
var router = express.Router();

router.get('/list',(req,res)=>{
    res.render('message/list.ejs')
})


module.exports = router;