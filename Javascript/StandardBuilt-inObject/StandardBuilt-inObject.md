# 배열에서 사용되는 메서드 학습하기

## 표준 내장 객체

##### .includes()

지정한 문자에 대한 존재 여부를 boolean 값으로 반환

```
const str = 'Hello world!'

console.log(str.includes('Hello')) // true

```

찾기 시작할 위치를 두 번째 인수로 추가할 수 있다.

```
const str = 'Hello world!'
//           012345678901

console.log(str.includes('Hello', 1)) // false
```

##### indexOf()

대상 지정문자에 대해 몇번째 index에 존재하는지 반환 없다면 -1을 반환

```
const str = 'Hello world!'
//           012345678901

console.log(str.indexOf('world')) // 6
console.log(str.indexOf('HEROPY')) // -1
```

##### match()

지정한 문자에 대한 정규식 표현을 통해 존재 여부 판단 (배열 반환)

```
const str = 'Hello world!'

console.log(str.match(/^.*(?=\\s)/gi)) // ['Hello']
```

##### .padStart()

대상 문자의 길이가 지정된 길이보다 작으면
주어진 문자을 지정된 길이가 될 때까지 앞에 붙여 새로운 문자를 반환함.

```
const str = '1234567'

console.log(str.padStart(10, '0')) // '0001234567'
console.log(str) // '1234567'
```

##### .padEnd()

대상 문자의 길이가 지정된 길이보다 작으면
주어진 문자를 지정된 길이가 될떄가지 끝에 붙여 새로운 문자를 반환

```
const str = '1234567'

console.log(str.padEnd(10, '0')) // '1234500000'
console.log(str) // '1234567'

```

##### .replace()

대상 문자에서 패턴과 일치하는 부분을 교체한 새로운 문자를 반환

```
const str = 'Hello, Hello?!'

console.log(str.replace('Hello', 'Hi')) // 'Hi, Hello?!'
console.log(str.replace(/Hello/g, 'Hi')) // 'Hi, Hi?!'
console.log(str) // 'Hello, Hello?!'
```

##### .search()

대상 문자에서 정규식과 일치하는 첫 번째 인덱스(숫자)를 반환함.

```
const str = 'Hello world!'
//           012345678901

console.log(str.search(/\\s/)) // 5
```

##### .slice()

대상 문자의 일부를 추출해 새로운 문자를 반환함.
두 번째 인수 직전까지 추출하고, 두 번째 인수를 생략하면 대상 문자의 끝까지 추출함.

```
const str = 'Hello world!'
//           012345678901
//          -210987654321

console.log(str.slice(0, 5)) // 'Hello'
console.log(str.slice(6, -1)) // 'world'
console.log(str.slice(6)) // 'world!'
console.log(str) // 'Hello world!'
```

##### .split()

대상 문자를 주어진 구분자로 나눠 배열로 반환

```
const str = 'Apple, Banana, Cherry'

console.log(str.split(', ')) // ['Apple', 'Banana', 'Cherry']
```

```
const str = 'Apple'

console.log(str.split('').reverse().join('')) // elppA
```

##### .startsWith()

대상 문자가 주어진 문자로 시작하는지 여부를 반환함.
탐색할 시작 위치를 지정할 수 있다.

```
const str = 'Hello world!'
//           012345678901

console.log(str.startsWith('Hello')) // true
console.log(str.startsWith('world')) // false
console.log(str.startsWith('world', 6)) // true

```

##### .toLowerCase()

지정된 문자를 모두 소문자로 변환하여 새로운 문자를 반환

```
const str = 'Apple, Banana, Cherry'

console.log(str.toLowerCase()) // 'apple, banana, cherry'
console.log(str) // 'Apple, Banana, Cherry'
```

##### .toUpperCase()

지정된 영어 문자를 모두 대문자로 변환하여 새로운 문자를 반환

```
const str = 'Apple, Banana, Cherry'

console.log(str.toUpperCase()) // 'APPLE, BANANA, CHERRY'
console.log(str) // 'Apple, Banana, Cherry'

```

.trim()

대상 문자열에 대한 앞뒤 빈공백을 삭제하고 새로운 문자를 반환

```
const str = '   Hello world!  '

console.log(str.trim()) // 'Hello world!!'
console.log(str) // '   Hello world!  '
```

## Number

.toFixd()
숫자로 지정된 고정 소수점 표기(자릿수)까지 표현하는 문자로 반환

```
const num = 3.1415926535

console.log(num.toFixed(2)) // '3.14'
console.log(parseFloat(num.toFixed(2))) // 3.14
```

.toLocaleString()
숫자를 현지 언어 형식의 문자로 반환

```
const num = 1000000

console.log(num.toLocaleString()) // '1,000,000'
console.log(`${num.toLocaleString()}원`) // '1,000,000원'
```

Number.isInteger()

숫자가 정수(integer)인지 확인

```
const num = 123
const pi = 3.14

console.log(Number.isInteger(num)) // true
console.log(Number.isInteger(pi)) // false
```

Number.isNaN() 또는 isNaN()

주어진 값이 NaN인지 확인함.
isNaN()보다 더 엄격한 버전으로 ES6에 추가된 Number.isNaN()사용을 권장함.

```
const num1 = NaN
const num2 = 123
const str = 'Hello world'
const nul = null

console.log(Number.isNaN(num1)) // true
console.log(Number.isNaN(num2)) // false
console.log(Number.isNaN(str)) // false
console.log(Number.isNaN(nul)) // false
```

Number.parseInt() 또는 parseInt()

주어진 값(숫자, 문자)을 파싱해 특정 진수(radix)의 정수로 반환합니다.
`Number.parseInt()`는 ES6에서 전역 객체의 모듈화를 위해 추가됐습니다.
10진수가 기본값이 아니기 때문에 꼭 명시하는 것이 좋습니다!

```
const str = '3.1415926535'

// 10진수 정수로 반환!
console.log(Number.parseInt(str, 10)) // 3
console.log(Number.parseInt(num, 10)) // 3
```

다음과 같은 경우 `NaN`를 반환합니다.

- 진수 값이 `2`보다 작거나 `36`보다 큰 경우
- 공백이 아닌 첫 문자를 숫자로 변환할 수 없는 경우

Number.parseFloat() 또는 parseFloat()

주어진 값(숫자,문자)을 파싱해 부동소수점 실수로 반환함.
Number.parseFloat()는 ES6에서 전역 객체의 모듈화를 위해 추가됐습니다.

```
const str = '3.1415926535'
const num = 3.1415926535

console.log(Number.parseFloat(str)) // 3.1415926535
console.log(Number.parseFloat(num)) // 3.1415926535
```

## Math

Math.abs()
주어진 숫자의 절대값을 반환

```
console.log(Math.abs(2)) // 2
console.log(Math.abs(-2)) // 2

```

Math.ceil()
주어진 숫자를 올림을 하여 정수를 반환

```
console.log(Math.ceil(3.1415926535)) // 4

```

Math.floor()

주어진 숫자를 내림을 하여 정수를 반환

```
console.log(Math.floor(3.1415926535)) // 4

```

Math.round()

주어진 숫자를 반올림하여 정수를 반환

```
const num1 = 3.141
const num2 = 3.768

console.log(Math.round(num1)) // 3
console.log(Math.round(num2)) // 4
```

Math.max()

주어진 숫자 중 가장 큰 숫자를 반환함.

```
console.log(Math.max(1, 22, 38, 192)) // 192

```

Math.min()

주어진 숫자 중 가장 작은 숫자를 반환함.

```
console.log(Math.min(1, 22, 38, 192)) // 1

```

Math.pow()

주어진 숫자에 지정한 값을 제곱한 값을 반환

```
console.log(Math.pow(4, 2)) // 16
console.log(Math.pow(7, 2)) // 49
console.log(Math.pow(10, 3)) // 1000
```

Math.radom()

0에서 1 미만의 난수를 반환

```
console.log(Math.random()) // 0.6903810349799351

// 특정 범위의 무작위 정수를 얻는 함수
// 0~9 사이 정수
function random(min = 0, max = 10) {
  return Math.floor(Math.random() * (max - min)) + min
}

console.log(random()) // 0~9
console.log(random(11, 20)) // 11~19
console.log(random(101, 1000)) // 101~999

//// 원리! ////
// const ran = Math.random()
// const max = 5
// const min = 1
//
// console.log(ran) // 무작위 수 생성!
// console.log(ran * (max - min)) // 범위의 최댓값 만들기!
// console.log(Math.floor(ran * (max - min))) // 소수점 내림!
// console.log(Math.floor(ran * (max - min)) + min) // 범위의 최솟값 만들기!
```

## Date

`new Date()`를 통해 반환되는 인스턴스를 타임스탬프라고 함.

```
const date = new Date()
console.log(date)
// 타임스탬프 - 'Wed Sep 28 2022 10:45:41 GMT+0900 (한국 표준시)'

console.log(typeof date) // 'object'
console.log(typeof 'Wed Sep 28 2022 10:45:41 GMT+0900 (한국 표준시)') // 'string'

```

```
const d1 = new Date(2022, 11, 16, 12, 57, 30)
console.log(d1) // 'Fri Dec 16 2022 12:57:30 GMT+0900 (한국 표준시)'

const d2 = new Date('Fri Dec 16 2022 12:57:30 GMT+0900 (한국 표준시)')
console.log(d2) // 'Fri Dec 16 2022 12:57:30 GMT+0900 (한국 표준시)'
```

.getFullYear()와 .setFullYear()

날짜 인스턴스의 연도를 반환하거나 지정

```
const date = new Date()

console.log(date.getFullYear()) // 2022

date.setFullYear(2023)
console.log(date.getFullYear()) // 2023
console.log(date) // 'Thu Sep 28 2023 14:23:23 GMT+0900 (한국 표준시)'
```

.getMonth() 와 .setMonth()

날짜 인스턴스의 '월'을 반환하거나 지정함.
0부터 시작한다

```
const date = new Date()

console.log(date.getMonth()) // 8
console.log(date) // 'Wed Sep 28 2022 15:26:49 GMT+0900 (한국 표준시)'

date.setMonth(0)
console.log(date.getMonth()) // 0
console.log(date) // 'Fri Jan 28 2022 14:26:33 GMT+0900 (한국 표준시)'
```

.getDate()와 .setDate()

날짜 인스턴스의 '일'을 반환하거나 지정함.

```
const date = new Date()

console.log(date.getDate()) // 28
console.log(date) // 'Wed Sep 28 2022 15:35:14 GMT+0900 (한국 표준시)'

date.setDate(11)
console.log(date.getDate()) // 11
console.log(date) // 'Mon Sep 11 2022 12:03:40 GMT+0900 (한국 표준시)'
```

.getHours()와 .setHours()
날짜 인스턴스의 '시간'을 반환하거나 지정합니다.

```
const date = new Date()

console.log(date.getHours()) // 14
console.log(date) // 'Wed Dec 21 2022 14:23:51 GMT+0900 (한국 표준시)'

date.setHours(7)
console.log(date.getHours()) // 7
console.log(date) // 'Wed Dec 21 2022 07:23:51 GMT+0900 (한국 표준시)'
```

.getMinutes()와 .setMinutes()
날짜 인스턴스의 '분'을 반환하거나 지정합니다.

```
const date = new Date()

console.log(date.getMinutes()) // 47
console.log(date) // 'Wed Sep 28 2022 15:47:33 GMT+0900 (한국 표준시)'

date.setMinutes(2)
console.log(date.getMinutes()) // 2
console.log(date) // 'Wed Sep 28 2022 15:02:33 GMT+0900 (한국 표준시)'
```

​
.getSeconds()와 .setSeconds()
날짜 인스턴스의 '초'를 반환하거나 지정합니다.

```
const date = new Date()

console.log(date.getSeconds()) // 13
console.log(date) // 'Wed Sep 28 2022 15:50:13 GMT+0900 (한국 표준시)'

date.setSeconds(57)
console.log(date.getSeconds()) // 57
console.log(date) // 'Wed Sep 28 2022 15:50:57 GMT+0900 (한국 표준시)'
```

.getDay()

날짜 인스턴스의 '요일'을 반환함.

```
const date = new Date()
const day = date.getDay()

console.log(day) // 3
console.log(getDayKo(day)) // '수요일'

function getDayKo(day) {
  switch (day) {
    case 0: return '일요일'
    case 1: return '월요일'
    case 2: return '화요일'
    case 3: return '수요일'
    case 4: return '목요일'
    case 5: return '금요일'
    case 6: return '토요일'
  }
}
```

.getTime()와 .setTime()

유닉스 타임(UNIX Time)으로부터 날짜 인스턴스의 경과한 시간을 '밀리초(ms)'로 반환하거나 지정합니다.

유닉스 타임이란 1970.01.01 00:00:00 시간을 의미합니다.

```

const date = new Date()

console.log(date.getTime()) // 1664343325817
console.log(date) // 'Wed Sep 28 2022 15:58:05 GMT+0900 (한국 표준시)'

date.setTime(1700000000000)
console.log(date.getTime()) // 1700000000000
console.log(date) // 'Wed Nov 15 2023 07:13:20 GMT+0900 (한국 표준시)'
```

```
Date.prototype.isAfter = function (date) {
  const a = this.getTime();
  const b = date.getTime();
  return a > b;
};

const d1 = new Date("Sat Jan 01 2022 00:00:00 GMT+0900 (한국 표준시)");
const d2 = new Date("Sun Jan 01 2023 00:00:00 GMT+0900 (한국 표준시)");

console.log(d1.isAfter(d2)); // false
console.log(d2.isAfter(d1)); // true
```

.toUTCString()

날짜 인스턴스의 협정 세계시를 반환함.
협정 세계시 혹은 그리니치 평균시는 영국 런던 기점의 기준시임.
한국은 UTC 기준보다 9시간 빠릅니다.

```
console.log(new Date())
// Tue Oct 25 2022 16:29:54 GMT+0900 (한국 표준시)

console.log(new Date().toUTCString())
// Tue, 25 Oct 2022 07:29:54 GMT

```

.tolSOString()

날짜 인스턴스의 협정 세계시(UTC)를 'ISO 8601' 포맷으로 반환합니다.

'ISO 8601'는 날짜와 시간을 표현하는 국제 표준 규격입니다.

```
console.log(new Date())
// Tue Oct 25 2022 16:29:54 GMT+0900 (한국 표준시)

console.log(new Date().toISOString())
// 2022-10-25T07:29:54.000Z
```

Date.now()

유닉스 타임으로부터 메소드가 호출될 때의 경과한 시간을 '밀리초'로 반환함.

```
const time = new Date().getTime();
console.log(Date.now()); // 1664349597861
console.log(time); // 1664349597861

setTimeout(() => {
  console.log(Date.now()); // 1664349598861
  console.log(time); // 1664349597861
}, 1000);
```

```
// 현재 시간을 기준, 서로 같음!
new Date().getTime();
Date.now();

// getTime 메소드는 특정 날짜(시간)의 경과 시간을 확인 가능!
new Date("Sat Jan 01 2022 00:00:00 GMT+0900 (한국 표준시)").getTime();
Date.now();
```

## Array

.at()

대상 배열을 인덱싱함.

음수 값을 사용하면 뒤에서부터 인덱싱함

```
const arr = ['A', 'B', 'C']

console.log(arr[0]) // 'A'
console.log(arr.at(0)) // 'A'

console.log(arr[arr.length - 1]) // 'C'
console.log(arr.at(-1)) // 'C'

```

.concat()

두개의 배열을 병합하여 새로운 배열블 반환

```
const arr1 = ['A', 'B', 'C']
const arr2 = ['D', 'E', 'F']
const arr3 = arr1.concat(arr2)
// const arr3 = [...arr1, ...arr2]

console.log(arr1) // ['A', 'B', 'C']
console.log(arr2) // ['D', 'E', 'F']
console.log(arr3) // ['A', 'B', 'C', 'D', 'E', 'F']
```

.every()

대상 배열의 모든 요소가 콜백 테스트를 통과(참(Truthy)을 반환)하는지 확인합니다.

최초로 테스트가 실패하면, 이후 콜백은 실행되지 않고 `false`를 반환합니다.

```
const arr = [1, 2, 3, 4];
const isValid = arr.every((item) => item < 5);

console.log(isValid); // true
```

```
const arr = [1, 2, 3, 4];
const isValid = arr.every((item) => {
  console.log(item);
  return item < 3;
});

// 1
// 2
```

.filter()
대상 배열에서 콜백 테스트를 통과하는 모든 요소로 새로운 배열을 만들어 반환합니다.
만약 모든 요소가 테스트를 통과하지 못하면 빈 배열을 반환합니다.

```
const numbers = [1, 20, 7, 9, 104, 0, 58]
const filteredNumbers = numbers.filter(number => number < 30)

console.log(filteredNumbers) // [1, 20, 7, 9, 0]

```

```
const users = [
{ name: 'Neo', age: 85 },
{ name: 'Amy', age: 22 },
{ name: 'Lewis', age: 11 }
]
const adults = users.filter(user => user.age >= 19)
console.log(adults) // [ Neo객체, Amy객체 ]
```

.find()
대상 배열에서 콜백 테스트를 통과하는 첫 번째 요소를 반환합니다.
최초로 테스트가 통과하면, 이후 콜백은 실행되지 않습니다.
모든 테스트가 실패하면, undefined를 반환합니다.

```
const arr = [5, 8, 130, 12, 44]
const foundItem = arr.find(item => item > 10)

console.log(foundItem) // 130

const users = [
{ name: 'Neo', age: 85 },
{ name: 'Amy', age: 22 },
{ name: 'Lewis', age: 11 }
]
const foundUser = users.find(user => user.name === 'Amy')

console.log(foundUser) // { name: 'Amy', age: 22 }

```

.findIndex()
대상 배열에서 콜백 테스트를 통과하는 첫 번째 요소의 인덱스를 반환합니다.
최초로 테스트가 통과하면, 이후 콜백은 실행되지 않습니다.
모든 테스트가 실패하면, -1을 반환합니다.

```
const arr = [5, 8, 130, 12, 44]
// 0 1 2 3 4

const index = arr.findIndex(item => item > 10)

console.log(index) // 2
```

.flat()

대상 배열의 모든 하위 배열을 지정한 깊이(Depth)까지 이어붙인 새로운 배열을 반환합니다.

깊이의 기본값은 `1`입니다.

```
const arr = [1, 2, [3, 4]]

console.log(arr.flat()) // [1, 2, 3, 4]

```

```
const arr = [1, 2, [3, 4, [5, 6]]]

console.log(arr.flat()) // [1, 2, 3, 4, [5, 6]]
console.log(arr.flat(2)) // [1, 2, 3, 4, 5, 6]

```

```
const arr = [1, 2, [3, 4, [5, 6, [7, 8]]]]

console.log(arr.flat()) // [1, 2, 3, 4, [5, 6, [7, 8]]]
console.log(arr.flat(2)) // [1, 2, 3, 4, 5, 6, [7, 8]]
console.log(arr.flat(Infinity)) // [1, 2, 3, 4, 5, 6, 7, 8]

```

.forEach()
대상 배열의 길이만큼 주어진 콜백을 실행합니다.

```
const arr = ['A', 'B', 'C']

arr.forEach(item => console.log(item))

for (let i = 0; i < arr.length; i += 1) {
console.log(arr[i])
}

// 'A'
// 'B'
// 'C'
```

​
.forEach()는 중간에 반복을 멈출 수 없습니다.
반복을 멈출 수 있어야 한다면, for 반복문을 사용해야 합니다.

```
const arr = ['A', 'B', 'C']

for (let i = 0; i < arr.length; i += 1) {
if (i > 1) {
break
}
console.log(arr[i])
}
// 'A'
// 'B'
```
