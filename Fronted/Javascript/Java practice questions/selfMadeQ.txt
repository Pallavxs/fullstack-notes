✅ EASY LEVEL (Ground Basics)

(Total: 15 Questions)
Foundation strong karne ke liye — syntax, basics, parameters, simple hoisting, function types.

1. Basic Functions & Parameters

Ek simple function banao jo 2 numbers ko add kare (parameters + arguments).

Ek function banao jo naam aur age print kare.

Ek default parameter wala function banao (country = "India").

Ek required parameter missing ho toh "Missing value" print ho.

Ek function banao jo unlimited numbers ka sum return kare (rest parameter).

Ek function banao jo destructured parameter accept kare:

function user({name, age}) {}

Ek function banao jo positional arguments se city & country print kare.

2. Function Types Basics

Classic function banao jo nested function call kare.

Arrow function banao jo square return kare.

Anonymous function ko variable me store karke call karo.

3. Hoisting — Basic

Ek function ko define hone se pehle call karke hoisting test karo.

var variable ko use karo → baad me declare karke hoisting behavior dekho.

4. IIFE (Basics)

Ek IIFE banao jo "App Started" print kare.

5. Scope Basics

Ek global variable ko function ke andar change karo.

Ek function ke variable ko bahar access karne ki koshish karo (error expected).

🔵 MEDIUM LEVEL (Real Understanding)

(Total: 15 Questions)
Scope chain, callbacks, HOF, arrow vs normal, spread, closure intro.

1. Scope Chain / Nested Functions

Ek nested function se outer function ka variable access karo.

Ek code likho jisme inner function ka variable outer function use na kar sake.

Ek example banao jisme scope chain clearly dikhai de.

2. Advanced Parameters & Arguments

Ek function banao jo multiplyAll(2,3,4,5) → 120 return kare (rest).

Spread operator use karke 2 arrays merge karna → function me pass karna.

Ek function likho jisme ek argument missing ho → default se fill ho.

3. Function Types (Medium)

Callback function ka example banao (setTimeout allowed).

Higher-Order Function banao jo function ko parameter me accept kare.

Ek function banao jo ek doosra function return kare (first-class function demo).

Arrow function & normal function ka this difference test karne wala code likho.

4. Pure vs Impure

Ek pure function banao.

Ek impure function banao jo global variable change kare ya random number generate kare.

5. IIFE — Medium

Ek IIFE banao jo private variable create kare:

(function(){ let x = 10 })();

🔴 HARD LEVEL (Advanced Mastery)

(Total: 10 Questions)
Closures, private state, function factories, higher-order logic, spread + rest mixing.

1. Closures (Core Advanced)

Classic closure question:

function counter() {
   let count = 0;
   return function() { return ++count }
}


Output explain karo.

Ek closure banao jisme counter1, counter2, counter3 sab independent ho.

Ek closure banao jo secret message store kare:

const secret = createSecret("myPassword");
secret();  // "myPassword"

2. High-Level Function Problems

Arrow function + rest parameter combine karke sum function banao.

Anonymous function ko map, filter, reduce me callback ke roop me use karo.

Ek higher-order function likho jo kisi bhi function ka execution time measure kare:

measure(fn)

3. Hard Scope + Closure Mix

Ek function banao jo andar ek aur function create kare
→ private variables closure ke through store kare
(mini class structure).

4. Complex Function Combination

Ek function likho jo function return kare
→ phir spread argument ka combination use ho:

createAdder(5)(...arr)

5. Real World Closure (Bank App)

Bank Account closure:

deposit()

withdraw()

balance private variable rahe

6. Temporal Dead Zone / Let-Const Hoisting

let / const hoisting ke error ko test karne wala code likho.

7. Arrow Function Hoisting Failure

Ek code likho jisme:

Normal function hoist ho jaye

Arrow function hoist na ho (error aaye)

8. Complex IIFE + Closure Combo

Ek IIFE banao jo ek function return kare
→ jo internal state maintain karta rahe (advanced closure).