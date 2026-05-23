import { StyleSheet, Text } from "react-native";

type Props = {
  children: string;
};

export function SectionTitle({ children }: Props) {
  return <Text style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    color: "#f8fafc",
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 14,
  },
});