class Department {
  // pricate id: string
  // name: string;
  private employees: string[] = [];

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

const accounting = new Department("d1", "Accounting");

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
