<template>
   <div class="activity-list">
        <!-- <head-top></head-top> -->
         <div class="pl30 pt20">
             <div class="content">
                 <!-- <el-row class="lh40 mt10">
                    <el-col :span="3"><div class="">时间：</div></el-col>
                    <el-col :span="12">
                        <div class="float-left">
                            <el-date-picker v-model="searchParams.addTimeBegin" type="date" placeholder="开始日期" :picker-options="beginPickerOptions" :editable="false" :clearable="true" >
                            </el-date-picker>
                        </div>
                        <div class="float-left ml10">
                            <el-date-picker v-model="searchParams.addTimeEnd" type="date" placeholder="结束日期" :picker-options="endPickerOptions" :editable="false" :clearable="true">
                            </el-date-picker>
                        </div>
                    </el-col>
                </el-row> -->
                <!-- <el-row class="lh40 mt20">
                    <el-col :span="3"><div class="">&nbsp</div></el-col>
                    <el-col :span="6">
                       <el-row :gutter="20">
                           <el-col :span="16"><el-input placeholder="请输入内容" v-model="input10" clearable></el-input></el-col>
                           <el-col :span="8"><el-button type="primary" icon="el-icon-search">搜索</el-button></el-input>
                            </el-col>
                       </el-row>
                    </el-col>
                </el-row> -->
             </div>
            <div class="table mt20 mr20">
                <div class="tableList">
                    <el-table :data="tableData">
                        <el-table-column prop="id" label="用户id" min-width="50" align="center"></el-table-column>
                        <el-table-column prop="SourceType" label="主题" min-width="50" align="center"></el-table-column>
                        <el-table-column prop="gmtCreate" label="内容提交时间" min-width="70" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="nickname" label="内容名称" min-width="50" align="center" >
                            <template slot-scope="scope" class="detail-content">
                                <div @click="handleDetail(scope.row.id)" class="detail-content">{{scope.row.nickname}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="status" label="内容状态" min-width="50" :formatter="formatReleaseStatus" align="center"></el-table-column>
                        <el-table-column label="基本操作" min-width="50"  align="center">
                            <template slot-scope="scope" style="text-align:center">
                                <div v-if="scope.row.status === 1">
                                    <span class="detail-content" @click="handleAduit(scope.row.id,2)">通过</span>
                                    <span class="detail-content ml20" @click="handleAduit(scope.row.id,3)">不通过</span>
                                </div>
                                <div v-else>
                                    <span class="detail-content" @click="handleAduit(scope.row.id,3)" v-if="scope.row.status === 2 ">不通过</span>
                                    <span class="detail-content ml10"  v-else-if="scope.row.status === 3" :class="{bgcolor:scope.row.status === 3}">不通过</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column  label="其他操作(手动投票)" min-width="80">
                            <template slot-scope="scope" style="text-align:center">
                                <div style="display:flex">
                                   <el-input v-model="scope.row.manualVotes" placeholder="输入投票数量" style="min-width:100px"></el-input>
                                   <el-button type="primary" style="width:100px" class="ml10" @click="handleVote(scope.row.id,scope.row.manualVotes)">确认投票</el-button>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="foot-page">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchParams.pageIndex" :page-sizes="[10,20, 30, 50, 100]" :page-size="searchParams.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalSize">
                    </el-pagination>
                </div>
             </div>
        </div>
        <app-loading :loadingShow="loadingShow"></app-loading>
   </div>
</template>
<script>
import activityService from "../../../service/OperationManagement/activity";
import moment from "@/utils/moment";
import AppLoading from "../../OperationManagement/comm/loading.vue";
import headTop from "../../../components/headTop";

export default {
  data() {
    return {
      loadingShow: false,
      tableData: [],
      input10: "",
      themeId: 1,
      searchParams: {
        // sourceType: '',
        status: "",
        // addTimeBegin: '',
        // addTimeEnd: '',
        pageIndex: 1,
        pageSize: 10
      },
      totalSize: 0
    };
  },
  created() {
    console.log(55555);
    this.getTableList();
  },
  components: {
    AppLoading,
    headTop
  },
  methods: {
    getTableList() {
      const data = {
        status: this.searchParams.status,
        page: this.searchParams.pageIndex,
        pageSize: this.searchParams.pageSize
      };
      activityService.getTableList(data).then(
        response => {
          this.tableData = response.data;
          this.tableData.forEach(item => {
            console.log(item);
            item.SourceType = "公交情缘";
          });
          this.totalSize = response.totalSize;
        },
        response => {
          console.log(response.Message || "服务器连接失败！3");
        }
      );
    },
    handleDetail(id) {
      const router = `./activityAudit?id=${id}`;
      this.$router.push(router);
    },
    handleAduit(id, params) {
      const status = params;
      this.searchParams.status = '';
      activityService.updateStatus(id, status).then(
        response => {
          this.$message({
            message: "保存成功",
            type: "success"
          });
          this.getTableList();
        },
        response => {
          console.log(response.Message || "服务器连接失败！3");
        }
      );
    },
    handleVote(Id,Votes) {
    const manualVotes = Votes;
    const id = Id;
      activityService.updateVote(id, manualVotes).then(
        response => {
          this.$message({
            message: "保存成功",
            type: "success"
          });
          this.getTableList();
        },
        response => {
          console.log(response.Message || "服务器连接失败！3");
        }
      );
    },
    handleInput() {
        this.getTableList();
    },
    formatReleaseStatus(row, column) {
      if (row.status == 1) {
        return "未审核";
      }
      if (row.status == 2) {
        return "审核通过";
      }
      if (row.status == 3) {
        return "审核不通过";
      }
    },
    handleSizeChange(val) {
      this.searchParams.pageSize = val;
      this.getTableList();
    },
    handleCurrentChange(val) {
      this.searchParams.pageIndex = val;
      this.getTableList();
    }
  },
  computed: {
    beginPickerOptions() {
      let self = this;
      return {
        disabledDate(time) {
          if (self.searchParams.addTimeEnd) {
            return time.getTime() > self.searchParams.addTimeEnd;
          }
        }
      };
    },
    endPickerOptions() {
      let self = this;
      return {
        disabledDate(time) {
          return time.getTime() < self.searchParams.addTimeBegin;
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
.bgcolor{
    color: #999 !important;
}
.activity-list {
  .table {
    .foot-page {
      float: right;
      margin-top: 10px;
      margin-bottom: 30px
    }
  }
  .detail-content {
    cursor: pointer;
    color: #20a0ff;
  }
}
</style>
