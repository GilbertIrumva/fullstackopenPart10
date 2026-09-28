import { useQuery } from '@apollo/client/react/index.js';

import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id) => {
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: {
      repositoryId: id,
    },
    fetchPolicy: 'cache-and-network',
  });

  return {
    repository: data?.repository,
    loading,
    error,
  };
};

export default useRepository;