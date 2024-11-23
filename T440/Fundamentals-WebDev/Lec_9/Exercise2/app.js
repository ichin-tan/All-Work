document.querySelector("#btn-email").addEventListener("click", ()=>{
    console.log("HDLLSDFSDFDSFDS")
    // 1. create the email
    // The properties of the object depend on the application
    // In this case, we are just displaying this to the screen based on the UI
    const email = {
        sender:"Jignesh Sutar",
        subject: "Tutoring help needed",
        msg:"I need help with my code!",
        label:"Python/Tutor",
        time:"18:53"
    }
 
 
    document.querySelector("#name-label").innerText = `${email.sender}`
    document.querySelector("#subject-label").innerText = `${email.subject}`
    document.querySelector("#msg-label").innerText = `${email.msg}`
    document.querySelector("#label-label").innerText = `${email.label}`
    document.querySelector("#time-label").innerText = `${email.time}`
 
 
 })
 