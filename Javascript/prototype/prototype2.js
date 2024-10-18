function User(first, last) {
  this.firstName = first;
  this.lastName = last;
}
User.prototype.getFullname = function () {
  return `${this.firstName} ${this.lastName}`;
};

const neo = new User("good", "park");
const amy = new User("Amy", "Cliarke");
const gogo = new User("Go", "Away");

console.log(neo.getFullname());
console.log(amy);
console.log(gogo);
