import React,{Component} from "react";
import ReactDOM,{render} from "react-dom";
import {connect} from "react-redux";
import {BrowserRouter,HashRouter,Link,Switch,Route} from "react-router-dom"; 
import { WingBlank, WhiteSpace, Flex,InputItem,Button,List} from 'antd-mobile';
import {create} from "../actions";
@connect(
    state=>{
        console.log(state);
        return {
            meg:state.meg,
            data:state.data
        }
    }
)
export default class Create extends Component{
    getCreate=()=>{
        console.log(this);
        const {dispatch,history}=this.props;
        var username=this.refs.username.state.value;
        var userpwd=this.refs.userpwd.state.value;
        console.log(username);
        dispatch(create(dispatch,history,username,userpwd));
     }
     goback=()=>{
         const{history}=this.props;
         history.go(-1);
     }

    render(){
         
         const {data}=this.props;
         const Item=List.Item;
        return (
                <div>
                    <img  className="loginbackground" src="http://47.98.148.13/reactimgs/createbg.jpg" alt=""/>
                    <Item
                        thumb={<i className="iconfont icon-zuojiantou" style={{color:"#333"}}></i>}
                        onClick={this.goback}
                    >
                        <span>返回</span>
                    </Item>
            
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
                       
                       <Button type="primary" onClick={this.getCreate}>注册</Button>
                       </WingBlank>
                       
                    </div>
                    
                </div>
          
        )
    }
}