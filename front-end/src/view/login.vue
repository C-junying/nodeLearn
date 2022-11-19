<!--  -->
<template>
  <div class="box">
    <h1 class="title">用户登录</h1>
    <el-form :model="userForm" class="login-container" :rules="rules" ref="userForm" label-position="left" label-width="80px">
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="userForm.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="userForm.password" placeholder="请输入密码" show-password></el-input>
      </el-form-item>
      <el-button type="primary" round @click="login">登录</el-button>
      <el-button type="warning" round @click="resetForm('ruleForm')">重置</el-button>
    </el-form>
  </div>
</template>

<script>
//这⾥可以导⼊其他⽂件（⽐如：组件，⼯具js，第三⽅插件js，json⽂件，图⽚⽂件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { doLogin } from "@/api/user";

export default {
  //import引⼊的组件需要注⼊到对象中才能使⽤
  components: {},
  data() {
    //这⾥存放数据
    return {
      userForm: {
        email: "",
        password: "",
      },
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
    login() {
      let self = this;
      // 表单验证
      self.$refs["userForm"].validate((valid) => {
        if (valid) {
          // ajax操作
          doLogin(self.userForm).then((ret) => {
            console.log(ret);
            let type = "error";
            if (ret.data.code == 200) {
              // 返回登录成功
              type = "success";
              sessionStorage.setItem("token", "Bearer " + ret.data.data);
              self.$router.push("/system/user");
            }
            self.$message({
              type: type,
              message: ret.data.msg,
              duration: 1000,
            });
          });
        } else {
          // 表单验证失败
          alert("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs["userForm"].resetFields();
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
  margin-top: 100px;
}
.login-container {
  border-radius: 10px;
  margin: 10px auto;
  width: 350px;
  padding: 30px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  text-align: center;
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
}
</style>
