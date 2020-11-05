<template>
   <div class="">
        <!-- <head-top></head-top> -->
        <div class="pl30 pt20" style="padding-right:30px">
          <div class="operatingData">
            <div class="headBan">
              <el-select v-model="id" clearable filterable   placeholder="请选择" style="width:130px;" @change="handleType">
                <el-option v-for="(item,index) in businessList" :key="index" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
              <el-select v-model="pageId" clearable filterable   placeholder="请选择"  style="width:130px;" @change="handlePageName">
                <el-option v-for="(item,index) in pageNameList" :key="index" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
              <el-select v-model="busType" filterable   placeholder="请选择"  style="width:130px;" @change="handleBusType">
                <el-option v-for="(item,index) in busAllData.busTypeList" :key="index" :label="item.busName" :value="item.busType">
                </el-option>
              </el-select>
              <el-select v-model="busId" filterable   placeholder="请选择"  style="width:130px;" @change="handleBusName">
                <el-option v-for="(item,index) in BusIdByBusType" :key="index" :label="item.busName" :value="item.busId">
                </el-option>
              </el-select>
              <div style="display:inline-block">
                <span style="margin-left:8px">活动时间</span>
                <el-date-picker
                  v-model="nowDate1"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"  style="width:140px;">
                </el-date-picker>
                <span>--</span>
                <el-date-picker
                  v-model="nowDate2"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"  style="width:140px;">
                </el-date-picker>
              </div>
              <el-button type="primary" @click="getTableData()" style="float:right">确定</el-button>
            </div>
            <div class="tableBan">
              <el-table
                v-for="(item,index) in busAllData.busTypeList"
                :key="index"
                :data="busAllData.tableData"
                border
                v-if="item.busType===busType"
                style="width: 100%; margin-top:12px">
                <el-table-column
                  prop="dateString"
                  label="日期"
                  min-width="50"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="name"
                  :label="busLabel"
                  min-width="50"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="pvData"
                  label="pv"
                  min-width="50"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="uvData"
                  label="uv"
                  min-width="50"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="pvConversionRate"
                  label="pv转化率"
                  min-width="50"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="uvConversionRate"
                  label="uv转化率"
                  min-width="50"
                  align="center">
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
   </div>
</template>
<script>
import dataServer from "../../../service/OperationManagement/marketingData";
import moment from "@/utils/moment";
import AppLoading from "../../OperationManagement/comm/loading.vue";
import headTop from "../../../components/headTop";

export default {
  data() {
    return {
      busAllData: {
        busTypeList: [
          {
            busName: "",
            busType: ""
          }
        ],
        tableData: []
      },
      busType: "",
      BusIdByBusType: [
          {
            busName: "",
            busId: ""
          }
      ],
      busId:"",
      busLabel: "",
      isHome: true,
      isWelfare: false,
      isIconClick: false,
      isPurchase: false,
      businessList: [
        {
          id: 1,
          name: "杭州支付宝卡详情"
        }
      ],
      id: 1,
      pageNameList: [
        {
          id: "",
          name: ""
        }
      ],
      pageId: "",
      nowDate1: "",
      nowDate2: ""
    };
  },
  created() {},
  updated() {
    this.showTable();
  },
  components: {
    AppLoading,
    headTop
  },
  methods: {
    getNowFormatDate: function() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
    showTable: function() {
      if (this.activityId === 1) {
        this.isHome = false;
        this.isIconClick = false;
        this.isPurchase = false;
        this.isWelfare = true;
      }
      if (this.activityId === 2) {
        this.isHome = true;
        this.isIconClick = false;
        this.isPurchase = false;
        this.isWelfare = false;
      }
      if (this.activityId === 3) {
        this.isHome = false;
        this.isIconClick = true;
        this.isPurchase = false;
        this.isWelfare = false;
      }
      if (this.activityId === 4) {
        this.isHome = false;
        this.isIconClick = false;
        this.isPurchase = true;
        this.isWelfare = false;
      }
    },
    //获取渠道名称列表
    getChannelNameList() {
      dataServer.getChannelNameList().then(
        response => {
          this.businessList = JSON.parse(JSON.stringify(response));
          this.getPageNameList();
        },
        response => {
          console.log(response.Message || "服务器连接失败！3");
        }
      );
    },
    //获取页面名称列表
    getPageNameList() {
      const id = this.id;
      dataServer.getPageNameList(id).then(
        response => {
          this.pageNameList = JSON.parse(JSON.stringify(response));
        },
        response => {
          console.log(response.Message || "服务器连接失败！3");
        }
      );
    },
    getbusTypeList() {
      const channelId = this.id;
      const channelPageId = this.pageId;
      if (channelId && channelPageId) {
        dataServer.getBusTypeList(channelId, channelPageId).then(
          response => {
            this.busAllData.busTypeList = response;
          },
          response => {
            console.log(response.Message || "服务器连接失败！3");
          }
        );
      }
    },
    getBusIdByBusType() {
      const channelPageId = this.pageId;
      const busType = this.busType;
      if (channelPageId && busType) {
        dataServer.getBusIdByBusType(channelPageId, busType).then(
          response => {
            this.BusIdByBusType = JSON.parse(JSON.stringify(response))
          },
          response => {
            console.log(response.Message || "服务器连接失败！3");
          }
        );
      }
    },
    handleType() {
      this.busAllData.tableData = [];
      this.pageNameList = [];
      this.pageId = "";
      this.getPageNameList()
    },
    //
    handlePageName(){
      this.busAllData.tableData = [];
       this.busTypeList = [];
       this.busType = "";
       this.getbusTypeList()
    },
    //
    handleBusType(){
        this.busAllData.tableData = [];
        this.BusIdByBusType = [];
        this.busId = "";
        this.getBusIdByBusType()
    },
    handleBusName(){
    //    if(this.busId || this.busId === 0 ){
    //         this.getTableData()
    //    }
    },
    getTableData() {
      const data = {
        busType: this.busType,
        endTime: this.nowDate2,
        startTime: this.nowDate1,
        busId: this.busId,
        busName: '',
        channelPageId: this.pageId,
        channelId: this.id,
      };
      this.BusIdByBusType.forEach((item) => {
          if(this.busId === item.busId){
            data.busName = item.busName;
          }
      })
      console.log(666666666)
      dataServer.getTableData(data).then(
        response => {
          //如果name空不显示(从tabledata删除)
          var result = [];
          var resultArr = [];
          result = response;
          for (var i = 0; i < result.length; i++) {
            var obj = result[i];
            if (obj["name"]) {
              resultArr.push(obj);
            }
          }
          this.busAllData.tableData = resultArr;
          resultArr = [];
          console.log(this.busAllData.tableData);

          //表头动态变化
          this.busLabel = this.busAllData.busTypeList.find(
            this.findName
          ).busName;
          console.log(this.busLabel);
        },
        response => {
          console.log(response.Message || "服务器连接失败！3");
        }
      );
    },
    findName: function(ele) {
      const ind = this.busType;
      return ele.busType === ind;
    }
  },
  mounted() {
    this.nowDate1 = this.getNowFormatDate();
    this.nowDate2 = this.getNowFormatDate();
    this.getChannelNameList();
  },
  computed: {},
  watch: {}
};
</script>
<style lang="scss" scoped>
.el-table thead {
  color: white;
}
</style>
