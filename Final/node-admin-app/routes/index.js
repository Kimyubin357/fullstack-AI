
//index.js 라우터의 용도는 전체 웹사이트의 공통 기능에 대한 라우팅 기능을 제공합니다.
//기본접속주소는 http://localhost:5001로 접근하게 app.js에서 설정되어 있어요.

var express = require('express');
var router = express.Router();

var bcrypt = require('bcryptjs');

var db = require('../models/index')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//관리자 웹사이트 로그인 웹페이지 요청과 응답처리 라우팅 메소드
//로그인 페이지 이동
router.get('/login', async(req,res, next)=>{

  let resultMsg = {
    code : 400,
    msg : ""
  }

  res.render('login.ejs',{layout : false , resultMsg});
});

//관리자가 입력한 아이디/암호를 추출하여 실제 로그인 프로세스를 처리하는 라우팅 메소드

router.post('/login',async(req,res)=>{
  //아이디/암호가 일치하지 않은 경우 다시 로그인 뷰를 전달하고
  //로그인 뷰에 결과메시지 데이터를 전달합니다.

  let resultMsg = {
    code : 400,
    msg : ""
  }


  //스텝1: 관리자 아아디/암호를 추출한다.
  const admin_id = req.body.admin_id;
  const admin_password = req.body.admin_password;


  //스텝2: 동일한 관리자 아이디 정보를 조회합니다.
  const admin = await db.Admin.findOne({
    where:{admin_id:admin_id}});

  //Step3: DB저장 암호와 관리자 입력 암호를 체크합니다.
  //동일한 아이디가 존재한경우
  if(admin){

    //db저장된 암호와 관리자가 로그인화면에서 입력한 암호가 일치하는지 체크
    if(bcrypt.compare(admin_password,admin.admin_password)){//bcrypt.compare('로그인화면에서 전달된 암호', db에 저장된 암호화된 문자열) 메소드는 불리안을 반환
      //Step4: 아이디 /암호가 일치하면 메인페이지로 이동시키고
      var sessionLoginData = {
        admin_member_id : admin.admin_member_id,
        company_code : admin.company_code,
        admin_id : admin.admin_id,
        admin_name : admin.admin_name,
      }
      req.session.loginUser = sessionLoginData;
      req.session.isLogined = true;
      req.session.save(()=>{
        console.log("세션에 저장완료")
        res.redirect('/main')
      })
     
    }else{
      //암호가 일치하지 않은경우 
      resultMsg.code = 402;
      resultMsg.msg = "암호가 일치하지 않습니다."
      res.render('login.ejs',{layout:false,resultMsg});
    }

  }else{
    //동일한 아이디가 없는경우 
    resultMsg.code = 401;
    resultMsg.msg = "동일한 아이디가 존재하지 않습니다."
    res.render('login.ejs',{layout:false,resultMsg});
  }
});

//메인 페이지 이동
router.get('/main', async(req,res)=>{
  res.render('main.ejs')
})

module.exports = router;