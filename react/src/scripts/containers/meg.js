import React,{Component} from "react";
import ReactDOM,{render} from "react-dom";
import {connect} from "react-redux";
import {BrowserRouter,HashRouter,Link,Switch,Route} from "react-router-dom"; 
import{loadChatlist} from "../actions";
import { WingBlank, WhiteSpace, Flex,InputItem,Button,SearchBar,List } from 'antd-mobile';
const socket = require('socket.io-client')('http://47.98.148.13:3000');

@connect(
    state=>{
        console.log(state);
        return {
            chatlist:state.chatlist,
        }
    }
)
export default class Meg extends Component{
    componentWillMount(){
        const {dispatch}=this.props;
        const username=localStorage.getItem("username");
        // dispatch(LogintoChat(username));
    }
    componentDidMount(){
        const username=localStorage.getItem("username");
        socket.emit('login',username);
        const Item=List.Item;
        const {dispatch}=this.props;
        var that=this;
        socket.on('relogin',(data)=>{
           
        });
        socket.on('allpeople',(data)=>{
            console.log(data);
        });

        socket.on("tomine",(data)=>{

            this.loadchatlist();
        })

        // socket.on('missmeg',(data)=>{
        //     console.log(data);
        //     var id=data.username;
        //     console.log(data.username);
        //     var missMeg=document.getElementById(id);
        //     missMeg.style.display="block";
        //     missMeg.innerHTML=data.meg;
        //     that.loadchatlist();
        // })
        this.loadchatlist();
    }
   loadchatlist=()=>{
        const {dispatch}=this.props;
        var username=localStorage.getItem("username");
        dispatch(loadChatlist(username));
   }
   gotochat=(username)=>{
    //    socket.emit("clearmiss","hi");
       const {history}=this.props;
       history.push("/chatplace/"+username);
   }
    render(){
        const Item=List.Item;
        const Chatlist=()=>{
            const {chatlist}=this.props;
            const Item=List.Item;
            if(chatlist){
                return (
                    <div className="megforItems">
                        {
                            chatlist.map((item,idx)=>(
                                <div key={idx}>
                                    <WhiteSpace></WhiteSpace>
                                    <Item 
                                
                                thumb={item.userimg}
                                onClick={()=>{this.gotochat(item.username)}} className="clearfix">
                                    <p>
                                        {item.username} 
                                        
                                        {/* <span className="megnums" id={item.username}></span> */}
                                    </p> 
                                </Item>
                                    <WhiteSpace></WhiteSpace>
                                </div>  
                                ))
                        }
                        
                    
                    </div>

                )
      
            }else{
             return(
                 <div>
                    
                    <Item onClick={()=>{}}>
                        <p>
                            暂时无新消息，去和朋友聊天吧
                        </p> 
                    </Item>
                </div>
             )
            }
        }


        return (
            <div>
                <div>
                    <Item
                    className="system"
                    thumb="http://47.98.148.13/reactimgs/deuserimg.jpg"
                    >
                        <p>服务号</p>
                        <p>欢迎来到QQ</p>
                    </Item>
                </div>
                <Chatlist></Chatlist>
            </div>
        )
    }
}