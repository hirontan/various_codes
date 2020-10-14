"use strict";
console.log("コード作成!");
function add_basic(n1, n2, showResult, phrase) {
    console.log(typeof n1);
    // if (typeof n1 !== "number" || typeof n2 !== "number") {
    //   throw new Error("入力値が正しくありません");
    // }
    var result = n1 + n2;
    if (showResult) {
        console.log(phrase + result);
    }
    else {
        return n1 + n2;
    }
}
var number1;
number1 = 5;
var number2 = 2.8;
var printResult = true;
var resultPhrase = "Result: ";
var result = add_basic(number1, number2, printResult, resultPhrase);
console.log(result);
