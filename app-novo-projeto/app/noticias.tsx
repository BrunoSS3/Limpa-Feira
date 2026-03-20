import { View, Text, StyleSheet, FlatList } from 'react-native';

const noticias = [
  { id: '1', titulo: 'Mutirão de limpeza é realizado em bairro da cidade' },
  { id: '2', titulo: 'População é orientada sobre descarte correto de resíduos' },
  { id: '3', titulo: 'Projeto ambiental busca reduzir pontos críticos de lixo' },
];

export default function Noticias() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notícias</Text>

      <FlatList
        data={noticias}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.titulo}</Text>
          </View>
        )}
      />
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
    fontWeight: '600',
  },
});