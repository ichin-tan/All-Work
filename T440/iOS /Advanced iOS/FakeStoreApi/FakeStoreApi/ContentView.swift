//
//  ContentView.swift
//  FakeStoreApi
//
//  Created by CP on 06/03/25.
//

import SwiftUI

struct ContentView: View {
    
    @ObservedObject var productViewModel = ProductViewModel()
    @State private var selectedCategory = "all" //"electronics"
    @State private var localProducts : [Product] = []
    
    var body: some View {
        VStack {
            
            Picker("Categories", selection: $selectedCategory) {
                ForEach(self.productViewModel.categories) { category in
                    Text(category.name).tag(category.name)
                }
            }
//            .pickerStyle(MenuPickerStyle())
            .onChange(of: selectedCategory) {
                self.localProducts = self.productViewModel.filterProductsBasedOnCategory(category: selectedCategory)
            }
            #if os(macOS)
            .pickerStyle(.segmented)
                .horizontalRadioGroupLayout()
            #elseif os(iOS)
                .pickerStyle(SegmentedPickerStyle())
            #endif
            Spacer()
            
            List {
                ForEach(self.localProducts) { product in
                    Text(product.title)
                }
            }
        }
        .padding()
        .onAppear() {
            self.productViewModel.fetchCategories()
            self.productViewModel.fetchAllProducts() { success in
                self.localProducts = self.productViewModel.products
            }
        }
    }
}

#Preview {
    ContentView()
}
