
<template>
    <div class="coupon-list">
        <div class="pl30 pt20">
            <template>
                <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                    <el-tab-pane label="自有优惠券" name="first">
                        <div class="content">
                            <el-row class="lh40 mt10">
                                <el-col :span="24">
                                    <div class="float-left">优惠券名称：</div>
                                    <div class="float-left mr10 w120">
                                        <el-input
                                            placeholder="请输入内容"
                                            v-model="searchParams.voucherName"
                                            clearable
                                        ></el-input>
                                    </div>
                                    <div class="float-left">
                                        <span>券发放有效期:</span>
                                        <el-date-picker
                                            class="w190"
                                            v-model="searchParams.publishStartTime"
                                            type="datetime"
                                            placeholder="开始日期时间"
                                            :picker-options="beginPickerOptions"
                                            :editable="false"
                                        ></el-date-picker>
                                        <span>-</span>
                                        <el-date-picker
                                            class="w190"
                                            v-model="searchParams.publishEndTime"
                                            type="datetime"
                                            placeholder="结束日期时间"
                                            :picker-options="endPickerOptions"
                                            :editable="false"
                                        ></el-date-picker>
                                    </div>
                                    <div class="float-left ml10">
                                        <el-button type="primary" @click="handleConfirm">搜索</el-button>
                                    </div>
                                </el-col>
                            </el-row>
                            <div class="mt20">
                                <el-button type="primary" @click="handleAdd">新建优惠券</el-button>
                            </div>
                        </div>
                        <div class="table">
                            <div class="tableList">
                                <el-table :data="tableData">
                                  <el-table-column prop="templateId" label="券id" min-width="80" align="center"></el-table-column>
                                    <el-table-column
                                        prop="voucherName"
                                        label="优惠券名称"
                                        min-width="50"
                                        align="center"
                                    ></el-table-column>
                                    <el-table-column
                                        prop="voucherTypeStr"
                                        label="类型"
                                        min-width="50"
                                        align="center"
                                    ></el-table-column>
                                    <el-table-column
                                        prop="amount"
                                        label="面值"
                                        min-width="50"
                                        align="center"
                                    ></el-table-column>
                                    <el-table-column label="券发放有效期" min-width="100" align="center">
                                        <template slot-scope="scope" style="text-align:center">
                                            <div>{{scope.row.publishStartTime}}至{{scope.row.publishEndTime}}</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="条件" min-width="50" align="center">
                                        <template slot-scope="scope" style="text-align:center">
                                            <div
                                                v-if="scope.row.floorAmount"
                                            >满{{scope.row.floorAmount}}元使用</div>
                                            <div v-else>无限制</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        prop="voucherQuantity"
                                        label="发行总量"
                                        min-width="50"
                                        align="center"
                                    ></el-table-column>
                                    <el-table-column
                                        prop="sendCount"
                                        label="已领数量"
                                        min-width="50"
                                        align="center"
                                    ></el-table-column>
                                    <el-table-column
                                        prop="statusStr"
                                        label="全部"
                                        min-width="80"
                                        align="center"
                                        :render-header="renderHeaderOne"
                                    ></el-table-column>
                                    <el-table-column label="操作" min-width="100" align="center">
                                        <template slot-scope="scope" style="text-align:center">
                                            <div style="display:flex;justify-content: center">
                                                <el-button
                                                    type="text"
                                                    @click="handleConfigure(scope.row.templateId)"
                                                >查看</el-button>
                                                <el-button
                                                    type="text"
                                                    @click="handleEditor(scope.row.templateId)"
                                                    v-show="scope.row.statusStr !== '已结束'"
                                                >编辑</el-button>
                                                <el-button
                                                    type="text"
                                                    @click="handleEnd(scope.row.templateId)"
                                                    v-show="scope.row.statusStr !== '已结束'"
                                                >结束</el-button>
                                                <el-button
                                                    type="text"
                                                    @click="handleDel(scope.row.templateId)"
                                                    v-show="scope.row.statusStr === '已结束'"
                                                >删除</el-button>
                                            </div>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                            <div class="foot-page">
                                <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page="searchParams.pageNo"
                                    :page-sizes="[10,20, 30, 50, 100]"
                                    :page-size="searchParams.pageSize"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="totalSize"
                                ></el-pagination>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="支付宝优惠券" name="second">
                        <apli-coupon-list></apli-coupon-list>
                    </el-tab-pane>
                    <el-tab-pane label="支付宝模版券" name="third">
                        <template-coupon-list></template-coupon-list>
                    </el-tab-pane>
                </el-tabs>
            </template>
        </div>
    </div>
</template>
<script>
import acouponService from "../../../service/OperationManagement/couponManagement";
import apiHost from "@/hostconfig/index";
import moment from "@/utils/moment";
import AppLoading from "../../OperationManagement/comm/loading.vue";
import headTop from "../../../components/headTop";
import apliCouponList from "../couponManagement/apli-coupon-list";
import templateCouponList from "../couponManagement/template-coupon-list";

export default {
  data() {
    return {
      loadingShow: false,
      difftype: this.$route.query.difftype || 1,
      activeName: "first",
      tableData: [],
      value: "",
      searchParams: {
        status: "",
        publishStartTime: "",
        publishEndTime: "",
        voucherName: "",
        pageNo: 1,
        pageSize: 10
      },
      statusList: [
        {
          value: "1",
          label: "代金券"
        }
      ],
      totalSize: 0
    };
  },
  created() {
    this.getTableList();
    if(this.difftype == 1 ){
        this.activeName = "first";
    } else if(this.difftype == 2){
        this.activeName = "second";
        }
    else {
        this.activeName = "third";
    }
  },
  components: {
      apliCouponList,
      templateCouponList,
  },
  methods: {
    renderHeaderOne(createElement) {
      let self = this;
      return createElement("div", {
        domProps: {
          innerHTML: `<select type="text" class="select">
                                <option value ="全部">全部</option>
                                <option value ="发放中">发放中</option>
                                <option value ="已领取">已领取</option>
                                <option value ="已结束">已结束</option>
                                </select>`
        },
        style: {
          width: "110px",
          height: "40px"
        },
        on: {
          change: function(e) {
            const status = document.getElementsByClassName("select")[0].value;
            if (status === "发放中") {
              self.searchParams.status = 1;
            } else if (status === "已领取") {
              self.searchParams.status = 2;
            } else if (status === "已结束") {
              self.searchParams.status = 3;
            } else {
              self.searchParams.status = "";
            }
            self.searchParams.pageNo = 1;
            self.getTableList();
          }
        }
      });
    },
    //tab切换事件
    handleClick(){

    },
    // 获取表格列表
    getTableList() {
      const data = this.handparams();
      acouponService.getVoucherList(data).then(
        response => {
          if (response.data instanceof Array) {
            this.tableData = response.data;
          } else {
            this.tableData = [];
          }
          this.totalSize = response.totalSize;
        },
        response => {
          this.$message.error(response.Message || "请求服务器连接失败!");
        }
      );
    },
    // 结束优惠券
    endCoupon(id) {
      acouponService.endVoucher(id).then(
        response => {
          this.getTableList();
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        },
        response => {
          this.$message.error(response.Message || "请求服务器连接失败!");
        }
      );
    },
    // 删除优惠券
    deleteCoupon(id) {
      acouponService.delVoucher(id).then(
        response => {
          this.getTableList();
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        },
        response => {
          this.$message.error(response.Message || "请求服务器连接失败!");
        }
      );
    },
    // 确认
    handleConfirm() {
      this.searchParams.pageNo = 1;
      this.getTableList();
    },
    // 编辑
    handleEditor(id) {
      const router = `./detailCoupon?id=${id}&type=${2}`;
      this.$router.push(router);
    },
    // 新建会议
    handleAdd() {
      const router = `./addCoupon?difftype=${1}`;
      this.$router.push(router);
    },
    // 查看详情
    handleConfigure(id) {
      const router = `./detailCoupon?id=${id}&type=${1}`;
      this.$router.push(router);
    },
    // 删除
    handleDel(id) {
      this.$confirm("此操作将删除该优惠券, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteCoupon(id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //结束
    handleEnd(id) {
      this.$confirm("此操作将结束该优惠券, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.endCoupon(id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消结束"
          });
        });
    },
    handleSizeChange(val) {
      this.searchParams.pageSize = val;
      this.getTableList();
    },
    handleCurrentChange(val) {
      this.searchParams.pageNo = val;
      this.getTableList();
    },
    //参数处理
    handparams() {
      const self = this;
      const params = JSON.parse(JSON.stringify(self.searchParams));
      for (const i in params) {
        if (params[i] === "") {
          delete params[i];
        }
      }
      if (params.publishStartTime) {
        params.publishStartTime = moment(params.publishStartTime).formats();
      }
      if (params.publishEndTime) {
        params.publishEndTime = moment(params.publishEndTime).formats();
      }
      return params;
    }
  },
  computed: {
    beginPickerOptions() {
      let self = this;
      return {
        disabledDate(time) {
          if (self.searchParams.publishEndTime) {
            return time.getTime() > self.searchParams.publishEndTime;
          }
        }
      };
    },
    endPickerOptions() {
      let self = this;
      return {
        disabledDate(time) {
          return time.getTime() < self.searchParams.publishStartTime;
        }
      };
    }
  },
  watch: {}
};
</script>
<style>
.select {
  /* width: 100px;
    height: 30px;
    background-color: #fff;
    line-height: 30px; */
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: none;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100px;
}
</style>

<style lang="scss" scoped>
.w190 {
  width: 195px;
}
.bgcolor {
  color: #999 !important;
}
.coupon-list {
  .table {
    margin: 20px 30px 10px 0;
    .foot-page {
      float: right;
      margin-top: 10px;
      margin-bottom: 50px;
    }
  }
  .detail-content {
    cursor: pointer;
    color: #20a0ff;
  }
}
</style>


