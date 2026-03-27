// let api = 'https://fakestoreapi.com/products/1'
// fetch(api).then(raw => raw.json()).then(data=>console.log(data))
// import axios from 'axios'

// function callingData(){
//     let api = 'https://fakestoreapi.com/products/1'
//     let data = axios(api)
    
    
// }

// callingData();

// Hoisiting 

// var a;
// console.log(a)
// a = 2;

// console.log(a)
// let a = 23;

// console.log(b)
// const b = 2;

console.log(add(2,4))

function add(a,b){
    return (a+b)
}

// // Logs in backend

// console.warn("Input not filled")
// console.error("error in a")
// console.log("Name has been entered!")

// // logs in user interaction

// prompt("enter your name")
// alert("Input not filled..")

for(let i=0; 1<=5; i++){
    if(i===3){
        continue;
    }
    console.log(i);
};

// Immediately invoked function

(function(a,b){
    return a + b;
})(2,4)



