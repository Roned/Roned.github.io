import React,{Component} from "react";
import ReactDOM,{render} from "react-dom";
import {connect} from "react-redux";
import {BrowserRouter,HashRouter,Link,Switch,Route,Redirect,NavLink} from "react-router-dom"; 


import Foot from "../components/foot";
import Meg from "./meg";
import Friends from "./friends";
import Watch from "./watch";
import Active from "./active";
import Head from "../components/head";

export default class App extends Component{
    
    render(){
        console.log(this.props)
        return (
            <div>
                <Head history={this.props.history}></Head>
                    <Switch>
                   
                    <Route path="/app/meg"  component={Meg}></Route>
                    <Route path="/app/friends"  component={Friends} history={history}></Route>
                    <Route path="/app/watch"  component={Watch}></Route>
                    <Route path="/app/active"  component={Active}></Route>
                    <Route render={
                        ()=>{
                            return (<Redirect to="/app/meg"/>)
                        }
                    } />
                </Switch>
                <Foot></Foot>
            </div>
        )
    }
}