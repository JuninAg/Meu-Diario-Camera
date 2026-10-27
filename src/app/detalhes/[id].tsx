import { useCallback, useState } from 'react';
import { Alert, Linking, Text, StyleSheet } from 'react-native';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { Button, Card, colors, Info, Page, Photo, Title } from '@/ui';
import { excluirLugar, buscarLugar } from '@/services/storage';
import { Lugar } from '@/Lugar';

export default function DetalhesScreen() {
  const { id } = useLocalSearchParams<{ id: string }>(); const [lugar, setLugar] = useState<Lugar>();
  useFocusEffect(useCallback(() => { buscarLugar(id).then(setLugar).catch((e) => Alert.alert('Erro ao carregar', String(e))); }, [id]));
  const remove = () => Alert.alert('Excluir lugar?', `“${lugar?.nome}” e sua foto serão removidos.`, [{ text: 'Cancelar', style: 'cancel' }, { text: 'Excluir', style: 'destructive', onPress: async () => { try { await excluirLugar(id); router.replace('/lugares'); } catch (e) { Alert.alert('Erro ao excluir', String(e)); } } }]);
  if (!lugar) return <Page><Text style={styles.muted}>Carregando registro ou lugar não encontrado.</Text><Button title="Voltar aos lugares" secondary onPress={() => router.replace('/lugares')} /></Page>;
  return <Page><Title>{lugar.nome}</Title><Photo uri={lugar.fotoUri} large /><Card><Info label="Descrição" value={lugar.descricao} /><Info label="Registrado em" value={new Date(lugar.criadoEm).toLocaleString('pt-BR')} /><Info label="Última atualização" value={new Date(lugar.atualizadoEm).toLocaleString('pt-BR')} /><Info label="Latitude" value={lugar.latitude.toFixed(6)} /><Info label="Longitude" value={lugar.longitude.toFixed(6)} /></Card><Button title="Abrir coordenadas no mapa" onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${lugar.latitude},${lugar.longitude}`).catch(() => Alert.alert('Não foi possível abrir o mapa'))} /><Button title="Editar lugar" secondary onPress={() => router.push({ pathname: '/novo-lugar', params: { id } })} /><Button title="Excluir lugar" danger secondary onPress={remove} /></Page>;
}
const styles = StyleSheet.create({ muted: { color: colors.muted } });
