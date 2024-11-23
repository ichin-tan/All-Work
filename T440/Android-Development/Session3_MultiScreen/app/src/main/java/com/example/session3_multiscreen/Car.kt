package com.example.session3_multiscreen
import java.io.Serializable

class Car: Serializable {
    var model:String
    var licensePlate:String


    constructor(model: String, licensePlate: String) {
        this.model = model
        this.licensePlate = licensePlate
    }


    override fun toString(): String {
        return "Car(model='$model', licensePlate='$licensePlate')"
    }

}

