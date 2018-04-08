import React, { Component } from 'react';
import './Login.css';
import Admin from './Admin';
import axios from 'axios';

class Login extends Component{
  constructor(props){
    super(props);
    this.state={id:'',pw:''};
    this.idChange=this.idChange.bind(this);
    this.pwChange=this.pwChange.bind(this);
  }
  idChange(e){
    this.setState({id: e.target.value});
  }
  pwChange(e){
    this.setState({id:this.state.id,pw:e.target.value});
  }
  _login=()=>{
    let url='http://ec2-13-125-167-78.ap-northeast-2.compute.amazonaws.com/api/cert/signin';
    return axios.post(url,{id:this.state.id,pw:this.state.pw})
    .then((res)=>{
      if(res.status===200){
        sessionStorage.setItem("@#!!@!@##!@!@!#!@!",res.data.token);
        sessionStorage.setItem("@#@#@#",res.data.admin);
        window.location="http://dgswbamboo.oa.to";
      }else if(res.status!==200){
        alert('관리자 하고 싶어요?');
      }
    })
    .catch(err=>alert('관리자 하고 싶어요?'));
  }
    render(){
        return(
          <div className="login">
            {sessionStorage.getItem('@#!!@!@##!@!@!#!@!')?<Admin/>:
          <div className="login-page">
            <div className="form" onEnter={this._login}>
                  <input className="vla" type="text" value={this.state.id} placeholder="id" onChange={this.idChange}/>
                <input className="vla" type="password" value={this.state.pw} placeholder="password" onChange={this.pwChange}/>
              <button value="LOGIN" type="submit" onClick={this._login}>LOGIN</button>
          </div>
        </div>
        } 
        </div>
      );
    }
}

export default Login;