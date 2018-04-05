import React from 'react';
import './admindoc.css';
import axios from 'axios';

class adminDocs extends React.Component{
  constructor(props){
    super(props);

  }
  _allow=()=>{
    const url='http://localhost:80/api/admin/allow/'+this.props.num;
    return axios.get(url,{
      headers:{
        Authorization:sessionStorage.getItem('@#!!@!@##!@!@!#!@!')
      }
    })
    .then((response)=>{
      console.log(response);
      window.location.reload();
    })
    .catch(error=>error);
  }
  _reject=()=>{
    const url='http://localhost:80/api/admin/allow';
    return axios.patch(url,{id:this.props.num},{
      headers:{
        Authorization:sessionStorage.getItem('@#!!@!@##!@!@!#!@!')
      }
    })
    .then(res=>{
      console.log(res);
      window.location.reload();
    })
    .catch(err=>err);
  }

  render(){
  return(
    <div className="mainDiv">
    <div className="main">
        <div className="post">
          <p className="docs">{this.props.docs}</p>
          <p className="date">{this.props.date} 에 제보됨</p>
        </div>
      <div className="bt">
        <button className="allow" onClick={this._allow}>승인</button>
      </div>
      <div>
        <button className="reject" onClick={this._reject}>거부</button>
      </div>
    </div>
    </div>
  )
}
}


export default adminDocs;
