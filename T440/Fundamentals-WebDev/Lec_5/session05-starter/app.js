// Comment

console.log("Hii, This is javascript");

console.log("Hello from here!");

const x = 50;
console.log(x);

const y = 30;
console.log(y);

const result = x + y;
console.log(result);

// Datatypes :- true/false - string - numbers

const a = 100;
console.log(typeof(a));

const b = 3.1444;
console.log(typeof(b));

console.log(typeof(true));

console.log(typeof("Hey"));

// Conditionals

const age = 24;

if(age < 0) {
    console.log("You must enter a valid age!");
} else if(age >= 70 && age <= 90){
    console.log("You have to retake the test!");    
} else if(age > 16) {
    console.log("Yes! you can drive the car.")
} else {
    console.log("No! you cannot drive the car.")
}

// loops

for(let i = 0; i < 3; i++) {
    console.log(i);
}