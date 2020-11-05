<template>
  <div class="add-apli-acoupon" v-loading.fullscreen.lock="fullscreenLoading">
    <div style="display:flex">
      <div class="pl20px pt20 pr20">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="200px"
          class="demo-ruleForm"
        >
          <el-form-item label="优惠券类型" prop="alipassTypeId">
            <el-select
              v-model="ruleForm.alipassTypeId"
              placeholder="请选择"
              style="width:150px"
              @change="handeleType"
            >
              <el-option
                v-for="item in voucherList"
                :key="item.alipassTypeId"
                :label="item.name"
                :value="item.alipassTypeId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="优惠券名称" prop="voucherName">
            <el-input
              v-model="ruleForm.voucherName"
              style="width:220px;"
              placeholder="不超过15个字"
              :maxlength="20"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="模板总金额"
            prop="totalAmount"
            v-show="couponType === 'COUPON'"
            :rules="couponType === 'COUPON' ? rules.alipassTypeId:[{ required: false}]"
          >
            <el-input v-model="ruleForm.totalAmount" style="width:220px;"></el-input>
          </el-form-item>
          <el-form-item label="商家名称" prop="brandName">
            <el-input
              v-model="ruleForm.brandName"
              style="width:220px;"
              placeholder="请输入商家名称"
              :maxlength="12"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="券总数"
            prop="voucherQuantity"
            v-show="couponType !== 'COUPON'"
            :rules="couponType !== 'COUPON' ? rules.voucherQuantity:[{ required: false}]"
          >
            <el-input
              type="number"
              v-model="ruleForm.voucherQuantity"
              style="width:120px;"
              placeholder="输入整数"
              :maxlength="5"
            ></el-input>
            <span>张(1-9999整数)</span>
          </el-form-item>
          <el-form-item label="每人领取次数限制" prop="hasLimitQuantity">
            <el-radio-group v-model="ruleForm.hasLimitQuantity">
              <div>
                <el-radio label="0">无限制</el-radio>
              </div>
              <div>
                <el-radio label="1" class="mr10">单人每天可领</el-radio>
                <el-input
                  class="mr10 w100"
                  type="number"
                  v-model="ruleForm.perDailyQuantity"
                  style="width:110px;"
                  placeholder="输入整数"
                  :maxlength="5"
                ></el-input>
                <span class="fs14">次，最多可领</span>
                <el-input
                  class="ml10 mr10 w100"
                  type="number"
                  v-model="ruleForm.perMaxQuantity"
                  style="width:110px;"
                  placeholder="输入整数"
                  :maxlength="5"
                ></el-input>
                <span class="fs14">次(1-50)整数</span>
              </div>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="券发放时间" required>
            <div class="float-left">
              <el-form-item prop="publishStartTime">
                <el-date-picker
                  v-model="ruleForm.publishStartTime"
                  type="datetime"
                  placeholder="开始日期时间"
                  :picker-options="beginPickerOptions"
                  :editable="false"
                ></el-date-picker>
              </el-form-item>
            </div>
            <div class="float-left ml10 mr10">-</div>
            <div class="float-left">
              <el-form-item prop="publishEndTime">
                <el-date-picker
                  v-model="ruleForm.publishEndTime"
                  type="datetime"
                  placeholder="结束日期时间"
                  :picker-options="endPickerOptions"
                  :editable="false"
                ></el-date-picker>
              </el-form-item>
            </div>
          </el-form-item>
          <el-form-item label="券使用有效期" required>
            <div class="float-left">
              <el-select
                v-model="ruleForm.voucherValidPeriod.type"
                placeholder="请选择"
                style="width:150px"
                @change="handleChange"
              >
                <el-option
                  v-for="item in timeType"
                  :key="item.type"
                  :label="item.label"
                  :value="item.type"
                ></el-option>
              </el-select>
            </div>
            <div v-if="ruleForm.voucherValidPeriod.type === 'ABSOLUTE'">
              <div class="float-left ml10">
                <el-form-item prop="voucherValidPeriod.start">
                  <el-date-picker
                    v-model="ruleForm.voucherValidPeriod.start"
                    type="datetime"
                    placeholder="开始日期时间"
                    :editable="false"
                    @change="handleStartTime"
                    style="width:195px"
                  ></el-date-picker>
                </el-form-item>
              </div>
              <div class="float-left ml10 mr10">-</div>
              <div class="float-left">
                <el-form-item prop="voucherValidPeriod.end">
                  <el-date-picker
                    v-model="ruleForm.voucherValidPeriod.end"
                    type="datetime"
                    placeholder="结束日期时间"
                    :editable="false"
                    style="width:195px"
                    @change="handleEndTime"
                  ></el-date-picker>
                </el-form-item>
              </div>
            </div>
            <div v-else>
              <div class="float-left ml10">
                <span>领取后</span>
                <el-input
                  type="number"
                  v-model="ruleForm.voucherValidPeriod.duration"
                  style="width:150px;"
                  placeholder="输入整数"
                  :maxlength="5"
                ></el-input>
                <span>天失效</span>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="使用说明" prop="voucherDescription">
            <el-input
              style="width:450px"
              type="textarea"
              :autosize="{ minRows: 5, maxRows: 8}"
              :maxlength="250"
              placeholder="最多5条，每条最多50个字符，分号隔开"
              v-model="ruleForm.voucherDescription"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="券核销地址"
            prop="verifyUrl"
            :rules="couponType == 'link' ? rules.verifyUrl:[{ required: false}]"
          >
            <el-input v-model="ruleForm.verifyUrl" style="width:300px;" placeholder="请输入核销url"></el-input>
          </el-form-item>
          <el-form-item
            label="兑换码类型"
            prop="exchangeType"
            v-show="couponType == 'exchange'"
            :rules="couponType == 'exchange' ? rules.exchangeType:[{ required: false}]"
          >
            <el-select v-model="ruleForm.exchangeType" placeholder="请选择">
              <el-option
                v-for="item in codeList"
                :key="item.id"
                :label="item.value"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="兑换码内容"
            prop="exchangeCode"
            v-show="couponType == 'exchange'"
            :rules="couponType == 'exchange' ? rules.exchangeCode:[{ required: false}]"
          >
            <el-input
              style="width:450px"
              type="textarea"
              :autosize="{ minRows: 5, maxRows: 8}"
              placeholder="请输入描述内容"
              v-model="ruleForm.exchangeCode"
              @blur.prevent="handleBlur"
            ></el-input>
          </el-form-item>
          <div v-for="(item,index) in ruleForm.alipassTypeList" :key="index">
            <el-form-item
              :label="item.description"
              v-show="item.fieldType === 1"
              :prop="'alipassTypeList.'+ index +'.content'"
              :rules="item.fieldType == 1 ? moreNotifyOjbectRules.moreNotifyOjbectName:[{ required: false}]"
            >
              <el-input
                v-model="item.content"
                style="width:220px;"
                placeholder="请输入内容"
                :maxlength="20"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="item.description"
              v-show="item.fieldType === 3"
              :prop="'alipassTypeList.'+ index +'.content'"
              :rules="item.fieldType == 3 ? moreNotifyOjbectRules.dateTime:[{ required: false}]"
            >
              <el-date-picker
                v-model="item.content"
                type="datetime"
                placeholder="开始日期时间"
                :editable="false"
                style="width:220px"
                @change="handleDateType(index)"
              ></el-date-picker>
            </el-form-item>
            <el-form-item
              :label="item.description"
              v-show="item.fieldType === 2"
              :prop="'alipassTypeList.'+ index +'.content'"
              :rules="item.fieldType == 2 ? moreNotifyOjbectRules.pictUrl:[{ required: false}]"
            >
              <div class="comm-dis">
                <div class="header-banner">
                  <img v-if="item.content" :src="item.content" class="avatar">
                  <span class="deletImg">
                    <span class="deletImg2" @click="handleCoverDelete(index)">
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                </div>
                <div v-show="!item.content" @click="handleUpload(index)">
                  <el-upload
                    class="avatar-uploader"
                    :action="uploadimgUrl"
                    :show-file-list="false"
                    :on-success="handleCoverSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </div>
              </div>
            </el-form-item>
          </div>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">创建</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import acouponService from "../../../service/OperationManagement/couponManagement";
import templateService from "../../../service/OperationManagement/couponTemplate";
import apiHost from "@/hostconfig/index";
import moment from "@/utils/moment";

export default {
  data() {
    return {
      fullscreenLoading: false,
      startTime: "",
      endTime: "",
      dateIndex: "",
      couponType: "",
      pictUrlType: "",
      codeList: [
        {
          id: 1,
          value: "单码"
        },
        {
          id: 2,
          value: "多码"
        }
      ],
      uploadimgUrl: `${apiHost.netImg}prefer/api/fileUploadOne`,
      alipassTypeList: [],
      ruleForm: {
        alipassTypeList: [
          {
            placeholder: "",
            fieldType: "",
            content: "",
            description: ""
          }
        ],
        platformType: 3,
        totalAmount: "",
        alipassTypeId: "",
        voucherName: "",
        brandName: "",
        publishStartTime: "",
        publishEndTime: "",
        paramList: [],
        voucherValidPeriod: {
          type: "ABSOLUTE",
          start: "",
          end: "",
          duration: "",
          unit: "DAY"
        },
        voucherQuantity: "",
        hasLimitQuantity: "0",
        perDailyQuantity: "",
        perMaxQuantity: "",
        voucherDescription: "",
        verifyUrl: "",
        exchangeType: "",
        exchangeCode: ""
      },
      timeType: [
        {
          type: "ABSOLUTE",
          label: "绝对时间"
        },
        {
          type: "RELATIVE",
          label: "相对时间"
        }
      ],
      voucherList: [],
      rules: {
        totalAmount: [
          { required: true, message: "请输入红包总数", trigger: "blur" }
        ],
        voucherName: [
          { required: true, message: "请输入优惠券名字", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        voucherQuantity: [
          { required: true, message: "请输入券总数", trigger: "blur" }
        ],
        alipassTypeId: [
          { required: true, message: "请选择优惠券类型", trigger: "change" }
        ],
        brandName: [
          { required: true, message: "请输入赞助商名字", trigger: "blur" },
          { min: 1, max: 12, message: "长度在 1 到 12 个字符", trigger: "blur" }
        ],
        hasLimitQuantity: [
          { required: true, message: "请选择次数限制", trigger: "change" }
        ],
        publishStartTime: [
          {
            type: "date",
            required: true,
            message: "请选择开始时间",
            trigger: "change"
          }
        ],
        publishEndTime: [
          {
            type: "date",
            required: true,
            message: "请选择结束时间",
            trigger: "change"
          }
        ],
        exchangeType: [
          { required: true, message: "请输入兑换码类型", trigger: "change" }
        ],
        exchangeCode: [
          { required: true, message: "请输入兑换码内容", trigger: "blur" }
        ],
        verifyUrl: [
          { required: true, message: "请输入url地址", trigger: "blur" }
        ]
      },
      moreNotifyOjbectRules: {
        moreNotifyOjbectName: [
          { required: true, message: "请输入内容", trigger: "blur" }
        ],
        dateTime: [
          {
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        pictUrl: [{ required: true, message: "请上传图片" }]
      },
      logoImg: "./static/images/1.jpg"
    };
  },
  created() {},
  mounted() {
    this.getTemplateList();
  },
  components: {},
  methods: {
    inputOnlyFix() {
      let value = event.target.value;
      value = value.replace(/[^\d,\.]/g, "");
      this.ruleForm.floorAmount = value;
    },
    handleChange() {
      if (this.ruleForm.voucherValidPeriod.type === "RELATIVE") {
        this.start = "";
        this.end = "";
      } else {
        this.duration = "";
      }
    },
    handeleType() {
      if (this.voucherList instanceof Array) {
        this.voucherList.forEach(item => {
          if (item.alipassTypeId == this.ruleForm.alipassTypeId) {
            this.couponType = item.tag;
          }
        });
      }
      this.queryAlipassTypeList(this.ruleForm.alipassTypeId);
    },
    getTemplateList() {
      const data = {};
      templateService.getTemplateList(data).then(
        response => {
          this.voucherList = response.data.alipassTypeResponseList;
        },
        response => {
          this.$message.error(response.message || "请求服务器连接失败!");
        }
      );
    },
    handleBlur() {
      if (this.ruleForm.exchangeType == 2) {
        this.ruleForm.voucherQuantity = this.ruleForm.exchangeCode.split(
          ","
        ).length;
      }
      console.log(this.ruleForm.voucherQuantity);
    },
    handleUpload(index) {
      this.pictUrlType = index;
    },
    handleCoverSuccess(res, file) {
      this.ruleForm.alipassTypeList.forEach((item, index) => {
        if (index === this.pictUrlType) {
          item.content = `http://${res.data}`;
        }
      });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/jpg" || "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleCoverDelete(indexs) {
      this.$confirm("是否删除图片?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.ruleForm.alipassTypeList.forEach((item, index) => {
            if (indexs === index) {
              item.content = "";
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已撤销"
          });
        });
    },
    queryAlipassTypeList(id) {
      const that = this;
      templateService.queryAlipassTypeList(id).then(
        response => {
          for (const key in that.ruleForm) {
            if (key !== "alipassTypeId" && key !== "voucherValidPeriod") {
              if (this.ruleForm[key] instanceof Array) {
                this.ruleForm[key] = [];
              } else {
                if (key === "platformType") {
                  this.ruleForm[key] = 3;
                } else if (key === "hasLimitQuantity") {
                  this.ruleForm[key] = "0";
                } else if (key === "voucherValidPeriod") {
                  this.ruleForm.voucherValidPeriod = {
                    type: "ABSOLUTE",
                    start: "",
                    end: "",
                    duration: "",
                    unit: "DAY"
                  };
                } else {
                  this.ruleForm[key] = "";
                }
              }
            }
          }
          if (response.data instanceof Array) {
            let array = [];
            response.data.forEach(item => {
              const obj = {
                placeholder: item.placeholder,
                fieldType: item.fieldType,
                content: "",
                description: item.description
              };
              array.push(obj);
            });
            this.ruleForm.alipassTypeList = JSON.parse(JSON.stringify(array));
          }
        },
        response => {
          this.$message.error(response.message || "请求服务器连接失败!");
        }
      );
    },
    handleStartTime() {
      this.startTime = moment(this.ruleForm.voucherValidPeriod.start).formats();
    },
    handleEndTime() {
      this.endTime = moment(this.ruleForm.voucherValidPeriod.end).formats();
    },
    handleDateType(index) {
      this.dateIndex = index;
    },
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (
          this.ruleForm.alipassTypeList &&
          this.ruleForm.alipassTypeList.length > 0
        ) {
          this.ruleForm.alipassTypeList.forEach((item, index) => {
            const obj = {
              key: item.placeholder,
              value: item.content
            };
            if (this.dateIndex === index)
            obj.value = moment(item.content).formats();
            this.ruleForm.paramList.push(obj);
          });
        }
        if (valid) {
          this.alipassTypeList = this.ruleForm.alipassTypeList;
          delete this.ruleForm.alipassTypeList;
          const data = JSON.parse(JSON.stringify(this.ruleForm));
          data.publishStartTime = moment(
            this.ruleForm.publishStartTime
          ).formats();
          data.publishEndTime = moment(this.ruleForm.publishEndTime).formats();
          if (data.voucherValidPeriod.type === "ABSOLUTE") {
            if (!data.voucherValidPeriod.start) {
              this.$message.error("开始时间不能为空！");
              return;
            }
            if (!data.voucherValidPeriod.end) {
              this.$message.error("结束时间不能为空！");
              return;
            }
            data.voucherValidPeriod.start = moment(
              this.ruleForm.voucherValidPeriod.start
            ).formats();
            data.voucherValidPeriod.end = moment(
              this.ruleForm.voucherValidPeriod.end
            ).formats();
          } else {
            if (!data.voucherValidPeriod.duration) {
              this.$message.error("输入天数不能为空！");
              return;
            }
          }
          data.voucherDescription = JSON.stringify(
            data.voucherDescription.split(";")
          );
          data.voucherValidPeriod = JSON.stringify(data.voucherValidPeriod);
          this.fullscreenLoading = true;
          acouponService.addVoucherTemplate(data).then(
            response => {
              this.$message({
                message: "保存成功",
                type: "success"
              });
              this.fullscreenLoading = false;
              const router = `/couponList?difftype=${3}`;
              this.$router.replace(router);
            },
            response => {
              this.ruleForm.alipassTypeList = this.alipassTypeList;
              this.ruleForm.paramList = [];
              this.fullscreenLoading = false;
              this.$message.error(response.msg || "请求服务器连接失败!");
            }
          );
        }
      });
    }
  },
  computed: {
    beginPickerOptions() {
      let self = this;
      return {
        disabledDate(time) {
          if (self.ruleForm.publishEndTime) {
            return time.getTime() > self.ruleForm.publishEndTime;
          }
        }
      };
    },
    endPickerOptions() {
      let self = this;
      return {
        disabledDate(time) {
          return time.getTime() < self.ruleForm.publishStartTime;
        }
      };
    }
  },
  watch: {}
};
</script>
<style>
.el-message {
  top: 150px;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
  margin: 10px 10px 0 0;
}
.header-banner {
  position: relative;
  width: 120px;
}
.deletImg {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  cursor: default;
  text-align: center;
  color: #fff;
  opacity: 0;
  font-size: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s;
}
.deletImg:hover {
  opacity: 1;
}
.deletImg2 {
  position: absolute;
  top: 40%;
  left: 45%;
}
</style>
<style lang="scss" scoped>
.add-apli-acoupon {
  .error {
    color: #f56c6c;
    font-size: 12px;
  }
  .exhibtion {
    width: 375px;
    .logo {
      width: 80px;
      height: 80px;
      margin: 0 auto;
      img {
        width: 80px;
        height: 80px;
        border-radius: 80px;
      }
    }
    .voucher-name {
      font-size: 20px;
      margin: 0 auto;
      text-align: center;
    }
    .voucher-title {
      font-size: 14px;
      text-align: center;
      position: relative;
      height: 30px;
      line-height: 30px;
    }
    .voucher-title::after {
      content: "";
      height: 1px;
      background-color: #e8e8e8;
      position: absolute;
      left: 0;
      width: 100%;
      bottom: 0;
    }
  }
  li {
    list-style-type: disc;
    line-height: 30px;
  }
}
</style>
