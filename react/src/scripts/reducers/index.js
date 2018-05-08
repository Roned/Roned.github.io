
const defaultState={
    meg:"成功启动react",
    data:{},
    routelist:[
        {path:"/app/meg",icon:"xiaoxi",text:"消息",topath:"/app/meg"},
        {path:"/app/friends",icon:"ren",text:"联系人",topath:"/makefriend"},
        {path:"/app/active",icon:"xingzhuang60kaobei2",text:"动态",topath:"/app/active"}
    ],
    title:"消息",
    topath:"",
    activeStyle:{color:"red"},
    serchlist:[],
    userinfo:[],
    refreshing: false,
    down: true,
    height: document.documentElement.clientHeight,
    friends:[],
    unfriends:[],
    chatlist:[],
    loadmeglist:[]
}

export default (state=defaultState,action) =>{
    switch(action.type){
        
        case "getlogin":
        console.log(action.data);
        return Object.assign({},state,{data:action.data})
        break;

        case "changeTitle":
        return Object.assign({},state,{title:action.title,topath:action.topath})
        break;

        
        case "serchUsername":
        return Object.assign({},state,{serchlist:action.serchlist})
        break;

        case "loaduserinfo":
        return Object.assign({},state,{userinfo:action.userinfo})
        break;

        case "loadfriends":
        return Object.assign({},state,{friends:action.friends,unfriends:action.unfriends})
        break;

        case "loadchatlist":
        return Object.assign({},state,{chatlist:action.data})
        break;

        case "loadfriendmeg":
        return Object.assign({},state,{loadmeglist:action.data})
        break;
        
        default:
        return state;
        break;
    }
}