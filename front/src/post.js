import React, { Component } from 'react';
import './post.css';
import axios from 'axios'

class post extends Component{
  constructor(props){
        super(props);
        this.state = {value : ''};

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e){
        if(this.state.value===''){
          alert('좀 아니다 야');
          e.preventDefault();
        }else{
        axios.post('http://ec2-13-125-167-78.ap-northeast-2.compute.amazonaws.com/api/user/post',{desc:this.state.value})
        .then(response=>{
          if(response.status==201){
            alert('제보 성공\n제보된 글은 관리자의 승인 후 게시됩니다');
            window.location="http://dgswbamboo.oa.to";
            e.preventDefault();
          }else{
            alert('모야 외않되');
            e.preventDefault();
          }
          return response;
          })
        .catch(response=>{console.log(response);});
        e.preventDefault();
        }
    }

    handleChange(e){
        this.setState({value: e.target.value});
    }

    render(){
        return (
          <div className="main2">
            <p className="title2">제보하기</p>
            <form onSubmit={this.handleSubmit}>
                    <textarea placeholder="하고 싶은 말을 적어주세요" className="nore" value={this.state.value} onChange={this.handleChange} />
              <div className="sub">
                <input className="subBt" type="submit" value="확인"/>
              </div>
              </form>
          </div>
        );
    }
}


export default post;
