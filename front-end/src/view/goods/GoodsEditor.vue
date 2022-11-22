<!--  -->
<template>
<div id="main"></div>
</template>

<script>
//这⾥可以导⼊其他⽂件（⽐如：组件，⼯具js，第三⽅插件js，json⽂件，图⽚⽂件等等）
//例如：import 《组件名称》 from '《组件路径》';
import E from "wangeditor";

export default {
//import引⼊的组件需要注⼊到对象中才能使⽤
components: {},
data() {
//这⾥存放数据
return {
editor: "",
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
//创建wangeditor实例
    this.editor = new E("#main");
    // 取消自动 focus
    this.editor.config.focus = false

    // 配置 onchange 回调函数--获取输入的值内容
    this.editor.config.onchange = newHtml => {
    //   console.log("change 之后最新的 html", newHtml);
      //把获取的富文本编辑内容--传递给弹框组件--- 父组件
        this.$emit('sendEditor',newHtml)
    };
    // 配置触发 onchange 的时间频率，默认为 200ms
    this.editor.config.onchangeTimeout = 500; // 修改为 500ms
    // 配置菜单栏，删减菜单，调整顺序
    // 默认情况下，显示所有菜单
    this.editor.config.menus = [
      "head",
      "bold",
      "fontSize",
      "fontName",
      "italic",
      "underline",
      "strikeThrough",
      "indent",
      "lineHeight",
      "foreColor",
      "backColor",
      "link",
      //   "list",
      //   "todo",
      //   "justify",
      //   "quote",
      "emoticon",
      "image",
      "video",
      "table",
      "code",
      "splitLine",
      "undo",
      "redo",
    ];

    this.editor.create();
    let eds = document.getElementsByClassName('w-e-text-container')
    eds[0].style = eds[0].style.cssText + 'max-height: 100px;overflow-y: scroll;'
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