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

enum Role {
  ADMIN,
  READ_ONLY,
  AUTHOR,
}

const person = {
  name: "test",
  age: 30,
  hobbies: ["Sports", "Cooking"],
  role: Role.ADMIN,
};

// person.role.push("admin");
// person.role[1] = 10;

// person.role = [0, "admin", "user"];

let favoriteActivities: any[];
favoriteActivities = ["Sports", 5, true];

console.log(person.name);

for (const hobby of person.hobbies) {
  console.log(hobby);
  console.log(hobby.toUpperCase());
}

if (person.role === Role.ADMIN) {
  console.log("管理者ユーザ");
}
