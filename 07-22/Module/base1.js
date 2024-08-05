const odd = "홀수입니다.";

const even = "짝수입니다.";

function test(){
    const str = "base1모듈에서 실행되는 test함수입니다.";
    console.log(str);
    return "testing...";
}

//자바스크립트 객체의 속성명과 속성에 할당되는 변수명이 같으면 변수명 생략 가능
//module.exports를 통해 객체 형태로 odd, even, test 함수를 외부로 노출해줘야 다른 모듈에서 사용 가능 
module.exports = {
    odd : odd,
    even : even,
    test
}