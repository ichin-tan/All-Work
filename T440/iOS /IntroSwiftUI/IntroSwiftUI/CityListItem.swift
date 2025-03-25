//
//  CityListItem.swift
//  IntroSwiftUI
//
//  Created by CP on 30/01/25.
//

import SwiftUI

struct CityListItem: View {
    
    var city: City
    
    var body: some View {
        
        HStack {
         
            Image(systemName: "person")
            
            VStack(alignment: .leading) {
                Text(city.name)
                Text(city.description)
            }
            .padding(.leading)
            
            Spacer()
            
            if (city.description.count > 20) {
                Image(systemName: "heart.fill")
                    .foregroundColor(Color.red)
            } else {
                Image(systemName: "heart.fill")
            }
            
        }
    }
}

