<!--  -->
<template>
  <div class="box">
    <div class="my-breadcrumb">
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: breadcrumbPath }">菜单管理</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 分割线 -->
      <el-divider></el-divider>
    </div>
    <!-- 1. 搜索区域 -->
    <div class="header">
      <el-input v-model="inputSeach.search" placeholder="请输入菜单ID或菜单名称或菜单路径" clearable></el-input>
      <el-button type="primary" @click="searchInput">查询</el-button>
      <el-button type="primary" @click="addMenu">添加</el-button>
    </div>
    <!-- 2. 表格区域展示视图数据 -->
    <div class="wrapper">
      <el-table :data="menuList" border class="el-table infinite-list" style="width: 100%" max-height="470px">
        <el-table-column label="menuID" prop="menuId" width="100" align="center"> </el-table-column>
        <el-table-column label="pId" prop="pId" width="100" align="center"> </el-table-column>
        <el-table-column label="菜单名" prop="menuName" align="center"> </el-table-column>
        <el-table-column label="菜单路径" prop="menuUrl" align="center"> </el-table-column>
        <el-table-column label="上级菜单" prop="menuSrc" align="center"> </el-table-column>
        <el-table-column label="菜单类型" prop="menuType" align="center">
          <template slot-scope="scope">
            <el-tag type="primary" v-if="scope.row.menuType == '0'">一级菜单</el-tag>
            <el-tag type="success" v-else-if="scope.row.menuType == '1'">二级菜单</el-tag>
            <el-tag type="info" v-else-if="scope.row.menuType == '2'">三级级菜单</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="菜单图标" prop="menuLogo" align="center"> </el-table-column>
        <el-table-column align="right">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
    <el-dialog
      :title="isEditOrAdd ? '添加菜单' : '编辑菜单'"
      :before-close="iconClose"
      :visible.sync="dialogFormVisible"
      style="line-height:20px"
    >
      <el-form :model="menuForm" :rules="rules" ref="menuForm">
        <el-form-item label="pId" prop="pId" :label-width="formLabelWidth">
          <el-select v-model="menuForm.pId" placeholder="请选择目录" @change="changeValue">
            <el-option label="根目录" value="0"></el-option>
            <el-option v-for="menu in allMenu" :key="menu.menuId" :label="menu.menuName" :value="menu.menuId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单名称" prop="menuName" :label-width="formLabelWidth">
          <el-input v-model="menuForm.menuName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="菜单路径" prop="menuUrl" :label-width="formLabelWidth">
          <el-input v-model="menuForm.menuUrl" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单路径" prop="menuSrc" :label-width="formLabelWidth">
          <el-input v-model="menuForm.menuSrc" class="inputColor" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="菜单图标" prop="menuLogo" :label-width="formLabelWidth">
          <el-input v-model="menuForm.menuLogo" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确定</el-button>
        <el-button type="warning" @click="resetForm">重置</el-button>
        <el-button @click="iconClose">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//这⾥可以导⼊其他⽂件（⽐如：组件，⼯具js，第三⽅插件js，json⽂件，图⽚⽂件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { doQueryAll, doGetListByPage, doSearch, doUpdateMenu, doAddMenu, doDeleteMenu } from "@/api/menu";

export default {
  //import引⼊的组件需要注⼊到对象中才能使⽤
  components: {},
  data() {
    //这⾥存放数据
    return {
      breadcrumbPath: "/system/menu",
      menuList: [],
      page: {
        pageSize: 5,
        pageNum: 1,
      },
      total: 0,
      inputSeach: {
        search: "",
      },
      formLabelWidth: "100px",
      // 弹出框
      dialogFormVisible: false,
      // 判断是添加还是编辑 默认为添加true
      isEditOrAdd: true,
      allMenu: [],
      menuForm: {
        menuId: "",
        pId: "",
        menuName: "",
        menuUrl: "",
        menuSrc: "",
        menuType: "",
        menuLogo: "",
        sort: null,
      },
      rules: {
        pId: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "blur",
          },
        ],
        menuName: [{ required: true, message: "请输入菜单名", trigger: "change" }],
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //⽅法集合
  methods: {
    // 菜单查询
    searchInput() {
      let self = this;
      console.log("searchInput:", self.inputSeach.search);
      self.page.pageNum = 1;
      if (!self.inputSeach.search) {
        // 刷新
        self.pageList();
        return;
      }
      doSearch(self.inputSeach).then((ret) => {
        if (ret.data.code == 200 && ret.data.data.length > 0) {
          self.menuList = ret.data.data;
          self.total = ret.data.data.length;
        } else {
          self.menuList = [];
          self.total = 0;
          self.$message({ type: "error", message: "没有任何商品记录", duration: 2000 });
        }
      });
    },
    // 添加菜单--出现弹窗
    addMenu() {
      this.isEditOrAdd = true;
      // 显示弹出框
      this.dialogFormVisible = true;
      this.menuForm = {
        menuId: "",
        pId: "",
        menuName: "",
        menuUrl: "",
        menuSrc: "",
        menuType: "",
        menuLogo: "",
        sort: null,
      };
      this.setAllMenu();
    },
    // 编辑菜单
    handleEdit(index, menu) {
      console.log(index, menu);
      this.isEditOrAdd = false;
      // 显示弹出框
      this.dialogFormVisible = true;
      this.menuForm = Object.assign({}, menu);
      this.setAllMenu();
    },
    // 下拉列表选中后，修改上级菜单路径
    changeValue(val){
      if(val == 0){
        this.menuForm.menuSrc = null;
        this.menuForm.menuType = 0;
      }
      for(let i of this.allMenu){
        if(i.menuId == val){
          this.menuForm.menuSrc = i.menuUrl;
          this.menuForm.menuType = i.menuType+1;
          break;
        }
      }
    },
    // 删除菜单
    handleDelete(index, menu) {
      console.log(index, menu);
      let self = this;
      self
        .$confirm("此操作将永久删除该菜单, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          doDeleteMenu(menu).then((ret) => {
            let type = "error";
            if (ret.data.code == 200) {
              type = "success";
              self.pageList();
            }
            self.$message({ type: type, message: ret.data.msg, duration: 1000 });
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
    // 获取表单数据
    pageList() {
      let self = this;
      doGetListByPage(self.page).then((ret) => {
        if (ret.data.code == 200) {
          self.menuList = ret.data.data.list;
          self.total = ret.data.data.count;
        } else {
          self.$message.error({ message: ret.data.msg, duration: 1000 });
        }
      });
    },
    // 关闭弹窗
    iconClose() {
      this.dialogFormVisible = false;
      this.$refs.menuForm.resetFields();
    },
    // 重置数据
    resetForm() {
      this.$refs.menuForm.resetFields();
    },
    // 提交修改
    submitForm() {
      let self = this;
      let submitForm = Object.assign({}, self.menuForm);
      // 表单验证
      self.$refs["menuForm"].validate((valid) => {
        if (valid) {
          // 判断是编辑还是添加菜单
          if (self.isEditOrAdd) {
            // 菜单添加
            doAddMenu(submitForm).then((ret) => {
              // 弹出提示
              let type = "error";
              if (ret.data.code == 200) {
                type = "success";
                self.pageList();
              }
              self.$message({ type: type, message: ret.data.msg, duration: 1000 });
              this.$refs.menuForm.resetFields();
            });
          } else {
            // 编辑菜单
            doUpdateMenu(submitForm).then((ret) => {
              let type = "error";
              if (ret.data.code == 200) {
                type = "success";
                self.pageList();
              }
              self.$message({ type: type, message: ret.data.msg, duration: 1000 });
            });
          }
          self.dialogFormVisible = false;
        } else {
          // 表单验证失败
          alert("error submit!!");
          return false;
        }
      });
    },
    setAllMenu(){
      doQueryAll().then(ret=>{
        if(ret.data.code == 200){
          this.allMenu = ret.data.data;
        }else{
          self.$message({ type: 'error', message: ret.data.msg, duration: 1000 });
        }
      })
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
  text-align: left;
}
.header {
  display: flex;
}
.header button {
  margin-left: 20px;
}
.wrapper {
  margin-top: 20px;
}
</style>
