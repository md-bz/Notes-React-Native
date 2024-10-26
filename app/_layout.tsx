import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Theme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { TouchableOpacity } from "react-native";

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from "expo-router";

const DarkTheme: Theme = {
    dark: false,
    colors: {
        primary: "rgb(0, 122, 255)",
        background: "rgb(242, 242, 242)",
        card: Colors.dark.background,
        text: "white",
        border: "rgb(216, 216, 216)",
        notification: "rgb(255, 59, 48)",
    },
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
        ...FontAwesome.font,
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return <RootLayoutNav />;
}

function RootLayoutNav() {
    const colorScheme = useColorScheme();

    return (
        // <ThemeProvider
        // value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        // >
        <ThemeProvider value={DarkTheme}>
            <Stack>
                <Stack.Screen
                    name="index"
                    options={({ navigation }) => ({
                        headerTitle: "Notes",
                        headerRight: () => (
                            <FontAwesome
                                name="gear"
                                color={"white"}
                                style={{ marginRight: 15 }}
                                size={20}
                                onPress={() => {
                                    navigation.navigate("settings");
                                }}
                            />
                        ),
                    })}
                />

                <Stack.Screen name="login" options={{ headerShown: false }} />
                <Stack.Screen name="signup" options={{ headerShown: false }} />
                <Stack.Screen
                    name="editNote/[id]/index"
                    options={({ route }: { route: any }) => ({
                        title:
                            route.params?.id === "new"
                                ? "New Note"
                                : "Edit Note",
                        headerShown: true,
                    })}
                />
                <Stack.Screen name="settings" />
                <Stack.Screen
                    name="network-error"
                    options={{
                        presentation: "modal",
                        headerShown: false,
                    }}
                />
            </Stack>
        </ThemeProvider>
    );
}
