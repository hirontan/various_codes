// ベースクラス
abstract class Department {
  static fiscalYear = 2020;
  // pricate id: string
  // name: string;

  // 外部からはアクセスできないけど、継承した先には利用できる
  protected employees: string[] = [];

  static createEmployee(name: string) {
    return { name: name };
  }

  // 初期化用
  // readonly: 開発者の意図を示すため
  constructor(protected readonly id: string, public name: string) {
    // this.id = id
    // this.name = n;

    // staticプロパティはインスタンスからはアクセスできない。
    // もしアクセスするときは下記で行う
    // console.log(this.fiscalYear);
    console.log(Department.fiscalYear);
  }

  abstract describe(this: Department): void;
  // console.log(`Department (${this.id}): ${this.name}`);

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

  describe() {
    console.log("IT部門 - ID; " + this.id);
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;
  private static instance: AccountingDepartment;

  // カプセル化のような仕組み
  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("レポートが見つかりません");
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error("正しい値を設定してください");
    }
    this.addReport(value);
  }

  private constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
    this.lastReport = reports[0];
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new AccountingDepartment("d2", []);
    return this.instance;
  }

  describe() {
    console.log("会計部門 - ID: " + this.id);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
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

const employee1 = Department.createEmployee("Max");
console.log(employee1, Department.fiscalYear);

// const accounting = new Department("d1", "Accounting");
// const accounting = new ITDepartment("d1", "Accounting");
const it = new ITDepartment("d1", ["Max"]);

// Math.PI
// Math.pow;

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

// const accounting = new AccountingDepartment("d2", []);
const accounting = AccountingDepartment.getInstance();
const accounting2 = AccountingDepartment.getInstance();

// シングルトンパターンを使っているので、オブジェクトは同じ
console.log(accounting, accounting2);

accounting.mostRecentReport = "レポート";
accounting.addReport("Something");
console.log(accounting.mostRecentReport);
accounting.printReports();

accounting.addEmployee("Max");
accounting.addEmployee("Manu");

// accounting.printEmployeeInformation();

accounting.describe();
