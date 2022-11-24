<!--  -->
<template>
  <div class="">
    <div class="my-breadcrumb">
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: breadcrumbPath }">角色管理</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 分割线 -->
      <el-divider></el-divider>
    </div>
    <!-- 1. 搜索区域 -->
    <div class="header">
      <el-input v-model="inputSeach.search" placeholder="请输入角色名或备注查询" clearable></el-input>
      <el-button type="primary" @click="searchInput">查询</el-button>
      <el-button type="primary" @click="addRole">添加</el-button>
    </div>
    <!-- 2. 表格区域展示视图数据 -->
    <div class="wrapper">
      <el-table :data="roleList" border class="el-table infinite-list" style="width: 100%" max-height="470px">
        <el-table-column label="角色ID" prop="roleId" width="100" align="center"> </el-table-column>
        <el-table-column label="角色名称" prop="roleName" align="center"> </el-table-column>
        <el-table-column label="备注" prop="remark" align="center"> </el-table-column>
        <el-table-column align="right">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-setting" @click="handleSharePower(scope.$index, scope.row)"
              >分配权限</el-button
            >
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
    <!-- 角色添加或编辑 -->
    <RoleDialog ref="dialog" />
    <!-- 权限选择 -->
    <el-dialog width="40%" :before-close="shareDialogClose" title="权限选择" :visible.sync="innerVisible" append-to-body style="margin-top:-8vh">
      <div>
        <span>{{ menuIdNameList.menuNameList }}</span>
      </div>
      <TreeRole @sendTreeData="sendTreeData" ref="shareDialog" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="shareDialogClose">取 消</el-button>
        <el-button type="primary" @click="showTreeData">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
//这⾥可以导⼊其他⽂件（⽐如：组件，⼯具js，第三⽅插件js，json⽂件，图⽚⽂件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { doGetListByPage, doSearch, doShareRolePower,doDeleteRole } from "@/api/role";
import { doRoleIdMenuList } from "@/api/menu";
import RoleDialog from "../roles/RoleDialog.vue";
import TreeRole from "../roles/TreeRole.vue";

export default {
  //import引⼊的组件需要注⼊到对象中才能使⽤
  components: {
    RoleDialog,
    TreeRole,
  },
  data() {
    //这⾥存放数据
    return {
      breadcrumbPath: "/system/role",
      innerVisible: false, //内弹窗
      roleList: [],
      page: {
        pageSize: 5,
        pageNum: 1,
      },
      total: 0,
      inputSeach: {
        search: "",
      },
      formLabelWidth: "100px",
      treeData: [], //接受tree数据
      menuIdNameList: {
        menuIdList:[],
        menuNameList:[],
      }, //显示在tree里
      roleTree: {
        roleId: "",
        roleMenuIdArr: [],
      },
      menuList:[],  //懒加载menu数据
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //⽅法集合
  methods: {
    // 角色查询
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
          self.roleList = ret.data.data;
          self.total = ret.data.data.length;
        } else {
          self.roleList = [];
          self.total = 0;
          self.$message({ type: "error", message: "没有任何角色记录", duration: 2000 });
        }
      });
    },
    // 为角色分配tree数据
    showTreeData() {
      if (this.roleTree.roleMenuIdArr.length > 0) {
        doShareRolePower(this.roleTree).then((ret) => {
          let type = "error";
          if (ret.data.code == 200) {
            type = "success";
          }
          this.$message({ type: type, message: ret.data.msg, duration: 1000 });
          this.pageList();
          this.innerVisible = false;
          this.$refs.shareDialog.clearSelectTree();
        });
      } else {
        this.innerVisible = true;
        this.$message({ type: "error", message: "请选择权限", duration: 1000 });
      }
    },
    // 获取tree数据
    sendTreeData(val) {
      console.log("tree数据", val);
      this.roleTree.roleMenuIdArr = val.map((val) => {
        return val.menuId;
      });
      this.menuIdNameList.menuNameList = val.map((val) => {
        return val.menuName;
      });
    },
    // 关闭树组件
    shareDialogClose(){
      this.innerVisible = false;
      this.$refs.shareDialog.clearSelectTree();
    },
    // 分配角色权限
    handleSharePower(index, role) {
      console.log(index, role);
      this.innerVisible = true;
      this.roleTree = {
        roleId: role.roleId,
        roleMenuIdArr: [],
      };
      doRoleIdMenuList(role).then((ret) => {
        if (ret.data.code == 200) {
          this.menuIdNameList.menuNameList = ret.data.data.map((val) => {
            return val.menuName;
          });
          this.$nextTick(()=>{
            this.$refs.shareDialog.setSelectTree(ret.data.data);
          })
        }
      });
    },
    // 添加角色
    addRole() {
      this.$refs.dialog.roleForm = {
        roleId: "",
        roleName: "",
        remark: "",
        menuNameList: [],
        menu:[],
      };
      this.$refs.dialog.dialogVisible = true;
      this.$refs.dialog.isEditOrAdd = true;
    },
    // 编辑角色
    handleEdit(index, role) {
      console.log(index, role);
      //修改子组件实例的数据
      doRoleIdMenuList(role).then((ret) => {
        if (ret.data.code == 200) {
          this.$refs.dialog.isEditOrAdd = false;
          this.$refs.dialog.roleForm = Object.assign({}, role);
          this.$refs.dialog.roleForm.menu = ret.data.data;
          this.$refs.dialog.roleForm.menuNameList = ret.data.data.map((val) => {
            return val.menuName;
          });
          this.$refs.dialog.dialogVisible = true;
        }
      });
    },
    // 删除角色
    handleDelete(index, role) {
      console.log(index, role);
      let self = this;
      self
        .$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          doDeleteRole(role).then((ret) => {
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
            duration: 2000,
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
          self.roleList = ret.data.data.list;
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
