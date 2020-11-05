<template>
  <div class="integral-list">
    <div class="pl30 pt20">
      <div class="content">
        <el-row class="lh40 mt10">
          <el-col :span="24">
            <div class="float-left">
              <el-select v-model="searchParams.type" clearable placeholder="请选择">
                <el-option
                  v-for="item in goodsList"
                  :key="item.typeId"
                  :label="item.typeName"
                  :value="item.typeId"
                ></el-option>
              </el-select>
            </div>
            <div class="float-left ml10">
              <el-select v-model="searchParams.status" placeholder="请选择">
                <el-option
                  v-for="item in goodsStatus"
                  :key="item.statusId"
                  :label="item.statusName"
                  :value="item.statusId"
                ></el-option>
              </el-select>
            </div>
            <div class="float-left ml10">
              <el-input v-model="searchParams.name" placeholder="商品名称"></el-input>
            </div>
            <div class="float-left ml10">
              <el-input v-model="searchParams.id" placeholder="商品编号"></el-input>
            </div>
            <div class="float-left ml10">
              <el-button type="primary" @click="handleConfirm">搜索</el-button>
            </div>
            <div class="float-left ml10">
              <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="table">
        <div class="tableList">
          <el-table :data="tableData">
            <el-table-column prop="id" label="商品编号" min-width="50" align="center"></el-table-column>
            <el-table-column prop="name" label="商品名称" min-width="80" align="center"></el-table-column>
            <el-table-column prop="typeName" label="商品类型" min-width="50" align="center"></el-table-column>
            <el-table-column prop="originalPrice" label="商品原始价格" min-width="60" align="center"></el-table-column>
            <el-table-column prop="discountPrice" label="商品折扣价格" min-width="60" align="center"></el-table-column>
            <el-table-column
              label="商品库存"
              min-width="60"
              show-overflow-tooltip
              prop="remainCount"
              align="center"
            ></el-table-column>
            <el-table-column prop="statusName" label="状态" min-width="50" align="center"></el-table-column>
            <el-table-column label="操作" min-width="100" align="center">
              <template slot-scope="scope" style="text-align:center">
                <el-button type="text" @click="handleDetail(scope.row.id)">查看</el-button>
                <el-button
                  type="text"
                  @click="handleUpdateStatus(scope.row.id,1)"
                  v-if="scope.row.statusId == 0"
                >上架</el-button>
                <el-button type="text" @click="handleUpdateStatus(scope.row.id,0)" v-else>下架</el-button>
                <el-button
                  type="text"
                  v-show="scope.row.statusId === 0"
                  @click="handleEditor(scope.row.id)"
                >编辑</el-button>
              </template>
            </el-table-column>
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
import goodsService from "../../../service/markerManagement/goodsManagement";
import moment from "@/utils/moment";
import AppLoading from "../../OperationManagement/comm/loading.vue";

export default {
  data() {
    return {
      loadingShow: false,
      goodsList: [
        {
          typeId: "",
          typeName: ""
        }
      ],
      goodsStatus: [
        {
          statusId: "",
          statusName: ""
        }
      ],
      typeId: "",
      statusId: "",
      tableData: [],
      searchParams: {
        status: "",
        id: "",
        name: "",
        type: "",
        page: 1,
        pageSize: 10
      },
      totalSize: 0
    };
  },
  created() {},
  components: {
    AppLoading
  },
  methods: {
    getTableList() {
      const data = this.handparams();
      goodsService.getTableList(data).then(
        response => {
          if (response.data instanceof Array) {
            this.tableData = response.data;
          } else {
            this.tableData = [];
          }
          this.totalSize = response.totalSize;
        },
        response => {
          console.log(response.Message || "服务器连接失败！3");
        }
      );
    },
    getTypeList() {
      goodsService.getTypeList().then(
        response => {
          this.goodsList = response.data;
        },
        response => {
          console.log(response.Message || "服务器连接失败！3");
        }
      );
    },
    getStatusList() {
      goodsService.getStatusList().then(
        response => {
          this.goodsStatus = response.data;
        },
        response => {
          console.log(response.Message || "服务器连接失败！3");
        }
      );
    },
    updateStatus(data) {
      goodsService.updateStatus(data).then(
        response => {
          this.getTableList();
        },
        response => {
          this.$message.error(response.sub_msg || "连接服务器失败!");
        }
      );
    },
    handleConfirm() {
      this.searchParams.page = 1;
      this.getTableList();
    },
    // 跳转到详情
    handleDetail(id) {
      const router = `./editGoods?id=${id}&type=1`;
      this.$router.push(router);
    },
    handleEditor(id) {
      const router = `./editGoods?id=${id}&type=2`;
      this.$router.push(router);
    },
    handleUpdateStatus(id, status) {
        let tipMessage = '';
        if(status === 0){
            tipMessage = '是否确定要下架'
        }else{
            tipMessage = '是否确定要上架'
        }
      this.$confirm(tipMessage, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const data = {
            id: id,
            status: status
          };
          this.updateStatus(data);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    handleAdd() {
      const router = `./addGoods`;
      this.$router.push(router);
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
  computed: {},
  mounted() {
    this.getTypeList();
    this.getStatusList();
    this.getTableList();
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
.w200 {
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
