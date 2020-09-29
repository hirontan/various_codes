import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { type } from "os";

// constは再代入できない
const name = "hello";

// letは再代入できる
let nameChange = "hello";
nameChange = "hello2";

// データの型を明示的に（アノテーション）
let username: string = "Hello";
let dummyNum: number = 2;
let bool: boolean = true;
let array1: boolean[] = [true, true, false];
let array2: (string | number)[] = ["hello", 1, 0];

interface NAME {
  first: string;
  last?: string | null; // ?をつけると、存在しなくても良い
}

let nameObj: NAME = { first: "Yamada", last: null };

const func1 = (x: number, y: number): number => {
  return x + y;
};

// Intersection Types（二つのタイプを結合することができる）
type PROFILE = {
  age: number;
  city: string;
};

type LOGIN = {
  username: string;
  password: string;
};

const userA: USER = {
  age: 30,
  city: "Tokyo",
  username: "xxx",
  password: "yyy",
};

type USER = PROFILE & LOGIN;

// Union Types（タイプを制限できる）
let value: boolean | number;
value = true;
value = 10;

let arrayUni: (number | string)[];
arrayUni = [0, 1, 2, "hello"]; // numberとstring以外を格納しようとするとエラーになる

// Literal Types
let company: "Facebook" | "Google" | "Amazon";
company = "Amazon";

let memory: 256 | 512;
memory = 256;

// typeof
let msg: string = "Hi";
let msg2: typeof msg;
msg2 = "hello";

let animal = { cat: "small" };
let newAnimal: typeof animal = { cat: "big cat" };

// keyof（Union Typeで取得してくれる）
type KEYS = {
  primary: string;
  secondary: string;
};
let key: keyof KEYS;
key = "primary";

// typeof + keyof
const SPORTS = {
  soccer: "Soccer",
  baseball: "Baseball",
};

let keySports: keyof typeof SPORTS;
keySports = "soccer";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
