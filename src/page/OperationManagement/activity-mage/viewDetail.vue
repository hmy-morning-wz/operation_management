<template>
    <div class="viewDetail">
        <!-- <head-top></head-top> -->
        <div class="float-right h30">
            <el-button type="text" @click="handleGo">查看活动效果</el-button>
        </div>
        <div class="pl20px pt50 pr20">
            <el-form :model="ruleForm" ref="ruleForm" label-width="200px" class="demo-ruleForm">
                <el-form-item label="活动名称">
                    <el-input disabled v-model="ruleForm.name" class="w200" placeholder="活动内容名称"></el-input>
                    <span class="ml20">活动状态:</span>
                    <span class="ml10">{{ruleForm.status}}</span>
                </el-form-item>
                <el-form-item label="活动时间">
                    <div class="float-left">
                        <el-form-item>
                            <el-date-picker
                                disabled
                                v-model="ruleForm.startTime"
                                type="datetime"
                                placeholder="开始日期时间"
                                :editable="false"
                            ></el-date-picker>
                        </el-form-item>
                    </div>
                    <div class="float-left ml10 mr10">-</div>
                    <div class="float-left">
                        <el-form-item>
                            <el-date-picker
                                disabled
                                v-model="ruleForm.endTime"
                                type="datetime"
                                placeholder="结束日期时间"
                                :editable="false"
                            ></el-date-picker>
                        </el-form-item>
                    </div>
                </el-form-item>
                <el-form-item label="活动类型">
                    <el-select
                        disabled
                        v-model="ruleForm.type"
                        clearable
                        filterable
                        placeholder="优惠活动/投票活动/报名活动"
                        style="width:450px"
                    >
                        <el-option
                            v-for="(item,index) in activityList"
                            :key="index"
                            :label="item.activityTypeName"
                            :value="item.activityTypeId"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <div class="quan" v-if="Number(ruleForm.type) === 1">
                    <div class="float-left">优惠券关联：</div>
                    <div class="float-left pb10" style="width:600px">
                        <el-tag
                            closable
                            v-for="(tag,index) in tags"
                            :key="tag.name"
                            class="mr10 mb10"
                            @close="handleClose(tag)"
                        >
                            <span>{{tag.brandName}}</span>+
                            <span>{{tag.voucherName}}</span>
                        </el-tag>
                    </div>
                </div>
                <el-form-item label="活动是否审核">
                    <el-radio-group v-model="ruleForm.needReview">
                        <el-radio disabled label="是"></el-radio>
                        <el-radio disabled label="否"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="活动内容描述">
                    <el-input
                        style="width:450px"
                        type="textarea"
                        :autosize="{ minRows: 4, maxRows: 8}"
                        :maxlength="100"
                        placeholder="请输入描述内容"
                        disabled
                        v-model="ruleForm.description"
                    ></el-input>
                </el-form-item>
                <el-form-item label="活动链接">
                    <el-input
                        disabled
                        v-model="ruleForm.activityUrl"
                        class="w200"
                        placeholder="活动链接地址"
                    ></el-input>
                </el-form-item>
            </el-form>
        </div>
        <app-loading :loadingShow="loadingShow"></app-loading>
    </div>
</template>
<script>
import activityService from "../../../service/OperationManagement/activity";
import moment from "@/utils/moment";
import AppLoading from "../../OperationManagement/comm/loading.vue";
import headTop from "../../../components/headTop";

export default {
  data() {
    return {
      loadingShow: false,
      id: this.$route.query.id,
      tags: [],
      ruleForm: {
        name: "",
        type: "",
        startTime: "",
        endTime: "",
        needReview: "",
        description: "",
        activityUrl: ""
      },
      activityList: [
        {
          activityTypeId: 1,
          activityTypeName: "杭州"
        }
      ]
    };
  },
  created() {
    this.getActivityType();
    this.getActivityDetail();
  },
  components: {
    AppLoading,
    headTop
  },
  methods: {
    handleGo() {
      const router = `./activityAffect?id=${this.id}`;
      this.$router.push(router);
    },
    getActivityType() {
      activityService.getActivityType().then(
        response => {
          this.activityList = JSON.parse(JSON.stringify(response));
        },
        response => {
          this.$message.error("请求服务器连接失败!");
        }
      );
    },
    getActivityDetail() {
      const id = this.id;
      activityService.getActivityDetail(id).then(
        response => {
          Number(response.needReview) === 1
            ? (response.needReview = "是")
            : (response.needReview = "否");
          this.ruleForm = JSON.parse(JSON.stringify(response));
          switch (this.ruleForm.status) {
            case 1:
              this.ruleForm.status = "已创建";
              break;
            case 2:
              this.ruleForm.status = "进行中";
              break;
            case 3:
              this.ruleForm.status = "已结束";
              break;
            default:
              break;
          }
          if (response.alipayTemplateIdList.length > 0) {
            this.getTemplateListByIds(response.alipayTemplateIdList);
          }
        },
        response => {
          this.$message.error("请求服务器连接失败!");
        }
      );
    },
    getTemplateListByIds(data) {
      activityService.getTemplateListByIds(data).then(
        response => {
          response.data.forEach(item => {
            this.tags.push(item);
          });
          console.log(this.tags);
        },
        response => {
          this.$message.error("请求服务器连接失败!");
        }
      );
    }
  },
  computed: {
    beginPickerOptions() {
      let self = this;
      return {
        disabledDate(time) {
          if (self.ruleForm.endTime) {
            return time.getTime() > self.ruleForm.endTime;
          }
        }
      };
    },
    endPickerOptions() {
      let self = this;
      return {
        disabledDate(time) {
          return time.getTime() < self.ruleForm.startTime;
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
<style lang="scss" scoped>
.bgcolor {
  color: #999 !important;
}
.viewDetail {
  .h30 {
    height: 30px;
    margin-right: 50px;
  }
  .pt50 {
    padding-top: 50px;
  }
  .quan {
    margin: 10px 0 0 120px;
    line-height: 32px;
    color: #595e66;
  }
  .quan:after {
    content: " ";
    display: block;
    height: 0;
    clear: both;
  }
  .table {
    margin: 20px 30px 10px 0;
    .foot-page {
      float: right;
      margin-top: 10px;
      margin-bottom: 30px;
    }
  }
  .detail-content {
    cursor: pointer;
    color: #20a0ff;
  }
}
</style>
