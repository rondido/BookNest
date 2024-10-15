// function Circle(redius) {
//   this.redius = redius;
//   this.getArea = function () {
//     //Math.PI는 원주율을 나타내는 상수다.
//     return Math.PI * this.redius ** 2;
//   };
// }
// //반지름이 1인 인스턴스 생성
// const circle1 = new Circle(1);

// //반지름이 2인 인스턴스 생성
// const circle2 = new Circle(2);

// //Circle 생성자 함수는 인스턴스를 생성할 때마다 동작을 하는
// //getArea 메서드를 중복 생성하고 모든 인스턴스가 중복 소유됨.
// //getArea 메서드는 하나만 생성하여 모든 인스턴스가 공유해서 사용하는 것이 바람직하다.
// console.log(circle1.getArea());
// console.log(circle2.getArea());

function Circle(redius) {
  this.redius = redius;
}

//Circle 생성자 함수가 생성한 모든 인스턴스가 getArea 메서드를
//공유해서 생성할 수 있도록 프로토타입에 추가한다.
//프로토타입은 Circle 생성자 함수의 prototype 프로퍼티에 바인딩되어 있다.

Circle.prototype.getArea = function () {
  return Math.PI * this.redius ** 2;
};

//인스턴스 생성
const circle1 = new Circle(1);
const circle2 = new Circle(2);

//Circle 생성자 함수가 생성한 모든 인스턴스는 부모 객체의 역할을 하는
//프로토타입 Circle.prototpype으로부터 getArea 메서드를 상속받는다.
//즉, Circle 생성자 함수가 생성하는 모든 인스턴스는 하나의 getArea 메서드를 공유한다.
console.log(circle1.getArea === circle2.getArea); //true
console.log(circle1.getArea);
console.log(circle2.getArea);

const abc = {};
const Abc = { x: 1 };
//getter 함수인 get __proto__가 호출되어 obj 객체의 프로토타입을 취득
abc.__proto__;
//setter 함수인 et __proto__가 호출되어 obj 객체의 프로토타입을 교체
obj.__proto__ == Abc;

console.log(abc.x); //1

const bbc = { name: "park" };

//bbc 객체는 __proto__ 프로퍼티를 소유하지 않는다.
console.log(bbc.hasOwnProperty("__proto__")); //false
//__proto__ 프로퍼티는 모든 객체의 프로토타입 객체인 Object.prototype의 접근자 프로퍼티다.
console.log(Object.getOwnPropertyDescriptor(Object.prototype, "__proto__"));

// 모든 객체는 Object.prototyp의 접근자 프로퍼티 __proto__를 상속받아 사용할 수 있다.
console.log({}.__proto__ === Object.prototype);

//const person = { name: "Lee" };

//person 객체는 __proto__ 프로퍼티를 소유하지 않는다.
//console.log(person.hasOwnProperty("__proto__")); //false

//__proto__프로퍼티는 모든 객체의 프로토타입 객체인 Object.prototype의 접근자 프로퍼티다.
console.log(Object.getOwnPropertyDescriptor(Object.prototype, "__proto__"));
//{get: ƒ, set: ƒ, enumerable: false, configurable: true}

// 모든 객체는 Object.prototype의 접근자 프로퍼티 __proto__를 상속받아 사용할 수 있다.
console.log({}.__proto__ === Object.prototype); //true

const parent = {};

const child = {};

//child의 프로토타입을 parent로 설정
child.__proto__ = parent;
//parent의 프로토타입을 child로 설정
//parent.__proto__ = child; //Cyclic __proto__ value

const obj = Object.create(null);

// obj는 Object.__proto__를 상속받을 수 없다
console.log(obj.__proto__);

//따라서 __proto__보다 Object.getPrototypeOf 메서드를 사용하는편이좋다.
console.log(Object.getPrototypeOf(obj));

const Obj = {};
const Parent = { x: 1 };

//Obj 객체의 프로토타입을 취득
Object.getPrototypeOf(Obj); // obj.__proto__

//Obj객체의 프로타입을 Parent로 교체
Object.setPrototypeOf(Obj, Parent); //Obj.__proto__ = Parent

console.log(Obj.x); //1

//함수 객체는 prototype 프로퍼티를 소유한다.
(function () {}).hasOwnProperty("prototype"); //true

//일반 객체는 prototype 프로퍼티를 소유하지 않는다.
({}).hasOwnProperty("prototype"); //false

const People = (name) => {
  this.name = name;
};

//non-constructor는 prototype 프로퍼티를 소유하지 않는다.
console.log(People.hasOwnProperty("prototype")); //false

//non-constructor는 프로토타입을 생성하지 않는다.
console.log(People.prototype); //undefined

//ES6의 메서드 축약 표현으로 정의한 메서드는 non-constructor다
const ob = {
  foo() {},
};

//non-constructor는 protype 프로퍼티를 소유하지 않는다.
console.log(ob.foo.hasOwnProperty("prototype")); //false

//non-constructor는 프로토타입을 생성하지 않는다.
console.log(ob.foo.prototype); //undefined

function Good(name) {
  this.name = name;
}

const gd = new Good("Lee");

// 결국 Good.prototype과 gd.__proto__는 같은 동일한 프로토타입을 가리킴.
console.log(Good.prototype === gd.__proto__); // ture

function Ex(name) {
  this.name = name;
}

const ex = new Ex("Lee");

console.log(ex.constructor === Ex); // true

// dde 객체를 생성한 생성자 함수는 Object이다.
const dde = new Object();
console.log(dde.constructor === Object); // true

// add 함수 객체를 생성한 생성자 함수는 Function이다.

const add = new Function("a", "b", "return a +b");
console.log(add.constructor === Function); // true

//생성자 함수
function addF(name) {
  this.name = name;
}

//addMe 객체를 생성한 함수는 addF이다.
const addMe = new addF("Park");
console.log(addMe.constructor === addF); // true

//2.Object 생성자 함수에 의한 객체 생성
//인수가 전달되지 않았을 때 추상 연산 OrdinaryObjectCreate를 호출하여 빈 객체를 생성
let eef = new Object();
console.log(eef); //{}

//1.new.target이 undefined나 Object가 아닌 경우
//인스턴스 -> Foo.prototype -> Object.prototype 순으로 프로토타입 체인이 생성
class Foo extends Object {}
new Foo(); //Foo{}

//3.인수가 전달된 경우네는 인수를 객체로 변환한다.
//Number 생성
eef = new Object(123);
console.log(eef); // Number {123}

//String 객체 생성
eef = new Object("123"); // String {'123'}

// foo 함수는 Function 생성자 함수로 생성한 함수 객체가 아니라 함수 선언문으로 생성했다.

function foo() {}

//하지만 constructor 프로퍼티를 통해 확인해보면 함수 foo의 생성자 함수는 Function 생성자 함수다.

console.log(foo.constructor === Function); //true

// 함수 정의(constructor)가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성
console.log(Ppo.prototype); // {constructor:f}

// 생성자 함수
function Ppo(name) {
  this.name = name;
}

// 화살표 함수는 non-consturctor다.
const PPo = (name) => {
  this.name = name;
};

console.log(PPo.prototype); // undefined

function Play(run) {
  this.run = run;
}

Play.prototype.sayPlay = function () {
  console.log(`run ${run}`);
};

const your = new Play("shit");
const baba = new Play("die");

your.sayPlay();
baba.sayPlay();

function BoBo(name) {
  this.name = name;
}

const dd = new BoBo("Park");

//프로토 타입으로 교체할 객체
const DD = {};

//프로토 타입으로 교체
Object.setPrototypeOf(dd, DD);

//BoBo 생성자 함수와 DD 객체는 서로 연결되어 있지 않다.
console.log(BoBo.prototype === DD); // false
console.log(DD.prototype === BoBo); // false

// DD 객체를 BoBo 생성자 함수의 prototype으로 바인딩한다.
BoBo.prototype = DD;

//BoBo.prototype이 dd 객체의 프로토타입 체인 상에 존재하므로 true로 평가
console.log(dd instanceof BoBo); // true

//Object.prototype이 dd 객체의 프로토타입 체인 상에 존재하므로 true로 평가
console.log(dd instanceof Object); //true

// 프로토타입이 null인 객체를 생성한다. 생성된 객체는 프로토타입 체인의 조점에 위치한다.
// create -> null
let create = Object.create(null);
console.log(Object.getPrototypeOf(create) === null); // true

//Object.prototype을 상속받지 못한다.
console.log(create.toString()); //error

// create ->Object.prototype => null
// create = {}와 동일
create = Object.create(Object.prototype);
console.log(Object.getPrototypeOf(create) === Object.prototype); // true

// create -> Object.prototype -> null
// create = {x:1}와 동일
create = Object.create(Object.prototype, {
  x: { value: 1, writable: true, enumerable: true, configurable: true },
});

//위 코드는 아래와 동일
// create = Object.create(Object.prototype);
// create.x =1;
console.log(create.x); //1
console.log(Object.getPrototypeOf(create) === Object.prototype); // true

const myCreate = { x: 10 };
//임의의 객체를 직접 상속받는다.
// create => myCreate => Object.prototype => null
create = Object.create(myCreate);
console.log(create.x); //10
console.log(Object.getPrototypeOf(create) === myCreate); // true

//생성ㅈ ㅏ함수
function Create(make) {
  this.make = make;
}

// create=> Create.prototype => Object.protype=>null
//crete => new Create('Park')과 동일
create = Object.create(Create.prototype);
create.make = "Park";
console.log(create.make); // Park
console.log(Object.getPrototypeOf(create) === Create.prototype); // true

const Good = {
  name: "park",
  adress: "seoul",
};

//Good 객체에 name 프로퍼티가 존재한다.
console.log("name" in Good); //true
//Good 객체에 adress 프로퍼티가 존재한다.
console.log("adress" in Good); //true
//Good 객체에 age 프로퍼티가 존재하지 않는다.
console.log("age" in Good); //false
