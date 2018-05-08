import React,{Component} from "react";
import ReactDOM,{render} from "react-dom";
import {connect} from "react-redux";
import {BrowserRouter,HashRouter,Link,Switch,Route} from "react-router-dom"; 
import { WingBlank, WhiteSpace, Flex,InputItem,Button} from 'antd-mobile';


import {login} from "../actions";
@connect(
    state=>{
        console.log(state);
        return {
            meg:state.meg,
            data:state.data
        }
    }
)


export default class Login extends Component{
     getlogin=()=>{
        console.log(this);
        const {dispatch,history}=this.props;
        var username=this.refs.username.state.value;
        var userpwd=this.refs.userpwd.state.value;
        console.log(username);
        dispatch(login(dispatch,history,username,userpwd));
     }
     getcreate=()=>{
        const {dispatch,history}=this.props;
        history.push("/create");
     }

    render(){
         
         const {data}=this.props;
        return (
                <div>
                <img  className="loginbackground" src="http://47.98.148.13/reactimgs/loginbg.jpg" alt=""/>
                <div className="logincontent">
                <WingBlank>

               
                <InputItem
                type="text"
                ref="username"
                placeholder="请输入手机号"
                className="loginInput"
            
                >

                </InputItem>

                <InputItem
                type="text"
                ref="userpwd"
                placeholder="请输入密码"
                className="loginInput"
                >

                </InputItem>
                <WhiteSpace></WhiteSpace>

                <Button type="primary" onClick={this.getlogin}>登录</Button>
                <WhiteSpace></WhiteSpace>
                <Button type="primary" onClick={this.getcreate}>注册</Button>
                </WingBlank>
                </div>

                    
                    
                </div>
          
        )
    }
}