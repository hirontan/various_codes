var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// ベースクラス
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
// 一つのクラスから継承できる
// サブクラス
var ITDepartment = /** @class */ (function (_super) {
    __extends(ITDepartment, _super);
    // admins: string[]
    function ITDepartment(id, admins) {
        var _this = _super.call(this, id, "IT") || this;
        _this.admins = admins;
        _this.admins = admins;
        return _this;
    }
    return ITDepartment;
}(Department));
var AccountingDepartment = /** @class */ (function (_super) {
    __extends(AccountingDepartment, _super);
    function AccountingDepartment(id, reports) {
        var _this = _super.call(this, id, "Accounting") || this;
        _this.reports = reports;
        return _this;
    }
    AccountingDepartment.prototype.addReport = function (text) {
        this.reports.push(text);
    };
    AccountingDepartment.prototype.printReports = function () {
        console.log(this.reports);
    };
    return AccountingDepartment;
}(Department));
// const accounting = new Department("d1", "Accounting");
// const accounting = new ITDepartment("d1", "Accounting");
var it = new ITDepartment("d1", ["Max"]);
// console.log(accounting);
// accounting.addEmployee("Max");
// accounting.addEmployee("Manu");
it.addEmployee("Max");
it.addEmployee("Manu");
// accounting.employees[2] = "Anna";
// accounting.name = "New Name";
it.name = "New Name";
// accounting.describe();
// accounting.printEmployeeInformation();
it.describe();
it.printEmployeeInformation();
console.log(it);
// const accountingCopy = { name: "DUMMY", describe: accounting.describe };
// // 上記でダミーとしてオブジェクトが作られたので、undefinedになる
// accountingCopy.describe();
var accounting = new AccountingDepartment("d2", []);
accounting.addReport("Something");
accounting.printReports();
