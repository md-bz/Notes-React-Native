import { useState } from "react";
import {
    Platform,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";
import * as SecureStore from "expo-secure-store";

import { Text, View } from "@/components/Themed";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiFetch } from "@/lib/api";
import Colors from "@/constants/Colors";

export default function login() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    const handleSubmit = async () => {
        setShowMessage(false);
        const { success, response, status } = await apiFetch({
            url: "auth/login",
            body: { email, password },
        });

        if (success) {
            if (Platform.OS === "web") {
                await AsyncStorage.setItem("jwt", response.jwt);
            } else {
                await SecureStore.setItemAsync("jwt", response.jwt);
            }
            return router.replace("/");
        }

        if (status === 401) setShowMessage(true);
    };

    return (
        <View style={styles.container}>
            <View style={styles.loginCard}>
                <Text style={{ display: showMessage ? "flex" : "none" }}>
                    Email or Password is wrong
                </Text>
                <Text>Email</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                />
                <Text>Password</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                />

                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    Login
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    loginCard: {
        backgroundColor: Colors["dark"]["secondary"],
        borderRadius: 5,
        padding: 50,
        display: "flex",
        alignItems: "center",
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        color: "white",
    },
    input: {
        padding: 2,
        marginTop: 7,
        marginBottom: 20,
        borderRadius: 2,
        backgroundColor: "grey",
    },
    button: {
        backgroundColor: Colors.dark.accent,
        padding: 5,
        borderRadius: 2,
        borderColor: Colors.dark.accent,
    },
});
