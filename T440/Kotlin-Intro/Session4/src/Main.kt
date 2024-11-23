
class UserAccount {
    var userName: String
    var userPassword: String = ""
    var email: String
    private var resetPasswordCount = 0

    constructor(name: String) {
        userName = name
        email = userName + "@gmail.com"
        generatePassword()
    }

    fun generatePassword() {
        var password = ""
        for(i in 0..<3) {
            val randomLetter = ('A'..'Z').random()
            password += randomLetter
        }

        for(i in 0..<3) {
            val randomDigit = (0..9).random()
            password += randomDigit
        }
        userPassword = password
    }

    fun resetPassword() {
        resetPasswordCount += 1
        if(resetPasswordCount == 4) {
            generatePassword()
            resetPasswordCount = 0
        }
    }

    fun updateEmail(updatedEmail: String) {
        email = updatedEmail
    }
}

fun main() {
    var userAccount = UserAccount("c123")
    println("${userAccount.userName} - ${userAccount.userPassword} - ${userAccount.email}")
    userAccount.updateEmail("abc@gmail.com")
    println("${userAccount.userName} - ${userAccount.userPassword} - ${userAccount.email}")
    userAccount.resetPassword()
    println("${userAccount.userName} - ${userAccount.userPassword} - ${userAccount.email}")
    userAccount.resetPassword()
    println("${userAccount.userName} - ${userAccount.userPassword} - ${userAccount.email}")
    userAccount.resetPassword()
    println("${userAccount.userName} - ${userAccount.userPassword} - ${userAccount.email}")
}