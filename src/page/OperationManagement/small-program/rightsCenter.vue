<template>
    <div class="cardDetail">
        <div>
            <div class="content">
                <div class="content-left">
                    <div class="ml10 mb20 life-first mt20">
                        <div style="font-size:18px;color:#333" class="mb10">乘车权益：</div>
                        <div class="headerTitle mb20">权益顶部banner位</div>
                        <div class="banner-img commdis">
                            <div v-for="(item,index) in rightsBaTopList" :key="index">
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
                                @click="handleInputBanner(3,1)"
                                v-show="rightsBaTopList.length<3"
                            >
                                <img class="circle-bg-img" :src="logo">
                            </div>
                        </div>
                    </div>
                    <div class="ml10 mb20 life-first">
                        <div class="headerTitle mb20">权益运营(icon位)</div>
                        <el-row :gutter="4">
                            <el-col :span="12">
                                <div class="icon-img commdis">
                                    <div v-for="(item,index) in rightsIconList" :key="index">
                                        <div class="circle mr20" v-if="item.iconImg">
                                            <img
                                                class="top-icon"
                                                :src="item.superscriptImg"
                                                v-show="item.superscriptImg"
                                            >
                                            <img
                                                class="circle-bg-img"
                                                :src="item.iconImg"
                                                @click="handleInputIcon(item.iconId,3,item.iconType)"
                                            >
                                            <div>{{item.iconName}}</div>
                                            <div
                                                class="delateImg"
                                                @click="handleDelIconImg(item.iconId)"
                                                v-show="item.iconName"
                                            >删除</div>
                                        </div>
                                    </div>
                                    <div @click="handleAddInputIcon(3)">
                                        <img
                                            class="circle-bg-img logo"
                                            :src="logo"
                                            v-show="rightsIconList.length<6"
                                        >
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="ml10 mb20 life-first">
                        <div class="headerTitle mb20">权益底部banner位</div>
                        <div class="banner-img commdis">
                            <div v-for="(item,index) in rightsBaBotList" :key="index">
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
                                @click="handleInputBanner(3,2)"
                                v-show="rightsBaBotList.length<3"
                            >
                                <img class="circle-bg-img" :src="logo">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content-right">
                    <div class="upload-img mb20" v-show="iconType">
                        <template v-if="isIconEditor">
                            <div>
                                <div v-show="secondIconType === 1 || secondIconType === 5 || secondIconType === 6 ">
                                    <div class="wth300 mb20">
                                        <el-input
                                            v-model="zone.iconName"
                                            placeholder="输入icon名称(显示4个字符)"
                                        ></el-input>
                                    </div>
                                    <div class="wth300 mb20">
                                        <el-input v-model="zone.linkUrl" placeholder="输入跳转url"></el-input>
                                    </div>
                                    <div class="commdis mb20">
                                        <div class="wth300">
                                            <el-input v-model="zone.iconImg" placeholder="图片url"></el-input>
                                        </div>
                                        <div class="ml20">
                                            <el-upload
                                                class="upload-demo"
                                                ref="upload"
                                                :action="uploadimgUrl"
                                                :on-remove="handleRemove"
                                                :before-remove="beforeRemove"
                                                :on-success="handleAvatarSuccess"
                                                :before-upload="beforeAvatarUpload"
                                                :limit="1"
                                                :on-exceed="handleExceed"
                                            >
                                                <el-button size="small" type="primary">点击上传</el-button>
                                            </el-upload>
                                        </div>
                                    </div>
                                    <div class="commdis mb20">
                                        <div class="wth300">
                                            <el-input
                                                v-model="zone.superscriptImg"
                                                placeholder="图片url"
                                            ></el-input>
                                        </div>
                                        <div class="ml20">
                                            <el-upload
                                                class="upload-demo"
                                                ref="upload2"
                                                :action="uploadimgUrl"
                                                :on-remove="handleRemove"
                                                :before-remove="beforeRemove"
                                                :on-success="handleMarkSuccess"
                                                :before-upload="beforeAvatarUpload"
                                                :limit="1"
                                                :on-exceed="handleExceed"
                                            >
                                                <el-button size="small" type="primary">点击角标上传</el-button>
                                            </el-upload>
                                        </div>
                                    </div>
                                    <div class="commdis">
                                        <div class="ml20">
                                            <el-button type="primary" @click="handleBaseAddZone">确定</el-button>
                                        </div>
                                        <div class="ml20">
                                            <el-button @click="handleCancelZone">取消</el-button>
                                        </div>
                                    </div>
                                </div>
                                <div v-show="secondIconType === 4">
                                    <div class="wth300 mb20">
                                        <el-input
                                            v-model="zone.iconName"
                                            placeholder="输入icon名称(显示4个字符)"
                                        ></el-input>
                                    </div>
                                    <div class="wth300 mb20">
                                        <el-input v-model="zone.linkUrl" placeholder="输入跳转url"></el-input>
                                    </div>
                                    <div class="commdis mb20">
                                        <div class="wth300">
                                            <el-input v-model="zone.iconImg" placeholder="图片url"></el-input>
                                        </div>
                                        <div class="ml20">
                                            <el-upload
                                                class="upload-demo"
                                                ref="upload3"
                                                :action="uploadimgUrl"
                                                :on-remove="handleRemove"
                                                :before-remove="beforeRemove"
                                                :on-success="handleAvatarSuccess"
                                                :before-upload="beforeAvatarUpload"
                                                :limit="1"
                                                :on-exceed="handleExceed"
                                            >
                                                <el-button size="small" type="primary">点击上传</el-button>
                                            </el-upload>
                                        </div>
                                    </div>
                                    <div class="commdis mb20">
                                        <div class="wth300">
                                            <el-input
                                                v-model="zone.superscriptImg"
                                                placeholder="图片url"
                                            ></el-input>
                                        </div>
                                        <div class="ml20">
                                            <el-upload
                                                class="upload-demo"
                                                ref="upload4"
                                                :action="uploadimgUrl"
                                                :on-remove="handleRemove"
                                                :before-remove="beforeRemove"
                                                :on-success="handleMarkSuccess"
                                                :before-upload="beforeAvatarUpload"
                                                :limit="1"
                                                :on-exceed="handleExceed"
                                            >
                                                <el-button size="small" type="primary">点击角标上传</el-button>
                                            </el-upload>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="zone-second-configure mb20">
                                            <div class="mr20">二级页面配置</div>
                                            <div>
                                                <el-button
                                                    type="primary"
                                                    icon="el-icon-plus"
                                                    @click="handleAdd"
                                                ></el-button>
                                            </div>
                                        </div>
                                        <div
                                            class="secondary-pages"
                                            v-for="(item,index) in secondPageData.iconSecondList"
                                            :key="index"
                                        >
                                            <div class="wth300 mb20">
                                                <el-input
                                                    v-model="item.bannerName"
                                                    placeholder="标题"
                                                ></el-input>
                                            </div>
                                            <div class="commdis mb20">
                                                <div class="wth300">
                                                    <el-input
                                                        v-model="item.bannerImage"
                                                        placeholder="顶部banner"
                                                    ></el-input>
                                                </div>
                                                <div class="ml20">
                                                    <el-upload
                                                        class="upload-demo"
                                                        ref="upload5"
                                                        :action="uploadimgUrl"
                                                        :on-remove="handleRemove"
                                                        :before-remove="beforeRemove"
                                                        :on-success="handleSecPageSuccess"
                                                        :before-upload="beforeAvatarUpload"
                                                        :limit="1"
                                                        :on-exceed="handleExceed"
                                                    >
                                                        <el-button
                                                            size="small"
                                                            type="primary"
                                                            @click="handleUpload(index)"
                                                        >点击上传</el-button>
                                                    </el-upload>
                                                </div>
                                            </div>
                                            <div class="commdis mb20">
                                                <div class="wth300">
                                                    <el-input
                                                        v-model="item.h5Url"
                                                        placeholder="对应链接"
                                                    ></el-input>
                                                </div>
                                                <div
                                                    class="ml20 delete"
                                                    @click="handleDelete(index,item.secondIconId)"
                                                >删除</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="commdis">
                                        <div class="ml20">
                                            <el-button type="primary" @click="handleSecondZone">确定</el-button>
                                        </div>
                                        <div class="ml20">
                                            <el-button @click="handleCancelZone">取消</el-button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <template v-else-if="!isIconEditor">
                            <el-tabs v-model="activeName" @tab-click="handleClick">
                                <el-tab-pane label="基础icon" name="first">
                                    <div class="wth300 mb20">
                                        <el-input
                                            v-model="zone.iconName"
                                            placeholder="输入icon名称(显示4个字符)"
                                        ></el-input>
                                    </div>
                                    <div class="wth300 mb20">
                                        <el-input v-model="zone.linkUrl" placeholder="输入跳转url"></el-input>
                                    </div>
                                    <div class="commdis mb20">
                                        <div class="wth300">
                                            <el-input v-model="zone.iconImg" placeholder="图片url"></el-input>
                                        </div>
                                        <div class="ml20">
                                            <el-upload
                                                class="upload-demo"
                                                ref="upload"
                                                :action="uploadimgUrl"
                                                :on-remove="handleRemove"
                                                :before-remove="beforeRemove"
                                                :on-success="handleAvatarSuccess"
                                                :before-upload="beforeAvatarUpload"
                                                :limit="1"
                                                :on-exceed="handleExceed"
                                            >
                                                <el-button size="small" type="primary">点击上传</el-button>
                                            </el-upload>
                                        </div>
                                    </div>
                                    <div class="commdis mb20">
                                        <div class="wth300">
                                            <el-input
                                                v-model="zone.superscriptImg"
                                                placeholder="图片url"
                                            ></el-input>
                                        </div>
                                        <div class="ml20">
                                            <el-upload
                                                class="upload-demo"
                                                ref="upload2"
                                                :action="uploadimgUrl"
                                                :on-remove="handleRemove"
                                                :before-remove="beforeRemove"
                                                :on-success="handleMarkSuccess"
                                                :before-upload="beforeAvatarUpload"
                                                :limit="1"
                                                :on-exceed="handleExceed"
                                            >
                                                <el-button size="small" type="primary">点击角标上传</el-button>
                                            </el-upload>
                                        </div>
                                    </div>
                                    <div class="commdis">
                                        <div class="ml20">
                                            <el-button type="primary" @click="handleBaseAddZone">确定</el-button>
                                        </div>
                                        <div class="ml20">
                                            <el-button @click="handleCancelZone">取消</el-button>
                                        </div>
                                    </div>
                                </el-tab-pane>
                                <el-tab-pane label="二级内容icon" name="second">
                                    <div class="wth300 mb20">
                                        <el-input
                                            v-model="zone.iconName"
                                            placeholder="输入icon名称(显示4个字符)"
                                        ></el-input>
                                    </div>
                                    <div class="wth300 mb20">
                                        <el-input v-model="zone.linkUrl" placeholder="输入跳转url"></el-input>
                                    </div>
                                    <div class="commdis mb20">
                                        <div class="wth300">
                                            <el-input v-model="zone.iconImg" placeholder="图片url"></el-input>
                                        </div>
                                        <div class="ml20">
                                            <el-upload
                                                class="upload-demo"
                                                ref="upload3"
                                                :action="uploadimgUrl"
                                                :on-remove="handleRemove"
                                                :before-remove="beforeRemove"
                                                :on-success="handleAvatarSuccess"
                                                :before-upload="beforeAvatarUpload"
                                                :limit="1"
                                                :on-exceed="handleExceed"
                                            >
                                                <el-button size="small" type="primary">点击上传</el-button>
                                            </el-upload>
                                        </div>
                                    </div>
                                    <div class="commdis mb20">
                                        <div class="wth300">
                                            <el-input
                                                v-model="zone.superscriptImg"
                                                placeholder="图片url"
                                            ></el-input>
                                        </div>
                                        <div class="ml20">
                                            <el-upload
                                                class="upload-demo"
                                                ref="upload4"
                                                :action="uploadimgUrl"
                                                :on-remove="handleRemove"
                                                :before-remove="beforeRemove"
                                                :on-success="handleMarkSuccess"
                                                :before-upload="beforeAvatarUpload"
                                                :limit="1"
                                                :on-exceed="handleExceed"
                                            >
                                                <el-button size="small" type="primary">点击角标上传</el-button>
                                            </el-upload>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="zone-second-configure mb20">
                                            <div class="mr20">二级页面配置</div>
                                            <div>
                                                <el-button
                                                    type="primary"
                                                    icon="el-icon-plus"
                                                    @click="handleAdd"
                                                ></el-button>
                                            </div>
                                        </div>
                                        <div
                                            class="secondary-pages"
                                            v-for="(item,index) in secondPageData.iconSecondList"
                                            :key="index"
                                        >
                                            <div class="wth300 mb20">
                                                <el-input
                                                    v-model="item.bannerName"
                                                    placeholder="标题"
                                                ></el-input>
                                            </div>
                                            <div class="commdis mb20">
                                                <div class="wth300">
                                                    <el-input
                                                        v-model="item.bannerImage"
                                                        placeholder="顶部banner"
                                                    ></el-input>
                                                </div>
                                                <div class="ml20">
                                                    <el-upload
                                                        class="upload-demo"
                                                        ref="upload5"
                                                        :action="uploadimgUrl"
                                                        :on-remove="handleRemove"
                                                        :before-remove="beforeRemove"
                                                        :on-success="handleSecPageSuccess"
                                                        :before-upload="beforeAvatarUpload"
                                                        :limit="1"
                                                        :on-exceed="handleExceed"
                                                    >
                                                        <el-button
                                                            size="small"
                                                            type="primary"
                                                            @click="handleUpload(index)"
                                                        >点击上传</el-button>
                                                    </el-upload>
                                                </div>
                                            </div>
                                            <div class="commdis mb20">
                                                <div class="wth300">
                                                    <el-input
                                                        v-model="item.h5Url"
                                                        placeholder="对应链接"
                                                    ></el-input>
                                                </div>
                                                <div
                                                    class="ml20 delete"
                                                    @click="handleDelete(index,item.secondIconId)"
                                                >删除</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="commdis">
                                        <div class="ml20">
                                            <el-button type="primary" @click="handleSecondZone">确定</el-button>
                                        </div>
                                        <div class="ml20">
                                            <el-button @click="handleCancelZone">取消</el-button>
                                        </div>
                                    </div>
                                </el-tab-pane>
                            </el-tabs>
                        </template>
                    </div>
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
        </div>
        <app-loading :loadingShow="loadingShow"></app-loading>
    </div>
</template>
<script>
import cardService from "../../../service/OperationManagement/cardDetail";
import aliAppService from "../../../service/OperationManagement/aliApp";
import apiHost from "@/hostconfig/index";
import moment from "@/utils/moment";
import AppLoading from "../../OperationManagement/comm/loading.vue";
import headTop from "../../../components/headTop";

export default {
  data() {
    return {
      logo: "./static/images/add.png",
      loadingShow: false,
      activeName: "first",
      uploadimgUrl: `${apiHost.netImg}prefer/api/fileUploadOne`,
      iconType: false,
      secondIconType: "",
      bannerType: false,
      secondaryPagesType: 0,
      fileList: [],
      tagIconId: "",
      isBannerEditor: false,
      isIconEditor: false,
      zone: {
        iconName: "",
        linkUrl: "",
        iconImg: "",
        superscriptImg: "",
        zoneId: 1
      },
      secondPageData: {
        icon: {
          iconId: 0,
          iconImg: "",
          iconImgClick: "",
          iconName: "",
          linkUrl: "",
          superscriptImg: ""
        },
        iconSecondList: [
          {
            bannerImage: "",
            bannerName: "",
            bannerUrl: "",
            h5Url: "",
            parentIconId: 0,
            secondIconId: 0
          }
        ]
      },
      saveData: {
        tagText: "",
        zone1: {
          name: "",
          iconList: []
        },
        zone2: {
          name: "",
          iconList: []
        },
        zone3: {
          name: "",
          iconList: []
        }
      },
      rightsIconList: [
        {
          iconId: "",
          iconImg: "",
          iconName: "",
          linkUrl: "",
          superscriptImg: "",
          iconType: ""
        }
      ],
      //banner
      addBanner: {
        pageId: "",
        bannerImage: "",
        name: "",
        bannerUrl: "",
        pageLocation: ""
      },
      rightsBaTopList: [
        {
          pageId: "",
          bannerImage: "",
          name: "",
          bannerUrl: "",
          pageLocation: ""
        }
      ],
      rightsBaBotList: [
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
    this.getBannerList(3, 1);
    this.getBannerList(3, 2);
    this.getByParam(3, 1);
  },
  components: {
    AppLoading,
    headTop
  },
  methods: {
    // 选项卡切换事件
    handleClick(tab, event) {
      if (
        this.activeName === "second" &&
        this.isIconEditor &&
        this.secondIconType == 4
      ) {
        this.getSecondeInfor(this.tagIconId);
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
      this.addBanner.pageId = pageId;
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
    //删除icon
    handleDelIconImg(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteIcon(id);
          this.iconType = false;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleInputIcon(iconId, pageId, type) {
      this.secondIconType = type;
      this.zone.pageId = pageId;
      this.iconType = true;
      this.bannerType = false;
      this.isIconEditor = true;
      if (iconId) {
        this.tagIconId = iconId;
        if (this.secondIconType == 4) {
          this.secondPageData.iconSecondList = [
            {
              bannerImage: "",
              bannerName: "",
              bannerUrl: "",
              h5Url: "",
              parentIconId: 0,
              secondIconId: 0
            }
          ];
          this.getSecondeInfor(this.tagIconId);
        }
        if (pageId === 3) {
          this.rightsIconList.forEach(item => {
            if (item.iconId == iconId) {
              this.zone.iconImg = item.iconImg;
              this.zone.iconName = item.iconName;
              this.zone.linkUrl = item.linkUrl;
              this.zone.superscriptImg = item.superscriptImg;
            }
          });
        }
      }
    },
    handleAddInputIcon(pageId) {
      this.zone.pageId = pageId;
      this.iconType = true;
      this.bannerType = false;
      this.isIconEditor = false;
      this.zone.iconName = "";
      this.zone.linkUrl = "";
      this.zone.iconImg = "";
      this.zone.superscriptImg = "";
      this.secondPageData.iconSecondList = [
        {
          bannerImage: "",
          bannerName: "",
          bannerUrl: "",
          h5Url: "",
          parentIconId: 0,
          secondIconId: 0
        }
      ];
    },
    // 基础icon上传确定
    handleBaseAddZone() {
      if (this.zone.iconImg === "") {
        this.$message({
          message: "参数输入不全",
          type: "warning"
        });
        return;
      }
      if (this.isIconEditor) {
        this.zone.iconId = this.tagIconId;
        this.updateIcon();
      } else {
        this.addAliAppIcon();
      }
      this.$refs.upload.clearFiles();
      this.$refs.upload2.clearFiles();
      this.activeName = "first";
      this.iconType = false;
      this.secondIconType = "";
    },
    //
    handleSecondZone() {
      if (this.zone.iconImg === "") {
        this.$message({
          message: "参数输入不全",
          type: "warning"
        });
        return;
      }
      this.iconType = false;
      this.secondIconType = "";
      this.$refs.upload3.clearFiles();
      this.$refs.upload4.clearFiles();
      this.$refs.upload5.forEach(item => {
        item.clearFiles();
      });
      this.secondPageData.icon = JSON.parse(JSON.stringify(this.zone));
      if (this.isIconEditor) {
        this.secondPageData.icon.iconId = this.tagIconId;
      } else {
        this.secondPageData.icon.iconId = 0;
        this.secondPageData.icon.secondIconId = 0;
      }
      this.updateSecondeInfor();
    },
    // 删除当前banner的地址和跳转url
    handleDelete(index, id) {
      cardService.deleteDetail(id).then(
        response => {
          if (this.secondPageData.iconSecondList.length === 1) {
            this.secondPageData.iconSecondList.forEach(item => {
              item.bannerImage = "";
              item.banner = "";
              item.h5Url = "";
              item.secondIconId = 0;
              item.bannerName = "";
            });
          } else {
            this.secondPageData.iconSecondList.splice(index, 1);
          }
        },
        response => {
          this.$message.error("请求服务器连接失败!");
        }
      );
    },
    // 第二行icon取消
    handleCancelZone() {
      this.iconType = false;
      this.bannerType = false;
      this.secondIconType = "";
      this.activeName = "first";
      this.zone.iconName = "";
      this.zone.linkUrl = "";
      this.zone.superscriptImg = "";
      this.zone.iconImg = "";
      this.secondPageData.iconSecondList.forEach(item => {
        item.bannerImage = "";
        item.bannerName = "";
        item.bannerUrl = "";
        item.h5Url = "";
      });
    },
    // 新增二级页面配置
    handleAdd() {
      if (this.secondPageData.iconSecondList.length < 7) {
        this.secondPageData.iconSecondList.push({
          bannerName: "",
          bannerImage: "",
          h5Url: "",
          secondIconId: 0
        });
      }
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
    // 第一类型第一行上传文件成功
    handleAvatarSuccess(response, file) {
      this.zone.iconImg = `https://${response.data}`;
    },
    // 第一类型第二行上传文件成功
    handleMarkSuccess(response, file) {
      this.zone.superscriptImg = `https://${response.data}`;
    },
    handleUpload(index) {
      this.secondaryPagesType = index;
    },
    // 二级内容icon内文件上传成功
    handleSecPageSuccess(response, file, fileList) {
      this.secondPageData.iconSecondList.forEach((item, index) => {
        if (index === this.secondaryPagesType) {
          item.bannerImage = `https://${response.data}`;
        }
      });
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
          this.getBannerList(3, 1);
          this.getBannerList(3, 2);
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
          this.getBannerList(3, 1);
          this.getBannerList(3, 2);
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
          if (pageId === 3 && pageLocation === 1) {
            if (response.data) {
              this.rightsBaTopList = JSON.parse(JSON.stringify(response.data));
            } else {
              this.rightsBaTopList = [];
            }
          } else {
            if (response.data) {
              this.rightsBaBotList = JSON.parse(JSON.stringify(response.data));
            } else {
              this.rightsBaBotList = [];
            }
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
          this.getBannerList(3, 1);
          this.getBannerList(3, 2);
        },
        response => {
          this.$message.error("请求服务器连接失败!");
        }
      );
    },
    // 添加icon图片接口
    addAliAppIcon() {
      const data = this.zone;
      aliAppService.addAliAppIcon(data).then(
        response => {
          this.$message({
            message: "保存成功",
            type: "success"
          });
          this.getByParam(3, 1);
        },
        response => {
          this.$message.error("请求服务器连接失败!");
        }
      );
    },
    // 删除icon图片接口
    deleteIcon(id) {
      aliAppService.deleteIcon(id).then(
        response => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getByParam(3, 1);
        },
        response => {
          this.$message.error("请求服务器连接失败!");
        }
      );
    },
    // 获取icon详情接口
    getByParam(pageId, zoneId) {
      const data = {
        pageId: pageId,
        zoneId: zoneId
      };
      aliAppService.getByParam(data).then(
        response => {
          if (response.data) {
            this.rightsIconList = JSON.parse(JSON.stringify(response.data));
          } else {
            this.rightsIconList = [];
          }
        },
        response => {
          this.$message.error("请求服务器连接失败!");
        }
      );
    },
    // 获取icon详情接口
    updateIcon() {
      const data = this.zone;
      aliAppService.updateIcon(data).then(
        response => {
          this.getByParam(3, 1);
        },
        response => {
          this.$message.error("请求服务器连接失败!");
        }
      );
    },
    // 保存二级页面数据
    updateSecondeInfor() {
      this.secondPageData.iconSecondList.forEach(item => {
        item.parentIconId = this.secondPageData.icon.iconId;
        //   if(item.secondIconId === 0)  delete(item['secondIconId']);
      });
      const data = JSON.parse(JSON.stringify(this.secondPageData));
      cardService.updateSecondeInfor(data).then(
        response => {
          this.$message({
            message: "保存成功",
            type: "success"
          });
          this.getByParam(3, 1);
        },
        response => {
          this.$message.error("请求服务器连接失败!");
        }
      );
    },
    // 获取二级页面详情接口
    getSecondeInfor(id) {
      cardService.getSecondeInfor(id).then(
        response => {
          if (response.data) {
            this.secondPageData.iconSecondList = JSON.parse(
              JSON.stringify(response.data)
            );
          } else {
            this.secondPageData.iconSecondList.forEach(item => {
              item.bannerImage = "";
              item.bannerUrl = "";
              item.h5Url = "";
            });
          }
        },
        response => {
          this.$message.error("请求服务器连接失败!");
        }
      );
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
<style>
.el-tabs__nav-wrap:after {
  width: 0;
}
</style>

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
    justify-content: center;
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
          width: 80px;
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
      flex: 0.7;
      margin-top: 20px;
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
