//7. Ask user’s age and check if eligible to vote
// If age >= 18 → “Eligible”, else → “Not eligible”

// let age = prompt("Age apni bata mujhe dalle ");

// if (null === null ){
//     console.log("Kuch likhlo")
// } else {
//     if(age.trim() === ""){
//         console.log("data is empty")
//     } else {
//         age = Number(age);
//         if (isNaN(age)){
//             console.log("pls enter a number..")
//         } else {
//             if (0 < )
//         }
//     }
// }

// ----------------- $ -----------------------

// 8. Print multiplication table of 5
// Use loop to print 5 × 1 to 5 × 10.

// for(i = 1; i < 11; i++){
//     console.log(`5 * ${i} = ${5 * i}`)
// }

// ----------------- $ -----------------------

// 9. Count how many numbers between 1 and 15 are greater than 8
// Loop and count conditionally

// let count = 0;

// for (let i=1; i < 16; i++){
//     if (i > 8){
//         count++
//         console.log(count);
//     }
// }

// ----------------- $ -----------------------

// 10. Ask user for password and print access status
// Hardcoded correct password. Compare with user input.

// let password = "yoo yoo"

// let pass = prompt("Enter your password")

// if (pass === null){
//     console.error("You cancelled it..")
// } else {
//     if (pass.trim() === password){
//         console.log("Matched");
//     } else console.log("Unmatched")
// }

// ----------------- $ -----------------------

// Level 2 – Slightly Tougher but Logical
// 11. Allow only 3 attempts to enter correct password
// If user gets it right early, stop. If not → “Account locked”

// let attempts = 0;
// let khulgaya = false;
// let pass2 = "Khulja"

// let password1 = prompt("password batana apna");
// attempts ++;

// if (password1 === pass2) khulgaya = true;

// while (password1 !== pass2){
//     if (attempts === 3) {
//         console.error("Account Locked");
//         break;
//     }
//     password1 = prompt("password batana apna");
//     if (password1 === pass2) khulgaya = true;
//     attempts++; 
// }

// if (khulgaya === true) console.log("Account Opened")

// Second way to write exect same code

// let attempt = 0;
// let sahipass = "chadibhai"

// let passwords = prompt("jaldi sae password de")
// attempt++;

// while (attempt < 3 && sahipass !== passwords) {
//     passwords = prompt("jaldi sae password de")
//     attempt++;
// }

// if (attempt === 3 && sahipass !== passwords){
//     console.error("Account locked");
// } else console.log("DOne")

// ----------------- $ -----------------------

// 12. Ask user for words until they type “stop”. Count how many times they typed “yes”
// Loop until "stop" is typed. Count "yes".

// let words = prompt("Word bolo")
// let counter = 0;

// while(words !== "stop"){
//     if (words === "yes") counter++
//     words = prompt("Word bolo")
// }

// console.log(`total times use of yes count is: ${counter}`)

// ----------------- $ -----------------------

// 13. Print numbers divisible by 7 from 1 to 50
// Use modulo % and loop.

for (let i = 1; i < 51; i++) {
    if (i % 7 === 0){
        console.log(i);
    }
}

// ----------------- $ -----------------------

// 14. Sum of all odd numbers from 1 to 30
// Add only odd numbers. Print final sum.

// let sum = 0;

// for (let i = 1; i < 31; i++){
//     if (i % 2 !== 0){
//         sum = sum + i;
//     }
// }

// console.log(sum);

// ----------------- $ -----------------------

// 15. Keep asking number until user enters an even number
// Use while loop. Stop only if input is even.

// let num = +prompt("Number do");

// while (num % 2 !== 0){
//     num = +prompt("Number do");
// }

// ----------------- $ -----------------------

// 16. Print numbers between two user inputs
// Input start and end using prompt() → print all between.

// let start = +prompt("Start");
// let end = +prompt("End");

// if(start > end ) console.error("Start can not be bigger than end")

// for (let i = start; i < end; i++){
//     console.log(i)
// }

// ----------------- $ -----------------------

// 17. Print only first 3 odd numbers from 1 to 20
// Use loop. Stop with break after 3 odd prints.

// let counter = 0;

// for (let i = 1; i < 21; i++){
//     if(counter === 3) break;
//     if (i%2 !== 0){
//         console.log(i)
//         counter++;
//     }
// }

// ----------------- $ -----------------------

// 18. Ask user 5 numbers. Count how many are positive
// Use loop + condition + counter.

// let counter = 0;

// for (let i = 1; i < 6; i++) {
//     let num = +prompt("number do")
//     if (num >= 0) counter++;
// }

// console.log(`Total positive numbers are ${counter}`)

// ----------------- $ -----------------------

// 19. ATM Simulator – Allow 3 withdrawals
// Start with ₹1000 balance. Ask withdrawal amount 3 times.
// If enough balance → deduct
// Else → print “Insufficient balance”

// let balance = 1000;
// let counter = 0;
// let flag = false;

// while (balance > 0 && counter !== 3){
//     let withdraw = +prompt("Kitne paise chahiye tumhe")
//     counter++;
//     console.log(withdraw)
//     if (withdraw <= balance) balance -= withdraw;
//     else {
//         flag = true;
//         break;
//     }
// }

// if (flag === true){
//     console.log("Insufficient Balance")
// }

// console.log(`Balance : ${balance}`)

let first = prompt("Give me first val")
let second = prompt("Give me second val")
let firstnum = Number(first)
let secondnum = Number(second)

function sumOfTwo(a,b){
    return a + b;
}

let sum = sumOfTwo(firstnum,secondnum)
console.log(sum)