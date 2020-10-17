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
var add = function (a, b) { return a + b; };
var printOutput = function (output) {
    console.log(output);
};
printOutput(add(2, 5));
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
