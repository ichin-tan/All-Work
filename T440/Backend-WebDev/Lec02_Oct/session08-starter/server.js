const express = require("express")
const app = express()
const port = process.env.PORT || 8080

// tells express to use EJS
app.set("view engine", "ejs")

// - extract data sent by <form> element in the client
app.use(express.urlencoded({ extended: true }))

// database
const mongoose = require("mongoose");
require("dotenv").config();

// setup sessions
const session = require('express-session')
app.use(session({
    secret: "the quick brown fox jumped over the lazy dog 1234567890",  // random string, used for configuring the session
    resave: false,
    saveUninitialized: true
}))

// import the Student
const User = require("./models/User");
const { name } = require("ejs")

// If the server receives a request at / , respond by sending back the string "HELLO WORLD"
app.get("/", (req, res) => {
    console.log("DEBUG: What's in req.session?")
    console.log(req.session)
    console.log(`Session id: ${req.sessionID}`)

    if (req.session.hasOwnProperty("loggedInUser")) {
        console.log("There is user");
        return res.render("afterlogin.ejs")
    } else {
        console.log("There is no user");
        return res.render("home.ejs")
    }
})

app.get("/test", (req,res) => {
    req.session.name = "chintan"
    req.session.favColor = "green"
    req.session.favCity = "NYC"
    res.redirect("/")
})

app.post("/login", async (req, res) => {
    console.log("DEBUG: Data from login form:")
    console.log(req.body)

    try {
        // 1. Ask the database for all users with the given email address
        const users = await User.find({ username: req.body.txtEmail })

        if (users.length === 0) {
            // the user cannot be found
            // they don't exist
            return res.send("ERROR: This user does not exist")
        }
        // 2. If results come back, then the user exists
        // a. get the user from the array
        const userFromDB = users[0]

        // 3. Check the password in the databse, does it match the password sent to you by the form      
        if (userFromDB.password === req.body.txtPassword) {
            req.session.loggedInUser = userFromDB
            return res.send(`${req.session.loggedInUser.username} is logged in!`)
        }
        else {
            return res.send("ERROR: Incorrect username or password")
        }
    } catch (err) {
        return res.status(500).send(err.message)
    }
})

app.get("/logout", (req,res)=>{
    // delete the entire session
    req.session.destroy()
    console.log("LOGGED OUT!!! Redirecting you back to the / endpoint")
    return res.redirect("/")
})
 
 

// app.post("/signup", async (req, res) => {
//     console.log("DEBUG: Data from signup form:")
//     console.log(req.body)

//     // 1. Get the email and password  from the <form> element
//     const email = req.body.txtEmail;
//     const password = req.body.txtPassword;
//     let isExist = false;

//     // 2. Does the email already exist in our database?
//     const users = await User.find();
//     console.log(users);

//     // a user looks like this: {email:"caty@gmail.com", password:"pppp"},
//     for (let user of users) {
//         console.log(email);
//         console.log(user.username);
//         if (user.username === email) {
//             isExist = true;
//             break;
//         }
//     }

//     // 3. If no, then you can create an account
//     if (!isExist) {
//         try {
//             // 3. If no, then you can create an account (User) in the database
//             // a. Define the properties of the your user
//             const userToCreate = User({
//                 username: email,
//                 password: password
//             })
//             // b. Save the user to the mongo database
//             await userToCreate.save()
//         } catch (err) {
//             return res.status(500).send(err.message)
//         }
//     } else {
//         console.log("Already there");
//         return res.send("Already there")
//     }

//     // - If you finish the for loop and you never activate the if statement
//     // - That means you NEVER found a email that matches what the user typed in the <form>
//     return res.send("this is the SIGNUP post endpoint")
// })

app.post("/signup", async (req, res) => {
    console.log("DEBUG: Data from signup form:")
    console.log(req.body)
    // 1. Get the email and password  from the <form> element
    const emailFromUI = req.body.txtEmail
    const passwordFromUI = req.body.txtPassword
    const role = req.body.txtUserType
    console.log(emailFromUI)
    console.log(passwordFromUI)
    // 2. Does the email already exist in our database?
    // a user looks like this: {email:"caty@gmail.com", password:"pppp"},
    // option 1
    const results = await User.find({ username: emailFromUI })
    // option 2
    // const results = User.find({username: req.body.txtEmail})

    if (results.length === 0) {
        // no results found
        // that means we can create the account
        try {
            // 3. If no, then you can create an account (User) in the database
            // a. Define the properties of the your user
            const userToCreate = User({
                username: emailFromUI,
                password: passwordFromUI,
                usertype: role
            })
            // b. Save the user to the mongo database
            await userToCreate.save()
            return res.send("SUCCESS: User created")
        } catch (err) {
            return res.status(500).send(err.message)
        }
    } else {
        // results were found
        // this means the user already exists
        return res.send(`ERROR: SORRY this user already exists: ${emailFromUI}`)
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