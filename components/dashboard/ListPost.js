import React, {useState} from 'react'
import Dashboard from './Dashboard'

function ListPost() {
    const [allPost, setAllPost] = useState()
    const listPostHandler =(post) =>{  console.log(post); 
        setAllPost(post);
    }
  
  return (
    <div>
        <Dashboard onListPost={listPostHandler}/>
        {allPost}
    </div>
  )
}

export default ListPost