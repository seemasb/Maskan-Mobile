import { View } from "react-native";
import SignInForm from "../Components/Sign/SignInForm";
import { StyleSheet } from "react-native";

function SignIn({setUserLogged}) {
    return (
        <View style={styles.container}>
            <SignInForm setUserLogged={setUserLogged}/>
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