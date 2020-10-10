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
// const ADMIN = 0;
// const READ_ONLY = 1;
// const AUTHOR = 2;
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["READ_ONLY"] = 1] = "READ_ONLY";
    Role[Role["AUTHOR"] = 2] = "AUTHOR";
})(Role || (Role = {}));
var person = {
    name: "test",
    age: 30,
    hobbies: ["Sports", "Cooking"],
    role: Role.ADMIN
};
// person.role.push("admin");
// person.role[1] = 10;
// person.role = [0, "admin", "user"];
var favoriteActivities;
favoriteActivities = ["Sports", 5, true];
console.log(person.name);
for (var _i = 0, _a = person.hobbies; _i < _a.length; _i++) {
    var hobby = _a[_i];
    console.log(hobby);
    console.log(hobby.toUpperCase());
}
if (person.role === Role.ADMIN) {
    console.log("管理者ユーザ");
}
