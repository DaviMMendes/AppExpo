import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#020617",
          },
          headerTintColor: "#f8fafc",
          headerTitleStyle: {
            fontWeight: "800",
          },
          contentStyle: {
            backgroundColor: "#020617",
          },
        }}
      >
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="sobre" options={{ title: "Sobre" }} />
        <Stack.Screen name="academica" options={{ title: "Experiência Acadêmica" }} />
        <Stack.Screen name="profissional" options={{ title: "Experiência Profissional" }} />
        <Stack.Screen name="projetos" options={{ title: "Projetos" }} />
        <Stack.Screen name="jogo" options={{ title: "Jogo" }} />
      </Stack>
    </>
  );
}