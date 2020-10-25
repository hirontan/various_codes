// オブジェクトの定義
// interface Person {
//   name: string;
//   age: number;

//   greet(phrase: string): void;
// }

// type キーワードを使って、カスタム型にエイリアス名を付けられる
// interfaceはオブジェクトのみで扱えたが、typeはユニオンなど様々な型を定義することができる
// type Person = {
//   name: string;
//   age: number;

//   greet(phrase: string): void;
// };

interface Greetable {
  name: string;
  greet(phrase: string): void;
}

class Person implements Greetable {
  name: string;
  age = 30;

  constructor(n: string) {
    this.name = n;
  }

  greet(phrase: string) {
    console.log(phrase + " " + this.name);
  }
}

// let user1: Person;

let user1: Greetable;

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
