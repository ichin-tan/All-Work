// Normal function

const sayHello = function() {
    console.log("Hello");
}

sayHello();

// Arrow function

const sayGoodbye = () => console.log("Goodbye");

sayGoodbye();

const isEven = number => number % 2 === 0;

console.log(isEven(20));

const names = ["A", "B", "C"];

const withSurnameP = names.map(name => name += " P");
console.log(withSurnameP);
