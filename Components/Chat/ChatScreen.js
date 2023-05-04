import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import database from '@react-native-firebase/database';

const ChatScreen = ({ route }) => {
  const { chatRoomId, userId, participantId } = route.params;

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const messagesRef = database().ref(`/chatRooms/${chatRoomId}/messages`);

    messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      const giftedMessage = {
        _id: snapshot.key,
        text: message.text,
        createdAt: new Date(message.createdAt),
        user: {
          _id: message.user._id,
          name: message.user.name,
          avatar: message.user.avatar,
        },
      };
      setMessages(previousMessages => GiftedChat.append(previousMessages, giftedMessage));
    });

    return () => messagesRef.off();
  }, [chatRoomId]);

  const onSend = async newMessages => {
    const message = newMessages[0];
    const messageRef = database().ref(`/chatRooms/${chatRoomId}/messages`).push();
    const createdAt = new Date().toISOString();

    const newMessage = {
      id: messageRef.key,
      text: message.text,
      createdAt,
      user: {
        _id: userId,
        name: message.user.name,
        avatar: message.user.avatar,
      },
    };

    messageRef.set(newMessage);
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={newMessages => onSend(newMessages)}
      user={{ _id: userId }}
    />
  );
};

export default ChatScreen;
