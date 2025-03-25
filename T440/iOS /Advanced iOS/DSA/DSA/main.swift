//
//  main.swift
//  DSA
//
//  Created by CP on 20/03/25.
//

import Foundation


//func test() {
//    var array = [1,5,7,3,4]
//    array.popLast() //poplast will be for stack
//    array.removeFirst() // Removefirst will be for queue
//}

// Bubble sort

//var numbers = [1,4,6,3,8]
//print(numbers)
//bubbleSort(&numbers)
//print(numbers)


//MARK: - Bubble sort
func bubbleSort(_ array: inout [Int]) {
    let count = array.count
    
    for i in 0..<count {
        for j in 0..<count-i-1 {
            if(array[j] > array[j+1]) {
                let temp = array[j]
                array[j] = array[j+1]
                array[j+1] = temp
            }
        }
    }
}

//var numbers = [5,7,6,3,8]
//print(numbers)
//selectionSort(&numbers)
//print(numbers)

//MARK: - Selection sort
func selectionSort(_ array: inout [Int]) {
    let count = array.count
    
    for i in 0..<count {
        var currentMinIndex = i
        for j in i+1..<count {
            if(array[j] < array[currentMinIndex]) {
                currentMinIndex = j
            }
        }
        let temp = array[currentMinIndex]
        array[currentMinIndex] = array[i]
        array[i] = temp
    }
}

//MARK: - Find maximum from array
func findMax(_ array: [Int]) -> Int? {
    if(array.isEmpty) {
        return nil
    }
    
    var max = array.first!
    
    for element in array {
        if(element > max) {
            max = element
        }
    }
    
    
    return max
}

//var numbers = [5,7,6,3,8]
//if let max = findMax(numbers) {
//    print(max)
//}

//MARK - Sum of all elements

func sumofArray(_ array: [Int]) -> Int {
    if(array.isEmpty) {
        return 0
    }
    
    var sum = 0
    
    for element in array {
        sum += element
    }
    
    return sum
}

//var numbers = [5,7,6,3,8]
//let sum = sumofArray(numbers)
//print(sum)

//MARK: - Reverse an array

func reverse(array: inout [Int]) {
    var left = 0
    var right = array.count - 1
    
    while(left < right) {
        array.swapAt(left, right)
        left += 1
        right -= 1
    }
}

//var numbers = [5,7,3,8]
//reverse(array: &numbers)
//print(numbers)

//MARK: - Count even numbers

func countEven(_ array: [Int]) -> Int {
    var count = 0
    
    for element in array {
        if(element % 2 == 0) {
            count += 1
        }
    }
    
    return count
}

//var numbers = [5,8,4,2,1,8]
//print(countEven(numbers))

//var numbers = [5,8,2,2,1,8,7,9,2,3,1]
//removeDuplicates(&numbers)
//
//print(numbers)

//MARK: - Smallest positive integer

public func smallestPositiveInteger(_ A : inout [Int]) -> Int {
    let sorted = A.filter{ $0>0 }.sorted()

    if(sorted.isEmpty) || (sorted.first != 1){
        return 1
    }

    for i in 0..<sorted.count-1 {
        if(sorted[i+1] - sorted[i] > 1) {
            return sorted[i] + 1
        }
    }
    return sorted.last! + 1
}

//MARK: - Second largest element

func secondLargestElement(_ array: inout [Int]) -> Int? {
    let count = array.count
    for i in 0..<count {
        var minIndex = i
        
        for j in i+1..<count {
            if(array[j] < array[minIndex]) {
                minIndex = j
            }
        }
        array.swapAt(minIndex, i)
    }
    return array[count - 2]
}

//var numbers = [5,8,2,2,61,8,7,9,2,3,1,89,13]
//print(secondLargestElement(&numbers))

//MARK: - Move non zeroes to end

func moveZeros(_ array: inout [Int]) {
    let zeroCount = array.filter({ $0 == 0 }).count
    array.removeAll(where: { $0 == 0 })
    array.append(contentsOf: Array(repeating: 0, count: zeroCount))
    print(zeroCount)
}

//var numbers = [5,0,2,2,61,0,7,9,2,3,1,0,13]
//moveZeros(&numbers)


func removeDuplicate(array: inout [Int]) {
    
    var dict: [Int: Int] = [:]
    
    for element in array {
        dict[element] = 100
    }

    array = dict.keys.map({ $0 }).sorted()
}

var array = [1,4,5,6,3,2,4,2,1,5,8,9,6,4]

removeDuplicate(array: &array)
print(array)


func factorial(_ n: Int) -> Int {
    if(n==0) {
        return 1
    }
    
    return n * factorial(n-1)
}

print(factorial(1))
