<template>
    <div class="add-apli-acoupon">
        <div style="display:flex">
            <div class="pl20px pt20 pr20" style="flex:1.5">
                <el-form
                    :model="ruleForm"
                    :rules="rules"
                    ref="ruleForm"
                    label-width="200px"
                    class="demo-ruleForm"
                >
                   <el-form-item label="优惠券类型" prop="voucherType">
                        <el-select
                            v-model="ruleForm.voucherType"
                            placeholder="请选择"
                            style="width:150px"
                        >
                            <el-option
                                v-for="item in voucherList"
                                :key="item.type"
                                :label="item.label"
                                :value="item.type"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="商户pid" prop="pid">
                        <el-input v-model="ruleForm.pid" style="width:220px;"></el-input>
                    </el-form-item>
                    <el-form-item label="模板总金额" prop="totalAmount" v-show="ruleForm.voucherType === 'COUPON'" :rules="ruleForm.totalAmount === 'COUPON' ? rules.voucherType:[{ required: false}]">
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
                    <el-form-item label="出资人登陆帐号" prop="fundAccount">
                        <el-input
                            v-model="ruleForm.fundAccount"
                            style="width:220px;"
                            placeholder="请输入出资人帐号"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="券总数" prop="voucherQuantity"  v-show="ruleForm.voucherType !== 'COUPON'" :rules="ruleForm.voucherType !== 'COUPON' ? rules.voucherQuantity:[{ required: false}]">
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
                    <el-form-item label="优惠券面额" prop="amount" v-show="ruleForm.voucherType !== 'COUPON'" :rules="ruleForm.voucherType !== 'COUPON' ? rules.amount:[{ required: false}]">
                        <el-input
                            type="number"
                            v-model="ruleForm.amount"
                            style="width:220px;"
                            placeholder="数值不能小于0.1"
                            :maxlength="10"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="最低消费金额" prop="floorAmount">
                        <div>
                            <el-input
                                class="mr10 w100"
                                v-model="ruleForm.floorAmount"
                                style="width:150px;"
                                placeholder="数值不能小于0"
                                :maxlength="8"
                                @input.native="inputOnlyFix()"
                            ></el-input>
                            <span class="fs14">元，保留小数点后两位</span>
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
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">提交，去付款</el-button>
                        <!-- <el-button type="primary" @click="open">立即创建</el-button> -->
                    </el-form-item>
                </el-form>
            </div>
            <div style="flex:1">
                <div class="exhibtion">
                    <div class="logo">
                        <img :src="logoImg">
                    </div>
                    <div class="voucher-title">{{ruleForm.brandName}}</div>
                    <div class="ml20">
                        <ul>
                            <li>
                                <span>消费满{{ruleForm.floorAmount}}使用</span>
                            </li>
                            <li v-if="ruleForm.voucherValidPeriod.type === 'ABSOLUTE'">
                                <span>{{startTime}}</span>至
                                <span>{{endTime}}</span>
                            </li>
                            <li v-else>
                                领取
                                <span>{{ruleForm.voucherValidPeriod.duration}}天后失效</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import acouponService from "../../../service/OperationManagement/couponManagement";
import apiHost from "@/hostconfig/index";
import moment from "@/utils/moment";
import AppLoading from "../../OperationManagement/comm/loading.vue";
import headTop from "../../../components/headTop";

export default {
  data() {
    return {
      loadingShow: false,
      startTime: "",
      endTime: "",
      confirmUri: "",
      ruleForm: {
        pid: "",
        totalAmount: "",
        voucherType: "",
        brandName: "",
        fundAccount: "",
        publishStartTime: "",
        publishEndTime: "",
        voucherValidPeriod: {
          type: "ABSOLUTE",
          start: "",
          end: "",
          duration: "",
          unit: "DAY"
        },
        amount: "",
        floorAmount: "",
        voucherQuantity: "",
        hasLimitQuantity: "0",
        perDailyQuantity: "",
        perMaxQuantity: "",
        voucherDescription: ""
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
      voucherList: [
        {
          type: "FIX_VOUCHER",
          label: "代金券"
        },{
          type: "COUPON",
          label: "红包"
        }
      ],
      rules: {
        pid: [{ required: true, message: "请输入商户id", trigger: "blur" }],
        totalAmount: [{ required: true, message: "请输入红包总数", trigger: "blur" }],
        fundAccount: [
          { required: true, message: "请输入登陆帐号", trigger: "blur" }
        ],
        voucherQuantity: [
          { required: true, message: "请输入券总数", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
        ],
        floorAmount: [
          { required: true, message: "请输入最低消费金额", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
        ],
        voucherType: [
          { required: true, message: "请选择优惠券类型", trigger: "change" }
        ],
        brandName: [
          { required: true, message: "请输入赞助商名字", trigger: "blur" },
          { min: 1, max: 12, message: "长度在 1 到 12 个字符", trigger: "blur" }
        ],
        amount: [{ required: true, message: "请输入面额", trigger: "blur" }],
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
        ]
      },
      logoImg: "./static/images/1.jpg"
    };
  },
  created() {
      console.log(this.ruleForm.voucherDescription)
  },
  components: {
    AppLoading,
    headTop
  },
  methods: {
    inputOnlyFix() {
      let value = event.target.value;
        value = value.replace(/[^\d,\.]/g, '')
        this.ruleForm.floorAmount = value;
    },
    handleChange() {
        if(this.ruleForm.voucherValidPeriod.type === 'RELATIVE'){
            this.start = '';
            this.end = '';
        }else{
            this.duration = ""
        }
    },
    open() {
       this.$alert(`<div>点击下面付款地址去付款：<a href="${this.confirmUri}">${this.confirmUri}</a></div><div>`, '付款', {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          callback: action => {
            const router = `/couponList?difftype=${2}`;
            this.$router.replace(router);
          }
        });
    },
    handleStartTime() {
      this.startTime = moment(this.ruleForm.voucherValidPeriod.start).formats();
    },
    handleEndTime() {
      this.endTime = moment(this.ruleForm.voucherValidPeriod.end).formats();
    },
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
          console.log(valid)
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
          data.voucherDescription  =  JSON.stringify(data.voucherDescription.split(";"))
          data.voucherValidPeriod = JSON.stringify(data.voucherValidPeriod);
          acouponService.addApliVoucher(data).then(
            response => {
              this.$message({
                message: "保存成功",
                type: "success"
              });
              this.confirmUri = response.confirmUri;
              console.log(this.confirmUri)
              this.open();
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
