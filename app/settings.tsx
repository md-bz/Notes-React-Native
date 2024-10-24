import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { deleteJwt } from "@/lib/jwt";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";

export default function Settings() {
    const router = useRouter();
    const logout = async () => {
        await deleteJwt();
        router.replace("/login");
    };
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={logout}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: "center",

        justifyContent: "center",
        alignContent: "center",
    },
});
