import { StyleSheet, Text } from "react-native";
import { Card } from "../components/Card";
import { Screen } from "../components/Screen";
import { SectionTitle } from "../components/SectionTitle";
import { profile } from "../constants/profile";

export default function Profissional() {
  return (
    <Screen>
      <SectionTitle>Experiência Profissional</SectionTitle>

      {profile.professionalExperience.map((item) => (
        <Card key={item.role}>
          <Text style={styles.role}>{item.role}</Text>
          <Text style={styles.company}>{item.company}</Text>
          <Text style={styles.period}>{item.period}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </Card>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  role: {
    color: "#f8fafc",
    fontSize: 20,
    fontWeight: "800",
  },
  company: {
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