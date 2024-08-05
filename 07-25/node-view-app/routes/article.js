//article.js 라우터 파일은
// 게시글 관련 각종 웹페이지들에 대한 요청과 응답을 처리한다.
//본 라우터 파일의 기본 호출주소: http://localhost:3000/article 로 시작하게
//app.js에서 라우터 파일 참조시 기본 주소를 설정해준다.

var express = require('express');

var router = express.Router();

/*
-게시글 목록 웹페이지 요청과 응답처리 라우팅 메소드 구현
-호출주소 : http://localhost:3000/article/list
-호출방식 : get

*/

router.get('/list',async(req,res)=>{
    const articles = [
        {
            article_id: 1,
            title: "게시글 제목 1입니다.",
            contents : "게시글1 내용입니다.",
            display  : 1,
            view_cnt : 10,
            ip_address : "111.111.111.111",
            regist_id : 1,
            regist_date : Date.now()
        },
        {
            article_id: 2,
            title: "게시글 제목 2입니다.",
            contents : "게시글2 내용입니다.",
            display  : 0,
            view_cnt : 99,
            ip_address : "111.111.111.111",
            regist_id : 2,
            regist_date : Date.now()
        },
        {
            article_id: 3,
            title: "게시글 제목 3입니다.",
            contents : "게시글3 내용입니다.",
            display  : 1,
            view_cnt : 15,
            ip_address : "111.333.111.111",
            regist_id : 3,
            regist_date : Date.now()
        }
    
    ]
    res.render('article/list.ejs',{articles : articles}); //{속성명 : 넣어줄 데이터}
});

router.get('/create',async(req,res)=>{
    res.render('article/create.ejs');
})

router.post('/create',(req,res)=>{
    const article ={
        title : req.body.title,
        contents : req.body.contents,
        display : req.body.display,
        ip_address : "111.111.111.111",
        view_cnt : 0,
        regist_id : 1,
        regist_date : Date.now()
    }
    const registedArticle = {
        title : req.body.title,
        contents : req.body.contents,
        display : req.body.display,
        ip_address : "111.111.111.111",
        view_cnt : 0,
        regist_id : 1,
        regist_date : Date.now()
    }
    console.log(registedArticle);
    res.redirect('/article/list');

})

router.get('/modify/:idx',async(req,res)=>{
    const articleIdx = req.params.idx;
    
    const articles = [
        {
            article_id: 1,
            title: "게시글 제목 1입니다.",
            contents : "게시글1 내용입니다.",
            display  : 1,
            view_cnt : 10,
            ip_address : "111.111.111.111",
            regist_id : 1,
            regist_date : Date.now()
        },
        {
            article_id: 2,
            title: "게시글 제목 2입니다.",
            contents : "게시글2 내용입니다.",
            display  : 0,
            view_cnt : 99,
            ip_address : "111.111.111.111",
            regist_id : 2,
            regist_date : Date.now()
        },
        {
            article_id: 3,
            title: "게시글 제목 3입니다.",
            contents : "게시글3 내용입니다.",
            display  : 1,
            view_cnt : 15,
            ip_address : "111.333.111.111",
            regist_id : 3,
            regist_date : Date.now()
        }
    ]
    for(let i=0; i < articles.length ; i++){
        console.log("받은 idx:",articleIdx);
        console.log("게시물 for문 번호",i);
        
        if(articleIdx-1 == i){
            console.log("ok");
            const article = articles[i];
            res.render('article/modify.ejs',{article});
            console.log("렌더 됨ㅋ");
            return 0;
        }
    }








    
})

router.get('/delete',async(req,res)=>{

    const articleIdx = req.query.aid;

    res.redirect('/article/list');

})
module.exports = router;