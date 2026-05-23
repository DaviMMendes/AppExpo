import { StyleSheet, Text } from "react-native";
import { Card } from "../components/Card";
import { Screen } from "../components/Screen";
import { SectionTitle } from "../components/SectionTitle";
import { profile } from "../constants/profile";

export default function Projetos() {
  return (
    <Screen>
      <SectionTitle>Projetos</SectionTitle>

      {profile.projects.map((project) => (
        <Card key={project.name}>
          <Text style={styles.name}>{project.name}</Text>
          <Text style={styles.stack}>{project.stack}</Text>
          <Text style={styles.description}>{project.description}</Text>
        </Card>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  name: {
    color: "#f8fafc",
    fontSize: 20,
    fontWeight: "800",
  },
  stack: {
    color: "#38bdf8",
    fontSize: 15,
    fontWeight: "700",
    marginTop: 6,
  },
  description: {
    color: "#cbd5e1",
    fontSize: 15,
    lineHeight: 23,
    marginTop: 10,
  },
});