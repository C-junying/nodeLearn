<!--  -->
<template>
  <div class="box">
    <!-- 
            title="添加商品" 弹框的标题
            :visible.sync="dialogVisible" 控制弹框显示隐藏 boolean  true显示
            width="70%" 宽度 大小

       -->
    <el-dialog
      :title="isEditOrAdd ? '添加商品' : '编辑商品'"
      :before-close="iconClose"
      :visible.sync="dialogVisible"
      width="70%"
      style="margin-top:-10vh"
    >
      <!-- 内容区域 -->
      <el-form :model="goodsForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="类目选择" prop="cat_name">
          <el-button type="primary" @click="innerVisible = true">类目选择</el-button>
          <span style="margin-left:10px;">{{ goodsForm.cat_name }}</span>
        </el-form-item>
        <el-form-item label="商品名称" prop="goods_name">
          <el-input v-model="goodsForm.goods_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="goods_price">
          <el-input v-model="goodsForm.goods_price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" prop="goods_number">
          <el-input v-model="goodsForm.goods_number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="更新时间" required>
          <el-form-item prop="updated">
            <el-date-picker type="datetime" placeholder="选择日期" v-model="goodsForm.updated" style="width: 100%"></el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item label="商品卖点" prop="sell_point">
          <el-input v-model="goodsForm.sell_point" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品图片" prop="goods_pic">
          <div class="img-flex">
            <el-button type="primary" @click="innerVisibleImg = true">上传图片</el-button>
            <img :src="goodsForm.goods_pic" min-height="10px" max-height="200px" style="margin-left: 10px;max-width:200px" alt="" />
          </div>
        </el-form-item>
        <el-form-item label="商品描述" prop="goods_introduce">
          <GoodsEditor ref="myEditor" @sendEditor="sendEditor" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确定</el-button>
        <el-button type="warning" @click="resetForm">重置</el-button>
        <el-button @click="iconClose">取消</el-button>
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
      <el-dialog width="40%" title="上传图片" :visible.sync="innerVisibleImg" append-to-body>
        <UploadImg @sendImg="sendImg" ref="upload" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="closeImg">取 消</el-button>
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
import { doAddGoods, doUpdateGoods } from "@/api/goods";

export default {
  //import引⼊的组件需要注⼊到对象中才能使⽤
  components: {
    TreeGoods,
    UploadImg,
    GoodsEditor,
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
        goods_id: "",
        goods_name: "",
        goods_price: "",
        goods_number: "",
        sell_point: "",
        goods_pic: "",
        goods_introduce: "",
        cat_id: "",
        barcode: null,
        goods_state: null,
        created: "",
        updated: "",
        cat_name: "",
      },
      rules: {
        //校验规则
        cat_name: [{ required: true, message: "请选择类目", trigger: "blur" }],
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
    // 关闭表单弹窗
    iconClose() {
      this.dialogVisible = false;
      this.$refs.ruleForm.resetFields();
      this.$refs.myEditor.editor.txt.clear();
    },
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
    // 接受GoodsEditor数据
    sendEditor(val) {
      this.goodsForm.goods_introduce = val;
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
    // 关闭上传图片弹窗
    closeImg() {
      this.innerVisibleImg = false;
      //清空图片上传的列表
      this.$refs.upload.fileList = [];
    },
    // 提交表单
    submitForm() {
      let self = this;
      let submitForm = Object.assign({}, self.goodsForm);
      submitForm.updated = self.$moment(submitForm.updated);
      console.log(submitForm);
      self.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          if (self.isEditOrAdd) {
            doAddGoods(submitForm).then((ret) => {
              let type = "error";
              if (ret.data.code == 200) {
                type = "success";
              }
              self.$message({ type: type, message: ret.data.msg, duration: 1000 });
              self.$parent.goodsList();
            });
          } else {
            doUpdateGoods(submitForm).then((ret) => {
              let type = "error";
              if (ret.data.code == 200) {
                type = "success";
              }
              self.$message({ type: type, message: ret.data.msg, duration: 1000 });
              self.$parent.goodsList();
            });
          }
          self.dialogVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置表单
    resetForm() {
      this.$refs.ruleForm.resetFields();
      this.goodsForm = {
        goods_name: "",
        goods_price: "",
        goods_number: "",
        sell_point: "",
        goods_pic: "",
        goods_introduce: "",
        cat_id: "",
        barcode: null,
        goods_state: null,
        created: "",
        updated: "",
        cat_name: "",
      };
      //单独-清空编辑器内容--editor.txt.clear()
      this.$refs.myEditor.editor.txt.clear();
    },
    setGoodsEditor(){
      this.$nextTick(()=>{
        this.$refs.myEditor.editor.txt.html(this.goodsForm.goods_introduce);
      });
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
.img-flex {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
