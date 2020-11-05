<template>
   <div class="activity-audit">
        <!-- <head-top></head-top> -->
        <div class="pl30 pt20">
             <div>
                <el-row class="lh40">
                    <el-col :span="3"><div class="">主题：</div></el-col>
                    <el-col :span="4"><div class="">{{detail.nickname}}</div></el-col>
                </el-row>
                <el-row class="lh40">
                    <el-col :span="3"><div class="">昵称：</div></el-col>
                    <el-col :span="4"><div class="">{{detail.nickname}}</div></el-col>
                </el-row>
                <el-row class="lh40">
                    <el-col :span="3"><div class="">我经常坐的路线：</div></el-col>
                    <el-col :span="4"><div class="">{{detail.lineNo}}</div></el-col>
                </el-row>
                <el-row class="lh40">
                    <el-col :span="3"><div class="">手机号码：</div></el-col>
                    <el-col :span="4"><div class="">{{detail.telephone}}</div></el-col>
                </el-row>
                <el-row class="lh40">
                    <el-col :span="3"><div class="">我的靓照：</div></el-col>
                    <el-col :span="4"><div class="my-img"><img :src="detail.photo" id="applyImage"></div></el-col>
                </el-row>
             </div>
             <div class="bottom">
                 <el-row class="lh40" v-if='detail.status == 1'>
                    <el-col :span="4"><el-button type="primary" @click="handleAduit(2)">审核通过</el-button></el-col>
                    <el-col :span="4"> <el-button  @click="handleAduit(3)">审核不通过</el-button></el-col>
                </el-row>
                <el-row class="lh40" v-else>
                    <el-col :span="4"><el-button type="primary" disabled v-show='detail.status == 3'>审核通过</el-button></el-col>
                    <el-col :span="4"> <el-button  @click="handleAduit(3)" v-show='detail.status == 2'>审核不通过</el-button></el-col>
                </el-row>
             </div>
        </div>
        <app-loading :loadingShow="loadingShow"></app-loading>
   </div>
</template>
<script>
import activityService from "../../../service/OperationManagement/activity";
import Viewer from 'viewerjs';
import moment from "@/utils/moment";
import AppLoading from "../../OperationManagement/comm/loading.vue";
import headTop from "../../../components/headTop";

export default {
  data() {
    return {
      loadingShow: false,
      id: this.$route.query.id,
      detail:{},
    };
  },
  created() {
    this.getDetail();
  },
  components: {
    AppLoading,
    headTop
  },
  methods: {
    initApplyImgViewer() {
            const imgOptions = {
                title: false,
                tooltip: false,
                scalable: false,
                transition: false,
                navbar: false,
            };
              new Viewer(document.getElementById('applyImage'), imgOptions);
            },
    getDetail() {
      const id = this.id;
      activityService.getDetail(id).then(
        response => {
            if(response) {
                this.detail = JSON.parse(JSON.stringify(response));
                this.detail.photo = `https://${this.detail.photo}`;
                  setTimeout(() => {
                            this.initApplyImgViewer();
                        }, 100);
            }
        },
        response => {
          console.log(response.Message || "服务器连接失败！3");
        }
      );
    },
    handleAduit(params) {
      const id = this.id;
      const status  = params;
      activityService.updateStatus(id,status).then(
        response => {
        this.$message({
            message: "保存成功",
            type: "success"
          });
        //   this.$router.go(-1);
          const router = `./activityList`;
          history.go(-1)
        },
        response => {
          console.log(response.Message || "服务器连接失败！3");
        }
      );
    }
  },
  computed: {
    beginPickerOptions() {
      let self = this;
      return {
        disabledDate(time) {
          if (self.searchParams.addTimeEnd) {
            return time.getTime() > self.searchParams.addTimeEnd;
          }
        }
      };
    },
    endPickerOptions() {
      let self = this;
      return {
        disabledDate(time) {
          return time.getTime() < self.searchParams.addTimeBegin;
        }
      };
    }
  },
  watch: {
    loadingShow(val) {
      return val;
    }
  }
};
</script>
<style>
.el-button--success{
    color:#fff !important;
}
</style>

<style lang="scss" scoped>
.activity-audit{
    .my-img{
       img{
        max-width: 200px;
        height: auto;
       }
    }
    .bottom{
        margin-top: 30px;
    }
}
</style>
