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
                <div class="editor">
                    <el-button type="primary" @click="handleSave">保存</el-button>
                </div>
            </div>
            <div class="content">
                    <div class="content-left">
                        <div class="ml10 mb20 life-first">
                            <div class="commdis">
                                <div class="title mb20" v-show="!firstTitleTag">{{saveData.zone1.name}}:</div>
                                <div class="wth200 mb20" v-show="firstTitleTag">
                                    <el-input v-model="saveData.zone1.name" placeholder="输入标题"></el-input>
                                </div>
                                <div style="height:40px"><i class="el-icon-edit pl10" @click="handFirstTag"></i></div>
                            </div>
                                <el-row :gutter="4" class="mb20 mt10">
                                    <el-col :span="6" v-for="(item,index) in saveData.zone1.iconList" :key="index">
                                        <div class="icon-img" @click="handleInputZone1(item.iconId)">
                                            <div class="circle" :class="{logo: !item.iconImg}">
                                                <img class="top-icon" :src="item.superscriptImg" v-show="item.superscriptImg">
                                                <img class="circle-bg-img" :src="item.iconImg" v-if="item.iconImg">
                                                <img class="circle-bg-img" :src="logo" v-else>
                                            </div>
                                            <div>{{item.name}}</div>
                                        </div>
                                    </el-col>
                                </el-row>
                        </div>
                        <div class="ml10 mb20 life-first">
                            <div class="commdis">
                                <div class="title mb20" v-show="!secondTitleTag">{{saveData.zone2.name}}:</div>
                                <div class="wth200 mb20" v-show="secondTitleTag">
                                    <el-input v-model="saveData.zone2.name" placeholder="输入标题"></el-input>
                                </div>
                                <div style="height:40px"><i class="el-icon-edit pl10" @click="handSecondTag"></i></div>
                                <div class="title mb20" v-show="!thirdTitleTag">{{saveData.tagText}}</div>
                                <div class="wth200 mb20" v-show="thirdTitleTag">
                                    <el-input v-model="saveData.tagText" placeholder="输入标题"></el-input>
                                </div>
                                <div style="height:40px"><i class="el-icon-edit pl10" @click="handThirdTag"></i></div>
                            </div>
                            <el-row :gutter="4" class="mb20 mt10">
                                <el-col :span="6" v-for="(item,index) in zone2FirstIconList" :key="index">
                                    <div class="icon-img" @click="handleInputZone2(item.iconId)">
                                        <div class="circle" :class="{logo: !item.iconImg}">
                                            <img class="top-icon" :src="item.superscriptImg" v-show="item.superscriptImg">
                                            <img class="circle-bg-img" :src="item.iconImg" @mouseenter="showClickImg(index)" v-if="iconimgType && item.iconImg">
                                            <img class="circle-bg-img" :src="logo" @mouseenter="showClickImg(index)" v-else-if="iconimgType && !item.iconImg">
                                            <img class="circle-bg-img" :src="item.iconImgClick"  @mouseleave="hiddClickImg(index)" v-else-if="!iconimgType && hoverType == index">
                                            <img class="circle-bg-img" :src="item.iconImg"  @mouseleave="hiddClickImg(index)" v-else="!iconimgType && hoverType !== index">
                                        </div>
                                        <div>{{item.name}}</div>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="4">
                                <el-col :span="6" v-for="(item,index) in zone2SecondIconList" :key="index">
                                    <div class="icon-img" @click="handleInputZone2(item.iconId)">
                                        <div class="circle" :class="{logo: !item.iconImg}">
                                            <img class="top-icon" :src="item.superscriptImg" v-show="item.superscriptImg">
                                            <img class="circle-bg-img" :src="item.iconImg"  @mouseenter="showClickImgSecond(index)" v-if="iconimgType2 && item.iconImg">
                                            <img class="circle-bg-img" :src="logo"  @mouseenter="showClickImgSecond(index)" v-else-if="iconimgType2 && !item.iconImg">
                                            <img class="circle-bg-img" :src="item.iconImgClick" @mouseleave="hiddClickImgSecond(index)" v-else-if="!iconimgType2 && hoverType == index">
                                            <img class="circle-bg-img" :src="item.iconImg"  @mouseleave="hiddClickImgSecond(index)" v-else="!iconimgType2 && hoverType !== index">
                                        </div>
                                        <div>{{item.name}}</div>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="ml10 mb30 life-first">
                            <div class="commdis">
                                <div class="title mb20" v-show="!fouthTitleTag">{{saveData.zone3.name}}:</div>
                                <div class="wth200 mb20" v-show="fouthTitleTag">
                                    <el-input v-model="saveData.zone3.name" placeholder="输入标题"></el-input>
                                </div>
                                <div style="height:40px"><i class="el-icon-edit pl10" @click="handFouthTag"></i></div>
                            </div>
                            <el-row :gutter="4" class="mb20">
                                <el-col :span="6" v-for="(item,index) in saveData.zone3.iconList" :key="index">
                                    <div class="icon-img" @click="handleInputZone3(item.iconId)">
                                        <div class="circle" :class="{logo: !item.iconImg}">
                                            <img class="top-icon" :src="item.superscriptImg" v-show="item.superscriptImg">
                                            <img class="circle-bg-img" :src="item.iconImg" v-if="item.iconImg">
                                            <img class="circle-bg-img" :src="logo" v-else>
                                        </div>
                                        <div>{{item.name}}</div>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                    <div class="content-right">
                        <div class="upload-img mb20" v-show="typeFirst">
                                <div class="wth300 mb20">
                                    <el-input v-model="zone1.name" placeholder="输入icon名称(显示4个字符)"></el-input>
                                </div>
                                <div class="wth300 mb20">
                                    <el-input v-model="zone1.linkUrl" placeholder="跳转url"></el-input>
                                </div>
                                <div class="commdis mb20">
                                    <div class="wth300"><el-input v-model="zone1.iconImg" placeholder="图片地址url"></el-input></div>
                                    <div class="ml20">
                                        <el-upload
                                            class="upload-demo"
                                            ref='upload'
                                            :action="uploadimgUrl"
                                            :on-remove="handleRemove"
                                            :before-remove="beforeRemove"
                                            :on-success="handleAvatarSuccess1"
                                            :before-upload="beforeAvatarUpload"
                                            :limit="1"
                                            :file-list="fileList"
                                            :on-exceed="handleExceed"
                                            >
                                        <el-button size="small" type="primary">点击上传</el-button>
                                        </el-upload>
                                    </div>
                                </div>
                                <div class="commdis mb20">
                                    <div class="wth300"><el-input v-model="zone1.superscriptImg" placeholder="图片地址url"></el-input></div>
                                    <div class="ml20">
                                        <el-upload
                                            class="upload-demo"
                                            ref='uploadMark'
                                            :action="uploadimgUrl"
                                            :on-remove="handleRemove"
                                            :before-remove="beforeRemove"
                                            :on-success="handleMarkSuccess1"
                                            :before-upload="beforeAvatarUpload"
                                            :limit="1"
                                            :file-list="fileList"
                                            :on-exceed="handleExceed"
                                            >
                                        <el-button size="small" type="primary">点击角标上传</el-button>
                                        </el-upload>
                                    </div>
                                </div>
                                <div v-show="firstTypeSePage">
                                    <div class="mb20">二级页面</div>
                                    <div class="wth300 mb20">
                                        <el-input v-model="secondPageData.iconSecondList[0].bannerName" placeholder="标题"></el-input>
                                    </div>
                                    <div class="commdis mb20">
                                        <div class="wth300"><el-input v-model="secondPageData.iconSecondList[0].bannerImage" placeholder="顶部banner"></el-input></div>
                                        <div class="ml20">
                                            <el-upload
                                                class="upload-demo"
                                                ref='upload'
                                                :action="uploadimgUrl"
                                                :on-remove="handleRemove"
                                                :before-remove="beforeRemove"
                                                :on-success="handleAvatarSuccess1"
                                                :before-upload="beforeAvatarUpload"
                                                :limit="1"
                                                :file-list="fileList"
                                                :on-exceed="handleExceed"
                                                >
                                            <el-button size="small" type="primary" @click="handleSecondImg">点击上传</el-button>
                                            </el-upload>
                                        </div>
                                    </div>
                                    <div class="wth300 mb20">
                                        <el-input v-model="secondPageData.iconSecondList[0].bannerUrl" placeholder="对应链接地址"></el-input>
                                    </div>
                                    <div class="wth300 mb20">
                                        <el-input v-model="secondPageData.iconSecondList[0].h5Url" placeholder="h5嵌入链接地址"></el-input>
                                    </div>
                                </div>
                                <div class="commdis">
                                    <div class="ml20"><el-button type="primary"  @click="handleDetermineZone1">确定</el-button></div>
                                    <div class="ml20"><el-button @click="handleCancelZone1">取消</el-button></div>
                                </div>
                        </div>
                        <div class="upload-img mb20" v-show="typeSecond">
                                <div class="wth300 mb20">
                                    <el-input v-model="zone2.name" placeholder="输入icon名称(显示4个字符)"></el-input>
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
                                    <div class="wth300"><el-input v-model="zone2.iconImgClick" placeholder="图片url"></el-input></div>
                                    <div class="ml20">
                                        <el-upload
                                            class="upload-demo"
                                            ref='upload3'
                                            :action="uploadimgUrl"
                                            :on-remove="handleRemove"
                                            :before-remove="beforeRemove"
                                            :on-success="handleHoverSuccess2"
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
                                            ref='uploadMark2'
                                            :action="uploadimgUrl"
                                            :on-remove="handleRemove"
                                            :before-remove="beforeRemove"
                                            :on-success="handleMarkSuccess2"
                                            :before-upload="beforeAvatarUpload"
                                            :limit="1"
                                            :on-exceed="handleExceed">
                                        <el-button size="small" type="primary">点击角标上传</el-button>
                                        </el-upload>
                                    </div>
                                </div>
                                <div class="commdis mb20">
                                    <div class="wth150 mr10">
                                        <el-input v-model="zone2.adzoneId" placeholder="推广位Id"></el-input>
                                    </div>
                                    <div class="wth150 mr10">
                                        <el-select v-model="zone2.favoritesOp" clearable filterable   placeholder="选品库（自选)">
                                            <el-option v-for="(item,index) in favoritesOpList" :key="index" :label="item.favoritesTitle" :value="item.favoritesId">
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <div class="wth150">
                                        <el-select v-model="zone2.favoritesTbk" filterable   placeholder="选品库（淘宝客)">
                                            <el-option v-for="(item,index) in favoritesTbkList" :key="index" :label="item.favoritesTitle" :value="item.favoritesId">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                                <div class="commdis">
                                    <div class="ml20"><el-button type="primary" @click="handleDetermineZone2">确定</el-button></div>
                                    <div class="ml20"><el-button @click="handleCancelZone2">取消</el-button></div>
                                </div>
                        </div>
                        <div class="upload-img" v-show="typeThird" style="margin-bottom:30px">
                                <div class="wth300 mb20">
                                    <el-input v-model="zone3.name" placeholder="输入icon名称(显示4个字符)"></el-input>
                                </div>
                                <div class="wth300 mb20">
                                    <el-input v-model="zone3.linkUrl" placeholder="输入跳转url"></el-input>
                                </div>
                                <div class="commdis mb20">
                                    <div class="wth300"><el-input v-model="zone3.iconImg" placeholder="图片url"></el-input></div>
                                    <div class="ml20">
                                        <el-upload
                                            class="upload-demo"
                                            ref='upload4'
                                            :action="uploadimgUrl"
                                            :on-remove="handleRemove"
                                            :before-remove="beforeRemove"
                                            :on-success="handleAvatarSuccess3"
                                            :before-upload="beforeAvatarUpload"
                                            :limit="1"
                                            :on-exceed="handleExceed">
                                        <el-button size="small" type="primary">点击上传</el-button>
                                        </el-upload>
                                    </div>
                                </div>
                                <div class="commdis mb20">
                                    <div class="wth300"><el-input v-model="zone3.superscriptImg" placeholder="角标图片url"></el-input></div>
                                    <div class="ml20">
                                        <el-upload
                                            class="upload-demo"
                                            ref='uploadMark3'
                                            :action="uploadimgUrl"
                                            :on-remove="handleRemove"
                                            :before-remove="beforeRemove"
                                            :on-success="handleMarkSuccess3"
                                            :before-upload="beforeAvatarUpload"
                                            :limit="1"
                                            :on-exceed="handleExceed">
                                        <el-button size="small" type="primary">点击角标上传</el-button>
                                        </el-upload>
                                    </div>
                                </div>
                                <div v-show="secondeTypesePage">
                                    <div class="zone-third-configure mb20">
                                        <div class="mr20">二级页面配置</div>
                                        <div><el-button type="primary" icon="el-icon-plus" @click="handleAdd"></el-button></div>
                                    </div>
                                    <div class="secondary-pages" v-for="(item,index) in secondPageData.iconSecondList" :key="index">
                                        <div class="wth300 mb20">
                                            <el-input v-model="item.bannerName" placeholder="标题"></el-input>
                                        </div>
                                        <div class="commdis mb20">
                                            <div class="wth300"><el-input v-model="item.bannerImage" placeholder="顶部banner"></el-input></div>
                                            <div class="ml20">
                                                <el-upload
                                                    class="upload-demo"
                                                    ref='upload5'
                                                    :action="uploadimgUrl"
                                                    :on-remove="handleRemove"
                                                    :before-remove="beforeRemove"
                                                    :on-success="handleAvatarSuccess4"
                                                    :before-upload="beforeAvatarUpload"
                                                    :limit="1"
                                                    :on-exceed="handleExceed">
                                                <el-button size="small" type="primary" @click="handleUpload(index)">点击上传</el-button>
                                                </el-upload>
                                            </div>
                                        </div>
                                        <div class="commdis mb20">
                                            <div class="wth300"><el-input v-model="item.h5Url" placeholder="对应链接"></el-input></div>
                                            <div class="ml20 delete" @click="handleDelete(index,item.secondIconId)">删除</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="commdis">
                                    <div class="ml20"><el-button type="primary" @click="handleDetermineZone3">确定</el-button></div>
                                    <div class="ml20"><el-button @click="handleCancelZone3">取消</el-button></div>
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
      logo: "./static/images/add.png",
      firstPagesType: 1,
      secondaryPagesType: 0,
      firstTypeSePage: false,
      secondeTypesePage: false,
      loadingShow: false,
      secondaryType: true,
      cityList: [
        {
          cityId: 1,
          cityName: "杭州",
        },{
           cityId:2,
          cityName: "苏州"
        }
      ],
      cityId: 1,
      favoritesOpList: [
        {
          favoritesId: "",
          favoritesTitle: ""
        }
      ],
      favoritesTbkList: [
        {
          favoritesId: "",
          favoritesTitle: ""
        }
      ],
      hoverType: "",
      iconimgType: true,
      iconimgType2: true,
      uploadimgUrl: `${apiHost.netImg}prefer/api/fileUploadOne`,
      typeFirst: false,
      typeSecond: false,
      typeThird: false,
      fileList: [],
      firstTitleTag: false,
      secondTitleTag: false,
      thirdTitleTag: false,
      fouthTitleTag: false,
      tagIconId: "",
      zone1: {
        name: "",
        linkUrl: "",
        iconImg: "",
        superscriptImg: ""
      },
      zone2: {
        name: "",
        linkUrl: "",
        iconImg: "",
        iconImgClick: "",
        superscriptImg: "",
        adzoneId: "",
        favoritesOp: "",
        favoritesTbk: ""
      },
      zone3: {
        name: "",
        linkUrl: "",
        iconImg: "",
        superscriptImg: ""
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
      zone2FirstIconList: [],
      zone2SecondIconList: [],
      secondPageData: {
        icon: {
          iconId: "",
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
            secondIconId: 0,
          }
        ]
      }
    };
  },
  created() {
    this.getDetail();
    this.getFavorites();
  },
  components: {
    AppLoading,
    headTop
  },
  methods: {
    showClickImg(index) {
      this.hoverType = index;
      this.iconimgType = false;
    },
    hiddClickImg(index) {
      this.iconimgType = true;
    },
    showClickImgSecond(index) {
      this.hoverType = index;
      this.iconimgType2 = false;
    },
    hiddClickImgSecond(index) {
      this.iconimgType2 = true;
    },
    handleInputZone1(iconId) {
      this.typeFirst = true;
      this.typeSecond = false;
      this.typeThird = false;
      this.tagIconId = iconId;
      this.saveData.zone1.iconList.forEach(item => {
        if (item.iconId == iconId) {
          this.zone1.iconImg = item.iconImg;
          this.zone1.name = item.name;
          this.zone1.linkUrl = item.linkUrl;
          this.zone1.superscriptImg = item.superscriptImg;
          item.iconType === 3
            ? (this.firstTypeSePage = true)
            : (this.firstTypeSePage = false);
          if (item.iconType === 3) {
            this.getSecondeInfor(item.iconId);
          }
        }
      });
    },
    handleInputZone2(iconId) {
      this.typeFirst = false;
      this.typeSecond = true;
      this.typeThird = false;
      this.tagIconId = iconId;
      this.zone2FirstIconList.forEach(item => {
        if (item.iconId == iconId) {
          this.zone2.iconImg = item.iconImg;
          this.zone2.iconImgClick = item.iconImgClick;
          this.zone2.name = item.name;
          this.zone2.linkUrl = item.linkUrl;
          this.zone2.adzoneId = item.adzoneId;
          this.zone2.favoritesOp = item.favoritesOp;
          this.zone2.favoritesTbk = item.favoritesTbk;
          this.zone2.superscriptImg = item.superscriptImg;
        }
      });
      this.zone2SecondIconList.forEach(item => {
        if (item.iconId == iconId) {
          this.zone2.iconImg = item.iconImg;
          this.zone2.iconImgClick = item.iconImgClick;
          this.zone2.name = item.name;
          this.zone2.linkUrl = item.linkUrl;
          this.zone2.adzoneId = item.adzoneId;
          this.zone2.favoritesOp = item.favoritesOp;
          this.zone2.favoritesTbk = item.favoritesTbk;
          this.zone2.superscriptImg = item.superscriptImg;
        }
      });
    },
    handleInputZone3(iconId) {
      this.typeFirst = false;
      this.typeSecond = false;
      this.typeThird = true;
      this.tagIconId = iconId;
      this.saveData.zone3.iconList.forEach(item => {
        if (item.iconId == iconId) {
          this.zone3.iconImg = item.iconImg;
          this.zone3.name = item.name;
          this.zone3.linkUrl = item.linkUrl;
          this.zone3.superscriptImg = item.superscriptImg;
          item.iconType === 4
            ? (this.secondeTypesePage = true)
            : (this.secondeTypesePage = false);
          if (item.iconType === 4) {
            this.getSecondeInfor(item.iconId);
          }
        }
      });
    },
    //第一行icon确定
    handleDetermineZone1() {
      this.typeFirst = false;
      this.$refs.upload.clearFiles();
      this.$refs.uploadMark.clearFiles();
      this.saveData.zone1.iconList.forEach(item => {
        if (item.iconId == this.tagIconId) {
          item.iconImg = this.zone1.iconImg;
          item.name = this.zone1.name;
          item.linkUrl = this.zone1.linkUrl;
          item.superscriptImg = this.zone1.superscriptImg;
        }
      });
      if(this.firstTypeSePage) {
         this.secondPageData.icon = JSON.parse(JSON.stringify(this.zone1));
         this.secondPageData.icon.iconName =  this.secondPageData.icon.name;
         delete this.secondPageData.icon.name ;
         this.secondPageData.icon.iconId = this.tagIconId
         this.updateSecondeInfor();
      }
    },
    //第一行icon取消
    handleCancelZone1() {
      this.typeFirst = false;
    },
    //第二行icon确定
    handleDetermineZone2() {
      this.zone2FirstIconList.forEach(item => {
        if (item.iconId == this.tagIconId) {
          item.iconImg = this.zone2.iconImg;
          item.iconImgClick = this.zone2.iconImgClick;
          item.name = this.zone2.name;
          item.linkUrl = this.zone2.linkUrl;
          item.adzoneId = this.zone2.adzoneId;
          item.favoritesOp = this.zone2.favoritesOp;
          item.favoritesTbk = this.zone2.favoritesTbk;
          item.superscriptImg = this.zone2.superscriptImg;
        }
      });
      this.zone2SecondIconList.forEach(item => {
        if (item.iconId == this.tagIconId) {
          item.iconImg = this.zone2.iconImg;
          item.iconImgClick = this.zone2.iconImgClick;
          item.name = this.zone2.name;
          item.linkUrl = this.zone2.linkUrl;
          item.adzoneId = this.zone2.adzoneId;
          item.favoritesOp = this.zone2.favoritesOp;
          item.favoritesTbk = this.zone2.favoritesTbk;
          item.superscriptImg = this.zone2.superscriptImg;
        }
      });
      this.typeSecond = false;
      this.$refs.upload2.clearFiles();
      this.$refs.upload3.clearFiles();
      this.$refs.uploadMark2.clearFiles();
    },
    // 第二行icon取消
    handleCancelZone2() {
      this.typeSecond = false;
    },
    //第三行确定
    handleDetermineZone3() {
      this.typeThird = false;
      this.$refs.uploadMark3.clearFiles();
      this.$refs.upload4.clearFiles();
      this.$refs.upload5.forEach((item) => {
          item.clearFiles();
      })
      this.saveData.zone3.iconList.forEach(item => {
        if (item.iconId == this.tagIconId) {
          item.iconImg = this.zone3.iconImg;
          item.name = this.zone3.name;
          item.linkUrl = this.zone3.linkUrl;
          item.superscriptImg = this.zone3.superscriptImg;
        }
      });
      if(this.secondeTypesePage) {
         this.secondPageData.icon = JSON.parse(JSON.stringify(this.zone3));
         this.secondPageData.icon.iconName =  this.secondPageData.icon.name;
         delete this.secondPageData.icon.name ;
         this.secondPageData.icon.iconId = this.tagIconId
         this.updateSecondeInfor();
      }
    },
    // 第三行取消
    handleCancelZone3() {
      this.typeThird = false;
    },
    //新增二级页面配置
    handleAdd() {
      if(this.secondPageData.iconSecondList.length < 7){
            this.secondPageData.iconSecondList.push({
            bannerName: "",
            bannerImage: "",
            h5Url: "",
            secondIconId: 0
        });
      }
    },
    // 删除当前banner的地址和跳转url
    handleDelete(index,id) {
        cardService.deleteDetail(id).then(
            response => {
                if(this.secondPageData.iconSecondList.length === 1) {
                    this.secondPageData.iconSecondList.forEach((item) => {
                        item.bannerImage = '';
                        item.banner = '';
                        item.h5Url = '';
                        item.secondIconId = 0;
                        item.bannerName = '';
                    })
                }else{
                    this.secondPageData.iconSecondList.splice(index, 1);
                }
                // this.secondPageData.iconSecondList.splice(index, 1);
            },
            response => {
                this.$message.error("请求服务器连接失败!");
            }
      );
    },
    // 保存二级页面数据
     updateSecondeInfor() {
      this.secondPageData.iconSecondList.forEach((item)=>{
          item.parentIconId = this.secondPageData.icon.iconId;
        //   if(item.secondIconId === 0)  delete(item['secondIconId']);
      })
        const data = JSON.parse(JSON.stringify(this.secondPageData));
        cardService.updateSecondeInfor(data).then(
            response => {
            this.$message({
                message: "保存成功",
                type: "success"
            });
            this.getDetail();
            },
            response => {
            this.$message.error("请求服务器连接失败!");
            }
        );
    },
    // 保存
    handleSave() {
      this.saveData.zone2.iconList = this.zone2FirstIconList.concat(
        this.zone2SecondIconList
      );
      const data = JSON.parse(JSON.stringify(this.saveData));
      cardService.updateDetail(data).then(
        response => {
          this.$message({
            message: "保存成功",
            type: "success"
          });
          this.getDetail();
        },
        response => {
          this.$message.error("请求服务器连接失败!");
        }
      );
    },
    // 获取icon接口
    getFavorites() {
      cardService.getFavorites().then(
        response => {
          this.favoritesOpList = JSON.parse(JSON.stringify(response));
          this.favoritesTbkList = JSON.parse(JSON.stringify(response));
        },
        response => {
          this.$message.error("请求服务器连接失败!");
        }
      );
    },
    getDetail() {
      cardService.getDetail().then(
        response => {
          this.saveData = JSON.parse(JSON.stringify(response));
          this.zone2FirstIconList = this.saveData.zone2.iconList.slice(0, 4);
          this.zone2SecondIconList = this.saveData.zone2.iconList.slice(4, 8);
          this.firstTitleTag = false;
          this.secondTitleTag = false;
          this.thirdTitleTag = false;
          this.fouthTitleTag = false;
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
            if(response.data){
                this.secondPageData.iconSecondList = JSON.parse(JSON.stringify(response.data));
            } else {
                this.secondPageData.iconSecondList.forEach((item)=>{
                    item.bannerImage = '';
                    item.bannerUrl = '';
                    item.h5Url = '';
                })
            }
        },
        response => {
          this.$message.error("请求服务器连接失败!");
        }
      );
    },
    handFirstTag() {
      if (this.firstTitleTag) {
        this.firstTitleTag = false;
      } else {
        this.firstTitleTag = true;
      }
    },
    handSecondTag() {
      if (this.secondTitleTag) {
        this.secondTitleTag = false;
      } else {
        this.secondTitleTag = true;
      }
    },
    handThirdTag() {
      if (this.thirdTitleTag) {
        this.thirdTitleTag = false;
      } else {
        this.thirdTitleTag = true;
      }
    },
    handFouthTag() {
      if (this.fouthTitleTag) {
        this.fouthTitleTag = false;
      } else {
        this.fouthTitleTag = true;
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
    handleSecondImg() {
        this.firstPagesType = 2;
    },
    // 第一类型上传文件成功
    handleAvatarSuccess1(response, file, fileList) {
      if(this.firstPagesType === 1) {
          this.zone1.iconImg = `https://${response.data}`;
      } else {
          this.secondPageData.iconSecondList.forEach((item) => {
              item.bannerImage = `https://${response.data}`;
          })
      }
    },
    handleMarkSuccess1(response, file, fileList) {
      this.zone1.superscriptImg = `https://${response.data}`;
    },
    // 第二类型第一行上传文件成功
    handleAvatarSuccess2(response, file) {
      this.zone2.iconImg = `https://${response.data}`;
    },
    handleHoverSuccess2(response, file) {
      this.zone2.iconImgClick = `https://${response.data}`;
    },
    handleMarkSuccess2(response, file, fileList) {
      this.zone2.superscriptImg = `https://${response.data}`;
    },
    handleMarkSuccess3(response, file, fileList, str) {
      this.zone3.superscriptImg = `https://${response.data}`;
    },
    // 第三类型上传文件成功
    handleAvatarSuccess3(response, file, fileList) {
      this.zone3.iconImg = `https://${response.data}`;
    },
    handleUpload(index) {
      this.secondaryPagesType = index;
    },
    // 第三类型上传文件成功
    handleAvatarSuccess4(response, file, fileList) {
        this.secondPageData.iconSecondList.forEach((item,index) => {
            if(index === this.secondaryPagesType) {
                item.bannerImage = `https://${response.data}`;
            }
        })
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
    .content-left {
      flex: 1;
      .life-first {
        .icon-img {
          width: 80px;
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
      margin-top: 50px;
      .zone-third-configure {
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
