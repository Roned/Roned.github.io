import React,{Component} from "react";
import ReactDOM,{render} from "react-dom";
import {connect} from "react-redux";
import {BrowserRouter,HashRouter,Link,Switch,Route} from "react-router-dom"; 
import { WingBlank, WhiteSpace, Flex,InputItem,Button,SearchBar,List } from 'antd-mobile';
import {serchUsername} from "../actions";
@connect(
    state=>{
        console.log(state);
        return {
            meg:state.meg,
            serchlist:state.serchlist,

        }
    }
)


export default class MakeFriend extends Component{
   
    componentDidMount(){
        this.refs.nextcomment.style.display="block";
        this.refs.serchcontent.style.display="none";
    }

    gotoback=()=>{
        const {history}=this.props;
        this.refs.serchcontent.style.display="none";
        history.go(-1);
        
    }
    getSerchName=()=>{
        var username=this.refs.serchusername.value;
        const {dispatch}=this.props;
       
        if(username){
            this.refs.nextcomment.style.display="none";
            console.log(this)
            this.refs.serchcontent.style.display="block";
            dispatch(serchUsername(username))
        }else{
            this.refs.nextcomment.style.display="block";
            this.refs.serchcontent.style.display="none";
        }
       
    }
    gotouserinfo=(username)=>{
        const {history}=this.props;
        this.refs.serchcontent.style.display="none";
        history.push("/userinfo/"+username);
    }
    render(){
        const Item = List.Item;
        const Brief = Item.Brief;
        const Serch=()=>{
            const itm=this.props.serchlist;
            if(itm.code==0){
              return(
                <div>
                    
                    {
                        itm.result.map((item,idx)=>(
                            <div key={idx}>
                                <div>
                                <WhiteSpace style={{background:"#efeff4",height:14}}></WhiteSpace>
                                </div>
                                <Flex className="serchfriendsdemo" onClick={()=>{this.gotouserinfo(item.username)}}>
                                <Flex.Item>
                                    <img className="userimg" src={item.userimg} alt=""/>
                                </Flex.Item>
                                <Flex.Item>
                                    <p>{item.username}</p>
                                </Flex.Item>
                                <Flex.Item>
                                    <p>{item.name}</p>
                                </Flex.Item>
                            </Flex>
                            </div>
                            
                        ))
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
       
        
        return (
            
            <div>
                <div>
                    <Flex className="headlead">
                    <Flex.Item
                       
                    >
                        <i className="iconfont icon-zuojiantou" onClick={()=>{this.gotoback()}}></i>
                        <span>联系人</span>
                       
                    </Flex.Item>
                    <Flex.Item
                       
                    >
                       <span>添加</span>
                       
                    </Flex.Item>
                    
                    </Flex>
                </div>
                <div className="headheight">

                </div>
            <div className="friendslead">
                 <Flex>
                    <Flex.Item>
                        <span>找人</span>
                    </Flex.Item>
                    <Flex.Item>   
                        <span>找群</span>
                    </Flex.Item>
                    <Flex.Item>   
                        <span>找公众号</span>
                    </Flex.Item>
                </Flex>
            </div>
            <div>
                <WhiteSpace></WhiteSpace>
                <WingBlank>
                    <input className="friendsserch"  placeholder="QQ号、手机号、群、公众号" ref="serchusername" onChange={this.getSerchName}/>
                </WingBlank>
                    
                <WhiteSpace></WhiteSpace>

            </div>
           
            <div ref="nextcomment">
                <Item arrow="horizontal" multipleLine onClick={() => {}}>
                   添加手机联系人
                </Item>
                <Item arrow="horizontal" multipleLine onClick={() => {}}>
                   扫一扫添加好友
                </Item>
                <Item arrow="horizontal" multipleLine onClick={() => {}}>
                   面对面发起群聊
                </Item>
                <Item arrow="horizontal" multipleLine onClick={() => {}}>
                   按条件查找陌生人
                </Item>
                <Item arrow="horizontal" multipleLine onClick={() => {}}>
                   查看附近的人
                </Item>
            </div>
           
            <div ref="serchcontent">
                <Serch></Serch>
            </div>
            <div>
                <WhiteSpace style={{background:"#efeff4",height:40}}></WhiteSpace>
            </div>
            <div>
            <Item arrow="horizontal" multipleLine onClick={() => {}}>
                   可能认识的人
                </Item>
            </div>
                
           
            </div>
            
               
            
        )
    }
}