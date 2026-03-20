import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

const denuncias = [
  { id: '1', titulo: 'Lixo acumulado no bairro Tomba', status: 'Pendente' },
  { id: '2', titulo: 'Entulho em via pública', status: 'Em análise' },
  { id: '3', titulo: 'Descarte irregular próximo a escola', status: 'Resolvido' },
];

export default function Denuncias() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Denúncias</Text>

      <FlatList
        data={denuncias}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.titulo}</Text>
            <Text style={styles.cardStatus}>{item.status}</Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.button} onPress={() => router.push('/noticias')}>
        <Text style={styles.buttonText}>Ir para notícias</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4FFF4',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 20,
    marginTop: 30,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  cardStatus: {
    color: '#666',
  },
  button: {
    backgroundColor: '#2E7D32',
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});