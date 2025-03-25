//
//  PositionedVSTACKView.swift
//  PracticeProject
//
//  Created by CP on 03/02/25.
//

import SwiftUI

struct PositionedVSTACKView: View {
    var body: some View {
        
        HStack {
            VStack(alignment: .trailing, spacing: 20) {
                Image(systemName: "globe")
                    .imageScale(.large)
                    .foregroundColor(.blue)
                    .padding(20)
                    .background(Color.yellow)
                    .padding(.trailing, 10)
                Text("YOOOII")
                    .font(.title)
                    .foregroundColor(.green)
                    .padding(10)
                    .background(Color.gray)
                Image(systemName: "person")
                    .imageScale(.large)
                    .foregroundColor(.indigo)
                    .padding(25)
                    .background(Color.yellow)
                    .border(.black,width: 5)
                
                Spacer()
            }
            .ignoresSafeArea(.all)
            .background(Color.pink)
            
            Spacer()
        }
    }
}

#Preview {
    PositionedVSTACKView()
}

// How can I position the vstack below the status bar height
