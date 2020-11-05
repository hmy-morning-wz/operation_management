<template>
   <div class="dataReport">
       <div class="main">
           <iframe class="content" frameborder="no" border="0" :src="bannerLink"></iframe>
       </div>
   </div>
</template>
<script>
import commService from "../../../service/commonService/common";
import apiHost from "@/hostconfig/index";

export default {
  data() {
    return {
        bannerLink: '',
        name: this.$route.query.name,
    };
  },
  created() {

  },
  components: {
  },
  methods: {
    getDataReport2() {
      commService.getDataReport2(this.name).then(
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
  watch: {
    $route(){
         this.name = this.$route.query.name;
        this.getDataReport2()
    }
  },
  mounted() {
      this.getDataReport2()
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
