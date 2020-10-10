// const person: {
//   name: string;
//   age: number;
// } = {
//   name: "test",
//   age: 30,
// };

const person = {
  name: "test",
  age: 30,
  hobbies: ["Sports", "Cooking"],
};

let favoriteActivities: string[];
favoriteActivities = ["Sports"];

console.log(person.name);

for (const hobby of person.hobbies) {
  console.log(hobby);
  console.log(hobby.toUpperCase());
}
