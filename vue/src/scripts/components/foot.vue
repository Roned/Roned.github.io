<template>
  

        <div id="footlead" class="clearfix">
            <router-link class="leader" :to="{name:itm.name}" v-for="(itm,index) in footlist" :key="index">
                <i :class="itm.icon"></i>
         
                <p>{{itm.text}}  </p>
            </router-link>
        </div>

</template>

<script>

import {mapState,mapActions} from "vuex";



export default {
    methods:{
       
        
    },
    computed:{
        ...mapState([
            'footlist',
           
        ])
       
    },
    mounted(){
        console.log(this.$store.state.footlist)
    },
    
}

</script>


