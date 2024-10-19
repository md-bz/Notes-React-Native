import { useState } from "react";
import { Button, Platform, StyleSheet, TextInput } from "react-native";
import * as SecureStore from "expo-secure-store";

import { Text, View } from "@/components/Themed";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiFetch } from "@/lib/api";

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
            <Text style={{ display: showMessage ? "flex" : "none" }}>
                {" "}
                Email or Password is wrong
            </Text>
            <Text>Email:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
            />
            <Text>Password:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
            />

            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#558",
        color: "white",
    },
    input: {
        width: "80%",
        margin: 5,
        backgroundColor: "grey",
    },
});
