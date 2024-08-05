//articleAPI.js 라우터의 기본주소는
//app.js에서 http://localhost:3000/api/articles 로 설정해줍니다,

var express = require('express')
var router = express.Router();

//전체기시글  목록 데이터 요청과 응답처리 라우팅 메소드
//호출주소 : http://localhost:3000/api/articles/list
router.get('/list',async(req,res)=>{
    const articles = {
        article_id: 1,
        title: "게시글 제목 1입니다.",
        contents : "게시글1 내용입니다.",
        display  : 1,
        view_cnt : 10,
        ip_address : "111.111.111.111",
        regist_id : 1,
        regist_date : Date.now()
    }

    res.json(articles);
})

/*
-단일 신규 게시글 정보 등록 요청과 응답처리 라우팅 메소드
-호출주소 : http://localhost:3000/api/articles/create
-호출방식 : post
-응답결과 : 등록처리완료된 단일게시글 정보 반환 (여기는 게시글 번호가 있어요.)
*/

router.post('/create', async(req,res)=>{

    let apiResult={
        code : 200, //처리결과 상태 코드
        date : null,//반환할 데이터가 있으면 여기에 전달
        result : ""//서버에서 프론트로 특정 메시지를 보내고 싶으면 여기에..
    }
    try{
        //Step1: 클라이언트에서 보내준 사용자 입력 json 데이터를 추출합니다.

        const title = req.body.title;
        const contents = req.body.contents;
        const display = req.body.display;

        //Step2: 사용자 json 데이터를 DB게시글 테이블에 저장합니다.

        const article = {
            title,
            contents,
            display,
            view_cnt : 0,
            ip_address : "111.111.111.111",
            regist_id : 1,
            regist_date:Date.now()
        }
        //Step3: DB에 저장, 반환된 등록된 게시글 신규 게시글 정보가 반환됩니다.
        const dbArticle = {
            article_id:1,
            title,
            contents,
            display,
            view_cnt : 0,
            ip_address : "111.111.111.111",
            regist_id : 1,
            regist_date:Date.now()
        }
        apiResult.code=200;
        apiResult.data=dbArticle;
        apiResult.result="ok";


    }catch(err){
        //try{}블록스코프 내에서 백엔드 에러가 발생하면 catch(err){} 블럭으로 에러 내용이 전달됩니다.
        apiResult.code = 500;
        apiResult.date = null;
        apiResult.result="server error";
        
    }
            //Step:4 DB에 저장되고  반환된 단일 게시글 정보를 클라이언트에 반환합니다.
        //httpResponse 객체의 json 메소드는 서버에서 웹 브라우저로 json 데이터를 반환합니다. 
        res.json(apiResult);

   
});

/*
-기존 단일 게시글 정보 조회 요청과 응답처리 라우팅 메소드 - 쿼리 스트링 방식
-호출주소 : http://localhost:3000/api/articles/?aid=1
-호출방식 : get
-응답결과 : 단일게시글 정보 JSON반환 
*/
router.get('/', async(req,res)=>{
    let apiResult={
        code : 200, //처리결과 상태 코드
        date : null,//반환할 데이터가 있으면 여기에 전달
        result : ""//서버에서 프론트로 특정 메시지를 보내고 싶으면 여기에..
    }

    try{
        //step1: API URL 주소에서 게시글 번호를 추출한다.(쿼리스트링 방식)
        
        const articleIdx = req.query.aid;//브라우저에서 넘어오는 url에 쿼리스트링 방식으로 전달되는 키값을 키명으로 추출가능하다.

        //DB에서 조회해온 단일 게시글 정보  불러오기
        const article = {
            article_id: 3,
            title: "게시글 제목 3입니다.",
            contents : "게시글3 내용입니다.",
            display  : "1",
            view_cnt : 100,
            ip_address : "111.111.111.111",
            regist_id : 3,
            regist_date : Date.now()
        }
        apiResult.code = 200;
        apiResult.data = article;
        apiResult.result = "Ok"


        //STEP2: 해당 게시글 번호를 기준으로 DB 게시글 테이블에서 단일 게시글 정보를 조회
    
    }catch(err){

        console.log("실제 서버에러 확인하기 :", err.message);
        //백엔드에서 에러가 난 사실을 서버에 물리적 로그폴더를 만들고 로그.txt(.log)파일에 기록하면
        //좀 더 적극적으로 서버에러에 대해 대응이 가능합니다.

        apiResult.code = 500;
        apiResult.data = null;
        apiResult.result = "서버에러발생, 관리자에게 문의하세요."
    }
  




    //STEP3: 단일 게시글 정보를 웹 브라우저/클라이언트 응답결과물로 반환한다.
    res.json(apiResult);
});


/*
-기존 단일 게시글 정보 조회 요청과 응답처리 라우팅 메소드 -파라미터방식
-호출주소 : http://localhost:3000/api/articles/1
-호출방식 : get
-응답결과 : 단일게시글 정보 JSON반환 
*/


/*
-기존 단일 게시글 수정처리 요청과 응답처리 라우팅 메소드
-호출주소 : http://localhost:3000/api/articles/modify
-호출방식 : post
-응답결과 : 수정결과 JSON반환 
*/
router.post('/modify',async(req,res)=>{
    let apiResult={
        code : 200, //처리결과 상태 코드
        date : null,//반환할 데이터가 있으면 여기에 전달
        result : ""//서버에서 프론트로 특정 메시지를 보내고 싶으면 여기에..
    }
    try{
        //Step1: 클라이언트에서 보내준 사용자 입력 json 데이터를 추출합니다.
        const article_id = req.body.article_id;//수정하려는 게시글 고유번호
        const title = req.body.title;
        const contents = req.body.contents;
        const display = req.body.display;

        //Step2: 사용자 json 데이터를 DB게시글 테이블에 저장합니다.
        //DB 게시글 테이블에 수정할 Json 단일 데이터 속성정의

        const article = {
            title,
            contents,
            display,
            ip_address : "111.111.111.111",
            modify_id:1,
            modify_date:Date.now()
        }
        
        apiResult.code=200;
        apiResult.data= 1; // 실제 db서버에서 제공된 수정적용건수
        apiResult.result="ok";


    }catch(err){
        //try{}블록스코프 내에서 백엔드 에러가 발생하면 catch(err){} 블럭으로 에러 내용이 전달됩니다.
        apiResult.code = 500;
        apiResult.data = 0;
        apiResult.result="server error";
        
    }
            //Step:4 DB에 저장되고  반환된 단일 게시글 정보를 클라이언트에 반환합니다.
        //httpResponse 객체의 json 메소드는 서버에서 웹 브라우저로 json 데이터를 반환합니다. 
        res.json(apiResult);
})
router.get('/delete',async(req,res)=>{
    let apiResult = {
        code:200,
        data:null,
        result:""
    }
    try{
        //step1: url에서 삭제하려는 게시글 번호를 조회한다.
        const articleIdx = req.query.aid;

        //step2: DB테이블에서 해당 게시글을 삭제처리한다.

        //step3: DB서버에서 특정 데이터가 삭제되면 삭제 건수 백엔드로 반환된다.

        const deletedCount = 1;
        apiResult.code = 200;
        apiResult.data = 0;
        apiResult.result = "ok";
    }catch(err){
        const deletedCount = 1;
        apiResult.code = 500;
        apiResult.data = 0;
        apiResult.result = "failed 관리자 문의 바람";
    }
})

router.post('/delete',async(req,res)=>{
    let apiResult = {
        code:200,
        data:null,
        result:""
    }
    try{
        //step1: url에서 삭제하려는 게시글 번호를 조회한다.
        const articleIdx = req.query.aid;

        //step2: DB테이블에서 해당 게시글을 삭제처리한다.

        //step3: DB서버에서 특정 데이터가 삭제되면 삭제 건수 백엔드로 반환된다.

        const deletedCount = 1;
        apiResult.code = 200;
        apiResult.data = 0;
        apiResult.result = "ok";
    }catch(err){
        const deletedCount = 1;
        apiResult.code = 500;
        apiResult.data = 0;
        apiResult.result = "failed 관리자 문의 바람";
    }
})
router.get('/:aid', async(req,res)=>{
    let apiResult={
        code : 200, //처리결과 상태 코드
        date : null,//반환할 데이터가 있으면 여기에 전달
        result : ""//서버에서 프론트로 특정 메시지를 보내고 싶으면 여기에..
    }

    try{
        //step1: API URL 주소에서 게시글 번호를 추출한다.(쿼리스트링 방식)
        
        const articleIdx = req.params.aid;//브라우저에서 넘어오는 키값 추출은 와일드카드(:aid) 키값을 이용해 req.params.와일드카드명으로 추출가능

        //DB에서 조회해온 단일 게시글 정보  불러오기
        const article = {
            article_id: 3,
            title: "게시글 제목 3입니다.-파라메터 방식입니다.",
            contents : "게시글3 내용입니다.",
            display  : "1",
            view_cnt : 100,
            ip_address : "111.111.111.111",
            regist_id : 3,
            regist_date : Date.now()
        }
        apiResult.code = 200;
        apiResult.data = article;
        apiResult.result = "Ok"


        //STEP2: 해당 게시글 번호를 기준으로 DB 게시글 테이블에서 단일 게시글 정보를 조회
    
    }catch(err){

        console.log("실제 서버에러 확인하기 :", err.message);
        //백엔드에서 에러가 난 사실을 서버에 물리적 로그폴더를 만들고 로그.txt(.log)파일에 기록하면
        //좀 더 적극적으로 서버에러에 대해 대응이 가능합니다.

        apiResult.code = 500;
        apiResult.data = null;
        apiResult.result = "서버에러발생, 관리자에게 문의하세요."
    }
  




    //STEP3: 단일 게시글 정보를 웹 브라우저/클라이언트 응답결과물로 반환한다.
    res.json(apiResult);
});

module.exports = router ;
