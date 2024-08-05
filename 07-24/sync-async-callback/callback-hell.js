//자바스크립트/노드 프로그래밍은 기본적으로 비동기 방식으로 작동합니다.


//노드 프로그램이 비동기 방식으로 작동되는 것을 눈으로 확인합니다.
//setTimeout()함수는 특정 시간(초)이 지난 후에 특정 로직이 실행되는 내장함수
var fnSample = function(){
    console.log('fnSample()함수가 실행됩니다. 시작!!');

    //setTimeout()함수가 실행되면 4초 후에 내부로직이 실행됩니다.
    setTimeout(function(){
        console.log('로직1 실행 완료 -4초 걸려요.');
    },4000)

    //setTimeout()함수가 실행되면 3초 후에 내부로직이 실행됩니다.
    setTimeout(function(){
        console.log('로직2 실행 완료 -3초 걸려요.');
    },3000)
    //setTimeout()함수가 실행되면 2초 후에 내부로직이 실행됩니다.
    setTimeout(function(){
        console.log('로직3 실행 완료 -2초 걸려요.');
    },2000)
}

//위에 비동기 방식으로 작동되는 fnSample()함수 로직을 동기방식(순차적 프로그래밍)으로 구현해보자...
//순서기반 로직1 -> 로직2 -> 로직3 순서대로 함수 (타이머내 내용)이 실행되어야 하는 업무 규칙이 있다고 가정해보아요.

setTimeout(console.log("hi"),3000);

var fnSyncSample = function (){
    console.log('fnSample()함수가 실행됩니다. 시작!!');

    //setTimeout()함수가 실행되면 4초 후에 내부로직이 실행됩니다.
    setTimeout(function(){
        console.log('로직1 실행 완료 -4초 걸려요.');

        setTimeout(function(){
            
            console.log('로직2 실행 완료 -3초 걸려요.');
            setTimeout(function(){
                console.log('로직3 실행 완료 -2초 걸려요.');
            },2000)

        },3000)

    },4000)
}

fnSyncSample();

//비동기 방식으로 작동되는 fnSample() 함수를 생성합니다.
// fnSample();

