import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { collection, addDoc, onSnapshot , orderBy , query} from "firebase/firestore";
import { db } from '../../firebase';
import { View } from 'react-native';

const ChatScreen = ({ route }) => {
    console.log('route', route)
    const chatRoomId = route.params.element.id
    const userId = route.params.element.name
    let participantId;
    const [messages, setMessages] = useState([]);

    useEffect(()=>{
        console.log(messages)
    },[messages])

    useEffect(() => {
        // const messagesRef = collection(db, `chatRooms/${chatRoomId}/messages`);
        // const messagesRef = collection(db, `chatRooms/${chatRoomId}/messages`).orderBy('createdAt', 'asc');

        const messagesRef = query(
            collection(db, `chatRooms/${chatRoomId}/messages`),
            orderBy('createdAt', 'asc')
          );

        const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
            const messageList = snapshot.docs.map((doc) => {
                const message = doc.data();
                return {
                    _id: doc.id,
                    text: message.text,
                    createdAt: new Date(message.createdAt.seconds * 1000),
                    user: {
                        _id: message.user._id, //this is my user 
                        // name: message.user.name,
                        // avatar: message.user.avatar,
                        name: userId+'',
                        // name: 'hiba',
                    },
                };
            });

            // Sort the messages array based on the createdAt timestamp
            messageList.sort((a, b) => b.createdAt - a.createdAt );

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
                    _id: userId, //user who i'm sending to this message
                    //   name: message.user.name,
                    //   avatar: message.user.avatar,
                    name: userId //name of the sender it doean't matter ???

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
