import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button, TextInput, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome } from '@expo/vector-icons';
import ExitApp from 'react-native-exit-app';
import { BackHandler } from 'react-native';



const App = () => {
  const [clickedPlus, setClickedPlus] = useState(false);
  const [clickedMenu, setClickedMenu] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);

  
  
  const handlePlusChange = () => {
    setClickedPlus(true);
    setClickedMenu(false);
  
  };
  const handleMenuChange = () => {
     setClickedMenu(true);
     setClickedPlus(false);
  
  };
  const handleLogoutChange = () => {
    setLoggedOut(true);
    ExitApp.exitApp();
  };
  useEffect(() => {
    const backAction = () => {
      if (loggedOut) {
        BackHandler.exitApp();
      }
      return true;
    };
  
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
  
    return () => backHandler.remove();
  }, [loggedOut]);
  
  return (
    <>
    {clickedMenu ? <Lists/> :  <InsertScreen/> }
   

    <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={handlePlusChange}>
          <Icon name="plus" color="white" size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={handleMenuChange}>
          <Icon name="bars" color="white" size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={handleLogoutChange}>
          <Icon name="sign-out" color="white" size={20} />
        </TouchableOpacity>
      </View>
    </>
  )
}

const InsertScreen = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleAddContact = async () => {
    // Add logic to save the name and phone number
    // You can make an API request or store it locally, e.g., using AsyncStorage
    console.log('Name:', name);
    console.log('Phone Number:', phoneNumber);
    try {
      const response = await fetch(`${API_BASE_URL}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phoneNumber }),
      });

      if (response.ok) {
        // Contact added successfully
        console.log('Contact added successfully');
        setName('');
        setPhoneNumber('');
      } else {
        // Handle error response
        console.error('Failed to add contact');
      }
    } catch (error) {
      // Handle network error
      console.error('Network error:', error);
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <Button title="Add Contact" onPress={handleAddContact} />
      </View>
    
    </View>
  );
};


const Lists = () => {
  const [credentials, setCredentials] = useState([
    { id: 1, name: 'Abubakar', phoneNumber: '08123402377' },
    { id: 2, name: 'Abubakar', phoneNumber: '08123402377' },
    { id: 3, name: 'Abubakar', phoneNumber: '08123402377' },
    { id: 4, name: 'Abubakar', phoneNumber: '08123402377' },
    { id: 5, name: 'Abubakar', phoneNumber: '08123402377' },
   
  ]);
  const [searchText, setSearchText] = useState('');

  const handleDelete = (id) => {
    const updatedCredentials = credentials.filter((credential) => credential.id !== id);
    setCredentials(updatedCredentials);
  };

  const handleEdit = (id) => {
    // handle edit functionality
  };

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const filteredCredentials = credentials.filter((credential) =>
    credential.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderCredential = ({ item }) => (
    <View style={styles.credentialContainer}>
      <View style={styles.credentialInfo}>
        <Text style={styles.credentialUsername}>Username : {item.name}</Text>
        <Text style={styles.credentialPassword}>Password : {item.phoneNumber}</Text>
        <View style={styles.credentialActions}>
         <TouchableOpacity style={styles.editIcon} onPress={() => navigation.navigate('Dashboard')}>
           <FontAwesome name="edit" size={25} color="#FF0000" />
         </TouchableOpacity>
         <TouchableOpacity style={styles.deleteIcon} onPress={() => handleDelete(item.id)}>
           <FontAwesome name="trash" size={25} color="#FF0000" />
         </TouchableOpacity>
         </View>
      </View>
    
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search Credentials"
          style={styles.searchInput}
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>
      <FlatList
        data={filteredCredentials}
        renderItem={renderCredential}
        keyExtractor={(item) => item.id.toString()}
        style={styles.credentialList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 40,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
  },
  searchInput: {
    padding: 10,
    flex: 1,
  },
  filterIcon: {
    marginRight: 10,
  },
  credentialsContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 10,

  },
  credentialInfo: {
    marginHorizontal: 20,
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  credentialItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  credentialTitle: {
    fontSize: 12,
    fontWeight: '400',
    // textAlign: 'center',
    color: '#333652',
   
  },
  credentialPassword: {
    fontSize: 12,
    fontWeight: '400',
    // textAlign: 'center',
    color: '#333652',
   
  },
  credentialUsername: {

    fontSize: 12,
    fontWeight: '400',
    // textAlign: 'center',
    color: '#333652',
   
  },
  credentialActions: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    flex : 1,
   
  },
  editIcon: {
    marginHorizontal: 5,
  },
  deleteIcon: {
    marginHorizontal: 5,
  },
  
  addButton: {
    backgroundColor: '#ff914d',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {

    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: 60,
    backgroundColor: '#333652',
  },
  footerButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '33.33%',
    height: '100%',
  },
});

export default App;
