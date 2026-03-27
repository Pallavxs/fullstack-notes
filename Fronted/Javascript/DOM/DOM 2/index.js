let h3 = document.querySelector('h3') 
let btn = document.querySelector('button')
let bar = document.getElementById('bar')

let grow = 0;

btn.addEventListener('click',function(){
    btn.style.pointerEvents = "none";
    
    let set = setInterval(function(){
        grow++;
        h3.innerHTML = grow+"%";
        bar.style.width = grow+"%";
    },50)

    setTimeout(function(){
        clearInterval(set)
        btn.style.opacity = 0.1;
        btn.innerHTML = "Downloaded"
    },5000)


})
