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
(function () {}).hasOwnProperty("prototype");

//일반 객체는 prototype 프로퍼티를 소유하지 않는다.
({}).hasOwnProperty("prototype");

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
