<template>
  <div class="detail-acoupon">
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
      <div class="pl20px pt20 pr20" style="flex:1.5">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="200px"
          class="demo-ruleForm"
        >
          <el-form-item label="优惠券类型" prop="voucherType">
            <el-select v-model="ruleForm.voucherType" placeholder="请选择" :disabled="type">
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
              style="width:200px;"
              placeholder="不超过10个字"
              :maxlength="10"
              :disabled="type"
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
                  :disabled="type"
                ></el-input>
              </div>
              <div class="ml20" v-show="!type">
                <el-upload
                  class="upload-demo"
                  ref="upload2"
                  :action="uploadimgUrl"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                  :limit="1"
                  :on-exceed="handleExceed"
                >
                  <el-button size="small" type="primary" disabled>点击上传</el-button>
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
              :disabled="type"
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
                  :disabled="type"
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
          <el-form-item label="优惠券面额" prop="amount">
            <el-input
              type="number"
              v-model="ruleForm.amount"
              style="width:200px;"
              placeholder="输入整数"
              :maxlength="10"
              :disabled="type"
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
                  class="mr10"
                  type="number"
                  v-model="ruleForm.floorAmount"
                  style="width:110px;"
                  placeholder="输入整数"
                  :maxlength="5"
                  :disabled="type"
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
                  class="mr10"
                  type="number"
                  v-model="ruleForm.perDailyQuantity"
                  style="width:110px;"
                  placeholder="输入整数"
                  :maxlength="5"
                  :disabled="type"
                ></el-input>
                <span class="fs14">次，最多可领</span>
                <el-input
                  class="ml10 mr10"
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
          <el-form-item label="券总数" prop="voucherQuantity">
            <el-input
              type="number"
              v-model="ruleForm.voucherQuantity"
              style="width:110px;"
              placeholder="输入整数"
              :maxlength="5"
              v-if="editType === 2"
            ></el-input>
            <el-input
              type="number"
              v-model="ruleForm.voucherQuantity"
              style="width:110px;"
              placeholder="输入整数"
              :maxlength="5"
              :disabled="type"
              v-else
            ></el-input>
            <span>张(1-9999整数)</span>
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
              :disabled="type"
              style="width:450px"
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 8}"
              :maxlength="100"
              placeholder="最多输入50个商品ID，同一订单中有多个商品，不叠加优惠,商品Id以逗号隔开"
              v-model="ruleForm.goods"
            ></el-input>
          </el-form-item>
          <el-form-item label="使用说明" prop="voucherDescription">
            <el-input
              style="width:450px"
              type="textarea"
              :autosize="{ minRows: 5, maxRows: 8}"
              :maxlength="255"
              placeholder="请输入描述内容"
              v-model="ruleForm.voucherDescription"
              v-if="editType === 2"
            ></el-input>
            <el-input
              style="width:450px"
              type="textarea"
              :autosize="{ minRows: 5, maxRows: 8}"
              :maxlength="255"
              placeholder="请输入描述内容"
              v-model="ruleForm.voucherDescription"
              :disabled="type"
              v-else
            ></el-input>
          </el-form-item>
          <el-form-item v-show="!type">
            <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
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
                <span>{{ruleForm.voucherValidPeriod.start}}</span>至
                <span>{{ruleForm.voucherValidPeriod.end}}</span>
              </li>
              <li v-else>
                领取
                <span>{{ruleForm.voucherValidPeriod.duration}}天后失效</span>
              </li>
            </ul>
          </div>
          <!-- <div class="ml20">使用说明</div> -->
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
      id: this.$route.query.id,
      type: "",
      editType: "",
      sendAllMoney: "",
      sendCount: "",
      sendMoney: "",
      useMoney: "",
      userCount: "",
      statusStr: "",
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
      ruleForm: {
        voucherType: "代金券",
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
        hasLimitMoney: "",
        hasLimitQuantity: "",
        perDailyQuantity: "",
        perMaxQuantity: "",
        hasLimitGoods: "",
        goods: "",
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
      uploadimgUrl: `${apiHost.netImg}prefer/api/fileUploadOne`,
      rules: {
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
        voucherQuantity: [
           { required: true, message: "请输入券总数", trigger: "blur" },
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
      }
    };
  },
  created() {
    this.getVoucher();
  },
  components: {
    AppLoading,
    headTop
  },
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
          this.ruleForm = JSON.parse(JSON.stringify(response.voucherTemplate));
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
        },
        response => {
          this.$message.error(response.Message || "请求服务器连接失败!");
        }
      );
    },
    // 上传文件相关
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制上传一张图片！`);
    },
    // 移除文件
    handleRemove(file, fileList) {
      this.$refs.upload.clearFiles();
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
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.ruleForm));
          data.voucherValidPeriod = JSON.stringify(data.voucherValidPeriod);
          acouponService.upVoucher(data).then(
            response => {
              this.$message({
                message: "保存成功",
                type: "success"
              });
              const router = `/couponList`;
              this.$router.replace(router);
            },
            response => {
              this.$message.error(response.sub_msg || "请求服务器连接失败!");
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
