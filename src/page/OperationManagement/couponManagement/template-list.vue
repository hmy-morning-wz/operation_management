<template>
    <div class="template-coupon-list">
        <div class="pl30 pt20">
            <div class="content">
                <el-row class="lh40 mt10">
                    <el-col :span="24">
                        <div class="float-left ml10">券类型</div>
                        <div class="float-left ml10">
                            <el-input v-model="searchParams.allipassTypeName" placeholder="请输入内容"></el-input>
                        </div>
                        <div class="float-left ml10">
                            <el-button type="primary" @click="handleConfirm">搜索</el-button>
                        </div>
                          <div class="float-left ml20" style="margin-right: 30px">
                            <el-button type="primary" @click="handleAdd">新建</el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="table">
                <div class="tableList">
                    <el-table :data="tableData">
                        <el-table-column prop="alipassTypeId" label="编号" min-width="50" align="center"></el-table-column>
                        <el-table-column prop="name" label="券类型名称" min-width="100" align="center"></el-table-column>
                        <el-table-column prop="tag" label="券类型标识" min-width="100" align="center" :formatter="formatReleaseStatus"></el-table-column>
                        <el-table-column label="操作" min-width="80">
                            <template slot-scope="scope" style="text-align:center">
                                <div style="display:flex">
                                    <el-button type="text" @click="handleDetail(scope.row.alipassTypeId)">查看</el-button>
                                    <el-button type="text" @click="handleEditor(scope.row.alipassTypeId)">修改</el-button>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="foot-page">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="searchParams.pageNum"
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
import templateService from "../../../service/OperationManagement/couponTemplate";
import moment from "@/utils/moment";
import AppLoading from "../../OperationManagement/comm/loading.vue";

export default {
  data() {
    return {
      loadingShow: false,
      tableData: [],
      searchParams: {
        allipassTypeName: '',
        firstRequestFlag: true,
        pageNum: 1,
        pageSize: 10
      },
      totalSize: 0
    };
  },
  created() {
    this.getTemplateList();
  },
  components: {
    AppLoading,
  },
  methods: {
    getTemplateList() {
      const data = this.handparams();
      templateService.getTemplateList(data).then(
        response => {
            console.log(response)
          if (response.data.alipassTypeResponseList instanceof Array) {
            this.tableData = response.data.alipassTypeResponseList;
          } else {
            this.tableData = [];
          }
          this.totalSize = response.data.totalSize;
          console.log(response);
        },
        response => {
          console.log(response.Message || "服务器连接失败！3");
        }
      );
    },
    // 确认
    handleConfirm() {
      this.searchParams.pageNum = 1;
      this.getTemplateList();
    },
    // 跳转到详情
    handleDetail(id) {
      const router = `./templatDetail?id=${id}`;
      this.$router.push(router);
    },
    // 新建模版
    handleAdd() {
      const router = `./addTemplateCoupon`;
      this.$router.push(router);
    },
    //需求修改
    handleEditor(id) {
      const router = `./addTemplateCoupon?id=${id}`;
      this.$router.push(router);
    },
    formatReleaseStatus(row, column) {
      if (row.tag == "exchange") {
        return "兑换券";
      }
      if (row.tag == "link") {
        return "跳转券";
      }
    },
    handleSizeChange(val) {
      this.searchParams.pageSize = val;
      this.getTemplateList();
    },
    handleCurrentChange(val) {
      this.searchParams.pageNum = val;
      this.getTemplateList();
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
  computed: {},
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
.template-coupon-list {
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
