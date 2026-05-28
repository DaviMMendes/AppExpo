import { Link } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { Card } from "../components/Card";
import { Screen } from "../components/Screen";
import { profile } from "../constants/profile";

const profileImage = require("../assets/profile.jpeg");

const links = [
  { label: "Sobre", href: "/sobre" },
  { label: "Experiência Acadêmica", href: "/academica" },
  { label: "Experiência Profissional", href: "/profissional" },
  { label: "Projetos", href: "/projetos" },
  { label: "Jogo", href: "/jogo" },
];

export default function Home() {
  return (
    <Screen>
      <View style={styles.hero}>
        <View style={styles.avatarContainer}>
          <Image source={profileImage} style={styles.avatar} />
        </View>

        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.title}>{profile.title}</Text>
        <Text style={styles.age}>{profile.age}</Text>
        <Text style={styles.summary}>{profile.summary}</Text>
      </View>

      <Card>
        <Text style={styles.cardTitle}>Contato</Text>
        <Text style={styles.text}>Email: {profile.email}</Text>
        <Text style={styles.text}>GitHub: {profile.github}</Text>
        <Text style={styles.text}>Localização: {profile.location}</Text>
      </Card>

      <Card>
        <Text style={styles.cardTitle}>Formação atual</Text>
        <Text style={styles.text}>Ciência da Computação - UNICAP</Text>
        <Text style={styles.text}>Atualmente no 5º período</Text>
        <Text style={styles.text}>Formação técnica em TI pelo SENAC</Text>
      </Card>

      <View style={styles.menu}>
        {links.map((item) => (
          <Link key={item.href} href={item.href as never} style={styles.button}>
            {item.label}
          </Link>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    alignItems: "center",
    paddingVertical: 30,
  },
  avatarContainer: {
    width: 142,
    height: 142,
    borderRadius: 71,
    backgroundColor: "rgba(56, 189, 248, 0.18)",
    borderWidth: 3,
    borderColor: "#38bdf8",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },
  avatar: {
    width: 128,
    height: 128,
    borderRadius: 64,
    resizeMode: "cover",
  },
  name: {
    color: "#f8fafc",
    fontSize: 34,
    fontWeight: "900",
    textAlign: "center",
  },
  title: {
    color: "#38bdf8",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 6,
    textAlign: "center",
  },
  age: {
    color: "#94a3b8",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 4,
    textAlign: "center",
  },
  summary: {
    color: "#cbd5e1",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 16,
    textAlign: "center",
    maxWidth: 720,
  },
  cardTitle: {
    color: "#f8fafc",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 8,
  },
  text: {
    color: "#cbd5e1",
    fontSize: 15,
    marginBottom: 4,
  },
  menu: {
    gap: 12,
  },
  button: {
    backgroundColor: "#2563eb",
    color: "#ffffff",
    textAlign: "center",
    padding: 16,
    borderRadius: 16,
    fontSize: 16,
    fontWeight: "800",
    overflow: "hidden",
  },
});