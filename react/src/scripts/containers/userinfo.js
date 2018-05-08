import React,{Component} from "react";
import ReactDOM,{render} from "react-dom";
import {connect} from "react-redux";
import {BrowserRouter,HashRouter,Link,Switch,Route} from "react-router-dom"; 
import { WingBlank, WhiteSpace, Flex,InputItem,Button,SearchBar,List } from 'antd-mobile';
import {loadUserinfo,insertFriend} from "../actions";

@connect(
    state=>{
        console.log(state);
        return {
            userinfo:state.userinfo

        }
    }
)

export default class Userinfo extends Component{
        componentWillMount(){
            const {match,dispatch}=this.props;
            console.log(this.props)
            var username=localStorage.getItem("username");
            var serchusername=match.params.username;
            dispatch(loadUserinfo(username,serchusername));
        }
        insertfriend=(friendusername)=>{
            const {dispatch}=this.props;
            var username=localStorage.getItem("username");
            var serchusername=friendusername;
            dispatch(insertFriend(username,friendusername));   
        }
        gotoback=()=>{
            const {history}=this.props;
            history.go(-1);
        }
        
        render(){
            const {userinfo}=this.props;
            const Serchfriends=()=>{
                const {userinfo}=this.props;
                console.log(userinfo);
                const Item=List.Item;
                if(userinfo.result){
                    return (
                    <div>
                        <div>
                            <Item
                                thumb={<i className="iconfont icon-zuojiantou"></i>}
                                onClick={()=>{this.gotoback()}}
                            >  
                                 <span>返回</span>
                            </Item>
                            
                        </div>
                    <div className="userinfobg">
                        <img src={userinfo.result.userimg} alt=""/>
                    </div>
                    <div className="userinfoimg">
                    
                        <img src={userinfo.result.userimg} alt=""/>
                      
                        <span>{userinfo.result.name}</span>
                    
                    </div>

                    <div>
                    <Buttonstate></Buttonstate>
                    </div>
                    </div>
                    )
                }else{
                    return (
                        <div>

                        </div>
                    )
                }
                
            }
            const Buttonstate=()=>{
                const {userinfo}=this.props;
                const Item=List.Item;
                <Item>
                </Item>
                if(userinfo.code==0){
                    return(
                        
                        <Item className="buttonstate">
                        <Button type="primary" onClick={()=>{this.insertfriend(userinfo.result.username)}}>加为好友</Button>
                        </Item>
                    ) 
                }
                else if(userinfo.code==1){
                    return(
                        <Item className="buttonstate">
                        <Button disabled={true}>已是你的好友</Button>
                        </Item>
                    ) 
                }
                else if(userinfo.code==2){
                    return (
                        <Item className="buttonstate">
                            <Button>个性名片</Button>
                            <Button type="primary">编辑资料</Button>
                        </Item> 
                    )    
                }else{
                    return(
                        <div>

                        </div>
                    )
                }
            }
            return(
                <div>
                   <Serchfriends></Serchfriends>
                </div>
            )
        }

}