var express = require('express');
var router = express.Router();

router.get('/list',(req,res)=>{
    res.render('channel/list.ejs')
})

module.exports = router;