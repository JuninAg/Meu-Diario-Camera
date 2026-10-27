import AsyncStorage from '@react-native-async-storage/async-storage';
import { Directory, File, Paths } from 'expo-file-system';
import { Lugar, LugarInput } from '@/Lugar';

const STORAGE_KEY = '@meu-diario-de-lugares/v1';
const photosDirectory = new Directory(Paths.document, 'fotos-lugares');

async function ensurePhotosDirectory() {
  if (!photosDirectory.exists) photosDirectory.create({ intermediates: true, idempotent: true });
}

async function loadRaw(): Promise<Lugar[]> {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEY);
    if (!value) return [];
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed)) throw new Error('Os registros salvos estão em formato inválido.');
    return parsed as Lugar[];
  } catch (error) {
    throw new Error(`Não foi possível ler os lugares salvos: ${String(error)}`);
  }
}

async function persist(lugares: Lugar[]) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(lugares));
  } catch (error) {
    throw new Error(`Não foi possível salvar os dados no aparelho: ${String(error)}`);
  }
}

async function persistPhoto(uri: string, id: string): Promise<string> {
  await ensurePhotosDirectory();
  const source = new File(uri);
  if (!source.exists) throw new Error('A fotografia capturada não está mais disponível. Tente tirar outra foto.');
  const destination = new File(photosDirectory, `${id}-${Date.now()}.jpg`);
  await source.copy(destination);
  return destination.uri;
}

export async function listarLugares(): Promise<Lugar[]> {
  return (await loadRaw()).sort((a, b) => b.criadoEm.localeCompare(a.criadoEm));
}

export async function buscarLugar(id: string): Promise<Lugar | undefined> {
  return (await loadRaw()).find((lugar) => lugar.id === id);
}

export async function criarLugar(input: LugarInput): Promise<Lugar> {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  const fotoUri = await persistPhoto(input.fotoUri, id);
  const now = new Date().toISOString();
  const lugar: Lugar = { ...input, id, fotoUri, criadoEm: now, atualizadoEm: now };
  try {
    await persist([lugar, ...(await loadRaw())]);
    return lugar;
  } catch (error) {
    const file = new File(fotoUri);
    if (file.exists) file.delete();
    throw error;
  }
}

export async function atualizarLugar(id: string, input: LugarInput): Promise<Lugar> {
  const lugares = await loadRaw();
  const index = lugares.findIndex((item) => item.id === id);
  if (index < 0) throw new Error('Este lugar não foi encontrado.');
  const old = lugares[index];
  const fotoUri = input.fotoUri === old.fotoUri ? old.fotoUri : await persistPhoto(input.fotoUri, id);
  const updated: Lugar = { ...old, ...input, fotoUri, atualizadoEm: new Date().toISOString() };
  lugares[index] = updated;
  try {
    await persist(lugares);
    if (fotoUri !== old.fotoUri) {
      const oldFile = new File(old.fotoUri);
      if (oldFile.exists) oldFile.delete();
    }
    return updated;
  } catch (error) {
    if (fotoUri !== old.fotoUri) {
      const newFile = new File(fotoUri);
      if (newFile.exists) newFile.delete();
    }
    throw error;
  }
}

export async function excluirLugar(id: string): Promise<void> {
  const lugares = await loadRaw();
  const lugar = lugares.find((item) => item.id === id);
  await persist(lugares.filter((item) => item.id !== id));
  if (lugar) {
    const file = new File(lugar.fotoUri);
    if (file.exists) file.delete();
  }
}
