import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useMutation, useQuery } from '@apollo/client/react/index.js';
import { useNavigate } from 'react-router-native';

import { ME } from '../graphql/queries';
import { DELETE_REVIEW } from '../graphql/mutations';

import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },

  actions: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    gap: 10,
  },

  button: {
    flex: 1,
    backgroundColor: '#0366d6',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },

  deleteButton: {
    backgroundColor: '#d73a4a',
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { data, loading, error, refetch } = useQuery(ME, {
    variables: {
      includeReviews: true,
    },
  });

  const [deleteReview] = useMutation(DELETE_REVIEW);
  const navigate = useNavigate();

  const handleDelete = (reviewId) => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteReview({
              variables: {
                id: reviewId,
              },
            });

            await refetch();
          },
        },
      ]
    );
  };

  if (loading) {
    return <View />;
  }

  if (error) {
    console.error(error);
    return <View />;
  }

  const reviews =
    data?.me?.reviews?.edges?.map((edge) => edge.node) || [];

  return (
    <FlatList
      data={reviews}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <View>
          <ReviewItem review={item} />

          <View style={styles.actions}>
            <Pressable
              style={styles.button}
              onPress={() =>
                navigate(`/repositories/${item.repository.id}`)
              }
            >
              <Text style={styles.buttonText}>
                View repository
              </Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.deleteButton]}
              onPress={() => handleDelete(item.id)}
            >
              <Text style={styles.buttonText}>
                Delete
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    />
  );
};

export default MyReviews;