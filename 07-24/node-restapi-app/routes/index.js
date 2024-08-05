var express = require('express');
var router = express.Router();

//공통 기능 미들웨어 참조하기
const {checkParams, checkQuery} = require("./api/middleware.js");

//해당 라우터 파일이 호출되면 무조건 실행되는 미들웨어 함수 정의하기

router.use((req,res,next)=>{
  console.log("Index.js 라우터 파일이 호출될 때마다 실행되는 기능 구현");
  // res.send("모든 응답 반환하기");
  next();
})

router.use('/sample',(req,res,next)=>{
  console.log('Index.js 라우터 파일 미들웨어2 호출',req.originalUrl);
  next();
},(req,res,next)=>{
  console.log("Index.js 라우터 파일 미들웨어3 호출",req.method);
  res.send(req.method);
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//http://localhost:3000/test/1
//checkParams 미들웨어를 요청 이후 
router.get('/test/:id', checkParams ,async(req,res,next)=>{
  res.render('index.ejs',{title : "테스트"});
})

//http://localhost:3000/product?category=computer&stock=100
router.get("/product",checkQuery,async(req,res,next)=>{
  res.render('index.ejs',{title:"테스트2"})
})
module.exports = router;
