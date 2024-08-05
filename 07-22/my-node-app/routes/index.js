//express 객체 참조하기
var express = require('express');
var router = express.Router();

/* 메인 웹페이지 요청과 응답처리 라우팅 메소드 */
router.get('/', function(req, res, next) {
  //서버에서 사용자 웹브라우저로 응답결과물을 반환합니다.
  //지정된 뷰파일내 웹페이지가 반환됩니다.
  res.render('index', { title: '김유빈' });
});

//회원가입 웹페이지 요청과 응답처리 라우팅 메소드 구현하기

router.get('/entry',(req,res)=>{
  res.render('entry.ejs')
});


//로그인 웹페이지 요청과 응답처리 라우팅 메소드 구현하기

router.get('/login',(req,res)=>{
  res.render('login.ejs')
});





module.exports = router;
