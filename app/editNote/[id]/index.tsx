import { Text, View } from "@/components/Themed";
import { apiFetch } from "@/lib/api";
import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { getJwt } from "@/lib/jwt";

export default function editNote() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const isNew = id === "new";
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [token, setToken] = useState("");

    async function handleToken() {
        const jwt = await getJwt();
        if (!jwt) return router.replace("/login");
        setToken(jwt);
    }

    const getNote = async () => {
        if (!token) return;
        const { response } = await apiFetch({
            url: `notes/${id}`,
            token,
            router,
        });
        setContent(response.content);
        setTitle(response.title);
    };

    useEffect(() => {
        handleToken();
    }, []);

    useEffect(() => {
        getNote();
    }, [token]);

    const handleSubmit = async () => {
        const { success } = await apiFetch({
            url: isNew ? "notes" : `notes/${id}`,
            method: isNew ? "POST" : "PATCH",
            token,
            body: { content, title },
            router,
        });

        if (success) {
            router.back();
        }
    };

    const handleDelete = async () => {
        if (isNew) return;
        const { success } = await apiFetch({
            url: `notes/${id}`,
            method: "DELETE",
            token,
            router,
        });

        if (success) {
            router.back();
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Title:</Text>
                    <TouchableOpacity onPress={handleDelete}>
                        <FontAwesome
                            name="trash"
                            style={styles.trashIcon}
                            size={24}
                        />
                    </TouchableOpacity>
                </View>
                <TextInput
                    style={styles.titleInput}
                    onChangeText={setTitle}
                    value={title}
                />
                <Text style={styles.label}>Content:</Text>
                <TextInput
                    style={styles.input}
                    multiline={true}
                    onChangeText={setContent}
                    value={content}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <FontAwesome
                    name="bookmark"
                    size={24}
                    color="#007bff"
                    style={{ padding: 5 }}
                />
                <Text
                    style={{
                        color: "#007bff",
                    }}
                >
                    Save
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: Colors["dark"]["background"],
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
        backgroundColor: "none",
    },
    titleText: {
        fontSize: 22,
        fontWeight: "bold",
        color: Colors["dark"]["text"],
    },
    trashIcon: {
        color: "#ff4d4d", // Red color for the trash icon
    },
    titleInput: {
        borderWidth: 0,
        backgroundColor: "none",
        color: Colors["dark"]["text"],
        borderRadius: 5,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 5,
    },
    input: {
        borderWidth: 0,
        padding: 15,
        color: "white",
    },
    form: {
        flex: 1,
        backgroundColor: "none",
    },
    button: {
        bottom: 20,
        position: "absolute",
        alignSelf: "center",
    },
});
