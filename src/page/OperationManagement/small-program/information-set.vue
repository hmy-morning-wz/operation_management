<template>
    <div class="information-set" v-show="cityId == 6">
        <div class="title ml10">出行资讯</div>
        <div class="content">
            <div v-for="(item,index) in list" :key="index">
                <div class="comm-dis mt10">
                    <div class="w50 h40">标题</div>
                    <el-input
                        v-model="item.content"
                        style="width:300px;"
                        placeholder="标题名称"
                        :maxlength="100"
                    ></el-input>
                    <el-button class="ml10" type="text" @click="handleDelete(index,item.id)">删除</el-button>
                </div>
                <!-- <div class="comm-dis mt10">
                    <div class="w50 h40">内容</div>
                    <el-input
                        style="width:400px"
                        type="textarea"
                        :autosize="{ minRows: 4, maxRows: 8}"
                        :maxlength="100"
                        placeholder="请输入描述内容"
                        v-model="item.description"
                    ></el-input>
                </div>-->
            </div>
            <div>
                <el-button class="mt10" icon="el-icon-plus" circle @click="handleAdd"></el-button>
                <el-button type="primary" @click="handleSave">提交</el-button>
            </div>
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
      id: "",
      list: [
        {
          content: "",
          pageId: 6,
          zoneId: 2
        }
      ]
    };
  },
  created() {},
  components: {
    AppLoading
  },
  methods: {
    getNoticeByParam() {
      cardService.getNoticeByParam().then(
        response => {},
        response => {
          this.$message.error("请求服务器连接失败!");
        }
      );
    },
    deleteNotice() {
      cardService.deleteNotice().then(
        response => {},
        response => {
          this.$message.error("请求服务器连接失败!");
        }
      );
    },
    updateNotice() {
        const data = this.list;
      cardService.updateNotice().then(
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
    addNotice() {
      const data = this.list;
      cardService.addNotice(data).then(
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
    handleAdd() {
      const obj = {
        content: "",
        pageId: 6,
        zoneId: 2
      };
      this.list.push(obj);
    },
    handleDelete(index, id) {
      this.$confirm("此操作将删除改标题内容", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (Number(index) > 0) {
            this.list.splice(index, 1);
          } else {
            this.list = [
              {
                content: "",
                pageId: 6,
                zoneId: 2
              }
            ];
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleSave() {}
  },
  computed: {},
  watch: {
    cityId() {}
  },
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
.information-set {
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
