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

```

var name = "mee";
const person = {
  name: "park",
  getName() {
    // this 바인딩(obj)을 변수 that에 할당
    const that = this;
    setTimeout(function(){
      console.log(that.name) // park
    },100)
  },
};

obj.getName();

```

위 방법 외에도 자바스크립트는 this를 명시적으로 바인딩 할 수 있는 Function.prototype.apply, Function.prototype.bind, Function.prototype.call이 있다.

```

var name = "mee";
const person = {
  name: "park",
  getName() {
    // 콜백 함수에 명시적으로 this를 바인딩
    setTimeout(function(){
      console.log(this.name) // park
    }.bind(this),100)
  },
};

obj.getName();

```

```

var name = "mee";
const person = {
  name: "park",
  getName() {
    // 화살표 함수 내부의 this는 상위 스코프 this를 가리킴.
    setTimeout(()=>{
      console.log(this.name) // park
    },100)
  },
};

obj.getName();

```

### 메서드 호출

메서드 내부의 this는 메서드를 소유한 객체가 아닌 메서드를 호출한 객체 바인딩된다는 것.

```

var name = "mee";
const person = {
  name: "park",
    getName() {
      // 메서드 내부의 this는 메서드를 호출한 객체에 바인딩됨.
    return this.name
  },
};

console.log(obj.getName()); // Lee

```

```
const anotherPerson ={
  name: 'kim'
}


//getName 메서드를 anotherPerson 객체의 메서드로 할당
anotherPerson.getName = person.getName;


//getName 메서드를 호출한 객체는 anotherPerson이다.
console.log(anotherPerson.getName()); // kim

//getName 메서드를 변수에 할당
const getName = person.getName

// getName 메서드를 일반 함수로 호출
console.log(getName()) // ''
// 일반 함수로 호출된 getName 함수 내부의 this.name은 브라우저 환경에서 window.name과 같다.
//브라우저 환경에서 window.name은 브라우저 창의 이름을 나타내는 빌트인 프로퍼티이며 기본값 ''이다.
// node.js 환경에서는 this.name은 undefined이다.

```

```
function Person(){
  this.name = name;
};

Person.prototype.getName = function(){
  return this.name
}

const me = new Person('Lee')

//getName 메서드를 호출한 객체는 me다
console.log(me.getName()) //1 .Lee

Person.prototype.name = 'kim'

// getName 메서드를 호출한 객체는 Person.prototype
console.log(Person.prototype.getName()) //2.'kim'

```

1번의 경우 getName 메서드를 호출한 객체는 me다. getName 메서드 내부의 this는 me를 가리키며 this.name은 'Lee'다.

2번의 경우 getName 메서드를 호출한 객체는 Person.prototype이다. Person.prototype도 객체이므로 직접 메서드를 호출할 수 있다.

### 생성자 함수 호출

```
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

```

생성자 함수는 이름 그대로 객체(인스턴스)를 생성하는 함수다. 일반 함수와 동일한 방법으로 생성자 함수를 정의하고 new 연산자와 함께 호출하면 해당 함수는 생성자 함수로 동작한다. 만약 new 연산자와 함께 생성자 함수를 호출하지 않으면 생성자 함수가 아니라 일반 함수로 동작

```
//new 연산자와 함께 호출하지 않으면 생성자 함수로 동작하지 않는다.
//즉 일반적인 함수 호출
const circle3 = Circle(15);
//일반 함수로 호출된 circle3은 반환문이 없으므로 암묵적으로 undefiend 반환
console.log(circle3); // undefined
//일반 함수로 호출된 circle 내부의 this는 전역 객체를 가리킨다.
console.log(redius); //15

```

### Function.prototype.apply/bind/call 메서드에 의한 간접 호출

Function.prototype.apply, Function.prototype.call 메서드는 this로 사용할 객체와 인수 리스트를 인수로 전달받아 함수를 호출함.

```
function getThisBinding() {
  return this;
}

// this로 사용할 객체
const thisArg = { a: 1 };

console.log(getThisBinding()); //window


//getThisBinding 함수를 호출하면서 인수로 전달한 객체를 getThisBinding 함수의 this에 바인딩한다.
console.log(getThisBinding.apply(thisArg)); //{a:1}
console.log(getThisBinding.call(thisArg)); //{a:1}
```

apply와 call 메서드의 본질적인 기능은 함수를 호출 apply와 call 메서드는 함수를 호출하면서 첫 번째 인수로 전달한 특정 객체를 호출한 함수의 this에 바인딩됨.

```
function getThisBinding() {
  console.log(arguments)
  return this;
}

// this로 사용할 객체
const thisArg = { a: 1 };

//getThisBinding 함수를 호출하면서 인수로 전달한 객체를 getThisBinding 함수의 this에 바인딩한다.
// apply 메서드는 호출할 함수의 인수를 배열로 묶어 전달한다
console.log(getThisBinding.apply(thisArg, [1, 2, 3])); //{a:1}
// arguments(3) [1,2,3 callee: f, Symbol(Symbol.iterator):f]
// {a:1}

//call 메서드는 호출할 함수의 인수를 쉼표로 구분한 리스트 형식으로 전달
console.log(getThisBinding.call(thisArg, 1, 2, 3)); //{a:1}
//arguemnts(3) [1,2,3 callee: f,  Symbol(Symbol.iterator):f]
// {a:1}
```

apply 메서드는 호출할 함수의 인수를 배열로 묶어 전달. call 메서드는 호출할 함수의 인수를 쉼표로 구분한 리스트 형식으로 전달 호출 함수에 인수를 전달하는 방식만 다를 뿐 this로 사용할 객체를 전달하면서 함수를 호출하는 것은 동일하다

apply와 call 메서드의 대표적인 용도는 augments 객체와 같은 유사 배열 객체에 배열 메서드를 사용하는 경우.

Function.prototype.bind 메서드는 apply와 call 메서드와 달리 함수를 호출하지 않는다. 다만 첫번째 인수로 전달한 값으로 this 바인딩이 교체된 함수를 새롭게 생성해 반환한다.

```
function getThisBinding() {
  return this;
}

// this로 사용할 객체
const thisArg = { a: 1 };

//bind 메서드는 첫 번째 인수로 전달한 thisArg로 this 바인딩이 교체된 getThisBinding 함수를 새롭게 생성해 반환한다.
console.log(getThisBinding.bind(thisArg)); //getThisBinding
// bind 메서드는 함수를 호출하지는 않으므로 명시적으로 호출해야 함.
console.log(getThisBinding.call(thisArg)()); //{a:1}
```

bind 메서드는 메서드의 this와 메서드 내부의 중첩 함수 또는 콜백 함수의 this가 불일치하는 문제를 해결하기 위해 사용됨.

```
const person = {
  name: "park",

  getName() {
    //1
    setTimeout(callback,10)
  },
};

person.getName(function(){
  console.log(`hi my name is ${this.name}`)
})
//일반 함수로 호출된 콜백 함수 내부의 this.name은 브라우저 환경에서 window.name과 같다.
//중첩 함수의 경우 this는 window 즉 ''
// node의 경우에는 global undefined를 반환

```

person.getName의 콜백 함수가 호출되기 이전인 1번의 시점에서 this는 getName 메서드를 호출한 객체 즉 person 객체를 가리킴. person.getName의 콜백 함수가 일반 함수로서 호출된 2의 시점에서 this는 전역 객체를 가리킴. 따라서 person.getName의 콜백 함수 내부에서 this.name은 window.name과 같다.

이때 위 예제에서 person.getName의 콜백 함수는 person.getName를 돕는 헬퍼 함수(보조 함수) 역할을 하기 때문에 person.getName 내부의 this와 콜백 함수 내부의 this가 상이하면 문맥상 문제가 발생

이를 해결하기 위해 bind 메서드를 사용하여 일치시킨다.

```
const person = {
  name: "park",

  getName() {
    //bind 메서드로 callback 함수 내부의 this 바인딩을 전달
    setTimeout(callback.bind(this),10)
  },
};

person.getName(function(){
  console.log(`hi my name is ${this.name}`) // hi my name is park
})

```

| 함수 호출 방식                     | this 바인딩                                                    |
| ---------------------------------- | -------------------------------------------------------------- |
| 일반 함수 호출                     | 전역 객체                                                      |
| 메서드 호출                        | 메서드를 호출한 객체                                           |
| 생성자 함수 호출                   | 생성자 함수가(미래에)생성할 인스턴스                           |
| Function.prototype.call/bind/apply | Function.prototype.call/bind/apply에 첫번째 인수로 전달한 객체 |
