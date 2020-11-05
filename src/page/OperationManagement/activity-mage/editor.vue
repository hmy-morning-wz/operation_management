<template>
    <div class="editor">
        <!-- <head-top></head-top> -->
        <div class="pl20px pt20 pr20">
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="200px"
                class="demo-ruleForm"
            >
                <el-form-item label="活动名称" prop="name">
                    <el-input
                        v-model="ruleForm.name"
                        style="width:400px"
                        placeholder="活动内容名称"
                        disabled
                        :maxlength="30"
                    ></el-input>
                    <span class="ml20">活动状态:</span>
                    <span class="ml10">{{ruleForm.status}}</span>
                </el-form-item>
                <el-form-item label="活动时间" required>
                    <div class="float-left">
                        <el-form-item prop="startTime">
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
                        <el-form-item prop="endTime">
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
                <el-form-item label="活动类型" prop="type">
                    <el-select
                        v-model="ruleForm.type"
                        clearable
                        filterable
                        placeholder="支付宝优惠券活动/投票活动/报名活动"
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
                <div class="quan" v-show="Number(ruleForm.type) === 1">
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
                <div class="tips" v-show="quanType">优惠券关联不能为空</div>
                <div class="commodityList" v-show="Number(ruleForm.type) === 1">
                    <div class="mb20 w200">
                        <el-select
                            v-model="brandName"
                            filterable
                            placeholder="商户名称"
                            @change="handleShop"
                        >
                            <el-option
                                v-for="(item,index) in commodityList"
                                :key="index"
                                :label="item"
                                :value="item"
                            ></el-option>
                        </el-select>
                    </div>
                    <el-table :data="tableData">
                        <el-table-column
                            prop="voucherName"
                            label="优惠券名称"
                            min-width="50"
                            align="center"
                        ></el-table-column>
                        <el-table-column
                            prop="gmtCreate"
                            label="创建时间"
                            min-width="50"
                            align="center"
                        ></el-table-column>
                        <el-table-column label="操作" min-width="50" align="center">
                            <template slot-scope="scope" style="text-align:center">
                                <el-button
                                    type="text"
                                    size="small"
                                    @click="handleAddShop(scope.row.templateId,scope.row.voucherName)"
                                >添加</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <el-form-item label="活动是否审核" prop="needReview">
                    <el-radio-group v-model="ruleForm.needReview">
                        <el-radio disabled label="是"></el-radio>
                        <el-radio disabled label="否"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="活动内容描述" prop="description">
                    <el-input
                        style="width:450px"
                        type="textarea"
                        :autosize="{ minRows: 4, maxRows: 8}"
                        :maxlength="100"
                        placeholder="请输入描述内容"
                        v-model="ruleForm.description"
                    ></el-input>
                </el-form-item>
                <el-form-item label="活动链接" prop="activityUrl">
                    <el-input v-model="ruleForm.activityUrl" class="w200" placeholder="活动链接地址"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">保存修改</el-button>
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
      tableData: [],
      tags: [],
      quanType: false,
      ruleForm: {
        name: "",
        type: "",
        startTime: "",
        endTime: "",
        needReview: "",
        description: "",
        activityUrl: ""
      },
      brandName: "",
      commodityList: [],
      activityList: [
        {
          activityTypeId: 1,
          activityTypeName: "杭州"
        }
      ],
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 1, max: 30, message: "长度在 1 到 30 个字符", trigger: "blur" }
        ],
        type: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        needReview: [
          { required: true, message: "请选择审核状态", trigger: "change" }
        ],
        description: [
          { required: true, message: "活动内容描述", trigger: "blur" }
        ],
        activityUrl: [
          { required: true, message: "活动连接地址", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getActivityType();
    this.getActivityDetail();
    this.getBrandNameList();
  },
  components: {
    AppLoading,
    headTop
  },
  methods: {
    handleClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    },
    handleShop() {
      this.getTemplateBrandName(this.brandName);
    },
    handleAddShop(id, voucherName) {
      let addType = true
      this.tags.forEach(item => {
        if (item.templateId == id) {
          addType = false;
        }
      });
      if (addType) {
        var obj = {
          templateId: id,
          brandName: this.brandName,
          voucherName: voucherName
        };
        this.tags.push(obj);
      }
    },
    submitForm(formName) {
      if (Number(this.ruleForm.type) === 1 && this.tags.length === 0) {
        this.quanType = true;
        return;
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleForm.needReview === "是"
            ? (this.ruleForm.needReview = 1)
            : (this.ruleForm.needReview = 0);
          let data = {
            activityUrl: this.ruleForm.activityUrl,
            couponUrl: this.ruleForm.couponUrl,
            description: this.ruleForm.description,
            type: this.ruleForm.type,
            id: this.id
          };
          if (this.ruleForm.type === 1) {
            data.alipayTemplateIdList = [];
            this.tags.forEach(item => {
              data.alipayTemplateIdList.push(item.templateId);
            });
          }
          activityService.updateActivity(data).then(
            response => {
              this.$message({
                message: "保存成功",
                type: "success"
              });
              const router = `/activityList`;
              this.$router.replace(router);
            },
            response => {
              this.$message.error("请求服务器连接失败!");
            }
          );
        } else {
          this.$message({
            message: "保存失败",
            type: "warning"
          });
          return false;
        }
      });
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
    //获取商品列表接口
    getBrandNameList() {
      activityService.getBrandNameList().then(
        response => {
          this.commodityList = response;
        },
        response => {
          this.$message.error("请求服务器连接失败!");
        }
      );
    },
    //获取商品模版接口
    getTemplateBrandName(data) {
      activityService.getTemplateBrandName(data).then(
        response => {
          this.tableData = response.data;
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
.editor {
  .quan {
    margin: -10px 0 0 120px;
    line-height: 32px;
    color: #595e66;
  }
  .quan:after {
    content: " ";
    display: block;
    height: 0;
    clear: both;
  }
  .tips {
    margin: 0 0 10px 200px;
    color: #f56c6c;
    font-size: 12px;
  }
  .commodityList {
    width: 500px;
    margin: 0 0 20px 200px;
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
