import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';

// comment: "asd"
// id: 3
// insertDt: "2021-10-14T04:29:17.674184"
// modifiedDt: "2021-10-14T04:29:17.674184"
// nickname: "iamsemyung@gmail.com"

const Comment = ({ id }) => {
  const comment = useSelector(
    (state) => state.posts.current.comments.find((c) => c.id === id),
    isEqual,
  );

  // const [isEditMode, setIsEditMode] = React.useState(false);
  console.log(comment);
  return <h1>hihihi</h1>;
};

Comment.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Comment;
