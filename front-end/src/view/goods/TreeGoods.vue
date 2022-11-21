<!--  -->
<template>
  <!--    :props="props"  props	配置选项，具体看下表
                label	指定节点标签为节点对象的某个属性值
                children	指定子树为节点对象的某个属性值
                isLeaf	指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效

        :load="loadNode"
                加载子树数据的方法，仅当 lazy 属性为true 时生效
                自动执行函数 -- 异步请求数据 
        lazy
            是否懒加载子节点，需与 load 方法结合使用

        show-checkbox 
                show-checkbox	节点是否可被选择
        accordion
            是否每次只打开一个同级树节点展开
        -->
  <!-- <el-tree :data="data" :props="props" show-checkbox check-on-click-node @check="nodeClick"> </el-tree> -->
  <!-- <el-tree :data="data" ref="tree" :props="props" show-checkbox check-on-click-node @check="nodeClick" @node-click="nodeClick"> </el-tree> -->
  <el-tree :data="data" :props="props" @node-click="nodeClick"> </el-tree>
</template>

<script>
//这⾥可以导⼊其他⽂件（⽐如：组件，⼯具js，第三⽅插件js，json⽂件，图⽚⽂件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { doGoodsCategoryList } from "@/api/goods";
export default {
  //import引⼊的组件需要注⼊到对象中才能使⽤
  components: {},
  data() {
    //这⾥存放数据
    return {
      props: {
        label: "cat_name",
        children: "cats",
      },
      data: [],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //⽅法集合
  methods: {
    // 点击tree获取数据
    nodeClick(data) {
      // console.log(this.$refs.tree.getCheckedNodes(true));
      //传递数据给父组件
      this.$emit("sendTreeData", data);
    },
  },
  //⽣命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //⽣命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    let self = this;
    doGoodsCategoryList().then((ret) => {
      if (ret.data.code == 200) self.props = ret.data.data;
      self.data = ret.data.data;
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
<style scoped></style>
