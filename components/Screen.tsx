import { ReactNode } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  children: ReactNode;
};

export function Screen({ children }: Props) {
  return (
    <LinearGradient colors={["#0f172a", "#111827", "#020617"]} style={styles.bg}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.container}>{children}</View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  container: {
    width: "100%",
    maxWidth: 900,
    alignSelf: "center",
  },
});