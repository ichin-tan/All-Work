//
//  ControlContentView.swift
//  IntroSwiftUI
//
//  Created by CP on 28/01/25.
//

// Session 3 - Prof Jigisha

import SwiftUI

struct ControlContentView: View {
    
    @State private var tfName: String = "Default"
    @State private var tfEmail: String = "Default Email"
    @State private var subscription: Bool = false
    @State private var yearsOfExperience: Int = 2
    @State private var birthDate: Date = Date()
    @State private var isAlertActivate = false
    @State private var alertTitle = ""
    @State private var alertMessage = ""
    let pickerJobOptions = ["iOS", "Android", "Web"]
    @State private var jobIndex = 0
    
    @State private var defaultJob: JobOptions = .iOS
    
    enum JobOptions: String, Identifiable, CaseIterable {
        var id: Self {
            self
        }
        
        case iOS, Android, Web
    }
    
    let date16yearsAgo = Calendar.current.date(byAdding: .year, value: -16, to: Date())
    private var age: Int {
        let currentDate = Date()
        let dateComponents = Calendar.current.dateComponents([.year], from: self.birthDate, to: currentDate)
        return dateComponents.year ?? 0
    }
    
    var body: some View {
        
        NavigationStack {
            VStack(alignment: .leading, spacing: 20) {
                
                Form {
                    
                    Section(header: Text("Personal Info")) {
                        TextField("Enter name: ", text: self.$tfName, onEditingChanged: { changed in
                            print("Changed")
                        })
                            .autocapitalization(.words)
                            .autocorrectionDisabled(true)
                            .keyboardType(.default)
                            .font(.largeTitle)
                            .padding(.leading)
                            .border(.black, width: 2)
                        
                        TextField("Enter email: ", text: self.$tfEmail)
                            .autocapitalization(.words)
                            .autocorrectionDisabled(true)
                            .keyboardType(.emailAddress)
                            .font(.largeTitle)
                            .border(.blue, width: 5)

                        DatePicker("Select Birthdate: ", selection: self.$birthDate, in: ...self.date16yearsAgo!, displayedComponents: .date)
                            .datePickerStyle(.compact)
                    }
                    
                    if(self.yearsOfExperience != 0) {
                        Section(header: Text("Job Info")) {
                                                
                            Toggle("Are you a developer?", isOn: self.$subscription)
                            
                            Stepper() {
                                
                                Text("Yearss of Experience: \(self.yearsOfExperience)")
                            } onIncrement: {
                                if (self.yearsOfExperience > 40) {
                //                    Text("Not eligible")
                                } else {
                                    self.yearsOfExperience += 1
                                }
                            } onDecrement: {
                                if (self.yearsOfExperience <= 0) {
                //                    Text("Can't have negative experien ce")
                                } else {
                                    self.yearsOfExperience -= 1
                                }
                            }
                        }
                    }
                    
                    Section(header: Text("More control")) {
                        Picker("Job", selection: self.$jobIndex) {
                                                        
                            ForEach(0..<self.pickerJobOptions.count, id: \.self) { jobIndex in
                                Text("\(self.pickerJobOptions[jobIndex])")//.tag(job)
                            }
//                            
//                            ForEach(JobOptions.allCases) { job in
//                                Text("\(job.rawValue)")
//                                    .tag(job)
//                            }
                        }
                        .pickerStyle(.automatic)
                    }
                    
                    Section(header: Text("Info")) {
                        Text("name that will be changed when tfName will change - \(self.tfName)!")
                        
                        Text("email that will be changed when tfName will change - \(self.tfEmail)!")
                        
                        Text("developer switch changed to - \(self.subscription)!")
                        
                        Text("How many years of experience do you have?")
                        
                        Text("Years of experience : \(self.yearsOfExperience)")
                            .font(.title)
                        
                        Text("Selected job - \(self.pickerJobOptions[self.jobIndex])")
                    }
                    
                    Button {
                        // This is action
                        self.checkEligibleForJob()
                    }label: {
                        Text("Button title")
                            .font(.title)
                            .bold()
                            .padding(15)
                            .background(Color.black)
                            .border(.blue,width: 5)
                    }.alert(isPresented: self.$isAlertActivate) {
                        Alert(title: Text("\(self.alertTitle)"), message: Text("\(self.alertMessage)"),dismissButton: .default(Text("OK"), action: {
                            print("Alert dismissed!")
                        }))
                    }
        //            .buttonStyle(.borderedProminent)

                }.background(.black)
                
            }
            .padding()
            .background(.yellow)
            .navigationTitle("My App")
            .navigationBarTitleDisplayMode(.automatic)
        }
        
    }
    
    private func checkEligibleForJob() {
        if (self.tfName.isEmpty) {
            self.isAlertActivate = true
            self.alertTitle = "Text Error"
            self.alertMessage = "Name cannot be empty!"
        } else if(self.tfEmail.isEmpty) {
            self.isAlertActivate = true
            self.alertTitle = "Text Error"
            self.alertMessage = "Email cannot be empty!"
        }
    }
    
}

#Preview {
    ControlContentView()
}

// State - A property wrapper which allows write and read operation on property. As property is changing and structures are immutable, state lets you change the properties.
// $ is called binding and use it when you are mutating the value
// Because we wrote $ with tfName and tfEmail, Whenever these values will change, All the elements which are using these values will break and regenerate so it will reflect in real time
// Spacer gonna take all the available space
// Form - If asking user for input, its recomended to use a form
// Learn enum with identifiable
