import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

type Props = {
  children: ReactNode;
};

export function Card({ children }: Props) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(15, 23, 42, 0.88)",
    borderColor: "rgba(148, 163, 184, 0.24)",
    borderWidth: 1,
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
  },
});