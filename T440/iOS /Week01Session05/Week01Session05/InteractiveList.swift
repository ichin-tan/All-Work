//
//  InteractiveList.swift
//  Week01Session05
//
//  Created by Chintan Patel on 2025-01-31.
//

import SwiftUI

struct InteractiveList: View {
    
    @State private var searchCarName: String = ""
    @State private var cars = Car.preview()
    
    var body: some View {
        
        VStack {
            NavigationView {
                List {
                    //ForEach(cars) { car in
                    ForEach(searchCar(searchItem: searchCarName)) { car in
                        CarListItem(car: car)
                    }
                    .onMove{ source, destination in
                        cars.move(fromOffsets: source, toOffset: destination)
                    }
                    .onDelete(perform: { indexSet in
                        cars.remove(atOffsets: indexSet)
                    })
                } // List End
                .searchable(text: $searchCarName, prompt: "Enter car model")
                .navigationTitle("Cars")
                .navigationBarItems(trailing: EditButton())
            } // Navigation View End
        }
        .padding()
    } // Body Ends
    
    private func searchCar(searchItem: String) -> [Car] {
        
        if(searchItem.isEmpty) {
            return cars
        } else {
            var resultList: [Car] = []
            
            for car in cars {
                if(car.model.contains(searchItem)) {
                    resultList.append(car)
                }
            }
            
            return resultList
        }
    }
}

#Preview {
    InteractiveList()
}
