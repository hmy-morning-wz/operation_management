<template>
    <div class="bus-welfare">
        <div class="title ml10">乘车福利</div>
        <div class="content">
        </div>
    </div>
</template>
<script>
import cardService from "../../../service/OperationManagement/cardDetail";
import apiHost from "@/hostconfig/index";
import moment from "@/utils/moment";
import AppLoading from "../../OperationManagement/comm/loading.vue";

export default {
  props: ["cityId"],
  data() {
    return {
      list: [
        {
          title: "",
          description: ""
        }
      ]
    };
  },
  created() {
  },
  components: {
    AppLoading
  },
  methods: {
  },
  computed: {},
  watch: {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
.comm-dis {
  display: flex;
}
.w50 {
  width: 50px;
}
.h40 {
  height: 40px;
  line-height: 40px;
}
.bus-welfare{
  .title {
    font-size: 16px;
    margin-bottom: 10px;
  }
  .content{
    margin-left: 35px;
    margin-bottom: 20px;
  }
}
</style>
