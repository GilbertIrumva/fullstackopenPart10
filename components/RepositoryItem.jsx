import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    width: 120,
  },
  value: {
    flex: 1,
  },
});

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Full name:</Text>
        <Text style={styles.value}>{item.fullName}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Description:</Text>
        <Text style={styles.value}>{item.description}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Language:</Text>
        <Text style={styles.value}>{item.language}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Stars:</Text>
        <Text style={styles.value}>{item.stargazersCount}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Forks:</Text>
        <Text style={styles.value}>{item.forksCount}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Reviews:</Text>
        <Text style={styles.value}>{item.reviewCount}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Rating:</Text>
        <Text style={styles.value}>{item.ratingAverage}</Text>
      </View>
    </View>
  );
};

export default RepositoryItem;