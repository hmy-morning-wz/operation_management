<template>
    <div class="cardDetail">
            <div class="content">
                <div class="content-left">
                    <div class="ml10 mb20 life-first">
                         <div class="headerTitle mb20">首页底部banner位</div>
                        <div class="banner-img commdis">
                            <div v-for="(item,index) in cardBanBottomList" :key="index">
                                <div class="banner-bg-img mr20" v-if="item.bannerImage">
                                    <img
                                        :src="item.bannerImage"
                                        @click="handleEditorBanner(item.pageId,item.pageLocation,item.id)"
                                    >
                                    <span
                                        class="delateImg"
                                        @click="handleDelBannerImg(item.id)"
                                        v-show="item.bannerImage"
                                    >删除</span>
                                </div>
                            </div>
                            <div
                                class="circle logo"
                                @click="handleInputBanner(2,1)"
                                v-show="cardBanBottomList.length<3"
                            >
                                <img class="circle-bg-img" :src="logo">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content-right">
                    <div class="upload-img mb20" v-show="bannerType">
                        <div class="wth300 mb20">
                            <el-input v-model="addBanner.name" placeholder="输入banner名称"></el-input>
                        </div>
                        <div class="wth300 mb20">
                            <el-input v-model="addBanner.bannerUrl" placeholder="输入跳转url"></el-input>
                        </div>
                        <div class="commdis mb20">
                            <div class="wth300">
                                <el-input v-model="addBanner.bannerImage" placeholder="图片url"></el-input>
                            </div>
                            <div class="ml20">
                                <el-upload
                                    class="upload-demo"
                                    ref="upload6"
                                    :action="uploadimgUrl"
                                    :on-remove="handleRemove"
                                    :before-remove="beforeRemove"
                                    :on-success="handleBannerSuccess"
                                    :before-upload="beforeAvatarUpload"
                                    :limit="1"
                                    :on-exceed="handleExceed"
                                >
                                    <el-button
                                        size="small"
                                        type="primary"
                                        @click="handleTypeBanner"
                                    >点击上传</el-button>
                                </el-upload>
                            </div>
                        </div>
                        <div class="commdis">
                            <div class="ml20">
                                <el-button type="primary" @click="handleDetBanner">确定</el-button>
                            </div>
                            <div class="ml20">
                                <el-button @click="handleCanlBanner">取消</el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <app-loading :loadingShow="loadingShow"></app-loading>
    </div>
</template>
<script>
import aliAppService from "../../../service/OperationManagement/aliApp";
import apiHost from "@/hostconfig/index";
import moment from "@/utils/moment";
import AppLoading from "../../OperationManagement/comm/loading.vue";

export default {
  props: ["cityId"],
  data() {
    return {
      logo: "./static/images/add.png",
      loadingShow: false,
      uploadimgUrl: `${apiHost.netImg}prefer/api/fileUploadOne`,
      bannerType: false,
      fileList: [],
      isBannerEditor: false,
      //banner
      addBanner: {
        pageId: "",
        bannerImage: "",
        name: "",
        bannerUrl: "",
        pageLocation: ""
      },
      cardBanBottomList: [
        {
          pageId: "",
          bannerImage: "",
          name: "",
          bannerUrl: "",
          pageLocation: ""
        }
      ]
    };
  },
  created() {
    this.getBannerList(this.cityId, 1);
  },
  components: {
    AppLoading
  },
  methods: {
    // 选项卡切换事件
    handleClick(tab, event) {
      if (
        this.activeName === "second" &&
        this.isIconEditor &&
        this.secondIconType == 4
      ) {
      }
    },
    //弹出上传填写的内容
    handleInputBanner(pageId, pageLocation) {
      this.bannerType = true;
      this.iconType = false;
      this.isBannerEditor = false;
      this.addBanner.bannerImage = "";
      this.addBanner.bannerUrl = "";
      this.addBanner.name = "";
      this.addBanner.pageId = this.cityId;
      this.addBanner.pageLocation = pageLocation;
    },
    // 弹出编辑上传banner信息
    handleEditorBanner(pageId, pageLocation, id) {
      this.bannerType = true;
      this.iconType = false;
      this.isBannerEditor = true;
      this.addBanner.pageId = pageId;
      this.addBanner.pageLocation = pageLocation;
      this.getBannerDetail(pageId, pageLocation, id);
    },
    //上传banner确定
    handleDetBanner() {
      if (this.addBanner.bannerImage === "") {
        this.$message({
          message: "参数输入不全",
          type: "warning"
        });
        return;
      }
      this.$refs.upload6.clearFiles();
      this.bannerType = false;
      this.isBannerEditor ? this.updateBanner() : this.addBannerImg();
    },
    //取消banner上传
    handleCanlBanner() {
      this.bannerType = false;
      this.addBanner.bannerImage = "";
      this.addBanner.name = "";
      this.addBanner.bannerUrl = "";
      this.addBanner.pageId = "";
      this.addBanner.pageLocation = "";
    },
    //删除banner
    handleDelBannerImg(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteBanner(id);
          this.bannerType = false;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
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
    // banner点击上传
    handleTypeBanner() {},
    // banner上传图片
    handleBannerSuccess(response, file) {
      this.addBanner.bannerImage = `https://${response.data}`;
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
    // 添加banner图片接口
    addBannerImg() {
      const data = this.addBanner;
      aliAppService.addBannerImg(data).then(
        response => {
          this.$message({
            message: "保存成功",
            type: "success"
          });
          this.getBannerList(this.cityId, 1);
        },
        response => {
          this.$message.error("请求服务器连接失败!");
        }
      );
    },
    // 删除banner图片接口
    deleteBanner(id) {
      aliAppService.deleteBanner(id).then(
        response => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getBannerList(this.cityId, 1);
        },
        response => {
          this.$message.error("请求服务器连接失败!");
        }
      );
    },
    // 获取banner详情接口
    getBannerList(pageId, pageLocation) {
      const data = {
        pageId: pageId,
        pageLocation: pageLocation
      };
      aliAppService.getBannerList(data).then(
        response => {
          if (response.data) {
            this.cardBanBottomList = JSON.parse(JSON.stringify(response.data));
          } else {
            this.cardBanBottomList = [];
          }
        },
        response => {
          this.$message.error("请求服务器连接失败!");
        }
      );
    },
    // 点击banner获取详情
    getBannerDetail(pageId, pageLocation, id) {
      aliAppService.getBannerDetail(id).then(
        response => {
          this.addBanner = JSON.parse(JSON.stringify(response.data));
        },
        response => {
          this.$message.error("请求服务器连接失败!");
        }
      );
    },
    // 更新banner接口
    updateBanner() {
      const data = {
        bannerImage: this.addBanner.bannerImage,
        bannerUrl: this.addBanner.bannerUrl,
        id: this.addBanner.id,
        name: this.addBanner.name
      };
      aliAppService.updateBanner(data).then(
        response => {
          this.$message({
            message: "保存成功",
            type: "success"
          });
          this.getBannerList(this.cityId, 1);
        },
        response => {
          this.$message.error("请求服务器连接失败!");
        }
      );
    }
  },
  computed: {},
  watch: {
    cityId() {
      this.getBannerList(this.cityId, 1);
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.logo {
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
    margin-top: 10px;
    .content-left {
      flex: 1;
      .headerTitle {
        font-size: 16px;
      }
      .delateImg {
        color: #409eff;
        cursor: pointer;
        margin-top: 5px;
        height: 20px;
      }
      .life-first {
        .icon-img {
          text-align: center;
          .circle {
            height: 120px;
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
          }
          .circle-bg-img {
            height: 80px;
            width: 80px;
            border-radius: 50px;
          }
        }
        .banner-img {
          text-align: center;
          .banner-bg-img {
            height: 125px;
            width: 200px;
            img {
              width: 200px;
              height: 100px;
            }
          }
          .circle {
            height: 80px;
            width: 80px;
            border-radius: 50px;
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
      margin-left:10px;
      .tapTitle {
        width: 80px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border: 1px solid #e4e7ed;
        margin-bottom: 20px;
      }
      .zone-second-configure {
        display: flex;
        align-items: center;
      }
      .delete {
        text-align: center;
        cursor: pointer;
        height: 28px;
        width: 50px;
        line-height: 28px;
        font-size: 12px;
        background-color: #409eff;
        border-radius: 3px;
        color: #fff;
        font-family: "Microsoft Yahei", sans-serif;
      }
    }
  }
}
</style>
