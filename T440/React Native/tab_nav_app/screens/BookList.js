// BookList.js

import { Button, StyleSheet, Text, View } from "react-native";

const BookList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Book List</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 28,
    fontWeight: "bold",
  },
});

export default BookList;
