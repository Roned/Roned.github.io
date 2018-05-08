<template>
  <div>
      <mt-button type="primary" @click="goback">返回</mt-button>
      <title>个人资料</title>
  </div>
</template>
<script>
import router from "../router";
export default {
    methods:{
        goback(){
            router.go(-1);
        }
    }

}
</script>

