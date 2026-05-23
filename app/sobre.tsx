import { StyleSheet, Text, View } from "react-native";
import { Card } from "../components/Card";
import { Screen } from "../components/Screen";
import { SectionTitle } from "../components/SectionTitle";
import { profile } from "../constants/profile";

export default function Sobre() {
  return (
    <Screen>
      <SectionTitle>Sobre mim</SectionTitle>

      <Card>
        <Text style={styles.text}>{profile.about}</Text>
      </Card>

      <SectionTitle>Tecnologias e módulos utilizados</SectionTitle>

      <Card>
        <View style={styles.grid}>
          {profile.technologies.map((tech) => (
            <Text key={tech} style={styles.badge}>
              {tech}
            </Text>
          ))}
        </View>
      </Card>

      <Card>
        <Text style={styles.subtitle}>Sobre o desenvolvimento do app</Text>
        <Text style={styles.text}>
          Este aplicativo foi construído em React Native com Expo. A navegação entre
          telas foi implementada com Expo Router, usando arquivos dentro da pasta app.
          O jogo foi implementado diretamente em uma tela do aplicativo, sem link externo.
        </Text>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#cbd5e1",
    fontSize: 16,
    lineHeight: 24,
  },
  subtitle: {
    color: "#f8fafc",
    fontSize: 19,
    fontWeight: "800",
    marginBottom: 8,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  badge: {
    backgroundColor: "#1e293b",
    color: "#e0f2fe",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    fontWeight: "700",
  },
});