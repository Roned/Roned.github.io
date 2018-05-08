import React,{Component} from "react";
import ReactDOM,{render} from "react-dom";
import {connect} from "react-redux";
import {BrowserRouter,HashRouter,Link,Switch,Route,NavLink} from "react-router-dom"; 
import { WingBlank, WhiteSpace,Flex } from 'antd-mobile';

@connect(
    state=>{
        console.log(state);
        return {
            title:state.title,
            topath:state.topath
        }
    }
)

export default class Head extends Component{
    goto=(topath)=>{
        console.log(topath)
        console.log(this.props)
        const {history}=this.props;
        history.push(topath);
    }
    render(){
        const {title,topath}=this.props;
        return (
            <div>
                 <div className="headlead">
                <WingBlank>
                    <Flex>
                        <Flex.Item className="headpart">
                            <img src="" alt=""/>
                        </Flex.Item>
                        <Flex.Item className="headpart">
                            <p>{title}</p>
                        </Flex.Item>
                        <Flex.Item className="headpart">
                            <p onClick={()=>{this.goto(topath)}}>添加</p>
                        </Flex.Item>
                    </Flex>
                </WingBlank>
            </div>
            <div className="headheight">

            </div>
            </div>
           
        )
    }
}