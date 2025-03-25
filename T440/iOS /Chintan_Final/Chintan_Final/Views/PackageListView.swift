//
//  PackageListView.swift
//  Chintan_Final
//
//  Created by CP on 11/02/25.
//

import SwiftUI

struct PackageListView: View {
    
    @State var strSearch: String = ""
    @State private var isGoToAddPackage: Bool = false
    @State private var isGoToPackageDetail: Bool = false
    @State private var selectedPackageId: String = ""
    @StateObject var packageManager = PackageManager()
    
    var body: some View {
        NavigationStack {
            VStack {
                List {
                    ForEach(self.packageManager.searchedPackages(strSearchText: self.strSearch)) { package in
                        
                        HStack {
                            VStack(alignment: .leading) {
                                Text("Package ID - \(package.packageId)")
                                    .fontWidth(.standard)
                                    .fontWeight(.bold)
                                Text("Delivery Status - \(package.deliveredStatus.rawValue)")
                                    .fontWidth(.standard)
                            }
                            .frame(width: 300)
                                                        
                            Button {
                                self.selectedPackageId = package.id
                                self.isGoToPackageDetail = true
                            } label: {
                                Label("", systemImage: "arrow.right")
                                    .foregroundColor(.black.opacity(0.5))
                            }
                        }
                        
                        .frame(maxWidth: .infinity)
                        .listRowBackground(
                            Capsule()
                                .fill(package.deliveredStatus == .Delivered ? Color.green.opacity(0.3) : Color.blue.opacity(0.3))
                                .padding(3)
                        )
                        .listRowSpacing(10)
                    }
                    .onDelete(perform: { indexSet in
                        self.packageManager.delete(at: indexSet)
                    })
                }
                .searchable(text: self.$strSearch, prompt: "Enter Package Id or Package Status(Delivered / In Transit)")
                .fontWidth(.compressed)
            }
            .onAppear(perform: {
                self.packageManager.assignPackages()
            })
            .navigationTitle(TITLE)
            .navigationBarTitleDisplayMode(.large)
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button("+") {
                        self.isGoToAddPackage = true
                    }
                    .fontWeight(.bold)
                    .buttonStyle(.borderedProminent)
                }
            }
            .navigationDestination(isPresented: self.$isGoToAddPackage) {
                AddPackageView(packageManager: self.packageManager)
            }
            .navigationDestination(isPresented: self.$isGoToPackageDetail) {
                PackageDetailView(packageManager: self.packageManager, packageUuid: self.selectedPackageId)
            }
        }
    }
}

#Preview {
    PackageListView()
}
