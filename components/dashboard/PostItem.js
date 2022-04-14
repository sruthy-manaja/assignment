import React from "react";
import Card from "../ui/Card";
import classes from './Dashboard.module.css';

const PostItem = ({ posts }) => {

  return (
    <ul className={classes.main}>
      {posts.map(post => (
        <li key={post.id} className="list-group-item">
          <Card>
              <p className={classes.message}>{post.message}</p>
              <p className={classes.author}>Author: {post.from_name}</p>
              <span className={classes.date}>Created Date : {new Date(post.created_time).toLocaleDateString("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric"
})}</span>
          </Card>
        </li>
      ))}
    </ul>
  );
};

export default PostItem;