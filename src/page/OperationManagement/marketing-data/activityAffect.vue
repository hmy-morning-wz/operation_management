<template>
    <div class="">
        <!-- <head-top></head-top> -->
        <div class="pl30 pt20" style="padding-right:30px">
            <div class="activityAffect">
                <div class="headBan">
                    <!-- <span>活动状态</span>
              <el-select v-model="activityStatusId" clearable filterable   placeholder="请选择">
                <el-option v-for="(item,index) in activityStatusList" :key="index" :label="item.activityStatus" :value="item.activityStatusId">
                </el-option>
                    </el-select>-->
                    <span>活动名称</span>
                    <el-select v-model="id" filterable placeholder="请选择">
                        <el-option
                            v-for="(item,index) in activityNameList"
                            :key="index"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                    <div style="display:inline-block">
                        <span>活动时间</span>
                        <el-date-picker
                            v-model="nowDate1"
                            type="datetime"
                            placeholder="选择日期"
                            :picker-options="beginPickerOptions"
                            value-format="yyyy-MM-dd HH:mm:ss"
                        ></el-date-picker>
                        <span>--</span>
                        <el-date-picker
                            v-model="nowDate2"
                            type="datetime"
                            placeholder="选择日期"
                            :picker-options="endPickerOptions"
                            value-format="yyyy-MM-dd HH:mm:ss"
                        ></el-date-picker>
                    </div>
                    <el-button type="primary" style="float:right" @click="getActivityData()">确定</el-button>
                    <div
                        class="charts"
                        style="margin-top:20px; background-color:#f5f7fa; padding:30px"
                    >
                        <el-row :gutter="12">
                            <el-col :span="6">
                                <el-card shadow="hover" class="chart-btn">累计点击pv：{{clickPV}}</el-card>
                            </el-col>
                            <el-col :span="6">
                                <el-card shadow="hover" class="chart-btn">累计点击uv：{{clickUV}}</el-card>
                            </el-col>
                            <el-col :span="6">
                                <el-card shadow="hover" class="chart-btn">参与人数：{{participantNumber}}</el-card>
                            </el-col>
                            <el-col :span="6">
                                <el-card
                                    shadow="hover"
                                    class="chart-btn"
                                >新增浏览人数：{{newBrowserNumber}}</el-card>
                            </el-col>
                        </el-row>
                    </div>
                </div>
                <div class="chartBan" style="margin-top:25px">
                    <div>
                        <span>选择查看活动某一天的趋势图</span>
                        <el-date-picker
                            v-model="nowDate3"
                            type="date"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd"
                        ></el-date-picker>
                        <el-button type="primary" @click="getChartData()" style="float:right">确定</el-button>
                    </div>
                    <!-- <span>{{name}}</span> -->
                    <div
                        class="charts"
                        style="margin-top:20px; background-color:#f5f7fa; padding:30px"
                    >
                        <!-- <div style="display:flex;flex-wrap:wrap;justify-content:space-between">
                  <el-button plain class="chart-btn">累计点击pv</el-button>
                  <el-button plain class="chart-btn">累计点击uv</el-button>
                  <el-button plain class="chart-btn">参与人数</el-button>
                  <el-button plain class="chart-btn">新增浏览人数</el-button>
                        </div>-->

                        <div id="chartPic" ref="mychart"></div>
                    </div>
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
      activityStatusList: [
        {
          activityStatusId: 1,
          activityStatus: "未审核"
        },
        {
          activityStatusId: 2,
          activityStatus: "审核通过"
        },
        {
          activityStatusId: 3,
          activityStatus: "审核不通过"
        }
      ],
      activityStatusId: 1,
      activityNameList: [
        {
          id: "",
          name: ""
        }
      ],
      id: Number(this.$route.query.id) || "",
      name: "",
      activity: "活动数据",
      nowDate1: "",
      nowDate2: "",
      nowDate3: "",
      seriesData: [],
      index: 100,
      clickPV: "",
      clickUV: "",
      newBrowserNumber: "",
      participantNumber: ""
    };
  },
  created() {},
  components: {
    AppLoading,
    headTop
  },
  methods: {
    drawChart: function(charts, seriesData) {
      this.index = (24 / this.seriesData.length) * 100;
      // 基于准备好的dom,初始化eChars实例
      var myChart = echarts.init(charts);
      // 指定图表的配置项和数据
      var option = {
        // title: {
        //   text: this.buslove
        // },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          },
          formatter: function(params) {
            var res = "<div><p>" + params[0].name + "点</p></div>";
            for (var i = 0; i < params.length; i++) {
              res +=
                "<p>" + params[i].seriesName + ":" + params[i].data + "</p>";
            }
            return res;
          }
        },
        legend: {
          data: ["PV"]
        },
        xAxis: {
          type: "category",
          boundaryGap: false, //不留白
          data: [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23
          ],
          axisLabel: { interval: 0 }
        },
        yAxis: {
          type: "value"
        },
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: this.index
          },
          {
            start: 0,
            // end: 24,
            handleIcon:
              "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
            handleSize: "80%",
            handleStyle: {
              color: "#fff",
              shadowBlur: 24,
              shadowColor: "rgba(0, 0, 0, 0.6)",
              shadowOffsetX: 2,
              shadowOffsetY: 2
            }
          }
        ],
        series: [
          {
            name: "PV",
            type: "line",
            stack: "总量",
            // step: 'middle',
            symbol: "circle",
            symbolSize: 8,
            itemStyle: {
              normal: {
                color: "#4db3ff",
                label: { show: true }
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#e5f1ff"
                  },
                  {
                    offset: 1,
                    color: "#a1cbf6"
                  }
                ])
              }
            },
            data: seriesData
          }
          // {
          //   name: 'pv',
          //   type: 'line',
          //   stack: '总量',
          //   // step: 'middle',
          //   symbol: 'circle',
          //   symbolSize: 8,
          //   itemStyle: {
          //     normal: {
          //       color: 'pink',
          //       label: { show: true }
          //     }
          //   },
          //   areaStyle: {
          //     normal: {
          //       color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //         {
          //           offset: 0,
          //           color: 'pink'
          //         },
          //         {
          //           offset: 1,
          //           color: '#a1cbf6'
          //         }
          //       ])
          //     }
          //   },
          //   data: this.seriesData2
          // }
        ]
      };
      // 使用刚指定的配置项和数据显示图表
      myChart.setOption(option);
    },
    getActivityNameList() {
      dataServer.getActivityNameList().then(
        response => {
          if (response instanceof Array) {
            this.activityNameList = response;
            if(!this.id) this.id = response[0].id;
          }
        },
        response => {
          console.log(response.Message || "服务器连接失败！3");
        }
      );
    },
    getActivityData() {
      const data = {
        activityId: this.id,
        endTime: this.nowDate2,
        startTime: this.nowDate1
      };
      console.log(data);
      dataServer.getActivityData(data).then(
        response => {
          this.clickPV = response.clickPV;
          this.clickUV = response.clickUV;
          this.newBrowserNumber = response.newBrowserNumber;
          this.participantNumber = response.participantNumber;
          // console.log(this.activityNameList)
        },
        response => {
          console.log(response.Message || "服务器连接失败！3");
        }
      );
    },
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
      var currentdate =
        year + seperator1 + month + seperator1 + strDate + " 00:00:00";
      return currentdate;
    },
    currenTime() {
      var now = new Date();

      var year = now.getFullYear(); //年
      var month = now.getMonth() + 1; //月
      var day = now.getDate(); //日

      var hh = now.getHours(); //时
      var mm = now.getMinutes(); //分
      var ss = now.getSeconds(); //秒

      var clock = year + "-";

      if (month < 10) clock += "0";

      clock += month + "-";

      if (day < 10) clock += "0";

      clock += day + " ";

      if (hh < 10) clock += "0";

      clock += hh + ":";
      if (mm < 10) clock += "0";
      clock += mm + ":";

      if (ss < 10) clock += "0";
      clock += ss;
      return clock;
    },
    getChartData() {
      const data = {
        activityId: this.id,
        selectTime: this.nowDate3
      };
      dataServer.getChartData(data).then(
        response => {
          this.seriesData = response;
          this.drawChart(this.$refs.mychart, this.seriesData);
        },
        response => {
          console.log(response.Message || "服务器连接失败！3");
        }
      );
    }
  },
  mounted() {
    this.nowDate1 = this.getNowFormatDate();
    this.nowDate2 = this.currenTime();
    this.nowDate3 = this.getNowFormatDate().slice(0, 10);
    this.getActivityNameList();
    this.getActivityData();
    this.getChartData();
    // this.drawChart(this.$refs.mychart)
  },
  updated() {
    // this.findName
    // this.name = this.activityNameList.find(this.findName).name
  },
  computed: {
    beginPickerOptions() {
      let self = this;
      return {
        disabledDate(time) {
          if (self.nowDate2) {
            return time.getTime() > self.nowDate2;
          }
        }
      };
    },
    endPickerOptions() {
      let self = this;
      return {
        disabledDate(time) {
          return time.getTime() < self.nowDate1;
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
.chart-btn {
  min-height: 5.5rem;
  line-height: 3rem;
  text-align: center;
}
#chartPic {
  height: 28rem;
  margin-top: 20px;
  background-color: white;
}
</style>
