// SECTION 1: Objects and OOPS Thinking (Foundation)
// 	1.	Create a user object that stores name and email and has a login method which prints “User logged in”.
// 	2.	Imagine you now have 5 users.
// First, think how you would manage them without using a class.
// Then convert the same logic using a class and observe how the code becomes cleaner. Write code for both approaches.
// 	3.	Create a product object that stores name and price and has a method which returns the final price after discount.

// The goal of this section is to understand why keeping data and behavior together makes code easier to manage.


// 	1.	Create a user object that stores name and email and has a login method which prints “User logged in”.
// 	2.	Imagine you now have 5 users.

let obj = {
    name: 'Pallav',
    email: "pallavshrivastava84@gmail.com",
    fnc: function(){
        console.log("Logged In")
    }
}


// First, think how you would manage them without using a class.
// Then convert the same logic using a class and observe how the code becomes cleaner. Write code for both approaches.

class MetaData{
    constructor(name,email){
        this.name = name,
        this.email = email
    }

    LoggedIn() { console.log("User logged In! ")}
}

let data1 = new MetaData("Pallav","adjwjd@gmail.com");
let data2 = new MetaData("ram","adjwjdawd@gmail.com")
let data3 = new MetaData("ROn","awd@gmail.com");
let data4 = new MetaData("Luffy","Luffy@gmail.com");
let data5 = new MetaData("Sanji","Ladiad@gmail.com");

// 	3.	Create a product object that stores name and price and has a method which returns the final price after discount.

let product = {
    name: 'Patanjali',
    price: 2000,
    finalDiscount: function(){
        return this.price - 300;
    }
}

product.finalDiscount();

// ⸻

// SECTION 2: Classes and Objects
// 	4.	Create a Car class with the following:
// brand
// speed
// a drive method that prints the car brand and speed
// 	5.	Create two different car objects from the same class and verify that their data is different.
// 	6.	Answer this in your own words:
// If classes did not exist, how would you write this logic and what problems might occur when the project becomes large?

class Car{
    constructor(brand,speed){
        this.brand = brand,
        this.speed = speed
    }

    drive(){ return `Car brand: ${this.brand} and it's speed is - ${this.speed}` }
}

let carDetail = new Car("Toyota",300);
let carDetail2 = new Car("Mahindra",250);
carDetail2.drive();

// ⸻

// SECTION 3: Constructor and this keyword
// 	7.	Create a Student class whose constructor accepts name and roll number.
// Add a method introduce that prints both values.
// 	8.	Inside the constructor, set values using this.
// Then try removing this and notice what error occurs and why.
// 	9.	Create an object with two methods:
// One method using a normal function
// One method using an arrow function

// Inside both, print this and observe the difference.

// The goal is to clearly understand how this works and when it changes.

class Student{
    constructor(name,rollnumber){
        this.name = name,
        this.rollnumber = rollnumber
    }

    studentDetails() {return `Student name is ${this.name} and his roll number is - ${this.rollnumber} `}
}

let fetchStudentDetails = new Student("Ranky",2202904041);
fetchStudentDetails.studentDetails();

// 	9.	Create an object with two methods:
// One method using a normal function
// One method using an arrow function

let user = {
    name: "Ranky",
    role: "Student",

    // Normal function
    normalMethod: function () {
        return `Normal → Name: ${this.name}, Role: ${this.role}`;
    },

    // Arrow function
    arrowMethod: () => {
        return `Arrow → Name: ${this.name}, Role: ${this.role}`;
    }
};

user.normalMethod();
user.arrowMethod();

// ⸻

// SECTION 4: Constructor Functions and Prototypes
// 	10.	Create a User constructor function (do not use class syntax).
// 	11.	Add a login method in two ways:
// First, inside the constructor
// Then, move the method to the prototype
// 	12.	Create two User objects and compare their login methods using equality.
// Explain why the result is true or false.

// The purpose here is to understand how prototypes help share behavior efficiently.

function User(name,email){
    this.name = name,
    this.email = email

    this.UserLoggedIn = function(){
        console.log("User LoggedIn")
    }
}

// User.prototype.UserLoggedIn(function(){
//     console.log("User logged In")
// })

let user1 = new User("Rocky","rocky@gmail.com");
let user2 = new User("Jon snow","jon@gmail.com");


// ⸻

// SECTION 5: call, apply, bind
// 	13.	Create a function that prints this.name.
// 	14.	Create an object that contains a name property.

// Use call to run the function using the object
// Use apply to run the function using the object
// Use bind to create a new function and then call it
// 	15.	Borrow a method from one object and run it for another object using call.

// The goal is to understand how this can be manually controlled.


function ContainsName(){
    console.log(this.name);
}

let printName = {
    name: "Lomlo",
}

ContainsName.call(printName);
ContainsName.apply(printName);
let boundPrintName = ContainsName.bind(printName);
boundPrintName();
