import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useRouter, type Href } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSessao } from "../../sessao/SessaoProvider";
import { supabase } from "../../lib/supabase";
import { usePreferencias } from "../../preferencias/PreferenciasProvider";
import { useFavoritos } from "../../locais/useFavoritos";
import { useLocais } from "../../locais/useLocais";
import { useRoteiros } from "../../roteiros/useRoteiros";
import { FotoParada } from "../roteiros/FotoParada";
import { Botao, Secao, v } from "../visual/Guia";
import { colors, fonts } from "../../theme/tokens";

export function DescobertasPerfil() {
  const router = useRouter();
  const { usuarioId, nome, email, entrar } = useSessao();
  const { cidadeId, interesses } = usePreferencias();
  const favoritos = useFavoritos();
  const { locais, carregando, erro: erroLocais } = useLocais(cidadeId);
  const { roteiros, carregando: carregandoRoteiros, erro: erroRoteiros } = useRoteiros(cidadeId);
  const [editando, setEditando] = useState(false);
  const [novoNome, setNovoNome] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const salvos = locais.filter(local => favoritos.ids.includes(local.id));
  async function salvarNome() {
    if (!supabase || !usuarioId || !email || salvando) return;
    const valor = novoNome.trim();
    if (valor.length < 2) { setErro("Informe um nome com pelo menos dois caracteres."); return; }
    setSalvando(true);
    setErro(null);
    try {
      const { error } = await supabase.auth.updateUser({ data: { nome: valor } });
      if (error) throw error;
      await entrar(email, valor, usuarioId);
      setEditando(false);
    } catch { setErro("Não foi possível salvar seu nome. Tente novamente."); }
    finally { setSalvando(false); }
  }
  return <>
    {usuarioId ? <View style={v.bloco}>
      <Pressable accessibilityRole="button" style={{ minHeight: 44, flexDirection: "row", gap: 10, alignItems: "center" }} onPress={() => { setNovoNome(nome ?? ""); setErro(null); setEditando(!editando); }} disabled={salvando}>
        <Ionicons name="create-outline" size={20} color={colors.accent} /><Text style={v.link}>{editando ? "Fechar edição" : "Editar meu nome"}</Text>
      </Pressable>
      {editando ? <>
        <Text style={v.descricao}>Como você quer ser chamado?</Text>
        <TextInput accessibilityLabel="Nome de exibição" value={novoNome} onChangeText={setNovoNome} maxLength={100} editable={!salvando} autoCapitalize="words" style={{ borderWidth: 1, borderColor: colors.inputBorder, borderRadius: 16, padding: 14, color: colors.text, fontFamily: fonts.regular }} />
        <Botao texto={salvando ? "Salvando…" : "Salvar nome"} disabled={salvando} onPress={() => { void salvarNome(); }} />
      </> : null}
      {erro ? <Text accessibilityRole="alert" style={v.erro}>{erro}</Text> : null}
    </View> : null}
    <View style={{ flexDirection: "row", gap: 12 }}>
      <View style={[v.bloco, { flex: 1, backgroundColor: colors.accentSoft }]}>
        <Ionicons name="heart-outline" size={24} color={colors.accent} />
        <Text style={[v.titulo, { color: colors.accent }]}>{favoritos.erro ? "—" : usuarioId && !favoritos.pronto ? "…" : favoritos.ids.length}</Text>
        <Text style={v.descricao}>Lugares salvos</Text>
      </View>
      <View style={[v.bloco, { flex: 1, backgroundColor: colors.accentSoft }]}>
        <Ionicons name="sparkles-outline" size={24} color={colors.accent} />
        <Text style={[v.titulo, { color: colors.accent }]}>{interesses.length}</Text>
        <Text style={v.descricao}>Seus interesses</Text>
      </View>
    </View>
    <Secao titulo="Minhas descobertas" acao="Explorar" onPress={() => router.push("/(tabs)/explorar")} />
    <View style={v.bloco}>
      <Text style={v.descricao}>Sua lista de lugares que quer conhecer.</Text>
      {favoritos.erro || erroLocais ? <Text accessibilityRole="alert" style={v.erro}>{favoritos.erro ?? erroLocais}</Text>
        : (usuarioId && !favoritos.pronto) || carregando ? <Text style={v.descricao}>Carregando suas descobertas…</Text>
        : salvos.length ? salvos.map(local => <Pressable key={local.id} accessibilityRole="button" onPress={() => router.push(`/local/${local.id}` as Href)} style={{ flexDirection: "row", alignItems: "center", gap: 12, minHeight: 64 }}>
          <FotoParada local={local} /><Text style={[v.descricao, { flex: 1, color: colors.text }]}>{local.nome}</Text><Ionicons name="chevron-forward" size={18} color={colors.accent} />
        </Pressable>) : <>
          <Text style={v.secaoTitulo}>Uma cidade inteira para descobrir</Text>
          <Text style={v.descricao}>{usuarioId ? "Abra um lugar e toque em Quero conhecer para guardá-lo aqui." : "Entre na sua conta para guardar os lugares que quer conhecer."}</Text>
          <Botao texto={usuarioId ? "Encontrar meu primeiro lugar" : "Entrar na minha conta"} secundario onPress={() => router.push(usuarioId ? "/(tabs)/explorar" : "/login")} />
        </>}
    </View>
    <Secao titulo="Roteiros para você" />
    <View style={v.bloco}>
      {erroRoteiros ? <Text style={v.erro}>{erroRoteiros}</Text> : carregandoRoteiros ? <Text style={v.descricao}>Carregando roteiros…</Text> : roteiros.slice(0, 2).map(roteiro => <Pressable key={roteiro.id} accessibilityRole="button" onPress={() => router.push(`/roteiro/${roteiro.id}` as Href)} style={{ minHeight: 64, flexDirection: "row", gap: 12, alignItems: "center" }}>
        <Ionicons name="trail-sign-outline" size={24} color={colors.accent} /><View style={{ flex: 1, gap: 4 }}><Text style={[v.link, { fontSize: 14 }]}>{roteiro.titulo}</Text><Text style={v.descricao}>{roteiro.paradas.length} paradas · {roteiro.duracaoMin} min</Text></View><Ionicons name="chevron-forward" size={18} color={colors.accent} />
      </Pressable>)}
      <Botao texto="Montar meu roteiro" onPress={() => router.push("/roteiro/criar")} />
    </View>
  </>;
}
