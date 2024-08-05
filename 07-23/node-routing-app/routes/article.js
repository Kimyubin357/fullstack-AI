//게시글 정보관리 웹페이지 요청과 응답 처리 전용 라우터파일
//article.js 라우터 파일의 기본 주소체계는 app.js 내에서
//http://localhost:3000/article 로 정의할 예정
var express = require('express');

//각종 요청과 응답처리를 위한 라우터 객체 생성하기
var router = express.Router();

//게시글 목록 웹페이지 요청과 응답처리 라우팅 메소드 정의
//요청 주소: http://localhost:3000/article/list
//router.get()라우팅 메소드는 클라이언트에서 get방식으로 요청해야 함
//클라이언트에 get방식으로 요청하는 방법:하나:브라우저창에 url 직접 찍는 경우

router.get('/list',(req,res)=>{
    res.render('article/list.ejs');
});

//게시글 등록 웹페이지 요청과 응답처리 라우팅 메소드
//요청주소 http://localhost:3000/article/create
//클라이언트 요청방식:get방식
//응답형식 : 게시글 등록 웹피이지(뷰파일)
router.get('/create',(req,res)=>{
    res.render('article/create.ejs');
});

//게시글 등록페이지에서 폼방식으로 전달해준 사용자 입력 게시글 정보를 추출해
//DB에 저장처리하는 라우팅 메소드 구현
//요청주소 http://localhost:3000/article/create
//클라이언트 요청방식: post방식
// 서버 측 라우팅 메소드는 호출주소 url과 클라이언트 요청방식이 둘다 동일해야 해당 라우팅 메소드가 실행 됨
router.post('/create',(req,res)=>{
    //사용자 게시글 등록 폼 태그 내 입력/선택 값 추출하기
    //사용자 입력 폼내 입력/선택 html요소 태그의 값을 추출하려면
    //req.body.html태그 요소의 name 속성 값을 이용해 추출합니다.
    //req=HttpRequest객체=요청 정보 담고 있는 클라이언트/ 웹브라우저에서 서버로 전달되는 모든 정보를 담고 있는 객체

    const title = req.body.title;
    const contents = req.body.contents;
    const display = req.body.display;

    const article = {
        title : title,
        contents : contents,
        display : display,
        view_cnt : 0,
        ipaddress:"111.111.111.111",
        regist_date:Date.now(),
        author : "유빈콩",
        regist_id:1
    }

    //사용자 웹브라우저를 게시글 목록페이지로 바로 이동시키기
    res.redirect('/article/list')
});

//게시글 확인 및 수정 웹페이지 요청과 응답처리 라우팅 메소드
//요청주소 http://localhost:3000/article/modify?id=1
//클라이언트 요청방식:get방식
//응답형식 : 단일 게시글 정보 확인 웹피이지(뷰파일)
router.get('/modify',(req,res)=>{

    //url 주소를 통해 데이터를 전달하는 방법 2가지
    //1) QueryString 방식 : url 주소에 ?키=값&키2=값&키3=값
    //QueryString 방식 예시 : http://shop.naver.com/category?ptype=tv&manufacture=lg&price=5000
    //http://test.co.kr/blogs?id=1
    
    //2)파라메터 방식 : url 주소내에 데이터를 포함시키는 방식
    //파라메터 방식 예시 : http://test.co.kr/blogs/1 http://test.co.kr/category/1/goods/2000
    
    //step1: url주소에서 게시글 고유번호를 추출한다.

    //쿼리스트링 방식으로 전달되는 키값은 req.query.키명으로 추출한다.

    const articleIdx = req.query.id;
    //Step2: 해당 게시글 번호를 이용해 DB게시글 테이블에서 단일게시글 정보를 조회해온다.
    //예시 아래 데이터를 DB에서 불러왔다는 가정 하에...
    const article = {
        article_id : 1,
        title : "웹퍼블리셔의 업무에 대해 궁금해요.",
        contents:"kdlfajflskdfjlkdajsflkjldksjf",
        display:1,
        view_cnt:100,
        regist_date:"2024-07-23",
        regist_id:1,
    }
    res.render('article/modify.ejs',{article});
    //객체의 속성명과 속성명의 변수값이 동일하면 변수명은 생략 가능...
    //res.render('article/modify.ejs',{article : article});

});

//기존 게시글 정보에 대해 사용자가 수정한 폼 정보를 이용해
//수정데이터를 폼에서 추출하고 추출한 수정정보를 기반으로
//DB에 저장되어 있던 기존 데이터를 수정 처리 후에 목록페이지 이동시킬까? 말까??
//관리자 웹사이트의 특성상 목록 페이지로 그냥 이동시켜버림..
//요청주소 http://localhost:3000/article/modify/1
//클라이언트 요청방식: POST방식
//응답형식 : 단일 게시글 정보 확인 웹피이지(뷰파일)
router.post('/modify/:id',(req,res)=>{

    //url 파라메터 방식으로 데이터를 전달하는 경우 해당 데이터를 url에서 추출하는 방법
    //먼저 라우팅 주소에 와일드카드 키를 설정한다. /modify/:id     :id가 와일드 카드 키

    //Step1 : 게시글 고유번호를 추출한다.
    const articleIdx = req.params.id;

    //step2: 사용자가 수정한 html 요소의 수정값 추출하기

    const title = req.body.title;
    const contents = req.body.contents;
    const display = req.body.display;

    //step3: db게시글 정보 수정을 위한 json 수정 데이터 생성하기 
    const article = {
        title:title,
        contents:contents,
        display:display
    }

    //step4: db에 해당 단일 게시글에 대해 상기 수정데이터로 데이터를 수정처리한다,
    
    //수정작업이 끝나면 목록페이지로 이동시키거나 특정 뷰파일을 보내준다.,
    res.redirect('/article/list');
})




//반드시 라우터 파일의 라우터 객체들을 exports로 노출해야 
//app.js에서 router 내의 라우팅 규칙을 실행할 수 있습니다.
module.exports = router;

