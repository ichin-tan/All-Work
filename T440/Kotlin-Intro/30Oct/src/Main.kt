enum class DayOfWeek {
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
}

enum class StudentType {
    FullTime, PartTime, Continuing
}

// Exercise 1

class Course {
    var name : String
    var courseCode : String
    var sheduledDays : MutableList<DayOfWeek> = mutableListOf()

    constructor(name: String, courseCode: String, sheduledDays: MutableList<DayOfWeek>) {
        this.sheduledDays = sheduledDays
        this.name = name
        this.courseCode = courseCode
    }

    override fun toString(): String {
        return "Course details - ${this.name} - ${this.courseCode}, ${this.sheduledDays}"
    }
}

class Student {
    var name : String
    var studentType : StudentType
    var enrolledourses : MutableList<Course> = mutableListOf()

    constructor(name: String, studentType: StudentType) {
        this.name = name
        this.studentType = studentType
    }

    override fun toString(): String {
        return "Student details - ${this.name} - ${this.studentType} - ${this.enrolledourses}"
    }

    fun enroll(course : Course) {
        println("Trying to enroll ${course.name} for ${this.name}........")
        if (studentType === StudentType.FullTime || studentType === StudentType.PartTime) {
            if (course.sheduledDays.contains(DayOfWeek.SATURDAY) || course.sheduledDays.contains(DayOfWeek.SUNDAY)) {
                println("ERROR! Full time and part time students can not take weekend class")
            } else {
                this.enrolledourses.add(course)
            }
        } else {
            this.enrolledourses.add(course)
        }
    }
}

fun main() {
    var c1 = Course("Intro to Kotlin", "MADS4013", mutableListOf(DayOfWeek.MONDAY, DayOfWeek.TUESDAY, DayOfWeek.SATURDAY))
    println(c1)

    var c2 = Course("Web Development", "MADS1093", mutableListOf(DayOfWeek.MONDAY, DayOfWeek.TUESDAY, DayOfWeek.WEDNESDAY, DayOfWeek.THURSDAY))
    println(c2)

    var s1 = Student("Chintan", StudentType.PartTime)
    s1.enroll(c1)
    println(s1)

    s1.enroll(c2)

    println(s1)
}