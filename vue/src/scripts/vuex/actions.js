
import axios from "axios";

export default {
    createusername({commit},data){

        console.log(data)
        commit("createusername",data);
    },
    createuserpwd({commit},data){

        console.log(data)
        commit("createuserpwd",data);
    },
    changesession({commit},data){
        console.log(data)
        commit("changesession",data);
    },
    loadusername({commit},data){
        commit("loadusername",data);
    },
    loadhot({commit},data){
        console.log(data);
        axios.get(data)
        .then(res=>res.data)
        .then(json=>{
            commit("loadhot",json)
        })
    },
    toarticone({commit},url){
       
        console.log(url)
        axios.get(url)
        .then(res=>res.data)
        .then(json=>{
            commit("toarticone",json)
        })
    },
    changereplymessage({commit},data){
        commit("changereplymessage",data);
    },
    replylist({commit},url){
        axios.get(url)
        .then(res=>res.data)
        .then(json=>{
            commit("replylist",json)
        })
    },
    loadreplylist({commit},url){
        console.log(url)
        axios.get(url)
        .then(res=>res.data)
        .then(json=>{
            commit("loadreplylist",json)
        })
    },
    loadgoodsone({commit},url){
        axios.get(url)
        .then(res=>res.data)
        .then(json=>{
            commit("loadgoodsone",json)
        })
    },
    changecolor({commit},color){
        commit("changecolor",color);
    },
    changesize({commit},size){
        commit("changesize",size);
    },
    loadusershop({commit},username){
        var url="http://47.98.148.13:5000/users/usershop?username="+username;
        axios.get(url)
        .then(res=>res.data)
        .then(json=>{
           
            commit("loadusershop",json);
        }); 
    },
    changeshowdelete({commit},data){
        commit("changeshowdelete",data);
    },
    loadshop({commit},data){
        var url= "http://47.98.148.13:5000/users/loadshoplist?username="+data;
        axios.get(url)
        .then(res=>res.data)
        .then(json=>{
            commit("loadshop",json);
        }); 
    }
    

}