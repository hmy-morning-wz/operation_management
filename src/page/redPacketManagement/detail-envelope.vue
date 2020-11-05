<template>
    <div class="detail-acoupon">
        <div class="detail-header">优惠券详情：{{statusStr}}</div>
        <div class="header" v-show="this.type">
            <div class="kuang">
                <div class="first">拟发放总金额：</div>
                <div class="second">
                    {{totalAmount}}
                    <span>元</span>
                </div>
            </div>
            <div class="kuang">
                <div class="first">已发放张数：</div>
                <div class="second">
                    {{publishCount}}
                    <span>张</span>
                </div>
            </div>
            <div class="kuang">
                <div class="first">已发放总金额：：</div>
                <div class="second">
                    {{publishAmount}}
                    <span>元</span>
                </div>
            </div>
            <div class="kuang">
                <div class="first">已使用张数：</div>
                <div class="second">
                    {{usedCount}}
                    <span>张</span>
                </div>
            </div>
            <div class="kuang">
                <div class="first">已使用总金额：</div>
                <div class="second">
                    {{usedAmount}}
                    <span>元</span>
                </div>
            </div>
        </div>
        <div style="display:flex">
            <div class="pl20px pt20 pr20" style="flex:1.5">
                <el-form
                    :model="ruleForm"
                    :rules="rules"
                    ref="ruleForm"
                    label-width="220px"
                    class="demo-ruleForm"
                >
                    <el-form-item label="商户pid" prop="pid">
                        <el-input
                            v-model="ruleForm.pid"
                            style="width:220px;"
                            :disabled="type"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="模板总金额" prop="totalAmount" v-show="ruleForm.voucherType === 'COUPON'">
                        <el-input v-model="ruleForm.totalAmount" style="width:220px;"    :disabled="type"></el-input>
                    </el-form-item>
                    <el-form-item label="优惠券Id" prop="pid">
                        <el-input
                            v-model="ruleForm.templateId"
                            style="width:260px;"
                            :disabled="type"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="商家名称" prop="brandName">
                        <el-input
                            v-model="ruleForm.brandName"
                            style="width:220px;"
                            placeholder="不超过10个字"
                            :disabled="type"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="出资人登陆帐号" prop="fundAccount">
                        <el-input
                            v-model="ruleForm.fundAccount"
                            style="width:220px;"
                            placeholder="不超过10个字"
                            :disabled="type"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="券总数" prop="voucherQuantity"  v-show="ruleForm.voucherType !== 'COUPON'">
                        <el-input
                            type="number"
                            v-model="ruleForm.voucherQuantity"
                            style="width:120px;"
                            placeholder="输入整数"
                            :maxlength="10"
                            :disabled="type"
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
                                    style="width:130px;"
                                    placeholder="请输入整数"
                                    :maxlength="5"
                                    :disabled="type"
                                ></el-input>
                                <span class="fs14">次，最多可领</span>
                                <el-input
                                    class="ml10 mr10 w100"
                                    type="number"
                                    v-model="ruleForm.perMaxQuantity"
                                    style="width:130px;"
                                    placeholder="请输入整数"
                                    :maxlength="5"
                                    :disabled="type"
                                ></el-input>
                                <span class="fs14">次(1-50)整数</span>
                            </div>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="优惠券类型" prop="voucherType">
                        <el-select
                            v-model="ruleForm.voucherType"
                            placeholder="请选择"
                            style="width:150px"
                            :disabled="type"
                        >
                            <el-option
                                v-for="item in voucherList"
                                :key="item.type"
                                :label="item.label"
                                :value="item.type"
                            ></el-option>
                        </el-select>
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
                                    v-if="editType === 2 && status === 'I'"
                                ></el-date-picker>
                                <el-date-picker
                                    v-model="ruleForm.publishStartTime"
                                    type="datetime"
                                    placeholder="开始日期时间"
                                    :picker-options="beginPickerOptions"
                                    :editable="false"
                                    :disabled="type"
                                    v-else
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
                                    v-if="editType === 2 && (status === 'S' || status === 'I')"
                                ></el-date-picker>
                                <el-date-picker
                                    v-model="ruleForm.publishEndTime"
                                    type="datetime"
                                    placeholder="结束日期时间"
                                    :picker-options="endPickerOptions"
                                    :editable="false"
                                    :disabled="type"
                                    v-else
                                ></el-date-picker>
                            </el-form-item>
                        </div>
                    </el-form-item>
                    <el-form-item label="优惠券面额" prop="amount"  v-show="ruleForm.voucherType !== 'COUPON'">
                        <el-input
                            type="number"
                            v-model="ruleForm.amount"
                            style="width:200px;"
                            placeholder="输入整数"
                            :maxlength="10"
                            :disabled="type"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="优惠券名称" prop="voucherName">
                        <el-input
                            v-model="ruleForm.voucherName"
                            style="width:240px;"
                            placeholder="输入优惠券名称"
                            :disabled="type"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="券标语" v-show="editType === 2">
                        <el-input
                            v-model="ruleForm.slogan"
                            style="width:200px;"
                            placeholder="输入字符不能超过12"
                            :maxlength="12"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="最低消费金额" prop="floorAmount">
                        <div>
                            <el-input
                                class="mr10 w100"
                                type="number"
                                v-model="ruleForm.floorAmount"
                                style="width:150px;"
                                placeholder="输入整数"
                                :maxlength="5"
                                :disabled="type"
                            ></el-input>
                            <span class="fs14">元，保留小数点后两位</span>
                        </div>
                    </el-form-item>
                    <el-form-item label="券使用有效期" required v-if="editType === 2 && status === 'I'">
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
                    <el-form-item label="券使用有效期" required v-else>
                        <div class="float-left">
                            <el-select
                                v-model="ruleForm.voucherValidPeriod.type"
                                placeholder="请选择"
                                style="width:150px"
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
                                <el-form-item prop="voucherValidPeriod.start">
                                    <el-date-picker
                                        v-model="ruleForm.voucherValidPeriod.start"
                                        type="datetime"
                                        placeholder="开始日期时间"
                                        :editable="false"
                                        :disabled="type"
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
                            :maxlength="100"
                            placeholder="请输入描述内容"
                            v-model="ruleForm.voucherDescription"
                            :disabled="type"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            type="primary"
                            @click="submitForm('ruleForm')"
                            v-show="!type"
                        >保存</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div style="flex:1">
                <div class="exhibtion">
                    <div class="logo">
                        <img :src="logoImg">
                    </div>
                    <div class="voucher-name">{{ruleForm.voucherName}}</div>
                    <div class="voucher-title">{{ruleForm.brandName}}</div>
                    <div class="ml20">
                        <ul>
                            <li>
                                <span>消费满{{ruleForm.floorAmount}}使用</span>
                            </li>
                            <li v-if="ruleForm.voucherValidPeriod.type === 'ABSOLUTE'">
                                <span>{{ruleForm.voucherValidPeriod.start}}</span>至
                                <span>{{ruleForm.voucherValidPeriod.end}}</span>
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
import acouponService from "../../service/OperationManagement/couponManagement";
import apiHost from "@/hostconfig/index";
import moment from "@/utils/moment";

export default {
  data() {
    return {
      loadingShow: false,
      id: this.$route.query.id,
      type: "",
      editType: "",
      publishAmount: "",
      publishCount: "",
      usedAmount: "",
      usedCount: "",
      totalAmount: "",
      statusStr: "",
      status: "",
      ruleForm: {
        pid: "",
        voucherType: "",
        totalAmount: "",
        voucherName: "",
        brandName: "",
        fundAccount: "",
        publishStartTime: "",
        publishEndTime: "",
        voucherValidPeriod: {
          type: "ABSOLUTE",
          start: "",
          end: "",
          duration: "",
          unit: "day"
        },
        amount: "",
        floorAmount: "",
        voucherQuantity: "",
        hasLimitQuantity: "0",
        perDailyQuantity: "",
        perMaxQuantity: "",
        voucherDescription: "",
        slogan: ""
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
        },
        {
          type: "COUPON",
          label: "红包"
        }
      ],
      rules: {
        pid: [{ required: true, message: "请输入商户id", trigger: "blur" }],
        fundAccount: [
          { required: true, message: "请输入登陆帐号", trigger: "blur" }
        ],
        voucherQuantity: [
          { required: true, message: "请输入券总数", trigger: "blur" }
        ],
        floorAmount: [
          { required: true, message: "请输入最低消费金额", trigger: "blur" },
        ],
        voucherType: [
          { required: true, message: "请选择优惠券类型", trigger: "change" }
        ],
        voucherName: [
          { required: true, message: "请输入优惠券名字", trigger: "blur" },
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
            required: true,
            message: "请选择开始时间",
            trigger: "change"
          }
        ],
        publishEndTime: [
          {
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
    this.getApliVoucher();
  },
  components: {
  },
  methods: {
    handleChange() {
      if (this.ruleForm.voucherValidPeriod.type === "RELATIVE") {
        this.start = "";
        this.end = "";
      } else {
        this.duration = "";
      }
    },
    // 获取券详情
    getApliVoucher() {
      this.$route.query.type == 1
        ? (this.type = true)
        : (this.editType = Number(this.$route.query.type));
      acouponService.getApliVoucher(this.id).then(
        response => {
          this.ruleForm = JSON.parse(
            JSON.stringify(response.alipayVoucherTemplate)
          );
          this.publishAmount = response.publishAmount;
          this.publishCount = response.publishCount;
          this.usedAmount = response.usedAmount;
          this.usedCount = response.usedCount;
          this.totalAmount = response.totalAmount;
          this.statusStr = response.statusStr;
          this.status = response.status;
          this.ruleForm.hasLimitQuantity = JSON.stringify(
            response.alipayVoucherTemplate.hasLimitQuantity
          );
          this.ruleForm.voucherValidPeriod = JSON.parse(
            response.alipayVoucherTemplate.voucherValidPeriod
          );
        },
        response => {
          this.$message.error(response.Message || "请求服务器连接失败!");
        }
      );
    },
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          const data = {
            publishEndTime: moment(this.ruleForm.publishEndTime).formats(),
            aliTemplateId: this.ruleForm.templateId,
            slogan: this.ruleForm.slogan
          };
          if (this.status === "I") {
            data.publishStartTime = moment(this.ruleForm.publishStartTime).formats();
            this.ruleForm.voucherValidPeriod.start = moment(this.ruleForm.voucherValidPeriod.start).formats();
            this.ruleForm.voucherValidPeriod.end = moment(this.ruleForm.voucherValidPeriod.end).formats();
            data.voucherValidPeriod = JSON.stringify(this.ruleForm.voucherValidPeriod);
          }
          acouponService.editApliVoucher(data).then(
            response => {
              this.$message({
                message: "保存成功",
                type: "success"
              });
              const router = `/couponList?difftype=${2}`;
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
  watch: {
    loadingShow(val) {
      return val;
    }
  }
};
</script>
<style>
.el-message {
  top: 150px;
}
</style>

<style lang="scss" scoped>
.detail-acoupon {
  margin-top: 30px;
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
