import { useQuery } from '@apollo/client/react/index.js';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { data, loading, error } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  const repositories =
    data?.repositories?.edges?.map((edge) => edge.node) || [];

  return {
    repositories,
    loading,
    error,
  };
};

export default useRepositories;