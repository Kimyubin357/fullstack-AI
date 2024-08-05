var express = require('express');
var router = express.Router();
//moment 패키지
var moment = require('moment');

//관리자 암호를 단방향 암호화 (해쉬알고리즘) 하기 위해 bcrypt 패키지 참조하기
var bcrypt = require('bcryptjs');

//ORM db객체 참조하기
var db = require('../models/index');

//동적 SQL쿼리를 직접 작성해서 전달하기 위한 참조
var sequelize = db.sequelize;
const {QueryTypes} = sequelize;

//관리자 로그인 여부 체크 미들웨어 참조하기
const {isLoggined} = require('./sessionMiddleware')

router.get('/list', isLoggined ,async(req,res)=>{
    //관리자 목록조회 조회옵션 데이터 정의 = ViewModel
    const searchOpt = {
        company_code:"9",
        admin_id:"",
        used_yn_code:"9"
    }

    //스텝1: 전체 관리자 계정 목록 조회하기
    const admins = await db.Admin.findAll();

    //스텝2: 관리자 계정 목록 데이터 뷰파일 전달하기
    res.render('admin/list.ejs',{admins,moment,searchOpt});
})
router.post('/list', isLoggined ,async(req,res)=>{
    const company_code = req.body.company_code;
    const admin_id = req.body.admin_id;
    const use_yn_code = req.body.use_yn_code;

    //스텝 2: 조회옵션으로 관리자 정보 조회하기
    //const admins = await db.Admin.findAll({where:{admin_id:admin_id}});
    
    const searchOpt = {
        company_code:company_code,
        admin_id: admin_id,
        used_yn_code:use_yn_code
    }
    
    let query = `SELECT
        admin_member_id,
        admin_id,admin_name,
        email,
        company_code,
        dept_name,
        used_yn_code,
        reg_date
    FROM admin
    WHERE used_yn_code = 1 `;

    //회사코드 추가 필터 조건 변경
    if(company_code != 9 ){
        query += ` AND company_code = ${company_code}`;
    }

    //관리자 아이디 추가 필터 조건 반영
    if(admin_id.length > 0){
        query += ` AND admin_id Like = '%${company_code}%' `;
    }
    //관리자 아이디 추가 필터 조건 반영
    if(use_yn_code != 9){
        query += ` AND use_yn_code = ${company_code} `;
    }

    
    
    res.render('admin/list',{admins,moment,searchOpt})
})
router.get('/create', isLoggined ,async(req,res)=>{
    res.render('admin/create.ejs')
})

router.post('/create', isLoggined ,async(req,res)=>{
    
    //스텝 1: 신규 관리자 정보 추출하기
    const admin_id = req.body.admin_id;
    const admin_password = req.body.admin_password;
    const company_code = req.body.company_code;

    const dept_name = req.body.dept_name;
    const admin_name = req.body. admin_name;
    const email = req.body.email;
    const telephone = req.body.telephone;
    const use_yn_code =req.body.use_yn_code;

    //hash('사용자가 입력한 암호', 암호화 강도)
    const encryptedPassword = await bcrypt.hash(admin_password,12);

    //스텝 2: 신규 관리자 정보 DB저장 처리
    //주의 : db에 저장할 데이터 구조는 반드시 해당 모델의 속성명과 동일해야 함

    //현재 로그인한 사용자의 관리자 고유번호 추출하기 세션을 이용해서
    const loginAdminId = req.session.loginUser.admin_member_id;
    const admin = {
        company_code : company_code,
        admin_id : admin_id,
        admin_password : encryptedPassword,
        admin_name : admin_name,
        email : email,
        telephone : telephone,
        dept_name : dept_name,
        used_yn_code:use_yn_code,
        reg_date: Date.now(),
        reg_member_id: loginAdminId
    }
    //db admin 테이블에 상기 신규 데이터를 중복처리하고 실제 저장된
    // 관리자 계정 정보를 db서버가 반환한다.

    const registedAdmin = await db.Admin.create(admin);

    //스텝 3: 목록 페이지로 이동
    res.redirect('/admin/list')
})

router.post('/modify', isLoggined ,async(req,res)=>{
    //ejs에서 사용자 수정 데이터 뽑아오기
    //관리자 계정 고유번호
    const admin_member_id = req.body.admin_member_id;

    //관리자 계정
    const admin_id = req.body.admin_id;
    const admin_password = req.body.admin_password;
    const company_code = req.body.company_code;

    const dept_name = req.body.dept_name;
    const admin_name = req.body. admin_name;
    const email = req.body.email;
    const telephone = req.body.telephone;
    const use_yn_code =req.body.use_yn_code;

    //db에서 추출한 데이터 입히기
    const admin = {
        company_code,
        dept_name,
        admin_name,
        email,
        telephone,
        used_yn_code:use_yn_code,
        edit_date:Date.now(),
        edit_member_id: loginAdminId,

    }

    const updatedCnt = await db.Admin.update(admin,{where:{admin_member_id:admin_member_id}})
    
    res.redirect('/admin/list')
})

router.get('/delete', isLoggined ,async(req,res)=>{
    //스텝1 : 사용자 수정 데이터 추출하기
    const adminIdx = req.query.id;
    //스텝2 : DB에 해당 관리자 계정 수정 처리하기
    const deletedCnt = await db.Admin.destroy({where:{admin_member_id : adminIdx}});
    //스텝3 : 수정 처리후 목록페이지로 이동하기
    res.redirect('/admin/list')
})

router.post('/list', isLoggined ,async(req,res)=>{
    //스텝 1 : 조회 옵션 정보 추출하기

    //스탭 2 : 조회 옵션으로 관리자 정보 조회하기

    //스탭 3 : 조회결과 데이터 뷰에 전달하기
    res.render('admin/list')
})

router.get('/modify/:id', isLoggined ,async(req,res)=>{

    //스텝 1 : url에서 관리자 고유번호를 추출합니다.
    const adminIdx = req.params.id;
    //스텝 2 : 단일 관리자 정보를 db에서 조회해옵니다.
    const admin = await db.Admin.findOne({where:{admin_member_id : adminIdx}})
    //스텝 3 : 단일 관리자 정보를 뷰에 전달합니다.

    res.render('admin/modify',{admin})
})

module.exports = router;