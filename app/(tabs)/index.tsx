import { useCallback, useEffect, useState } from "react";
import { Dimensions, FlatList, StyleSheet } from "react-native";
import { Link, useFocusEffect, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";

import Colors from "@/constants/Colors";
import { Text, View } from "@/components/Themed";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Note = {
    _id: string;
    title: string;
    content: string;
};
const numColumns = Math.min(
    6,
    Math.floor(Dimensions.get("window").width / 180)
);

export default function Home() {
    const router = useRouter();
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    const [token, setToken] = useState<undefined | string>(undefined);
    const [notes, setNotes] = useState<Note[] | undefined>(undefined);

    async function handleToken() {
        const jwt = await AsyncStorage.getItem("jwt");

        if (!jwt) return router.replace("/login");
        setToken(jwt);
    }

    const getNotes = async () => {
        const res = await fetch(`${apiUrl}notes`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const resJson = await res.json();
        setNotes(resJson);
    };

    useEffect(() => {
        handleToken();
    }, []);

    useFocusEffect(
        useCallback(() => {
            if (token) {
                getNotes();
            }
        }, [token])
    );

    const renderItem = ({ item }: { item: Note }) => (
        <Link href={`/editNote/${item._id}`} style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.text}>{item.content}</Text>
        </Link>
    );
    return (
        <View style={styles.container}>
            <FlatList
                data={notes}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                style={styles.list}
                numColumns={numColumns}
            />
            <View style={styles.plusIcon}>
                <Link href="/editNote/new">
                    <FontAwesome name="plus-circle" size={35} color={"white"} />
                </Link>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    plusIcon: {
        flex: 1 / 15,
        alignItems: "center",
        width: "100%",
        // height: 5,
    },
    list: {
        flex: 14 / 15,
        overflow: "scroll",
    },
    container: {
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        gap: 5,
    },
    card: {
        backgroundColor: Colors["dark"]["secondary"],
        height: 100,
        flex: 1 / numColumns,
        overflow: "hidden",
        margin: 10,
        padding: 10,
    },
    title: {
        display: "flex",
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
    },
    text: {
        fontSize: 20,
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
});
