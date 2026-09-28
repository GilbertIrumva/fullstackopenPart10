import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';

import { useParams } from 'react-router-native';

import RepositoryItem from './RepositoryItem';

import useRepository from '../hooks/useRepository';

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },

  button: {
    backgroundColor: '#0366d6',
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

const Repository = () => {
  const { id } = useParams();

  const { repository, loading, error } = useRepository(id);

  if (loading) {
    return <View />;
  }

  if (error) {
    console.error(error);
    return <View />;
  }

  if (!repository) {
    return <View />;
  }

  return (
    <View>
      <RepositoryItem item={repository} />

      <View style={styles.container}>
        <Pressable
          style={styles.button}
          onPress={() => Linking.openURL(repository.url)}
        >
          <Text style={styles.buttonText}>Open in GitHub</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Repository;