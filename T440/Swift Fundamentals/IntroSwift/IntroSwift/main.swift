//
//  main.swift
//  IntroSwift
//
//  Created by CP on 06/01/25.
//

import Foundation

print("Hello, World!")

var v1: Int = 0
var v2: String = ""
var v3: Float = 0.0
var v4: Double = 0.0
var v5: Bool = false

print("\(v1) \(v2) \(v3) \(v4) \(v5)")

v5 = Bool(-0.0)
print(v5)


var openRange = 0...10
var closedRange = 0..<10
var partialRange = 0...
var range = ...10

print(openRange)
print(closedRange);print(partialRange);print(range)


struct A {
    var a: Int
    var b: Int
    
    init(a: Int, b: Int) {
        self.a = a
        self.b = b
    }
}

class AA {
    var a: Int
    var b: Int
    
    init(a: Int, b: Int) {
        self.a = a
        self.b = b
    }
    
    func changeValue() {
        self.a = 9
        self.b = 10
    }
}

// For structure to mutate var is necessary in instance name and in the property name both

// main thread = ui

// Forground thread - interacting with user
// Background - Network related things

// CONCURRENCY


