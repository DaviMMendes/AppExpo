import { StyleSheet, Text } from "react-native";
import { Card } from "../components/Card";
import { Screen } from "../components/Screen";
import { SectionTitle } from "../components/SectionTitle";
import { profile } from "../constants/profile";

export default function Academica() {
  return (
    <Screen>
      <SectionTitle>Experiência Acadêmica</SectionTitle>

      {profile.academicExperience.map((item) => (
        <Card key={item.title}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.institution}>{item.institution}</Text>
          <Text style={styles.period}>{item.period}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </Card>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#f8fafc",
    fontSize: 20,
    fontWeight: "800",
  },
  institution: {
    color: "#38bdf8",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 4,
  },
  period: {
    color: "#94a3b8",
    marginTop: 4,
  },
  description: {
    color: "#cbd5e1",
    fontSize: 15,
    lineHeight: 23,
    marginTop: 10,
  },
});