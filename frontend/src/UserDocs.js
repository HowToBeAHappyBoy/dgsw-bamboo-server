import React from 'react';
import './Docs.css';

class UserDocs extends React.Component{
  _goFb=()=>{
    const url="https://www.facebook.com/hashtag/"+"대소고_"+this.props.num+"번째_이야기";
    window.open(url,"_blank");
  }

  render(){
  return(
    <div className="mainDiv">
    <div className="main">
    <p className="title">{this.props.num}번째 이야기</p>
        <div className="post">
          <p className="docs">{this.props.docs}</p>
          <p className="date">{this.props.writeDate} 에 제보됨</p>
          <p className="date">{this.props.allowDate} 에 승인됨</p>
        </div>
      <div className="bt">
        <button className="fb" onClick={this._goFb}>facebook</button>
      </div>
    </div>
    </div>
  )
}
}


export default UserDocs;
