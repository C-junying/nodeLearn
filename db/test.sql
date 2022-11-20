/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80011
 Source Host           : localhost:3306
 Source Schema         : test

 Target Server Type    : MySQL
 Target Server Version : 80011
 File Encoding         : 65001

 Date: 20/11/2022 21:19:39
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods`  (
  `goods_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `goods_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商品名称',
  `goods_pic` char(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '图片',
  `sell_point` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商品卖点',
  `goods_price` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '商品价格',
  `cat_id` int(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '类型id',
  `goods_number` int(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '商品数量',
  `barcode` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '条形码',
  `goods_state` int(11) NULL DEFAULT 0 COMMENT '商品状态 0: 未通过 1: 审核中 2: 已审核',
  `created` datetime(0) NULL DEFAULT NULL COMMENT '添加商品时间',
  `updated` datetime(0) NULL DEFAULT NULL COMMENT '修改商品时间',
  `goods_introduce` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '商品详情介绍',
  PRIMARY KEY (`goods_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10039 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '商品表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES (10015, '三体-刘慈欣', '', '未来科幻', 99.00, 0, 999, '0', 0, NULL, NULL, '<p>这是大刘的得意之作，连奥巴马都喜欢看！</p>');
INSERT INTO `goods` VALUES (10028, '梦里花落知多少', '', '小时代！！！', 11.00, 10001, 11, '0', 0, NULL, NULL, '<p>还不错，但是要看书籍，不要看电影</p>');
INSERT INTO `goods` VALUES (10031, '我与地坛', '', '做一个不动声色的人', 55.00, 0, 464, '0', 0, NULL, NULL, '人生尔尔，错过了，就是一辈子');
INSERT INTO `goods` VALUES (10032, '舞！舞！舞！', '', '村上春树经典作品', 234.00, 43, 34, '0', 0, NULL, NULL, '人不是慢慢变老的，而是一瞬间变老的');
INSERT INTO `goods` VALUES (10033, '岁月神偷', '', '经典书籍', 23.00, 0, 23, '0', 0, NULL, NULL, '我没有精力去认识一个新的人，或者花力气去宠福新维系一段感情，跟没办法在把自己的故事讲述一遍又一遍');
INSERT INTO `goods` VALUES (10035, '解忧杂货店', '', '无论现在有多么的不开心，你要相信明天会比今天更好', 34.00, 0, 12, '0', 0, NULL, NULL, '<p>无论现在有多么的不开心，你要相信明天会比今天更好!!!!</p>');
INSERT INTO `goods` VALUES (10038, '小王子', '', '写给成年人的童话故事', 20.00, 0, 1, '0', 1, NULL, NULL, '所有人都曾是小孩，虽然之后少数人记得');
INSERT INTO `goods` VALUES (10039, '笑场', '', '李诞的作品，很有意思，集成了扯经', 55.00, 100002, 1000, '0', 1, NULL, NULL, '<p>未曾开言，我先笑场，笑过之后，听我来诉一诉衷肠</p>');
INSERT INTO `goods` VALUES (10040, '万历十五年', '', '人民的名义里面出现过很多次', 45.00, 10002, 26, '0', 1, NULL, NULL, '<p>在明朝当皇帝其实没那么幸福，比其清朝来说，还是清朝的皇帝牛逼，毕竟清朝才是更加牛逼的中央集权制</p>');
INSERT INTO `goods` VALUES (10041, '万寿寺【王小波】', '', '很好看', 20.00, 100001, 99, '0', 1, NULL, NULL, '<div>测试新的内容····</div>');
INSERT INTO `goods` VALUES (10046, '红楼梦2', '', '四大名著2', 99.00, 100001, 8, '0', 1, NULL, NULL, '<div>红楼梦</div><p><br></p>');
INSERT INTO `goods` VALUES (10050, '佳能（Canon）', '', '【爆款】Vlog视频拍摄神器！轻便外观、快速连续对焦，机内防抖、边走边拍，拍Vlgo，买它！！', 3799.00, 10003, 77, '0', 1, NULL, NULL, '<div></div><p>PowerShot G7 X Mark II G7X2 数码相机 Vlog相机 视频拍摄&nbsp;&nbsp;<br></p>');

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu`  (
  `menuId` int(11) NOT NULL AUTO_INCREMENT,
  `pId` int(11) NULL DEFAULT NULL,
  `menuName` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `menuUrl` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `authorize` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '授权，多个逗号分隔所有权限例如：user:list,user:create',
  `menuType` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '0目录，2菜单，3按钮',
  `menuLogo` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `sort` int(2) UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`menuId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of menu
-- ----------------------------
INSERT INTO `menu` VALUES (1, -1, '系统管理', NULL, NULL, '0', 'el-icon-setting', 0);
INSERT INTO `menu` VALUES (2, 1, '用户管理', '/system/user', NULL, '1', 'el-icon-s-custom', 1);
INSERT INTO `menu` VALUES (3, 1, '菜单管理', '/system/hello', NULL, '1', 'el-icon-menu', 2);
INSERT INTO `menu` VALUES (4, 1, '角色管理', '', NULL, '1', 'el-icon-user', 3);
INSERT INTO `menu` VALUES (5, -1, '商品管理', NULL, NULL, '0', 'el-icon-menu', 0);
INSERT INTO `menu` VALUES (6, 5, '商品清单', '/system/goods', NULL, '1', 'el-icon-goods', 2);
INSERT INTO `menu` VALUES (7, -1, '订单管理', NULL, NULL, '0', 'el-icon-s-order', 0);
INSERT INTO `menu` VALUES (8, 7, '交易订单', '/system/order', NULL, '1', 'el-icon-s-shop', 1);

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `roleId` int(11) NOT NULL AUTO_INCREMENT,
  `roleName` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`roleId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES (1, '超级管理员', '可以查看所有功能');
INSERT INTO `role` VALUES (2, '管理员', '只能查看系统管理');
INSERT INTO `role` VALUES (3, '用户', '查询');
INSERT INTO `role` VALUES (4, '学生', '学生');
INSERT INTO `role` VALUES (5, '老师', '老师');

-- ----------------------------
-- Table structure for role_menu
-- ----------------------------
DROP TABLE IF EXISTS `role_menu`;
CREATE TABLE `role_menu`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `roleId` int(11) NULL DEFAULT NULL,
  `menuId` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of role_menu
-- ----------------------------
INSERT INTO `role_menu` VALUES (1, 1, 1);
INSERT INTO `role_menu` VALUES (2, 1, 2);
INSERT INTO `role_menu` VALUES (3, 1, 3);
INSERT INTO `role_menu` VALUES (4, 1, 4);
INSERT INTO `role_menu` VALUES (5, 1, 5);
INSERT INTO `role_menu` VALUES (6, 1, 6);
INSERT INTO `role_menu` VALUES (7, 2, 5);
INSERT INTO `role_menu` VALUES (8, 2, 6);
INSERT INTO `role_menu` VALUES (9, 2, 7);
INSERT INTO `role_menu` VALUES (10, 2, 8);
INSERT INTO `role_menu` VALUES (11, 1, 7);
INSERT INTO `role_menu` VALUES (12, 1, 8);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `createTime` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`userId`) USING BTREE,
  UNIQUE INDEX `email`(`email`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 28 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'admin', '$2a$10$IluDaVUMjlEEqZMPsDQJfOWHVwGSUM9CJF.BsO8U/RnjHptTJl5rO', '123456@qq.com', '2022-06-16 20:50:01');
INSERT INTO `user` VALUES (2, 'david', '$2a$10$IluDaVUMjlEEqZMPsDQJfOWHVwGSUM9CJF.BsO8U/RnjHptTJl5rO', 'david@qq.com', '2020-06-01 14:20:15');
INSERT INTO `user` VALUES (3, '张三', '$2a$10$IluDaVUMjlEEqZMPsDQJfOWHVwGSUM9CJF.BsO8U/RnjHptTJl5rO', '123@qq.com', '2022-06-16 10:50:01');
INSERT INTO `user` VALUES (4, '张三', '$2a$10$IluDaVUMjlEEqZMPsDQJfOWHVwGSUM9CJF.BsO8U/RnjHptTJl5rO', '1234@qq.com', '2022-06-16 10:50:01');
INSERT INTO `user` VALUES (5, '张三', '$2a$10$IluDaVUMjlEEqZMPsDQJfOWHVwGSUM9CJF.BsO8U/RnjHptTJl5rO', '1235@qq.com', '2022-06-16 10:50:01');
INSERT INTO `user` VALUES (6, '张三', '$2a$10$IluDaVUMjlEEqZMPsDQJfOWHVwGSUM9CJF.BsO8U/RnjHptTJl5rO', '1236@qq.com', '2022-06-16 16:50:01');
INSERT INTO `user` VALUES (7, 'jone', '$2a$10$IluDaVUMjlEEqZMPsDQJfOWHVwGSUM9CJF.BsO8U/RnjHptTJl5rO', '111@qq.com', '2022-06-16 10:50:01');
INSERT INTO `user` VALUES (8, '王五', '$2a$10$hEUXeIHgf5i1d390HoH3OejbQ8g77Pkqqyh8rJcov4wD3GMaenuhG', '112@qq.com', '2022-06-16 10:50:01');
INSERT INTO `user` VALUES (9, '李四', '$2a$10$0PWY5LbPm/pxpydf.hEm/.E8Id.spjIiQELkwCmqzzPPxHmeZQ.Hq', '113@qq.com', '2022-06-29 11:52:01');
INSERT INTO `user` VALUES (10, '雪花', '$2a$10$IluDaVUMjlEEqZMPsDQJfOWHVwGSUM9CJF.BsO8U/RnjHptTJl5rO', '12347@qq.com', '2022-06-16 10:50:01');

-- ----------------------------
-- Table structure for user_role
-- ----------------------------
DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NULL DEFAULT NULL,
  `roleId` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user_role
-- ----------------------------
INSERT INTO `user_role` VALUES (2, 2, 2);
INSERT INTO `user_role` VALUES (7, 11, 1);
INSERT INTO `user_role` VALUES (10, 12, 1);
INSERT INTO `user_role` VALUES (11, 5, 0);
INSERT INTO `user_role` VALUES (13, 1, 1);
INSERT INTO `user_role` VALUES (16, 10, 2);

-- ----------------------------
-- Table structure for usertest
-- ----------------------------
DROP TABLE IF EXISTS `usertest`;
CREATE TABLE `usertest`  (
  `userName` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`userName`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of usertest
-- ----------------------------
INSERT INTO `usertest` VALUES ('as', '$2a$10$tOHH.6QXhvtYQQcPMSt3rOAR4fpX4eJR0JKzS/g7avOd9sO9YscU.');
INSERT INTO `usertest` VALUES ('boy', '$2a$10$6qK.vLuU1v32bDZVCObhGO9KJl.h0BiuJbChm7T70uJT/wC1Wua.2');
INSERT INTO `usertest` VALUES ('girl', '$2a$10$FsHqjRzP6R/mo4W.m1FvSe0Lq0q5X.V6W0aMvZawlX0hWcTpGL6ty');
INSERT INTO `usertest` VALUES ('jone', '$2a$10$ohrAvL9jIOHm9gcs7lR.FuwDNAeWSLoeVq/WbJscX9gF76.bLr8Om');
INSERT INTO `usertest` VALUES ('qw', '$2a$10$kfTyHPL4KAT4ttQvd65f4eOi.fvI6MvHD1pPqK56rA7WmYLS2KwWy');

SET FOREIGN_KEY_CHECKS = 1;
