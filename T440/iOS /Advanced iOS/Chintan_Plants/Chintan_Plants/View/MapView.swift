//
//  LocationPickerView.swift
//  Chintan_Plants
//
//  Created by CP on 05/03/25.
//
//

import SwiftUI
import MapKit

struct PlantAnnotation : Identifiable {
    var id: String = UUID().uuidString
    var latitude: Double
    var longitude: Double
}

struct MapView: View {
    @State private var region: MKCoordinateRegion
    @State private var annotations: [PlantAnnotation] = []
    var onLocationSelectedClosure: ((CLLocationCoordinate2D) -> Void)? = nil
    @Environment(\.presentationMode) var presentationMode
        
    init(userLocation: CLLocationCoordinate2D?, onLocationSelectedClosure: @escaping (CLLocationCoordinate2D) -> Void) {
        let defaultLoc = userLocation ?? CLLocationCoordinate2D(latitude: 43.6843, longitude: -79.4434)
        self._region = State(initialValue: MKCoordinateRegion(
            center: defaultLoc,
            span: MKCoordinateSpan(latitudeDelta: 0.9, longitudeDelta: 0.9)
        ))
        self.onLocationSelectedClosure = onLocationSelectedClosure
        self._annotations = State(initialValue: [PlantAnnotation(latitude: defaultLoc.latitude, longitude: defaultLoc.longitude)])
    }
    
    var body: some View {
        NavigationView {
            Map(coordinateRegion: $region, annotationItems: annotations) { annotation in
                MapAnnotation(coordinate: CLLocationCoordinate2D(latitude: annotation.latitude, longitude: annotation.longitude)) {
                    ZStack {
                        RoundedRectangle(cornerRadius: 8)
                            .fill(Color.blue)
                            .frame(width: 30, height: 30)
                        Image(systemName: "pin.fill")
                            .foregroundColor(.white)
                    }
                }
            }
            .mapStyle(.hybrid(elevation: .realistic, pointsOfInterest: .all))
            .mapControls {
                MapUserLocationButton()
            }
            .onLongPressGesture {
                annotations = [PlantAnnotation(latitude: region.center.latitude, longitude: region.center.longitude)]
            }
            .navigationBarItems(
                trailing: Button("Done") {
                    onLocationSelectedClosure?(region.center)
                    presentationMode.wrappedValue.dismiss()
                }
            )
            .navigationTitle("Choose Location")
        }
    }
}
