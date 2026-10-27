import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { colors } from '@/ui';

export default function RootLayout() {
  return <><StatusBar style="dark" /><Stack screenOptions={{ headerStyle: { backgroundColor: colors.cream }, headerTintColor: colors.ink, headerTitleStyle: { fontWeight: '700' }, contentStyle: { backgroundColor: colors.cream } }}><Stack.Screen name="index" options={{ title: 'Meu Diário de Lugares', headerShown: false }} /><Stack.Screen name="lugares" options={{ title: 'Meus lugares' }} /><Stack.Screen name="novo-lugar" options={{ title: 'Registrar lugar' }} /><Stack.Screen name="detalhes/[id]" options={{ title: 'Detalhes do lugar' }} /></Stack></>;
}
