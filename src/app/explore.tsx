import { Redirect } from 'expo-router';

/** Mantém compatibilidade com a rota Explore do template Expo. */
export default function ExploreScreen() {
  return <Redirect href="/lugares" />;
}
