let btn = document.querySelector('button');
let main = document.querySelector('main');

btn.addEventListener('click',()=>{
    let div = document.createElement('div');

    let x = Math.random()*100;
    let y = Math.random()*100;
    let r = Math.random()*360;
    let c1 = Math.floor(Math.random()*366);
    let c2 = Math.floor(Math.random()*366);
    let c3 = Math.floor(Math.random()*366);

    div.style.height = 50 + 'px'; 
    div.style.width = 50 + 'px'; 
    div.style.backgroundColor = `rgb(${c1} ,${c2} ,${c3})`
    div.style.position = 'absolute';
    
    div.style.top = y +'%';
    div.style.left = x +'%';
    div.style.rotate = r+'deg'

    main.appendChild(div)
})


// let div = document.createElement('div');
//     let boxWidth = 50;
//     let boxHeight = 50;

//     let containerWidth = main.clientWidth;
//     let containerHeight = main.clientHeight;
    
//     let maxX = containerHeight - boxHeight;
//     let maxY = containerWidth - boxWidth;

//     let x = Math.random()*maxX;
//     let y = Math.random()*maxY;
//     let r = Math.random()*360;
//     let c1 = Math.floor(Math.random()*366);
//     let c2 = Math.floor(Math.random()*366);
//     let c3 = Math.floor(Math.random()*366);

//     div.style.height = maxX; 
//     div.style.width = maxY; 
//     div.style.backgroundColor = `rgb(${c1} ,${c2} ,${c3})`
//     div.style.position = 'absolute';
    
//     div.style.top = y +'%';
//     div.style.left = x +'%';
//     div.style.rotate = r+'deg'