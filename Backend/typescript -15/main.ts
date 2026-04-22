// TypeScript Cohort Notes - Practical Code

// 1. Basic Types
let username: string = "Pallav";
let age: number = 21;
let isStudent: boolean = true;

console.log(username, age, isStudent);

// 2. Arrays
let numbers: number[] = [1, 2, 3, 4];
let names: string[] = ["A", "B", "C"];

console.log(numbers, names);

// 3. Tuple
let userTuple: [string, number] = ["Pallav", 21];
console.log(userTuple);

// 4. Any vs Unknown
let data: any = "hello";
data = 10; // allowed

let value: unknown = "hi";
// value.toUpperCase(); ❌ Error
if (typeof value === "string") {
  console.log(value.toUpperCase()); // ✅ safe
}

// 5. Functions
function add(a: number, b: number): number {
  return a + b;
}

console.log(add(5, 3));

// Optional parameter
function greet(name?: string): string {
  return "Hello " + (name || "Guest");
}

console.log(greet());
console.log(greet("Pallav"));

// 6. Objects
let userObj: { name: string; age: number } = {
  name: "Pallav",
  age: 21
};

console.log(userObj);

// 7. Type Alias
type User = {
  name: string;
  age: number;
};

let u1: User = { name: "Dev", age: 22 };
console.log(u1);

// 8. Interface
interface IUser {
  name: string;
  age: number;
}

let u2: IUser = { name: "Alex", age: 25 };
console.log(u2);

// 9. Union Types
let id: number | string;
id = 101;
id = "ABC123";

console.log(id);

// 10. Literal Types
let direction: "left" | "right";
direction = "left";

console.log(direction);

// 11. Enum
enum Role {
  Admin,
  User,
  Guest
}

let role: Role = Role.Admin;
console.log(role);

// 12. Type Assertion
let someValue: any = "TypeScript";
let strLength: number = (someValue as string).length;
console.log(strLength);

// 13. Classes
class Person {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  greet(): void {
    console.log("Hello " + this.name);
  }
}

let p1 = new Person("Pallav");
p1.greet();

// 14. Access Modifiers
class UserClass {
  public name: string;
  private age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  getAge(): number {
    return this.age;
  }
}

let user1 = new UserClass("Dev", 23);
console.log(user1.name);
console.log(user1.getAge());

// 15. Generics
function identity<T>(value: T): T {
  return value;
}

console.log(identity<string>("Hello"));
console.log(identity<number>(100));

// 16. Modules (example)
// export const appName = "TypeScript App";
// import { appName } from "./file";

// 17. Simple Test Run
console.log("TypeScript setup is working 🚀");