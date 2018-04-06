import React from 'react';
import './Head.css';
import {Link} from 'react-router-dom'
function Head(){
  return(
    <div>
      <div className="containar">

        <h2><Link to="/">대소고 대나무숲</Link></h2>
        <ul>
            <a><li><Link to="/admin">관리자</Link></li></a>
            <a><li><Link to="/write">제보하기</Link></li></a>
        </ul>
      </div>
    </div>
)
}

export default Head;
