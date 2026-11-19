import { Tabs } from "expo-router";
import { Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors, fonts } from "../../src/theme/tokens";

const icons = { index: "home-outline", explorar: "search-outline", mapa: "map-outline", roteiros: "trail-sign-outline", perfil: "person-outline" } as const;
export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  // No PWA instalado no iPhone, o WebKit já desconta a área do indicador
  // inferior do viewport. Somar o inset novamente deixa a barra muito alta.
  const insetInferior = Platform.OS === "web" ? 0 : insets.bottom;
  return <Tabs backBehavior="history" screenOptions={({ route }) => ({
    headerShown: false, tabBarActiveTintColor: colors.accentDark, tabBarInactiveTintColor: colors.textMuted,
    tabBarStyle: {
      height: 58 + insetInferior,
      paddingTop: 4,
      paddingBottom: Math.max(4, insetInferior),
      borderTopWidth: 1,
      borderTopColor: colors.tabBorder,
      backgroundColor: colors.surface2,
    },
    tabBarItemStyle: { paddingBottom: 2 },
    tabBarLabelStyle: { fontFamily: fonts.semibold, fontSize: 10, marginTop: 0 },
    tabBarIcon: ({ color, focused }) => <View style={{ width: 48, height: 30, borderRadius: 16, alignItems: "center", justifyContent: "center", backgroundColor: focused ? colors.accentTint : "transparent" }}><Ionicons name={icons[route.name as keyof typeof icons]} size={21} color={color} /></View>,
  })}>
    <Tabs.Screen name="index" options={{ title: "Início", tabBarLabel: "Início" }} />
    <Tabs.Screen name="explorar" options={{ title: "Explorar", tabBarLabel: "Explorar" }} />
    <Tabs.Screen name="mapa" options={{ title: "Mapa", tabBarLabel: "Mapa" }} />
    <Tabs.Screen name="roteiros" options={{ title: "Roteiros", tabBarLabel: "Roteiros" }} />
    <Tabs.Screen name="perfil" options={{ title: "Perfil", tabBarLabel: "Perfil" }} />
  </Tabs>;
}
