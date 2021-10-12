import React from 'react';

const CommentForm = () => {
  const [comment, setComment] = React.useState('');

  const handleCommentSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button type="button" onClick={handleCommentSubmit} disabled={!comment}>
        댓글 달기
      </button>
    </>
  );
};

export default CommentForm;
