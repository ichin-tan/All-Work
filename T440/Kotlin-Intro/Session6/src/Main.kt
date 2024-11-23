
class Person {
    var name: String
    var gpa: String

    constructor(name: String, gpa: String) {
        this.name = name
        this.gpa = gpa
    }

    override fun toString(): String {
        return "Person(name='$name', gpa='$gpa')"
    }
    
}