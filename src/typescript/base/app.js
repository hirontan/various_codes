// オブジェクトの定義
// interface Person {
//   name: string;
//   age: number;
var add;
add = function (n1, n2) {
    return n1 + n2;
};
var Person = /** @class */ (function () {
    function Person(n) {
        this.age = 30;
        this.name = n;
    }
    Person.prototype.greet = function (phrase) {
        console.log(phrase + " " + this.name);
    };
    return Person;
}());
// let user1: Person;
var user1;
// user1 = {
//   name: "Max",
//   age: 3,
//   greet(phrase: string) {
//     console.log(phrase + " " + this.name);
//   },
// };
user1 = new Person("Max");
user1.greet("Hello I am");
console.log(user1);
