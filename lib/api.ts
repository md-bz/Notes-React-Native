import AsyncStorage from "@react-native-async-storage/async-storage";
import { type Router } from "expo-router";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;
type ApiFetchType = {
    method?: "GET" | "POST" | "DELETE" | "PATCH";
    url?: string;
    headers?: {};
    body?: {
        email?: string;
        password?: string;
        title?: string;
        content?: string;
    };
    token?: string;
    router?: Router;
};

export async function apiFetch({
    method,
    url,
    headers,
    body,
    token,
    router,
}: ApiFetchType) {
    if (!method) {
        method = body ? "POST" : "GET";
    }
    if (token) {
        headers = { ...headers, Authorization: `Bearer ${token}` };
    }

    const res = await fetch(`${apiUrl}${url}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
        body: body ? JSON.stringify(body) : null,
    });

    if (res.status == 401 && router) {
        await AsyncStorage.removeItem("jwt");
        router.replace("/login");
    }
    return { success: res.ok, response: await res.json(), status: res.status };
}
