import { View, Text, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
  },
  fullName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  description: {
    marginVertical: 5,
  },
  language: {
    marginBottom: 5,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontWeight: 'bold',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginBottom: 10,
  },
});

const formatCount = (count) => {
  if (count < 1000) {
    return count.toString();
  }

  return `${(count / 1000).toFixed(1)}k`;
};

const RepositoryItem = ({ item }) => {
  return (
    <View testID="repositoryItem" style={styles.container}>
      <Image
        style={styles.avatar}
        source={{ uri: item.ownerAvatarUrl }}
      />

      <Text style={styles.fullName}>{item.fullName}</Text>

      <Text style={styles.description}>{item.description}</Text>

      <Text style={styles.language}>{item.language}</Text>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>
            {formatCount(item.stargazersCount)}
          </Text>
          <Text>Stars</Text>
        </View>

        <View style={styles.stat}>
          <Text style={styles.statValue}>
            {formatCount(item.forksCount)}
          </Text>
          <Text>Forks</Text>
        </View>

        <View style={styles.stat}>
          <Text style={styles.statValue}>{item.reviewCount}</Text>
          <Text>Reviews</Text>
        </View>

        <View style={styles.stat}>
          <Text style={styles.statValue}>{item.ratingAverage}</Text>
          <Text>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;