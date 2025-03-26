import { View, Text, StyleSheet, Alert, Pressable } from 'react-native';

const rooms = [
  { roomNumber: 'A101', capacity: 5, available: true },
  { roomNumber: 'A102', capacity: 10, available: false },
  { roomNumber: 'A103', capacity: 8, available: false },
  { roomNumber: 'A104', capacity: 10, available: true },
  { roomNumber: 'A105', capacity: 7, available: true },
];
const Booking = ({ route }) => {
  const { selectedRoom, numPeople, studentId, name } = route.params;
  const room = rooms.find(r => r.roomNumber === selectedRoom);
  let statusMessage = '';
  let alertShown = false;
  let isShowGreen = false;

  if (!room) {
    statusMessage = 'Not Found';
    Alert.alert('Error', 'Selected room does not exist!');
    alertShown = true;
  } else if (!room.available) {
    statusMessage = 'Not available';
    if (!alertShown) Alert.alert('Unavailable', "Room is not available!");
  } else if (numPeople > room.capacity) {
    statusMessage = "Capacity Exceeded";
    if (!alertShown) Alert.alert('Capacity Exceeded', `Capacity: ${room.capacity} (Your group: ${numPeople})`);
  } else {
    statusMessage = 'Available';
    if (!alertShown) Alert.alert('Success', 'Room is available');
    isShowGreen = true
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Booking Details</Text>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Student ID:</Text>
        <Text style={styles.value}> {studentId}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}> {name}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Room:</Text>
        <Text style={styles.value}> {selectedRoom}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>Capacity:</Text>
        <Text style={styles.value}> {room.capacity}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Group Size:</Text>
        <Text style={styles.value}> {numPeople}</Text>
      </View>

      <Pressable
        style={isShowGreen ? styles.successBannerStyle : styles.errorBannerStyle}
      >
        <Text style={styles.bannerTextStyle}>
          {statusMessage}
        </Text>
      </Pressable>
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
    marginBottom: 30,
    fontWeight: 'bold'
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    paddingHorizontal: 5,
    justifyContent: 'space-between',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18
  },
  value: {
    color: '#0D3B66',
    fontSize: 18,
    fontWeight: 'semibold',
    width: '60%'
  },
  successBannerStyle: {
    width: '100%',
    borderRadius: 10,
    fontSize: 20,
    backgroundColor: 'green',
    marginTop: 10,
    height: 50,
    alignItems: 'center'
  },
  errorBannerStyle: {
    width: '100%',
    borderRadius: 10,
    fontSize: 20,
    backgroundColor: '#511C29',
    marginTop: 10,
    height: 50,
    alignItems: 'center'
  },
  bannerTextStyle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 12.5
  },
});

export default Booking;