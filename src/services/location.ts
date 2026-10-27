import * as Location from 'expo-location';

export async function capturarLocalizacao() {
  const permission = await Location.requestForegroundPermissionsAsync();
  if (!permission.granted) throw new Error('Permissão de localização negada. Ative o acesso à localização nas configurações do aparelho.');
  const enabled = await Location.hasServicesEnabledAsync();
  if (!enabled) throw new Error('A localização está desativada. Ative o GPS e tente novamente.');
  try {
    return await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced, mayShowUserSettingsDialog: true });
  } catch {
    throw new Error('Não foi possível obter sua posição. Verifique o sinal e se o GPS está ativado.');
  }
}
