const objectsButtonPressed = () => {
    console.log("Demo of objects")

    // this creates an empty object
    const x = {}
    console.log(`What is the data type of x? ${typeof(x)}`)    

    // objects represent real world things
    // objects have properties
    //  - every property has a "property name" and "value"

    const student = {
        name: "Chintan",
        gpa: 3.1,
        hasJob: false
    }

    console.log(student.name);
    

    // you can access an object's properties
    
    // you can modify a property's value

    student.gpa = student.gpa * 1.10
    console.log(student.gpa);
    
    // you can add new properties to an object

    student.hasCar = false;
    student.course = "T440";
    student.email = `${student.name}@college.com`;

    // you can delete properties from an object
    
    delete student.course
    delete student.gpa
}

const arrayButtonPressed = () => {
    console.log("Array Demo")
    // this creates an empty array
    const x = [1,2,3,4,5];

    const last = x[x.length - 1];

    console.log(x);

    x[2] = 10;

    console.log(x);

    x.push(10);
    
    console.log(x);

    x.splice(2,1);

    console.log(x);

    for(let i = 0; i < 5; i++) {
        console.log(`Repeating for ${i + 1} time`);
    }

    const fruites = ["banana", "mango", "watermelon"]

    for (let i = 0; i < fruites.length; i++) {
        console.log(fruites[i]);
    }

    // For of loop

    for(let fruite of fruites) {
        console.log(fruite);
    }
}

const addItemPressed = () => {
    console.log("Item added!")
}
const showAllPressed = () => {
    console.log("Showing all items!")
}

document.querySelector("#btn-objects").addEventListener("click", objectsButtonPressed)
document.querySelector("#btn-array").addEventListener("click", arrayButtonPressed)
document.querySelector("#btn-add").addEventListener("click", addItemPressed)
document.querySelector("#btn-show").addEventListener("click", showAllPressed)