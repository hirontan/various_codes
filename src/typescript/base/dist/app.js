"use strict";
var Department = (function () {
    function Department(n) {
        this.name = n;
    }
    Department.prototype.describe = function () {
        console.log("Department: " + this.name);
    };
    return Department;
}());
var accounting = new Department("Accounting");
console.log(accounting);
accounting.describe();
var accountingCopy = { name: "DUMMY", describe: accounting.describe };
accountingCopy.describe();
