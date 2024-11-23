class Student {
    var name:String
    var gpa:Double

    constructor(n:String, g:Double) {
        name = n
        gpa = g
    }
}
class College {
    var name:String
    var address:String
    var studentList:MutableList<Student>

    constructor(n:String, a:String, sList:MutableList<Student>) {
        name = n
        address = a
        studentList = sList
    }

    fun findCoopStudents(): MutableList<Student> {
        var coopList: MutableList<Student> = mutableListOf()
        for (student in studentList) {
            if(student.gpa >= 1.8) {
                coopList.add(student)
            }
        }
        return coopList
    }
}


fun main() {
    val c1:College = College("George Brown", "165 Kendal Avenue", mutableListOf(Student("Abby", 3.5), Student("Bobby", 2.13), Student("Carlos", 1.7)))
    println(c1.name)
    println(c1.address)
    println("How many students are enrolled: ${c1.studentList.size}")
    println("Who is student in position 1? ${c1.studentList[1].name}")

    for (student in c1.findCoopStudents()) {
        println("${student.name} got ${student.gpa}")
    }
}
