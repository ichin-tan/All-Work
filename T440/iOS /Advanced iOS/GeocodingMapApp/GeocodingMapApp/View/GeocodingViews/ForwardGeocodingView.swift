//
//  ForwardGeocodingView.swift
//  GeocodingMapApp
//
//  Created by CP on 04/03/25.
//

import SwiftUI

import SwiftUI

struct ForwardGeocodingView: View {
    
    @State private var txtStreetAddress: String = ""
    @State private var txtCity: String = ""
    @State private var txtCountry: String = ""
    
    var body: some View {
        VStack(spacing: 0) {
            Text("Forward Geocoding")
                .font(.largeTitle)
            
            VStack(spacing: 10) {
                
                ZStack {
                    RoundedRectangle.init(cornerRadius: 10)
                        .fill(.white)
                        .frame(height: 50)
                    TextField("Street Address", text: $txtStreetAddress)
                        .padding()
                }
                
                ZStack {
                    RoundedRectangle.init(cornerRadius: 10)
                        .fill(.white)
                        .frame(height: 50)
                    TextField("City", text: $txtCity)
                        .padding()
                }

                ZStack {
                    RoundedRectangle.init(cornerRadius: 10)
                        .fill(.white)
                        .frame(height: 50)
                    TextField("Country", text: $txtCountry)
                        .padding()
                }

                Spacer()
                
                Button {
                    print("Forward Geocoding Tapped!")
                } label: {
                    Text("Forward Geocoding")
                        .font(.title2)
                        .foregroundColor(.white)
                }
                .frame(maxWidth: .infinity)
                .padding()
                .background(.mint)
                .cornerRadius(10)
                .overlay(
                    RoundedRectangle(cornerRadius: 10)
                        .stroke(.black, lineWidth: 2.5)
                )
                .padding(.bottom, 20)
            }
            .cornerRadius(10)
            .padding(EdgeInsets(top: 25, leading: 20, bottom: 0, trailing: 20))
        }
        .background(.teal)
    }
}

#Preview {
    ForwardGeocodingView()
}
