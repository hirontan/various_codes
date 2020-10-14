// どの型になるのかわからない
let userInput: unknown;
let userName: string;

userInput = 5;
userInput = "Max";

// データ型がstringであるとわからないため、エラーが表示される。
// 回避方法として、型をチェックすると回避できる
if (typeof userInput === "string") {
  userName = userInput;
}
