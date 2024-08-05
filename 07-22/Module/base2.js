const {odd, even, test} = require('./base1.js');

function checkOddorEven(num){
    if(num%2){
       
        return odd;
    }
   
    return even;
    
}

console.log("base2.js에서 사용하는 base1.js의 test함수 호출하기",test());

module.exports = checkOddorEven;