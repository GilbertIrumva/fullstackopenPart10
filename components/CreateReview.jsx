import { useMutation } from '@apollo/client/react/index.js';

import { useNavigate } from 'react-router-native';

import { CREATE_REVIEW } from '../graphql/mutations';

import CreateReviewContainer from './CreateReviewContainer';

const CreateReview = () => {
  const [createReview] = useMutation(CREATE_REVIEW);

  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;

    const { data } = await createReview({
      variables: {
        review: {
          ownerName,
          repositoryName,
          rating: Number(rating),
          text,
        },
      },
    });

    navigate(`/repositories/${data.createReview.repositoryId}`);
  };

  return <CreateReviewContainer onSubmit={onSubmit} />;
};

export default CreateReview;