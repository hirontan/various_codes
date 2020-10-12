// 型推論で問題ない場合は、明示的に書かなくても良い
function add(n1: number, n2: number): number {
  return n1 + n2;
}

// 何も返さない（void型）
function printR(num: number): void {
  console.log("Result: " + num);
}

// function printR(num: number): undefined {
//   console.log("Result: " + num);
//   return;
// }

// voidの関数はundefined

let combineValues: (a: number, b: number) => number;

combineValues = add;
// エラーになる
// combineValues = 5;

console.log(combineValues(8, 8));

console.log(printR(add(5, 12)));
