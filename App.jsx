import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
  SafeAreaView,
  TextInput,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import QRScanner from './QRScanner';

const dWidth = Dimensions.get('window').width;
const colour = 'black';

const App = () => {
  const [showQR, setShowQR] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const openQRscanner = () => {
    setShowQR(true);
  };

  const onQrRead = qrtext => {
    if (qrtext !== null) {
      setQrCode(qrtext);
      ToastAndroid.show(qrtext, ToastAndroid.LONG);
    }
    setShowQR(false);
  };

  const handleLogin = () => {
    if (username === 'Admin' && password === 'Admin') {
      setIsLoggedIn(true);
      ToastAndroid.show('Login Successful', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('Invalid Username or Password', ToastAndroid.SHORT);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
       {!isLoggedIn && <Text style={styles.topWelcome}>Welcome to VistaMag</Text>}
      {!isLoggedIn ? (
        <SafeAreaView style={styles.loginContainer}>
         <Image
  source={require('./assets/images/APPLOGO.jpeg')} // Ensure the file path is correct
  style={styles.logo}
  resizeMode="contain"
/>
          <Text style={styles.loginTitle}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </SafeAreaView>
      ) : (
        <SafeAreaView style={styles.page}>
          <Text
            style={{
              fontSize: dWidth * 0.1,
              color: 'black',
              fontWeight: 'bold',
              flex: 0.5,
            }}>
            VistaMag
          </Text>
          <TouchableOpacity onPress={() => openQRscanner()} style={styles.btn}>
            <Ionicons
              name={'scan-circle-outline'}
              size={qrCode ? dWidth * 0.4 : dWidth * 0.75}
              color={colour}
            />
          </TouchableOpacity>
          {showQR ? <QRScanner onRead={onQrRead} /> : null}
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topWelcome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'gray',
    textAlign: 'center',
    marginVertical: 20,
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    width: 150, // Set the desired width
    height: 150, // Set the desired height
    borderRadius: 75, // Half of the width or height to make it round
    marginBottom: 20,
  },
  
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: colour,
    padding: 15,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  page: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn: {
    alignItems: 'center',
    flex: 1,
  }
});
