class Student {
    // properties
    var name:String
    var age:Int
    var isPostGrad:Boolean

    // constructor
    constructor(name: String, age: Int, isPostGrad: Boolean) {
        this.name = name
        this.age = age
        this.isPostGrad = isPostGrad
    }
    // toString
    override fun toString(): String {
        return "${this.name} is ${this.age} who is post graduate? - ${this.isPostGrad}"
    }
}

