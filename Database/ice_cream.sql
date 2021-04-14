/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 50727
 Source Host           : 127.0.0.1:3306
 Source Schema         : ice-cream

 Target Server Type    : MySQL
 Target Server Version : 50727
 File Encoding         : 65001

 Date: 14/03/2021 17:05:54
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for ic_address
-- ----------------------------
DROP TABLE IF EXISTS `ic_address`;
CREATE TABLE `ic_address`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `user_id` int(11) NULL DEFAULT NULL COMMENT 'user id',
  `level1` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'level 1',
  `level2` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'level 2',
  `level3` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'level 3',
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'description',
  `mile` decimal(65, 15) NULL DEFAULT NULL COMMENT 'mile of away shop',
  `valid` int(1) NULL DEFAULT NULL COMMENT '1:valid,0:invalid',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for ic_delivery
-- ----------------------------
DROP TABLE IF EXISTS `ic_delivery`;
CREATE TABLE `ic_delivery`  (
  `id` int(11) NOT NULL COMMENT 'id',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'name',
  `work_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'work id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ic_delivery
-- ----------------------------
INSERT INTO `ic_delivery` VALUES (1, 'A', 'A01');
INSERT INTO `ic_delivery` VALUES (2, 'B', 'B01');
INSERT INTO `ic_delivery` VALUES (3, 'C', 'C01');

-- ----------------------------
-- Table structure for ic_flavour
-- ----------------------------
DROP TABLE IF EXISTS `ic_flavour`;
CREATE TABLE `ic_flavour`  (
  `id` int(11) NOT NULL COMMENT 'id',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'name of flavour',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ic_flavour
-- ----------------------------
INSERT INTO `ic_flavour` VALUES (1, 'Plain vanilla');
INSERT INTO `ic_flavour` VALUES (2, 'Honeycomb');
INSERT INTO `ic_flavour` VALUES (3, 'Rum and Raisin');
INSERT INTO `ic_flavour` VALUES (4, 'Mint');
INSERT INTO `ic_flavour` VALUES (5, 'Cherry');
INSERT INTO `ic_flavour` VALUES (6, 'Chocolate');
INSERT INTO `ic_flavour` VALUES (7, 'Salted Caramel');
INSERT INTO `ic_flavour` VALUES (8, 'Strawberry');

-- ----------------------------
-- Table structure for ic_ice_cream
-- ----------------------------
DROP TABLE IF EXISTS `ic_ice_cream`;
CREATE TABLE `ic_ice_cream`  (
  `id` int(11) NOT NULL COMMENT 'id',
  `flavour_id` int(11) NOT NULL COMMENT 'id of flavour',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'ice cream name',
  `extra_price` decimal(10, 2) NULL DEFAULT NULL COMMENT 'extra price',
  `type` bit(4) NULL DEFAULT NULL COMMENT '0: cones,1: tubs',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ic_ice_cream
-- ----------------------------
INSERT INTO `ic_ice_cream` VALUES (1, 1, 'Plain vanilla', 0.00, b'0001');
INSERT INTO `ic_ice_cream` VALUES (2, 2, 'Honeycomb', 0.00, b'0001');
INSERT INTO `ic_ice_cream` VALUES (3, 3, 'Rum and Raisin', 0.00, b'0001');
INSERT INTO `ic_ice_cream` VALUES (4, 4, 'Mint', 0.00, b'0001');
INSERT INTO `ic_ice_cream` VALUES (5, 5, 'Cherry', 0.00, b'0001');
INSERT INTO `ic_ice_cream` VALUES (6, 6, 'Chocolate', 0.00, b'0001');
INSERT INTO `ic_ice_cream` VALUES (7, 7, 'Salted Caramel', 0.75, b'0001');
INSERT INTO `ic_ice_cream` VALUES (8, 8, 'Strawberry', 0.00, b'0001');

-- ----------------------------
-- Table structure for ic_order
-- ----------------------------
DROP TABLE IF EXISTS `ic_order`;
CREATE TABLE `ic_order`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `order_number` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'oder number',
  `user_id` int(11) NULL DEFAULT NULL COMMENT 'user id',
  `address_id` int(11) NULL DEFAULT NULL COMMENT 'address id',
  `contact` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'contact',
  `price_id` int(11) NULL DEFAULT NULL COMMENT 'price id',
  `ice_cream_id` int(11) NULL DEFAULT NULL COMMENT 'ice cream id',
  `type` int(255) NULL DEFAULT NULL COMMENT '0:collection,1:delivery',
  `delivery_id` int(11) NULL DEFAULT NULL COMMENT 'delivery id',
  `payed` int(1) NULL DEFAULT 0 COMMENT '0:not payed,1:payed',
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'address',
  `add_time` datetime(0) NULL DEFAULT NULL COMMENT 'add time',
  `update_time` datetime(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0) COMMENT 'update time',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for ic_price
-- ----------------------------
DROP TABLE IF EXISTS `ic_price`;
CREATE TABLE `ic_price`  (
  `id` int(11) NOT NULL COMMENT 'id',
  `value` decimal(65, 2) NULL DEFAULT NULL COMMENT 'price',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'name of size',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ic_price
-- ----------------------------
INSERT INTO `ic_price` VALUES (1, 1.75, 'Small');
INSERT INTO `ic_price` VALUES (2, 2.25, 'Medium');
INSERT INTO `ic_price` VALUES (3, 2.75, 'Large');
INSERT INTO `ic_price` VALUES (4, 3.50, 'Extra Large');
INSERT INTO `ic_price` VALUES (5, 5.75, 'Extra Extra Large');

-- ----------------------------
-- Table structure for ic_shop
-- ----------------------------
DROP TABLE IF EXISTS `ic_shop`;
CREATE TABLE `ic_shop`  (
  `id` int(11) NOT NULL COMMENT 'id',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'shop name',
  `opening_hour` time(6) NULL DEFAULT NULL COMMENT 'opening hour',
  `closing_hour` time(6) NULL DEFAULT NULL COMMENT 'closing hour',
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'location of shop',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ic_shop
-- ----------------------------
INSERT INTO `ic_shop` VALUES (1, 'Cavallo', '11:00:00.000000', '18:00:00.000000', 'Avenue Cresent,Seaton Delaval,Northumberland NE25 0DN');

-- ----------------------------
-- Table structure for ic_stock
-- ----------------------------
DROP TABLE IF EXISTS `ic_stock`;
CREATE TABLE `ic_stock`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `ice_cream_id` int(11) NULL DEFAULT NULL COMMENT 'ice cream id',
  `count` int(11) NULL DEFAULT NULL COMMENT 'count',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ic_stock
-- ----------------------------
INSERT INTO `ic_stock` VALUES (1, 1, 100);
INSERT INTO `ic_stock` VALUES (2, 2, 100);
INSERT INTO `ic_stock` VALUES (3, 3, 100);
INSERT INTO `ic_stock` VALUES (4, 4, 100);
INSERT INTO `ic_stock` VALUES (5, 5, 100);
INSERT INTO `ic_stock` VALUES (6, 6, 100);
INSERT INTO `ic_stock` VALUES (7, 7, 100);
INSERT INTO `ic_stock` VALUES (8, 8, 100);

-- ----------------------------
-- Table structure for ic_user
-- ----------------------------
DROP TABLE IF EXISTS `ic_user`;
CREATE TABLE `ic_user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `user_tel` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'telphone',
  `user_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'user name',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'password',
  `is_admin` bit(1) NULL DEFAULT NULL COMMENT 'is admin',
  `salt` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'salt',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ic_user
-- ----------------------------
INSERT INTO `ic_user` VALUES (1, NULL, 'admin', 'admin', b'1', '$2a$10$0Q.nIS922XX7AcU.G9Z19.lUH41xGZlWYq/BjSJOEuRVUKy1xSMci');
INSERT INTO `ic_user` VALUES (4, NULL, 'jack', 'jack', NULL, '$2a$10$0hSvndwGyk9CuPXfAU2OMuoSfWwQXDH.64UhsPwqXCghZIepppMHe');
INSERT INTO `ic_user` VALUES (5, NULL, 'lucy', 'lucy', NULL, '$2a$10$vWEKdpk.3vUsp6rpFZCvJOg1kFK9J8PnocQbCweMKrHw/AoW8JFPW');

SET FOREIGN_KEY_CHECKS = 1;
