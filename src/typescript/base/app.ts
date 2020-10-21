// ベースクラス
class Department {
  // pricate id: string
  // name: string;

  // 外部からはアクセスできないけど、継承した先には利用できる
  protected employees: string[] = [];

  // 初期化用
  // readonly: 開発者の意図を示すため
  constructor(private readonly id: string, public name: string) {
    // this.id = id
    // this.name = n;
  }

  describe(this: Department) {
    console.log(`Department (${this.id}): ${this.name}`);
  }

  addEmployee(employee: string) {
    // Validation etc
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

// 一つのクラスから継承できる
// サブクラス
class ITDepartment extends Department {
  // admins: string[]
  constructor(id: string, private admins: string[]) {
    super(id, "IT");
    this.admins = admins;
  }
}

class AccountingDepartment extends Department {
  constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
  }

  addReport(text: string) {
    this.reports.push(text);
  }

  printReports() {
    console.log(this.reports);
  }

  addEmployee(name: string) {
    if (name === "Max") {
      return;
    }

    this.employees.push(name);
  }
}

// const accounting = new Department("d1", "Accounting");
// const accounting = new ITDepartment("d1", "Accounting");
const it = new ITDepartment("d1", ["Max"]);

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

const accounting = new AccountingDepartment("d2", []);
accounting.addReport("Something");
accounting.printReports();

accounting.addEmployee("Max");
accounting.addEmployee("Manu");

accounting.printEmployeeInformation();
