import { useQuery } from '@apollo/client/react/index.js';

import { GET_REPOSITORY } from '../graphql/queries';

const FIRST = 4;

const useRepository = (id) => {
  const {
    data,
    loading,
    error,
    fetchMore,
  } = useQuery(GET_REPOSITORY, {
    variables: {
      repositoryId: id,
      first: FIRST,
    },
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading &&
      data?.repository?.reviews?.pageInfo?.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after:
          data.repository.reviews.pageInfo.endCursor,
      },
    });
  };

  return {
    repository: data?.repository,
    loading,
    error,
    fetchMore: handleFetchMore,
  };
};

export default useRepository;