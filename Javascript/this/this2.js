//this
//일반 함수는 호출 위치에 따라 this 정의
// 화살표 함수는 자신이 선언된 함수 범위에서 this 정의

const memo = {
  name: "Memo",
  normal: function () {
    console.log(this.name);
  },
  arrow: () => {
    console.log(this.name);
  },
};

memo.normal(); //Memo
memo.arrow(); //undefind

const may = {
  name: "May",
  normal: memo.normal,
  arrow: memo.arrow,
};

may.normal(); //May
may.arrow(); //undefined

function User(name) {
  this.name = name;
}

User.prototype.normal = function () {
  console.log(this.name);
};

User.prototype.arrow = () => {
  console.log(this.name);
};

const momo = new User("park");

momo.normal();
momo.arrow();

const timer = {
  name: "Park",
  timeout: function () {
    setTimeout(function () {
      console.log(this.name);
    }, 2000);
  },
};

timer.timeout();
