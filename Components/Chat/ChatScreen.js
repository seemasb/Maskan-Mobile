import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { db } from '../../firebase';
import { View } from 'react-native';

const ChatScreen = ({ route }) => {
    console.log('route', route)
    const chatRoomId = route.params.element.id
    const userId = route.params.element.name
    let participantId;
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const messagesRef = collection(db, `chatRooms/${chatRoomId}/messages`);

        const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
            const messageList = snapshot.docs.map((doc) => {
                const message = doc.data();
                return {
                    _id: doc.id,
                    text: message.text,
                    createdAt: new Date(message.createdAt.seconds * 1000),
                    user: {
                        _id: message.user._id,
                        // name: message.user.name,
                        // avatar: message.user.avatar,
                        name: 'seema',
                    },
                };
            });
            setMessages(messageList);
        });

        return () => unsubscribe();
    }, [chatRoomId]);

    const onSend = async newMessages => {

        const message = newMessages[0];
        console.log(message)
        async function addMyMessage() {
            const t = await addDoc(collection(db, `chatRooms/${chatRoomId}/messages`), {
                text: message.text,
                createdAt: new Date(),
                user: {
                    _id: userId,
                    //   name: message.user.name,
                    //   avatar: message.user.avatar,
                    name: 'seema'

                },
            });
        }

        addMyMessage();

    };



    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <GiftedChat
                messages={messages}
                onSend={newMessages => onSend(newMessages)}
                user={{ _id: userId }}
                alwaysShowSend
            />
        </View>
    );
};

export default ChatScreen;
