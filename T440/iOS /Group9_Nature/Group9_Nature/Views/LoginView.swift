//
//  LoginView.swift
//  Group9_Nature
//
//  Created by CP on 12/02/25.
//

import SwiftUI

struct LoginView: View {
    
    @State private var email: String = ""
    @State private var password: String = ""
    @State private var rememberMeSwitch: Bool = false
    
    @State var errorMessage = ""
    @State private var isShowAlert = false
    @State private var isGoToNatureList: Bool = false
    
    var body: some View {
        NavigationStack {
            VStack(spacing: 20) {
                Text("Nature Walk")
                    .font(.largeTitle)
                    .fontWeight(.bold)
                    .foregroundColor(.green)

                TextField("Email", text: $email)
                    .padding()
                    .background(Color(.systemGray6))
                    .cornerRadius(8)
                    .autocapitalization(.none)
                    .keyboardType(.emailAddress)

                SecureField("Password", text: $password)
                    .padding()
                    .background(Color(.systemGray6))
                    .cornerRadius(8)

                Toggle("Remember Me", isOn: $rememberMeSwitch)
                    .toggleStyle(SwitchToggleStyle(tint: .green))

                Button(action: {
                    if self.isValidData() {
                        if self.login() {
                            self.isGoToNatureList = true
                        }
                    }
                }) {
                    Text("Login")
                        .font(.headline)
                        .foregroundColor(.white)
                        .padding()
                        .frame(maxWidth: .infinity)
                        .background(Color.green)
                        .cornerRadius(8)
                }

                Spacer()
            }
            .padding()
            .onAppear() {
                if let currentUser = getCurrentUserFromUD() {
                    if (currentUser.rememberMePreference == true) {
                        email = currentUser.email
                        password = currentUser.password
                        rememberMeSwitch = true
                    }
                }
            }
            .alert(isPresented: $isShowAlert) {
                Alert(title: Text("Nature Walk"),
                      message: Text(errorMessage),
                      dismissButton: .default(Text("OK")))
            }
            .navigationBarBackButtonHidden(true)
            .navigationDestination(isPresented: $isGoToNatureList) {
                NatureListView()
            }
        }
    }
    
    func isValidData() -> Bool {
        if(self.email == "") {
            self.errorMessage = "Email is required!"
            self.isShowAlert = true
            return false
        } else if(self.password == "") {
            self.errorMessage = "Password is required!"
            self.isShowAlert = true
            return false
        } else if !(checkEmailExistInDatabase(email: email)) {
            self.errorMessage = "Email doesn't exist!"
            self.isShowAlert = true
            return false
        } else if !(checkForCorrectPassword(email: email, password: password)) {
            self.errorMessage = "Password doesn't match!"
            self.isShowAlert = true
            return false
        } else {
            self.errorMessage = ""
            self.isShowAlert = false
            return true
        }
    }

    func login() -> Bool {
        if let user = arrUsers.first(where: { $0.email == email && $0.password == password }) {
            user.rememberMePreference = rememberMeSwitch
            saveCurrentUserInUD(user: user)
            return true
        } else {
            self.errorMessage = "No user found!"
            self.isShowAlert = true
            return false
        }
    }
}
