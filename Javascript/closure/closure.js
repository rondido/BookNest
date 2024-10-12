// 함수를 인수로 전달받고 함수를 반환하는 고차 함수
// 이 함수는 카운트 상태를 유지하기 위한 자유 변수 counter를 기억하는 클로저를 반환
function makeCounter(aux) {
  // 카운트 상태를 유지하기 위한 자유 변수
  let counter = 0;
  //클로저를 반환
  return function () {
    //인수로 전달받은 보조 함수에 상태 변경을 위임.
    counter = aux(counter);
    return counter;
  };
}
// 보조 함수
function increase(n) {
  return ++n;
}

function decrease(n) {
  return --n;
}

// 함수로 함수를 생성
//makeCounter 함수는 보조 함수를 인수로 전달받아 함수를 반환
const increaser = makeCounter(increase); // 1번
console.log(increaser()); //1
console.log(increaser()); //2

//increaser 함수와는 별개의 독립된 렉시컬 환경을 갖기 때문에 카운터 상태가 연동 되지 않는다.
const decreaser = makeCounter(decrease); // 2번
console.log(decreaser()); // -1
console.log(decreaser()); // -2

// function outer() {
//   let x = 10;

//   inner();
// }

// function inner() {
//   console.log(x);
// }
// outer();

// const x = 1;

// function foo() {
//   const x = 10;
//   bar();
// }

// function bar() {
//   console.log(x);
// }

// foo(); //?
// bar(); //?

const x = 1;

function foo() {
  const x = 10;
  const inner = function () {
    console.log(x);
  };
  return inner;
}

const innerFunc = foo();

innerFunc();

function foo() {
  const x = 1;
  const y = 1;
  function bar() {
    const z = 3;
    console.log(z);
  }
  return bar;
}

const bar = foo();
bar();
