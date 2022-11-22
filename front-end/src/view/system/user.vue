<!--  -->
<template>
  <div class="box">
    <div class="my-breadcrumb">
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/system/user' }">用户管理</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 分割线 -->
      <el-divider></el-divider>
    </div>
    <el-table :data="userList" border class="el-table infinite-list" style="width: 100%" max-height="530px">
      <el-table-column label="ID" prop="userId"> </el-table-column>
      <el-table-column label="用户名" prop="userName"> </el-table-column>
      <el-table-column label="邮箱" prop="email"> </el-table-column>
      <!-- <el-table-column label="密码" prop="password"> </el-table-column> -->
      <el-table-column label="日期" prop="createTime">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | dateFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header">
          <!-- <el-input v-model="search" size="mini" placeholder="输入关键字搜索" /> -->
          <el-button type="primary" @click="handleAdd">添加</el-button>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.pageNum"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <!-- 弹出框 -->
    <el-dialog :title="title" :before-close="iconClose" :visible.sync="dialogFormVisible" style="line-height:20px">
      <el-form :model="userForm" :rules="rules" ref="userForm">
        <el-form-item label="用户名" prop="userName" :label-width="formLabelWidth">
          <el-input v-model="userForm.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
          <el-input v-model="userForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
          <el-input v-model="userForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" prop="createTime" :label-width="formLabelWidth" style="text-align:left;">
          <el-date-picker
            v-model="userForm.createTime"
            type="datetime"
            placeholder="选择日期时间"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="角色" prop="roleId" :label-width="formLabelWidth" style="text-align:left;">
          <el-select v-model="userForm.roleId" placeholder="请选择角色">
            <el-option v-for="role in roleList" :key="role.roleId" :label="role.roleName" :value="role.roleId"></el-option>
            <!-- <el-option label="管理员" value="2"></el-option> -->
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="iconClose">取 消</el-button>
        <el-button type="primary" @click="userSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//这⾥可以导⼊其他⽂件（⽐如：组件，⼯具js，第三⽅插件js，json⽂件，图⽚⽂件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { doUserList, doUserEdit, doUserAdd, doDeleteUser } from "@/api/user";
import { doRoleList } from "@/api/role";

export default {
  //import引⼊的组件需要注⼊到对象中才能使⽤
  components: {},
  data() {
    return {
      userList: [],
      search: "",
      page: {
        pageSize: 5,
        pageNum: 1,
      },
      total: 0,
      title: "",
      formLabelWidth: "80px",
      userForm: {
        userName: "",
        password: "",
        email: "",
        createTime: "",
      },
      // 添加编辑操作
      dialogFormVisible: false, // 显示隐藏控制
      // 判断是添加还是编辑 默认为添加true
      isEditOrAdd: true,
      roleList: [],
      rules: {
        email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "blur",
          },
          {
            pattern: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})*$/,
            required: true,
            message: "请输入正确的邮箱",
            trigger: "blur",
          },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "change" }],
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //⽅法集合
  methods: {
    // 清空对象属性对应的值
    clearObjectProperties() {
      let obj = Object.assign({}, this.userForm);
      for (let i in obj) {
        obj[i] = "";
      }
      this.userForm = obj;
    },
    // 添加用户
    handleAdd() {
      // 清空对象属性对应的值
      this.clearObjectProperties();
      // 修改title
      this.title = "添加用户";
      this.isEditOrAdd = true;
      // 显示弹出框
      this.dialogFormVisible = true;
    },
    // 编辑用户
    handleEdit(index, user) {
      console.log(index, user);
      this.title = "编辑用户";
      this.isEditOrAdd = false;
      // 显示弹出框
      this.dialogFormVisible = true;
      this.userForm = Object.assign({}, user);
      this.userForm.createTime = new Date(Number(this.userForm.createTime));
    },
    // 关闭弹窗
    iconClose(){
      this.dialogFormVisible = false;
      this.$refs.userForm.resetFields();
    },
    // 提交用户信息
    userSubmit() {
      let self = this;
      let submitForm = Object.assign({}, self.userForm);
      submitForm.createTime = this.$moment(submitForm.createTime);

      // 表单验证
      self.$refs["userForm"].validate((valid) => {
        if (valid) {
          // 判断是编辑还是添加用户
          if (self.isEditOrAdd) {
            // 用户添加
            doUserAdd(submitForm).then((ret) => {
              // 弹出提示
              let type = "error";
              if (ret.data.code == 200) {
                type = "success";
                self.pageList();
              }
              self.$message({ type: type, message: ret.data.msg, duration: 1000 });
            });
          } else {
            // 编辑用户
            doUserEdit(submitForm).then((ret) => {
              let type = "error";
              if (ret.data.code == 200) {
                type = "success";
                self.pageList();
              }
              self.$message({ type: type, message: ret.data.msg, duration: 1000 });
            });
          }
          self.pageList();
          self.dialogFormVisible = false;
        } else {
          // 表单验证失败
          alert("error submit!!");
          return false;
        }
      });
    },
    // 删除用户
    handleDelete(index, row) {
      console.log(index, row);
      let self = this;
      self
        .$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          doDeleteUser(row).then((ret) => {
            let type = "error";
            if (ret.data.code == 200) {
              type = "success";
            }
            self.$message({ type: type, message: ret.data.msg, duration: 1000 });
            self.pageList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
            duration: 2000
          });
        });
    },
    handleCurrentChange(val) {
      // 修改当前页
      this.page.pageNum = val;
      // 刷新
      this.pageList();
    },
    //数据条数发生改变时
    handleSizeChange(newSize) {
      this.page.pageSize = newSize;
      this.pageList();
    },
    pageList: function() {
      let self = this;
      doUserList(self.page).then((ret) => {
        if (ret.data.code == 200) {
          self.userList = ret.data.data.list;
          self.total = ret.data.data.count;
        } else {
          self.$message.error({ message: ret.data.msg, duration: 1000 });
        }
      });
    },
  },
  //⽣命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //⽣命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.pageList();
    doRoleList().then((ret) => {
      if (ret.data.code == 200) {
        this.roleList = ret.data.data;
      }
    });
  },
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
  text-align: center;
  width: 100%;
  margin: 0 auto;
}
</style>
