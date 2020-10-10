console.log("コード作成!");
function add(n1, n2) {
    console.log(typeof n1);
    // if (typeof n1 !== "number" || typeof n2 !== "number") {
    //   throw new Error("入力値が正しくありません");
    // }
    return n1 + n2;
}
var number1 = 5;
var number2 = 2.8;
var result = add(number1, number2);
console.log(result);
