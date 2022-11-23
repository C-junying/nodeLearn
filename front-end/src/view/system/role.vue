<!--  -->
<template>
<div class=''>
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
</div>
</template>

<script>
//这⾥可以导⼊其他⽂件（⽐如：组件，⼯具js，第三⽅插件js，json⽂件，图⽚⽂件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引⼊的组件需要注⼊到对象中才能使⽤
components: {},
data() {
//这⾥存放数据
return {
  breadcrumbPath:'/system/role',
}
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//⽅法集合
methods: {

},
//⽣命周期 - 创建完成（可以访问当前this实例）
created() {

},
//⽣命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
beforeCreate() {}, //⽣命周期 - 创建之前
beforeMount() {}, //⽣命周期 - 挂载之前
beforeUpdate() {}, //⽣命周期 - 更新之前
updated() {}, //⽣命周期 - 更新之后
beforeDestroy() {}, //⽣命周期 - 销毁之前
destroyed() {}, //⽣命周期 - 销毁完成
activated() {}, //如果⻚⾯有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
</style>