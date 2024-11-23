document.querySelector("button").addEventListener("click",() => {
    console.log("Pressed");

    const age = 24;

    if(age < 0) {
        console.log("You must enter a valid age!");
    } else if(age >= 70 && age <= 90){
        console.log("You have to retake the test!");    
    } else if(age > 16) {
        console.log("Yes! you can drive the car.");
    } else {
        console.log("No! you cannot drive the car.");
    }

    document.querySelector("p").innerText = "Top";
    document.querySelector("h2").innerText = "Bottom";

    document.querySelector("h1").innerText += "Center";

    document.querySelector("button").innerText += " Now" 

})