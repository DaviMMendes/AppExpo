import { useMemo, useState } from "react";
import { LayoutChangeEvent, Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Card } from "../components/Card";
import { Screen } from "../components/Screen";
import { SectionTitle } from "../components/SectionTitle";

type Position = {
  top: number;
  left: number;
};

type Target = {
  id: number;
  top: number;
  left: number;
};

type HitEffect = {
  id: number;
  top: number;
  left: number;
  value: number;
};

type AreaSize = {
  width: number;
  height: number;
};

const initialArea: AreaSize = {
  width: 320,
  height: 315,
};

function randomPosition(area: AreaSize, targetSize: number): Position {
  const maxLeft = Math.max(0, area.width - targetSize - 10);
  const maxTop = Math.max(0, area.height - targetSize - 10);

  return {
    top: Math.floor(Math.random() * maxTop),
    left: Math.floor(Math.random() * maxLeft),
  };
}

function createTargets(amount: number, area: AreaSize, targetSize: number): Target[] {
  return Array.from({ length: amount }, (_, index) => {
    const position = randomPosition(area, targetSize);

    return {
      id: index + 1,
      top: position.top,
      left: position.left,
    };
  });
}

export default function Jogo() {
  const [score, setScore] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [areaSize, setAreaSize] = useState<AreaSize>(initialArea);
  const [started, setStarted] = useState(false);

  const [clickPower, setClickPower] = useState(2);
  const [comboLevel, setComboLevel] = useState(0);
  const [targetSize, setTargetSize] = useState(82);
  const [ballCount, setBallCount] = useState(1);

  const [targets, setTargets] = useState<Target[]>([
    { id: 1, top: 110, left: 110 },
  ]);

  const [effects, setEffects] = useState<HitEffect[]>([]);

  const clickPowerCost = clickPower * 8;
  const comboCost = (comboLevel + 1) * 18;
  const targetCost = Math.max(12, Math.floor((122 - targetSize) * 1.4));
  const ballCost = ballCount * 45;

  const comboMultiplier = useMemo(() => {
    return 1 + comboLevel * 0.3;
  }, [comboLevel]);

  const pointsPerHit = useMemo(() => {
    return Math.max(1, Math.floor(clickPower * comboMultiplier));
  }, [clickPower, comboMultiplier]);

  const progressToPower = Math.min(100, Math.floor((score / clickPowerCost) * 100));
  const progressToCombo = Math.min(100, Math.floor((score / comboCost) * 100));
  const progressToTarget =
    targetSize >= 122 ? 100 : Math.min(100, Math.floor((score / targetCost) * 100));
  const progressToBall =
    ballCount >= 5 ? 100 : Math.min(100, Math.floor((score / ballCost) * 100));

  function handleAreaLayout(event: LayoutChangeEvent) {
    const { width, height } = event.nativeEvent.layout;
    const newArea = { width, height };

    setAreaSize(newArea);

    if (!started) {
      setTargets([
        {
          id: 1,
          top: Math.max(0, height / 2 - targetSize / 2),
          left: Math.max(0, width / 2 - targetSize / 2),
        },
      ]);
    }
  }

  function startGame() {
    const initialTargetSize = 82;
    const initialBallCount = 1;

    setScore(0);
    setTotalClicks(0);
    setStarted(true);
    setClickPower(2);
    setComboLevel(0);
    setTargetSize(initialTargetSize);
    setBallCount(initialBallCount);
    setEffects([]);
    setTargets(createTargets(initialBallCount, areaSize, initialTargetSize));
  }

  function addHitEffect(target: Target) {
    const effectId = Date.now() + Math.random();

    const newEffect: HitEffect = {
      id: effectId,
      top: target.top + targetSize / 2 - 18,
      left: target.left + targetSize / 2 - 28,
      value: pointsPerHit,
    };

    setEffects((current) => [...current.slice(-5), newEffect]);

    setTimeout(() => {
      setEffects((current) => current.filter((effect) => effect.id !== effectId));
    }, 260);
  }

  function hitTarget(targetId: number) {
    if (!started) return;

    const selectedTarget = targets.find((target) => target.id === targetId);
    if (!selectedTarget) return;

    addHitEffect(selectedTarget);

    setScore((current) => current + pointsPerHit);
    setTotalClicks((current) => current + 1);

    setTargets((current) =>
      current.map((target) => {
        if (target.id !== targetId) return target;

        const position = randomPosition(areaSize, targetSize);

        return {
          ...target,
          top: position.top,
          left: position.left,
        };
      })
    );
  }

  function buyClickPower() {
    if (score < clickPowerCost) return;

    setScore((current) => current - clickPowerCost);
    setClickPower((current) => current + 1);
  }

  function buyCombo() {
    if (score < comboCost) return;

    setScore((current) => current - comboCost);
    setComboLevel((current) => current + 1);
  }

  function buyTargetSize() {
    if (score < targetCost || targetSize >= 122) return;

    const newSize = Math.min(122, targetSize + 10);

    setScore((current) => current - targetCost);
    setTargetSize(newSize);
    setTargets(createTargets(ballCount, areaSize, newSize));
  }

  function buyExtraBall() {
    if (score < ballCost || ballCount >= 5) return;

    const newBallCount = ballCount + 1;

    setScore((current) => current - ballCost);
    setBallCount(newBallCount);
    setTargets(createTargets(newBallCount, areaSize, targetSize));
  }

  return (
    <Screen>
      <SectionTitle>Jogo</SectionTitle>

      <Card>
        <LinearGradient colors={["#1e3a8a", "#1d4ed8", "#0f172a"]} style={styles.panel}>
          <View style={styles.header}>
            <View>
              <Text style={styles.score}>Pontos: {score}</Text>
              <Text style={styles.smallText}>Cliques: {totalClicks}</Text>
              <Text style={styles.smallText}>Ganho por acerto: {pointsPerHit}</Text>
            </View>

            <Pressable onPress={startGame} style={styles.startButton}>
              <Text style={styles.startText}>{started ? "Reiniciar" : "Iniciar"}</Text>
            </Pressable>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{clickPower}</Text>
              <Text style={styles.statLabel}>Força</Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statValue}>{comboMultiplier.toFixed(1)}x</Text>
              <Text style={styles.statLabel}>Combo</Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statValue}>{targetSize}</Text>
              <Text style={styles.statLabel}>Alvo</Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statValue}>{ballCount}</Text>
              <Text style={styles.statLabel}>Bolas</Text>
            </View>
          </View>
        </LinearGradient>
      </Card>

      <Card>
        <Text style={styles.upgradeTitle}>Upgrades</Text>

        <View style={styles.upgradeGrid}>
          <Pressable
            onPress={buyClickPower}
            disabled={score < clickPowerCost}
            style={[
              styles.upgradeButton,
              score < clickPowerCost && styles.disabledButton,
            ]}
          >
            <Text style={styles.upgradeName}>Força</Text>
            <Text style={styles.upgradeDescription}>+1 ponto base</Text>
            <Text style={styles.upgradeCost}>{clickPowerCost} pts</Text>

            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progressToPower}%` }]} />
            </View>
          </Pressable>

          <Pressable
            onPress={buyCombo}
            disabled={score < comboCost}
            style={[
              styles.upgradeButton,
              score < comboCost && styles.disabledButton,
            ]}
          >
            <Text style={styles.upgradeName}>Combo</Text>
            <Text style={styles.upgradeDescription}>+0.3x multiplicador</Text>
            <Text style={styles.upgradeCost}>{comboCost} pts</Text>

            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progressToCombo}%` }]} />
            </View>
          </Pressable>

          <Pressable
            onPress={buyTargetSize}
            disabled={score < targetCost || targetSize >= 122}
            style={[
              styles.upgradeButton,
              (score < targetCost || targetSize >= 122) && styles.disabledButton,
            ]}
          >
            <Text style={styles.upgradeName}>Alvo</Text>
            <Text style={styles.upgradeDescription}>fica maior</Text>
            <Text style={styles.upgradeCost}>
              {targetSize >= 122 ? "Máx." : `${targetCost} pts`}
            </Text>

            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progressToTarget}%` }]} />
            </View>
          </Pressable>

          <Pressable
            onPress={buyExtraBall}
            disabled={score < ballCost || ballCount >= 5}
            style={[
              styles.upgradeButton,
              (score < ballCost || ballCount >= 5) && styles.disabledButton,
            ]}
          >
            <Text style={styles.upgradeName}>Bolas</Text>
            <Text style={styles.upgradeDescription}>+1 alvo na tela</Text>
            <Text style={styles.upgradeCost}>
              {ballCount >= 5 ? "Máx." : `${ballCost} pts`}
            </Text>

            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progressToBall}%` }]} />
            </View>
          </Pressable>
        </View>
      </Card>

      <Card>
        <Text style={styles.description}>
          Clique nos alvos para ganhar pontos. Compre melhorias para aumentar ganho,
          multiplicador, tamanho dos alvos e quantidade de bolas na tela.
        </Text>

        <View style={styles.gameArea} onLayout={handleAreaLayout}>
          <View style={styles.gridLineHorizontal} />
          <View style={styles.gridLineVertical} />

          {started ? (
            <>
              {effects.map((effect) => (
                <View
                  key={effect.id}
                  pointerEvents="none"
                  style={[
                    styles.hitEffect,
                    {
                      top: effect.top,
                      left: effect.left,
                    },
                  ]}
                >
                  <Text style={styles.hitEffectText}>+{effect.value}</Text>
                </View>
              ))}

              {targets.map((target) => (
                <Pressable
                  key={target.id}
                  onPress={() => hitTarget(target.id)}
                  style={[
                    styles.target,
                    {
                      top: target.top,
                      left: target.left,
                      width: targetSize,
                      height: targetSize,
                      borderRadius: targetSize / 2,
                    },
                  ]}
                >
                  <LinearGradient
                    colors={["#e0f2fe", "#38bdf8", "#0284c7"]}
                    style={[
                      styles.targetGradient,
                      {
                        width: targetSize,
                        height: targetSize,
                        borderRadius: targetSize / 2,
                      },
                    ]}
                  >
                    <View style={styles.innerCircle} />
                    <Text style={styles.targetText}>+{pointsPerHit}</Text>
                  </LinearGradient>
                </Pressable>
              ))}
            </>
          ) : (
            <View style={styles.startBox}>
              <Text style={styles.waitingTitle}>Jogo de Reflexo</Text>
              <Text style={styles.waitingText}>Clique em iniciar para jogar</Text>
            </View>
          )}
        </View>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  panel: {
    borderRadius: 20,
    padding: 16,
  },
  description: {
    color: "#cbd5e1",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  score: {
    color: "#f8fafc",
    fontSize: 24,
    fontWeight: "900",
  },
  smallText: {
    color: "#dbeafe",
    fontSize: 14,
    marginTop: 3,
  },
  startButton: {
    backgroundColor: "#f8fafc",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 14,
  },
  startText: {
    color: "#1d4ed8",
    fontWeight: "900",
  },
  statsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 14,
  },
  statBox: {
    flex: 1,
    backgroundColor: "rgba(2, 6, 23, 0.72)",
    borderColor: "rgba(226, 232, 240, 0.22)",
    borderWidth: 1,
    borderRadius: 16,
    padding: 9,
    alignItems: "center",
  },
  statValue: {
    color: "#7dd3fc",
    fontSize: 20,
    fontWeight: "900",
  },
  statLabel: {
    color: "#e2e8f0",
    fontSize: 12,
    marginTop: 4,
  },
  upgradeTitle: {
    color: "#f8fafc",
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 10,
  },
  upgradeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  upgradeButton: {
    width: "48%",
    backgroundColor: "#1d4ed8",
    borderRadius: 16,
    padding: 12,
    minHeight: 108,
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "rgba(219, 234, 254, 0.25)",
  },
  disabledButton: {
    backgroundColor: "#334155",
    opacity: 0.72,
  },
  upgradeName: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "900",
  },
  upgradeDescription: {
    color: "#dbeafe",
    fontSize: 12,
    marginTop: 4,
  },
  upgradeCost: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "900",
    marginTop: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: "rgba(15, 23, 42, 0.55)",
    borderRadius: 999,
    marginTop: 8,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#7dd3fc",
    borderRadius: 999,
  },
  gameArea: {
    height: 315,
    width: "100%",
    borderRadius: 20,
    backgroundColor: "#020617",
    borderWidth: 1,
    borderColor: "rgba(148, 163, 184, 0.25)",
    overflow: "hidden",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  gridLineHorizontal: {
    position: "absolute",
    width: "100%",
    height: 1,
    backgroundColor: "rgba(56, 189, 248, 0.12)",
    top: "50%",
  },
  gridLineVertical: {
    position: "absolute",
    height: "100%",
    width: 1,
    backgroundColor: "rgba(56, 189, 248, 0.12)",
    left: "50%",
  },
  target: {
    position: "absolute",
  },
  targetGradient: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderColor: "#f8fafc",
  },
  innerCircle: {
    position: "absolute",
    width: "46%",
    height: "46%",
    borderRadius: 999,
    backgroundColor: "rgba(255, 255, 255, 0.32)",
  },
  targetText: {
    color: "#020617",
    fontSize: 20,
    fontWeight: "900",
  },
  hitEffect: {
    position: "absolute",
    zIndex: 10,
    backgroundColor: "rgba(14, 165, 233, 0.22)",
    borderColor: "rgba(224, 242, 254, 0.85)",
    borderWidth: 2,
    borderRadius: 999,
    paddingVertical: 7,
    paddingHorizontal: 12,
  },
  hitEffectText: {
    color: "#e0f2fe",
    fontSize: 16,
    fontWeight: "900",
  },
  startBox: {
    alignItems: "center",
    backgroundColor: "rgba(15, 23, 42, 0.72)",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(148, 163, 184, 0.25)",
  },
  waitingTitle: {
    color: "#f8fafc",
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 6,
  },
  waitingText: {
    color: "#94a3b8",
    fontSize: 15,
    fontWeight: "700",
  },
});