//base1.js 모듈 내 odd, even 상수 참조하기

const {odd, even} = require('./base1.js');

//base2.js 모듈 내 checkOddorEven 함수 참조하기
const checkOddorEven = require('./base2.js');


//문자열을 던지면 문자열의 길이가 짝수이면 짝수, 홀수이면 홀수
function checkStringOddorEven(str){
    if(str.length%2){
        
        return odd;
    }
    return even;
   
}

console.log('base2.js에서 가지고 온 함수 사용 시작');
console.log("숫자에 대한 홀짝수 체크하기 : ",checkOddorEven(10));
console.log("숫자에 대한 홀짝수 체크하기 : ",checkOddorEven(5));

console.log('base1.js에서 선언했던 대답 문자열 odd, even 상수를 참조해서 재사용');
console.log("숫자에 대한 홀짝수 체크하기 : ",checkStringOddorEven('안녕'));
console.log("숫자에 대한 홀짝수 체크하기 : ",checkStringOddorEven("안녕하세요"));