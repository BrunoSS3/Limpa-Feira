import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Telas de autenticação */}
      <Stack.Screen name="index" />
      <Stack.Screen name="cadastro" />
      <Stack.Screen name="esqueceu-senha" />

      {/* App principal com abas */}
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}