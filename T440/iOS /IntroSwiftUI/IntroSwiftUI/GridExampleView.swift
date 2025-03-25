//
//  GridExampleView.swift
//  IntroSwiftUI
//
//  Created by CP on 29/01/25.
//

// Session 3 - Prof Chintan

import SwiftUI

struct GridExampleView: View {
    
    struct Product: Identifiable {
        var id = UUID()
        var item: String
        var description: String
        var quantiry = 1
        var price: Double = 0.0
    }
    
    let products = [
        Product(item: "Headphones", description: "Best headphone experience!", quantiry: 1, price: 16.99),
        Product(item: "iPhone", description: "Best iPhone experience!", quantiry: 4, price: 1699.99),
        Product(item: "Airpods", description: "Best Airpods experience!", quantiry: 3, price: 299.99),
        Product(item: "Macbook", description: "Best Macbook experience!", quantiry: 2, price: 1299.99),
        Product(item: "iWatch", description: "Best iWatch experience!", quantiry: 5, price: 749.99),
        
    ]
    
    struct WeatherData: Identifiable {
        var id = UUID()
        var day: String
        var lowest: Int
        var highest: Int
    }
    
    let arrWeatherData = [
        WeatherData(day: "Today", lowest: -11, highest: 1),
        WeatherData(day: "Thursday", lowest: -12, highest: 0),
        WeatherData(day: "Friday", lowest: -5, highest: 2),
        WeatherData(day: "Saturday", lowest: -13, highest: -5),
        WeatherData(day: "Today", lowest: -11, highest: 1),
        WeatherData(day: "Thursday", lowest: -12, highest: 0),
        WeatherData(day: "Friday", lowest: -5, highest: 2),
        WeatherData(day: "Saturday", lowest: -13, highest: -5),
        WeatherData(day: "Today", lowest: -11, highest: 1),
        WeatherData(day: "Thursday", lowest: -12, highest: 0),
        WeatherData(day: "Friday", lowest: -5, highest: 2),
        WeatherData(day: "Saturday", lowest: -13, highest: -5),
        WeatherData(day: "Today", lowest: -11, highest: 1),
        WeatherData(day: "Thursday", lowest: -12, highest: 0),
        WeatherData(day: "Friday", lowest: -5, highest: 2),
        WeatherData(day: "Saturday", lowest: -13, highest: -5),
        WeatherData(day: "Today", lowest: -11, highest: 1),
        WeatherData(day: "Thursday", lowest: -12, highest: 0),
        WeatherData(day: "Friday", lowest: -5, highest: 2),
        WeatherData(day: "Saturday", lowest: -13, highest: -5)



    ]
    
    var body: some View {
        
        GroupBox("Weather data") {
            Divider()
            
            ScrollView {
                Grid(alignment: .leading, horizontalSpacing: 10, verticalSpacing: 20) {
                    
                    GridRow {
                        Text("Day")
                        Text("Image")
                        Text("Lowest")
                        Text("Progress")
                        Text("Highest")
                    }
                    Divider()

                    ForEach(arrWeatherData) { weather in
                        
                        GridRow {
                            Text(weather.day)
                            Image(systemName: "person")
                            Text(String(weather.lowest))
                            ProgressView(value: 0.4)
                                .frame(width: 100)
                            Text(String(weather.highest))
                        }
                        
                    }
                }
            }
            
            Spacer()
        }
        
        
//        Grid(alignment: .leading,horizontalSpacing: 10, verticalSpacing: 10) {
//            
//            GridRow() {
//                Text("Item")
//                Text("Description")
//                Text("Quantity")
//                Text("Price")
//            }
//            .font(.title2)
//            .bold()
//            
//            Divider()
//            
//            ForEach(products) { product in
//                
//                GridRow(alignment: .bottom) {
//                    Text(product.item)
//                        .bold()
//                    Text(product.description)
//                    Text("\(product.quantiry)")
//                        .gridColumnAlignment(.center)
//                    Text(String(format: "$%.2f", product.price))
//                }
//            }
//            
//            Divider()
//            
//            GridRow() {
//                Color.clear.gridCellColumns(3)
//                    .gridCellUnsizedAxes(.vertical)
//                Text("$9500")
//            }
//        }
//        .background(Color.red)
    }
}

#Preview {
    GridExampleView()
}
