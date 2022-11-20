<!--  -->
<template>
  <div>
    <!-- 主体内容	 -->
    <el-card>
      <!-- 搜索区域 -->
      <!-- <el-row>
	   		<el-col :span="6">
	   			<el-input placeholder="请输入内容" v-model="queryInfo.query" class="input-with-select" clearable @clear="getOrderList">
	   				<el-button slot="append" icon="el-icon-search" @click="getOrderList"></el-button>
	   			</el-input>
	   		</el-col>
	   		
	   	</el-row> -->

      <!-- 列表用户内容区域	 -->
      <el-table :data="orderList" border style="width: 100%">
        <el-table-column type="index" width="180"> </el-table-column>
        <el-table-column prop="order_number" label="订单编号" width="180"> </el-table-column>
        <el-table-column prop="order_price" label="订单价格"> </el-table-column>
        <el-table-column prop="pay_status" label="是否付款" width="180">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.pay_status == '1'">已付款</el-tag>
            <el-tag type="danger" v-else>未付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.is_send }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="下单时间">
          <template slot-scope="scope">
            <span>{{ scope.row.create_time | dateFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEdit(scope.$index, scope.row)"></el-button>
            <el-button type="warning" icon="el-icon-location" size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页功能 -->
      <!-- <el-pagination
        align="left"
        @size-change="SizeChange"
        @current-change="CurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination> -->
    </el-card>

    <!-- 修改地址dialog	 -->
    <!-- <el-dialog title="修改地址" :visible.sync="EditAddressVisible" width="50%"> -->
    <!-- 修改地址主体部分 -->
    <!-- <el-form :model="editAddressForm" :rules="EditFormRul" ref="EditFormRel" label-width="100px" class="demo-ruleForm">
        <el-form-item label="省市区/县" prop="address1">
          <el-cascader v-model="editAddressForm.address1" :options="cityDate"></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="address2">
          <el-input v-model="editAddressForm.address2"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="EditAddressVisible = false">取 消</el-button>
        <el-button type="primary" @click="EditAddressVisible = false">确 定</el-button>
      </span>
    </el-dialog> -->
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
      orderList: [
        {
          order_number: "itcast-59e411eaaccc9",
          order_price: "222.00",
          pay_status: "1",
          is_send: "是",
          create_time: "2022-06-16 20:50:01",
        },
        {
          order_number: "itcast-59e411eaaccc9",
          order_price: "222.00",
          pay_status: "0",
          is_send: "是",
          create_time: "2022-06-16 20:50:01",
        },
      ],
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10,
        user_id: "",
        pay_status: "",
        is_send: "",
        order_fapiao_title: "",
        order_fapiao_company: "",
        order_fapiao_content: "",
        consignee_addr: "",
      },
      total: 0,
      //修改地址dialog
      EditAddressVisible: false,
      //修改收货地址的表单
      editAddressForm: {
        address1: [],
        address2: "",
      },
      //修改地址栏规则
      EditFormRul: {
        address1: [{ required: true, message: "请选择省市区县", trigger: "blur" }],
        address2: [{ required: true, message: "请输入详细地址", trigger: "blur" }],
      },
      //导入的地址
      // cityDate:cityDate
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //⽅法集合
  methods: {
    //获取当前订单参数
    // getOrderList(){
    // 	this.$http.get('orders',{params:this.queryInfo}).then(res=>{
    // 		console.log(res)
    // 		this.orderList = res.data.data.goods;
    // 		this.total = res.data.data.total;
    // 	})
    // },
    // //数据条数发生改变时
    // SizeChange(newSize){
    // 	this.queryInfo.pagesize = newSize;
    // 	this.getOrderList();
    // },
    // //当前页码发生改变时
    // CurrentChange(newNum){
    // 	this.queryInfo.pagenum = newNum;
    // 	this.getOrderList();
    // },
    // //点击按钮，弹出dialog
    // showEdit(){
    // 	this.EditAddressVisible = !this.EditAddressVisible;
    // }
  },
  //⽣命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //⽣命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // this.getOrderList();
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
.el-cascader {
  width: 100%;
}
</style>
