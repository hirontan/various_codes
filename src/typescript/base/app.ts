// constは値を変更できない
const userName = 'Max'
// userName = 'test'

// letは値を変更できる
let age = 30

age = 29

function add(a: number, b: number){
  let result
  result = a + b
  return result
}

// var はグローバルスコープか、関数スコープのみしかない
if (age >= 20){
  var isAdult = true
}

// isAdultが活きている
console.log (isAdult)

// let はブロックスコープ
if (age >= 20){
  let isAdult_let = true
}

// isAdultが活きていない
// console.log (isAdult_let)
