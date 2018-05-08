import React,{Component} from "react";
import ReactDOM,{render} from "react-dom";
import {connect} from "react-redux";
import {BrowserRouter,HashRouter,Link,Switch,Route} from "react-router-dom"; 
import { WingBlank, WhiteSpace, Flex,InputItem,Button,SearchBar,List } from 'antd-mobile';



export default class Active extends Component{
    render(){
        const Item=List.Item;
        return (
            <div>
                <div>
                    <Flex className="activeleader">
                        <Flex.Item>
                            <i className="iconfont icon-QZ"></i>
                            <p>好友动态</p>
                        </Flex.Item>
                        <Flex.Item>
                            <i className="iconfont icon-z103"></i>
                            <p>附近</p>
                        </Flex.Item>
                        <Flex.Item>
                            <i className="iconfont icon-fantuan"></i>
                            <p>兴趣部落</p>
                        </Flex.Item>
                    </Flex>
                </div>
                <WhiteSpace></WhiteSpace>
                <div>
                <WhiteSpace></WhiteSpace>
                  
                        <Item
                            thumb={
                                <i className="iconfont icon-iconfontyouxihudong"></i>
                                }
                            arrow="horizontal"
                        >
                            <span>游戏</span>
                        </Item>
                        <Item
                            thumb={
                                <i className="iconfont icon-Oval"></i>
                                }
                            arrow="horizontal"
                        >
                            <span>校园圈</span>
                        </Item>
                        <Item
                            thumb={
                                <i className="iconfont icon-shipin"></i>
                                }
                            arrow="horizontal"
                        >
                            <span>日迹</span>
                        </Item>
                        <Item
                            thumb={
                                <i className="iconfont icon-gouwu-copy"></i>
                                }
                            arrow="horizontal"
                        >
                            <span>淘宝购物</span>
                        </Item>
                        <Item
                            thumb={
                                <i className="iconfont icon-tv"></i>
                                }
                            arrow="horizontal"
                        >
                            <span>鹅漫U品</span>
                        </Item>
                        <Item
                            thumb={
                                <i className="iconfont icon-dongman"></i>
                                }
                            arrow="horizontal"
                        >
                            <span>动漫</span>
                        </Item>
                        <Item
                            thumb={
                                <i className="iconfont icon-tubiaozhizuomoban"></i>
                                }
                            arrow="horizontal"
                        >
                            <span>阅读</span>
                        </Item>
                        <Item
                            thumb={
                                <i className="iconfont icon-yinyueclick"></i>
                                }
                            arrow="horizontal"
                        >
                            <span>音乐</span>
                        </Item>
                        <WhiteSpace></WhiteSpace>
                        <Item
                            thumb={
                                <i className="iconfont icon-yundong-on"></i>
                                }
                            arrow="horizontal"
                        >
                            <span>运动</span>
                        </Item>
                        <Item
                            thumb={
                                <i className="iconfont icon-bingqilin"></i>
                                }
                            arrow="horizontal"
                        >
                            <span>吃喝玩乐</span>
                        </Item>
                        <Item
                            thumb={
                                <i className="iconfont icon-balloons"></i>
                                }
                            arrow="horizontal"
                        >
                            <span>同城服务</span>
                        </Item>
                        
                       
                    
                </div>
            </div>
        )
    }
}