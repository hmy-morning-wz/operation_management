<template>
  <div class="add-goods">
    <div class="pl20px pt30 pr20">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="200px"
        class="demo-ruleForm"
      >
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="ruleForm.name" class="w200" placeholder="商品名称" :maxlength="30"></el-input>
        </el-form-item>
        <el-form-item label="商品描述:" required prop="description">
          <div class="components-container">
            <div class="editor-container">
              <div id="editor"></div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="商品详情列表图" required prop="smallImages">
          <div class="comm-dis">
            <div class="header-banner" v-for="(item,index) in ruleForm.smallImages" :key="index">
              <img v-if="item" :src="item" class="avatar">
              <span class="deletImg" v-show="ruleForm.smallImages">
                <span class="deletImg2" @click="handleDelete(index)">
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
            <div>
              <el-upload
                class="avatar-uploader"
                :action="uploadimgUrl"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <i class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="商品封面图片" required prop="pictUrl">
          <div class="comm-dis">
            <div class="header-banner">
              <img v-if="ruleForm.pictUrl" :src="ruleForm.pictUrl" class="avatar">
              <span class="deletImg">
                <span class="deletImg2" @click="handleCoverDelete">
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
            <div v-show="!ruleForm.pictUrl">
              <el-upload
                class="avatar-uploader"
                :action="uploadimgUrl"
                :show-file-list="false"
                :on-success="handleCoverSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <i class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="商品类型" required prop="type">
          <el-select v-model="ruleForm.type" clearable filterable placeholder="组合券" class="w200">
            <el-option
              v-for="item in goodsList"
              :key="item.typeId"
              :label="item.typeName"
              :value="item.typeId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品标签">
          <el-input v-model="ruleForm.label" class="w200" placeholder="商品标签"></el-input>
        </el-form-item>
        <el-form-item label="商品分类">
          <el-select v-model="ruleForm.classify" clearable filterable placeholder="商品分类" class="w200">
            <el-option
              v-for="item in typeList"
              :key="item.classifyId"
              :label="item.classifyName"
              :value="item.classifyId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品原价" prop="originalPrice">
          <el-input v-model="ruleForm.originalPrice" type="number" class="w200" placeholder="商品价格"></el-input>
        </el-form-item>
        <el-form-item label="商品折扣价" prop="discountPrice">
          <el-input v-model="ruleForm.discountPrice" type="number" class="w200" placeholder="商品价格"></el-input>
        </el-form-item>
        <el-form-item label="商品库存" prop="remainCount">
          <el-input v-model="ruleForm.remainCount" type="number" class="w200" placeholder="商品库存"></el-input>
        </el-form-item>
        <el-form-item label="外部商品ID">
          <el-input v-model="ruleForm.thirdId" class="w200" placeholder="外部商品ID"></el-input>
        </el-form-item>
        <el-form-item label="外部商品链接">
          <el-input v-model="ruleForm.thirdUrl" class="w200" placeholder="外部商品链接"></el-input>
        </el-form-item>
        <el-form-item label="商户名称">
          <el-select
            v-model="shopName"
            filterable
            placeholder="请选择商户名称"
            class="w200"
            @change="handleShop"
          >
            <el-option
              v-for="(item,index) in merchantList"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
          <el-table :data="tableData" class="table mt10">
            <el-table-column prop="templateId" label="优惠券id" min-width="50" align="center"></el-table-column>
            <el-table-column prop="voucherName" label="优惠券名称" min-width="80" align="center"></el-table-column>
            <el-table-column prop="remainCount" label="数量" min-width="50" align="center"></el-table-column>
            <el-table-column label="操作" min-width="50" align="center">
              <template slot-scope="scope" style="text-align:center">
                <el-button
                  type="text"
                  size="small"
                  @click="handleAddShop(scope.row.templateId,scope.row.remainCount,scope.row.voucherName,scope.row.templateType)"
                >添加</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="商品组合">
          <el-tag
            closable
            v-for="(tag,index) in tags"
            :key="tag.name"
            class="mr10 mb10"
            @close="handleClose(tag)"
          >
            <span>{{tag.voucherName}}</span>
            <span>*{{tag.remainCount}}</span>
          </el-tag>
        </el-form-item>
        <el-form-item label="红包面额">
          <el-input v-model="couponAmount" type="number" class="w200" placeholder="红包面额"></el-input>
        </el-form-item>
        <el-form-item label="返红包金额(单位分)">
          <el-input v-model="ruleForm.returnCouponAmount" type="number" class="w200" placeholder="返红包金额"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
    <app-loading :loadingShow="loadingShow"></app-loading>
  </div>
</template>
<script>
import goodsService from "../../../service/markerManagement/goodsManagement";
import apiHost from "@/hostconfig/index";
import moment from "@/utils/moment";
import AppLoading from "../../OperationManagement/comm/loading.vue";
import headTop from "../../../components/headTop";
import UE from "../../../components/ue/ue.vue";

export default {
  data() {
    return {
      loadingShow: false,
      ue1: "ue1", // 不同编辑器必须不同的id
      tags: [],
      tableData: [],
      goodsList: [
        {
          typeId: "",
          typeName: ""
        }
      ],
      typeList: [
        {
          classifyId: 1,
          classifyName: "商品1"
        }
      ],
      shopName: "",
      remainCount: 0,
      number: 0,
      couponAmount: '',
      ruleForm: {
        classify: "",
        label: "",
        thirdId: "",
        thirdUrl: "",
        name: "",
        type: "",
        originalPrice: "",
        discountPrice: "",
        pictUrl: "",
        description: "",
        remainCount: "",
        returnCouponAmount: "",
        smallImages: []
      },
      headers: {
        UserToken: ""
      },
      uploadimgUrl: `${apiHost.netImg}prefer/api/fileUploadOne`,
      merchantList: [],
      rules: {
        name: [
          { required: true, message: "请输入商品名字", trigger: "blur" },
          { min: 1, max: 30, message: "长度在 1 到 10 个字符", trigger: "blur" }
        ],
        type: [
          { required: true, message: "请输入商品类型", trigger: "change" }
        ],
        description: [
          { required: true, message: "请输入描述内容", trigger: "blur" }
        ],
        remainCount: [
          { required: true, message: "请输入库存", trigger: "blur" }
        ],
        originalPrice: [
          { required: true, message: "请输入商品原价", trigger: "blur" }
        ],
        discountPrice: [
          { required: true, message: "请输入商品折扣价", trigger: "blur" }
        ],
        smallImages: [{ required: true, message: "商品封面图片组合" }],
        pictUrl: [{ required: true, message: "商品封面图片" }]
      }
    };
  },
  created() {},
  components: {
    AppLoading,
    UE
  },
  methods: {
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
    getClassifyList() {
      goodsService.getClassifyList().then(
        response => {
            console.log(response.data)
            this.typeList = JSON.parse(JSON.stringify(response.data))
        },
        response => {
          console.log(response.Message || "服务器连接失败！3");
        }
      );
    },
    handleDelete(index) {
      this.$confirm("是否删除图片?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.ruleForm.smallImages.splice(index, 1);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已撤销"
          });
        });
    },
    handleCoverDelete() {
      this.$confirm("是否删除图片?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.ruleForm.pictUrl = "";
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已撤销"
          });
        });
    },
    handleClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
      this.remainCount = 0;
      this.number = 0;
    },
    handleAddShop(id, remainCount, voucherName, templateType) {
      let type = true;
      console.log(this.tags);
      this.tags.forEach(item => {
        if (item.templateId == id) {
          type = false;
          this.number = item.remainCount;
        }
      });
      if (type) this.number = 0;
      if (remainCount > 0 && this.number < remainCount) {
        this.remainCount = remainCount - 1;
        this.number = this.number + 1;
        var obj = {
          templateId: id,
          voucherName: voucherName,
          remainCount: this.number,
          templateType: templateType
        };
        if (!type) {
          this.tags.forEach(item => {
            if (item.templateId == id) {
              item.remainCount = this.number;
            }
          });
        } else {
          this.number = 1;
          obj = {
            templateId: id,
            voucherName: voucherName,
            remainCount: this.number,
            templateType: templateType
          };
          this.tags.push(obj);
        }
      }
    },
    handleShop() {
      this.number = 0;
      this.getTemplateList();
    },
    submitForm(formName) {
        console.log(23112313123)
      this.ruleForm.description = this.editor.txt.html(); // 调用子组件方法
      this.$refs[formName].validate(valid => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.ruleForm));
          data.templateList = [];
          this.tags.forEach(item => {
            var obj = {
              templateId: item.templateId,
              amount: item.remainCount,
              templateType: item.templateType,
              couponAmount: this.couponAmount
            };
            data.templateList.push(obj);
          });
          goodsService.addGoods(data).then(
            response => {
              this.$message({
                message: "保存成功",
                type: "success"
              });
              const router = `./goodsList`;
              this.$router.push(router);
            },
            response => {
              this.$message.error(response.sub_msg || "连接服务器失败!");
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    initEditor() {
      var E = window.wangEditor;
      var editor = new E("#editor");
      this.editor = editor;
      this.editor.customConfig.uploadImgServer = `${
        apiHost.netImg
      }prefer/api/fileUploadOne`;
      this.editor.customConfig.withCredentials = true;
      this.editor.customConfig.uploadFileName = "file";
      this.editor.customConfig.uploadImgParams = {};
      //   this.editor.customConfig.uploadImgHeaders = {
      //     UserToken: this.headers.UserToken
      //   };
      this.editor.customConfig.linkImgCallback = function(url) {
        console.log(result);
        var appendStr =
          '<p style="text-align: center;"><img src="' +
          result.data +
          '" style="max-width:100%;"><br></p>';
        editor.cmd.do(
          "insertHTML",
          `<img src="http://${result.data}" style="max-width:100%;"/>`
        );
      };
      this.editor.customConfig.uploadImgHooks = {
        before: function(xhr, editor, files) {
          const isLt10M = files[0].size / 1024 / 1024 < 10;
          const isimg = files[0].type.indexOf("image") > -1;
          if (!isimg) {
            this.$message.error("只能上传图片!");
          }
          if (!isLt10M) {
            this.$message.error("上传文件不能超过 10MB!");
          }
          return isLt10M && isimg;
        },
        success: function(xhr, editor, result) {
          var appendStr =
            '<p style="text-align: center;"><img src="' +
            result.data +
            '" style="max-width:100%;"><br></p>';
          editor.cmd.do(
            "insertHTML",
            `<img src="http://${result.data}" style="max-width:100%;"/>`
          );
        },
        fail: function(xhr, editor, result) {},
        error: function(xhr, editor) {},
        timeout: function(xhr, editor) {},
        customInsert: function(insertImg, result, editor) {}
      };
      editor.create();
    },
    handleAvatarSuccess(res, file) {
      const url = `http://${res.data}`;
      this.ruleForm.smallImages.push(url);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/jpg" || "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleCoverSuccess(res, file) {
      this.ruleForm.pictUrl = `http://${res.data}`;
    },
    getBrandNameList() {
      goodsService.getBrandNameList().then(
        response => {
          this.merchantList = response.data;
        },
        response => {
          this.$message.error("请求服务器连接失败!");
        }
      );
    },
    getTemplateList() {
      goodsService.getTemplateList(this.shopName).then(
        response => {
          this.tableData = response.data;
        },
        response => {
          this.$message.error("请求服务器连接失败!");
        }
      );
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initEditor();
    });
    this.getTypeList();
    this.getBrandNameList();
    this.getClassifyList();
  },
  computed: {},
  watch: {
    loadingShow(val) {
      return val;
    }
  }
};
</script>
<style>
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
  margin: 10px 10px 0 0;
}
.header-banner {
  position: relative;
}
.deletImg {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  cursor: default;
  text-align: center;
  color: #fff;
  opacity: 0;
  font-size: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s;
}
.deletImg:hover {
  opacity: 1;
}
.deletImg2 {
  position: absolute;
  top: 40%;
  left: 45%;
}
</style>

<style lang="scss" scoped>
.bgcolor {
  color: #999 !important;
}
#editor {
  width: 800px;
}
.comm-dis {
  display: flex;
}
.add-goods {
  .quan {
    margin: -10px 0 0 120px;
    // display: flex;
    line-height: 32px;
    color: #595e66;
  }
  .quan:after {
    content: " ";
    display: block;
    height: 0;
    clear: both;
  }
  .tips {
    margin: 0 0 10px 200px;
    color: #f56c6c;
    font-size: 12px;
  }
  .commodityList {
    width: 500px;
    margin: 0 0 20px 200px;
  }
  .table {
    margin: 20px 30px 10px 0;
    width: 500px;
  }
  .detail-content {
    cursor: pointer;
    color: #20a0ff;
  }
}
</style>
