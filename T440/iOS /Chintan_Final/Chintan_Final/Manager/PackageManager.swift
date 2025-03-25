//
//  PackageManager.swift
//  Chintan_Final
//
//  Created by CP on 11/02/25.
//

import Foundation

class PackageManager: ObservableObject {
    
    @Published var arrPackages: [Package] = [] {
        didSet {
            save()
        }
    }
    
    func assignPackages() {
        if let arrUDPackagesData = UD.data(forKey: UD_KEY),
           let arrUDPackages = try? JSONDecoder().decode([Package].self, from: arrUDPackagesData) {
            self.arrPackages = arrUDPackages.sorted(by: { $0.packageId < $1.packageId })
        }
    }
    
    private func getAllPackages() -> [Package] {
        if let arrUDPackagesData = UD.data(forKey: UD_KEY),
           let arrUDPackages = try? JSONDecoder().decode([Package].self, from: arrUDPackagesData) {
            return arrUDPackages
        } else {
            print("Failed to retrieve packages from User Defaults!")
            return []
        }
    }
    
    func save() {
        if let arrUDPackagesData = try? JSONEncoder().encode(self.arrPackages) {
            UD.set(arrUDPackagesData, forKey: UD_KEY)
        }
    }
    
    func add(package: Package) {
        self.arrPackages.append(package)
    }
    
    func delete(at offsets: IndexSet) {
        self.arrPackages.remove(atOffsets: offsets)
    }
    
    func searchedPackages(strSearchText: String = "") -> [Package] {
        if(strSearchText.isEmpty) {
            return self.arrPackages
        } else {
            var arrToReturn: [Package] = []
            arrToReturn = self.arrPackages.filter({ String($0.packageId).lowercased().contains(strSearchText.lowercased()) || $0.deliveredStatus.rawValue.lowercased().contains(strSearchText.lowercased()) })
            
            return arrToReturn
        }
    }
    
    func getPackageBy(id: String) -> Package? {
        return self.arrPackages.first(where: { $0.id == id })
    }
    
    func update(with updatedPackage: Package) {
        for (index, existingPackage) in self.arrPackages.enumerated() {
            if(existingPackage.id == updatedPackage.id) {
                if(checkIfUpdated(oldPackage: existingPackage, newPackage: updatedPackage)) {
                    self.arrPackages.remove(at: index)
                    self.arrPackages.append(updatedPackage)
                }
                break
            }
        }
    }
    
    func checkIfUpdated(oldPackage: Package, newPackage: Package) -> Bool {
        if (oldPackage.packageId == newPackage.packageId && oldPackage.deliveryAddress == newPackage.deliveryAddress && oldPackage.deliveryDate == newPackage.deliveryDate && oldPackage.deliveredStatus == newPackage.deliveredStatus && oldPackage.carrier == newPackage.carrier) {
            return false
        } else {
            return true
        }
    }
}
