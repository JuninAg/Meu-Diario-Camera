import { useCallback, useState } from 'react';
import { useFocusEffect, router } from 'expo-router';
import { Text, View, StyleSheet } from 'react-native';
import { Button, Card, colors, Page } from '@/ui';
import { listarLugares } from '@/services/storage';

export default function HomeScreen() {
  const [count, setCount] = useState(0);
  useFocusEffect(useCallback(() => { listarLugares().then((items) => setCount(items.length)).catch(() => setCount(0)); }, []));
  return <Page><View style={styles.hero}><View style={styles.logo}><Text style={styles.logoText}>✦</Text></View><Text style={styles.brand}>Meu Diário{ '\n' }de Lugares</Text><Text style={styles.tagline}>Guarde os lugares que fazem parte da sua história.</Text></View><Card><Text style={styles.welcome}>Olá, viajante 👋</Text><Text style={styles.body}>Registre cada visita com uma foto, suas lembranças e a localização real.</Text><Text style={styles.count}>{count}</Text><Text style={styles.countLabel}>{count === 1 ? 'lugar guardado' : 'lugares guardados'}</Text></Card><Button title="＋  Registrar novo lugar" onPress={() => router.push('/novo-lugar')} /><Button title="Ver meus lugares  →" secondary onPress={() => router.push('/lugares')} /><Text style={styles.foot}>Suas memórias ficam salvas neste aparelho.</Text></Page>;
}
const styles = StyleSheet.create({ hero: { alignItems: 'center', paddingTop: 36, paddingBottom: 20, gap: 10 }, logo: { width: 68, height: 68, borderRadius: 24, backgroundColor: colors.green, alignItems: 'center', justifyContent: 'center' }, logoText: { fontSize: 32, color: '#F4D6A8' }, brand: { fontSize: 32, lineHeight: 36, fontWeight: '800', color: colors.ink, textAlign: 'center', letterSpacing: -0.6 }, tagline: { textAlign: 'center', color: colors.muted, fontSize: 15, lineHeight: 21 }, welcome: { color: colors.ink, fontSize: 19, fontWeight: '800' }, body: { color: colors.muted, fontSize: 14, lineHeight: 21 }, count: { color: colors.green, fontSize: 32, fontWeight: '800', marginTop: 5 }, countLabel: { color: colors.muted, fontSize: 13 }, foot: { color: colors.muted, fontSize: 12, textAlign: 'center', marginTop: 8 } });
