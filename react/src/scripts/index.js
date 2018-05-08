// import  Layout from "./zouxiu/layout";
import React,{Component} from "react";
import ReactDOM,{render} from "react-dom";
import {HashRouter,Link,Switch,Route} from "react-router-dom";
import axios from "axios";
// axios.defaults.baseURL = "http://47.98.148.13:5000/users"
// import Parent from "./flux/components/parent";

import store from "./store";
import {Provider} from "react-redux";
import Layout from "./containers/layout";


const hotRender=()=>(
    render(
        <Provider store={store}>
            <HashRouter>
                <Layout></Layout>
            </HashRouter>  
        </Provider>,
        document.getElementById("exp")
    )
)
hotRender();