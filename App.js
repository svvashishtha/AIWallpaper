/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Alert,
  Modal,
  Pressable,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';
import {Colors} from './resources/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import {CreateWallPage} from './pages/CreateWallPage';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [modalVisible, setModalVisible] = useState(false);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.background : Colors.background,
    width: '100%',
    height: '100%',
  };
  const buttonCreate = {
    borderWidth: 1,
    borderColor: isDarkMode ? Colors.textColorSurface : Colors.textColorSurface,
    backgroundColor: isDarkMode ? Colors.transparent : Colors.transparent,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Text>Here i am</Text>
      <TouchableOpacity
        style={[styles.fab, buttonCreate]}
        onPress={() => {
          console.log('Pressed');
          setModalVisible(true);
        }}>
        <Icon
          style={styles.padding4}
          name="pencil"
          backgroundColor="#3b5998"
          size={18}
        />
        <Text style={styles.textFAB}>Create new</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <CreateWallPage
          isDarkMode={isDarkMode}
          closeModal={() => {
            console.log('close modal received from modal');
            setModalVisible(!modalVisible);
          }}
        />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fab: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 400,
    right: 12,
    zIndex: 34,
    bottom: 64,
    position: 'absolute',
  },
  padding4: {
    paddingHorizontal: 4,
  },
  textFAB: {
    fontSize: 18,
    includeFontPadding: false,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#000',
  },
  rowFlex: {
    flexDirection: 'row',
  },
});

export default App;
