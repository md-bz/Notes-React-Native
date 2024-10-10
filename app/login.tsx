import { Button, StyleSheet, TextInput } from "react-native";

import { Text, View } from "@/components/Themed";
import { useState } from "react";

export default function login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        //todo:implement logging with api
        // await fetch ()
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
        backgroundColor: "black",
        color: "white",
    },
    input: {
        width: "80%",
        margin: 5,
        backgroundColor: "grey",
    },
});
