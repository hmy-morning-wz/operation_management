<template>
    <div class="integral-list">
        <div class="pl30 pt20">
            <div class="content">
                <el-row class="lh40 mt10">
                    <el-col :span="24">
                        <div class="float-left">
                            <el-date-picker
                                v-model="searchParams.startTime"
                                type="datetime"
                                placeholder="开始日期时间"
                                :picker-options="beginPickerOptions"
                                :editable="false"
                                class="w200"
                            ></el-date-picker>
                        </div>
                        <div class="float-left ml10">
                            <el-date-picker
                                v-model="searchParams.endTime"
                                type="datetime"
                                placeholder="选择日期时间"
                                :picker-options="endPickerOptions"
                                :editable="false"
                            ></el-date-picker>
                        </div>
                        <div class="float-left ml10">
                            <el-input v-model="searchParams.mobile" placeholder="手机号"></el-input>
                        </div>
                        <div class="float-left ml10">
                            <el-input v-model="searchParams.flowDetails" placeholder="流水详情"></el-input>
                        </div>
                        <div class="float-left ml10">
                            <el-button type="primary" @click="handleConfirm">搜索</el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="table">
                <div class="tableList">
                    <el-table :data="tableData">
                        <el-table-column prop="flowNo" label="流水号" min-width="50" align="center"></el-table-column>
                        <el-table-column
                            label="订单时间"
                            min-width="120"
                            show-overflow-tooltip
                            prop="gmtCreate"
                            align="center"
                        >
                        </el-table-column>
                        <el-table-column prop="mobile" label="手机号码" min-width="50" align="center"></el-table-column>
                        <el-table-column
                            prop="amount"
                            label="数量"
                            min-width="50"
                            align="center"
                        ></el-table-column>
                          <el-table-column
                            prop="flowDetails"
                            label="流水详情"
                            min-width="50"
                            align="center"
                        ></el-table-column>
                        <!-- <el-table-column label="操作" min-width="80">
                            <template slot-scope="scope" style="text-align:center">
                                <div>
                                    <el-button type="text" @click="handleDetail(scope.row.id)">查看</el-button>
                                </div>
                            </template>
                        </el-table-column> -->
                    </el-table>
                </div>
                <div class="foot-page">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="searchParams.page"
                        :page-sizes="[10,20, 30, 50, 100]"
                        :page-size="searchParams.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalSize"
                    ></el-pagination>
                </div>
            </div>
        </div>
        <app-loading :loadingShow="loadingShow"></app-loading>
    </div>
</template>
<script>
import integralService from "../../../service/markerManagement/integralManagement";
import moment from "@/utils/moment";
import AppLoading from "../../OperationManagement/comm/loading.vue";

export default {
  data() {
    return {
      loadingShow: false,
      tableData: [],
      searchParams: {
        mobile: "",
        flowDetails: "",
        startTime: "",
        endTime: "",
        page: 1,
        pageSize: 10
      },
      totalSize: 0
    };
  },
  created() {
    this.getTableList();
  },
  components: {
    AppLoading,
  },
  methods: {
    getTableList() {
      const data = this.handparams();
      integralService.getTableList(data).then(
        response => {
            console.log(response)
          if (response.data instanceof Array) {
            this.tableData = response.data;
          } else {
            this.tableData = [];
          }
          this.totalSize = response.totalSize;
        },
        response => {
          this.tableData = [];
          this.totalSize = 0;
          console.log(response.Message || "服务器连接失败！3");
        }
      );
    },
    handleConfirm() {
        this.searchParams.page = 1;
        this.getTableList();
    },
    // 跳转到详情
    handleDetail(id) {
      const router = `./viewDetail?id=${id}`;
      this.$router.push(router);
    },
    formatReleaseStatus(row, column) {
      if (row.status == 1) {
        return "已创建";
      }
      if (row.status == 2) {
        return "进行中";
      }
      if (row.status == 3) {
        return "已结束";
      }
    },
    handleSizeChange(val) {
      this.searchParams.pageSize = val;
      this.getTableList();
    },
    handleCurrentChange(val) {
      this.searchParams.page = val;
      this.getTableList();
    },
    handparams() {
      const self = this;
      const params = JSON.parse(JSON.stringify(self.searchParams));
      for (const i in params) {
        if (params[i] === "") {
          delete params[i];
        }
      }
      if (params.startTime) {
        params.startTime = moment(params.startTime).formats();
      }
      if (params.endTime) {
        params.endTime = moment(params.endTime).formats();
      }
      return params;
    }
  },
  computed: {
    beginPickerOptions() {
      let self = this;
      return {
        disabledDate(time) {
          if (self.searchParams.endTime) {
            return time.getTime() > self.searchParams.endTime;
          }
        }
      };
    },
    endPickerOptions() {
      let self = this;
      return {
        disabledDate(time) {
          return time.getTime() < self.searchParams.startTime;
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
.w200{
    width: 200px !important;
}
.bgcolor {
  color: #999 !important;
}
.integral-list {
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
