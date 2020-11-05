<template>
  <div class="add-template-acoupon">
    <div class="pl20px pt20 pr20" style="flex:1.5">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="200px"
        class="demo-ruleForm"
      >
        <el-form-item label="券类型标示符" prop="pid">
          <el-select v-model="ruleForm.tag" placeholder="请选择" style="width:220px" :disabled="editType">
            <el-option
              v-for="item in voucherList"
              :key="item.tag"
              :label="item.name"
              :value="item.tag"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="券类型名称" prop="name">
          <el-input
            v-model="ruleForm.name"
            style="width:220px;"
            placeholder="请输入券类型名称"
            :maxlength="12"
            :disabled="editType"
          ></el-input>
        </el-form-item>
        <el-form-item label="券模版Json" prop="tplContent">
          <el-input
            style="width:450px"
            type="textarea"
            :autosize="{ minRows: 10, maxRows: 10}"
            placeholder
            v-model="ruleForm.tplContent"
          ></el-input>
          <el-button type="primary" @click="handeleParse">获取占位符</el-button>
        </el-form-item>
        <el-form-item label="券模版占位府">
          <div v-for="(item,index) in ruleForm.placeholderRequestList" class="mt10">
            <el-input v-model="item.placeholder" style="width:150px;"></el-input>
            <el-input v-model="item.description" style="width:150px;margin-left:10px;"></el-input>
            <el-checkbox v-model="item.baseField">(是否是基础字段)</el-checkbox>
            <el-select v-model="item.fieldType" placeholder="请选择" style="width:150px">
              <el-option
                v-for="item in typeList"
                :key="item.type"
                :label="item.label"
                :value="item.type"
              ></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" v-if="id">保存</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')" v-else>创建</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import acouponService from "../../../service/OperationManagement/couponManagement";
import templateService from "../../../service/OperationManagement/couponTemplate";
import apiHost from "@/hostconfig/index";
import moment from "@/utils/moment";

export default {
  data() {
    return {
      loadingShow: false,
      id: this.$route.query.id,
      editType: false,
      ruleForm: {
        tplContent: "",
        name: "",
        tag: "",
        placeholderRequestList: [
          { baseField: false, description: "", fieldType: "", placeholder: "" }
        ]
      },
      voucherList: [],
      typeList: [
        {
          type: 1,
          label: "文本"
        },
        {
          type: 2,
          label: "图片"
        },
        {
          type: 3,
          label: "日期"
        }
      ],
      rules: {
        name: [
          { required: true, message: "请输入赞助商名字", trigger: "blur" },
          { min: 1, max: 12, message: "长度在 1 到 12 个字符", trigger: "blur" }
        ]
      },
      logoImg: "./static/images/1.jpg"
    };
  },
  created() {
  },
  components: {},
  methods: {
    handeleParse() {
      this.parseTplContent();
    },
    getCoupTypeList() {
      templateService.getCoupTypeList().then(
        response => {
          this.voucherList = response;
        },
        response => {
          this.$message.error(response.message || "请求服务器连接失败!");
        }
      );
    },
    getAlipassDetailById() {
      const id = this.id;
      templateService.getAlipassDetailById(id).then(
        response => {
          this.ruleForm.name = response.data.name;
          this.ruleForm.tag = response.data.tag;
          response.data.alipassTypePlaceholderResponseList.forEach(item => {
            if (item.baseField == 1) {
              item.baseField = true;
            } else {
              item.baseField = false;
            }
          });
          this.ruleForm.placeholderRequestList = JSON.parse(
            JSON.stringify(response.data.alipassTypePlaceholderResponseList)
          );
          this.ruleForm.tplContent = response.data.tplContent;
        },
        response => {
          this.$message.error(response.message || "请求服务器连接失败!");
        }
      );
    },
    parseTplContent() {
      const data = {
        tplContent: this.ruleForm.tplContent
      };
      templateService.parseTplContent(data).then(
        response => {
          let array = [];
          response.data.forEach(item => {
            const obj = {
              baseField: 0,
              description: "",
              fieldType: "",
              placeholder: item
            };
            array.push(obj);
          });
          this.ruleForm.placeholderRequestList = JSON.parse(
            JSON.stringify(array)
          );
        },
        response => {
          this.$message.error(response.sub_msg || "请求服务器连接失败!");
        }
      );
    },
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          this.ruleForm.placeholderRequestList.forEach(item => {
            if (item.baseField) {
                item.baseField = 1
            }else{
               item.baseField = 0
            }
          });
          const data = JSON.parse(JSON.stringify(this.ruleForm));
          if (this.id) data.id = this.id;
          templateService.addAlipassType(data).then(
            response => {
              const router = `/templateList`;
              this.$router.replace(router);
            },
            response => {
              this.$message.error(response.msg || "请求服务器连接失败!");
            }
          );
        }
      });
    }
  },
  computed: {},
  mounted() {
    this.getCoupTypeList();
    if (this.id) {
        this.getAlipassDetailById();
        this.editType = true;
    };
  },
  watch: {}
};
</script>
<style>
.el-message {
  top: 150px;
}
</style>

<style lang="scss" scoped>
.add-template-acoupon {
  .error {
    color: #f56c6c;
    font-size: 12px;
  }
  .exhibtion {
    width: 375px;
    .logo {
      width: 80px;
      height: 80px;
      margin: 0 auto;
      img {
        width: 80px;
        height: 80px;
        border-radius: 80px;
      }
    }
    .voucher-name {
      font-size: 20px;
      margin: 0 auto;
      text-align: center;
    }
    .voucher-title {
      font-size: 14px;
      text-align: center;
      position: relative;
      height: 30px;
      line-height: 30px;
    }
    .voucher-title::after {
      content: "";
      height: 1px;
      background-color: #e8e8e8;
      position: absolute;
      left: 0;
      width: 100%;
      bottom: 0;
    }
  }
  li {
    list-style-type: disc;
    line-height: 30px;
  }
}
</style>
