import React,{Component} from "react";
import ReactDOM,{render} from "react-dom";
import {connect} from "react-redux";
import {BrowserRouter,HashRouter,Link,Switch,Route} from "react-router-dom"; 
import { WingBlank, WhiteSpace, Flex,InputItem,Button,SearchBar,List,PullToRefresh} from 'antd-mobile';
import {changeFriendState,loadFriends} from "../actions";
@connect(
    state=>{
        console.log(state);
        return {
            unfriends:state.unfriends
        }
    }
)
export default class Newfriends extends Component{
    changefriendstate=(friendusername)=>{
        console.log(friendusername)
        const {dispatch}=this.props;
        const username=localStorage.getItem("username");
        dispatch(changeFriendState(username,friendusername));
        var that=this;
        setTimeout(function(){
            dispatch(loadFriends(username));
        },300)
        
    }
    gotoback=()=>{
        const {history}=this.props;
        history.go(-1);
    }
    gotomakefriends=()=>{
        const {history}=this.props;
        history.push("/makefriend")
    }
    everyunfriend=(item)=>{
        if(!item.state){
            return(
                <WingBlank>
                    <Flex className="newfriendsitem">
            <Flex.Item>
            <img src={item.userimg} alt=""/>
            </Flex.Item>
            <Flex.Item>
            <p>{item.name}</p>
            </Flex.Item>
            <Flex.Item>
            <Button type="primary" size="small" onClick={()=>{this.changefriendstate(item.username)}}>同意</Button>
            </Flex.Item>
            </Flex>
                </WingBlank>        
            
            )
        }else{
            return(
                <WingBlank>
                    <Flex className="newfriendsitem">
            <Flex.Item>
            <img src={item.userimg} alt=""/>
            </Flex.Item>
            <Flex.Item>
            <p>{item.name}</p>
            </Flex.Item>
            <Flex.Item>
            <Button onClick={()=>{}} disabled={true} type="primary" size="small">已同意</Button>
            </Flex.Item>
            </Flex>
                </WingBlank>
            
            )
        }
        
        
    }
    render(){
        const NewFriends=()=>{
            const {unfriends}=this.props;
            console.log(unfriends)
            if(unfriends[0]){
                return(
                    <div>
                        {
                            unfriends.map((item,idx)=>(
                                <div key={idx}>
                                    {
                                        this.everyunfriend(item)
                                    }
                                    
                                </div>
                            ))
                        }
                    </div>
                )
            }else{
                return(
                    <div>
                        <p>还有没好友请求</p>
                    </div>
                )
            }
        }


        return(
            <div>
                 <Flex className="headlead">
                    <Flex.Item
                       
                    >
                        <i className="iconfont icon-zuojiantou" onClick={()=>{this.gotoback()}}></i>
                        <span>联系人</span>
                       
                    </Flex.Item>
                    <Flex.Item
                       
                    >
                       <span>新朋友</span>
                       
                    </Flex.Item>
                    <Flex.Item>
                        <span onClick={()=>{this.gotomakefriends()}}>添加</span>
                    </Flex.Item>
                    </Flex>
                    <div className="headheight">

                    </div>
                 <NewFriends></NewFriends>
            </div>
           
        )
       

    }
}