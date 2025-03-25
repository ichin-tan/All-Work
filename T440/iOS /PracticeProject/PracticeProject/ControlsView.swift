//
//  ControlsView.swift
//  PracticeProject
//
//  Created by CP on 03/02/25.
//

import SwiftUI

struct ControlsView: View {
    
    @State private var strName : String = ""
    @State private var date: Date = Date.now
    @State private var isCricketer: Bool = false
    @State private var runs = 0
    
    let pickerOptionCricketers = ["Rohit", "Virat", "AB", "Dhobi", "Bumrah", "Root", "Smith", "Williamson", "Pollard", "Sachin"]
    @State private var favCricketer = "Rohit"
    
    var body: some View {
        
        NavigationStack {
            VStack {
                
                Form {
                    Section("Personal Info") {
                        TextField.init("Enter Name", text: $strName) { _ in }
                            .onChange(of: favCricketer) { oldValue, newValue in
                                print(oldValue, newValue)
                            }
                            .onSubmit {
                                print("Submitted")
                            }
                            .autocorrectionDisabled(true)
                            .autocapitalization(.words)
                            .keyboardType(.default)
                            .padding()
                            .border(.blue, width: 3)
                        
                        DatePicker("Date Picker", selection: $date, displayedComponents: .date)
                            .datePickerStyle(.compact)
                        
                    }
                    
                    Section(header: Text("Cricketer Info")) {
                        Toggle("Are you a cricket player?", isOn: $isCricketer)
                        
                        if(isCricketer) {
                            Stepper() {
                                Text("How many runs? \(runs)")
                            } onIncrement: {
                                runs += 1000
                            } onDecrement: {
                                runs -= 1000
                            }
                        }
                    }
                    
                    Section(header: Text("Fav cricketer?")) {
                        Picker("Cricketers", selection: $favCricketer) {
                            ForEach(pickerOptionCricketers, id: \.self) { cricketer in
                                Text(cricketer)
                            }
                        }
                    }
                }
                
            }
            .padding(.all)
            .background(Color.green)
            .navigationTitle(Text("IOP"))
        }
    }
}

#Preview {
    ControlsView()
}
