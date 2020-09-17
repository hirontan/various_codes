var button = document.querySelector("button");
var input1 = document.getElementById("num1"); // 絶対にNullにならない
var input2 = document.getElementById("num2"); // 絶対にNullにならない
function add(num1, num2) {
    if (typeof num1 === "number" && typeof num2 === "number") {
        return num1 + num2;
    }
    else {
        return +num1 + +num2;
    }
}
button.addEventListener("click", function () {
    console.log(add(+input1.value, +input2.value));
});
