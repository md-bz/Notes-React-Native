import { useCallback, useEffect, useState } from "react";
import {
    Dimensions,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { Link, useFocusEffect, useRouter } from "expo-router";

import Colors from "@/constants/Colors";
import { Text, View } from "@/components/Themed";
import { FontAwesome } from "@expo/vector-icons";
import { apiFetch } from "@/lib/api";
import { getJwt } from "@/lib/jwt";
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

    const [token, setToken] = useState<undefined | string>(undefined);
    const [notes, setNotes] = useState<Note[] | undefined>(undefined);

    async function handleToken() {
        const jwt = await getJwt();
        if (!jwt) return router.replace("/login");
        setToken(jwt);
    }

    const getNotes = async () => {
        if (!token) return;
        const { response } = await apiFetch({ url: "notes", token, router });

        setNotes(response);
    };

    useEffect(() => {
        handleToken();
    }, []);

    useFocusEffect(
        useCallback(() => {
            getNotes();
        }, [token])
    );

    const renderItem = ({ item }: { item: Note }) => (
        <Link href={`/editNote/${item._id}`} style={styles.cardContainer}>
            <View style={styles.card}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.text}>{item.content}</Text>
            </View>
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
            <TouchableOpacity style={styles.plusIcon}>
                <Link href="/editNote/new">
                    <FontAwesome name="plus-circle" size={35} color={"white"} />
                </Link>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    plusIcon: {
        position: "absolute",
        bottom: 10,
        backgroundColor: "transparent",
        alignSelf: "center",
    },
    list: {
        flex: 1,
        width: "100%",
    },
    container: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
    },
    card: {
        width: 180,
        backgroundColor: Colors["dark"]["secondary"],
        height: 100,
        flex: 1 / numColumns,
        overflow: "hidden",
        padding: 10,
    },
    cardContainer: {
        margin: 10,
    },
    title: {
        display: "flex",
        fontSize: 22,

        fontWeight: "bold",
        marginBottom: 10,
    },
    text: {
        display: "flex",

        overflow: "hidden",
        fontSize: 20,
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
});
