import axios from "axios";
import {Toast} from "antd-mobile";
axios.defaults.baseURL = "http://47.98.148.13:3000/";

// new Promise(
//         (resolve,reject)=>{
//             // console.log(url);
//             return axios.get(url)
//                 .then(res=>dispatch({
//                     type:"get_data_promise_succ",
//                     data:res.data
//                 }))
//         }
//     )
export const create=(dispatch,history,username,userpwd)=>(
        new Promise(
                (resolve,reject)=>{
                        return axios.get("/users/create",{
                                params:{
                                        username,
                                        userpwd
                                }
                        }).then(res=>{
                                console.log(res.data)
                                if(res.data.code==0){
                                        localStorage.username=res.data.username;
                                        Toast.info("注册成功",1);
                                        history.push("/app/meg")
                                }else{
                                        Toast.info("注册失败",1);
                                }
                        })
                }
        )

)
export const login=(dispatch,history,username,userpwd)=>(
      
        new Promise(
                (resolve,reject)=>{
                        return axios.get("/users/login",{
                                params:{
                                        username,
                                        userpwd
                                }
                        }).then(res=>{
                                console.log(res.data)
                                if(res.data.code==0){
                                        localStorage.username=res.data.username;
                                        Toast.info("登陆成功",1);
                                        history.push("/app/meg")
                                }else{
                                        Toast.info("登录失败",1);
                                }
                        })
                }
        )
        
)


export const changeTitle=(title,topath)=>{
        console.log(title)
        console.log(topath)
        return {
                type:"changeTitle",
                title,
                topath
        }
}

// export const LogintoChat=(username)=>{
      
//         return(
//                 (dispatch)=>{
//                         return axios.get("/users/logintochat",{
//                               params:{
//                                       username,
                                   
//                                 }
//                         }).then(res=>{
//                               console.log(res.data)
//                         })
//                      }
//               ) 
// }

export const serchUsername=(username,serchusername)=>{
        console.log(username)
              return(
                (dispatch)=>{
                        return axios.get("/users/serchusername",{
                              params:{
                                      username,
                                      serchusername
                                }
                        }).then(res=>{
                               dispatch({
                                       type:"serchUsername",
                                       serchlist:res.data
                               })
                        })
                     }
              ) 
        
}
export const loadUserinfo=(username,serchusername)=>{
        console.log(username);
        console.log(serchusername);
              return(
                (dispatch)=>{
                        return axios.get("/users/loaduserinfo",{
                              params:{
                                      username,
                                      serchusername
                                }
                        }).then(res=>{
                                console.log(res.data);
                               dispatch({
                                       type:"loaduserinfo",
                                       userinfo:res.data
                               })
                        })
                     }
              ) 
        
}

export const insertFriend=(username,friendusername)=>{
        console.log(friendusername)
              return(
                (dispatch)=>{
                        return axios.get("/users/insertfriend",{
                              params:{
                                        username,
                                        friendusername
                                }
                        }).then(res=>{
                              if(res.data.code==0){
                                Toast.info("请求成功",1)
                              }
                        })
                     }
              ) 
        
}

export const loadFriends=(username)=>{
        console.log("0-0-0-0-0-0-0-")
        console.log(username)
              return(
                (dispatch)=>{
                        return axios.get("/users/loadfriends",{
                              params:{
                                        username        
                                }
                        }).then(res=>{
                                console.log("--------")
                                console.log(res.data.result)
                                var friends=res.data.result.friends;
                                var unfriends=res.data.result.unfriends;
                                if(res.data.result.friends){

                                }else{
                                        friends=[]; 
                                }
                                if(res.data.result.unfriends){

                                }else{
                                        unfriends=[]; 
                                }
                                dispatch({
                                        type:"loadfriends",
                                        friends,
                                        unfriends
                                })
                            
                        })
                     }
              ) 
        
}

export const changeFriendState=(username,friendusername)=>{
        console.log("0-0-0-0-0-0-0-")
        console.log(username)
              return(
                (dispatch)=>{
                        return axios.get("/users/changefriendstate",{
                              params:{
                                        username,
                                        friendusername        
                                }
                        }).then(res=>{
                                console.log("--------")
                                console.log(res.data)
                              
                            
                        })
                     }
              ) 
        
}
export const loadChatlist=(username)=>{
        console.log("开始加载聊天聊表")
        console.log(username)
              return(
                (dispatch)=>{
                        return axios.get("/users/loadchatlist",{
                              params:{
                                        username,   
                                }
                        }).then(res=>{
                                console.log("--------")
                                console.log(res.data)
                              dispatch({
                                      type:"loadchatlist",
                                      data:res.data.result.list
                              })
                            
                        })
                     }
              ) 
        
} 

export const makeSurefriend=(username,friendusername)=>{
        console.log("建立会话")
        console.log(username)
              return(
                (dispatch)=>{
                        return axios.get("/users/makesurefriend",{
                              params:{
                                        username,  
                                        friendusername 
                                }
                        }).then(res=>{
                                console.log("--------")
                                console.log(res.data)
                
                        })
                     }
              ) 
        
} 

export const loadFriendMeg=(username,friendusername)=>{
        console.log("读取聊天记录")
        console.log(username)
              return(
                (dispatch)=>{
                        return axios.get("/users/loadfriendmeg",{
                              params:{
                                        username,  
                                        friendusername
                                        
                                }
                        }).then(res=>{
                                console.log("--------")
                                console.log(res.data)
                                dispatch({
                                        type:"loadfriendmeg",
                                        data:res.data.result.chatmeg
                                })
                        })
                     }
              ) 
        
} 


