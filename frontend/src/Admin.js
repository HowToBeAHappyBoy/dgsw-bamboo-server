import React, { Component } from 'react';
import AdminDocs from './AdminDocs';
import axios from 'axios';
import './main.css';



class Admin extends Component {
  state={};

  constructor(){
    super();
    this._getCount();
    this.state={
      id:0,
      docs:null
    };
    this._getDocs();
  }
  _getCount=async ()=>{
    const url="http://localhost:80/api/admin/count";
    return axios.get(url,{
      headers:{
        Authorization:sessionStorage.getItem('@#!!@!@##!@!@!#!@!')
      }})
    .then(res=>this.setState({
      count:res.data.count
    }))
    .catch(err=>err);
  }


  _getDocs=async ()=>{
    let docs=await this._callApi();
    if(docs.status!==200){
      return;
    }
    if(this.state.docs===null){
      this.setState({
        id:this.state.id+5,
        docs:docs.data.posted
      })
      return;
    }else{
      let pastDocs=this.state.docs;
      let newDocs=docs.data.posted;
      this.setState({
        id:this.state.id+5,
        docs:pastDocs.concat(newDocs)
      });
      return;
    }
  };

  _callApi=()=>{
    let url='http://localhost:80/api/admin/posted/'+this.state.id;
    return axios.get(url,{
      headers:{
        Authorization:sessionStorage.getItem('@#!!@!@##!@!@!#!@!')
      }
    })
    .then((response)=>{
      return response;
    })
    .catch(err=> console.log(err));
  };
  _renderDocs=()=>{
    const docs=this.state.docs.map(doc=>{
      return(
        <AdminDocs num={doc.idx} docs={doc.desc} date={doc.writeDate} key={doc.id}/>
        )
        return docs.reverse();
    });
    return docs;
  }
  clicked=()=>{
    sessionStorage.clear();
    window.location="http://dgswbamboo.oa.to";
  }

  render() {
    const {docs}=this.state;
    return (
      <div className="user" onScroll={this.listenScrollEvent}>
          <div className="btDiv">
            <button className="button" onClick={this.clicked}>로그아웃</button>
          </div>
          {console.log(this.state)}
          {docs?this._renderDocs():
            <div className="loading dot">
              <div></div>
              <div></div>
              <div></div>
            </div>}
            {!docs||this.state.id>=this.state.count?" ":
          <div className="btDiv">
            <button className="button" onClick={this._getDocs}>더보기</button>
          </div>}
      </div>
    );
  }
}

export default Admin;
