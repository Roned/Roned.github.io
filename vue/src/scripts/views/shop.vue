<template>
    <div class="thisshoplist">
        <ul>
            <li v-for="(shop,i) in shoplist" :key="i" class="shopforli">
                <div class="shopforone cleatfix">
                    <div class="shopforoneleft">
                        <img :src="shop.shopimg" alt="">
                    </div>
                     <div class="shopforoneright">
                            <p class="shoptitle">{{shop.shopname}}</p>
                            <p class="shopmeg">{{shop.shopmeg}}</p>
                            <div class="forlikene">
                                    <i v-show="!shop.flag" class="iconfont noheart" @click="changeshoplike(true,shop.shopid,$event)" >&#xe619;</i>
                                    <i v-show="shop.flag" class="iconfont redheart" @click="changeshoplike(false,shop.shopid,$event)" >&#xe619;</i>
                                    <span class="shoplike">{{shop.like}}</span>
                            </div>  
                     </div>
                </div>
               
            </li>
        </ul>
    </div>

</template>
<script>
    import {mapState,mapActions} from "vuex";
    import router from "../router";
    import axios from "axios";
export default {
        computed:{
            ...mapState([
                'shoplist',
                'shoplike',
                'username'
            ])
        },
        methods:{
            ...mapActions([
                'loadshop'
            ]),
            loadshoplist(){ 
                if(this.$store.state.username){
                    var username=this.$store.state.username;
                }else{
                    var username="admin";
                }
                this.loadshop(username);
            },
            changeshoplike(like,shopid,$event){
                var username=this.$store.state.username;
                if(username){
                var url= "http://47.98.148.13:5000/users/changeshoplist";
                axios.get(url,{
                    params:{
                        like,
                        shopid,
                        username
                    }
                })
                .then(res=>res.data)
                .then(json=>{
                    console.log("++++++++++++++=")
                    this.loadshoplist();
                })
                }
               
            }
        },
        mounted(){
            console.log("aaa")
           
           this.loadshoplist();
          
        }
}
</script>
<style>
    .shopforli{
          border-bottom: 2px solid #999;
    }   
    .shopforone{
        height: 200px;
        font-size: 26px;
        margin:0 2%;
      
    }
    .shopforone img{
        width: 180px;
        height: 180px;
        margin-top:10px; 
    }
    .shopforoneleft{
        float: left;
    }
    /* .shopforoneright{
        
    } */
    .shoptitle{
        font-size: 30px;
        font-weight: 400;
        color: #333;
        margin: 10px 20px;
    }
    .shopmeg{
        font-size: 30px;
        font-weight: 400;
        color: #666;
        margin: 10px 20px;
    }
    .shoplike{
        text-align: right;
    }
    .forlikene{
        float: right;
    }
    .thisshoplist{
        margin-bottom: 100px;
    }
    .noheart{
        color:#999;

    }
    .redheart{
        color:red;
    }
</style>

