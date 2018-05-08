import React,{Component} from "react";
import ReactDOM,{render} from "react-dom";
import {connect} from "react-redux";
import {BrowserRouter,HashRouter,Link,Switch,Route} from "react-router-dom"; 
import { WingBlank, WhiteSpace, Flex,InputItem,Button,SearchBar,List,PullToRefresh} from 'antd-mobile';
import {loadFriends} from "../actions";


@connect(
    state=>{
        console.log(state);
        return {
            refreshing: state.refreshing,
            down: state.down,
            height: state.height,
            friends:state.friends,
        }
    }
)

export default class Friends extends Component{
    loadthisfriends=()=>{
        const {dispatch}=this.props;
        const  username=localStorage.getItem("username");
        dispatch(loadFriends(username));
    }
    gotonewfriends=()=>{
        const{history}=this.props;
        history.push("/newfriends");
    }

    componentWillMount(){
       this.loadthisfriends()
    }

    connectfriend=(toname)=>{
        const {history}=this.props;
      
        history.push("/chatplace/"+toname);
    }


    render(){
        const Item = List.Item;
        const Brief = Item.Brief;
        const{refreshing,down,height}=this.props;

        const FriendsList=()=>{
            const {friends}=this.props;
            if(friends[0]){
                return(
                    <div>
                        {    
                            
                            friends.map((item,idx)=>{
                                if(item.state){
                                    return(
                                        <Item 
                                        className="friendsItem"
                                        thumb={item.userimg}
                                        arrow="horizontal" multipleLine onClick={()=>{this.connectfriend(item.name)}} key={idx}>
                                              <p>{item.name}</p>
                                        </Item>
                                    )
                                }
                            })
                        }
                    </div>
                )
            }else{
                return(
                    <div>
                         <p>还没有好友，赶紧去添加吧</p>
                    </div>
                   
                )
            } 
        }
        
        return (
            <div>
                
                <div>
                <PullToRefresh
                        ref={el => this.ptr = el}
                        style={{
                        height,
                        overflow: 'auto',
                        }}
                        indicator={down ? {} : { deactivate: 'up' }}
                        direction={down ? 'down' : 'up'}
                        refreshing={refreshing}
                        onRefresh={() => {
                            this.loadthisfriends()
                        }}
                    >
                       <div>
                       <WhiteSpace></WhiteSpace>
                            <SearchBar placeholder="搜索" ref={ref => this.autoFocusInst = ref} />
                            <WhiteSpace></WhiteSpace>
                            <Item arrow="horizontal" multipleLine onClick={this.gotonewfriends}>
                            新的朋友
                            </Item>
                            <Item arrow="horizontal" multipleLine onClick={() => {}}>
                            创建聊天群
                            </Item>
                       </div>
                       <WhiteSpace style={{background:"#efeff4"}}></WhiteSpace>
                       <div>
                            <Item multipleLine arrow="down" style={{borderBottom:"1px solid #efeff4"}}>
                                我的好友
                            </Item>   
                        </div>
                            
                        <div>

                        <FriendsList></FriendsList>
                        </div>
                    </PullToRefresh>
                </div>
            </div>
        )
    }
}