import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useSessao } from "../src/sessao/SessaoProvider";
import { colors, fonts, gradients, radius, spacing } from "../src/theme/tokens";

const FUNDO = require("../assets/images/splash-bg.jpg");

export default function Abertura() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { estado, entrarComoVisitante, sair } = useSessao();
  const [entrando, setEntrando] = useState(false);

  function entrarNaConta() {
    if (estado === "identificado") {
      router.replace("/(tabs)");
      return;
    }
    router.push("/login");
  }

  async function explorarSemConta() {
    if (entrando) return;
    setEntrando(true);
    try {
      // A escolha explícita por visitante também encerra uma conta anterior.
      if (estado === "identificado") await sair();
      await entrarComoVisitante();
      router.replace("/(tabs)/explorar");
    } finally {
      setEntrando(false);
    }
  }

  const rotuloConta = estado === "identificado"
    ? "Continuar na minha conta"
    : "Entrar ou criar conta";

  return (
    <View style={styles.tela}>
      <Image
        source={FUNDO}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        contentPosition="center"
        transition={300}
        accessible={false}
      />
      <LinearGradient
        colors={gradients.screenTop.colors}
        locations={gradients.screenTop.locations}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
      <LinearGradient
        colors={gradients.screenBottom.colors}
        locations={gradients.screenBottom.locations}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />

      <View style={[styles.conteudo, {
        paddingTop: insets.top + 24,
        paddingBottom: insets.bottom + 24,
      }]}>
        <View style={styles.marca}>
          <Text accessibilityRole="header" style={styles.logotipo}>Raízes</Text>
          <Text style={styles.sobretitulo}>Descoberta cultural</Text>
        </View>

        <View style={styles.acoes}>
          <Text style={styles.chamada}>
            Conheça Palmas pelas pessoas, culturas e histórias que construíram
            sua identidade.
          </Text>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={rotuloConta}
            disabled={entrando}
            onPress={entrarNaConta}
            style={({ pressed }) => [
              styles.primarioWrapper,
              pressed && styles.primarioPressionado,
            ]}
          >
            <LinearGradient
              colors={[colors.accent, colors.accentDark]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.primario}
            >
              <Text style={styles.primarioRotulo}>{rotuloConta}</Text>
            </LinearGradient>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Explorar como visitante, sem conta"
            accessibilityState={{ disabled: entrando, busy: entrando }}
            disabled={entrando}
            onPress={explorarSemConta}
            style={({ pressed }) => [
              styles.visitante,
              pressed && styles.visitantePressionado,
            ]}
          >
            <Text style={styles.visitanteRotulo}>
              {entrando ? "Preparando seu caminho…" : "Explorar como visitante"}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: colors.bg },
  conteudo: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: spacing.pageX,
  },
  marca: { gap: 9 },
  logotipo: {
    fontFamily: fonts.extrabold,
    fontSize: 42,
    lineHeight: 46,
    letterSpacing: -0.84,
    color: colors.onDark,
  },
  sobretitulo: {
    fontFamily: fonts.semibold,
    fontSize: 12,
    letterSpacing: 0.48,
    textTransform: "uppercase",
    color: colors.onDarkMuted,
  },
  acoes: { gap: 10 },
  chamada: {
    maxWidth: 290,
    marginBottom: 8,
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 24,
    color: colors.onDarkSoft,
  },
  primarioWrapper: {
    borderRadius: radius.button,
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 16,
    elevation: 6,
  },
  primarioPressionado: {
    transform: [{ scale: 0.97 }],
    shadowOpacity: 0.12,
  },
  primario: {
    minHeight: 52,
    borderRadius: radius.button,
    alignItems: "center",
    justifyContent: "center",
  },
  primarioRotulo: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: colors.onDark,
  },
  visitante: {
    minHeight: 48,
    borderRadius: radius.button,
    borderWidth: 1.5,
    borderColor: colors.borderOnDark,
    alignItems: "center",
    justifyContent: "center",
  },
  visitantePressionado: {
    transform: [{ scale: 0.98 }],
    borderColor: "rgba(255, 255, 255, 0.3)",
    backgroundColor: "rgba(255, 255, 255, 0.06)",
  },
  visitanteRotulo: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    color: colors.onDarkMuted,
  },
});
