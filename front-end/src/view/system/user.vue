<!--  -->
<template>
  <div class="box">
    <el-table :data="userList" border  class="el-table">
      <el-table-column label="ID" prop="userId"> </el-table-column>
      <el-table-column label="用户名" prop="userName"> </el-table-column>
      <el-table-column label="邮箱" prop="email"> </el-table-column>
      <!-- <el-table-column label="密码" prop="password"> </el-table-column> -->
      <el-table-column label="日期" prop="createTime">
        <template slot-scope="scope">
          {{ scope.row.createTime | dateFormat }}
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header">
          <!-- <el-input v-model="search" size="mini" placeholder="输入关键字搜索" /> -->
          <el-button type="primary" @click="handleAdd">添加</el-button>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="count" :page-size="page.pageSize" @current-change="handleCurrentChange">
    </el-pagination>
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="userForm" ref="userForm">
        <el-form-item label="用户名" prop="userName" :label-width="formLabelWidth">
          <el-input v-model="userForm.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
          <el-input v-model="userForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
          <el-input v-model="userForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="userForm.createTime"
            type="datetime"
            placeholder="选择日期时间"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="userSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//这⾥可以导⼊其他⽂件（⽐如：组件，⼯具js，第三⽅插件js，json⽂件，图⽚⽂件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { doUserList, doUserEdit, doUserAdd, doDeleteUser } from "@/api/user";

export default {
  //import引⼊的组件需要注⼊到对象中才能使⽤
  components: {},
  data() {
    return {
      userList: [],
      scope: "",
      search: "",
      page: {
        pageSize: 4,
        pageNum: 1,
      },
      count: 0,
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
      this.userForm.createTime = new Date(this.userForm.createTime);
    },
    // 提交用户信息
    userSubmit() {
      console.log(this.userForm);
      let self = this;
      let submitForm = Object.assign({}, self.userForm);
      if (self.isEditOrAdd) {
        doUserAdd(submitForm).then((ret) => {
          console.log(ret);
          // 弹出提示
          let type = "error";
          if (ret.data.code == 200) {
            type = "success";
            self.pageList();
          }
          self.$message({ type: type, message: ret.data.msg, duration: 1000 });
        });
      } else {
        doUserEdit(submitForm).then((ret) => {
          console.log(ret);
          let type = "error";
          if (ret.data.code == 200) {
            type = "success";
            self.pageList();
          }
          self.$message({ type: type, message: ret.data.msg, duration: 1000 });
        });
      }
      self.dialogFormVisible = false;
    },
    // 删除用户
    handleDelete(index, row) {
      console.log(index, row);
      let self = this;
      doDeleteUser(row).then((ret) => {
        console.log(ret);
        let type = "error";
        if (ret.data.code == 200) {
          type = "success";
          self.pageList();
        }
        self.$message({ type: type, message: ret.data.msg, duration: 1000 });
      });
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      // 修改当前页
      this.page.pageNum = val;
      // 刷新
      this.pageList();
    },
    pageList: function() {
      let self = this;
      doUserList(self.page).then((ret) => {
        console.log(ret);
        if (ret.data.code == 200) {
          self.userList = ret.data.list;
          self.count = ret.data.count;
          console.log(self);
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
  padding: 20px;
  margin: 0 auto;
  background: #fff;
}
/* .el-table {
  height: 400px;
} */
.el-table{
  height: 400px;
  line-height: 0px !important;
}
</style>
