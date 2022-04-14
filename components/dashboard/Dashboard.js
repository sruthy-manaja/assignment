import React from "react";
import { useState, useEffect } from "react";
import config from "../../config.json";
import Allpost from "./AllPost";
import moment from "moment";

function Dashboard(props) {
  const [post, setPost] = useState("");
  let content = [];  let avgLengths; 
  useEffect(() => {
    register();
  }, []);
  props.onListPost(post); 

  function register(callback) {
    fetch(config.registrationEndpoint, {
      method: "POST",
      body: JSON.stringify(config.registrationPayload),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.resolve(null);
      })
      .then((result) => {
        if (result == null) {
          throw "Error: unable to register api token";
          return;
        }

        new Promise((resolve, reject) => {
          getPosts(
            config.postsEndpoint,
            result.data.sl_token,
            config.startingPage,
            config.startingPage + 1,
            [],
            resolve,
            reject
          );
        }).then((response) => {});
      })
      .catch((ex) => {
        console.log(ex);
      });
      
  }

  function getPosts(
    url,
    apiToken,
    currentPage,
    nextPage,
    posts,
    resolve,
    reject
  ) {
    fetch(url + "?sl_token=" + apiToken + "&page=" + nextPage)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return Promise.resolve([]);
      })
      .then((result) => {
        if (currentPage == result.data.page) {
          resolve(posts);
          return;
        }

        var obj = result.data;

        posts = posts.concat(result.data.posts); 
        setPost(<Allpost post={posts}></Allpost>);
        getPosts(
          url,
          apiToken,
          result.data.page,
          result.data.page + 1,
          posts,
          resolve,
          reject
        );
        getMonthlyData(posts)
      })
      .catch((ex) => {
        console.log(ex);
      });
      
  }


//   Dashboard calculation
  
function getMonthlyData(posts)
{ 
  
  let users = []; let totalPost = []; 

        posts.forEach((post) => {
            if (users.indexOf(post.from_id) == -1) {
                users.push(post.from_id)
                var postPerUser = posts.filter(function (pilot) {
                  return pilot.from_id === post.from_id;
                });
                var longestPost = postPerUser.sort(function (a,b){
                  return b.message.length - a.message.length; 
              });

              var averageChar = postPerUser.reduce((sum, post) => {
                return sum + post.message.length
            }, 0) / postPerUser.length

                 totalPost.push({"user" : post.from_name, "sum": postPerUser.length, 
                "longestPost" : longestPost[0].id, "AverageCharCount": averageChar });
                
            }
        }); 
        props.onAddPostTotal(totalPost); 
      avgLengths = config.months.map((month, index) => {
        const postsOfMonth = getPostsOfMonth(posts, index)
       let monthData =[];
        const shooters = postsOfMonth.reduce(
          (results, current) => ({
            ...results,
            [current.from_id]: {
              messagePosted: 1 + (results[current.from_id] ? results[current.from_id].messagePosted : 0),
              
            }
          }),
          {}
        );
        
        if (postsOfMonth.length > 0) {
          
            return {
                month: month,
                postsPerUser: postsOfMonth.length,
                data: JSON.stringify(shooters)
            }
        } 
       
    }).filter((row) => {
        return row != null
    })
    props.onAverageTotal(avgLengths);
}
function getPostsOfMonth(posts, month)
{ 
  var totalPostPerMonth = posts.filter((post) => { 
    return moment(post.created_time).month() == month
});  
totalPostPerMonth.forEach((post) => {
  let users =[];
  if (users.indexOf(post.from_id) == -1) {
    users.push(post.from_id)
    var postPerUser = posts.filter(function (pilot) {
      return pilot.from_id === post.from_id;
    });
  }
 

});
    return totalPostPerMonth
}

 
  
  


  return (
    <>
      <div>100 posts are displayed in paginated format</div>
      {/* <ul>
        {post}
      </ul> */}

    </>
  );
}

export default Dashboard;
