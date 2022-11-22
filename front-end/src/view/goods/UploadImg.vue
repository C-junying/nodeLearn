<!--  -->
<template>
  <!-- 
      ref="upload" 获取dom元素 --upload  
      action=''    必选参数，上传的地址	string
      :on-preview="handlePreview" 点击文件列表中已上传的文件时的钩子 function(file)
      on-remove	    文件列表移除文件时的钩子	function(file, fileList)
      on-success	文件上传成功时的钩子	function(response, file, fileList)
      on-error	    文件上传失败时的钩子	function(err, file, fileList)
      on-progress	文件上传时的钩子	function(event, file, fileList)
      auto-upload	是否在选取文件后立即进行上传
      file-list	    上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]	array

 -->
  <el-upload
    class="upload-demo"
    ref="upload"
    accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PNG"
    :limit="1"
    :action="url"
    :before-upload="beforeUpload"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :on-success="successUpload"
    :file-list="fileList"
    :auto-upload="false"
    :headers="headers"
    :on-exceed="handleExceed"
  >
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button style="margin-left: 10px" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
  </el-upload>
</template>

<script>
//这⾥可以导⼊其他⽂件（⽐如：组件，⼯具js，第三⽅插件js，json⽂件，图⽚⽂件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { base } from "@/api/AxoisUtils";
export default {
  //import引⼊的组件需要注⼊到对象中才能使⽤
  components: {},
  data() {
    //这⾥存放数据
    return {
      url: base.uploadUrl, //图片地址服务器
      fileList: [],
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //⽅法集合
  methods: {
    beforeUpload(file) {
      const fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1).toLowerCase();
      const whiteList = ["jpg", "jpeg", "png"];
      if (!whiteList.includes(fileSuffix)) {
        this.$message.error("上传文件只能是 jpg,jpeg,png格式");
        return false;
      }
    },
    //点击上传按钮--submit()	手动上传文件列表
    submitUpload() {
      this.$refs.upload.submit();
    },
    //上传成功的函数
    successUpload(response, file, fileList) {
      console.log("上传成功", response, file, fileList);
      this.$message({ message: "恭喜你，图片上传成功", type: "success" });
      let imgUrl = response.data.img;
      this.$emit("sendImg", imgUrl);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件`);
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
<style scoped></style>
