import { useCallback, useState } from 'react';
import { Alert, Text, View, StyleSheet } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { Button, Card, colors, Page, Photo, Title } from '@/ui';
import { excluirLugar, listarLugares } from '@/services/storage';
import { Lugar } from '@/Lugar';

export default function LugaresScreen() {
  const [lugares, setLugares] = useState<Lugar[]>([]);
  const [loading, setLoading] = useState(true);
  const refresh = useCallback(() => { setLoading(true); listarLugares().then(setLugares).catch((e) => Alert.alert('Erro ao carregar', String(e))).finally(() => setLoading(false)); }, []);
  useFocusEffect(refresh);
  const confirmDelete = (lugar: Lugar) => Alert.alert('Excluir lugar?', `“${lugar.nome}” e sua foto serão removidos deste aparelho.`, [{ text: 'Cancelar', style: 'cancel' }, { text: 'Excluir', style: 'destructive', onPress: async () => { try { await excluirLugar(lugar.id); refresh(); } catch (e) { Alert.alert('Não foi possível excluir', String(e)); } } }]);
  return <Page><Title sub="Suas lembranças, da mais recente à mais antiga.">Meus lugares</Title>{loading ? <Text style={styles.message}>Carregando seus registros…</Text> : lugares.length === 0 ? <Card><Text style={styles.empty}>Ainda não há lugares registrados.</Text><Text style={styles.muted}>Seu próximo passeio pode ser o primeiro.</Text><Button title="Registrar um lugar" onPress={() => router.push('/novo-lugar')} /></Card> : lugares.map((lugar) => <Card key={lugar.id}><Photo uri={lugar.fotoUri} /><Text style={styles.name}>{lugar.nome}</Text><Text style={styles.muted} numberOfLines={2}>{lugar.descricao}</Text><Text style={styles.meta}>{new Date(lugar.criadoEm).toLocaleString('pt-BR')} · {lugar.latitude.toFixed(5)}, {lugar.longitude.toFixed(5)}</Text><View style={styles.actions}><View style={styles.grow}><Button title="Ver detalhes" onPress={() => router.push(`/detalhes/${lugar.id}`)} /></View><View style={styles.grow}><Button title="Editar" secondary onPress={() => router.push({ pathname: '/novo-lugar', params: { id: lugar.id } })} /></View></View><Button title="Excluir lugar" danger secondary onPress={() => confirmDelete(lugar)} /></Card>)}</Page>;
}
const styles = StyleSheet.create({ message: { color: colors.muted }, empty: { fontSize: 18, color: colors.ink, fontWeight: '700' }, muted: { color: colors.muted, lineHeight: 21 }, name: { color: colors.ink, fontSize: 19, fontWeight: '800' }, meta: { color: colors.muted, fontSize: 12, lineHeight: 18 }, actions: { flexDirection: 'row', gap: 10 }, grow: { flex: 1 } });
