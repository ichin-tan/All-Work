// import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Platform, StatusBar,
  Button,
  Alert,
  TouchableOpacity
} from 'react-native';
import { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Dropdown } from 'react-native-element-dropdown';

export default function App() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [age, setAge] = useState(0)
  // const [arrUsers, setArrUsers] = useState([
  //   {
  //     name: "Adam",
  //     email: "adam@123.com"
  //   }, 
  //   {
  //     name: "Emma",
  //     email: "emma@123.com"
  //   }
  // ])

  const arrOptions = [
    {
      label:"CS",
      value: "Cyber Security"
    },
    {
      label:"AI",
      value: "Artificial Intellegence"
    },
    {
      label:"GD",
      value: "Game Development"
    }
  ]

  const [selectedOption, setSelectedOption] = useState("")

  const handleShowInfoTapped = () => {
    Alert.alert(
      "Touchable opacity tapped!",
      `User Info: \nName: ${name} \nEmail: ${email}`,
      [
        {
          text: "Cancel",
          style: 'destructive',
          onPress: () => {
            console.log("Cancel tapped!");
          }
        },
        {
          text: "Done",
          style: 'default',
          onPress: () => {
            console.log("Done tapped!");
          }
        }
      ]
    )
  }

  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    // >
    //   <View style={styles.container}>
    //     <Text style={styles.title}>Components</Text>
    //     <TextInput style={styles.inputStyle}
    //       value={name}
    //       onChangeText={setName}
    //       placeholder="Enter Name"
    //       keyboardType='default'
    //       autoCorrect={false}
    //       autoCapitalize='words'
    //       maxLength={20}
    //     />
    //     <TextInput style={styles.inputStyle}
    //       value={email}
    //       onChangeText={setEmail}
    //       placeholder="Enter Email"
    //       keyboardType='email-address'
    //       autoCorrect={false}
    //       autoCapitalize='none'
    //       autoComplete='email'
    //     />
    //     <TextInput style={styles.inputStyle}
    //       value={age}
    //       onChangeText={setAge}
    //       placeholder="Enter Age"
    //       keyboardType='numeric'
    //       autoCorrect={false}
    //       autoCapitalize='none'
    //       maxLength={3}
    //     />
    //     <TextInput style={styles.inputStyle}
    //       value={password}
    //       onChangeText={setPassword}
    //       placeholder="Enter Password"
    //       keyboardType='default'
    //       autoCorrect={false}
    //       maxLength={20}
    //       secureTextEntry={true}
    //     />

    //     <Text style={styles.outputText}>Name: {name}</Text>
    //     <StatusBar style="auto" />
    //   </View>
    // </KeyboardAvoidingView>

    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaStyle}>
        <View style={styles.container}>
          <Text style={styles.title}>Components</Text>
          <TextInput style={styles.inputStyle}
            value={name}
            onChangeText={setName}
            placeholder="Enter Name"
            placeholderTextColor="white"
            keyboardType='default'
            autoCorrect={false}
            autoCapitalize='words'
            maxLength={20}
          />
          <TextInput style={styles.inputStyle}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter Email"
            placeholderTextColor="white"
            keyboardType='email-address'
            autoCorrect={false}
            autoCapitalize='none'
            autoComplete='email'
          />
          <TextInput style={styles.inputStyle}
            value={age}
            onChangeText={setAge}
            placeholder="Enter Age"
            placeholderTextColor="white"
            keyboardType='numeric'
            autoCorrect={false}
            autoCapitalize='none'
            maxLength={3}
          />
          <TextInput style={styles.inputStyle}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter Password"
            placeholderTextColor="white"
            keyboardType='default'
            autoCorrect={false}
            maxLength={20}
            secureTextEntry={true}
          />

          <Dropdown
            data={arrOptions}
            value={selectedOption}
            onChange={(option) => {setSelectedOption(option.value)}}
            labelField='label'
            valueField='value'
            style={styles.dropDownStyle}
          />

          {/* <Button
            style={styles.buttonStyle}
            color={'white'}
            title="Show Info"
            onPress={() => {
              Alert.alert("Button Pressed")
            }}
          >
          </Button> */}
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              handleShowInfoTapped()
            }}
          >
            <Text style={styles.buttonTextStyle}> Button </Text>
          </TouchableOpacity>

          <Text style={styles.outputText}>Name: {name}</Text>
          <Text style={styles.outputText}>Email: {email}</Text>
          <Text style={styles.outputText}>Age: {age}</Text>
          <Text style={styles.outputText}>Option: {selectedOption}</Text>
          <StatusBar
            barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
            backgroundColor='indigo'
            animated={true}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
    backgroundColor: 'maroon',
  },

  title: {
    fontSize: 30,
    color: 'white',
  },

  inputStyle: {
    fontSize: 24,
    borderColor: 'green',
    borderWidth: 2,
    padding: 4,
    marginTop: 20,
    height: 50,
    width: '85%',
    borderRadius: 10,
    paddingStart: 15,
    color: 'white',
    // backgroundColor: 'blue'
  },
  outputText: {
    fontSize: 20,
    width: '85%',
    marginTop: 10,
    color: 'yellow',
  },
  safeAreaStyle: {
    flex: 1,
  },
  buttonStyle: {
    width: '85%',
    borderRadius: 10,
    fontSize: 20,
    backgroundColor: 'green',
    padding: 5,
    marginTop: 20,
    height: 50,
    alignItems: 'center'
  },

  buttonTextStyle: {
    color: 'white',
    fontSize: 20,
    paddingTop: 7.5
  },
  dropDownStyle: {
    height: 50,
    width: '85%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 15
  }
});
