<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
.el-main[data-v-4f795181] {
  line-height: 0px !important;
}
.my-breadcrumb {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  line-height: 100px;
}
.my-breadcrumb .el-breadcrumb {
  font-size: 20px;
  padding: 10px 20px;
}
.my-breadcrumb .el-divider {
  margin-top: 0px;
  margin-bottom: 5px;
}
.el-table {
  min-height: 400px;
  background-color: #ffff;
}
.el-pagination {
  white-space: nowrap;
  padding: 15px 5px;
  color: #303133;
  font-weight: 700;
  line-height: 30px;
  text-align: left;
  padding-left: 300px;
  background-color: #ffff;
}
</style>
