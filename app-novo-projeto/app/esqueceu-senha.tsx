import { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function EsqueceuSenha() {
  const [email, setEmail] = useState('');

  // Animações
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const logoScale = useRef(new Animated.Value(0.5)).current;
  const cardSlide = useRef(new Animated.Value(60)).current;
  const cardFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Logo animation
    Animated.spring(logoScale, {
      toValue: 1,
      friction: 4,
      tension: 50,
      useNativeDriver: true,
    }).start();

    // Header text animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        delay: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();

    // Card animation
    Animated.parallel([
      Animated.timing(cardFade, {
        toValue: 1,
        duration: 700,
        delay: 500,
        useNativeDriver: true,
      }),
      Animated.timing(cardSlide, {
        toValue: 0,
        duration: 700,
        delay: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  function handleRecuperar() {
    if (!email.trim()) {
      Alert.alert('Atenção', 'Por favor, informe seu e-mail.');
      return;
    }
    Alert.alert(
      'E-mail enviado',
      'Verifique sua caixa de entrada para redefinir sua senha.',
      [{ text: 'OK', onPress: () => router.push('/') }],
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <LinearGradient
        colors={['#0A6847', '#16C47F', '#7AE2A0'] as const}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Decorative circles */}
        <View style={styles.circle1} />
        <View style={styles.circle2} />
        <View style={styles.circle3} />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          {/* Logo */}
          <Animated.View
            style={[
              styles.logoContainer,
              { transform: [{ scale: logoScale }] },
            ]}
          >
            <View style={styles.logoCircle}>
              <Ionicons name="key-outline" size={34} color="#0A6847" />
            </View>
          </Animated.View>

          {/* Header */}
          <Animated.View
            style={[
              styles.header,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.title}>Recuperar Senha</Text>
            <Text style={styles.subtitle}>
              Informe seu e-mail para redefinir
            </Text>
          </Animated.View>

          {/* Card com formulário */}
          <Animated.View
            style={[
              styles.card,
              {
                opacity: cardFade,
                transform: [{ translateY: cardSlide }],
              },
            ]}
          >
            {/* Mensagem informativa */}
            <View style={styles.infoBox}>
              <Ionicons name="information-circle-outline" size={18} color="#0A6847" />
              <Text style={styles.infoText}>
                Enviaremos um link de recuperação para o e-mail cadastrado.
              </Text>
            </View>

            {/* Input Email */}
            <View style={styles.inputWrapper}>
              <Ionicons
                name="mail-outline"
                size={20}
                color="#0A6847"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="E-mail"
                placeholderTextColor="#9CBAAA"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Botão Enviar */}
            <TouchableOpacity
              style={styles.enviarButton}
              onPress={handleRecuperar}
              activeOpacity={0.85}
            >
              <View style={styles.enviarButtonInner}>
                <Text style={styles.enviarButtonText}>Enviar link</Text>
              </View>
            </TouchableOpacity>

            {/* Divisor */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>ou</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Voltar ao Login */}
            <TouchableOpacity
              style={styles.voltarButton}
              activeOpacity={0.8}
              onPress={() => router.push('/')}
            >
              <Text style={styles.voltarButtonText}>Voltar ao login</Text>
            </TouchableOpacity>
          </Animated.View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  gradient: {
    flex: 1,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
  },

  // Decorative background circles
  circle1: {
    position: 'absolute',
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: width * 0.35,
    backgroundColor: 'rgba(255,255,255,0.06)',
    top: -width * 0.15,
    right: -width * 0.2,
  },
  circle2: {
    position: 'absolute',
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: width * 0.25,
    backgroundColor: 'rgba(255,255,255,0.04)',
    bottom: -width * 0.1,
    left: -width * 0.15,
  },
  circle3: {
    position: 'absolute',
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: width * 0.15,
    backgroundColor: 'rgba(255,255,255,0.05)',
    top: height * 0.35,
    left: -width * 0.05,
  },

  // Logo
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },

  // Header
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    letterSpacing: 0.3,
  },

  // Card
  card: {
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 12,
  },

  // Info box
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(10, 104, 71, 0.06)',
    borderRadius: 12,
    padding: 14,
    marginBottom: 18,
    gap: 10,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#1A3C2A',
    lineHeight: 18,
  },

  // Input
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F7F2',
    borderRadius: 14,
    paddingHorizontal: 16,
    marginBottom: 18,
    height: 54,
    borderWidth: 1,
    borderColor: '#E0EDE5',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#1A3C2A',
    height: '100%',
  },

  // Botão Enviar
  enviarButton: {
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#0A6847',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    marginBottom: 20,
  },
  enviarButtonInner: {
    height: 54,
    borderRadius: 14,
    backgroundColor: '#0A6847',
    justifyContent: 'center',
    alignItems: 'center',
  },
  enviarButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // Divisor
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#D6E5DC',
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 13,
    color: '#8FAE9B',
    fontWeight: '500',
  },

  // Botão Voltar
  voltarButton: {
    height: 54,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#0A6847',
  },
  voltarButtonText: {
    color: '#0A6847',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
