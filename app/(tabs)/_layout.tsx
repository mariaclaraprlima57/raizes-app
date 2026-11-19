import { Tabs } from "expo-router";
import { Platform, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors, fonts } from "../../src/theme/tokens";

const icons = { index: "home-outline", explorar: "search-outline", mapa: "map-outline", roteiros: "trail-sign-outline", perfil: "person-outline" } as const;
const labels = { index: "Início", explorar: "Explorar", mapa: "Mapa", roteiros: "Roteiros", perfil: "Perfil" } as const;

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  // No PWA instalado no iPhone, o WebKit já desconta a área do indicador
  // inferior do viewport. Somar o inset novamente deixa a barra muito alta.
  const insetInferior = Platform.OS === "web" ? 0 : insets.bottom;
  return <Tabs backBehavior="history" screenOptions={({ route }) => ({
    headerShown: false, tabBarActiveTintColor: colors.accentDark, tabBarInactiveTintColor: colors.textMuted,
    tabBarShowLabel: false,
    tabBarHideOnKeyboard: true,
    tabBarStyle: {
      height: 54 + insetInferior,
      paddingTop: 2,
      paddingBottom: insetInferior,
      borderTopWidth: 1,
      borderTopColor: colors.tabBorder,
      backgroundColor: colors.surface2,
      ...(Platform.OS === "web" ? { position: "absolute", left: 0, right: 0, bottom: 0 } : null),
    },
    tabBarItemStyle: { height: 51 },
    tabBarIcon: ({ color, focused }) => {
      const nome = route.name as keyof typeof icons;
      return <View style={{ width: 70, height: 49, alignItems: "center", justifyContent: "center" }}>
        <View style={{ width: 44, height: 27, borderRadius: 14, alignItems: "center", justifyContent: "center", backgroundColor: focused ? colors.accentTint : "transparent" }}>
          <Ionicons name={icons[nome]} size={21} color={color} />
        </View>
        <Text numberOfLines={1} style={{ marginTop: 1, fontFamily: fonts.semibold, fontSize: 10, lineHeight: 13, color }}>
          {labels[nome]}
        </Text>
      </View>;
    },
  })}>
    <Tabs.Screen name="index" options={{ title: "Início", tabBarLabel: "Início" }} />
    <Tabs.Screen name="explorar" options={{ title: "Explorar", tabBarLabel: "Explorar" }} />
    <Tabs.Screen name="mapa" options={{ title: "Mapa", tabBarLabel: "Mapa" }} />
    <Tabs.Screen name="roteiros" options={{ title: "Roteiros", tabBarLabel: "Roteiros" }} />
    <Tabs.Screen name="perfil" options={{ title: "Perfil", tabBarLabel: "Perfil" }} />
  </Tabs>;
}
