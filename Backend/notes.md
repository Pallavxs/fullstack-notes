# 1. Authentication

## What is Authentication?

**Authentication = Who are you?**

It checks **user identity**.

Examples:

- Login with email & password
- Login with OTP
- Login with Google

### Real-life analogy

> Showing your **ID card** at the gate
> 

---

## Basic Authentication Flow

1. User signs up
2. Password is **hashed**
3. User logs in
4. Server verifies password
5. Server issues **JWT token**

---

# 2. Authorization

## What is Authorization?

**Authorization = What are you allowed to do?**

It checks **permissions / roles**.

Examples:

- Only admin can delete users
- Only logged-in user can update their profile

### Real-life analogy

> You entered the building (auth)
> 
> 
> But only managers can enter the server room (authorization)
> 

---

# 3. Validation

## What is Validation?

**Validation = Is the data correct?**

It checks **input correctness** before saving.

Examples:

- Email format valid?
- Password length >= 6?
- Required fields present?

---

## Types of Validation

1. **Frontend validation**
2. **Backend validation**
3. **Database validation (Mongoose)**

---

## Example: Validation using Mongoose

```jsx
email: {
type:String,
required:true,
unique:true,
match:/^[^\s@]+@[^\s@]+\.[^\s@]+$/
}

```

---

## Example: Validation using Express

```jsx
if (!email || !password) {
return res.status(400).json({message:"All fields required" });
}

```

---

## Example: Validation using express-validator

```bash
npm install express-validator

```

```jsx
const { body, validationResult } =require("express-validator");

app.post("/register",
body("email").isEmail(),
body("password").isLength({min:6 }),
(req, res) => {
const errors =validationResult(req);
if (!errors.isEmpty()) {
return res.status(400).json({errors: errors.array() });
    }
    res.send("Valid Data");
});

```

---

# 4. Verification

## What is Verification?

**Verification = Proving something is real or confirmed**

Usually happens **after authentication**

Examples:

- Email verification
- OTP verification
- Phone number verification

---

## Email Verification Flow

1. User registers
2. Server sends verification link
3. User clicks link
4. Account becomes verified

---

##



                        🧠 ---------------------- TypeScript — Full Cohort Notes -----------------------------


🔹 1. What is TypeScript?

TypeScript is a superset of JavaScript that adds:

Static typing 🧩
Better tooling (autocomplete, error detection)
Improved scalability for large apps
let name: string = "Pallav";
🔹 2. Why TypeScript?
Catches errors before runtime ⚠️
Improves code readability
Great for large projects
Strong IDE support
🔹 3. Basic Types
let age: number = 21;
let isStudent: boolean = true;
let username: string = "dev";
Arrays
let numbers: number[] = [1, 2, 3];
let names: string[] = ["A", "B"];
Tuple
let user: [string, number] = ["Pallav", 21];
🔹 4. Any vs Unknown
let data: any = "hello";   // no type checking ❌
let value: unknown = "hi"; // safer ✅
🔹 5. Functions
function add(a: number, b: number): number {
  return a + b;
}
Optional Parameter
function greet(name?: string) {
  return "Hello " + name;
}
🔹 6. Objects
let user: { name: string; age: number } = {
  name: "Pallav",
  age: 21
};
🔹 7. Type Alias
type User = {
  name: string;
  age: number;
};

let u1: User = { name: "Dev", age: 22 };
🔹 8. Interface
interface User {
  name: string;
  age: number;
}

let u2: User = { name: "Alex", age: 25 };
🔹 9. Union Types
let id: number | string;
id = 101;
id = "abc";
🔹 10. Literal Types
let direction: "left" | "right";
direction = "left";
🔹 11. Enums
enum Role {
  Admin,
  User,
  Guest
}

let r: Role = Role.Admin;
🔹 12. Type Assertion
let value: any = "hello";
let len = (value as string).length;
🔹 13. Classes
class Person {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  greet() {
    console.log("Hello " + this.name);
  }
}
🔹 14. Access Modifiers
class User {
  public name: string;
  private age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
🔹 15. Generics
function identity<T>(value: T): T {
  return value;
}

identity<string>("hello");
🔹 16. Modules (Import / Export)
// export
export const name = "TS";

// import
import { name } from "./file";
🔹 17. tsconfig.json (Important)
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "strict": true
  }
}
🔹 18. Compile TypeScript
tsc index.ts
🔹 19. Key Difference: JS vs TS
Feature	JavaScript	TypeScript
Typing	Dynamic	Static
Errors	Runtime	Compile-time
Scale	Hard	Easy