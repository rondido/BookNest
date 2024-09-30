# this

## 22.1 this 키워드

객체는 상태를 나타내는 프로퍼티와 동작을 나타내는 메서드를 하나의 논리적인 단위로 묶은 복합적인 자료구조.

동작을 나타내는 메서드는 자신이 속한 객체의 상태, 즉 프로퍼티를 참조하고 변경할 수 있어야 함.

메서드가 자신이 속한 객체의 프로퍼티를 참조하려면 먼저 자신이 속한 객체를 가리키는 식별자를 참조할 수 있어야 함.

```
const add = {
  num: 5,
  addNumber() {
    return 5 + add.num;
  },
};

console.log(add.addNumber());

```

객체 리터럴 방식으로 생성한 객체의 경우 메서드 내부에서 메서드 자신이속한 객체를 가리키는 식별자를 재귀적으로 참조

> 객체 리터럴 방식
>
> JavaScript에서 객체를 생성하는 간단하고 직관적인 방법입니다. 객체를 **중괄호 {}**를 사용하여 정의하며, 객체 내부에 **속성(key)**과 **값(value)**을 쌍으로 나열하는 방식

addNumber 메서드 내에서 메서드 자신이 속한 객체를 가리키는 식별자 add를 참조하고 있다. 이 참조 표현식이 평가되는 시점은 getDiameter 메서드가 호출되어 함수 몸체가 실행되는 시점

객체 리털은 add 변수가 실행되기 직전에 평가됨. addNumber 메서드가 호출되는 시점에는 이미 객체 리터럴의 평가가 완료되어 객체가 생성되었고 add 식별자에 생성된 객체가 할당된 이후다. 따라서 메서드 내부에서 add 식별자를 참조

자기 자신이 객체를 재귀적으로 참조하는 것은 일반적이지 않으며 바람직하지 않다.

생성자 함수 내부에서는 프로퍼티 또는 메서드를 추가하기 위해 자신이 생성할 인스턴스를 참조할 수 있어야 함.
생성자 함수에 의한 객체 생성 방식은 먼저 생성자 함수를 정의한 이후 new 연산자와 함께 생성자 함수를 호출하는 단계가 추가로 필요함.
생성자 함수를 정의하는 시점에는 아직 인스턴스를 생성하기 전 이므로 생성자 함수가 생성할 인스턴스를 식별할 방법이 없다.
이를 위해 자바스크립트는 **this**라는 특수한 식별자를 제공

❗ <b>this는 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 자기 참조 변수다. this를 통해 자신이 속한 객체 또는 자신이 생성할 인스턴스의 프로퍼티나 메서드를 참조</b>

this는 자바스크립트 엔진에 의해 암묵적 생성, 코드 어디서든 참조 가능.

단, this가 가리키는 값, 즉 this 바인딩은 함수 호출 방식에 의해 동적으로 결정

> this 바인딩
>
> 바인딩이란 식별자와 값을 연결하는 과정. 예를 들어 변수 선언은 변수 이름과 확보된 메모리 공간의 주소를 바인딩하는 것. 바인딩은 this(키워드로 분류되지만 식별자 역할을 한다)와 this가 가리킬 객체를 바인딩하는 것.

```
const num = {
  num: 5,
  count() {
    return 1 + this.num;
  },
};

console.log(num.count());
```

<b>자바스크립트의 this는 함수가 호출되는 방식에 따라 this에 바인딩될 값, 즉 this 바인딩이 동적으로 결정된다. 또한 strict mode 역시 this 바인딩에 영향을 줌.</b>

```
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

```

this는 객체의 프로퍼티나 메서드를 참조하기 위한 자기 참조 변수이므로 일반적으로 객체의 메서드 내부 또는 생성자 함수 내부에서만 의미가 있다. 따라서 strict mode가 적용된 일반 함수의 경우 undefined가 바인딩됨.

## 22.2 함수 호출 방식과 this 바인딩

<b>this 바인딩(this에 바인딩될 값)은 함수 호출 방식, 즉 함수가 어떻게 호출되는지에 따라 동적으로 결정됨.</b>

함수를 호출하는 방식은 다양하다.

1. 일반 함수 호출
2. 메서드 호출
3. 생성자 함수 호출
4. Function.prototype.apply/bind/call 메서드의 간접 호출

```

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
```

### 일반 함수 호출

기본적으로 this에는 전역 객체가 바인딩됨.

```
function foo(){
  conso.log('foo',this)// window
  function bar(){
    console.log('bar',this)//window
  }
  bar()
}
foo()
```

일반 함수로 호출하면 함수 내부의 this는 전역 객체를 가리킴.

```
function foo(){
  'use strict'
  conso.log('foo',this)// undefined를
  function bar(){
    console.log('bar',this)//undefined를
  }
  bar()
}
foo()
```

strict mode가 적용되면 undefined를 반환

```

var name = "mee";
const person = {
  name: "park",
  getName() {
    console.log('getName', this); // {name:'mee', getName:f}
    console.log('getName', this.name); // park
    // 메서드 내에서 정의한 중첩 함수
    function get(){
      console.log('get',this)//window
      console.log('get',this.value)// mee
    }
    get();
  },
};

obj.getName();
```

콜백 함수가 일반 함수로 호출된다면 콜백 함수 내부의 this에도 전역 객체가 바인딩됨. 어떠한 함수라도 일반 함수로 호출하면 this에 전역 객체가 바인딩됨.

```
var name = "mee";
const person = {
  name: "park",
  getName() {
    console.log('getName', this); // {name:'mee', getName:f}
    console.log('getName', this.name); // park
    // 메서드 내에서 정의한 중첩 함수
    setTimeout(function(){
      console.log('callback', this) // window
      console.log('callback', this.name) // mee
    },100)
  },
};

obj.getName();

```

이처럼 일반 함수로 호출된 모든 함수(중첩, 콜백 함수 포함) 내부의 this에는 전역 객체가 바인딩됨.
