//


//환경설정파일에서 환경변수를 가져오기 위해 dotenv패키지를 참조합니다.
const env = require('dotenv');

//프로젝트 루트에 있는 .env파일에 환경변수 정보를 cpu 프로세스에서 접근가능하게 구성해준다.
env.config();


console.log("hello world")


var toDate = Date();
var toDate2 = Date.now();

console.log("현재 일시를 출력합니다 : ",toDate);

console.log("현재 일시를 출력합니다 : ",toDate2);

//




//환경변수 중에 db주소와 사용자 정보를 조회합니다.
console.log("DB HOST IP : ",process.env.DB_HOST_IP);
console.log("DB HOST IP : ",process.env.DB_USER_ID);