import React, { Component } from 'react';
import './App.css';
import UserDocs from './UserDocs';
import axios from 'axios';
import './button.css'



class User extends Component {

  constructor(){
    super();
    this._getCount();
    this.state={
      id:0,
      docs:null
    }
    this._getDocs();
  }

  _getCount=async ()=>{
    const url="http://localhost:80/api/user/count";
    return axios.get(url)
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
        docs:docs.data.posted.reverse()
      })
      return;
    }else{
      let pastDocs=this.state.docs;
      let newDocs=docs.data.posted.reverse();
      this.setState({
        id:this.state.id+5,
        docs:newDocs.concat(pastDocs)
      });
      return;
    }
  };

  _callApi=()=>{
    let url='http://localhost:80/api/user/posted/'+this.state.id;
    return axios.get(url,{mode:'no-cors'})
    .then((response)=>{
      return response;
    })
    .catch(err=> console.log(err));
  };
  _renderDocs=()=>{
    const docs=this.state.docs.map(doc=>{
      return(
        <UserDocs num={doc.idx} docs={doc.desc} writeDate={doc.writeDate} allowDate={doc.allowDate} key={doc.id}/>
        )
    });
    return docs.reverse();
  }
  clicked=()=>{
    this._getDocs();
  }

  render() {
    const {docs}=this.state;
    return (
      <div className="user" onScroll={this.listenScrollEvent}>
          {docs?this._renderDocs():
            <div className="loading dot">
              <div></div>
              <div></div>
              <div></div>
            </div>}
          {!docs||this.state.id>=this.state.count?" ":
          <div className="btDiv">
            <button className="button" onClick={this.clicked}>더보기</button>
          </div>}
      </div>
      );
  }
}

export default User;
