import { Text, View } from "@/components/Themed";
import { StyleSheet } from "react-native";

export default function () {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Network error! make sure you are connected to the internet.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
    },
    text: {
        textAlign: "center",
        fontSize: 40,
    },
});
