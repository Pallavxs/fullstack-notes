function orderPizza(food, callback){
    console.log("Order received:",food)
    setTimeout(()=>{
       callback();
    },1000);
}

function preparingFood(food, callback){
    console.log("Preparing food:",food)
    setTimeout(()=>{
        callback();
    },1000);
}

function servingFood(food, callback){
    console.log("Serving food:",food)
    setTimeout(()=>{
        callback();
    },1000);
}

orderPizza("Pizza",function(){
    preparingFood("Pizza",function(){
        servingFood("Pizza",function(){
            console.log("Pizza server successfully!")
        })
    })
})

// Promise + fetch 

// Problem: Fetch User → Fetch Posts
// Use the API https://jsonplaceholder.typicode.com

// Tasks

// Fetch a user
// After getting the user, fetch that user’s posts
// Print the user name
// Print the titles of the posts


async function getData() {
    let raw = await fetch("https://jsonplaceholder.typicode.com/users/1")
    let user = await raw.json();


    console.log("User Id:",user.name);

    // Get post data

    let response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
    let posts = await response.json();

    posts.forEach(post => {
        console.log(post.title)
    });
    
}

getData();

// Promise Question 

function withdraw(amount){
    return new Promise((resolve,reject)=>{
        if(amount <= 1000){
            
        }
    })
}



