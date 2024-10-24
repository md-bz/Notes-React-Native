import { Platform } from "react-native";

async function getAsyncStorage() {
    const { default: AsyncStorage } = await import(
        "@react-native-async-storage/async-storage"
    );
    return AsyncStorage;
}

async function getSecureStore() {
    const SecureStore = await import("expo-secure-store");
    return SecureStore;
}

export async function getJwt(): Promise<string | null> {
    try {
        if (Platform.OS === "web") {
            const AsyncStorage = await getAsyncStorage();
            return await AsyncStorage.getItem("jwt");
        }

        const SecureStore = await getSecureStore();
        return await SecureStore.getItemAsync("jwt");
    } catch (error) {
        console.error("Error retrieving JWT:", error);
        return null;
    }
}

export async function setJwt(jwt: string): Promise<void> {
    try {
        if (Platform.OS === "web") {
            const AsyncStorage = await getAsyncStorage();
            await AsyncStorage.setItem("jwt", jwt);
        } else {
            const SecureStore = await getSecureStore();
            await SecureStore.setItemAsync("jwt", jwt);
        }
    } catch (error) {
        console.error("Error setting JWT:", error);
    }
}
export async function deleteJwt(): Promise<void> {
    try {
        if (Platform.OS === "web") {
            const AsyncStorage = await getAsyncStorage();
            await AsyncStorage.removeItem("jwt");
        } else {
            const SecureStore = await getSecureStore();
            await SecureStore.deleteItemAsync("jwt");
        }
    } catch (error) {
        console.error("Error setting JWT:", error);
    }
}
