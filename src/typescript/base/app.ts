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

// type AddFn = (a: number, b: number) => number;
// カスタム型と似たようなもの
interface AddFn {
  // 匿名メソッドのようなもの
  (a: number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
};

interface Named {
  // readonlyは初期化の時に一度だけ扱えるようになる
  readonly name: string;
}

// 一部のオブジェクトで必要な場合、インターフェースを分ける必要があるかもしれない
// classは一つしか継承できないが、インターフェースは複数継承できる
interface Greetable extends Named {
  greet(phrase: string): void;
}

class Person implements Greetable {
  // readonlyと推測されている
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
