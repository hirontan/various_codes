let appId = "abc";

let age: number;
age = 30;

const userName2 = "Max";

console.log(userName2);

// クリックする
const button = document.querySelector("button")!;
button.addEventListener("click", () => {
  console.log("Clicked");
});

function clickHandler(message: string, age: string) {
  // let userName='Max'
  console.log("Clicked: " + message + " age:" + age);
}

if (button) {
  button.addEventListener(
    "click",
    clickHandler.bind(null, "You're welcome!", "30")
  );
}

function add(n1: number, n2: number) {
  if (n1 + n2 > 0) {
    return n1 + n2;
  }
  return;
}
