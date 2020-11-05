<template>
  <div class="add-acoupon">
    <div class="ml20 mr20 mt20">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="自有优惠券" name="first">
          <div style="display:flex" v-loading="loading"  element-loading-text="拼命加载中">
            <div class="pl20px pt20 pr20" style="flex:1.5">
              <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="200px"
                class="demo-ruleForm"
              >
                <el-form-item label="优惠券类型" prop="voucherType">
                  <el-select v-model="ruleForm.voucherType" placeholder="请选择">
                    <el-option
                      v-for="item in coupList"
                      :key="item.id"
                      :label="item.value"
                      :value="item.id"
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
                <el-form-item label="商家logo" prop="brandLogo">
                  <div style="display:flex">
                    <div>
                      <el-input
                        v-model="ruleForm.brandLogo"
                        style="width:200px;"
                        placeholder="图片url"
                        :maxlength="10"
                      ></el-input>
                    </div>
                    <div class="ml20">
                      <el-upload
                        class="upload-demo"
                        ref="upload"
                        :action="uploadimgUrl"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                        :limit="1"
                        :on-exceed="handleExceed"
                      >
                        <el-button size="small" type="primary">点击上传</el-button>
                      </el-upload>
                    </div>
                  </div>
                </el-form-item>
                <el-form-item label="赞助商名称" prop="brandName">
                  <el-input
                    v-model="ruleForm.brandName"
                    style="width:200px;"
                    placeholder="不超过10个字"
                    :maxlength="10"
                  ></el-input>
                </el-form-item>
                <el-form-item label="券发放有效期" required>
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
                          @change="handleEndTime"
                          style="width:195px"
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
                <el-form-item label="优惠券面额" prop="amount">
                  <el-input
                    type="number"
                    v-model="ruleForm.amount"
                    style="width:200px;"
                    placeholder="输入整数"
                    :maxlength="10"
                  ></el-input>
                </el-form-item>
                <el-form-item label="使用条件" prop="hasLimitMoney">
                  <el-radio-group v-model="ruleForm.hasLimitMoney">
                    <div>
                      <el-radio label="0">无限制</el-radio>
                    </div>
                    <div>
                      <el-radio label="1" class="mr10">单笔消费满</el-radio>
                      <el-input
                        class="mr10 w100"
                        type="number"
                        v-model="ruleForm.floorAmount"
                        style="width:110px;"
                        placeholder="输入整数"
                        :maxlength="10"
                      ></el-input>
                      <span class="fs14">元，使用(1-9999)整数</span>
                    </div>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="单人领取次数限制" prop="hasLimitQuantity">
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
                <el-form-item label="券总数" prop="voucherQuantity">
                  <el-input
                    type="number"
                    v-model="ruleForm.voucherQuantity"
                    style="width:120px;"
                    placeholder="输入整数"
                    :maxlength="5"
                  ></el-input>
                </el-form-item>
                <el-form-item label="限定商品" prop="hasLimitGoods">
                  <el-radio-group v-model="ruleForm.hasLimitGoods">
                    <div>
                      <el-radio label="0">无限制</el-radio>
                    </div>
                    <div class="mt10">
                      <el-radio label="1" class="mr10">部分商品</el-radio>
                    </div>
                  </el-radio-group>
                </el-form-item>
                <el-form-item prop="goods" v-show="ruleForm.hasLimitGoods == 1">
                  <el-input
                    style="width:450px"
                    type="textarea"
                    :autosize="{ minRows: 4, maxRows: 8}"
                    :maxlength="100"
                    placeholder="最多输入50个商品ID，同一订单中有多个商品，不叠加优惠,商品Id以逗号隔开"
                    v-model="ruleForm.goods"
                  ></el-input>
                </el-form-item>
                <el-form-item label="券描述">
                  <el-input
                    style="width:450px"
                    type="textarea"
                    :autosize="{ minRows: 5}"
                    :maxlength="100"
                    placeholder="请输入描述内容"
                    v-model="ruleForm.voucherIntroduction"
                  ></el-input>
                </el-form-item>
                <el-form-item label="使用说明" prop="voucherDescription">
                  <el-input
                    style="width:450px"
                    type="textarea"
                    :autosize="{ minRows: 5}"
                    :maxlength="255"
                    placeholder="请输入描述内容"
                    v-model="ruleForm.voucherDescription"
                  ></el-input>
                </el-form-item>
                <el-form-item label="通知类型" prop="notifyType">
                  <el-select v-model="ruleForm.notifyType" placeholder="请选择">
                    <el-option
                      v-for="item in noticList"
                      :key="item.id"
                      :label="item.value"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="券核销地址"  prop="verifyUrl" :rules="ruleForm.voucherType == 3 ? rules.verifyUrl:[{ required: false}]">
                  <el-input
                    v-model="ruleForm.verifyUrl"
                    style="width:300px;"
                    placeholder="请输入核销url"
                  ></el-input>
                </el-form-item>
                <el-form-item label="短信模版ID"  prop="notifyId" v-show="ruleForm.notifyType === 'sms'" :rules="ruleForm.notifyType == 'sms' ? rules.notifyId:[{ required: false}]">
                  <el-input
                    v-model="ruleForm.notifyId"
                    style="width:300px;"
                    placeholder="请输入模版ID"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="兑换码类型"
                  prop="exchangeType"
                  v-show="ruleForm.voucherType == 2"
                  :rules="ruleForm.voucherType == 2 ? rules.exchangeType:[{ required: false}]"
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
                  v-show="ruleForm.voucherType == 2"
                  :rules="ruleForm.voucherType == 2 ? rules.exchangeCode:[{ required: false}]"
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
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div style="flex:1">
              <div class="exhibtion">
                <div class="logo">
                  <img :src="ruleForm.brandLogo">
                </div>
                <div class="voucher-name">{{ruleForm.voucherName}}</div>
                <div class="voucher-title">{{ruleForm.brandName}}</div>
                <div class="ml20">
                  <ul>
                    <li v-if="ruleForm.hasLimitMoney === '0'">
                      <span>无限制</span>
                    </li>
                    <li v-else>
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
        </el-tab-pane>
        <el-tab-pane label="支付宝优惠券" name="second">
          <add-apli-coupon></add-apli-coupon>
        </el-tab-pane>
        <el-tab-pane label="支付宝模版券" name="third">
          <apli-template-coupon></apli-template-coupon>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import acouponService from "../../../service/OperationManagement/couponManagement";
import apiHost from "@/hostconfig/index";
import moment from "@/utils/moment";
import AppLoading from "../../OperationManagement/comm/loading.vue";
import addApliCoupon from "../couponManagement/add-apli-coupon";
import apliTemplateCoupon from "../couponManagement/apli-template-coupon";

export default {
  data() {
    return {
      loadingShow: false,
      difftype: this.$route.query.difftype,
      activeName: "first",
      startTime: "",
      endTime: "",
      loading: false,
      coupList: [
        {
          id: 1,
          value: "代金券"
        },
        {
          id: 2,
          value: "兑换券"
        },
        {
          id: 3,
          value: "跳转券"
        }
      ],
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
       noticList: [
        {
          id: 'sms',
          value: "短信通知"
        },
        {
          id: '0',
          value: "不通知"
        }
      ],
      ruleForm: {
        voucherType: "",
        voucherName: "",
        brandLogo: "",
        brandName: "",
        publishStartTime: "",
        publishEndTime: "",
        uploadimgUrl: `${apiHost.netImg}prefer/api/fileUploadOne`,
        voucherValidPeriod: {
          type: "ABSOLUTE",
          start: "",
          end: "",
          duration: "",
          unit: ""
        },
        amount: "",
        floorAmount: "",
        voucherQuantity: "",
        hasLimitMoney: "0",
        hasLimitQuantity: "0",
        perDailyQuantity: "",
        perMaxQuantity: "",
        hasLimitGoods: "0",
        goods: "",
        voucherDescription: "",
        notifyType: '0',
        verifyUrl: '',
        notifyId: '',
        voucherIntroduction: '',
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
      uploadimgUrl: `${apiHost.netImg}prefer/api/fileUploadOne`,
      rules: {
        voucherType: [
          { required: true, message: "请输入优惠券类型", trigger: "change" }
        ],
        exchangeType: [
          { required: true, message: "请输入兑换码类型", trigger: "change" }
        ],
        exchangeCode: [
          { required: true, message: "请输入兑换码内容", trigger: "blur" }
        ],
        voucherQuantity: [
          { required: true, message: "请输入券总数", trigger: "blur" }
        ],
        notifyId: [
          { required: true, message: "请输入短信模版", trigger: "blur" }
        ],
        verifyUrl: [
          { required: true, message: "请输入url地址", trigger: "blur" }
        ],
        voucherName: [
          { required: true, message: "请输入优惠券名字", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        brandLogo: [
          { required: true, message: "url不能为空", trigger: "change" }
        ],
        brandName: [
          { required: true, message: "请输入赞助商名字", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
        ],
        amount: [{ required: true, message: "请输入面额", trigger: "blur" }],
        hasLimitMoney: [
          { required: true, message: "请选择输入条件", trigger: "change" }
        ],
        hasLimitQuantity: [
          { required: true, message: "请选择次数限制", trigger: "change" }
        ],
        hasLimitGoods: [
          { required: true, message: "请选择限定商品类型", trigger: "change" }
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
      }
    };
  },
  created() {
    if (this.difftype == 1) {
      this.activeName = "first";
    } else if(this.difftype == 2) {
      this.activeName = "second";
    } else{
      this.activeName = "third";
    }
  },
  components: {
    AppLoading,
    addApliCoupon,
    apliTemplateCoupon
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleStartTime() {
      this.startTime = moment(this.ruleForm.voucherValidPeriod.start).formats();
    },
    handleEndTime() {
      this.endTime = moment(this.ruleForm.voucherValidPeriod.end).formats();
    },
    // 上传文件相关
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制上传一张图片！`);
    },
    // 移除文件
    handleRemove(file, fileList) {
      this.$refs.upload.clearFiles();
      this.ruleForm.brandLogo = "";
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 第二类型第一行上传文件成功
    handleAvatarSuccess(response, file) {
      this.ruleForm.brandLogo = `https://${response.data}`;
    },
    beforeAvatarUpload(file) {
      const isLt10M = file.size / 1024 / 1024 < 10;
      const isimg = file.type.indexOf("image") > -1;
      if (!isimg) {
        this.$message.error("只能上传图片!");
      }
      if (!isLt10M) {
        this.$message.error("上传文件不能超过 10MB!");
      }
      return isLt10M && isimg;
    },
    handleBlur() {
      if (this.ruleForm.exchangeType == 2) {
        this.ruleForm.voucherQuantity = this.ruleForm.exchangeCode.split(
          ","
        ).length;
      }
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
          data.voucherValidPeriod = JSON.stringify(data.voucherValidPeriod);
          if (this.ruleForm.voucherType == 1) {
            data.voucherType = 1;
          } else if(this.ruleForm.voucherType == 2) {
            data.voucherType = 2;
            if (this.ruleForm.exchangeType == 2) {
              data.voucherQuantity = this.ruleForm.exchangeCode.split(
                ","
              ).length;
            }
          } else{
            data.voucherType = 3;
          }
         this.loading = true;
          acouponService.addVoucherTemplate(data).then(
            response => {
             this.loading = false;
              this.$message({
                message: "保存成功",
                type: "success"
              });
              const router = `/couponList?difftype=${1}`;
              this.$router.replace(router);
            },
            response => {
              this.loading = false;
              this.$message.error(response.sub_msg || "请求服务器连接失败!");
            }
          );
        }
      });
    },
    open() {
      this.$msgbox({
        title: "消息",
        message: h("p", null, [
          h("span", null, "内容可以是 "),
          h("i", { style: "color: teal" }, "VNode")
        ]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 3000);
          } else {
            done();
          }
        }
      }).then(action => {
        this.$message({
          type: "info",
          message: "action: " + action
        });
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
.add-acoupon {
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
