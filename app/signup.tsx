import { useState } from "react";
import {
    Platform,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";
import * as SecureStore from "expo-secure-store";

import { Text, View } from "@/components/Themed";
import { Link, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiFetch } from "@/lib/api";
import Colors from "@/constants/Colors";

export default function signup() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [message, setMessage] = useState<undefined | string[]>(undefined);

    const handleSubmit = async () => {
        setMessage(undefined);

        const { success, response, status } = await apiFetch({
            url: "auth/signup",
            body: { name, email, password, passwordConfirm },
        });

        if (success) {
            if (Platform.OS === "web") {
                await AsyncStorage.setItem("jwt", response.jwt);
            } else {
                await SecureStore.setItemAsync("jwt", response.jwt);
            }
            return router.replace("/");
        }

        setMessage(response.message);
    };

    return (
        <View style={styles.container}>
            <View style={styles.loginCard}>
                <Text style={{ display: message ? "flex" : "none" }}>
                    {message}
                </Text>
                <Text>Name</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setName}
                    value={name}
                />

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
                <Text>Password Confirm</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setPasswordConfirm}
                    value={passwordConfirm}
                />

                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    Login
                </TouchableOpacity>
            </View>
            <Link href={"/login"} style={styles.link}>
                <Text>Already have an account? login</Text>
            </Link>
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
    link: {
        marginTop: 15,
        color: "blue",
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
