// BookList.js

import { useEffect, useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { collection, getDocs } from 'firebase/firestore';
import { FIREBASE_DB } from "../config/FirebaseConfig";
import Icon from 'react-native-vector-icons/FontAwesome';

const BookList = () => {

    const [bookList, setBookList] = useState([]);

    const deleteBook = () => {
        
    }

    useEffect(() => {
        getAllBooks();
    }, []);

    const getAllBooks = async () => {
        try {
            const collectionRef = collection(FIREBASE_DB, 'BookDB');

            const bookDocs = await getDocs(collectionRef);
            const bookListResponse = [];

            bookDocs.forEach((doc) => {
                const Book = {
                    id: doc.id,
                    ...doc.data()
                }
                bookListResponse.push(Book);
            });

            setBookList(bookListResponse);

        } catch (err) {
            console.log("Error fetching book data: ", err)
        }
    }

    const BookItem = ({ item }) => (
        <TouchableOpacity>
            <View style={styles.mainView}>
                <View style={styles.subViewContainer}>
                    <View style={styles.subView}>
                        <Text style={styles.nameText}>{item.name}</Text>
                        <Text style={styles.authorText}>{item.author}</Text>
                    </View>
                    <Icon
                        style={{ marginLeft: 'auto' }}
                        name='trash'
                        color='white'
                        size={24} />
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                keyExtractor={(item) => { return item.id }}
                data={bookList}
                renderItem={({ item }) => <BookItem item={item} />} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center"
    },
    mainView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'dodgerblue',
        padding: 10,
        maxWidth: '100%'
    },
    subViewContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    subView: {
        flex: 1,
        height: '50%',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    nameText: {
        fontSize: 18,
        fontWeight: '700',
        color: 'white'
    },
    authorText: {
        fontSize: 15,
        fontWeight: '500',
        color: 'white'
    }
});

export default BookList;
