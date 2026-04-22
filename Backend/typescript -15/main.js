"use strict";
// TypeScript Cohort Notes - Practical Code
// 1. Basic Types
let username = "Pallav";
let age = 21;
let isStudent = true;
console.log(username, age, isStudent);
// 2. Arrays
let numbers = [1, 2, 3, 4];
let names = ["A", "B", "C"];
console.log(numbers, names);
// 3. Tuple
let userTuple = ["Pallav", 21];
console.log(userTuple);
// 4. Any vs Unknown
let data = "hello";
data = 10; // allowed
let value = "hi";
// value.toUpperCase(); ❌ Error
if (typeof value === "string") {
  console.log(value.toUpperCase()); // ✅ safe
}
// 5. Functions
function add(a, b) {
  return a + b;
}
console.log(add(5, 3));
// Optional parameter
function greet(name) {
  return "Hello " + (name || "Guest");
}
console.log(greet());
console.log(greet("Pallav"));
// 6. Objects
let userObj = {
  name: "Pallav",
  age: 21,
};
console.log(userObj);
let u1 = { name: "Dev", age: 22 };
console.log(u1);
let u2 = { name: "Alex", age: 25 };
console.log(u2);
// 9. Union Types
let id;
id = 101;
id = "ABC123";
console.log(id);
// 10. Literal Types
let direction;
direction = "left";
console.log(direction);
// 11. Enum
var Role;
(function (Role) {
  Role[(Role["Admin"] = 0)] = "Admin";
  Role[(Role["User"] = 1)] = "User";
  Role[(Role["Guest"] = 2)] = "Guest";
})(Role || (Role = {}));
let role = Role.Admin;
console.log(role);
// 12. Type Assertion
let someValue = "TypeScript";
let strLength = someValue.length;
console.log(strLength);
// 13. Classes
class Person {
  name;
  constructor(name) {
    this.name = name;
  }
  greet() {
    console.log("Hello " + this.name);
  }
}
let p1 = new Person("Pallav");
p1.greet();
// 14. Access Modifiers
class UserClass {
  name;
  age;
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  getAge() {
    return this.age;
  }
}
let user1 = new UserClass("Dev", 23);
console.log(user1.name);
console.log(user1.getAge());
// 15. Generics
function identity(value) {
  return value;
}
console.log(identity("Hello"));
console.log(identity(100));
// 16. Modules (example)
// export const appName = "TypeScript App";
// import { appName } from "./file";
// 17. Simple Test Run
console.log("TypeScript setup is working 🚀");
