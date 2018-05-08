import React,{Component} from "react";
import ReactDOM,{render} from "react-dom";
import {connect} from "react-redux";
import { WingBlank, WhiteSpace, Flex} from 'antd-mobile';
import {BrowserRouter,HashRouter,Link,NavLink,Switch,Route,Redirect} from "react-router-dom";   

import App from "./app";
import Login from "./login";
import Create from "./create";
import MakeFriend from "./makefriend";
import Userinfo from "./userinfo";
import Newfriends from "./newfriends";
import Chatplace from "./chatplace";
export default class Layout extends Component{

    render(){
        
        return (
            <div>
                <Route 
                    render={
                        ({match,history,location})=>(
                            <Switch>
                            <Route path="/" exact render={
                                    ({match})=>(<Redirect to="/login"></Redirect>)
                                }></Route>
                            
                            <Route path="/app"  component={App}></Route>
                            <Route path="/create"  component={Create}></Route>
                            <Route path="/login"  component={Login}></Route>
                            
                            <Route path="/makefriend" component={MakeFriend}></Route>
                            <Route path="/newfriends" component={Newfriends}></Route>
                            <Route path="/chatplace/:toname?" component={Chatplace}></Route>
                            <Route path="/userinfo/:username?" component={Userinfo}></Route>
                            <Route render={
                                ()=>{
                                    return (<Redirect to="/login"/>)
                                }
                            } />
                        </Switch>
                        )
                    }
                >      
            </Route>     
            </div>
        )
    }
}