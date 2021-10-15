import React, { useState } from 'react';
import axios from 'axios';

import '../styles/Paging.css';
import Pagination from 'react-js-pagination';

import { useDispatch, useSelector } from 'react-redux';
import { loadPosts } from '../features/posts/actions';

const baseURL = process.env.REACT_APP_REMOTE_SERVER_URI;

const Paging = () => {
  const [selectPage, setSelectPage] = useState(1);

  const dispatch = useDispatch();

  const totalPage = useSelector((state) => state.posts.totalPost);
  const postList = useSelector((state) => state.posts.byId);
  const currentCategory = useSelector((state) => state.posts.category);

  console.log(postList);

  const handlePageChange = async (page) => {
    setSelectPage(page);
    const currentPage = page - 1;
    if (currentPage === 0) {
      return;
    }

    const endpoint = `${baseURL}/posts${
      currentCategory === 'ALL' ? '' : `/${currentCategory}`
    }/${currentPage}`;

    const {
      data: { posts },
    } = await axios.get(endpoint);
    console.log(posts);

    const { content, totalElements } = posts;

    dispatch(loadPosts(content, totalElements));
  };
  return (
    <Pagination
      activePage={selectPage}
      itemsCountPerPage={12}
      totalItemsCount={Number(totalPage)}
      pageRangeDisplayed={5}
      prevPageText="‹"
      nextPageText="›"
      onChange={handlePageChange}
    />
  );
};
export default Paging;
