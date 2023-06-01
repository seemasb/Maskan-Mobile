import 'react-native-gesture-handler';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, TouchableOpacity } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // import an icon library, for example Ionicons
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import SignIn from './Pages/SignIn';
import Properties from './Pages/Properties';
import Map from './Pages/Map';
import PropertyDetails from './Pages/PropertyDetails';
import SignUp from './Pages/SignUp'
import Home from './Pages/Home';
import BottomNavigator from './Components/ProfileComponents/BottomNavigator'
import AsyncStorage from '@react-native-async-storage/async-storage';

// import PropertiesStack from './Pages/Properties';

/////////////////////////EXPO PUSH NOTIFICATION TEST//////////////////////////////
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import axios from 'axios';


/////////////////////////EXPO PUSH NOTIFICATION TEST//////////////////////////////




// import messaging from '@react-native-firebase/messaging';

// IOS Permission notifications and alerts
// async function requestUserPermission() {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     console.log('Authorization status:', authStatus);
//   }
// }


// function NotificationsScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button onPress={() => navigation.goBack()} title="Go back home" />
//     </View>
//   );
// }

const Drawer = createDrawerNavigator();
const theme = {

  "colors": {
    "primary": "rgb(0, 98, 158)",
    "onPrimary": "rgb(255, 255, 255)",
    "primaryContainer": "rgb(207, 229, 255)",
    "onPrimaryContainer": "rgb(0, 29, 52)",
    "secondary": "rgb(82, 96, 112)",
    "onSecondary": "rgb(255, 255, 255)",
    "secondaryContainer": "rgb(213, 228, 247)",
    "onSecondaryContainer": "rgb(15, 29, 42)",
    "tertiary": "rgb(105, 87, 121)",
    "onTertiary": "rgb(255, 255, 255)",
    "tertiaryContainer": "rgb(240, 219, 255)",
    "onTertiaryContainer": "rgb(36, 21, 50)",
    "error": "rgb(186, 26, 26)",
    "onError": "rgb(255, 255, 255)",
    "errorContainer": "rgb(255, 218, 214)",
    "onErrorContainer": "rgb(65, 0, 2)",
    "background": "rgb(252, 252, 255)",
    "onBackground": "rgb(26, 28, 30)",
    "surface": "rgb(252, 252, 255)",
    "onSurface": "rgb(26, 28, 30)",
    "surfaceVariant": "rgb(222, 227, 235)",
    "onSurfaceVariant": "rgb(66, 71, 78)",
    "outline": "rgb(114, 119, 127)",
    "outlineVariant": "rgb(194, 199, 207)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(47, 48, 51)",
    "inverseOnSurface": "rgb(241, 240, 244)",
    "inversePrimary": "rgb(153, 203, 255)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(239, 244, 250)",
      "level2": "rgb(232, 240, 247)",
      "level3": "rgb(224, 235, 244)",
      "level4": "rgb(222, 234, 243)",
      "level5": "rgb(217, 230, 241)"
    },
    "surfaceDisabled": "rgba(26, 28, 30, 0.12)",
    "onSurfaceDisabled": "rgba(26, 28, 30, 0.38)",
    "backdrop": "rgba(44, 49, 55, 0.4)"

  }
};


export default function App() {
  const [userLogged, setUserLogged] = React.useState(false);

  /////////////////////////EXPO PUSH NOTIFICATION TEST//////////////////////////////
  const [ExpoToken, setExpoToken] = React.useState('');


  async function registerForPushNotificationsAsync() {
    let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') {
      console.log('Permission not granted!');
      return;
    }
    let token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('expo Token:', token);
    setExpoToken(token)
    // Send the token to your server for later use
  }

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  Notifications.addNotificationReceivedListener((notification) => {
    console.log('Notification received:', notification);
  });

  Notifications.addNotificationResponseReceivedListener((response) => {
    console.log('Notification response received:', response);
  });

  useEffect(() => {
    // Set up notification handler
    const notificationListener = Notifications.addNotificationReceivedListener((notification) => {
      // Handle the received notification here
      console.log('Received notification:', notification);
    });

    return () => {
      // Clean up the notification listener when the component unmounts
      Notifications.removeNotificationSubscription(notificationListener);
    };
  }, []);

  ///////////////this shows notification inside the app//////////////////
  // const handleShowNotification = () => {
  //   Notifications.scheduleNotificationAsync({
  //     content: {
  //       title: 'New Notification',
  //       body: 'You have a new notification!',
  //     },
  //     trigger: null, 
  //   });
  // };

  // handleShowNotification()
  ///////////////this shows notification inside the app//////////////////


  useEffect(() => {
    const checkToken = async ()=>{
      const token = await AsyncStorage.getItem('token');
      if(token){
        setUserLogged(true);
      }
      else{
        setUserLogged(false)
      }

    }
    registerForPushNotificationsAsync();
    checkToken();
    
  }, []);



  // Define the Expo push notification endpoint
  const expoPushEndpoint = 'https://exp.host/--/api/v2/push/send';

  // Function to send a push notification
  async function sendPushNotification(expoPushToken, title, message) {
    try {
      // Set the request headers
      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      };

      // Set the notification data
      const data = {
        to: expoPushToken,
        sound: 'default',
        title: title,
        body: message,
      };

      // Send the POST request to the Expo push notification endpoint
      const response = await axios.post(expoPushEndpoint, data, { headers });

      console.log('Push notification sent:', response.data);
    } catch (error) {
      console.error('Error sending push notification:', error);
    }
  }

  // Example usage
  const expoPushToken = ExpoToken; // Replace with the Expo push notification token
  const notificationTitle = 'New Message';
  const notificationMessage = 'You have a new message';

  // sendPushNotification(expoPushToken, notificationTitle, notificationMessage);


  /////////////////////////EXPO PUSH NOTIFICATION TEST//////////////////////////////

  function logOut() {
    setUserLogged(false)

    try {
      const token =  AsyncStorage.getItem('token');
      let header;
      token ? header = {
        'Authorization': 'Token ' + token
      } : header = {}

      axios.get(`${ROOT_URL}/accounts/logout/`, {
        headers: header
      })
      console.log('Data successfully deleted.');
      AsyncStorage.removeItem('token');
      // const tokenCheck =  AsyncStorage.getItem('token');
      // console.log('tokenCheck:::' , tokenCheck)
    } catch (error) {
      console.log('Error deleting data:', error);
    }
  }

 

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home"
          screenOptions={{
            // headerShown: false,
            headerStyle: {
              // backgroundColor: '#45729d',
            },
            headerTintColor: '#45739d',
            drawerActiveTintColor: '#45729d',
            drawerItemStyle: {
              marginBottom: 10
            },
            headerRight: () => (
              
              <TouchableOpacity onPress={() => logOut()}>
                {userLogged &&
                <Ionicons
                  name="log-out-outline"
                  size={23}
                  color='#45739d'
                  style={{ marginRight: 17 }}
                />
              }
              </TouchableOpacity>
            ),
          }}

        >
          <Drawer.Screen
            name="Maskan"
            component={Home}
            options={{
              drawerLabel: 'Maskan',
              // headerTransparent: true,
              drawerLabelStyle: { fontWeight: 'bold', fontSize: 25, color: '#45729d', marginBottom: 10 },
              drawerLockMode: 'locked-closed',
            }}
          />
          <Drawer.Screen
            name="Home"
            component={Home}
            options={{
              drawerIcon: ({ focused, size }) => (
                <Ionicons
                  name="ios-home"
                  size={size}
                  color={focused ? '#45729d' : 'gray'}
                />
              ),
              // headerShown: false // hide header
            }}
          />

          {userLogged ?
            <Drawer.Screen
              name="Profile"
              component={BottomNavigator}
              options={{
                drawerIcon: ({ focused, size }) => (
                  <FontAwesome
                    name="user-circle-o"
                    size={size}
                    color={focused ? '#45729d' : 'gray'}
                  />
                ),
              }}
            />
            : <></>}
          {!userLogged ?
            <>
              <Drawer.Screen
                name="Log In"
                component={() => <SignIn setUserLogged={setUserLogged} ExpoToken={ExpoToken} />}
                options={{
                  drawerIcon: ({ focused, size }) => (
                    <Ionicons
                      name="ios-log-in"
                      size={size}
                      color={focused ? '#45729d' : 'gray'}
                    />
                  ),
                  drawerLabelStyle: ({ focused }) => ({ color: (focused ? '#45729d' : 'gray') }),
                }}
              />

              <Drawer.Screen
                name="SignUp"
                component={SignUp}
                options={{
                  drawerIcon: ({ focused, size }) => (
                    <Ionicons
                      name="person-add"
                      size={size}
                      color={focused ? '#45729d' : 'gray'}
                    />
                  ),
                }}
              />

            </>
            : <></>}
          <Drawer.Screen
            name="Prperties"
            component={Properties}

            options={{
              drawerIcon: ({ focused, size }) => (
                <MaterialCommunityIcons name="home-city" size={size} color={focused ? '#45729d' : 'gray'} />
              ),

            }}
          />
          <Drawer.Screen
            name="Map"
            component={Map}
            options={{
              drawerIcon: ({ focused, size }) => (
                <Ionicons
                  name="ios-map-sharp"
                  size={size}
                  color={focused ? '#45729d' : 'gray'}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Property"
            component={PropertyDetails}
            options={{
              drawerIcon: ({ focused, size }) => (
                <Ionicons
                  name="ios-map-sharp"
                  size={size}
                  color={focused ? '#45729d' : 'gray'}
                />
              ),
            }}
          />


        </Drawer.Navigator>

      </NavigationContainer>
      {/* <BottomNavigator /> */}
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
