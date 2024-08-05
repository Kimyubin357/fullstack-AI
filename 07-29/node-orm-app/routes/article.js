var express = require('express');
var router = express.Router();
//app.js에서 참조시 http://localhost:3000/article로 기본 주소가 설정됨

//DB프로그래밍을 위한 ORM DB객체 참조하기
var db = require('../models/index');


//게시글 전체 목록 조회 웹페이지 요청과 응답처리
router.get('/list',async(req,res)=>{
    //전체 게시글 목록 조회하기

    const articles = await db.Article.findAll();

    res.render('article/list.ejs',{articles})
})

//신규 게시글 등록 웹페이지 요청과 응답
router.get('/create',async(req,res)=>{
    res.render('article/create.ejs')
})

//신규 게시글 입력 정보 등록처리 요청과 응답
router.post('/create',async(req,res)=>{
    const title = req.body.title;
    const contents = req.body.contents;
    const display_code = req.body.display;

    //article 테이블에 등록할 json 데이터 생성하기
    const article = {
        board_type_code : 1,
        title : title,
        article_type_code : 0,
        contents : contents,
        view_count : 0,
        ip_address : '123.111.111.111',
        is_display_code : display_code,
        reg_date : Date.now(),
        reg_member_id : 1
    }

    //준비된 신규 게시글 데이터를 article테이블에 저장한다.
    const registedArticle = await db.Article.create(article);

    console.log('실제 DB article 테이블에 저장된 데이터 확인 :',registedArticle);

    res.redirect('/article/list')
})


//기존 단일게시글 수정처리 요청과 응답
router.get('/modify/:id',async(req,res)=>{
    //기존 게시글 db 수정 처리 후
    //목록페이지로 이동

    //현재 게시글 고유번호 추출한다
    const articleIdx = req.params.id;

    //해당 게시글 번호를 기준으로 단일 게시글 정보를 조회한다.
    // SELECT * FROM article WHERE article_id = 1; SQL구문이 백엔드에서 만들어져서
    //DB서버로 전송되어 실행되고 그 결과를 백엔드에서 반환받는다.

    const article = await db.Article.findOne({where:{article_id:articleIdx}});

    res.render('article/modify',{article});
})
router.post('/modify',async(req,res)=>{
    const articleIdx = req.body.article_id;
    const article = {
        title : req.body.title,
        contents : req.body.contents,
        is_display_code:  req.body.display,
        edit_date:Date.now(),
        edit_member_id:1,
    };

    //수정된 데이터 건수 결과값으로 전달됩니다.
    const updatedCnt = await db.Article.update(article,{where:{article_id:articleIdx}})
    console.log(updatedCnt);
    res.redirect('/article/list')

})
//기존 단일 게시글 삭제처리 요청과 응답
router.get('/delete',async(req,res)=>{
    //db에서 지운뒤에
    //목록페이지로 이동

    const articleIdx = req.query.id;//??왜 쿼리로 넘어오지?

    const deletedCnt = await db.Article.destroy({where:{article_id:articleIdx}});

    console.log(deletedCnt);
    
    res.redirect('/article/list')
})



module.exports = router;
