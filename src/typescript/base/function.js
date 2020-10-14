"use strict";
// 型推論で問題ない場合は、明示的に書かなくても良い
function add(n1, n2) {
    return n1 + n2;
}
// 何も返さない（void型）
function printR(num) {
    console.log("Result: " + num);
}
// function printR(num: number): undefined {
//   console.log("Result: " + num);
//   return;
// }
// voidの関数はundefined
// void型を返り値に設定しているとreturn文を書いても何も返ってこない
function addAndHandle(n1, n2, cb) {
    var result = n1 + n2;
    cb(result);
}
addAndHandle(10, 20, function (result) {
    console.log(result);
    return result;
});
var combineValues;
combineValues = add;
// エラーになる
// combineValues = 5;
console.log(combineValues(8, 8));
console.log(printR(add(5, 12)));
