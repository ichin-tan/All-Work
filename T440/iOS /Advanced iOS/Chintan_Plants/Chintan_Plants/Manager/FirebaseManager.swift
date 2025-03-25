//
//  FirebaseManager.swift
//  Chintan_Plants
//
//  Created by CP on 05/03/25.
//

import Foundation
import FirebaseFirestore

class FirebaseManager {
    static let shared = FirebaseManager()
    private let db = Firestore.firestore()
    private let plantsCollection = "plants"
    
    private init() {}
    
    func savePlant(_ plant: Plant) {
        db.collection(plantsCollection).document(plant.id ?? UUID().uuidString).setData([
            "name": plant.name,
            "type": plant.type,
            "size": plant.size,
            "quantity": plant.quantity,
            "location": [
                "latitude": plant.location.latitude,
                "longitude": plant.location.longitude
            ]
        ])
    }
    
    func fetchPlants(completion: (([Plant]) -> ())?) {
        
        var arrToReturn : [Plant] = []
        
        db.collection(plantsCollection)
            .addSnapshotListener({ snapshot, error  in
                
                if let snapshot = snapshot {
                    for document in snapshot.documents {
                        do {
                            let plant = try document.data(as: Plant.self)
                            arrToReturn.append(plant)
                        } catch {
                            print("Error while fetching the plant")
                        }
                    }
                    
                    completion?(arrToReturn)
                }
            }
        )
    }
        
    func deletePlant(id: String) {
        db.collection(plantsCollection)
            .document(id)
            .delete() { error in
                if let err = error {
                    print("Unable to delete plant \(err.localizedDescription)")
                } else {
                    print("Plant Deleted: \(id)")
                }
            }
    }

}
