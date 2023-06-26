/*
Navicat MySQL Data Transfer

Source Server         : 192.168.1.191
Source Server Version : 50173
Source Host           : 192.168.1.191:3306
Source Database       : sfr_sf_dev04

Target Server Type    : MYSQL
Target Server Version : 50173
File Encoding         : 65001

Date: 2017-03-20 08:35:16
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for play_evolutions
-- ----------------------------
DROP TABLE IF EXISTS `play_evolutions`;
CREATE TABLE `play_evolutions` (
  `id` int(11) NOT NULL,
  `hash` varchar(255) NOT NULL,
  `applied_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `apply_script` mediumtext,
  `revert_script` mediumtext,
  `state` varchar(255) DEFAULT NULL,
  `last_problem` mediumtext,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sfr_sf_balance_of_stock
-- ----------------------------
DROP TABLE IF EXISTS `sfr_sf_balance_of_stock`;
CREATE TABLE `sfr_sf_balance_of_stock` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  `created_user` int(11) DEFAULT NULL,
  `updated_user` int(11) DEFAULT NULL,
  `value` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `denno_product_code` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sfr_sf_checksheet
-- ----------------------------
DROP TABLE IF EXISTS `sfr_sf_checksheet`;
CREATE TABLE `sfr_sf_checksheet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `deal_id` int(11) NOT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  `created_user` int(11) DEFAULT NULL,
  `updated_user` int(11) DEFAULT NULL,
  `question_code` int(5) NOT NULL,
  `textarea1` varchar(255) DEFAULT NULL,
  `textarea2` varchar(255) DEFAULT NULL,
  `radiobutton` int(1) DEFAULT NULL,
  `selectbox1` int(11) DEFAULT NULL,
  `selectbox2` int(11) DEFAULT NULL,
  `selectbox3` int(11) DEFAULT NULL,
  `checkbox1` int(11) DEFAULT NULL,
  `checkbox2` int(11) DEFAULT NULL,
  `checkbox3` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_sfr_sf_checklist_sfr_sf_deal1_idx` (`deal_id`),
  CONSTRAINT `fk_sfr_sf_checksheet_sfr_sf_deal1` FOREIGN KEY (`deal_id`) REFERENCES `sfr_sf_deal` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sfr_sf_comment
-- ----------------------------
DROP TABLE IF EXISTS `sfr_sf_comment`;
CREATE TABLE `sfr_sf_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_user` int(11) DEFAULT NULL,
  `updated_user` int(11) DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `value` varchar(255) DEFAULT NULL,
  `deal_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_Comments_Users1_idx` (`user_id`),
  KEY `fk_Comments_Deals1_idx` (`deal_id`),
  CONSTRAINT `fk_Comments_Deals1` FOREIGN KEY (`deal_id`) REFERENCES `sfr_sf_deal` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Comments_Users1` FOREIGN KEY (`user_id`) REFERENCES `sfr_sf_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sfr_sf_current_stock
-- ----------------------------
DROP TABLE IF EXISTS `sfr_sf_current_stock`;
CREATE TABLE `sfr_sf_current_stock` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `created_user` int(11) DEFAULT NULL,
  `updated_user` int(11) DEFAULT NULL,
  `denno_product_code` varchar(40) DEFAULT NULL,
  `total` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sfr_sf_customer
-- ----------------------------
DROP TABLE IF EXISTS `sfr_sf_customer`;
CREATE TABLE `sfr_sf_customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_user` int(11) DEFAULT NULL,
  `updated_user` int(11) DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  `name` varchar(30) DEFAULT NULL COMMENT '得意先名',
  `dept_name` varchar(50) DEFAULT NULL,
  `pic_name` varchar(40) DEFAULT NULL,
  `saler_name` varchar(6) DEFAULT NULL,
  `hp_info` varchar(50) DEFAULT NULL,
  `memo` varchar(255) DEFAULT NULL,
  `customer_code` varchar(20) NOT NULL,
  `delete_flag` int(11) NOT NULL DEFAULT '0',
  `abbreviation` varchar(16) DEFAULT NULL,
  `furigana` varchar(20) DEFAULT NULL,
  `abbr_furigana` varchar(8) DEFAULT NULL,
  `customer_rep` varchar(40) DEFAULT NULL,
  `customer_contact` varchar(40) DEFAULT NULL,
  `pic_code` varchar(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `customer_code_UNIQUE` (`customer_code`)
) ENGINE=InnoDB AUTO_INCREMENT=4662 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sfr_sf_customer_goal
-- ----------------------------
DROP TABLE IF EXISTS `sfr_sf_customer_goal`;
CREATE TABLE `sfr_sf_customer_goal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  `created_user` int(11) DEFAULT NULL,
  `updated_user` int(11) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `activity_policy` varchar(400) DEFAULT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `pic_id` int(11) NOT NULL,
  `department_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_sfr_sf_customer_goal_sfr_sf_customer1_idx` (`customer_id`),
  KEY `fk_sfr_sf_customer_goal_sfr_sf_user1_idx` (`pic_id`),
  KEY `fk_sfr_sf_customer_goal_sfr_sf_department1_idx` (`department_id`),
  CONSTRAINT `fk_sfr_sf_customer_goal_sfr_sf_customer1` FOREIGN KEY (`customer_id`) REFERENCES `sfr_sf_customer` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sfr_sf_customer_goal_sfr_sf_department1` FOREIGN KEY (`department_id`) REFERENCES `sfr_sf_department` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sfr_sf_customer_goal_sfr_sf_user1` FOREIGN KEY (`pic_id`) REFERENCES `sfr_sf_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2215 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sfr_sf_customer_goal_item
-- ----------------------------
DROP TABLE IF EXISTS `sfr_sf_customer_goal_item`;
CREATE TABLE `sfr_sf_customer_goal_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  `created_user` int(11) DEFAULT NULL,
  `updated_user` int(11) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `goal` decimal(10,0) DEFAULT NULL,
  `customer_goal_id` int(11) NOT NULL,
  `month` int(11) DEFAULT NULL,
  `customer_type` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_sfr_sf_customer_goal_item_sfr_sf_customer_goal1_idx` (`customer_goal_id`),
  CONSTRAINT `fk_sfr_sf_customer_goal_item_sfr_sf_customer_goal1` FOREIGN KEY (`customer_goal_id`) REFERENCES `sfr_sf_customer_goal` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=79717 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sfr_sf_deal
-- ----------------------------
DROP TABLE IF EXISTS `sfr_sf_deal`;
CREATE TABLE `sfr_sf_deal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_user` int(11) DEFAULT NULL,
  `updated_user` int(11) DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  `deal_name` varchar(60) DEFAULT NULL COMMENT '案件名',
  `sales_id` int(11) DEFAULT NULL COMMENT '担当営業名',
  `est_total_deal` decimal(10,0) DEFAULT NULL COMMENT '受注予定額',
  `deal_status` int(11) DEFAULT NULL COMMENT 'ステータス\n1	仕掛中\n2	仕掛中（概算見積提出済）\n3	仕掛中（サンプル提出済）\n4	仕掛中（デザイン提出済）\n5	仕掛り中（見積承認済）\n6	仕掛中（最終見積提出済）\n7	製造依頼中\n8	受注確定\n',
  `user_id` int(11) DEFAULT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `deal_code` varchar(12) DEFAULT NULL,
  `deal_type` int(11) DEFAULT NULL,
  `delivery_date` datetime DEFAULT NULL,
  `delete_flag` int(11) NOT NULL DEFAULT '1' COMMENT 'Deleted: 0 / Normal: 1',
  `template_flag` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `deal_code_UNIQUE` (`deal_code`),
  KEY `fk_sfr_sf_deal_sfr_sf_user1_idx` (`user_id`),
  KEY `fk_sfr_sf_deal_sfr_sf_customer1_idx` (`customer_id`),
  CONSTRAINT `fk_sfr_sf_deal_sfr_sf_customer1` FOREIGN KEY (`customer_id`) REFERENCES `sfr_sf_customer` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sfr_sf_deal_sfr_sf_user1` FOREIGN KEY (`user_id`) REFERENCES `sfr_sf_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=10238 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sfr_sf_deal_file
-- ----------------------------
DROP TABLE IF EXISTS `sfr_sf_deal_file`;
CREATE TABLE `sfr_sf_deal_file` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  `created_user` int(11) DEFAULT NULL,
  `updated_user` int(11) DEFAULT NULL,
  `original_name` varchar(255) DEFAULT NULL,
  `file_id` int(11) NOT NULL,
  `deal_id` int(11) NOT NULL,
  `deal_file_id` varchar(255) DEFAULT NULL,
  `deal_file_name` varchar(255) DEFAULT NULL,
  `memo` varchar(255) DEFAULT NULL,
  `highlight_flag` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_sfr_sf_deal_file_sfr_sf_file1_idx` (`file_id`),
  KEY `fk_sfr_sf_deal_file_sfr_sf_deal1_idx` (`deal_id`),
  CONSTRAINT `fk_sfr_sf_deal_file_sfr_sf_deal1` FOREIGN KEY (`deal_id`) REFERENCES `sfr_sf_deal` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sfr_sf_deal_file_sfr_sf_file1` FOREIGN KEY (`file_id`) REFERENCES `sfr_sf_file` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sfr_sf_deal_product
-- ----------------------------
DROP TABLE IF EXISTS `sfr_sf_deal_product`;
CREATE TABLE `sfr_sf_deal_product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `deal_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `created_user` int(11) DEFAULT NULL,
  `updated_user` int(11) DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  `highlight_flag` int(11) NOT NULL DEFAULT '0',
  `type` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_Deals_Products_Deals1_idx` (`deal_id`),
  KEY `fk_Deals_Products_Products1_idx` (`product_id`),
  CONSTRAINT `fk_Deals_Products_Deals1` FOREIGN KEY (`deal_id`) REFERENCES `sfr_sf_deal` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Deals_Products_Products1` FOREIGN KEY (`product_id`) REFERENCES `sfr_sf_product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=122 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sfr_sf_department
-- ----------------------------
DROP TABLE IF EXISTS `sfr_sf_department`;
CREATE TABLE `sfr_sf_department` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  `created_user` int(11) DEFAULT NULL,
  `updated_user` int(11) DEFAULT NULL,
  `department` varchar(200) DEFAULT NULL,
  `department_code` varchar(20) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `tel` varchar(20) DEFAULT NULL,
  `fax` varchar(20) DEFAULT NULL,
  `bank_name` varchar(50) DEFAULT NULL,
  `postal_code` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=172 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sfr_sf_department_goal
-- ----------------------------
DROP TABLE IF EXISTS `sfr_sf_department_goal`;
CREATE TABLE `sfr_sf_department_goal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  `created_user` int(11) DEFAULT NULL,
  `updated_user` int(11) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `activity_policy` varchar(400) DEFAULT NULL,
  `department_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_sfr_sf_user_goal_sfr_sf_department1_idx` (`department_id`),
  CONSTRAINT `fk_sfr_sf_user_goal_sfr_sf_department1` FOREIGN KEY (`department_id`) REFERENCES `sfr_sf_department` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sfr_sf_department_goal_item
-- ----------------------------
DROP TABLE IF EXISTS `sfr_sf_department_goal_item`;
CREATE TABLE `sfr_sf_department_goal_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  `created_user` int(11) DEFAULT NULL,
  `updated_user` int(11) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `goal` decimal(10,0) DEFAULT NULL,
  `month` int(11) DEFAULT NULL,
  `department_goal_id` int(11) NOT NULL,
  `customer_type` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_sfr_sf_user_goal_item_sfr_sf_user_goal1_idx` (`department_goal_id`),
  CONSTRAINT `fk_sfr_sf_user_goal_item_sfr_sf_user_goal1` FOREIGN KEY (`department_goal_id`) REFERENCES `sfr_sf_department_goal` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=750 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sfr_sf_drawing_image
-- ----------------------------
DROP TABLE IF EXISTS `sfr_sf_drawing_image`;
CREATE TABLE `sfr_sf_drawing_image` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `updated_date` datetime NOT NULL,
  `created_date` datetime NOT NULL,
  `updated_user` int(11) DEFAULT NULL,
  `created_user` int(11) DEFAULT NULL,
  `x` int(11) DEFAULT NULL,
  `y` int(11) DEFAULT NULL,
  `rotate` int(11) DEFAULT NULL,
  `product_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_sfr_sf_drawing_image_sfr_sf_product1_idx` (`product_id`),
  CONSTRAINT `fk_sfr_sf_drawing_image_sfr_sf_product1` FOREIGN KEY (`product_id`) REFERENCES `sfr_sf_product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sfr_sf_file
-- ----------------------------
DROP TABLE IF EXISTS `sfr_sf_file`;
CREATE TABLE `sfr_sf_file` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_user` int(11) DEFAULT NULL,
  `updated_user` int(11) DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  `file_code` varchar(128) DEFAULT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sfr_sf_loading_address
-- ----------------------------
DROP TABLE IF EXISTS `sfr_sf_loading_address`;
CREATE TABLE `sfr_sf_loading_address` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  `created_user` int(11) DEFAULT NULL,
  `updated_user` int(11) DEFAULT NULL,
  `value` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sfr_sf_mst_color
-- ----------------------------
DROP TABLE IF EXISTS `sfr_sf_mst_color`;
CREATE TABLE `sfr_sf_mst_color` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_user` int(11) DEFAULT NULL,
  `updated_user` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `color_option` int(11) NOT NULL COMMENT '色数',
  `basic_cost` decimal(10,0) NOT NULL COMMENT '基本料',
  `through_wage` decimal(10,1) NOT NULL COMMENT '通工賃',
  `cost_per_packet` decimal(10,0) DEFAULT NULL COMMENT '一律',
  `through_wage_branch` decimal(10,0) DEFAULT NULL COMMENT '通し工賃分岐',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sfr_sf_mst_die_cutting
-- ----------------------------
DROP TABLE IF EXISTS `sfr_sf_mst_die_cutting`;
CREATE TABLE `sfr_sf_mst_die_cutting` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_user` int(11) DEFAULT NULL,
  `updated_user` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `paperboard_type` int(11) NOT NULL COMMENT '板紙種類',
  `size` int(11) NOT NULL COMMENT 'サイズ ',
  `imposition_number` int(11) NOT NULL COMMENT '面付',
  `through_number` int(11) NOT NULL COMMENT '通数',
  `basic_cost` decimal(10,0) NOT NULL COMMENT '基本料',
  `through_wage` decimal(10,1) NOT NULL COMMENT '通工賃',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=881 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sfr_sf_mst_packing
-- ----------------------------
DROP TABLE IF EXISTS `sfr_sf_mst_packing`;
CREATE TABLE `sfr_sf_mst_packing` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_user` int(11) DEFAULT NULL,
  `updated_user` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `method` int(11) NOT NULL COMMENT '方法',
  `lot` int(11) NOT NULL COMMENT 'ロット',
  `percent` decimal(4,2) NOT NULL COMMENT '%',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sfr_sf_mst_paper
-- ----------------------------
DROP TABLE IF EXISTS `sfr_sf_mst_paper`;
CREATE TABLE `sfr_sf_mst_paper` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_user` int(11) DEFAULT NULL,
  `updated_user` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `name_id` int(11) NOT NULL COMMENT '原紙名 ID',
  `basic_weight` decimal(10,0) NOT NULL COMMENT '坪量g/㎡',
  `norm_value` decimal(10,1) NOT NULL COMMENT '建値k@',
  `lsize_tgrain` int(11) NOT NULL DEFAULT '0',
  `lsize_ygrain` int(11) NOT NULL DEFAULT '0',
  `ksize_tgrain` int(11) NOT NULL DEFAULT '0',
  `ksize_ygrain` int(11) NOT NULL DEFAULT '0',
  `user_role` varchar(1) DEFAULT NULL,
  `factory_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=458 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sfr_sf_mst_paste
-- ----------------------------
DROP TABLE IF EXISTS `sfr_sf_mst_paste`;
CREATE TABLE `sfr_sf_mst_paste` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_user` int(11) DEFAULT NULL,
  `updated_user` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `paper_type` int(11) NOT NULL COMMENT '紙種類',
  `form` int(11) NOT NULL,
  `blank_size` int(11) NOT NULL COMMENT 'ﾌﾞﾗﾝｸｻｲｽﾞ',
  `basic_cost` decimal(10,0) NOT NULL COMMENT '基本料',
  `through_wage` decimal(10,1) NOT NULL COMMENT '工賃',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=531 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sfr_sf_mst_shape
-- ----------------------------
DROP TABLE IF EXISTS `sfr_sf_mst_shape`;
CREATE TABLE `sfr_sf_mst_shape` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `updated_date` datetime NOT NULL,
  `created_date` datetime NOT NULL,
  `updated_user` int(11) DEFAULT NULL,
  `created_user` int(11) DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `note` varchar(200) NOT NULL,
  `width` decimal(10,1) NOT NULL,
  `height` decimal(10,1) NOT NULL,
  `depth` decimal(10,1) NOT NULL,
  `flap` int(11) NOT NULL,
  `insertion` int(11) NOT NULL,
  `grain` int(11) NOT NULL,
  `development_width` decimal(10,1) NOT NULL,
  `development_height` decimal(10,1) NOT NULL,
  `min_width` decimal(10,1) DEFAULT NULL,
  `max_width` decimal(10,1) DEFAULT NULL,
  `min_height` decimal(10,1) DEFAULT NULL,
  `max_height` decimal(10,1) DEFAULT NULL,
  `min_depth` decimal(10,1) DEFAULT NULL,
  `max_depth` decimal(10,1) DEFAULT NULL,
  `file_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_sfr_sf_mst_shape_sfr_sf_file1_idx` (`file_id`),
  CONSTRAINT `fk_sfr_sf_mst_shape_sfr_sf_file1` FOREIGN KEY (`file_id`) REFERENCES `sfr_sf_file` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sfr_sf_mst_sheet_size
-- ----------------------------
DROP TABLE IF EXISTS `sfr_sf_mst_sheet_size`;
CREATE TABLE `sfr_sf_mst_sheet_size` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_user` int(11) DEFAULT NULL,
  `updated_user` int(11) DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  `name` varchar(5) NOT NULL,
  `width` decimal(4,1) NOT NULL,
  `height` decimal(4,1) NOT NULL,
  `grain` int(11) NOT NULL,
  `paper_id` int(11) NOT NULL,
  `popular` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_sfr_sf_mst_sheet_size_sfr_sf_mst_paper1_idx` (`paper_id`),
  CONSTRAINT `fk_sfr_sf_mst_sheet_size_sfr_sf_mst_paper1` FOREIGN KEY (`paper_id`) REFERENCES `sfr_sf_mst_paper` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3206 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sfr_sf_mst_shipping_company
-- ----------------------------
DROP TABLE IF EXISTS `sfr_sf_mst_shipping_company`;
CREATE TABLE `sfr_sf_mst_shipping_company` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  `created_user` int(11) DEFAULT NULL,
  `updated_user` int(11) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  `company_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sfr_sf_mst_shipping_cost
-- ----------------------------
DROP TABLE IF EXISTS `sfr_sf_mst_shipping_cost`;
CREATE TABLE `sfr_sf_mst_shipping_cost` (
  `id` int(11) NOT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  `created_user` int(11) DEFAULT NULL,
  `updated_user` int(11) DEFAULT NULL,
  `distance` int(11) DEFAULT NULL,
  `weight` int(11) DEFAULT NULL,
  `cost` decimal(10,0) DEFAULT NULL,
  `factory_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sfr_sf_mst_stamping
-- ----------------------------
DROP TABLE IF EXISTS `sfr_sf_mst_stamping`;
CREATE TABLE `sfr_sf_mst_stamping` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_user` int(11) DEFAULT NULL,
  `updated_user` int(11) DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  `processing_type` int(11) NOT NULL COMMENT '加工種類',
  `blank` int(11) NOT NULL COMMENT 'ﾌﾞﾗﾝｸ',
  `basic_cost` decimal(10,0) NOT NULL COMMENT '基本料',
  `through_wage` decimal(10,1) NOT NULL COMMENT '工賃',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sfr_sf_mst_surface_treatment
-- ----------------------------
DROP TABLE IF EXISTS `sfr_sf_mst_surface_treatment`;
CREATE TABLE `sfr_sf_mst_surface_treatment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_user` int(11) DEFAULT NULL,
  `updated_user` int(11) DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  `varnish_type` int(11) NOT NULL COMMENT '板紙種類',
  `size` int(11) NOT NULL COMMENT 'サイズ ',
  `through_number` int(11) NOT NULL COMMENT '通数',
  `basic_cost` decimal(10,0) NOT NULL COMMENT '基本料',
  `through_wage` decimal(10,1) NOT NULL COMMENT '通工賃',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=148 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sfr_sf_mst_window
-- ----------------------------
DROP TABLE IF EXISTS `sfr_sf_mst_window`;
CREATE TABLE `sfr_sf_mst_window` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_user` int(11) DEFAULT NULL,
  `updated_user` int(11) DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  `window_size` int(11) NOT NULL COMMENT '寸法',
  `window_lot` int(11) NOT NULL COMMENT 'ロット',
  `window_material` int(11) NOT NULL COMMENT '材質',
  `window_preparation_fee` decimal(10,0) NOT NULL COMMENT '準備料',
  `window_through_wage` decimal(10,1) NOT NULL COMMENT '通工賃',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sfr_sf_mst_wooden
-- ----------------------------
DROP TABLE IF EXISTS `sfr_sf_mst_wooden`;
CREATE TABLE `sfr_sf_mst_wooden` (
  `id` int(11) NOT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  `created_user` int(11) DEFAULT NULL,
  `updated_user` int(11) DEFAULT NULL,
  `wooden_code` varchar(20) DEFAULT NULL,
  `wooden_total_number` decimal(10,0) DEFAULT NULL,
  `wooden_expired_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sfr_sf_mybox_item
-- ----------------------------
DROP TABLE IF EXISTS `sfr_sf_mybox_item`;
CREATE TABLE `sfr_sf_mybox_item` (
  `created_user` int(11) DEFAULT NULL,
  `updated_user` int(11) DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `deal_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `type` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_Mybox items(bookmark)_Users1_idx` (`user_id`),
  KEY `fk_Mybox items(bookmark)_Deals1_idx` (`deal_id`),
  CONSTRAINT `fk_Mybox items(bookmark)_Deals1` FOREIGN KEY (`deal_id`) REFERENCES `sfr_sf_deal` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Mybox items(bookmark)_Users1` FOREIGN KEY (`user_id`) REFERENCES `sfr_sf_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sfr_sf_offer
-- ----------------------------
DROP TABLE IF EXISTS `sfr_sf_offer`;
CREATE TABLE `sfr_sf_offer` (
  `unit_price` decimal(10,2) DEFAULT NULL COMMENT '提出金額 - 単価',
  `total` decimal(15,2) DEFAULT NULL COMMENT '提出金額 - 合計',
  `profit_rate` decimal(10,2) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  `created_user` int(11) DEFAULT NULL,
  `updated_user` int(11) DEFAULT NULL,
  `product_output_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_sfr_sf_offer_sfr_sf_product_output1_idx` (`product_output_id`),
  CONSTRAINT `fk_sfr_sf_offer_sfr_sf_product_output1` FOREIGN KEY (`product_output_id`) REFERENCES `sfr_sf_product_output` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=591 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sfr_sf_order
-- ----------------------------
DROP TABLE IF EXISTS `sfr_sf_order`;
CREATE TABLE `sfr_sf_order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  `created_user` int(11) DEFAULT NULL,
  `updated_user` int(11) DEFAULT NULL,
  `deal_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_sfr_sf_order_sfr_sf_deal1_idx` (`deal_id`),
  CONSTRAINT `fk_sfr_sf_order_sfr_sf_deal1` FOREIGN KEY (`deal_id`) REFERENCES `sfr_sf_deal` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sfr_sf_order_item
-- ----------------------------
DROP TABLE IF EXISTS `sfr_sf_order_item`;
CREATE TABLE `sfr_sf_order_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  `created_user` int(11) DEFAULT NULL,
  `updated_user` int(11) DEFAULT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `loading_address_id` int(11) NOT NULL,
  `delivery_type` int(11) DEFAULT NULL,
  `delivery_status` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `ship_date` varchar(5) DEFAULT NULL,
  `shipping_company_id` int(11) NOT NULL,
  `ship_time` varchar(20) DEFAULT NULL,
  `limit_quantity` int(11) DEFAULT NULL,
  `memo` varchar(255) DEFAULT NULL,
  `submitted_price` decimal(10,2) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_sfr_sf_order_item_sfr_sf_order1_idx` (`order_id`),
  KEY `fk_sfr_sf_order_item_sfr_sf_product1_idx` (`product_id`),
  KEY `fk_sfr_sf_order_item_sfr_sf_loading_address1_idx` (`loading_address_id`),
  KEY `fk_sfr_sf_order_item_sfr_sf_mst_shipping_company1_idx` (`shipping_company_id`),
  CONSTRAINT `fk_sfr_sf_order_item_sfr_sf_loading_address1` FOREIGN KEY (`loading_address_id`) REFERENCES `sfr_sf_loading_address` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sfr_sf_order_item_sfr_sf_mst_shipping_company1` FOREIGN KEY (`shipping_company_id`) REFERENCES `sfr_sf_mst_shipping_company` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sfr_sf_order_item_sfr_sf_order1` FOREIGN KEY (`order_id`) REFERENCES `sfr_sf_order` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sfr_sf_order_item_sfr_sf_product1` FOREIGN KEY (`product_id`) REFERENCES `sfr_sf_product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sfr_sf_prediction
-- ----------------------------
DROP TABLE IF EXISTS `sfr_sf_prediction`;
CREATE TABLE `sfr_sf_prediction` (
  `id` int(11) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `created_user` int(11) DEFAULT NULL,
  `updated_user` int(11) DEFAULT NULL,
  `type1_goal` decimal(6,0) DEFAULT NULL,
  `type2_goal` decimal(6,0) DEFAULT NULL,
  `type3_goal` decimal(6,0) DEFAULT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `head_flag` int(11) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sfr_sf_product
-- ----------------------------
DROP TABLE IF EXISTS `sfr_sf_product`;
CREATE TABLE `sfr_sf_product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `paste_id` int(11) DEFAULT NULL COMMENT '貼り ID',
  `color_id_f` int(11) DEFAULT NULL COMMENT '色（オモテ）ID',
  `paper_id` int(11) DEFAULT NULL COMMENT '原紙 ID',
  `window_id` int(11) DEFAULT NULL COMMENT '窓枠 ID',
  `packing_id` int(11) DEFAULT NULL COMMENT '梱包',
  `stamping_id` int(11) DEFAULT NULL COMMENT '箔押し',
  `surface_treatment_id_f` int(11) DEFAULT NULL COMMENT '表面加工 Front',
  `surface_treatment_id_b` int(11) DEFAULT NULL COMMENT '表面加工 Back',
  `die_cutting_id` int(11) DEFAULT NULL COMMENT '打抜ID',
  `color_id_b` int(11) DEFAULT NULL COMMENT '色（ウラ）ID',
  `embossingID` int(11) DEFAULT NULL COMMENT 'エンボス加工',
  `created_user` int(11) DEFAULT NULL,
  `updated_user` int(11) DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  `product_name` varchar(30) NOT NULL COMMENT '製品名',
  `product_type` int(11) DEFAULT NULL COMMENT '製品種類',
  `specs` varchar(100) DEFAULT NULL COMMENT '仕様',
  `application` varchar(60) DEFAULT NULL COMMENT '用途',
  `memo1` varchar(255) DEFAULT NULL COMMENT 'メモ',
  `size_h` decimal(10,1) DEFAULT NULL COMMENT '製品寸法 Height',
  `size_d` decimal(10,1) DEFAULT NULL COMMENT '製品寸法 Depth',
  `size_w` decimal(10,1) DEFAULT NULL COMMENT '製品寸法 Width',
  `paper_name_id` int(11) DEFAULT NULL COMMENT '原紙名',
  `paper_size_h` decimal(10,1) DEFAULT NULL COMMENT '原紙サイズ Height',
  `paper_size_w` decimal(10,1) DEFAULT NULL COMMENT '原紙サイズ Width',
  `cut_paper_size_h` decimal(10,1) DEFAULT NULL COMMENT '断裁サイズ Height',
  `cut_paper_size_w` decimal(10,1) DEFAULT NULL COMMENT '断裁サイズ Width',
  `blank_paper_size_h` decimal(10,1) DEFAULT NULL COMMENT 'ブランクサイズ Height',
  `blank_paper_size_w` decimal(10,1) DEFAULT NULL COMMENT 'ブランクサイズ Width',
  `taken_number` int(11) DEFAULT NULL COMMENT '取数',
  `imposition_number` int(11) DEFAULT NULL COMMENT '面付数',
  `color_f_select` int(11) DEFAULT NULL COMMENT '色（オモテ）',
  `color_b_select` int(11) DEFAULT NULL COMMENT '色（ウラ）',
  `special_color_f` int(11) DEFAULT NULL COMMENT '色（オモテ）特色数',
  `special_color_b` int(11) DEFAULT NULL COMMENT '色（ウラ）特色数',
  `print_method` int(11) DEFAULT NULL COMMENT '印刷方法',
  `lamination_flute` int(11) DEFAULT NULL COMMENT 'フルート',
  `lamination_medium_basic_weight` int(11) DEFAULT NULL COMMENT '中芯　坪量',
  `lamination_medium_through_wage` int(11) DEFAULT NULL COMMENT '中芯　ｋ＠',
  `lamination_back_basic_weight` int(11) DEFAULT NULL COMMENT '裏ライナ　坪量',
  `lamination_back_through_wage` int(11) DEFAULT NULL COMMENT '裏ライナ　ｋ＠',
  `lamination_number` int(11) DEFAULT NULL COMMENT '片段取数',
  `lamination_width` int(11) DEFAULT NULL COMMENT '紙幅',
  `lamination_cutting_flow` int(11) DEFAULT NULL COMMENT '断裁流れ',
  `die_cutting_through_number` int(11) DEFAULT NULL COMMENT '打抜種類',
  `die_cutting_weight` int(11) DEFAULT NULL COMMENT '打抜面付数',
  `stamping_processing_type` int(11) DEFAULT NULL COMMENT '加工種類',
  `stamping_size_w1` int(11) DEFAULT NULL COMMENT '箔押し Width 1',
  `stamping_size_w2` int(11) DEFAULT NULL COMMENT '箔押し Width 2\n',
  `stamping_size_w3` int(11) DEFAULT NULL COMMENT '箔押し Width 3\n',
  `stamping_size_w4` int(11) DEFAULT NULL COMMENT '箔押し Width 4',
  `stamping_size_h1` int(11) DEFAULT NULL COMMENT '箔押し Height 1',
  `stamping_size_h2` int(11) DEFAULT NULL COMMENT '箔押し Height 2',
  `stamping_size_h3` int(11) DEFAULT NULL COMMENT '箔押し Height 3',
  `stamping_size_h4` int(11) DEFAULT NULL COMMENT '箔押し Height 4',
  `window_size_h` int(11) DEFAULT NULL COMMENT '窓枠寸法_縦',
  `window_size_w` int(11) DEFAULT NULL COMMENT '窓枠寸法_横',
  `paste_form` int(11) DEFAULT NULL COMMENT '貼り形態',
  `paste_blank_size` int(11) DEFAULT NULL COMMENT '通方向ﾌﾞﾗﾝｸｻｲｽﾞ',
  `paste_special_form` tinyint(1) DEFAULT NULL COMMENT '貼特殊形態',
  `inspection_id` int(11) DEFAULT NULL COMMENT '検品',
  `film_number` decimal(8,0) DEFAULT NULL,
  `paper_type` int(11) DEFAULT NULL,
  `paper_weight` int(11) DEFAULT NULL,
  `product_code` varchar(10) DEFAULT NULL,
  `customer_product_code` varchar(20) DEFAULT NULL,
  `request_production` int(11) DEFAULT NULL,
  `memo2` varchar(255) DEFAULT NULL,
  `paste_special_form_flag` int(11) NOT NULL DEFAULT '0',
  `delivery_distance` int(11) DEFAULT NULL,
  `other_expense1` varchar(200) DEFAULT NULL,
  `other_wage1` int(11) DEFAULT NULL,
  `other_unit_type1` int(11) DEFAULT NULL,
  `other_expense2` varchar(200) DEFAULT NULL,
  `other_wage2` int(11) DEFAULT NULL,
  `other_unit_type2` int(11) DEFAULT NULL,
  `other_expense3` varchar(200) DEFAULT NULL,
  `other_wage3` int(11) DEFAULT NULL,
  `other_unit_type3` int(11) DEFAULT NULL,
  `wooden_code` varchar(20) DEFAULT NULL,
  `shipping_cost_id` int(11) DEFAULT NULL,
  `shape_id` int(11) DEFAULT NULL,
  `sheet_size_id` int(11) DEFAULT NULL,
  `sheet_size_width` decimal(4,1) DEFAULT NULL,
  `sheet_size_height` decimal(4,1) DEFAULT NULL,
  `sheet_size_grain` int(11) DEFAULT NULL,
  `flap` int(11) DEFAULT NULL,
  `insertion` int(11) DEFAULT NULL,
  `grain` int(11) DEFAULT NULL,
  `development_height` decimal(10,1) DEFAULT NULL,
  `groove` int(11) DEFAULT NULL,
  `color_memo` varchar(255) DEFAULT NULL,
  `denno_product_code` varchar(40) DEFAULT NULL,
  `factory_id` int(11) DEFAULT NULL,
  `stamping_points_number` int(11) DEFAULT NULL,
  `item_code` varchar(20) DEFAULT NULL,
  `special_size_flag` int(11) NOT NULL,
  `special_die_cutting_number_flag` int(11) NOT NULL,
  `lamination_paper_type_back` int(11) DEFAULT NULL,
  `paper_head_approval_flag` int(11) NOT NULL DEFAULT '0',
  `embossing_code` varchar(5) DEFAULT NULL,
  `copy_type` int(11) DEFAULT NULL,
  `lamination_paper_type_medium` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_sfr_sf_product_sfr_sf_mst_paste1_idx` (`paste_id`),
  KEY `fk_sfr_sf_product_sfr_sf_mst_color1_idx` (`color_id_f`),
  KEY `fk_sfr_sf_product_sfr_sf_mst_paper1_idx` (`paper_id`),
  KEY `fk_sfr_sf_product_sfr_sf_mst_window1_idx` (`window_id`),
  KEY `fk_sfr_sf_product_sfr_sf_mst_packing1_idx` (`packing_id`),
  KEY `fk_sfr_sf_product_sfr_sf_mst_stamping1_idx` (`stamping_id`),
  KEY `fk_sfr_sf_product_sfr_sf_mst_surface_treatment1_idx` (`surface_treatment_id_f`),
  KEY `fk_sfr_sf_product_sfr_sf_mst_striking1_idx` (`die_cutting_id`),
  KEY `fk_sfr_sf_product_sfr_sf_mst_surface_treatment2_idx` (`surface_treatment_id_b`),
  KEY `fk_sfr_sf_product_sfr_sf_mst_color2_idx` (`color_id_b`),
  KEY `fk_sfr_sf_product_sfr_sf_mst_surface_treatment3_idx` (`embossingID`),
  KEY `fk_sfr_sf_product_sfr_sf_mst_shipping_cost1_idx` (`shipping_cost_id`),
  CONSTRAINT `fk_sfr_sf_product_sfr_sf_mst_color1` FOREIGN KEY (`color_id_f`) REFERENCES `sfr_sf_mst_color` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sfr_sf_product_sfr_sf_mst_color2` FOREIGN KEY (`color_id_b`) REFERENCES `sfr_sf_mst_color` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sfr_sf_product_sfr_sf_mst_packing1` FOREIGN KEY (`packing_id`) REFERENCES `sfr_sf_mst_packing` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sfr_sf_product_sfr_sf_mst_paper1` FOREIGN KEY (`paper_id`) REFERENCES `sfr_sf_mst_paper` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sfr_sf_product_sfr_sf_mst_paste1` FOREIGN KEY (`paste_id`) REFERENCES `sfr_sf_mst_paste` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sfr_sf_product_sfr_sf_mst_shipping_cost1` FOREIGN KEY (`shipping_cost_id`) REFERENCES `sfr_sf_mst_shipping_cost` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sfr_sf_product_sfr_sf_mst_stamping1` FOREIGN KEY (`stamping_id`) REFERENCES `sfr_sf_mst_stamping` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sfr_sf_product_sfr_sf_mst_striking1` FOREIGN KEY (`die_cutting_id`) REFERENCES `sfr_sf_mst_die_cutting` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sfr_sf_product_sfr_sf_mst_surface_treatment1` FOREIGN KEY (`surface_treatment_id_f`) REFERENCES `sfr_sf_mst_surface_treatment` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sfr_sf_product_sfr_sf_mst_surface_treatment2` FOREIGN KEY (`surface_treatment_id_b`) REFERENCES `sfr_sf_mst_surface_treatment` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sfr_sf_product_sfr_sf_mst_surface_treatment3` FOREIGN KEY (`embossingID`) REFERENCES `sfr_sf_mst_surface_treatment` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sfr_sf_product_sfr_sf_mst_window1` FOREIGN KEY (`window_id`) REFERENCES `sfr_sf_mst_window` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sfr_sf_product_common_fee
-- ----------------------------
DROP TABLE IF EXISTS `sfr_sf_product_common_fee`;
CREATE TABLE `sfr_sf_product_common_fee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  `created_user` int(11) DEFAULT NULL,
  `updated_user` int(11) NOT NULL,
  `design_fee` decimal(10,0) DEFAULT NULL,
  `plate_making_fee` decimal(10,0) DEFAULT NULL,
  `wooden_fee` decimal(10,0) DEFAULT NULL,
  `resin_fee` decimal(10,0) DEFAULT NULL,
  `product_id` int(11) NOT NULL,
  `mold_fee` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_sfr_sf_product_common_fee_sfr_sf_product1_idx` (`product_id`),
  CONSTRAINT `fk_sfr_sf_product_common_fee_sfr_sf_product1` FOREIGN KEY (`product_id`) REFERENCES `sfr_sf_product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sfr_sf_product_file
-- ----------------------------
DROP TABLE IF EXISTS `sfr_sf_product_file`;
CREATE TABLE `sfr_sf_product_file` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  `created_user` int(11) DEFAULT NULL,
  `updated_user` int(11) DEFAULT NULL,
  `image_primary` int(11) DEFAULT NULL,
  `original_name` varchar(255) DEFAULT NULL,
  `file_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_file_name` varchar(255) DEFAULT NULL,
  `product_file_id` varchar(255) DEFAULT NULL,
  `memo` varchar(255) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `primary_flag` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_sfr_sf_product_file_sfr_sf_file1_idx` (`file_id`),
  KEY `fk_sfr_sf_product_file_sfr_sf_product1_idx` (`product_id`),
  CONSTRAINT `fk_sfr_sf_product_file_sfr_sf_file1` FOREIGN KEY (`file_id`) REFERENCES `sfr_sf_file` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sfr_sf_product_file_sfr_sf_product1` FOREIGN KEY (`product_id`) REFERENCES `sfr_sf_product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sfr_sf_product_output
-- ----------------------------
DROP TABLE IF EXISTS `sfr_sf_product_output`;
CREATE TABLE `sfr_sf_product_output` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_user` int(11) DEFAULT NULL,
  `updated_user` int(11) DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  `paper_actual_weight` decimal(10,2) DEFAULT NULL COMMENT '紙器用板紙代 - 連量',
  `paper_unit_price` decimal(10,2) DEFAULT NULL COMMENT '紙器用板紙代 - 枚単価',
  `paper_total_cost` decimal(15,2) DEFAULT NULL COMMENT '紙器用板紙代 - 板紙代計',
  `color_plate_cost_f` decimal(10,2) DEFAULT NULL COMMENT '印刷代　- 刷版代 Front',
  `color_plate_cost_b` decimal(10,2) DEFAULT NULL COMMENT '印刷代　- 刷版代 Back',
  `color_print_loss_f` decimal(10,2) DEFAULT NULL COMMENT '印刷代 - 印刷ロス Front',
  `color_print_loss_b` decimal(10,2) DEFAULT NULL COMMENT '印刷代 - 印刷ロス Back',
  `color_print_per_packet_cost_f` decimal(10,2) DEFAULT NULL COMMENT '印刷代 - 一律 Front',
  `color_print_per_packet_cost_b` decimal(10,2) DEFAULT NULL COMMENT '印刷代 - 一律 Back',
  `color_print_basic_cost_f` decimal(10,2) DEFAULT NULL COMMENT '印刷代 - 基本料 Front',
  `color_print_basic_cost_b` decimal(10,2) DEFAULT NULL COMMENT '印刷代 - 基本料 Back',
  `color_print_through_wage_f` decimal(10,2) DEFAULT NULL COMMENT '印刷代 - 色通工賃 Front',
  `color_print_through_wage_b` decimal(10,2) DEFAULT NULL COMMENT '印刷代 - 色通工賃 Back',
  `color_print_special_cost_f` decimal(10,2) DEFAULT NULL COMMENT '印刷代 - 印刷割増（色） Front',
  `color_print_special_cost_b` decimal(10,2) DEFAULT NULL COMMENT '印刷代 - 印刷割増（色） Back',
  `color_print_total_cost_f` decimal(15,2) DEFAULT NULL COMMENT '印刷代 - 印刷代計 Front',
  `color_print_total_cost_b` decimal(15,2) DEFAULT NULL COMMENT '印刷代 - 印刷代計 Back',
  `surface_treatment_basic_cost_f` varchar(10) DEFAULT NULL COMMENT '表面加工 - 基本料 Front',
  `surface_treatment_basic_cost_b` varchar(10) DEFAULT NULL COMMENT '表面加工 - 基本料 Back',
  `surface_treatment_through_wage_f` varchar(10) DEFAULT NULL COMMENT '表面加工 - 通工賃 Front',
  `surface_treatment_through_wage_b` varchar(10) DEFAULT NULL COMMENT '表面加工 - 通工賃 Back',
  `surface_treatment_total_cost_f` decimal(15,2) DEFAULT NULL COMMENT '表面加工  - 表面加工代計 Front',
  `surface_treatment_total_cost_b` decimal(15,2) DEFAULT NULL COMMENT '表面加工  - 表面加工代計 Back',
  `embossing_basic_cost` decimal(10,2) DEFAULT NULL COMMENT 'エンボス - 基本料',
  `embossing_through_wage` decimal(10,2) DEFAULT NULL COMMENT 'エンボス - 通工賃',
  `embossing_total_cost` decimal(15,2) DEFAULT NULL COMMENT 'エンボス - エンボス代計',
  `lamination_unit_price` decimal(10,2) DEFAULT NULL COMMENT '片段ラミネート - 紙代㎡＠',
  `lamination_sheet_cost` decimal(10,2) DEFAULT NULL COMMENT '片段ラミネート - シート代',
  `lamination_total_cost` decimal(15,2) DEFAULT NULL COMMENT '片段ラミネート - ラミネート代計',
  `die_cutting_loss` decimal(10,2) DEFAULT NULL COMMENT '打抜き - 打抜ロス',
  `die_cutting_basic_cost` decimal(10,2) DEFAULT NULL COMMENT '打抜き - 基本料',
  `die_cutting_through_wage` decimal(10,2) DEFAULT NULL COMMENT '打抜き - 通工賃',
  `die_cutting_total_cost` decimal(15,2) DEFAULT NULL COMMENT '打抜き - 打抜代計',
  `stamping_basic_cost` decimal(10,2) DEFAULT NULL COMMENT '箔押し代 - 基本料',
  `stamping_through_wage` decimal(10,2) DEFAULT NULL COMMENT '箔押し代 - 工賃',
  `stamping_total_cost` decimal(15,2) DEFAULT NULL COMMENT '箔押し代 - 箔押し代',
  `window_material_fee` decimal(10,2) DEFAULT NULL COMMENT '窓貼り代 - 材料代',
  `window_total_cost` decimal(15,2) DEFAULT NULL COMMENT '窓貼り代 - 窓貼代計',
  `paste_loss` decimal(10,2) DEFAULT NULL COMMENT '貼り - 貼ロス',
  `paste_basic_cost` decimal(10,2) DEFAULT NULL COMMENT '貼り - 基本料',
  `paste_through_wage` decimal(10,2) DEFAULT NULL COMMENT '貼り - 工賃',
  `paste_total_cost` decimal(15,2) DEFAULT NULL COMMENT '貼り - 貼り代計',
  `subtotal` decimal(15,2) DEFAULT NULL COMMENT '小計',
  `management_cost` decimal(10,2) DEFAULT NULL COMMENT '販管・配送 - 販売管理費',
  `fare_cost` decimal(10,2) DEFAULT NULL COMMENT '販管・配送 - 運賃',
  `fare_line_service` decimal(10,2) DEFAULT NULL COMMENT '販管・配送 - 運賃（路線便）',
  `estimated_total` decimal(15,2) DEFAULT NULL COMMENT '見積額 - 合計',
  `estimated_unit_price` decimal(10,2) DEFAULT NULL COMMENT '見積額 - 見積単価',
  `lot` int(11) DEFAULT NULL,
  `inspection` decimal(10,2) DEFAULT NULL,
  `packing` decimal(10,2) DEFAULT NULL,
  `primary_flag` int(11) NOT NULL DEFAULT '0',
  `deal_product_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_sfr_sf_product_output_sfr_sf_deal_product1_idx` (`deal_product_id`),
  CONSTRAINT `fk_sfr_sf_product_output_sfr_sf_deal_product1` FOREIGN KEY (`deal_product_id`) REFERENCES `sfr_sf_deal_product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=591 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sfr_sf_question
-- ----------------------------
DROP TABLE IF EXISTS `sfr_sf_question`;
CREATE TABLE `sfr_sf_question` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_id` int(11) NOT NULL,
  `question` varchar(255) NOT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  `created_user` int(11) DEFAULT NULL,
  `updated_user` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sfr_sf_quotation
-- ----------------------------
DROP TABLE IF EXISTS `sfr_sf_quotation`;
CREATE TABLE `sfr_sf_quotation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `deal_id` int(11) NOT NULL,
  `print_template_id` int(11) DEFAULT NULL,
  `created_user` int(11) DEFAULT NULL,
  `updated_user` int(11) DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  `interest_rate` decimal(10,1) DEFAULT NULL,
  `quotation_status` int(11) DEFAULT NULL,
  `total_cost` decimal(10,0) DEFAULT NULL,
  `memo` varchar(255) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `estimate_date` datetime DEFAULT NULL,
  `invoice_delivery_date` datetime DEFAULT NULL,
  `invoice_delivery_place` varchar(255) DEFAULT NULL,
  `invoice_payment_term` varchar(255) DEFAULT NULL,
  `invoice_customer_name` varchar(255) DEFAULT NULL,
  `invoice_dept_name` varchar(255) DEFAULT NULL,
  `invoice_pic` varchar(255) DEFAULT NULL,
  `invoice_address` varchar(255) DEFAULT NULL,
  `invoice_mail_address` varchar(50) DEFAULT NULL,
  `invoice_phone_number` varchar(255) DEFAULT NULL,
  `invoice_expiration_date` datetime DEFAULT NULL,
  `quotation_type` int(11) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `quotation_code` varchar(255) DEFAULT NULL,
  `consumption_tax` decimal(10,3) DEFAULT NULL,
  `total_excluded_tax` decimal(10,3) DEFAULT NULL,
  `highlight_flag` int(11) NOT NULL DEFAULT '0',
  `delivery_method` varchar(24) DEFAULT NULL,
  `stereo_type_1_flag` int(11) DEFAULT NULL,
  `stereo_type_2_flag` int(11) DEFAULT NULL,
  `stereo_type_3_flag` int(11) DEFAULT NULL,
  `stereo_type_4_flag` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `deal_id_idx` (`deal_id`),
  KEY `estimate_template_id_idx` (`print_template_id`),
  CONSTRAINT `deal_id` FOREIGN KEY (`deal_id`) REFERENCES `sfr_sf_deal` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `estimate_template_id` FOREIGN KEY (`print_template_id`) REFERENCES `sfr_sf_quotation_print_template` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sfr_sf_quotation_item
-- ----------------------------
DROP TABLE IF EXISTS `sfr_sf_quotation_item`;
CREATE TABLE `sfr_sf_quotation_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quotation_id` int(11) NOT NULL,
  `deal_product_id` int(11) DEFAULT NULL,
  `no` int(11) DEFAULT NULL,
  `item_index` int(11) DEFAULT NULL,
  `item_type` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `submitted_price` decimal(10,0) DEFAULT NULL,
  `quantity` decimal(10,0) DEFAULT NULL,
  `total` decimal(10,0) DEFAULT NULL,
  `product_type` int(11) DEFAULT NULL,
  `set_closed_flag` int(11) DEFAULT '0',
  `created_user` int(11) DEFAULT NULL,
  `updated_user` int(11) DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  `quotation_code` varchar(20) DEFAULT NULL,
  `quotation_name` varchar(50) DEFAULT NULL,
  `quotation_type` int(11) DEFAULT NULL,
  `saler_name` varchar(50) DEFAULT NULL,
  `interest_rate` decimal(19,2) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `estimate_id_idx` (`quotation_id`),
  KEY `fk_Estimate Items_Deals_Products1_idx` (`deal_product_id`),
  CONSTRAINT `estimate_id` FOREIGN KEY (`quotation_id`) REFERENCES `sfr_sf_quotation` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Estimate Items_Deals_Products1` FOREIGN KEY (`deal_product_id`) REFERENCES `sfr_sf_deal_product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sfr_sf_quotation_print_template
-- ----------------------------
DROP TABLE IF EXISTS `sfr_sf_quotation_print_template`;
CREATE TABLE `sfr_sf_quotation_print_template` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_user` int(11) DEFAULT NULL,
  `updated_user` int(11) DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  `select_option` int(11) NOT NULL,
  `path` varchar(200) NOT NULL,
  `file_name` varchar(30) NOT NULL,
  `application` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sfr_sf_revenue
-- ----------------------------
DROP TABLE IF EXISTS `sfr_sf_revenue`;
CREATE TABLE `sfr_sf_revenue` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  `created_user` int(11) DEFAULT NULL,
  `updated_user` int(11) DEFAULT NULL,
  `sales_seq` int(11) DEFAULT NULL,
  `order_code` varchar(40) DEFAULT NULL,
  `denno_customer_code` varchar(15) DEFAULT NULL,
  `sales_date` datetime DEFAULT NULL,
  `invoice_sales_date` datetime DEFAULT NULL,
  `sales_category` int(11) DEFAULT NULL,
  `sales_amount` int(11) DEFAULT NULL,
  `department_code` varchar(15) DEFAULT NULL,
  `sales_rep` varchar(6) DEFAULT NULL,
  `sales_number` decimal(11,2) DEFAULT NULL,
  `sales_unit_price` decimal(11,2) DEFAULT NULL,
  `manufacture_request` varchar(1) DEFAULT NULL,
  `item_code` varchar(40) DEFAULT NULL,
  `product_name` varchar(40) DEFAULT NULL,
  `product_type` int(11) DEFAULT NULL,
  `sales_seq2` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `sales_req` (`sales_seq2`,`sales_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=632526 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sfr_sf_shipping_destination
-- ----------------------------
DROP TABLE IF EXISTS `sfr_sf_shipping_destination`;
CREATE TABLE `sfr_sf_shipping_destination` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  `created_user` int(11) DEFAULT NULL,
  `updated_user` int(11) DEFAULT NULL,
  `delivery_name` varchar(50) DEFAULT NULL,
  `delivery_address1` varchar(50) DEFAULT NULL,
  `tel` varchar(20) DEFAULT NULL,
  `fax` varchar(20) DEFAULT NULL,
  `available_vehicle_size` varchar(50) DEFAULT NULL,
  `required_time` varchar(50) DEFAULT NULL,
  `extra_work` varchar(50) DEFAULT NULL,
  `extra_method` varchar(50) DEFAULT NULL,
  `save_to_denno_flag` int(11) NOT NULL DEFAULT '0',
  `customer_id` int(11) NOT NULL,
  `memo1` varchar(255) DEFAULT NULL,
  `memo2` varchar(255) DEFAULT NULL,
  `district_code` varchar(8) DEFAULT NULL,
  `abbreviation` varchar(16) DEFAULT NULL,
  `furigana` varchar(20) DEFAULT NULL,
  `abbr_furigana` varchar(8) DEFAULT NULL,
  `postal_code` varchar(12) DEFAULT NULL,
  `delivery_address2` varchar(40) DEFAULT NULL,
  `extension` varchar(3) DEFAULT NULL,
  `time_permission` int(11) DEFAULT NULL,
  `default_flag` int(11) NOT NULL DEFAULT '0',
  `denno_partner_code` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_sfr_sf_customer_address_sfr_sf_customer1_idx` (`customer_id`),
  CONSTRAINT `fk_sfr_sf_customer_address_sfr_sf_customer1` FOREIGN KEY (`customer_id`) REFERENCES `sfr_sf_customer` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=27019 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sfr_sf_user
-- ----------------------------
DROP TABLE IF EXISTS `sfr_sf_user`;
CREATE TABLE `sfr_sf_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_user` int(11) DEFAULT NULL,
  `updated_user` int(11) DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `enable_flag` int(11) NOT NULL DEFAULT '0',
  `role` varchar(1) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `delete_flag` int(11) NOT NULL DEFAULT '0',
  `department_id` int(11) DEFAULT NULL,
  `user_code` varchar(20) DEFAULT NULL,
  `department_code` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_sfr_sf_user_sfr_sf_department1_idx` (`department_id`),
  CONSTRAINT `fk_sfr_sf_user_sfr_sf_department1` FOREIGN KEY (`department_id`) REFERENCES `sfr_sf_department` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=279 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sfr_sf_user_password_recover
-- ----------------------------
DROP TABLE IF EXISTS `sfr_sf_user_password_recover`;
CREATE TABLE `sfr_sf_user_password_recover` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token_key` varchar(128) NOT NULL,
  `expired_date` datetime NOT NULL,
  `used_flag` int(11) NOT NULL DEFAULT '0',
  `updated_user` int(11) DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  `activated_date` datetime DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_user` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `token_UNIQUE` (`token_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Procedure structure for getCustomerData
-- ----------------------------
DROP PROCEDURE IF EXISTS `getCustomerData`;
DELIMITER ;;
CREATE DEFINER=`sefuri_admin`@`%` PROCEDURE `getCustomerData`(IN startDate VARCHAR(20), IN endDate VARCHAR(20), IN agentId INT)
BEGIN
	  SELECT
      YEAR(rvn.invoice_sales_date) year, MONTH(rvn.invoice_sales_date) month, rvn.product_type, cus.id customerId, ROUND(SUM(rvn.sales_amount)/1000), COUNT(DISTINCT rvn.order_code)
    FROM
      `sfr_sf_revenue` rvn
      INNER JOIN `sfr_sf_department` dpt ON rvn.department_code = dpt.department_code
      INNER JOIN `sfr_sf_customer` cus ON rvn.denno_customer_code = cus.customer_code
    WHERE
      (DATE(rvn.invoice_sales_date) BETWEEN DATE(startDate) AND DATE(endDate))
    AND dpt.id = agentId
    AND rvn.product_type is not null
    GROUP BY year, month, product_type, cus.id;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for getSaleData
-- ----------------------------
DROP PROCEDURE IF EXISTS `getSaleData`;
DELIMITER ;;
CREATE DEFINER=`sefuri_admin`@`%` PROCEDURE `getSaleData`(IN startDate VARCHAR(20), IN endDate VARCHAR(20), IN agentId INT)
BEGIN
	SELECT year, month, product_type, SUM(sales_amount)
  FROM (
   SELECT YEAR(vn.invoice_sales_date) year, MONTH(vn.invoice_sales_date) month, vn.product_type product_type, ROUND(SUM(vn.sales_amount)/1000) sales_amount
   FROM `sfr_sf_revenue` vn INNER JOIN `sfr_sf_department` dpt ON vn.department_code = dpt.department_code
   WHERE (DATE(vn.invoice_sales_date) BETWEEN  DATE(startDate) AND DATE(endDate))
    AND dpt.id = agentId
    and vn.product_type is not null
   GROUP BY year, month, vn.product_type, vn.denno_customer_code
   ) tmp
  GROUP BY year, month, product_type;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for PROC_SF0050301
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_SF0050301`;
DELIMITER ;;
CREATE DEFINER=`sefuri_admin`@`%` PROCEDURE `PROC_SF0050301`(
	IN startDate VARCHAR (20),
	IN endDate VARCHAR (20),
	IN agentId INT
)
BEGIN
	SELECT
		YEAR,
		MONTH,
		product_type,
		SUM(sales_amount)
	FROM
		(
			SELECT
				YEAR (vn.invoice_sales_date) YEAR,
				MONTH (vn.invoice_sales_date) MONTH,
				vn.product_type product_type,
				ROUND(SUM(vn.sales_amount) / 1000) sales_amount
			FROM
				`sfr_sf_revenue` vn
			INNER JOIN `sfr_sf_department` dpt ON vn.department_code = dpt.department_code
			WHERE
				(
					DATE(vn.invoice_sales_date) BETWEEN DATE(startDate)
					AND DATE(endDate)
				)
			AND dpt.id = agentId
			AND vn.product_type IS NOT NULL
			GROUP BY
				YEAR,
				MONTH,
				vn.product_type,
				vn.denno_customer_code
		) tmp
	GROUP BY
		YEAR,
		MONTH,
		product_type;


END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for PROC_SF0050302
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_SF0050302`;
DELIMITER ;;
CREATE DEFINER=`sefuri_admin`@`%` PROCEDURE `PROC_SF0050302`(
	IN startDate VARCHAR (20),
	IN endDate VARCHAR (20),
	IN agentId INT
)
BEGIN
	SELECT
		YEAR (rvn.invoice_sales_date) YEAR,
		MONTH (rvn.invoice_sales_date) MONTH,
		rvn.product_type,
		cus.id customerId,
		ROUND(SUM(rvn.sales_amount) / 1000),
		COUNT(DISTINCT rvn.order_code)
	FROM
		`sfr_sf_revenue` rvn
	INNER JOIN `sfr_sf_department` dpt ON rvn.department_code = dpt.department_code
	INNER JOIN `sfr_sf_customer` cus ON rvn.denno_customer_code = cus.customer_code
	WHERE
		(
			DATE(rvn.invoice_sales_date) BETWEEN DATE(startDate)
			AND DATE(endDate)
		)
	AND dpt.id = agentId
	AND rvn.product_type IS NOT NULL
	GROUP BY
		YEAR,
		MONTH,
		product_type,
		cus.id;


END
;;
DELIMITER ;
