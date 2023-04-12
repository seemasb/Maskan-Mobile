import { View } from "react-native";
import SignInForm from "../Components/Sign/SignInForm";
import { StyleSheet } from "react-native";

function SignIn() {
    return (
        <View style={styles.container}>
            <SignInForm />
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