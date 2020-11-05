<template>
   <div class="cardDetail">
       <!-- <head-top></head-top> -->
       <div class="pl30">
            <div class="header mb20">
                <div class="ml0">
                    <span>城市切换：</span>
                    <el-select v-model="cityId" clearable filterable   placeholder="请选择">
                        <el-option v-for="(item,index) in cityList" :key="index" :label="item.cityName" :value="item.cityId">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="content">
                    <div class="content-left">
                        <div class="ml10 mb20 life-first">
                            <el-row :gutter="4" class="mb20">
                                <el-col :span="6" v-for="(item,index) in zoneFirstIconList" :key="index">
                                    <div class="icon-img" @click="handleInputZone2(item.iconId)">
                                        <div class="circle" :class="{logo: !item.iconImg}">
                                            <img class="top-icon" :src="item.superscriptImg" v-show="item.superscriptImg">
                                            <img class="circle-bg-img" :src="item.iconImg" v-if="item.iconImg">
                                            <img class="circle-bg-img" :src="logo" v-else>
                                        </div>
                                        <div>{{item.iconName}}</div>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="4">
                                <el-col :span="6" v-for="(item,index) in zoneSecondIconList" :key="index">
                                    <div class="icon-img" @click="handleInputZone2(item.iconId)">
                                        <div class="circle" :class="{logo: !item.iconImg}">
                                            <img class="top-icon" :src="item.superscriptImg" v-show="item.superscriptImg">
                                            <img class="circle-bg-img" :src="item.iconImg" v-if="item.iconImg">
                                            <img class="circle-bg-img" :src="logo" v-else>
                                        </div>
                                        <div>{{item.iconName}}</div>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                    <div class="content-right">
                        <div class="upload-img mb20" v-show="typeSecond">
                                <div class="wth300 mb20">
                                    <el-input v-model="zone2.iconName" placeholder="输入icon名称(显示4个字符)"></el-input>
                                </div>
                                <div class="wth300 mb20">
                                    <el-input v-model="zone2.linkUrl" placeholder="输入跳转url"></el-input>
                                </div>
                                <div class="commdis mb20">
                                    <div class="wth300"><el-input v-model="zone2.iconImg" placeholder="图片url"></el-input></div>
                                    <div class="ml20">
                                        <el-upload
                                            class="upload-demo"
                                            ref='upload2'
                                            :action="uploadimgUrl"
                                            :on-remove="handleRemove"
                                            :before-remove="beforeRemove"
                                            :on-success="handleAvatarSuccess2"
                                            :before-upload="beforeAvatarUpload"
                                            :limit="1"
                                            :on-exceed="handleExceed">
                                        <el-button size="small" type="primary">点击上传</el-button>
                                        </el-upload>
                                    </div>
                                </div>
                                <div class="commdis mb20">
                                    <div class="wth300"><el-input v-model="zone2.superscriptImg" placeholder="图片url"></el-input></div>
                                    <div class="ml20">
                                        <el-upload
                                            class="upload-demo"
                                            ref='upload3'
                                            :action="uploadimgUrl"
                                            :on-remove="handleRemove"
                                            :before-remove="beforeRemove"
                                            :on-success="handleAvatarSuccess3"
                                            :before-upload="beforeAvatarUpload"
                                            :limit="1"
                                            :on-exceed="handleExceed">
                                        <el-button size="small" type="primary">点击角标上传</el-button>
                                        </el-upload>
                                    </div>
                                </div>
                                <div class="commdis">
                                    <div class="ml20"><el-button type="primary" @click="handleDetermineZone2">确定</el-button></div>
                                    <div class="ml20"><el-button @click="handleCancelZone2">取消</el-button></div>
                                </div>
                        </div>
                    </div>
            </div>
       </div>
        <app-loading :loadingShow="loadingShow"></app-loading>
   </div>
</template>
<script>
import cardService from "../../service/OperationManagement/cardDetail";
import apiHost from "@/hostconfig/index";
import moment from "@/utils/moment";
import AppLoading from "../OperationManagement/comm/loading.vue";
import headTop from "../../components/headTop";

export default {
  data() {
    return {
      logo:'./static/images/add.png',
      loadingShow: false,
      cityList: [
        {
          cityId: 1,
          cityName: "杭州"
        }
      ],
      cityId: 1,
      uploadimgUrl: `${apiHost.netImg}prefer/api/fileUploadOne`,
      typeSecond: false,
      fileList: [],
      tagIconId: "",
      zone2: {
        iconName: "",
        linkUrl: "",
        iconImg: "",
        iconImgClick: "",
        superscriptImg: ""
      },
      iconList: [],
      zoneFirstIconList: [],
      zoneSecondIconList: []
    };
  },
  created() {
    this.getBaseDetail();
  },
  components: {
    AppLoading,
    headTop
  },
  methods: {
    getBaseDetail() {
      cardService.getBaseDetail().then(
        response => {
          this.iconList = JSON.parse(JSON.stringify(response));
          console.log(response);
          this.zoneFirstIconList = response.slice(0, 4);
          this.zoneSecondIconList = response.slice(4);
        },
        response => {
          this.$message.error("请求服务器连接失败!");
        }
      );
    },
    handleInputZone2(iconId) {
      this.typeSecond = true;
      this.tagIconId = iconId;
      this.zoneFirstIconList.forEach(item => {
        if (item.iconId == iconId) {
          this.zone2.iconImg = item.iconImg;
          this.zone2.iconImgClick = item.iconImgClick;
          this.zone2.iconName = item.iconName;
          this.zone2.linkUrl = item.linkUrl;
          this.zone2.superscriptImg = item.superscriptImg;
        }
      });
      this.zoneSecondIconList.forEach(item => {
        if (item.iconId == iconId) {
          this.zone2.iconImg = item.iconImg;
          this.zone2.iconImgClick = item.iconImgClick;
          this.zone2.iconName = item.iconName;
          this.zone2.linkUrl = item.linkUrl;
          this.zone2.superscriptImg = item.superscriptImg;
        }
      });
    },
    //第二行icon确定
    handleDetermineZone2() {
      this.zoneFirstIconList.forEach(item => {
        if (item.iconId == this.tagIconId) {
          item.iconImg = this.zone2.iconImg;
          item.iconName = this.zone2.iconName;
          item.linkUrl = this.zone2.linkUrl;
          item.superscriptImg = this.zone2.superscriptImg;
        }
      });
      this.zoneSecondIconList.forEach(item => {
        if (item.iconId == this.tagIconId) {
          item.iconImg = this.zone2.iconImg;
          item.iconName = this.zone2.iconName;
          item.linkUrl = this.zone2.linkUrl;
          item.superscriptImg = this.zone2.superscriptImg;
        }
      });
      console.log(this.zone2.linkUrl);
      this.typeSecond = false;
      this.$refs.upload2.clearFiles();
      this.$refs.upload3.clearFiles();
      this.handleSave();
    },
    // 第二行icon取消
    handleCancelZone2() {
      this.typeSecond = false;
    },
    // 保存
    handleSave() {
      const data = this.zone2;
      data.iconId = this.tagIconId;
      cardService.upBaseDateDetail(data).then(
        response => {
          this.$message({
            message: "保存成功",
            type: "success"
          });
          this.getBaseDetail();
        },
        response => {
          this.$message.error("请求服务器连接失败!");
        }
      );
    },

    // 上传文件相关
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制上传一张图片！`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 移除文件
    handleRemove(file, fileList) {
      this.$refs.upload.clearFiles();
    },
    // 第二类型第一行上传文件成功
    handleAvatarSuccess2(response, file) {
      this.zone2.iconImg = `https://${response.data}`;
    },
    // 第二类型第二行上传文件成功
    handleAvatarSuccess3(response, file) {
      this.zone2.superscriptImg = `https://${response.data}`;
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
    }
  },
  computed: {},
  watch: {
    loadingShow(val) {
      return val;
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.logo{
    border: 1px solid #999;
}
.upload-demo {
  display: flex;
  align-items: center;
}
.title {
  font-size: 16px;
  font-weight: bold;
  margin-left: 15px;
}
.wth300 {
  width: 300px;
}
.wth200 {
  width: 200px;
}
.wth150 {
  width: 150px;
}
.commdis {
  display: flex;
  align-items: center;
}
.cardDetail {
  .header {
    height: 50px;
    line-height: 50px;
    display: flex;
    position: relative;
    .editor {
      position: absolute;
      right: 100px;
      top: 0px;
    }
  }
  .content {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    .content-left {
      flex: 1;
      .life-first {
        .icon-img {
          width: 100px;
          text-align: center;
          .circle {
            height: 80px;
            width: 80px;
            border-radius: 50px;
            position: relative;
            .top-icon {
              width: 45px /* 270/75 */;
              height: 21px /* 129/75 */;
              position: absolute;
              top: -10px /* 40/75 */;
              right: -30px /* 20/75 */;
            }
            .circle-bg-img {
              height: 80px;
              width: 80px;
              border-radius: 50px;
            }
          }
        }
      }
    }
    .content-right {
      flex: 1;
      margin-top: 0px;
    }
  }
}
</style>
