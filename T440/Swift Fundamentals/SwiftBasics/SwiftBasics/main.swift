//
//  main.swift
//  SwiftBasics
//
//  Created by CP on 07/01/25.
//

import Foundation

print("Hello, World!")

let b1 = (id: 1, name: "Swift", price: 10.99)
print(b1.2)

let d: Double = b1.price
print(d)

// Deconstruct tuple

var (id, name, price) = b1

print(id)
print(name)
print(price)

// Deconstruct tuple (To ignore a value use _)

var (bid, _, bprice) = b1

print(bid)
print(bprice)

id = 2

// ARRAY - MULTIPLE VALUES OF SAME TYPE - ORDERED COLLECTION - Should use when we wanna iterate over each and every position as its easier to access every elements sequantially instead of scattered memory addresses

let a1: [Double] = [1, 2.9]
print(a1)

var arr2 = Array.init(repeating: 0, count: 20)
arr2[10] = 10
print(arr2[10])
print(arr2.count )

arr2 += [333,555]
print(arr2)

print(arr2.first)
print(arr2.last)

print(arr2.isEmpty)

arr2.insert(100, at: 0)
print(arr2)


arr2[2...4] = [54,55,56]
print(arr2)

arr2[2...4] = [87,88]
print(arr2)

arr2[2..<4] = [99]
print(arr2)

arr2[0...] = [1]
print(arr2)


for _ in 0..<arr2.count {
    print("HII")
}
 
var mixedArray : [Any] = []

mixedArray.append(20)
mixedArray.append("gerg")
mixedArray.append(20.90)

print(mixedArray)

for i in stride(from: 10, through: 100, by: 5) {
    print(i, terminator: "  =  ")
}

var num = 56

switch(num) {
case 10:
    print("value is - 10")
case 11..<20:
    print("value is 11 to 19 - \(num)")
case 21,34,56:
    print("value is one of (21,34,56) - \(num)")
case 100...:
    print("value is greater than 100 - \(num)")
default:
    print("Undetermined")
}

enum Fruits: CaseIterable {
    case apple
    case banana
    case pear
    case kiwi
}

var numberOfFruits = Fruits.allCases

for fruit in numberOfFruits {
    print(fruit)
}

print(numberOfFruits[0])

enum Day : Int, CaseIterable {
    case m, tu, w=10, th, f, sa, su
}

print("\nPrinting the raw values\n")

for day in Day.allCases {
    print(day.rawValue)
}

var day : Day = .f
print(day.rawValue)

var day1 = Day(rawValue: 0)
print(day1)

// Dry run - Going through code in mind

var arr: [Int] = [1]

for value in 1..<arr.count {
    print(value)
}

func rangeF(a: Int..., b: String) {
    print(a)
}


rangeF(a: 1,2,3,4,5,66, b: "")

var a: Int? = 6

print(a)
 
// Convert ascciii values

var s1 = "Abc"
var s2 = "aa"

print(s1 > s2)

// Closures - can be pass around in code
let digitNames = [ 0:"Zero", 1:"One", 2:"Two", 3:"Three", 4:"Four", 5:"Five", 6:"Six", 7:"Seven", 8:"Eight", 9:"Nine"]

struct Astr {
    var a: Int
    var b: Int
}

//var an = Astr(a: <#T##Int#>, b: <#T##Int#>)

class ASRT {
    var a: Int = 0
    var b: Int = 0
}

var a11 = ASRT()
var a2 = ASRT()

if(a11 === a2) {
    print("Same")
} else {
    print("Not")
}

// Conviniewnce
