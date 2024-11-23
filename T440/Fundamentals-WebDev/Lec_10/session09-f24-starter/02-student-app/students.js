//TODO: Define a list of students here

const arrStudents = [
    {name: "Chintan", testScore: 100, program: "Computer Science"},
    {name: "Dev", testScore: 100, program: "Biology"},
    {name: "Pruthvi", testScore: 100, program: "Accounting"}
]

document.addEventListener('DOMContentLoaded', () => {
    // document.querySelector("#student-list").innerHTML = "";
    for(let student of arrStudents) {
        document.querySelector("#student-list").innerHTML += `<li>${student.name}, ${student.testScore}, ${student.program}</li>`;
    }
});

document.querySelector("#btn-show-all").addEventListener("click", () =>{
    console.log("Show All button pressed!")
})

document.querySelector("#btn-add").addEventListener("click", () =>{
    console.log("Add button pressed!");
    const newStudent = {
        name : document.querySelector("#tb-name1").value,
        testScore : document.querySelector("#tb-test-score").value,
        program: "Mobile App Development"
    }

    arrStudents.push(newStudent);
    document.querySelector("#student-list").innerHTML += `<li>${newStudent.name}, ${newStudent.testScore}, ${newStudent.program}</li>`;
    console.log(arrStudents);
    
})

document.querySelector("#btn-increase-grades").addEventListener("click", () => {
    for(let i=0; i<arrStudents.length; i++) {
        arrStudents[i].testScore *= 1.15;

        if (arrStudents[i].testScore > 100) {
            arrStudents[i].testScore = 100;
        }
    }
    console.log(arrStudents);
    document.querySelector("#student-list").innerHTML = "";
    for(let student of arrStudents) {
        document.querySelector("#student-list").innerHTML += `<li>${student.name}, ${student.testScore.toFixed(2)}, ${student.program}</li>`;
    }
})

document.querySelector("#btn-count").addEventListener("click", () =>{
    console.log("Count button pressed!");
    const studentName = document.querySelector("#tb-name2").value;
    let count = 0;
    for(let student of arrStudents) {
        if (student.name === studentName) {
            count++;
        }
    }
    document.querySelector("#count-message").innerText = `There are ${count} people named ${studentName}`;
})

document.querySelector("#btn-pass-fail").addEventListener("click", () =>{
    console.log("Pass/Fail button pressed!")    
})
