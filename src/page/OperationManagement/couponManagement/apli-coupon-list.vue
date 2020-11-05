
<template>
   <div class="apli-coupon-list">
         <div>
             <div class="content">
                 <el-row class="lh40 mt10">
                    <el-col :span="24">
                        <div class="float-left">商家名称：</div>
                        <div class="float-left mr10 w120">
                            <el-input placeholder="请输入内容" v-model="searchParams.brandName" clearable></el-input>
                        </div>
                        <div class="float-left">券id：</div>
                        <div class="float-left mr10 w120">
                            <el-input placeholder="请输入券id" v-model="searchParams.aliTemplateId" clearable></el-input>
                        </div>
                        <div class="float-left">代金券类型：</div>
                        <div class="float-left mr10 w120">
                            <el-select v-model="searchParams.voucherType" clearable placeholder="请选择">
                                <el-option
                                v-for="item in statusList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="float-left">
                            <span>券发放有效期:</span>
                            <el-date-picker class="w190" v-model="searchParams.publishStartTime" type="datetime" placeholder="开始日期时间"  :picker-options="beginPickerOptions" :editable="false" >
                            </el-date-picker>
                            <span>-</span>
                             <el-date-picker class="w190" v-model="searchParams.publishEndTime" type="datetime" placeholder="结束日期时间"  :picker-options="endPickerOptions" :editable="false" >
                            </el-date-picker>
                        </div>
                        <div class="float-left ml10">
                            <el-button type="primary" @click="handleConfirm">搜索</el-button>
                        </div>
                        <div class="float-left ml10"><el-button type="primary" @click="handleAdd">新建优惠券</el-button></div>
                    </el-col>
                </el-row>
             </div>
            <div class="table">
                <div class="tableList">
                    <el-table :data="tableData">
                        <el-table-column prop="brandName" label="商家名称" min-width="50" align="center"></el-table-column>
                        <el-table-column prop="templateTypeStr" label="优惠券类型" min-width="50"  align="center"></el-table-column>
                        <el-table-column prop="templateId" label="券id" min-width="50"  align="center"></el-table-column>
                        <el-table-column prop="publishTimeStr" label="券发放有效期" min-width="100" align="center"></el-table-column>
                        <el-table-column prop="voucherName" label="券名称" min-width="50"  align="center"></el-table-column>
                        <el-table-column prop="allCount" label="发行总量" min-width="50" align="center">
                        </el-table-column>
                        <el-table-column prop="publish_count" label="已领数量" min-width="50" align="center"></el-table-column>
                        <el-table-column prop="used_count" label="已核销数量" min-width="50" align="center"></el-table-column>
                        <el-table-column prop="statusStr" label="全部" min-width="80" align="center"></el-table-column>
                        <el-table-column  label="操作" min-width="100" align="center">
                            <template slot-scope="scope" style="text-align:center">
                                <div style="display:flex;justify-content: center">
                                    <el-button type="text" @click="handleConfigure(scope.row.templateId)">查看</el-button>
                                    <el-button type="text" @click="handleEditor(scope.row.templateId)" v-show="scope.row.statusStr !== '已结束'">编辑</el-button>
                                    <el-button type="text" @click="handleDel(scope.row.templateId)" v-show="scope.row.status === 'I'">删除</el-button>
                                    <el-button type="text" @click="handleEnd(scope.row.templateId)" v-show="scope.row.statusStr ==='已付款' || scope.row.statusStr ==='发放中'|| scope.row.statusStr ==='已领完'">结束</el-button>
                                    <el-button type="text" @click="open(scope.row.confirmUri)" v-show="scope.row.statusStr === '未付款'">付款</el-button>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="foot-page">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchParams.pageNo" :page-sizes="[10,20, 30, 50, 100]" :page-size="searchParams.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalSize">
                    </el-pagination>
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
      tableData: [],
      value: "",
      searchParams: {
        voucherType: "",
        publishStartTime: "",
        publishEndTime: "",
        voucherName: "",
        pageNo: 1,
        pageSize: 10
      },
      statusList: [
        {
          value: "FIX_VOUCHER",
          label: "代金券"
        },
        {
          value: "COUPON",
          label: "红包"
        }
      ],
      totalSize: 0
    };
  },
  created() {
    this.getTableList();
  },
  components: {},
  methods: {
    open(confirmUri) {
       this.$alert(`<div>点击下面付款地址去付款：<a href="${confirmUri}">${confirmUri}</a></div><div>`, '付款', {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          callback: action => {
          }
        });
    },
    // 获取表格列表
    getTableList() {
      const data = this.handparams();
      acouponService.getVoucherApliList(data).then(
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
    endApliVoucher(id) {
      acouponService.endApliVoucher(id).then(
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
    delApliVoucher(id) {
      acouponService.delApliVoucher(id).then(
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
      const router = `./detailApliCoupon?id=${id}&type=${2}`;
      this.$router.push(router);
    },
    // 新建会议
    handleAdd() {
      const router = `./addCoupon?difftype=${2}`;
      this.$router.push(router);
    },
    // 查看详情
    handleConfigure(id) {
      const router = `./detailApliCoupon?id=${id}&type=${1}`;
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
          this.delApliVoucher(id);
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
          this.endApliVoucher(id);
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
    },
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
.select{
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
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100px;
}
</style>

<style lang="scss" scoped>
.w190{
    width: 195px;
}
.bgcolor {
  color: #999 !important;
}
.apli-coupon-list {
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


