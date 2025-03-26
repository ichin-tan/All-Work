import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const Dashboard = ({ navigation }) => {
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const [numPeople, setNumPeople] = useState('');

  const roomOptions = [
    {
      label: "A101",
      value: "A101"
    },
    {
      label: "A102",
      value: "A102"
    },
    {
      label: "A103",
      value: "A103"
    },
    {
      label: "A104",
      value: "A104"
    },
    {
      label: "A105",
      value: "A105"
    },
  ]

  const [selectedRoom, setSelectedRoom] = useState('A101');

  const handleCheckAvailability = () => {
    if (!studentId || !name || !numPeople) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    } else if (!Number.isInteger(Number(numPeople))) {
      Alert.alert('Error', 'Please enter valid number of people');
      return;
    }
    setName("")
    setStudentId("")
    setNumPeople("")
    setSelectedRoom("A101")
    navigation.navigate('Booking', {
      studentId,
      name,
      numPeople: parseInt(numPeople),
      selectedRoom,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book a Study Room</Text>

      <TextInput
        style={styles.input}
        placeholder="Student ID"
        placeholderTextColor="gray"
        value={studentId}
        onChangeText={setStudentId}
      />

      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="gray"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Number of People"
        placeholderTextColor="gray"
        keyboardType="numeric"
        value={numPeople}
        onChangeText={setNumPeople}
      />

      <Text style={styles.label}>Select Room:</Text>

      <Dropdown
        data={roomOptions}
        value={selectedRoom}
        onChange={(room) => { setSelectedRoom(room.value) }}
        labelField='label'
        valueField='value'
        style={styles.dropDownStyle}
      />
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => {
          handleCheckAvailability()
        }}
      >
        <Text style={styles.buttonTextStyle}> Book </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: "#BBDEF0",
    padding: 20,
  },
  title: {
    fontSize: 25,
    color: '1D1E2C',
    width: '100%',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold'
  },
  input: {
    height: 40,
    borderColor: '#1D1E2C',
    color: '#1D1E2C',
    borderWidth: 3,
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    fontSize: 18,
    fontWeight: 'semibold',
    height: 50,
    backgroundColor: "#FFFFFF"
  },
  buttonStyle: {
    width: '100%',
    borderRadius: 10,
    fontSize: 20,
    backgroundColor: '#1D1E2C',
    marginTop: 20,
    height: 50,
    alignItems: 'center'
  },
  buttonTextStyle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 12.5
  },
  dropDownStyle: {
    height: 50,
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 15,
    borderColor: '#1D1E2C',
    color: '#1D1E2C',
    borderWidth: 3,
    borderRadius: 10,
  },
  label: {
    fontSize: 18,
    color: '1D1E2C',
    width: '100%',
    
    fontWeight: 'bold'
  },
});

export default Dashboard;