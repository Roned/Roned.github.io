<template>
<div>
<router-view></router-view>
  <Foot/>
</div>
  
</template>
<script>
import Foot from './foot.vue'

export default {
    components:{
        Foot
    }

}
</script>
