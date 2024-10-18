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

// 대표적은 type과 interface 키워드를 사용하는 타입 선언은 다음 예제와 같이 = 기호를 기준으로 식별자와 타입구현으로 구분할 수 있다.
// 제약 조건은 식별자 영역에서 사용하는 extends에 한함.

type U = string | number | boolean;

// type 식별자 = 타입 구현
type MyType1<T extends U> = string | T;

//interface 식별자 {타입 구현}

interface IUser<T extends U> {
  name: string;
  age: T;
}

// 조건부 타입

// T extends U ? X :Y

type UU = string | number | boolean;

//type 식별자 = 타입 구현
type MyType2<T> = T extends U ? string : never;

// interface 식별자 {타입 구현}

interface IUser1<T> {
  name: string;
  age: T extends U ? number : never;
}

// T는 boolean 타입으로 제한
interface IUser3<T extends boolean> {
  name: string;
  age: T extends true ? string : number;
  isString: T;
}

const str: IUser3<true> = {
  name: "Neo",
  age: "123",
  isString: true,
};

const num: IUser3<false> = {
  name: "Neo",
  age: 123,
  isString: false,
};

type MyType4<T> = T extends string
  ? "Str"
  : T extends number
  ? "Num"
  : T extends boolean
  ? "Boo"
  : T extends undefined
  ? "Und"
  : T extends null
  ? "Nul"
  : "Obj";

// infer

//infer 키워드를 사용해 타입 변수의 타입 추론 여부를 확인할 수 있다.

// U가 추론 가능한 타입이면 참, 아니면 거짓

// T extends infer U ? X: Y

// 유용하지 않지만, 이해를 위한 아주 간단한 예제를 살펴보자.
// 기본 구조는 위에서 살펴본 조건부 타입과 같다.

type MyType5<T> = T extends infer R ? R : null;
const a: MyType5<number> = 123;

//여기서 타입 변수 R은 MyType5에서 받은 타입 number가 되고 infer키워드를 통해 타입 추론이 가능한지 확인함.
// number 타입은 당연히 타입 추론이 가능하니 R을 반환하게 된다.
// 결과적으로 MyType5<number>는 number를 반환하고 변수 a는 123을 할당할 수 있다.
//이번에는 조금 더 복잡하지만 유용한 예제를 하나 살펴보자.
//ReturnType는 함수의 반환 값이 어떤 타입인지 반환함.

type ReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : any;

function fn(num: number) {
  return num.toString();
}

const ab: ReturnType<typeof fn> = "hello";

/**
 * 위 예제에서 typeof fn은 (num:number)=>string으로 반환 타입은 string임
 * 따라서 R은 string이고 역시 infer 키워드를 통해서 타입 추론이 가능하기 때문에 R을 반환함
 * 즉, string을 반환함
 * infer 키워드는 제약 조건 extends가 아닌 조건부 탕비 extends 절에서만 사용 가능
 * infer 키워드는 같은 타입 변수를 여러 위치에서 사용 가능
 * 일반적인 공변성 위치에선 유니언 타입으로 추론
 * 함수 인수인 반공병선 위치에선 인터섹션 타입으로 추론
 * 여러 호출 시그니처의 경우 마지막 시그니처로 추론
 */
