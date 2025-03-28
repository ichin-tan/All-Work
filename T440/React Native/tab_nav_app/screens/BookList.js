import { useCallback, useState } from "react";
import { useFocusEffect } from '@react-navigation/native'
import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { FIREBASE_DB } from "../config/FirebaseConfig";
import Icon from 'react-native-vector-icons/FontAwesome';

const BookList = ({ navigation }) => {

    const [bookList, setBookList] = useState([]);

    useFocusEffect(
        useCallback(() => {
            getAllBooks();
        }, [])
    );

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

    const deleteBook = async (data) => {
        try {
            const deleteBook = doc(FIREBASE_DB, "BookDB", data.id);
            await deleteDoc(deleteBook);
            Alert.alert(`${data.name} book deleted.`);
            getAllBooks();
        } catch (error) {
            console.log("Error deleting the book: ", error)
        }
    }

    const BookItem = ({ item }) => (
        <TouchableOpacity onPress={() => showBookDetail(item)}>
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
                        size={24}
                        onPress={() => deleteBook(item)} />
                </View>
            </View>
        </TouchableOpacity>
    );

    const ItemSeparator = () => (
        <View style={{ height: 5 }} />
    );

    const showBookDetail = (item) => {
        navigation.navigate("BookDetail", { bookDetail: item });
    }

    return (
        <View style={styles.container}>
            <FlatList
                ItemSeparatorComponent={ItemSeparator}
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
