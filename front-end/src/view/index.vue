<!--  -->
<template>
  <div class="">
    <el-container>
      <el-aside width="200px">
        <el-menu
          :default-active="menuPath"
          class="el-menu-vertical-demo"
          background-color="#354054"
          text-color="#fff"
          active-text-color="#FFD04B"
          router
        >
          <el-submenu v-for="menu in menuList" :key="menu.menuId" :index="menu.menuId + ''">
            <template slot="title">
              <div class="sub-margin">
                <i :class="menu.menuLogo"></i>
                <span>{{ menu.menuName }}</span>
              </div>
            </template>

            <el-menu-item v-for="cm in menu.menus" :key="cm.menuId" :index="cm.menuUrl + ''">
              <template slot="title">
                <div class="item-margin">
                  <i :class="cm.menuLogo"></i>
                  <span>{{ cm.menuName }}</span>
                </div>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
        <!-- <router-link to="/user">用户管理</router-link>
        <router-link :to="cm.menuUrl">{{ cm.menuName }}</router-link>
        <router-link to="/hello">Hello</router-link> -->
      </el-aside>
      <el-container>
        <el-header>
          <div class="demo-type">
            <div class="demo-flex">
              <span>当前用户：{{ user.userName }}[{{ user.roleName }}]</span>
              <el-avatar icon="el-icon-user-solid"></el-avatar>

              <svg
                @click="loginout"
                t="1669271963353"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2692"
                width="32"
                height="32"
              >
                <path
                  d="M512 0c30.72 0 51.2 20.48 51.2 51.2v307.2c0 30.72-20.48 51.2-51.2 51.2s-51.2-20.48-51.2-51.2V51.2c0-30.72 20.48-51.2 51.2-51.2z"
                  p-id="2693"
                  fill="#d81e06"
                ></path>
                <path
                  d="M512 1024C230.4 1024 0 793.6 0 512c0-158.72 71.68-302.08 194.56-399.36 20.48-15.36 56.32-15.36 71.68 10.24 15.36 20.48 10.24 51.2-10.24 66.56C158.72 271.36 102.4 389.12 102.4 512c0 225.28 184.32 409.6 409.6 409.6s409.6-184.32 409.6-409.6c0-128-56.32-240.64-153.6-322.56-20.48-15.36-25.6-51.2-10.24-71.68 15.36-20.48 51.2-25.6 71.68-10.24 122.88 102.4 194.56 245.76 194.56 404.48 0 281.6-230.4 512-512 512z"
                  p-id="2694"
                  fill="#d81e06"
                ></path>
              </svg>
            </div>
          </div>
        </el-header>
        <el-main>
          <router-view ref="menuPathData"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
//这⾥可以导⼊其他⽂件（⽐如：组件，⼯具js，第三⽅插件js，json⽂件，图⽚⽂件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { doGet } from "@/api/user";
import { doMenuList } from "@/api/menu";

export default {
  //import引⼊的组件需要注⼊到对象中才能使⽤
  components: {},
  data() {
    //这⾥存放数据
    return {
      menuPath: "",
      user: {},
      menuList: {},
      menu: "系统管理",
      menuTitle: "用户管理",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //⽅法集合
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 获取菜单信息
    setMenuList() {
      let self = this;
      doMenuList().then((ret) => {
        self.menuList = ret.data.data;
      });
    },
    // 退出
    loginout() {
      let self = this;
      self
        .$confirm("退出登录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          //清空回话存储
          sessionStorage.removeItem("token");
          //返回登录
          this.$router.push("/");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出登录",
            duration: 2000,
          });
        });
    },
  },
  //⽣命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //⽣命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    let self = this;
    doGet().then((ret) => {
      if (ret.data.code == 200) {
        self.user = ret.data.data;
      }
    });
    this.setMenuList();
    this.menuPath = this.$refs["menuPathData"].breadcrumbPath;
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
.el-header {
  background-color: #334157;
  color: #fff;
  line-height: 60px;
  border-left: 2px solid #b3c0d1;
}
.el-avatar {
  overflow: visible;
}
.el-aside {
  background-color: #334157;
  text-align: center;
  height: 720px;
  line-height: 200px;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
  padding: 10px !important;
}
.el-breadcrumb {
  font-size: 20px;
  line-height: 30px;
}
.sub-margin {
  width: 130px;
  text-align: left;
  margin-left: 20px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.item-margin {
  text-align: left;
  margin-left: 70px;
}
.el-menu-item {
  padding: 0 !important;
  border-bottom: 1px solid #b3c0d1;
}
.el-divider {
  margin: 10px 0;
}
.demo-flex {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: center;
}
.demo-flex > * {
  margin-right: 10px;
}
.demo-flex svg {
  cursor: pointer;
}
</style>
