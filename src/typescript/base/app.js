// const person: {
//   name: string;
//   age: number;
// } = {
//   name: "test",
//   age: 30,
// };
// const person: {
//   name: string;
//   age: number;
//   hobbies: string[];
//   role: [number, string, boolean];
// } = {
//   name: "test",
//   age: 30,
//   hobbies: ["Sports", "Cooking"],
//   role: [2, "author", true],
// };
var ADMIN = 0;
var READ_ONLY = 1;
var AUTHOR = 2;
var person = {
    name: "test",
    age: 30,
    hobbies: ["Sports", "Cooking"],
    role: ADMIN
};
// person.role.push("admin");
// person.role[1] = 10;
// person.role = [0, "admin", "user"];
var favoriteActivities;
favoriteActivities = ["Sports"];
console.log(person.name);
for (var _i = 0, _a = person.hobbies; _i < _a.length; _i++) {
    var hobby = _a[_i];
    console.log(hobby);
    console.log(hobby.toUpperCase());
}
if (person.role === ADMIN) {
    console.log("管理者ユーザ");
}
