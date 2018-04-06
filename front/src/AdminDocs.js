import React from 'react';
import './admindoc.css';
import axios from 'axios';


class adminDocs extends React.Component{
  constructor(props){
    super(props);

  }
  _allow=()=>{
    const url='http://ec2-13-125-167-78.ap-northeast-2.compute.amazonaws.com/api/admin/allow';
    return axios.post(url,
      {
        id:this.props.num,
        admin:sessionStorage.getItem('@#@#@#')
      },
      {
      headers:{
        Authorization:sessionStorage.getItem('@#!!@!@##!@!@!#!@!')
      }
    })
    .then((response)=>{
      if(response.status!==232){
        alert('승인 완료');
        window.location="http://dgswbamboo.oa.to";
      }else if(response.status===232){
        alert('다른 관리자랑 겹쳐보리기');
        window.location="http://dgswbamboo.oa.to";
      }else{
        alert('서지녁한테 문의하세요 오류남');
        window.location="http://dgswbamboo.oa.to";
      }
    })
    .catch(error=>error);
  }
  _reject=()=>{
    const url='http://ec2-13-125-167-78.ap-northeast-2.compute.amazonaws.com/api/admin/reject';
    return axios.post(url,
      {
        id:this.props.num,
        admin:sessionStorage.getItem('@#@#@#')
      },
      {
      headers:{
        Authorization:sessionStorage.getItem('@#!!@!@##!@!@!#!@!')
      }
    })
    .then(res=>{
      if(res.status!==232){
        alert('거부 완료');
        window.location="http://dgswbamboo.oa.to";
      }else if(res.status===232){
        alert('다른 관리자랑 겹쳐보리기');
        window.location="http://dgswbamboo.oa.to";
      }else{
        alert('서지녁한테 문의하세요 오류남');
        window.location="http://dgswbamboo.oa.to";
      }
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
