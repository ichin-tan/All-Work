//
//  HierarchicalList.swift
//  Week01Session05
//
//  Created by Chintan Patel on 2025-01-31.
//

import SwiftUI

struct HierarchicalList: View {
    
    @State private var fileStructure = FileStructure.preview()
    
    var body: some View {
        List(fileStructure, children: \.children) { filename in
            if filename.isFolder {
                Label(filename.title, systemImage: "folder.fill")
            } else {
                Label(filename.title, systemImage: "envelope.fill")
            }
        }
    }
}

#Preview {
    HierarchicalList()
}
