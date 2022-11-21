<!--  -->
<template>
  <div>
    <div class="my-breadcrumb">
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/goods/goodsList' }">商品清单</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 分割线 -->
      <el-divider></el-divider>
    </div>
    <!-- 1. 搜索区域 -->
    <div class="header">
      <el-input v-model="inputSeach.search" placeholder="请输入内容"></el-input>
      <el-button type="primary" @click="searchInput">查询</el-button>
      <el-button type="primary" @click="addGoods">添加</el-button>
    </div>
    <!-- 2. 表格区域展示视图数据 -->
    <div class="wrapper">
      <el-table :data="tableData" max-height="470px" border>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="goods_id" label="商品ID" width="100"> </el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="100" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="goods_price" label="商品价格" width="100"> </el-table-column>
        <el-table-column prop="goods_number" label="商品数量" width="100"> </el-table-column>
        <el-table-column prop="cat_name" label="规格类目" width="100"> </el-table-column>
        <el-table-column prop="goods_pic" label="商品图片" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="sell_point" label="商品卖点" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="goods_introduce" label="商品描述" show-overflow-tooltip> </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
    </div>
    <GoodsDialog ref="dialog" />
  </div>
</template>

<script>
//这⾥可以导⼊其他⽂件（⽐如：组件，⼯具js，第三⽅插件js，json⽂件，图⽚⽂件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { doGoodsList, doSearch } from "@/api/goods";
import GoodsDialog from "../goods/GoodsDialog.vue";
export default {
  //import引⼊的组件需要注⼊到对象中才能使⽤
  components: {
    GoodsDialog,
  },
  data() {
    //这⾥存放数据
    return {
      inputSeach: {
        search: "",
      },
      tableData: [],
      total: 10,
      page: {
        pageSize: 5,
        pageNum: 1,
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //⽅法集合
  methods: {
    // 添加商品--出现弹窗
    addGoods() {
      //修改子组件实例的数据
      this.$refs.dialog.goodsForm = {
        goods_name: "",
        goods_price: "",
        goods_number: "",
        sell_point: "",
        goods_pic: "",
        goods_introduce: "",
        cat_id: "",
        created: "",
        cat_name: "",
      };
      this.$refs.dialog.dialogVisible = true;
      this.$refs.dialog.isEditOrAdd = true;
    },
    handleCurrentChange(val) {
      // 修改当前页
      this.page.pageNum = val;
      // 刷新
      this.goodsList();
    },
    //数据条数发生改变时
    handleSizeChange(newSize) {
      this.page.pageSize = newSize;
      this.goodsList();
    },
    searchInput() {
      let self = this;
      console.log("Hello:", self.inputSeach.search);
      self.page.pageNum = 1;
      if (!self.inputSeach.search) {
        self.goodsList();
        return;
      }
      doSearch(self.inputSeach).then((ret) => {
        if (ret.data.code == 200 && ret.data.data.length > 0) {
          self.tableData = ret.data.data;
          self.total = ret.data.data.length;
        } else {
          self.tableData = [];
          self.total = 0;
          self.$message({ type: "error", message: "没有任何商品记录", duration: 2000 });
        }
      });
    },
    // 编辑操作
    handleEdit(index, goods) {
      //修改子组件实例的数据
      this.$refs.dialog.goodsForm = 
      this.$refs.dialog.dialogVisible = true;
      this.$refs.dialog.isEditOrAdd = false;
      this.$refs.dialog.goodsForm = Object.assign({}, goods);
      this.$refs.dialog.goodsForm.created = new Date(Number(this.$refs.dialog.goodsForm.created));
    },
    // 删除操作
    handleDelete() {
      console.log("删除");
    },
    // 商品列表获取
    goodsList() {
      console.log("商品获取");
      let self = this;
      doGoodsList(self.page).then((ret) => {
        if (ret.data.code == 200) {
          console.log(ret);
          self.tableData = ret.data.data.list;
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
    // 商品获取
    this.goodsList();
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
