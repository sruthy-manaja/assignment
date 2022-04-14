import React, { useState, useEffect }  from 'react'
import Card from '../ui/Card'
import Pagination from './Pagination';
import PostItem from './PostItem';
import config from "../../config.json";
import moment from "moment";

function AllPost(props) {
  const [posts, setPosts] = useState([props.post]);
  const [loading, setLoading] = useState([false]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(100);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = props.post.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);


  


  return (
    <div>
      <Pagination
          postsPerPage={postsPerPage}
          totalPosts={props.post.length}
          paginate={paginate}
        />
        
      <PostItem posts={currentPosts}  />

    </div>
  )
}

export default AllPost