var user1;
user1 = {
    name: "Max",
    age: 3,
    greet: function (phrase) {
        console.log(phrase + " " + this.name);
    }
};
user1.greet("Hello I am");
