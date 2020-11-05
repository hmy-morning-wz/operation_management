<template>
   <div class="dataReport">
       <!-- <head-top></head-top> -->
       <div class="main">
           <iframe class="content" frameborder="no" border="0" :src="bannerLink"></iframe>
       </div>
   </div>
</template>
<script>
import commService from "../../../service/commonService/common";
import apiHost from "@/hostconfig/index";
import headTop from "../../../components/headTop";

export default {
  data() {
    return {
        bannerLink: '',
    };
  },
  created() {

  },
  components: {
    headTop
  },
  methods: {
    getDataReport() {
      commService.getDataReport(3).then(
        response => {
         this.bannerLink  = response;
        },
        response => {
          this.$message.error("请求服务器连接失败!");
        }
      );
    },
  },
  computed: {},
  watch: {},
  mounted() {
      this.getDataReport()
  }
};
</script>
<style lang="scss" scoped>

.wth300 {
  width: 300px;
}
.wth200 {
  width: 200px;
}
.wth150 {
  width: 150px;
}
.dataReport{
    .main {
        width: 100%;
        height: 100%;
        .content{
            width: 100%;
            height: 1200px;
        }
    }
}
</style>
