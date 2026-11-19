import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";
import { supabase } from "../lib/supabase";
import { useSessao } from "../sessao/SessaoProvider";

export function useFavoritos() {
  const { usuarioId } = useSessao();
  const [pedido, setPedido] = useState<{ usuarioId: string; ids: string[] } | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [salvando, setSalvando] = useState(false);
  useFocusEffect(useCallback(() => {
    let ativo = true;
    setErro(null);
    if (usuarioId && supabase) {
      supabase.from("favoritos").select("local_id").eq("usuario_id", usuarioId).then(({ data, error }) => {
        if (!ativo) return;
        if (error) setErro("Não foi possível carregar os lugares salvos.");
        else setPedido({ usuarioId, ids: (data ?? []).map(item => item.local_id as string) });
      });
    }
    return () => { ativo = false; };
  }, [usuarioId]));
  const ids = pedido?.usuarioId === usuarioId ? pedido?.ids ?? [] : [];
  const pronto = Boolean(usuarioId && pedido?.usuarioId === usuarioId);
  async function alternar(localId: string) {
    if (!usuarioId || !supabase || salvando || !pronto) return;
    setSalvando(true);
    setErro(null);
    try {
      const salvo = ids.includes(localId);
      const { error } = salvo
        ? await supabase.from("favoritos").delete().eq("usuario_id", usuarioId).eq("local_id", localId)
        : await supabase.from("favoritos").upsert({ usuario_id: usuarioId, local_id: localId });
      if (error) throw error;
      setPedido({ usuarioId, ids: salvo ? ids.filter(id => id !== localId) : [...ids, localId] });
    } catch {
      setErro("Não foi possível atualizar seus lugares salvos. Tente novamente.");
    } finally { setSalvando(false); }
  }
  return { ids, pronto, erro, salvando, alternar };
}
