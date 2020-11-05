<template>
  <div class="add-apli-acoupon">
    <div class="detail-header">优惠券详情：{{statusStr}}</div>
    <div class="header" v-show="this.type">
      <div class="kuang">
        <div class="first">拟发放总金额：</div>
        <div class="second">
          {{sendAllMoney}}
          <span>元</span>
        </div>
      </div>
      <div class="kuang">
        <div class="first">已发放张数：</div>
        <div class="second">
          {{sendCount}}
          <span>张</span>
        </div>
      </div>
      <div class="kuang">
        <div class="first">已发放总金额：：</div>
        <div class="second">
          {{sendMoney}}
          <span>元</span>
        </div>
      </div>
      <div class="kuang">
        <div class="first">已使用张数：</div>
        <div class="second">
          {{userCount}}
          <span>张</span>
        </div>
      </div>
      <div class="kuang">
        <div class="first">已使用总金额：</div>
        <div class="second">
          {{useMoney}}
          <span>元</span>
        </div>
      </div>
    </div>
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
              :disabled="type"
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
              :disabled="type"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="模板总金额"
            v-show="couponType === 'COUPON'"
            :rules="couponType === 'COUPON' ? rules.alipassTypeId:[{ required: false}]"
          >
            <el-input v-model="ruleForm.totalAmount" style="width:220px;" :disabled="type"></el-input>
          </el-form-item>
          <el-form-item label="商家名称">
            <el-input
              v-model="ruleForm.brandName"
              style="width:220px;"
              placeholder="请输入商家名称"
              :maxlength="12"
              :disabled="type"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="券总数"
            v-show="couponType !== 'COUPON'"
            :rules="couponType !== 'COUPON' ? rules.voucherQuantity:[{ required: false}]"
            :disabled="type"
          >
            <el-input
              type="number"
              v-model="ruleForm.voucherQuantity"
              style="width:120px;"
              placeholder="输入整数"
              :maxlength="5"
              :disabled="type"
            ></el-input>
            <span>张(1-9999整数)</span>
          </el-form-item>
          <el-form-item label="每人领取次数限制">
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
                  :disabled="type"
                ></el-input>
                <span class="fs14">次，最多可领</span>
                <el-input
                  class="ml10 mr10 w100"
                  type="number"
                  v-model="ruleForm.perMaxQuantity"
                  style="width:110px;"
                  placeholder="输入整数"
                  :maxlength="5"
                  :disabled="type"
                ></el-input>
                <span class="fs14">次(1-50)整数</span>
              </div>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="券发放时间" required>
            <div class="float-left">
              <el-form-item>
                <el-date-picker
                  v-model="ruleForm.publishStartTime"
                  type="datetime"
                  placeholder="开始日期时间"
                  :picker-options="beginPickerOptions"
                  :editable="false"
                  :disabled="type"
                ></el-date-picker>
              </el-form-item>
            </div>
            <div class="float-left ml10 mr10">-</div>
            <div class="float-left">
              <el-form-item>
                <el-date-picker
                  v-model="ruleForm.publishEndTime"
                  type="datetime"
                  placeholder="结束日期时间"
                  :picker-options="endPickerOptions"
                  :editable="false"
                  :disabled="type"
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
                :disabled="type"
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
                <el-form-item>
                  <el-date-picker
                    v-model="ruleForm.voucherValidPeriod.start"
                    type="datetime"
                    placeholder="开始日期时间"
                    :editable="false"
                    @change="handleStartTime"
                    style="width:195px"
                    :disabled="type"
                  ></el-date-picker>
                </el-form-item>
              </div>
              <div class="float-left ml10 mr10">-</div>
              <div class="float-left">
                <el-form-item>
                  <el-date-picker
                    v-model="ruleForm.voucherValidPeriod.end"
                    type="datetime"
                    placeholder="结束日期时间"
                    :editable="false"
                    style="width:195px"
                    @change="handleEndTime"
                    :disabled="type"
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
                  :disabled="type"
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
              :disabled="type"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="券核销地址"
            :rules="couponType == 'link' ? rules.verifyUrl:[{ required: false}]"
          >
            <el-input
              v-model="ruleForm.verifyUrl"
              style="width:300px;"
              placeholder="请输入核销url"
              :disabled="type"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="兑换码类型"
            v-show="couponType == 'exchange'"
            :rules="couponType == 'exchange' ? rules.exchangeType:[{ required: false}]"
          >
            <el-select v-model="ruleForm.exchangeType" placeholder="请选择" :disabled="type">
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
            v-show="couponType == 'exchange'"
            :rules="couponType == 'exchange' ? rules.exchangeCode:[{ required: false}]"
          >
            <el-input
              style="width:450px"
              type="textarea"
              :autosize="{ minRows: 5, maxRows: 8}"
              placeholder="请输入描述内容"
              v-model="ruleForm.exchangeCode"
              :disabled="type"
              @blur.prevent="handleBlur"
            ></el-input>
          </el-form-item>
          <div v-for="(item,index) in paramList " :key="index">
            <el-form-item :label="item.key" v-show="item.fieldType === 1">
              <el-input
                v-model="item.value"
                style="width:220px;"
                placeholder="请输入内容"
                :maxlength="12"
                :disabled="type"
              ></el-input>
            </el-form-item>
            <el-form-item :label="item.key" v-show="item.fieldType === 3">
              <el-date-picker
                v-model="item.value"
                type="datetime"
                placeholder="开始日期时间"
                :editable="false"
                style="width:220px"
                :disabled="type"
              ></el-date-picker>
            </el-form-item>
            <el-form-item :label="item.key" v-show="item.fieldType === 2">
              <div class="comm-dis">
                <div class="header-banner">
                  <img v-if="item.value" :src="item.value" class="avatar">
                </div>
              </div>
            </el-form-item>
          </div>
          <el-form-item v-show="!type">
            <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
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
      id: this.$route.query.id,
      type: "",
      editType: "",
      sendAllMoney: "",
      sendCount: "",
      sendMoney: "",
      useMoney: "",
      userCount: "",
      statusStr: "",
      startTime: "",
      endTime: "",
      dateIndex: "",
      couponType: "",
      pictUrlType: "",
      paramList: [],
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
          { required: true, message: "请输入券总数", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
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
      logoImg: "./static/images/1.jpg"
    };
  },
  created() {},
  mounted() {
    this.getVoucher();
  },
  components: {},
  methods: {
    // 获取券详情
    getVoucher() {
      this.$route.query.type == 1
        ? (this.type = true)
        : (this.editType = Number(this.$route.query.type));
      acouponService.getVoucher(this.id).then(
        response => {
          this.sendAllMoney = response.sendAllMoney;
          this.sendCount = response.sendCount;
          this.sendMoney = response.sendMoney;
          this.useMoney = response.useMoney;
          this.userCount = response.userCount;
          this.statusStr = response.statusStr;
          this.paramList = response.paramList;
          this.ruleForm = JSON.parse(JSON.stringify(response.voucherTemplate));
          this.ruleForm.alipassTypeId = Number(response.alipassTypeId);
          this.ruleForm.hasLimitMoney = JSON.stringify(
            response.voucherTemplate.hasLimitMoney
          );
          this.ruleForm.hasLimitQuantity = JSON.stringify(
            response.voucherTemplate.hasLimitQuantity
          );
          this.ruleForm.hasLimitGoods = JSON.stringify(
            response.voucherTemplate.hasLimitGoods
          );
          this.ruleForm.voucherValidPeriod = JSON.parse(
            response.voucherTemplate.voucherValidPeriod
          );

          this.getTemplateList();
        },
        response => {
          this.$message.error(response.Message || "请求服务器连接失败!");
        }
      );
    },
    handleChange() {
      if (this.ruleForm.voucherValidPeriod.type === "RELATIVE") {
        this.start = "";
        this.end = "";
      } else {
        this.duration = "";
      }
    },
    getTemplateList() {
      const data = {};
      templateService.getTemplateList(data).then(
        response => {
          this.voucherList = response.data.alipassTypeResponseList;
          this.voucherList.forEach(item => {
            if (this.ruleForm.alipassTypeId == item.alipassTypeId)
              this.couponType = item.tag;
          });
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
    },
    handleStartTime() {
      this.startTime = moment(this.ruleForm.voucherValidPeriod.start).formats();
    },
    handleEndTime() {
      this.endTime = moment(this.ruleForm.voucherValidPeriod.end).formats();
    },
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
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
          acouponService.addVoucherTemplate(data).then(
            response => {
              this.$message({
                message: "保存成功",
                type: "success"
              });
              const router = `/couponList?difftype=${3}`;
              this.$router.replace(router);
            },
            response => {
              this.$message.error(response.message || "请求服务器连接失败!");
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
  .detail-header {
    margin-left: 30px;
  }
  .header {
    display: flex;
    margin: 10px 0px 10px 30px;
    .kuang {
      width: 130px;
      height: 80px;
      border: 1px solid #999;
      margin-right: 10px;
      text-align: center;
      .first {
        font-size: 12px;
        display: inline-block;
        line-height: 50px;
        height: 40px;
      }
      .second {
        font-size: 14px;
        line-height: 30px;
      }
    }
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
