// let h1 = document.querySelector("h1")
// let h2 = document.querySelector('h2')
// let btn = document.querySelector('button')
// h1.innerHTML = "Y0o i changed that string"

// let counterUp = 0;
// let counterdown = 0;

// btn.addEventListener('click',function (){
//     counterUp ++;
//     h1.innerHTML = counterUp;
//     console.log(counterUp)
// })

// btn.addEventListener('click',function (){
//     counterdown--;
//     h2.innerHTML = counterdown;
//     console.log(counterdown)
// })

// let randomNum = Math.floor(Math.random() * 100);
// console.log(randomNum)

// let box = document.querySelector('#box')

// btn.addEventListener('click',function(){
  //     var c1 = Math.floor(Math.random()*256);
  //     var c3 = Math.floor(Math.random()*256);
  //     var c2 = Math.floor(Math.random()*256);
  
  //     box.style.backgroundColor = `rgb(${c1}, ${c2}, ${c3})`
  // })
  
  // var arr = ["Sarthak", "Sumit", "Rohan", "Suvik", "Lorra"];
  
  // btn.addEventListener("click", function () {
    //   var a = Math.floor(Math.random() * arr.length);
    //   console.log(arr[a]);
    // });
    
    const iplData = [
      {
        season: 2008,
        winner: "Rajasthan Royals",
        runnerUp: "CSK",
        finalVenue: "DY Patil Stadium, Navi Mumbai",
        topScorer: "Shaun Marsh",
        winnerColor: "#004B8D" // Royal Blue
      },
      {
        season: 2010,
        winner: "Chennai Super Kings",
        runnerUp: "MI",
        finalVenue: "DY Patil Stadium, Navi Mumbai",
        topScorer: "Sachin Tendulkar",
        winnerColor: "#F7C600" // CSK Yellow
      },
      {
        season: 2012,
        winner: "Kolkata Knight Riders",
        runnerUp: "CSK2",
        finalVenue: "MA Chidambaram Stadium, Chennai",
        topScorer: "Chris Gayle",
        winnerColor: "#3A225D" // KKR Purple
      },
      {
        season: 2014,
        winner: "Kolkata Knight Riders",
        runnerUp: "Kings XI Punjab",
        finalVenue: "M. Chinnaswamy Stadium, Bengaluru",
        topScorer: "Robin Uthappa",
        winnerColor: "#3A225D" // KKR Purple
      },
      {
        season: 2016,
        winner: "Sunrisers Hyderabad",
        runnerUp: "Royal Challengers Bangalore",
        finalVenue: "M. Chinnaswamy Stadium, Bengaluru",
        topScorer: "Virat Kohli",
        winnerColor: "#F25C19" // SRH Orange
      },
      {
        season: 2017,
        winner: "Mumbai Indians",
        runnerUp: "Rising Pune Supergiant",
        finalVenue: "Rajiv Gandhi Intl. Stadium, Hyderabad",
        topScorer: "David Warner",
        winnerColor: "#004BA0" // MI Blue
      },
      {
        season: 2018,
        winner: "Chennai Super Kings",
        runnerUp: "Sunrisers Hyderabad",
        finalVenue: "Wankhede Stadium, Mumbai",
        topScorer: "Kane Williamson",
        winnerColor: "#F7C600" // CSK Yellow
      },
      {
        season: 2019,
        winner: "Mumbai Indians",
        runnerUp: "Chennai Super Kings",
        finalVenue: "Rajiv Gandhi Intl. Stadium, Hyderabad",
        topScorer: "David Warner",
        winnerColor: "#004BA0" // MI Blue
      },
      {
        season: 2020,
        winner: "Mumbai Indians",
        runnerUp: "Delhi Capitals",
        finalVenue: "Dubai International Stadium",
        topScorer: "KL Rahul",
        winnerColor: "#004BA0" // MI Blue
      },
      {
        season: 2022,
        winner: "Gujarat Titans",
        runnerUp: "Rajasthan Royals",
        finalVenue: "Narendra Modi Stadium, Ahmedabad",
        topScorer: "Jos Buttler",
        winnerColor: "#0A1C2E" // GT Dark Blue/Gold
      }
    ];
    
    let h1 = document.querySelector('h1');
    let main = document.querySelector('main');
    let btn = document.querySelector('button');
    
    btn.addEventListener('click',function(){
      let winner = iplData[Math.floor(Math.random()*iplData.length)];
      h1.innerHTML = winner.runnerUp;
      main.style.backgroundColor = winner.winnerColor;
    
})

