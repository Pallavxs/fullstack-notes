// Use rest parameters to make a function that adds unlimited numbers.

function addUnlimiteds(...num){
    let sum = 0;
    num.forEach(function (val){
        sum = sum + val;
    })
    return sum;
}

let valadd = addUnlimiteds(2,3,6,9)
console.log(valadd)

// second way

function addUnlimited(...nums){
    let sum = 0;
    for (let i = 0; i < nums.length; i++){
        sum = sum + nums[i];
    }
    return sum;
}

let val = addUnlimited(2,3,6,9,34)
console.log(val)

// third way using Reduce funtion 

function addUnlimitedNumber(...numbers){
    let ans = numbers.reduce(function(acc, val){
        return acc + val;
    },0)
    // console.log(ans)
    return ans;
}

let numData = addUnlimited(2,3,6,9,34)
console.log(numData);

// Create an IIFE that prints "I run instantly!".

(function () {
    console.log("I run instantly")
}());


// Make a nested function where the inner one prints a variable from the outer one.

function parent(){
    let a = 15;
    function child(){
        console.log(a)
    }
    child();
}

parent()

// Create an array of 5 fruits. Add one at the end and remove one from the beginning.

let arr = ['apple','mango','guava']
arr.push('gamun')
arr.unshift("tato")
arr.pop()

// Use a for loop to print all elements of an array.

let array = [2,23,23,5,2,4]
let val6 = 0;
for(let i = 0; i < array.length; i++){
    console.log(array[i])
}

// Create an object person with keys name, age, and city, and print each key’s value.

let obj = {
    name: "pallav",
    age: 18,
    city: 'Bhopal;'
}

for (let key in obj){
    console.log(obj[key]);
}

// Use setTimeout() to log "Time’s up!" after 2 seconds.

setTimeout(function (){
    console.log("Time's up")
},2000)




// 🟡 Level 2 – Functional Thinking & Logic Tasks (Intermediate)

// Write a higher-order function runTwice(fn) that takes another function and executes it two times.

function runTwice(fn) {
    runTwice2();
    runTwice2()
}

function runTwice2(){
    console.log("Yoo")
}

runTwice(runTwice2);

// Create one pure function that always returns the same output for a given input, and one impure function using a global variable.

function pure(a, b){
    console.log(a + b)
}

pure(1,2)
pure(1,2)

let global = 0;
function impure(a){
    global++;
    console.log(a + global)
}

impure(2);
impure(2);
impure(2);
impure(2);

// Write a function that uses object destructuring inside parameters to extract and print name and age.

function metaData({ name,course,year}){
    console.log(name)

}

metaData({
    name: "pallav",
    course: "Btech",
    year: 2
})

// Demonstrate the difference between normal function and arrow function when used as object methods (the this issue).

// Given an array of numbers, use map() to create a new array where each number is squared.

let arr1 = [2,3,4,5,6,7]
let arr2 = arr1.map( function (val){
    return val * val;
});

console.log(arr2)

// Use filter() to get only even numbers from an array.

let arr3 = [2,3,56,4,234]
let arr4 = arr3.filter(function (values) {
    return values % 2 !== 0;
});

// Use reduce() to find the total salary from an array of numbers [1000, 2000, 3000].

let salary = [2000,3000,1000]
let totalSalary = salary.reduce(function(acc,val){
    return acc + val;
})

// Create an array of names and use some() and every() to test a condition (e.g., all names longer than 3 chars).

let names = ['shanker','luffy']

let ans = names.some(function (val){
    return val.length > 3;
});

console.log('vaise hi every use karte hai har value kae liye')

//Create an object user and test the behavior of Object.freeze() and Object.seal() by adding/changing keys.

let user = {
    name: 'jar',
    age: 34,
    email: "jar@gmail.com"
}

// Object.freeze(user)
Object.seal(user)

user.name = "jars"
user.section = 'failed'

// Create a nested object (user → address → city) and access the city name inside it.

let object = {
    user: {
        name: 'pallav',
        address: {
            city: "bhopal"
        }
    }
};

let { city } = object.user.address;

