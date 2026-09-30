import {
  FlatList,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useParams } from 'react-router-native';

import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';

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

  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryHeader = ({ repository }) => {
  return (
    <View>
      <RepositoryItem item={repository} />

      <View style={styles.container}>
        <Pressable
          style={styles.button}
          onPress={() => Linking.openURL(repository.url)}
        >
          <Text style={styles.buttonText}>
            Open in GitHub
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const Repository = () => {
  const { id } = useParams();

  const {
    repository,
    loading,
    error,
    fetchMore,
  } = useRepository(id);

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

  const reviews =
    repository.reviews.edges.map((edge) => edge.node);

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <ReviewItem review={item} />
      )}
      keyExtractor={({ id: reviewId }) => reviewId}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => (
        <RepositoryHeader repository={repository} />
      )}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default Repository;