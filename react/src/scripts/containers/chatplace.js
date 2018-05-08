import React,{Component} from "react";
import ReactDOM,{render} from "react-dom";
import {connect} from "react-redux";
import {BrowserRouter,HashRouter,Link,Switch,Route} from "react-router-dom"; 
import { WingBlank, WhiteSpace, Flex,InputItem,Button,SearchBar,List,PullToRefresh} from 'antd-mobile';
import {makeSurefriend,loadFriendMeg} from "../actions";
const socket = require('socket.io-client')('http://47.98.148.13:3000');
@connect(
    state=>{
        console.log(state);
        return {
            loadmeglist:state.loadmeglist,
        }
    }
)

export default class Chatplace extends Component{
    componentWillMount(){
        const {dispatch}=this.props;
        const username=localStorage.getItem("username");
        const friendusername=this.props.match.params.toname;
        socket.emit("clearmiss",{username,friendusername});
        dispatch(makeSurefriend(username,friendusername));
        dispatch(loadFriendMeg(username,friendusername));
    }

    componentDidMount(){
        const username=localStorage.getItem("username");
        var that=this;
      
        
        socket.emit('login',username);

        socket.on('tomine',(data)=>{
           if(that.refs.chatroom){
            that.refs.chatroom.innerHTML+=`
            <div class="clearfix">
                    <div class="megleft">
                    <img src="http://47.98.148.13/reactimgs/deuserimg.jpg" alt=""/>
                    </div>
                        <div class="megleftcontent">
                          ${data}
                    </div>
            </div>
            `
           }
        })
    }
    
    componentDidUpdate(){
        var exp=document.getElementById("exp");
        exp.scrollIntoView(false);
    }
   
  
    sendMeg=()=>{
        var meg=this.refs.tofriendmeg.value;
        const username=localStorage.getItem("username");
        console.log(meg);
        var toname=this.props.match.params.toname;
        console.log(toname);
        this.refs.chatroom.innerHTML+=`
        <div class="clearfix">         
        <div class="megright">
            <img src="http://47.98.148.13/reactimgs/deuserimg.jpg" alt=""/>   
        </div>
        <div class="megrightcontent">
           ${meg}
        </div>
        </div>
        `;
        console.log(window);
        var exp=document.getElementById("exp");
        exp.scrollIntoView(false);
        this.refs.tofriendmeg.value="";
        socket.emit('tofriend',{username,toname,meg});
        socket.emit('tofriendnew',{username,toname});
        
        // socket.emit('tomissmeg',{username,toname});
    }
    gotoback=()=>{
        const {history}=this.props;
        const {dispatch}=this.props;
        const username=localStorage.getItem("username");
        var friendusername=this.props.match.params.toname;
        dispatch(makeSurefriend(username,friendusername));
        socket.emit("clearmiss",{username,friendusername});
        history.go(-1);
    }
    render(){
        const Item = List.Item;
        const Brief = Item.Brief;
        const {match}=this.props;
        const toname=match.params.toname;

        const LoadFriendmeg=()=>{
            const {loadmeglist}=this.props;
            const username=localStorage.getItem("username");
            if(loadmeglist){
               
                    return(
                        
                        <div>
                            {
                                loadmeglist.map((item,idx)=>{
                                    if(item.username==username){
                                        return(
                                            <div className="clearfix" key={idx}>         
                                                <div className="megright">
                                                    <img src="http://47.98.148.13/reactimgs/deuserimg.jpg" alt=""/>   
                                                </div>
                                                <div className="megrightcontent">
                                                    {item.meg}
                                                </div>
                                            </div>
                                        )
                                    }else{
                                        return(
                                            <div className="clearfix" key={idx}>
                                                    <div className="megleft">
                                                    <img src="http://47.98.148.13/reactimgs/deuserimg.jpg" alt=""/>
                                                    </div>
                                                        <div className="megleftcontent">
                                                       {item.meg}
                                                    </div>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    )
                   
                
            }else{
                return(
                    <div>
                    </div>
                )
            }
           
        }
        return(
            <div className="chatingroom" id="thischatdiv">
                <div>

                    <div>
                    <Item
                     className="headlead"
                    >
                        <i className="iconfont icon-zuojiantou" onClick={()=>{this.gotoback()}}></i>
                        <span>{toname}</span>
                    </Item>
                    </div>
                    <div className="headheight">

                    </div>

                    
                </div>
                <div ref="chatroom">
                   
                <LoadFriendmeg></LoadFriendmeg>
                    
                </div>
                    <div className="megbuttoncontent">
                    <div className="megbutton">
                        <input type="text" ref="tofriendmeg"/>
                        <Button type="primary" onClick={()=>{this.sendMeg()}}>发送</Button>
                    </div>
                    </div>

                    <div className="chatheight">

                    </div>
                    
                   
                    
               
            </div>
        )
    }
}