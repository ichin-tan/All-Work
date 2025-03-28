import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  StatusBar } from "react-native";
import { FIREBASE_DB } from "../config/FirebaseConfig";

const BookDetail = ({navigation, route}) => {

  const { bookDetail } = route.params;

  const [bookName, setBookName] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [bookGenre, setBookGenre] = useState('');

  useEffect(() => {
    setBookName(bookDetail.name);
    setBookAuthor(bookDetail.author);
    setBookGenre(bookDetail.genre);
  }, []);

  const updateBook = async () => {
    const bookData = {
      name: bookName,
      author: bookAuthor,
      genre: bookGenre
    }

    const bookToUpdate = doc(FIREBASE_DB, "BookDB", bookDetail.id);
    await updateDoc(bookToUpdate, bookData);
    Alert.alert("Book Updated Successfully");
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
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
    
      <TouchableOpacity 
        onPress={() => updateBook()}
        style={styles.buttonStyle}>
        <Text style={styles.buttonText}>Update Book</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  headerView: {
    backgroundColor: 'dodgerblue',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  inputText: {
    width: '80%',
    borderRadius: 10,
    borderColor: 'dodgerblue',
    borderWidth: 2,
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    borderRadius: 10,
    height: 40,
    backgroundColor: 'dodgerblue',
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: '700'
  }
});

export default BookDetail;
