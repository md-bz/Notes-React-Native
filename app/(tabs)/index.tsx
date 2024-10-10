import { useEffect, useState } from "react";

import { StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";

import { Text, View } from "@/components/Themed";
import { Redirect, useRouter } from "expo-router";

export default function Home() {
    // const router = useRouter();
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const token = SecureStore.getItem("jwt");

    if (!token) Redirect({ href: "/login" });

    // const handleJwt = async () => {
    //     const token = await SecureStore.getItem("jwt");
    //     console.log(token);

    //     if (!token) router.replace("/login");
    //     return token;
    // };

    // const setJwt = async () => {
    //     // await SecureStore.setItemAsync("jwt", "i am jwt!");
    // };

    // useEffect(() => {
    //     handleJwt();
    // }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home</Text>
            <View
                style={styles.separator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
});
