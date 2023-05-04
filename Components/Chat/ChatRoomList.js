import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import 'firebase/database';
import database from '@react-native-firebase/database';



// Create a new chat room
const createChatRoom = (userId, participantId) => {
  const chatRoomRef = database().ref('/chatRooms').push();
  const chatRoomId = chatRoomRef.key;
  const createdAt = new Date().toISOString();

  const newChatRoom = {
    id: chatRoomId,
    participants: [userId, participantId],
    createdAt,
  };

  chatRoomRef.set(newChatRoom);

  return newChatRoom;
};

// in props:
// { navigation, user }
const ChatRoomList = () => {
  const user={
    id: 1,
  }
  const [chatRooms, setChatRooms] = useState([]);

  createChatRoom(1, 2)

  useEffect(() => {
    const chatRoomsRef = firebase.database().ref('chatRooms');
    chatRoomsRef.on('value', (snapshot) => {
      const rooms = [];
      snapshot.forEach((childSnapshot) => {
        const room = childSnapshot.val();
        if (room.participants.includes(user.id)) {
          rooms.push({
            key: childSnapshot.key,
            name: room.name,
            avatar: room.avatar,
          });
        }
      });
      setChatRooms(rooms);
    });

    return () => chatRoomsRef.off();
  }, [user.id]);

  const handleRoomPress = (room) => {
    // navigation.navigate('ChatScreen', { roomId: room.key, name: room.name });
  };

  const renderChatRoom = ({ item }) => (
    <TouchableOpacity onPress={() => handleRoomPress(item)}>
      {/* <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
        <Image source={{ uri: item.avatar }} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }} />
        <Text style={{ fontSize: 18 }}>{item.name}</Text>
      </View> */}
      <Text>Chat rooms hi</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={chatRooms}
        renderItem={renderChatRoom}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
};

export default ChatRoomList;
