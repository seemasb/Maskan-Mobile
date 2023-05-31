import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView, StyleSheet, TextInput } from 'react-native';
import 'firebase/firestore';
import { db } from '../../firebase';
import { collection, addDoc, getDocs, onSnapshot } from "firebase/firestore";
import { createStackNavigator } from '@react-navigation/stack';
import ChatScreen from './ChatScreen';
import { Avatar } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';



const Stack = createStackNavigator();

const ProfileInfoStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Conversations"
        component={ChatRoomList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Chat Screen"
        component={ChatScreen}
        options={{
          headerTitle: '',
          headerTintColor: '#45729d',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileInfoStack;


const createChatRoomTest = async (participant1Id, participant2Id) => {
  try {
    const chatRoom = await addDoc(collection(db, "chatRooms"), {
      participants: [participant1Id, participant2Id],
      messages: [],
    });
    console.log("Document written with ID: ", chatRoom.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  // return chatRoom.id;
}

// props:
// { navigation, route }
const ChatRoomList = ({ navigation }) => {
  // const { uid, displayName, photoURL } = route.params;
  // const uid = 1;
  const displayName = 'Seema'
  const [chatRooms, setChatRooms] = useState([]);
  const [chatRoomsNames, setChatRoomsNames] = useState([]);
  const [lastMessages, setLastMessages] = useState({});
  const [timestamps, setTimestamps] = useState({});
  const [uid, setUID] = useState();

 

  //////////////////////working/////////////////////
  // useEffect(() => {
  //   async function getDataRooms() {
  //     let chatRoomArray = [];
  //     const querySnapshot = await getDocs(collection(db, "chatRooms"));
  //     querySnapshot.forEach((doc) => {
  //       let chatRoomUser;
  //       let chatRoomObject;
  //       const chatRoomData = doc.data();
  //       const { participants } = chatRoomData;
  //       if (participants.includes(uid)) {
  //         console.log(`User ${uid} is a participant in chat room ${doc.id}`);
  //         participants.map((user) => {
  //           if (user != uid) chatRoomUser = user;
  //         })
  //         chatRoomObject = {
  //           id: doc.id,
  //           name: chatRoomUser
  //         }
  //         chatRoomArray.push(chatRoomObject)
  //       }
  //     });
  //     setChatRooms(chatRoomArray);
  //   }
  //   getDataRooms();
  // }, [uid])


  const getLastMessage = async (chatRoomId) => {
    const querySnapshot = await getDocs(collection(db, `chatRooms/${chatRoomId}/messages`));
    if (querySnapshot) {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push(doc.data());
      });
      console.log('messages are: ', messages[messages.length - 1].text)
      const lastMessage = messages[messages.length - 1];
      return lastMessage ? lastMessage.text : 'Click to start a conversation';
    }
  };

  useEffect(()=>{
    // createChatRoomTest(1 , 2)
  },[])


  useEffect(() => {
    
    async function getUserData() {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token !== null) {
          ROOT_URL = "http://18.198.203.6:8000";
          const response = await axios.get(`${ROOT_URL}/accounts/users/${token}`);
          if (response.status === 200) {
            const user = response.data;
            console.log(user);
            setUID(user.id)
          }
          else {
            console.log(response.data);
          }
        } else {
          console.log('Value does not exist'); // Value does not exist
        }
      } catch (error) {
        console.log(error);
      }
    }

    getUserData();



    async function getDataRooms() {
      let chatRoomArray = [];
      const querySnapshot = await getDocs(collection(db, "chatRooms"));
      querySnapshot.forEach((doc) => {
        let chatRoomUser;
        let chatRoomObject;
        const chatRoomData = doc.data();
        const { participants } = chatRoomData;
        if (participants.includes(uid)) {
          participants.map((user) => {
            if (user != uid) chatRoomUser = user;
          })
          chatRoomObject = {
            id: doc.id,
            name: chatRoomUser,
            lastMessage: getLastMessage(doc.id)
          }
          if (chatRoomObject.lastMessage)
            chatRoomArray.push(chatRoomObject)
        }
      });
      console.log('chatroom array: ', chatRoomArray)
      setChatRooms(chatRoomArray);
    }
    getDataRooms();
  }, [uid])

  useEffect(() => {
    console.log('chatrooms are: ', chatRooms)
    //here should add a requests to get the name of the chatroom from the user id 
    async function getChatListUsers(chatRoomId) {
      try {
        ROOT_URL = "http://18.198.203.6:8000";
        const response = await axios.get(`${ROOT_URL}/accounts/account/${chatRoomId}`);
        if (response.status === 200) {
          const user = response.data;
          console.log('use id::::', user.first_name + ' ' + user.last_name);
          return user.first_name + ' ' + user.last_name; // Return the concatenated string
        } else {
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }


    // getChatListUsers();

    // let tempChatRoomsArray = []
    // chatRooms.map((chatRoom) => {
    //   // console.log('chatRoom.name:::', chatRoom.name)
    //   let userId = getChatListUsers(chatRoom.name);
    //   // console.log('userId:::', userId)
    //   tempChatRoomsArray.push({
    //     id: chatRoom.id,
    //     name: userId.first_name + ' ' + userId.last_name,
    //   })
    // })
    let tempChatRoomsArray = [];
    async function processChatRooms() {
      try {

        for (const chatRoom of chatRooms) {
          const userId = await getChatListUsers(chatRoom.name);
          tempChatRoomsArray.push({
            id: chatRoom.id,
            name: userId,
          });
        }
        // Continue with the rest of your logic using tempChatRoomsArray
        setChatRoomsNames(tempChatRoomsArray)
      } catch (error) {
        console.log(error);
      }
    }

    processChatRooms();



  }, [chatRooms])

  return (
    <View style={{ flex: 1, paddingTop: 10 }}>
      <ScrollView>
        <View style={styles.backgroundStyle}>
          <Feather name="search" style={styles.iconStyle} />
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Search a message"
            style={styles.inputStyle}
          // value={term} 
          // onChangeText={onTermChange}
          // onEndEditing={onTermSubmit}
          />
        </View>
        {chatRoomsNames ?

          chatRoomsNames.map((element) => {
            // console.log(element) 
            // let lastMessage = getLastMessage(element.id);
            // if (element.lastMessage._j)
            return (
              <TouchableOpacity onPress={() => navigation.navigate('Chat Screen', { element })} key={element.id}>
                <View style={styles.chatRoomElement}>
                  <Avatar.Text size={50} label={element.name[0]} />
                  <View style={{ marginLeft: 10 }}>
                    {/* <Text style={{ fontWeight: 'bold' }}>{element.name}</Text> */}
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{element.name}</Text>
                    <Text>{element.id}</Text>
                    {/* <Text>{element.lastMessage._j}</Text> */}
                    {/* <Text>{lastMessage}</Text> */}
                  </View>
                </View>
              </TouchableOpacity>)
          }
          )
          :
          <></>}
      </ScrollView>
    </View>
  );
};

// export default ChatRoomList;

const styles = StyleSheet.create({
  chatRoomElement: {
    padding: 15,
    borderColor: 'transparent',
    // borderWidth: 1,
    borderRadius: 10,
    margin: 15,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  backgroundStyle: {
    backgroundColor: '#fff',
    height: 45,
    borderRadius: 10,
    marginHorizontal: 15,
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
  },
  inputStyle: {
    flex: 1,
    fontSize: 17,
  },
  iconStyle: {
    fontSize: 22,
    alignSelf: 'center',
    marginHorizontal: 15,
    color: 'gray'
  },
})