export default {

    // increment(state,preload){
    //     state.main+=preload
    // },
    createusername(state,data){

        console.log(data)
        state.username=data;
    },
    createuserpwd(state,data){

        console.log(data)
        state.userpwd=data;
    },
    changesession(state,data){
        console.log(data)
        state.session=data;
    },
    loadusername(state,data){
        state.username=data;
    },
    loadhot(state,data){
        console.log("+++++++++++++++")
        console.log(data);
        state.artic=data.result;
    },
    toarticone(state,data){
        console.log("+++++++++++++++")
        console.log(data);
        state.articone=data.result[1][0];
        state.articoneauthor=data.result[0];
    },
    changereplymessage(state,data){
        state.replymessage=data;
    },
    replylist(state,data){
        console.log(data.result);
        state.relist=data.result;
        console.log(state.relist);
    },
    loadreplylist(state,data){
        console.log("0-0-0-0-0-0-0-0-");
        console.log(data);
        state.relist=data.result;
    },
    loadgoodsone(state,data){
        console.log(data);
        state.goodsone=data.result;
    },
    changecolor(state,data){
        console.log(data);
        state.goodsonecolor=data;
    },
    changesize(state,data){
        console.log(data);
        state.goodsonesize=data;
    },
    loadusershop(state,data){
        console.log(data);
        state.usershop=data;
    },
    changeshowdelete(state,data){
        state.showdelete=data;
    },
    loadshop(state,data){
        console.log(data.result);
        state.shoplist=data.result;
    },
    forquite(state,data){
        state.session=data;
    }


}