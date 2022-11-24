<!--  -->
<template>
  <div class="box">
    <el-dialog
      :title="isEditOrAdd ? '添加角色' : '编辑商品'"
      :before-close="iconClose"
      :visible.sync="dialogVisible"
      width="60%"
      style="margin-top:-10vh"
    >
      <!-- 内容区域 -->
      <el-form :model="roleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <!-- <el-form-item label="分配权限" prop="roleMenuIdArr">
          <el-button type="primary" @click="innerVisible = true">权限选择</el-button>
          <span style="margin-left:10px;">{{ roleForm.menuNameList }}</span>
        </el-form-item> -->
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="roleForm.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="roleForm.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确定</el-button>
        <el-button type="warning" @click="resetForm">重置</el-button>
        <el-button @click="iconClose">取消</el-button>
      </div>
      <!-- 1. 内弹框--- 类目选择 -->
      <el-dialog width="40%" title="类目选择" :visible.sync="innerVisible" append-to-body style="margin-top:-8vh">
        <TreeRole @sendTreeData="sendTreeData" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">取 消</el-button>
          <el-button type="primary" @click="showTreeData">确 定</el-button>
        </span>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
//这⾥可以导⼊其他⽂件（⽐如：组件，⼯具js，第三⽅插件js，json⽂件，图⽚⽂件等等）
//例如：import 《组件名称》 from '《组件路径》';
import TreeRole from "../roles/TreeRole.vue";
import { doAddRole, doUpdateRole } from "@/api/role";

export default {
  //import引⼊的组件需要注⼊到对象中才能使⽤
  components: {
    TreeRole,
  },
  data() {
    //这⾥存放数据
    return {
      // 判断是添加还是编辑 默认为添加true
      isEditOrAdd: true,
      dialogVisible: false, //外弹框
      innerVisible: false, //内弹窗
      treeData: {}, //接受tree数据
      roleForm: {
        roleId: "",
        roleName: "",
        remark: "",
        roleMenuIdArr: [], //保存menuId的数组
        menuNameList: [],
      },
      rules: {
        //校验规则
        roleName: [{ required: true, message: "请输入角色名", trigger: "blur" }],
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //⽅法集合
  methods: {
    // 关闭表单弹窗
    iconClose() {
      this.dialogVisible = false;
      this.resetForm();
    },
    // 显示tree数据
    showTreeData() {
      this.innerVisible = false;
      //显示tree数据
      // this.roleForm.roleMenuIdArr = this.treeData.map((val) => {
      //   return val.menuId;
      // });
      // this.roleForm.menuNameList = this.treeData.map((val) => {
      //   return val.menuName;
      // });
      console.log("显示tree数据");
    },
    // 获取tree数据
    sendTreeData(val) {
      console.log("tree数据", val);
      // this.treeData = val;
    },
    // 提交表单
    submitForm() {
      let self = this;
      let submitForm = Object.assign({}, self.roleForm);
      console.log(submitForm);
      self.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          if (self.isEditOrAdd) {
            doAddRole(submitForm).then((ret) => {
              let type = "error";
              if (ret.data.code == 200) {
                type = "success";
              }
              self.$message({ type: type, message: ret.data.msg, duration: 1000 });
              self.$parent.pageList();
            });
          } else {
            doUpdateRole(submitForm).then((ret) => {
              let type = "error";
              if (ret.data.code == 200) {
                type = "success";
              }
              self.$message({ type: type, message: ret.data.msg, duration: 1000 });
              self.$parent.pageList();
            });
          }
          self.dialogVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置表单
    resetForm() {
      this.$refs.ruleForm.resetFields();
      this.roleForm = {
        roleName: "",
        remark: "",
        roleMenuIdArr: [], //保存menuId的数组
        menuNameList: [],
      };
    },
  },
  //⽣命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //⽣命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //⽣命周期 - 创建之前
  beforeMount() {}, //⽣命周期 - 挂载之前
  beforeUpdate() {}, //⽣命周期 - 更新之前
  updated() {}, //⽣命周期 - 更新之后
  beforeDestroy() {}, //⽣命周期 - 销毁之前
  destroyed() {}, //⽣命周期 - 销毁完成
  activated() {}, //如果⻚⾯有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
.box {
  text-align: left;
}
</style>
