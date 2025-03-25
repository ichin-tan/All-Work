//
//  main.swift
//  Chintan_TreasureHunt
//
//  Created by CP on 13/01/25.
//

import Foundation

var arrIslands: [Island] = []
var player1: Player!
var player2: Player!
var isGameContinue = false
var isPlayer1Turn = false
var isHaveToShowIslands = true
var dictScoreboard: [String: [String: String]] = [:]

showMenu()
setUserMenuOption()

func showMenu() {
    print("--- Treasure Hunt --- \n1. Start a new game \n2. Show the scoreboard \n3. Exit\n")
}

func setUserMenuOption() {
    print("Please select options from (1,2,3)")
    var userMenuOption = Int(readLine() ?? "") ?? 0
    while(userMenuOption == 0) {
        print("Please select options from (1,2,3)")
        userMenuOption = Int(readLine() ?? "") ?? 0
    }
    
    switch(userMenuOption) {
        case 1:
            startGame()
        case 2:
            showScoreboard()
        case 3:
            exitGame()
        default:
            setUserMenuOption()
    }
}

func askAndGetPlayersName() -> (playerName1: String, playerName2: String) {
    print("Enter Player 1 name:")
    var name1 = readLine()
    
    while(name1 == "") {
        print("Name cannot be empty! Please enter name.")
        name1 = readLine()
    }
        
    print("Enter Player 2 name:")
    var name2 = readLine()
    
    while(name2 == "") {
        print("Name cannot be empty! Please enter name.")
        name2 = readLine()
    }
    
    return (name1!, name2!)
}

func buildIslandsData() {
    var island1 = Island(name: "Emerald Isle", numberOfTreasures: [3,5,7].randomElement()!)
    island1.specialTreasureNumberInTotalTreasure = Int.random(in: 1...island1.numberOfTreasures)
    arrIslands.append(island1)
    
    var island2 = Island(name: "Ruby Cove", numberOfTreasures: [3,5,7].randomElement()!)
    island2.specialTreasureNumberInTotalTreasure = Int.random(in: 1...island2.numberOfTreasures)
    arrIslands.append(island2)

    var island3 = Island(name: "Sapphire Shore", numberOfTreasures: [3,5,7].randomElement()!)
    island3.specialTreasureNumberInTotalTreasure = Int.random(in: 1...island3.numberOfTreasures)
    arrIslands.append(island3)
    
    let luckyIndex = Int.random(in: 0..<arrIslands.count)
    arrIslands[luckyIndex].isLucky = true
}

func showIslands() {
    seperateLine()
    print("Current Treasures:")
    for (index,island) in arrIslands.enumerated() {
        print("\(index + 1) \(island.name) (\(island.numberOfTreasures) treasures)")
    }
}

func buildPlayers(playerName1: String, playerName2: String) {
    player1 = Player(name: playerName1)
    player2 = Player(name: playerName2)
}

func startGame() {
    print("Starting the game!")
    isGameContinue = true
    let names = askAndGetPlayersName()
    buildIslandsData()
    buildPlayers(playerName1: names.playerName1, playerName2: names.playerName2)
    print("\n\(player2.name) will go first! 👈🏻")
    while(isGameContinue) {
        continueGame()
    }
}

func continueGame() {
    if (isHaveToShowIslands) {
        showIslands()
    } else {
        isHaveToShowIslands = true
    }
    

    if(isPlayer1Turn) {
        var tempPlayer = player1!
        playerTurn(player: &tempPlayer)
        player1 = tempPlayer
    } else {
        var tempPlayer = player2!
        playerTurn(player: &tempPlayer)
        player2 = tempPlayer
    }
    
    if (arrIslands[0].numberOfTreasures == 0 && arrIslands[1].numberOfTreasures == 0 && arrIslands[2].numberOfTreasures == 0) {
        isGameContinue = false
        showResults()
    }
}

func playerTurn(player: inout Player) {
    
    if (player.isStole) {
        isPlayer1Turn.toggle()
        player.isStole = false
        isHaveToShowIslands = false
        return
    }
    
    player.currentTurn += 1
    print("\(player.name) turn \(player.currentTurn):")
    
    if (player.currentTurn % 3 == 0) {
        print("This is your 3rd turn. Do you want to steal treasure from the opponent? Yes/No")
        let userInput = readLine()?.lowercased()
        if (userInput == "yes") {
            // Steal
            player.isStole = true
            if (player.name == player1.name) {
                // Steal from player 2
                
                print("How many treasures do you want to steal?")
                var stealTreasureCount = Int(readLine() ?? "") ?? 0
                if (stealTreasureCount > player2.numberOfTreasure) {
                    stealTreasureCount = 0
                }
                player2.numberOfTreasure -= stealTreasureCount
                player2.points -= (5 * stealTreasureCount)
                player.numberOfTreasure += stealTreasureCount
                player.points += (5 * stealTreasureCount)
                print("\(player.name) stole \(stealTreasureCount) treasures from \(player2.name).")
                print("\(player.name)'s next turn will be skipped")
                print("Treasure : \(player.numberOfTreasure), Points: \(player.points)")
                isPlayer1Turn.toggle()
                
            } else {
                // Steal from player 1

                print("How many treasures do you want to steal?")
                var stealTreasureCount = Int(readLine() ?? "") ?? 0
                if (stealTreasureCount > player1.numberOfTreasure) {
                    stealTreasureCount = 0
                }
                player1.numberOfTreasure -= stealTreasureCount
                player1.points -= (5 * stealTreasureCount)
                player.numberOfTreasure += stealTreasureCount
                player.points += (5 * stealTreasureCount)
                print("\(player.name) stole \(stealTreasureCount) treasures from \(player1.name).")
                print("\(player.name)'s next turn will be skipped")
                print("Treasure : \(player.numberOfTreasure), Points: \(player.points)")
                isPlayer1Turn.toggle()
            }
        } else {
            // I could handle any no context value user enters but lets assume any value except yes will be a no
            let selectedIslandNumber = getIslandNumber()
            processPlayerChoice(player: &player, selectedNumber: selectedIslandNumber)
        }
    } else {
        let selectedIslandNumber = getIslandNumber()
        processPlayerChoice(player: &player, selectedNumber: selectedIslandNumber)
    }
}

func getIslandNumber() -> Int {
    print("Select an island by number: ")
    var selectedIslandNumber = Int(readLine() ?? "") ?? 0
    var isValidIslandNumber = false
    
    while(!isValidIslandNumber) {
        if(selectedIslandNumber <= 0) {
            isValidIslandNumber = false
            print("Please select options from (1,2,3): ")
            selectedIslandNumber = Int(readLine() ?? "") ?? 0
        } else if(selectedIslandNumber > 3) {
            isValidIslandNumber = false
            print("Please select options from (1,2,3): ")
            selectedIslandNumber = Int(readLine() ?? "") ?? 0
        } else if (arrIslands[selectedIslandNumber - 1].numberOfTreasures == 0) {
            print("\(arrIslands[selectedIslandNumber - 1].name) doesnt have any treasures left. Please select other island: ")
            isValidIslandNumber = false
            print("Please select options from (1,2,3): ")
            selectedIslandNumber = Int(readLine() ?? "") ?? 0
        } else {
            isValidIslandNumber = true
        }
    }
    return selectedIslandNumber
}

func processPlayerChoice(player: inout Player, selectedNumber: Int) {
    let islandIndex = selectedNumber - 1
    print("How many treasures do you want to collect from \(arrIslands[islandIndex].name)?")
    var numberOfTreasureSelected = Int(readLine() ?? "999") ?? 999
    
    while(numberOfTreasureSelected > arrIslands[islandIndex].numberOfTreasures) {
        print("\(arrIslands[islandIndex].name) only has \(arrIslands[islandIndex].numberOfTreasures) treasures. Please select again")
        numberOfTreasureSelected = Int(readLine() ?? "999") ?? 999
    }
    arrIslands[islandIndex].numberOfTreasures -= numberOfTreasureSelected
    print("\(player.name) collected \(numberOfTreasureSelected) treasures from \(arrIslands[islandIndex].name).")
    player.numberOfTreasure += numberOfTreasureSelected
    
    if (arrIslands[islandIndex].isLucky) {
        print("🍀 Lucky Island! \(player.name) gets double points for this turn!")
        let doublePoints = (2 * (5 * numberOfTreasureSelected))
        player.points += doublePoints
        arrIslands[islandIndex].isLucky = false
    } else {
        let points = (5 * numberOfTreasureSelected)
        player.points += points
    }
    print("Treasure : \(player.numberOfTreasure), Points: \(player.points)")
    
    if let specialTreasureNumberInTotalTreasure = arrIslands[islandIndex].specialTreasureNumberInTotalTreasure {
        if(specialTreasureNumberInTotalTreasure < numberOfTreasureSelected) {
            print("🎉 Special Treasure Found! \(player.name) gets an extra turn!")
        } else {
            isPlayer1Turn.toggle()
        }
    }
    
    addRandomTreasure(currIndex: islandIndex)
}

func addRandomTreasure(currIndex: Int) {
    // Add random treasures to random island on a random condition
    // If a random number is divided by 2, we will add new treasur
    let isAddNewTreasure = Int.random(in: 1...50) % 2 == 0
    
    if (isAddNewTreasure) {
        let randomTreasureToAdd = Int.random(in: 1...3)
        let currentIsland = arrIslands[currIndex]
        let arrExceptCurrentIsland = arrIslands.filter({ $0.name != currentIsland.name })
        let targetIsland = arrExceptCurrentIsland.randomElement()
        for (index,island) in arrIslands.enumerated() {
            if(island.name == targetIsland?.name) {
                print("New treasures appeared on \(island.name)! +\(randomTreasureToAdd) treasures")
                arrIslands[index].numberOfTreasures += randomTreasureToAdd
            }
        }
    }
}

func showResults() {
    print("Game Over! All the treasures have been collected")
    var winnerName = ""
    if (player1.points > player2.points) {
        winnerName = player1.name
    } else if(player2.points > player1.points) {
        winnerName = player2.name
    }
    if(winnerName == "") {
        print("GAME TIED!!")
    } else {
        print("Congratulations \(winnerName)!! You won the game.")
    }
    showMenu()
    setUserMenuOption()
}

func showScoreboard() {
    print("Showing scoreboard!")
    calculateScoreBoardData()
    seperateLine()
    print("Scoreboard\n")
    for(key,value) in dictScoreboard {
        print("\(key)")
        print("Games Won: \(value["gamesWon"] ?? "0") \n Treaures: \(value["treasure"] ?? "0") \n Points: \(value["points"] ?? "0")")
    }
    seperateLine()
    showMenu()
    setUserMenuOption()
}

func calculateScoreBoardData() {
    var winnerName = ""
    if (player1.points > player2.points) {
        winnerName = player1.name
    } else if(player2.points > player1.points) {
        winnerName = player2.name
    }

    dictScoreboard[player1.name] = ["treasure": String(player1.numberOfTreasure), "points": String(player1.points)]
    if (winnerName == player1.name) {
        dictScoreboard[player1.name]?["gamesWon"] = String(1)
    }
    
    dictScoreboard[player2.name] = ["treasure": String(player2.numberOfTreasure), "points": String(player2.points)]
    if (winnerName == player2.name) {
        dictScoreboard[player2.name]?["gamesWon"] = String(1)
    }
    
    // In case if tied
    if(winnerName == "") {
        dictScoreboard[player1.name]?["gamesWon"] = String(0)
        dictScoreboard[player2.name]?["gamesWon"] = String(0)
    }
}

func exitGame() {
    print("Exiting the game! Goodbye!\n\n")
    player1 = nil
    player2 = nil
    arrIslands = []
    dictScoreboard = [:]
}

func seperateLine() {
    print("------------------------------------------")
}
