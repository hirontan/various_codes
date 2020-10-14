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

// 値を返さない（絶対に返さないと明示的に指定できる：never型）
//
function generateError(message: string, code: number): never {
  throw { message: message, errorCode: code };
}

const result = generateError("エラーが発生しました", 500);
console.log(result);
