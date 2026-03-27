class Teacher{
    constructor(){
        this.student = 'oak',
        this.class = 'A'
    }

}

Teacher.prototype.group = "Red"
Teacher.prototype.student = function() {console.log("Why they are calling me?")}

let students= new Teacher();

let obj = {
    names: 'pallav',
    fnc: function(){
        console.log(this)
    }
}

obj.fnc.call();  // call  → run now + change this
obj.fnc.apply(this,[2,3,4]); // apply→ run now + change this
obj.fnc.bind(); // bind → run later + lock this

// Class expression 

let Animal = class {
    constructor(){
        this.legs = 4;
        this.hands = 2;
        this.dog = "husky",
        this.dog = "kalu"
    }

    breath(){}
    hold(){}
}

let animalDetail = new Animal();

// Inheritance

class Kekra extends Animal{
    constructor(){
        this.legs = 8;
        this.hands = 0;
    }

    swim(){}
}

let kekra = new Kekra();

// Setter & Getter

class Human {
    constructor(){
        this._age = 12;
    }

    set age(val){
        if(val<0){
            console.log("Invalid age")
            return;
        } 
        this._age = val;
    }

    get age(){
        return this._age;
    }

}

let human = new Human;
human._age = 23;


//Constructor Functions (Before ES6)

function MetaData() {
  this.name = "harsh";
}

new MetaData();

//Adding Methods Using Prototype

function MetaData(name) {
  this.name = name;
}

MetaData.prototype.speak = function () {
  console.log(this.name + " makes a sound");
};

const cat = new MetaData("Kitty");
cat.speak();

let data = [23,23,pallav,2.3,true]
console.log(data)

