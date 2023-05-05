// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, TouchableOpacity } from 'react-native';
// import firebase from 'firebase';
// import 'firebase/database';
// import database from '@react-native-firebase/database';



// // Create a new chat room
// const createChatRoom = (userId, participantId) => {
//   const chatRoomRef = database().ref('/chatRooms').push();
//   const chatRoomId = chatRoomRef.key;
//   const createdAt = new Date().toISOString();

//   const newChatRoom = {
//     id: chatRoomId,
//     participants: [userId, participantId],
//     createdAt,
//   };

//   chatRoomRef.set(newChatRoom);

//   return newChatRoom;
// };

// // in props:
// // { navigation, user }
// const ChatRoomList = () => {
//   const user={
//     id: 1,
//   }
//   const [chatRooms, setChatRooms] = useState([]);

//   createChatRoom(1, 2)

//   useEffect(() => {
//     const chatRoomsRef = firebase.database().ref('chatRooms');
//     chatRoomsRef.on('value', (snapshot) => {
//       const rooms = [];
//       snapshot.forEach((childSnapshot) => {
//         const room = childSnapshot.val();
//         if (room.participants.includes(user.id)) {
//           rooms.push({
//             key: childSnapshot.key,
//             name: room.name,
//             avatar: room.avatar,
//           });
//         }
//       });
//       setChatRooms(rooms);
//     });

//     return () => chatRoomsRef.off();
//   }, [user.id]);

//   const handleRoomPress = (room) => {
//     // navigation.navigate('ChatScreen', { roomId: room.key, name: room.name });
//   };

//   const renderChatRoom = ({ item }) => (
//     <TouchableOpacity onPress={() => handleRoomPress(item)}>
//       {/* <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
//         <Image source={{ uri: item.avatar }} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }} />
//         <Text style={{ fontSize: 18 }}>{item.name}</Text>
//       </View> */}
//       <Text>Chat rooms hi</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={{ flex: 1 }}>
//       <FlatList
//         data={chatRooms}
//         renderItem={renderChatRoom}
//         keyExtractor={(item) => item.key}
//       />
//     </View>
//   );
// };

// export default ChatRoomList;



import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
// import firebase from 'firebase';
import 'firebase/firestore';
import { db } from '../../firebase';
import { collection, addDoc, getDocs } from "firebase/firestore";
import ChatScreen from './ChatScreen';


const createChatRoom = async (participant1Id, participant2Id) => {
  const chatRoom = await db.collection('chatRooms').add({
    participants: [participant1Id, participant2Id],
    messages: [],
  });

  return chatRoom.id;
};



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
const ChatRoomList = () => {
  // const { uid, displayName, photoURL } = route.params;
  const uid = 1;
  const displayName = 'Seema'
  // {
  //   id: 222,
  //   name: 'chat sema',
  //   lastMessage: 'hello??'
  // } , {
  //   id: 222,
  //   name: 'chat sema', 
  //   lastMessage: 'hello??'
  // }
  const [chatRooms, setChatRooms] = useState([]);
  // createChatRoom( 1, 2)
  // createChatRoomTest(3, 2)

  // useEffect(() => {
  //   const unsubscribe = firebase.firestore()
  //     .collection('chatRooms')
  //     .where('users', 'array-contains', uid)
  //     .onSnapshot(snapshot => {
  //       const rooms = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  //       setChatRooms(rooms);
  //     });
  //   return () => unsubscribe();
  // }, [uid]);

  //////////////////////working/////////////////////
  useEffect(() => {
    async function getDataRooms() {
      let chatRoomArray = [];
      const querySnapshot = await getDocs(collection(db, "chatRooms"));
      querySnapshot.forEach((doc) => {
        let chatRoomUser;
        let chatRoomObject;
        // `chatRooms/${chatRoomId}/messages`
        // console.log(doc)
        // console.log(`${doc.id} => ${doc.data}`);
        const chatRoomData = doc.data();
        const { participants } = chatRoomData;
        console.log(participants)
        if (participants.includes(uid)) {
          console.log(`User ${uid} is a participant in chat room ${doc.id}`);
          participants.map((user)=>{
           if(user != uid) chatRoomUser = user;
          })
          chatRoomObject={
            id: doc.id,
            name: chatRoomUser
          }
        }
        // getChatRoomDara(doc.id)
        chatRoomArray.push(chatRoomObject)
      });
      setChatRooms(chatRoomArray);
    }
    getDataRooms();
  }, [uid])





  const renderChatRoom = ({ item }) => {
    const { id, name, lastMessage } = item;
    return (
      // props for touchable opacity:
      // onPress={() => navigation.navigate('ChatRoom', { id, name, uid, displayName, photoURL })}
      <TouchableOpacity >
        <View style={{ padding: 10 }}>
          <Text style={{ fontWeight: 'bold' }}>{name}</Text>
          <Text>{id}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={chatRooms}
        keyExtractor={item => item.id}
        renderItem={renderChatRoom}
      />
      {/* <Text>Chat listtt</Text> */}
      {/* <ChatScreen chatRoomId={'4ZVbFLq5WydxnS8UDFID'} userId={1} participantId={2}/> */}
    </View>
  );
};

export default ChatRoomList;
