"use strict";
var Department = (function () {
    function Department(n) {
        this.name = n;
    }
    return Department;
}());
var accounting = new Department("Accounting");
console.log(accounting);
