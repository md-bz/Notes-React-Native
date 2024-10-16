import { useEffect, useState } from "react";
import { Button, StyleSheet, TextInput } from "react-native";
import * as SecureStore from "expo-secure-store";

import { Text, View } from "@/components/Themed";
import { Link, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function login() {
    const router = useRouter();
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        const res = await fetch(`${apiUrl}auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const resJson = await res.json();
        console.log(resJson);

        if (res.status === 201) {
            // await SecureStore.setItemAsync("jwt", resJson.jwt);
            await AsyncStorage.setItem("jwt", resJson.jwt);
            return router.replace("/");
        }
    };

    return (
        <View style={styles.container}>
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
