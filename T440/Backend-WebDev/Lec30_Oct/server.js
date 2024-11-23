const express = require("express")
const app = express()
const port = process.env.PORT || 8080

// tells express to use EJS
app.set("view engine", "ejs")

//To get values from the
app.use(express.urlencoded({ extended: true }));

// database
const mongoose = require("mongoose");
require("dotenv").config();

//Import Student
const Student = require("./models/student")

// If the server receives a request at / , respond by sending back the string "HELLO WORLD"
app.get("/",(req,res) => {
    res.render("home.ejs")
})


app.get("/add-student",(req,res) => {
    return res.render("insert.ejs");
})

app.post("/student-entered", async (req,res) => {
    const addedStudent = Student({
        name: req.body.name,
        gpa: parseFloat(req.body.gpa),
        tuitionPaid: req.body.hasPaidTution === "on" ? true : false
    })

    console.log("--------------------------");
    
    console.log(addedStudent);
    
    console.log("--------------------------");

    await addedStudent.save()

    return res.redirect("/all")
})

app.get("/insert", async (req,res) => {
    // insert someone into the database
    try {
        // 1. define the properties of your new student
        const s = Student(
            {
                name:"Chintanv Panchal",
                gpa:4.4,
                tuitionPaid: false,
            }
        )
        // 2. save the student to the database
        await s.save()
        // 3. send a message back to the client
        return res.send("SUCCESS!")
    } catch (err) {
        return res.status(500).send(error.message)
    }
 }) 

 // create an endpoint:
// http://localhost:8080/all
// When the client requests this endpoint, show all students in the database
app.get("/all", async (req,res) => {
  
    // 2. Respond to the client with all the students
    try {
        // 1. Get all students from the database
        // 2. .find() function returns the results as an array
        const students = await Student.find()
        if (students.length === 0) {
            // There is no one in the students collection
            return res.send("There are no students in the collection!")
        } else {
            // There must be results in the database
            // JSON.stringify() --> converts an array to a string
            // res.send() accepts a STRING data type
            // return res.send(JSON.stringify(students))

            return res.render("all.ejs", {students: students, title: "All Students"})
        }
 
 
    } catch (err) {
        return res.status(500).json({ message: error.message });
    }
 }) 

// Create an endpoint called /highscores
// When user visits this endpoint find all sutdents with gpa >= 3.1
// Respond with a string
// http://localhost:8080/highscores
app.get("/highscores", async (req,res)=>{
    try {
        // 1. get all documents with gpa >=3.1
        const arrStudents = await Student.find({gpa:{$gte:3.8}})
        if (arrStudents.length === 0) {
            // There is no one in the students collection
            return res.send("There are no matching students.")
        } else {
            // There must be results in the database
            // JSON.stringify() --> converts an array to a string
            // res.send() accepts a STRING data type
            // return res.send(JSON.stringify(arrStudents))
            return res.render("all.ejs", {students: arrStudents, title: "Students with High Score"})

        }
 
 
    } catch(err) {
        return res.status(500).json({ message: error.message })
    }
 }) 

 app.get("/getchintan", async (req,res)=> {
    try {
        // this is chintan's _id
        // findById --> an object containing the matching document
        // --> null if the document with the id cannot be found
        const student = await Student.findById("66fb2beb5d65885a8e2d2607");
        if (student === null) {
            return res.send("ERROR: Cannot find student with this id")
        } else {
            // convert the object to a string
            // res.send() only accepts strings
            return res.send(JSON.stringify(student))
        }
    } catch(err) {
        return res.status(500).send(error.message)
    }
 }) 

// http://localhost:8080/update
app.get("/update", async (req,res)=>{
    try { 
        const student = await Student.findByIdAndUpdate("66fb2beb5d65885a8e2d2607",
            {tuitionPaid:true}, { new: true })
        return res.send("Update success, check database for results")
    } catch (err) {
        return res.status(500).send(error.message)
    }
 }) 

// http://localhost:8080/deletealisha
app.get("/deletealisha", async (req,res)=>{
    try {
        const student = await Student.findByIdAndDelete("66fb2bbef6eb75e9fc1be220")
        return res.send("Delete success, check database for results")
    } catch (err) {
        return res.status(500).send(error.message)
    }
 })
  

const startServer = async () => {   
   console.log(`The server is running on http://localhost:${port}`)
   console.log(`Press CTRL + C to exit`)


   // MongoDB Connection
   try {
       await mongoose.connect(process.env.MONGODB_URL)
       console.log("Success! Connected to MongoDB")
   } catch (err) {
       console.error("Error connecting to MongoDB:", err);
   }   
}
app.listen(port, startServer)