import { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Dimensions,
  StatusBar,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_IMAGE_HEIGHT = 160;

// ─── Dados da comunidade ────────────────────────────────────────
interface Denuncia {
  id: string;
  titulo: string;
  local: string;
  data: string;
  corImagem: string[];
  iconeImagem: keyof typeof Ionicons.glyphMap;
}

const denuncias: Denuncia[] = [
  {
    id: '1',
    titulo: 'Lixo acumulado no bairro Tomba',
    local: 'Rua das Flores, Tomba',
    data: '20/03/2026',
    corImagem: ['#0A6847', '#16C47F'],
    iconeImagem: 'trash-outline',
  },
  {
    id: '2',
    titulo: 'Entulho em via pública no Centro',
    local: 'Av. Principal, Centro',
    data: '19/03/2026',
    corImagem: ['#16C47F', '#7AE2A0'],
    iconeImagem: 'warning-outline',
  },
  {
    id: '3',
    titulo: 'Descarte irregular próximo a escola',
    local: 'Rua da Escola, Jardim Novo',
    data: '17/03/2026',
    corImagem: ['#0A6847', '#7AE2A0'],
    iconeImagem: 'school-outline',
  },
  {
    id: '4',
    titulo: 'Esgoto a céu aberto na Rua do Mercado',
    local: 'Rua do Mercado, Feira VII',
    data: '15/03/2026',
    corImagem: ['#16C47F', '#0A6847'],
    iconeImagem: 'water-outline',
  },
];

// ─── Card de denúncia ───────────────────────────────────────────
function DenunciaCard({ item, index }: { item: Denuncia; index: number }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        delay: index * 140,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        delay: index * 140,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.card,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <TouchableOpacity activeOpacity={0.8}>
        {/* Imagem (placeholder com gradiente) */}
        <LinearGradient
          colors={item.corImagem as [string, string]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.cardImage}
        >
          <View style={styles.imagePlaceholder}>
            <Ionicons name={item.iconeImagem} size={40} color="rgba(255,255,255,0.5)" />
            <Text style={styles.imagePlaceholderText}>Foto da denúncia</Text>
          </View>
        </LinearGradient>

        {/* Conteúdo */}
        <View style={styles.cardBody}>
          {/* Título */}
          <Text style={styles.cardTitle} numberOfLines={2}>
            {item.titulo}
          </Text>

          {/* Localização */}
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={15} color="#16C47F" />
            <Text style={styles.infoText}>{item.local}</Text>
          </View>

          {/* Data */}
          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={15} color="#16C47F" />
            <Text style={styles.infoText}>{item.data}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

// ─── Tela principal ─────────────────────────────────────────────
export default function Denuncias() {
  const headerFade = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(-20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerFade, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(headerSlide, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  function handleNovaDenuncia() {
    Alert.alert('Em breve', 'Funcionalidade de nova denúncia será implementada.');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Header */}
      <View style={styles.headerSolid}>
        <View style={styles.circle1} />
        <View style={styles.circle2} />

        <Animated.View
          style={[
            styles.headerContent,
            {
              opacity: headerFade,
              transform: [{ translateY: headerSlide }],
            },
          ]}
        >
          <View style={styles.headerTextBlock}>
            <Text style={styles.headerTitle}>Denúncias</Text>
            <Text style={styles.headerSubtitle}>
              Denúncias da comunidade
            </Text>
          </View>

          <TouchableOpacity style={styles.headerIconCircle} activeOpacity={0.7} onPress={handleNovaDenuncia}>
            <Ionicons name="add" size={28} color="#0A6847" />
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Lista */}
      <FlatList
        data={denuncias}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <DenunciaCard item={item} index={index} />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <View style={styles.footer}>
            <Ionicons name="leaf-outline" size={16} color="#16C47F" />
            <Text style={styles.footerText}>
              Limpa Feira · Cuidando da cidade
            </Text>
          </View>
        }
      />


    </SafeAreaView>
  );
}

// ─── Estilos ────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F2F7F2',
  },

  // ── Header ──
  headerSolid: {
    paddingTop: 52,
    paddingBottom: 24,
    paddingHorizontal: 24,
    backgroundColor: '#0A6847',
    overflow: 'hidden',
  },
  circle1: {
    position: 'absolute',
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: width * 0.25,
    backgroundColor: 'rgba(255,255,255,0.06)',
    top: -width * 0.12,
    right: -width * 0.15,
  },
  circle2: {
    position: 'absolute',
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: width * 0.15,
    backgroundColor: 'rgba(255,255,255,0.04)',
    bottom: -width * 0.08,
    left: -width * 0.1,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTextBlock: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
    letterSpacing: 0.2,
  },
  headerIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },

  // ── Lista ──
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 32,
  },

  // ── Card ──
  card: {
    marginBottom: 18,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.92)',
    shadowColor: '#0A6847',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
    overflow: 'hidden',
  },

  // ── Imagem ──
  cardImage: {
    height: CARD_IMAGE_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    alignItems: 'center',
    gap: 8,
  },
  imagePlaceholderText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '500',
  },

  // ── Body do card ──
  cardBody: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A3C2A',
    lineHeight: 22,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  infoText: {
    fontSize: 13,
    color: '#5A7D68',
    fontWeight: '500',
  },

  // ── Footer ──
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    gap: 6,
  },
  footerText: {
    fontSize: 12,
    color: '#8FAE9B',
    fontWeight: '500',
    letterSpacing: 0.2,
  },

});