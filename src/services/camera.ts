import * as ImagePicker from 'expo-image-picker';

export async function tirarFoto() {
  const permission = await ImagePicker.requestCameraPermissionsAsync();
  if (!permission.granted) throw new Error('Permissão da câmera negada. Ative o acesso à câmera nas configurações do aparelho.');
  const result = await ImagePicker.launchCameraAsync({ mediaTypes: ['images'], quality: 0.8, allowsEditing: true, aspect: [4, 3] });
  return result.canceled ? undefined : result.assets[0]?.uri;
}

export async function escolherFoto() {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permission.granted) throw new Error('Permissão de fotos negada. Ative o acesso às fotos nas configurações do aparelho.');
  const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.8, allowsEditing: true, aspect: [4, 3] });
  return result.canceled ? undefined : result.assets[0]?.uri;
}
