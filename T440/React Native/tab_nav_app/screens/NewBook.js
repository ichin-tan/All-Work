// BookList.js

import { Button, StyleSheet, Text, View, StatusBar, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";

const NewBook = () => {

    const [bookName, setBookName] = useState('');
    const [bookAuthor, setBookAuthor] = useState('');
    const [bookGenre, setBookGenre] = useState('')

    

    return (
        <View style={styles.container}>

            <View style={styles.headerView}>
                <Text style={styles.headerText}>New Book</Text>
            </View>

            <TextInput
                style={styles.inputText}
                placeholder="Enter Book Name"
                value={bookName}
                autoCapitalize="words"
                onChangeText={(text) => setBookName(text)} />

            <TextInput
                style={styles.inputText}
                placeholder="Enter Book Author"
                value={bookAuthor}
                autoCapitalize="words"
                onChangeText={(text) => setBookAuthor(text)} />

            <TextInput
                style={styles.inputText}
                placeholder="Enter Book Genre"
                value={bookGenre}
                autoCapitalize="words"
                onChangeText={(text) => setBookGenre(text)} />

            <TouchableOpacity style={styles.buttonStyle}>
                <Text style={styles.buttonText}>Add Book</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    headerView: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'dodgerblue'
    },
    inputText: {
        width: '90%',
        borderRadius: 10,
        fontSize: 18,
        borderColor: 'black',
        fontWeight: "bold",
        borderWidth: 2,
        padding: 10,
        marginTop: 20,
    },
    buttonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        borderRadius: 10,
        height: 40,
        backgroundColor: 'dodgerblue',
        marginTop: 20
    },
    buttonText: {
        color: 'white',
        fontSize: 22,
        fontWeight: '700'
    }

});

export default NewBook;
