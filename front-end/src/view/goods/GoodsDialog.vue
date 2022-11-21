<!--  -->
<template>
  <div class="box">
    <!-- 
            title="添加商品" 弹框的标题
            :visible.sync="dialogVisible" 控制弹框显示隐藏 boolean  true显示
            width="70%" 宽度 大小

       -->
    <el-dialog :title="isEditOrAdd ? '添加商品' : '编辑商品'" :visible.sync="dialogVisible" width="70%" style="margin-top:-10vh">
      <!-- 内容区域 -->
      <el-form :model="goodsForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="类目选择" prop="cat_name">
          <el-button type="primary" @click="innerVisible = true">类目选择</el-button>
          <span style="margin-left:10px;">{{ goodsForm.cat_name }}</span>
        </el-form-item>
        <el-form-item label="商品名称" prop="goods_name">
          <el-input v-model="goodsForm.goods_name"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="goods_price">
          <el-input v-model="goodsForm.goods_price"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" prop="goods_number">
          <el-input v-model="goodsForm.goods_number"></el-input>
        </el-form-item>
        <el-form-item label="发布时间" required>
          <el-form-item prop="created">
            <el-date-picker type="datetime" placeholder="选择日期" v-model="goodsForm.created" style="width: 100%"></el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item label="商品卖点" prop="sell_point">
          <el-input v-model="goodsForm.sell_point"></el-input>
        </el-form-item>
        <el-form-item label="商品图片" prop="goods_pic">
          <el-button type="primary" @click="innerVisibleImg = true">上传图片</el-button>
          <img :src="goodsForm.goods_pic" height="200px" style="margin-left: 10px" alt="" />
        </el-form-item>
        <el-form-item label="商品描述" prop="goods_introduce">
          <textarea name="" id="" cols="60" rows="10" v-model="goodsForm.goods_introduce"></textarea>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </div>
      <!-- 1. 内弹框--- 类目选择 -->
      <el-dialog width="40%" title="类目选择" :visible.sync="innerVisible" append-to-body style="margin-top:-8vh">
        <TreeGoods @sendTreeData="sendTreeData" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">取 消</el-button>
          <el-button type="primary" @click="showTreeData">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 2. 内弹框 --- 上传图片 -->
      <el-dialog
        width="40%"
        title="上传图片"
        :visible.sync="innerVisibleImg"
        append-to-body
      >
        <UploadImg @sendImg="sendImg" ref="upload" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisibleImg = false">取 消</el-button>
          <el-button type="primary" @click="showImg">确 定</el-button>
        </span>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
//这⾥可以导⼊其他⽂件（⽐如：组件，⼯具js，第三⽅插件js，json⽂件，图⽚⽂件等等）
//例如：import 《组件名称》 from '《组件路径》';
import TreeGoods from "../goods/TreeGoods.vue";
import UploadImg from "../goods/UploadImg.vue";
import GoodsEditor from "../goods/GoodsEditor.vue";

export default {
  //import引⼊的组件需要注⼊到对象中才能使⽤
  components: {
    TreeGoods,
    UploadImg,
    GoodsEditor
  },
  data() {
    //这⾥存放数据
    return {
      // 判断是添加还是编辑 默认为添加true
      isEditOrAdd: true,
      dialogVisible: false, //外弹框
      innerVisible: false, //内弹框
      innerVisibleImg: false, //图片弹框
      imgUrl: "",
      treeData: {}, //接受tree数据
      goodsForm: {
        //表单容器-对象
        goods_name: "", //商品名称
        goods_price: "",
        goods_number: "",
        sell_point: "",
        goods_pic: "",
        goods_introduce: "",
        cat_id: "", //商品类目
        created: "", //商品时间
        cat_name: "",
      },
      rules: {
        //校验规则
        goods_name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        goods_price: [
          { required: true, message: "请输入价格", trigger: "blur" },
          {
            pattern: /^\d+.?\d*$/,
            required: true,
            message: "请输入正确的价格",
            trigger: "blur",
          },
        ],
        goods_number: [
          { required: true, message: "请输入数量", trigger: "blur" },
          {
            pattern: /^\d+$/,
            required: true,
            message: "请输入正确的数量",
            trigger: "blur",
          },
        ],
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //⽅法集合
  methods: {
    // 显示tree数据
    showTreeData() {
      this.innerVisible = false;
      //显示tree数据
      this.goodsForm.cat_name = this.treeData.cat_name;
      this.goodsForm.cat_id = this.treeData.cat_id;
    },
    // 获取tree数据
    sendTreeData(val) {
      console.log("tree数据", val);
      this.treeData = val;
    },
    //显示图片的地址
    sendImg(val) {
      console.log("显示图片的地址", val);
      this.imgUrl = val;
    },
    //显示图片--确定按钮
    showImg() {
      this.innerVisibleImg = false;
      this.goodsForm.goods_pic = this.imgUrl;
      //清空图片上传的列表
      this.$refs.upload.fileList = [];
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
  text-align: left;
}
</style>
