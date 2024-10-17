// 제네릭
// 재사용을 목적으로 함수나 클래스의 선언 시점이 아닌, 사용 시점에 타입을 선언할 수 있는 방법을 제공
// 타입을 인수로 받아서 사용한다고 이해하면 쉽다.
function toArray(a: number, b: number): number[] {
  return [a, b];
}

toArray(1, 2);
//toArray('1','2') //Error argument of type 'string'

//유니언 방식
// 이제 String 타입을 인수로 받을 수 있지만, 가독성이 떨어지고 새로운 문제를 발생
// 세번 째 호출을 보면 의도치 않게 Number와 String 타입을 동시에 받을 수 있게 되었다.

function oneArray(a: number | string, b: number | string): (number | string)[] {
  return [a, b];
}

oneArray(1, 2); // only Number
oneArray("1", "2"); // only string
oneArray(1, "2"); // string & Number

// generic
// 함수 이름 우측 <T>를 작성해 시작
// T는 타입 변수로 사용자가 제공한 타입으로 변환될 식별자임.
// 이제 세 번째 호출은 의도적으로 Number와 String 타입을 동시에 받을 수 있다.

// 타입 변수는 매개변수처럼 원하는 이름으로 지정할 수 있다.

function twoArray<T>(a: T, b: T): T[] {
  return [a, b];
}
twoArray<number>(1, 2);
twoArray<string>("1", "2");
twoArray<string | number>("1", 2);
//twoArray<number>("1", 2); //error

// 타입 추론을 활용해, 사용 시점에 타입을 제공하지 않을 수 있다.

function threeArray<T>(a: T, b: T): T[] {
  return [a, b];
}

threeArray(1, 2);
threeArray("1", "2");
//threeArray('1',2) // error

//제약 조건

//인터페이스나 타입 별칭을 사용하는 제네릭을 작성할 수도 있다.

interface MyType<T> {
  name: string;
  value: T;
}

const dataA: MyType<string> = {
  name: "Data A",
  value: "Hello world",
};

const dataB: MyType<number> = {
  name: "Data B",
  value: 1234,
};

const dataC: MyType<boolean> = {
  name: "Data C",
  value: true,
};

const dataD: MyType<number[]> = {
  name: "Data D",
  value: [1, 2, 3, 4],
};

// 만약 타입 변수 T가 string과 number인 경우만 허용하려면 아래 예제와 같이 extends 키워드를 사용하는 제약 조건을 추가할 수 있다.

//T extends U

interface Mytype<T extends string | number> {
  name: string;
  value: T;
}

const dataAB: Mytype<string> = {
  name: "Data",
  value: "Hello world",
};

const dataBB: Mytype<number> = {
  name: "Data",
  value: 1234,
};

// const dataCC:Mytype<boolean>={
//   name: "Data",
//   value: true,
// } error

// const dataD: MyType<number[]> = {
//   // TS2344: Type 'number[]' does not satisfy the constraint 'string | number'.
//   name: "Data D",
//   value: [1, 2, 3, 4],
// };
