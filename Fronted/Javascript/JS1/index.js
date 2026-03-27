let obj = {
    name: "rohit",
    age: 34,
    fn: function(){
        console.log(this)
    },

    fnc: ()=>{
        console.log(this)
    }
}

console.log(obj.fn());
obj.fn()

// Callback Hell

function Alluserreturn(username,cb){
    console.log(`User name is ${username}`)
    cb()
}

function userDetails(id,cb){
    console.log(`User Id is ${id}`)
    cb()
}

function userData(id,cb){
    cb("USer exist")
}

Alluserreturn("Rohit",function(){
    userDetails(3,function(id){
        userData(id,function(data){
            console.log(data)
        })
    })
})

// Promise 

let prm = new Promise((resolve,reject) => {
    setTimeout(()=>{
        resolve();
    },3000)
})

prm.then(function(){console.log("Resolved")});
prm.catch(function(){console.log("Reject")});


// Using fetch to understand .then function

fetch('https://randomuser.me/api/').then((raw) => raw.json())
.then((data)=> console.log(data.results[0].name.first))

// async await 

function getNum() {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            let num = Math.floor(Math.random()*10)
            if(num<5){
                resolve();
            } else reject();
        },3000)
    });
};

async function abcd() {
    let v = await getNum();
    console.log(v)
}

abcd();

// Try,Catch & finally 

try{
    let a = 2;
    console.log(a);
} catch (e) {
    console.log(e.name)
} finally {
    console.log("User logged In")
}


SyntaxError
runtimerror 
functionerror 
asyncerror 

let userDatas = function data(){
    return new Promise((resolve,reject) =>{
        fetch('https://randomuser.me/api/')
        .then(raw => raw.json())
        .then(data => resolve(data.results[0].name.first))
        .catch(err => reject(err));
    })
}

async function receiveData() {
    try{
        let metaData = await userDatas();
        console.log(metaData)
     } catch {
        err => {console.error(err)}
    }
}

receiveData();


// Whether Deshboard



async function getWeatherDetail(city) {
  let apikey = '080276f9d926a0cdeca2f7fa72e2e4f6';

  try{
    let raw = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`)

    let real = await raw.json()
    return real
  } 
  catch(err){
    console.error(err)
  }
}

getWeatherDetail('anuppur')
.then((data)=> console.log(data))
.catch((err)=> console.error(err))

// Email Automation 

const emails = [
  { email: "alpha92@gmail.com" },
  { email: "bluefox17@gmail.com" },
  { email: "coder451@gmail.com" },
  { email: "sunny_cloud9@gmail.com" },
  { email: "pixelwave88@gmail.com" },
  { email: "nova_engine7@gmail.com" },
  { email: "fastlane204@gmail.com" },
  { email: "moonlight_33@gmail.com" },
  { email: "devspark56@gmail.com" },
  { email: "randombyte91@gmail.com" },
  { email: "skyline_404@gmail.com" },
  { email: "techguru22@gmail.com" },
  { email: "firefly808@gmail.com" },
  { email: "orbitx19@gmail.com" },
  { email: "matrix_user77@gmail.com" },
  { email: "codecraft12@gmail.com" },
  { email: "dataflow65@gmail.com" },
  { email: "neuron99@gmail.com" },
  { email: "hashnode44@gmail.com" },
  { email: "zenmode31@gmail.com" },
  { email: "bitshift70@gmail.com" },
  { email: "cloudnine18@gmail.com" },
  { email: "logicloop52@gmail.com" },
  { email: "binaryfox93@gmail.com" },
  { email: "darkmode11@gmail.com" },
  { email: "stacktrace66@gmail.com" },
  { email: "quantum24@gmail.com" },
  { email: "vector_x5@gmail.com" },
  { email: "runtime88@gmail.com" },
  { email: "bytecode17@gmail.com" },
  { email: "nightowl42@gmail.com" },
  { email: "syntaxerror9@gmail.com" },
  { email: "pixelated73@gmail.com" },
  { email: "loopmaster21@gmail.com" },
  { email: "devstorm60@gmail.com" },
  { email: "arrayindex49@gmail.com" },
  { email: "functioncall8@gmail.com" },
  { email: "webhook92@gmail.com" },
  { email: "frontendx14@gmail.com" },
  { email: "backendpro55@gmail.com" },
  { email: "fullstack77@gmail.com" },
  { email: "apiwizard30@gmail.com" },
  { email: "debugger19@gmail.com" },
  { email: "compiletime64@gmail.com" },
  { email: "serverless81@gmail.com" },
  { email: "microtask26@gmail.com" },
  { email: "eventloop90@gmail.com" },
  { email: "datastream13@gmail.com" },
  { email: "virtualdom58@gmail.com" }
];

function Email(emails){
  emails.map((email)=>{
    let timer = Math.floor(Math.random()*10)
    setTimeout(()=>{
      
    },timer)
  })
}

























function dataDownloading(cb){
    setTimeout(()=>{
      console.log('data is downloading')
    },2000)
    cb();
}

function downloadingFinished(cb){
  setTimeout(()=>{
      console.log("data is completed")
    },2000)
    cb();
}

function compressionStarted(cb){
  setTimeout(()=>{
      console.log("compression is started")
    },2000)
    cb();
}

function compressionDone(cb){
  setTimeout(()=>{
      console.log("compression is completed")
    },2000)
    cb();
}

function FileStarted(){
  setTimeout(()=>{
      console.log("file is processing")
    },2000)
}

function FileCompleted(){
  setTimeout(()=>{
      console.log("file is ready")
    },2000)
}


dataDownloading(downloadingFinished())



//[21:37, 3/1/2026] Naruto: data is downloading
// [21:37, 3/1/2026] Naruto: data is completed
// [21:37, 3/1/2026] Naruto: compression is started
// [21:37, 3/1/2026] Naruto: compression is completed
// [21:37, 3/1/2026] Naruto: file is processing
// [21:37, 3/1/2026] Naruto: file is ready

