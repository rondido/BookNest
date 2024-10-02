const num = {
  num: 5,
  count() {
    return 1 + this.num;
  },
};

console.log(num.count());

console.log(this); // window

function square(number) {
  console.log(this);
  return number * number;
}

square(2);
const people = {
  name: "lee",

  getName() {
    // 메서드 내부에서 this는 메서드를 호출한 상위 스코프를 가리킴.
    console.log(this);
    return this.name;
  },
};

console.log(people.getName());

function People(name) {
  this.name = name;
  //생성자 함수 내부에서 this는 인스턴스의 값을 가리킨다.
  console.log(this); //  'Lee'
}

const me = new People("Lee");

// this 바인딩은 함수 호출 방식에 따라 동적으로 결정됨.
const foo = function () {
  console.dir(this); // window
};

//동일한 함수도 다양한 방식으로 호출할 수 있다.

//1. 일반 함수 호출
// foo 함수를 일반적으로 호출
// foo 함수 내부의 this는 전역 객체 window를 가리킨다
foo(); //window

//2. 메서드 호출
// foo 함수를 프로퍼티 값으로 할당하여 호출
// foo 함수 내부의 this는 전역 객체 window를 가리킴.
const obj = { foo };
obj.foo(); // obj

//3.생성자 함수 호출
//foo 함수를 new 연산자와 함께 생성자 함수로 호출
//foo 함수 내부의 this는 생성자 함수가 생성한 인스턴스를 가리킴.

new foo(); // foo{}

//4. Function.prototype.appl/bind/call 메서드 간접 호출
const bar = { name: "bar" };

foo.call(bar); //bar
foo.apply(bar); //bar
foo.bind(bar)(); //bar

var name = "mee";
const person = {
  name: "park",

  getName() {
    console.log(this);
    return this.name;

    // function abc() {
    //   console.log(this);
    //   console.log(this.name); //node에서는 undefined web brower에서는 mee
    //   // web의 경우에는 window node에서는 global node에서 name 값을 올바르게 할려면 bind 혹은 화살표 함수로 변환
    // }
    // //abc.bind(this)();
    // abc();
  },
};

console.log(person.getName());

// var 키워드로 선언한 변수는 전역 변수이다.?

// function myFunction() {
//   var testVar = "123";
//   let testLet = "345";
//   const testConst = "456";
//   if (test) console.log(testVar);
//   if (true) {
//     var ifTrueVar = "var";
//     let ifTrueLet = "let";
//     const ifTrueConst = "const";
//   }
//   console.log(ifTrueLet);
//   console.log(ifTrueVar);
// }

// myFunction();

// const anotherPerson = {
//   name: "kim",
// };

// anotherPerson.getName = person.getName;

// console.log(anotherPerson.getName());

// const getName = person.getName;

// console.log(getName());

function Circle(redius) {
  this.redius = redius;
  this.getDiament = function () {
    return 2 * this.redius;
  };
}

const circle1 = new Circle(5);

const circle2 = new Circle(10);

console.log(circle1.getDiament());
console.log(circle2.getDiament());

const circle3 = Circle(15);

console.log(circle3);
console.log(redius);

const add = {
  num: 5,
  addNumber() {
    return 5 + add.num;
  },
};

console.log(add.addNumber());

function getThisBinding() {
  return this;
}

// this로 사용할 객체
const thisArg = { a: 1 };

console.log(getThisBinding()); //window

//getThisBinding 함수를 호출하면서 인수로 전달한 객체를 getThisBinding 함수의 this에 바인딩한다.
console.log(getThisBinding.apply(thisArg, [1, 2, 3])); //{a:1}
console.log(getThisBinding.call(thisArg, 1, 2, 3)); //{a:1}

function getThisBinding() {
  return this;
}



//getThisBinding 함수를 호출하면서 인수로 전달한 객체를 getThisBinding 함수의 this에 바인딩한다.
console.log(getThisBinding.bind(thisArg)); //{a:1}
console.log(getThisBinding.call(thisArg)()); //{a:1}
