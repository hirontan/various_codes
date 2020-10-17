var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// constは値を変更できない
var userName = "Max";
// userName = 'test'
// letは値を変更できる
var age = 30;
age = 29;
// function add(a: number, b: number){
//   let result
//   result = a + b
//   return result
// }
// const add = (a: number, b: number) => {
//   return a + b;
// };
// 一つの式だけを利用する場合は、{}とreturnを省略できる
// デフォルト値は右のパラメータのみ利用できる
var add = function (a, b) {
    if (b === void 0) { b = 1; }
    return a + b;
};
var printOutput = function (output) {
    console.log(output);
};
// printOutput(add(2, 5));
printOutput(add(2));
var button = document.querySelector("button");
if (button) {
    button.addEventListener("click", function (event) {
        console.log(event);
    });
}
// var はグローバルスコープか、関数スコープのみしかない
if (age >= 20) {
    var isAdult = true;
}
// isAdultが活きている
console.log(isAdult);
// let はブロックスコープ
if (age >= 20) {
    var isAdult_let = true;
}
// isAdultが活きていない
// console.log (isAdult_let)
var hobbies = ["Sports", "Cooking"];
var activeHobbies = ["Hiking"];
// スプレッド演算子（中身を取り出して、リストとして活用する。取り出した値を個別の扱いとしてくれる）
activeHobbies.push.apply(activeHobbies, hobbies);
var person = {
    name: "Max",
    age: 30
};
var copiedPerson = __assign({}, person);
