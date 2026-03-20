import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export default function Perfil() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <View style={styles.headerSolid}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Perfil</Text>
          <View style={styles.headerIconCircle}>
            <Ionicons name="person-outline" size={22} color="#0A6847" />
          </View>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={48} color="#16C47F" />
          </View>
        </View>
        <Text style={styles.nome}>Usuário</Text>
        <Text style={styles.email}>usuario@email.com</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F2F7F2',
  },
  headerSolid: {
    paddingTop: 52,
    paddingBottom: 24,
    paddingHorizontal: 24,
    backgroundColor: '#0A6847',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  headerIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 36,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(10, 104, 71, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0EDE5',
  },
  nome: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A3C2A',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#8FAE9B',
  },
});
