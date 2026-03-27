// ✅ EASY LEVEL (Ground Basics)

// (Total: 15 Questions)
// Foundation strong karne ke liye — syntax, basics, parameters, simple hoisting, function types.

// 1. Basic Functions & Parameters

// Ek simple function banao jo 2 numbers ko add kare (parameters + arguments).

function addition(a, b) {
  console.log(a + b);
}

addition(3, 5);

// Ek function banao jo naam aur age print kare.

function detail(detail1, detail2) {
  console.log(`My name is ${detail1} and my age is ${detail2}`);
}

detail("Pallav", 23);

// Ek default parameter wala function banao (country = "India").

function LiveIn(country = "India") {
  console.log(`I live in a proud ${country}`);
}

LiveIn();

// Ek required parameter missing ho toh "Missing value" print ho.

function missingVal(a, b) {
  if (a !== undefined || b !== undefined) {
    console.log("value is undefined");
  } else {
    if (isNaN(a) || isNaN(b)) console.log(`Val is Nan`);
    else console.log(`sum of two val is ${a + b}`);
  }
}

missingVal();

// Ek function banao jo unlimited numbers ka sum return kare (rest parameter).

function addAll(...val) {
  let sumOfAdd = val.reduce(function (acc, val) {
    return acc + val;
  }, 0);
  console.log(sumOfAdd);
}

addAll(2, 5, 7, 42, 23, 6, 87);

// second way

function addAll(...val) {
  let sum = 0;
  for (let i = 0; i < val.length; i++) {
    sum += val[i];
  }
  console.log(sum);
}

addAll(2, 5, 7, 42, 23, 6, 87);

// Ek function banao jo destructured parameter accept kare:

function destructured({ name = "Pallav", age = 18 } = {}) {
  console.log(`My name is ${name} and my age is ${age}`);
}

destructured();

// Ek function banao jo positional arguments se city & country print kare.

function printLocation(city, country) {
  console.log(`i live in ${city} and i'm proudly in my ${country}`);
}

printLocation("Indore", "India");

// 2. Function Types Basics

// Classic function banao jo nested function call kare.

function classic() {
  Parent();
}

function Parent() {
  console.log("parent");
  function child() {
    console.log("Child");
  }
  child();
}

classic()

// Arrow function banao jo square return kare.

let val = [2,4,3,23,12,4]

let arrow = (val) => { return val.map(v => v * v)}

console.log(arrow(val))

// Anonymous function ko variable me store karke call karo.

let Anonymous = function () { console.log("yeh yeh ")}
Anonymous();

// 3. Hoisting — Basic

// Ek function ko define hone se pehle call karke hoisting test karo.

define()

function define() {
    console.log("Yoo hoisting in function works")
}

// var variable ko use karo → baad me declare karke hoisting behavior dekho.

console.log(a)
var a = 2;

// 4. IIFE (Basics)

// Ek IIFE banao jo "App Started" print kare.

(function (){
    console.log("IIFE used")
})();

// 5. Scope Basics

// Ek global variable ko function ke andar change karo.

let counter = 0;

function updateCounter(){
    counter++;
    counter += counter;
    console.log(`counter update value ${counter}`)
}

updateCounter();
updateCounter();
updateCounter();
updateCounter();

// Ek function ke variable ko bahar access karne ki koshish karo (error expected).

// 🔵 MEDIUM LEVEL (Real Understanding)

// (Total: 15 Questions)
// Scope chain, callbacks, HOF, arrow vs normal, spread, closure intro.

// 1. Scope Chain / Nested Functions

function classic() {
  Parent();
}

function Parent() {
  console.log("parent");
  function child() {
    console.log("Child");
  }
  child();
}

classic();

// Ek nested function se outer function ka variable access karo.

function Parent() {
  let city = "Bhopal"
  function child() {
    console.log(`He lives in ${city}`);
  }
  child();
}

Parent();

// Ek code likho jisme inner function ka variable outer function use na kar sake.

function childSecret() {
  function child(){
    let secret = "Hidden"
    console.log(`child secret ${secret}`)
  }
  child(secret)
}

childSecret();

// Ek example banao jisme scope chain clearly dikhai de.


function famliyTree(){
  let grandParent = "Mohan"

  function mohanSon(){
    let child = "Shayam";

    function grandChildren(){
      let grandChild = 'Nonu'

      console.log(`my grandparent name is: ${grandParent}`)
      console.log(`my son name is: ${child}`)
      console.log(`my grandson name isz ${grandChild}`)
    }

    grandChildren()
  }
  mohanSon()
}

famliyTree();

// 2. Advanced Parameters & Arguments

// Ek function banao jo multiplyAll(2,3,4,5) → 120 return kare (rest).

function multiplyAll(...val){
  return val.reduce(function(total, num){return total * num},1)
}

console.log(multiplyAll(2,3,4,5));

// Spread operator use karke 2 arrays merge karna → function me pass karna.

function mergeArray(arr1,arr2){
  return [...arr1,...arr2]
}

console.log(mergeArray([2,3,4],[24,6,7]))

// Ek function likho jisme ek argument missing ho → default se fill ho.

function anonymousFun(name = 'guest'){
  console.log(`my name is ${name}`)
}

anonymousFun()

// 3. Function Types (Medium)

// Callback function ka example banao (setTimeout allowed).

function callBack(name, callback) {

}

// Higher-Order Function banao jo function ko parameter me accept kare.

// Ek function banao jo ek doosra function return kare (first-class function demo).

// Arrow function & normal function ka this difference test karne wala code likho.