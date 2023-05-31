import { View } from "react-native";
import SignInForm from "../Components/Sign/SignInForm";
import { StyleSheet } from "react-native";



function SignIn({setUserLogged  , ExpoToken}) {
    return (
        <View style={styles.container}>
            <SignInForm setUserLogged={setUserLogged} ExpoToken={ExpoToken}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
})

export default SignIn;