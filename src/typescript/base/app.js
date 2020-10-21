var Department = /** @class */ (function () {
    // 初期化用
    // readonly: 開発者の意図を示すため
    function Department(id, name) {
        this.id = id;
        this.name = name;
        // pricate id: string
        // name: string;
        this.employees = [];
        // this.id = id
        // this.name = n;
    }
    Department.prototype.describe = function () {
        console.log("Department (" + this.id + "): " + this.name);
    };
    Department.prototype.addEmployee = function (employee) {
        // Validation etc
        this.employees.push(employee);
    };
    Department.prototype.printEmployeeInformation = function () {
        console.log(this.employees.length);
        console.log(this.employees);
    };
    return Department;
}());
var accounting = new Department("d1", "Accounting");
console.log(accounting);
accounting.addEmployee("Max");
accounting.addEmployee("Manu");
// accounting.employees[2] = "Anna";
accounting.name = "New Name";
accounting.describe();
accounting.printEmployeeInformation();
// const accountingCopy = { name: "DUMMY", describe: accounting.describe };
// // 上記でダミーとしてオブジェクトが作られたので、undefinedになる
// accountingCopy.describe();
