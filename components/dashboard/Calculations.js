import React, {useState} from 'react'
import Dashboard from './Dashboard'
import classes from './Dashboard.module.css';

function Caculations() {
  const [postPerUser, setPostPerUser] = useState([]);
  const [monthData, setMonthData] = useState([])
  const listPost = (posts) => {}
  const  postTotal = (totalArray) => {
    setPostPerUser(totalArray)
  }; 
  const averageHandler = (averageTotal) => {
    setMonthData(averageTotal)
  }

  return (
    <div>
        <Dashboard onAddPostTotal = {postTotal} onListPost={listPost} onAverageTotal={averageHandler}/>
        <div className={classes.calculation}>
        <h4>Total Post per user</h4>
        <ul className={classes.total_post}>
          <li className={classes.head_item}>
            <span>User Name</span>
            <span>Total post</span>
            <span>Longest post</span>
            <span>Average Character Count</span>
          </li>
         
        {postPerUser.map((user, idx) => ( 
    <li key={idx}>
      <span>{user.user}</span>
      <span>{user.sum}</span>
      <span>{user.longestPost}</span>
      <span>{user.AverageCharCount}</span>
    </li>
  ))}
   </ul>
        </div>
        
  <div className={classes.calculation}>
  <h4>Months Data</h4>
  <ul className={classes.total_post}>
    <li className={classes.head_item}>
      <span>Month</span>
      <span>Total Post Posted</span>
      <span>Data</span>
    </li>
  {monthData.map((item, idx) => ( 
    <li key={idx}>
      <span>{item.month}</span>
      <span>{item.postsPerUser}</span>
      <span>{item.data.replace(/[{}]/g, '').replace(/[,]/g, "\n")}</span>
    </li>
  ))}

  </ul>
  </div>

    </div>
  )
}

export default Caculations