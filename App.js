import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // import an icon library, for example Ionicons
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SignIn from './Pages/SignIn';
import Properties from './Pages/Properties';
import Map from './Pages/Map';
import PropertyDetails from './Pages/PropertyDetails';
import SignUp from './Pages/SignUp'
import BottomNavigator from './Components/ProfileComponents/BottomNavigator'
import messaging from '@react-native-firebase/messaging';

//IOS Permission notifications and alerts
async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

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
  const [userLogged, setUserLogged] = React.useState(true);

  React.useEffect(() => {
    if (requestUserPermission) {
      //return FCM token for the device
      messaging().getToken().then(token => {
        console.log(token);
      })
    }
    else {
      console.log("Failed token status", authStatus)
    }


    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });


    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    // Register background handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    //foreground notifications
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, [])
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home" >
          <Drawer.Screen
            name="hh"
            component={HomeScreen}
            options={{
              drawerLabel: 'Maskan',
              drawerLabelStyle: { fontWeight: 'bold', fontSize: 18, color: 'black' },
              drawerLockMode: 'locked-closed',
            }}
          />
          <Drawer.Screen
            name="Log In"
            component={SignIn}
            options={{
              drawerIcon: ({ focused, size }) => (
                <Ionicons
                  name="ios-log-in"
                  size={size}
                  color={focused ? 'blue' : 'gray'}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Home"
            component={HomeScreen}
            options={{
              drawerIcon: ({ focused, size }) => (
                <Ionicons
                  name="ios-home"
                  size={size}
                  color={focused ? 'blue' : 'gray'}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Prperties"
            component={Properties}
            options={{
              drawerIcon: ({ focused, size }) => (
                <MaterialCommunityIcons name="home-city" size={size} color={focused ? 'blue' : 'gray'} />
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
                  color={focused ? 'blue' : 'gray'}
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
                  color={focused ? 'blue' : 'gray'}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Profile"
            component={BottomNavigator}
            options={{
              drawerIcon: ({ focused, size }) => (
                <Ionicons
                  name="ios-map-sharp"
                  size={size}
                  color={focused ? 'blue' : 'gray'}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="SignUp"
            component={SignUp}
            options={{
              drawerIcon: ({ focused, size }) => (
                <Ionicons
                  name="ios-map-sharp"
                  size={size}
                  color={focused ? 'blue' : 'gray'}
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
