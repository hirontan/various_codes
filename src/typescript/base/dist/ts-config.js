"use strict";
var appId = "abc";
var age;
age = 30;
var userName2 = "Max";
console.log(userName2);
var button = document.querySelector("button");
button.addEventListener("click", function () {
    console.log("Clicked");
});
function clickHandler(message, age) {
    console.log("Clicked: " + message + " age:" + age);
}
if (button) {
    button.addEventListener("click", clickHandler.bind(null, "You're welcome!", "30"));
}
function add(n1, n2) {
    if (n1 + n2 > 0) {
        return n1 + n2;
    }
    return;
}
