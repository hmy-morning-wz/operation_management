<template>
    <div class="open-line" v-show="cityId == 6">
        <div class="title ml10">开通路线</div>
        <div class="content">
            <div class="comm-dis">
                <div class="h40 mr10">标题名字</div>
                <div class="mr20">
                    <el-input
                        v-model="iconName"
                        style="width:300px;"
                        placeholder="请输入url"
                        :maxlength="30"
                    ></el-input>
                </div>
            </div>
            <div class="comm-dis mt10">
                <div class="h40 mr10">内容详情</div>
                <div class="mr20">
                    <el-input
                        v-model="desc"
                        style="width:300px;"
                        placeholder="请输入url"
                        :maxlength="30"
                    ></el-input>
                </div>
            </div>
            <div class="comm-dis mt10">
                <div class="h40 mr10" style="width:56px;">url地址</div>
                <div class="mr20">
                    <el-input
                        v-model="linkUrl"
                        style="width:300px;"
                        placeholder="请输入url"
                        :maxlength="30"
                    ></el-input>
                </div>
            </div>
            <el-button type="primary" @click="handleSave" class="mt20" style="margin-left:100px;">提交</el-button>
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
      linkUrl: "",
      iconName: "",
      desc: "",
      iconId: 0
    };
  },
  created() {
    this.getByParamBus();
  },
  components: {
    AppLoading
  },
  methods: {
    addBus() {
      const data = {
        iconName: this.iconName,
        desc: this.desc,
        pageId: 6,
        zoneId: 3,
        iconType: 7,
        linkUrl: this.linkUrl
      };
      cardService.addBus(data).then(
        response => {
          this.$message({
            message: "保存成功",
            type: "success"
          });
        },
        response => {
          this.$message.error("请求服务器连接失败!");
        }
      );
    },
    updateBus() {
      const data = {
        iconName: this.iconName,
        desc: this.desc,
        pageId: 6,
        zoneId: 3,
        iconType: 7,
        linkUrl: this.linkUrl,
        iconId: this.iconId
      };
      cardService.updateBus(data).then(
        response => {
          this.$message({
            message: "更新成功",
            type: "success"
          });
        },
        response => {
          this.$message.error("请求服务器连接失败!");
        }
      );
    },
    getByParamBus() {
      const data = {
        pageId: 6,
        zoneId: 3
      };
      cardService.getByParamBus(data).then(
        response => {
          if (response.data instanceof Array) {
            response.data.forEach(item => {
              if (item.iconName === "开通路线") {
                this.linkUrl = item.linkUrl;
                this.iconId = item.iconId;
              }
            });
          }
        },
        response => {
          this.$message.error("请求服务器连接失败!");
        }
      );
    },
    handleSave() {
      if (this.iconId) {
        this.updateBus();
      } else {
        if (this.linkUrl) {
          this.addBus();
        } else {
          this.$message.error("请输入url!");
        }
      }
    }
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
.open-line {
  .title {
    font-size: 16px;
    margin-bottom: 10px;
  }
  .content {
    margin-left: 35px;
    margin-bottom: 20px;
  }
}
</style>
