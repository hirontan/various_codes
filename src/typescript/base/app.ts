class Department {
  name: string;

  // 初期化用
  constructor(n: string) {
    this.name = n;
  }

  describe(this: Department) {
    console.log("Department: " + this.name);
  }
}

const accounting = new Department("Accounting");

console.log(accounting);

accounting.describe();

const accountingCopy = { name: "DUMMY", describe: accounting.describe };

// 上記でダミーとしてオブジェクトが作られたので、undefinedになる
accountingCopy.describe();
