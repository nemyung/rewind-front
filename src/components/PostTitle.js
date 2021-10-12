import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { history } from '../features/configureStore';

const PostTitle = ({ id = '', idx = '' }) => {
  const title = useSelector((state) => state.posts.byId);
  const toDay = title[id].insertDt.split('T')[0];

  const movePostDetail = () => {
    history.push(`/detail/${id}`);
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <p>{idx}</p>
        </div>
        {/* eslint-disable */}
        {/* 솔직히 온클릭 잡는건 과하다 생각합니다. */}
        <div onClick = {movePostDetail}>
          <p>{title[id].title}</p>
        </div>
        <div>
          <p>{title[id].nickname}</p>
        </div>
        <div>
          <p>{toDay}</p>
        </div>
      </div>
    </>
  );
};

PostTitle.propTypes = {
  id: PropTypes.string.isRequired,
  idx: PropTypes.number.isRequired,
};

export default PostTitle;
