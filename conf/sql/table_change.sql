-- ----------------------------
-- Add 'highlight_flag' into sfr_sf_product_file table
-- Date: 25-Mar-17
-- Related issue: http://fridaynight.vnext.vn/issues/1395
-- ----------------------------
ALTER TABLE sfr_sf_product_file
  ADD COLUMN highlight_flag INT(1) DEFAULT 0;

-- ----------------------------
-- Add 'memo3' into sfr_sf_product table and change maxlength of memo1, memo2 to VARCHAR (60).
-- Add 'request_design_flag,request_production_flag' and set default value is 0
-- Rename column 'film_number' to 'film_code' and change data from int to string
-- Date: 15-Apr-17
-- Related issue: http://fridaynight.vnext.vn/issues/1888
-- ----------------------------
ALTER TABLE sfr_sf_product
  CHANGE film_number film_code VARCHAR(40) DEFAULT NULL,
  MODIFY COLUMN memo1 VARCHAR(60) DEFAULT NULL,
  MODIFY COLUMN memo2 VARCHAR(60) DEFAULT NULL,
  ADD COLUMN memo3 VARCHAR(60) DEFAULT NULL,
  ADD COLUMN request_design_flag INT(11) DEFAULT 0,
  ADD COLUMN request_production_flag INT(11) DEFAULT 0;

-- ----------------------------
-- Alter table sfr_sf_shipping_destination to add columns 'dept_name, saler_name, form_name_id' and modify column 'available_vehicle_size'
-- Date: 13-Apr-17
-- Related module: SF003-07
-- ----------------------------
ALTER TABLE sfr_sf_shipping_destination
  ADD COLUMN dept_name VARCHAR(30) DEFAULT NULL,
  ADD COLUMN saler_name VARCHAR(30) DEFAULT NULL,
  ADD COLUMN form_name_id INT(11) DEFAULT NULL,
  MODIFY COLUMN available_vehicle_size INT(11) DEFAULT NULL;

-- ----------------------------
-- Add 'wooden_status,item_code,worker_code,no' into sfr_sf_mst_wooden table
-- Date: 17-Apr-17
-- ----------------------------
ALTER TABLE sfr_sf_mst_wooden ADD COLUMN wooden_status VARCHAR(8) DEFAULT NULL;
ALTER TABLE sfr_sf_mst_wooden ADD COLUMN item_code VARCHAR(20) DEFAULT NULL;
ALTER TABLE sfr_sf_mst_wooden ADD COLUMN worker_code VARCHAR(6) DEFAULT NULL;
ALTER TABLE sfr_sf_mst_wooden ADD COLUMN no INT(11) DEFAULT NULL;


-- Task 2007
ALTER TABLE sfr_sf_product
ADD gluing_part decimal(11,0);
commit;

ALTER TABLE sfr_sf_mst_shape
ADD gluing_part decimal(11,0);
commit;
-- Update product table: shape_id change from 16 -> 98
update sfr_sf_product set shape_id = 98 where shape_id = 16;
commit;

-- Update sfr_sf_mst_shape master data
SET FOREIGN_KEY_CHECKS = 0;
-- DELETE old master file records
DELETE FROM sfr_sf_mst_shape WHERE id IN (1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16);
commit;
-- DELETE old fileID with fileId = 16
DELETE FROM sfr_sf_file WHERE id = 16;
commit;
INSERT INTO `sfr_sf_file` VALUES (16, 1, 1, '2017-2-28 09:54:32', '2017-2-28 09:54:32', 'shape16', '/assets/img/formats/SF008_format16.png', 'png');
commit;
-- INSERT new master data
INSERT INTO `sfr_sf_mst_shape` (`id`, `updated_date`, `created_date`, `updated_user`, `created_user`, `name`, `note`, `width`, `height`, `depth`, `flap`, `insertion`, `grain`, `development_width`, `development_height`, `min_width`, `max_width`, `min_height`, `max_height`, `min_depth`, `max_depth`, `file_id`, `gluing_part`) VALUES (1, '2017-2-20 16:00:56', '2017-2-20 16:00:56', 1, 1, '胴貼り（底ワンタッチ：蓋１面）', '使用頻度No.1☆作業性・底強度に優れた標準カートン。内箱や価格重視に使用', 80.0, 100.0, 70.0, 30, 20, 0, 314.0, 236.0, 25.0, NULL, 50.0, 350.0, 25.0, NULL, 1, 15);
INSERT INTO `sfr_sf_mst_shape` (`id`, `updated_date`, `created_date`, `updated_user`, `created_user`, `name`, `note`, `width`, `height`, `depth`, `flap`, `insertion`, `grain`, `development_width`, `development_height`, `min_width`, `max_width`, `min_height`, `max_height`, `min_depth`, `max_depth`, `file_id`, `gluing_part`) VALUES (2, '2017-2-20 16:00:56', '2017-2-20 16:00:56', 1, 1, '胴貼り（底ワンタッチ：蓋３面）', '使用頻度No.1☆作業性・底強度に優れた標準カートン。主に商品（個箱）に使用。正面が第三面の場合、糊代のエッジが見えず全ての角を綺麗に見せられる。', 80.0, 100.0, 70.0, 30, 20, 0, 236.0, 314.0, 25.0, NULL, 50.0, 350.0, 25.0, NULL, 2, 15);
INSERT INTO `sfr_sf_mst_shape` (`id`, `updated_date`, `created_date`, `updated_user`, `created_user`, `name`, `note`, `width`, `height`, `depth`, `flap`, `insertion`, `grain`, `development_width`, `development_height`, `min_width`, `max_width`, `min_height`, `max_height`, `min_depth`, `max_depth`, `file_id`, `gluing_part`) VALUES (3, '2017-2-20 16:00:56', '2017-2-20 16:00:56', 1, 1, '胴貼り（底ワンタッチ：蓋１面・蓋３面）', '使用頻度No.1☆作業性・底強度に優れた標準カートン。', 202.0, 105.0, 138.0, 69, 37, 0, 698.0, 301.0, 25.0, NULL, 50.0, 350.0, 25.0, NULL, 16, 18);
INSERT INTO `sfr_sf_mst_shape` (`id`, `updated_date`, `created_date`, `updated_user`, `created_user`, `name`, `note`, `width`, `height`, `depth`, `flap`, `insertion`, `grain`, `development_width`, `development_height`, `min_width`, `max_width`, `min_height`, `max_height`, `min_depth`, `max_depth`, `file_id`, `gluing_part`) VALUES (4, '2017-2-20 16:00:56', '2017-2-20 16:00:56', 1, 1, '胴貼り（底差し込み：蓋１面）', '底ワンタッチよりも安価にしたい場合に使用。また、底ワンタッチが貼れない場合に。内箱や価格重視に使用', 80.0, 100.0, 70.0, 30, 20, 0, 314.0, 239.0, 25.0, NULL, 50.0, 350.0, 25.0, NULL, 3, 15);
INSERT INTO `sfr_sf_mst_shape` (`id`, `updated_date`, `created_date`, `updated_user`, `created_user`, `name`, `note`, `width`, `height`, `depth`, `flap`, `insertion`, `grain`, `development_width`, `development_height`, `min_width`, `max_width`, `min_height`, `max_height`, `min_depth`, `max_depth`, `file_id`, `gluing_part`) VALUES (5, '2017-2-20 16:00:56', '2017-2-20 16:00:56', 1, 1, '胴貼り（底差し込み：蓋３面）', '底ワンタッチよりも安価にしたい場合に使用。\nまた、底ワンタッチが貼れない場合に。主に商品（個箱）に使用。正面が第三面の場合、糊代のエッジが見えず全ての角を綺麗に見せられる。\n底ワンタッチよりも安価にしたい場合に使用。\nまた、底ワンタッチが貼れない場合に。主に商品（個箱）に使用。正面が第三面の場合、糊代のエッジが見えず全ての角を綺麗に見せられる。\n', 80.0, 100.0, 70.0, 30, 20, 0, 314.0, 239.0, 25.0, NULL, 50.0, 350.0, 25.0, NULL, 4, 15);
INSERT INTO `sfr_sf_mst_shape` (`id`, `updated_date`, `created_date`, `updated_user`, `created_user`, `name`, `note`, `width`, `height`, `depth`, `flap`, `insertion`, `grain`, `development_width`, `development_height`, `min_width`, `max_width`, `min_height`, `max_height`, `min_depth`, `max_depth`, `file_id`, `gluing_part`) VALUES (6, '2017-2-20 16:00:56', '2017-2-20 16:00:56', 1, 1, '胴貼り（キャラメル：蓋１面）', '底面をフラッにしたい場合に。中身が軽い場合。底ワンタッチが貼れない場合に。内箱や価格重視に使用。', 80.0, 100.0, 70.0, 30, 20, 0, 314.0, 280.0, 25.0, NULL, 50.0, 350.0, 25.0, NULL, 5, 15);
INSERT INTO `sfr_sf_mst_shape` (`id`, `updated_date`, `created_date`, `updated_user`, `created_user`, `name`, `note`, `width`, `height`, `depth`, `flap`, `insertion`, `grain`, `development_width`, `development_height`, `min_width`, `max_width`, `min_height`, `max_height`, `min_depth`, `max_depth`, `file_id`, `gluing_part`) VALUES (7, '2017-2-15 15:37:30', '2017-2-15 15:37:30', 1, 1, '胴貼り（キャラメル：蓋３面）', '底面をフラッにしたい場合に。中身が軽い場合。底ワンタッチが貼れない場合に。主に商品（個箱）に使用。正面が第三面の場合、糊代のエッジが見えず全ての角を綺麗に見せられる。', 80.0, 100.0, 70.0, 30, 20, 0, 314.0, 280.0, 25.0, NULL, 50.0, 350.0, 25.0, NULL, 6, 15);
INSERT INTO `sfr_sf_mst_shape` (`id`, `updated_date`, `created_date`, `updated_user`, `created_user`, `name`, `note`, `width`, `height`, `depth`, `flap`, `insertion`, `grain`, `development_width`, `development_height`, `min_width`, `max_width`, `min_height`, `max_height`, `min_depth`, `max_depth`, `file_id`, `gluing_part`) VALUES (8, '2017-2-20 16:00:56', '2017-2-20 16:00:56', 1, 1, '胴貼り（キャラメル：蓋１・３面）', '底面をフラッにしたい場合に。中身が軽い場合。底ワンタッチが貼れない場合に。面付け効率を良くしたい場合に。', 80.0, 100.0, 70.0, 30, 20, 0, 314.0, 280.0, 25.0, NULL, 50.0, 350.0, 25.0, NULL, 7, 15);
INSERT INTO `sfr_sf_mst_shape` (`id`, `updated_date`, `created_date`, `updated_user`, `created_user`, `name`, `note`, `width`, `height`, `depth`, `flap`, `insertion`, `grain`, `development_width`, `development_height`, `min_width`, `max_width`, `min_height`, `max_height`, `min_depth`, `max_depth`, `file_id`, `gluing_part`) VALUES (9, '2017-2-20 16:00:56', '2017-2-20 16:00:56', 1, 1, '組み立て（TN式）', '貼りナシ。蓋身一体型。箱の比率が平らな場合に最適。底面がフラットなので底抜け強度が強く、組み立ても簡単。\n組み立て後は全ての面がフラットになるためデザインも良く見せることができる。\n', 120.0, 35.0, 150.0, 30, 20, 0, 366.0, 278.0, NULL, NULL, 20.0, NULL, NULL, NULL, 8, 15);
INSERT INTO `sfr_sf_mst_shape` (`id`, `updated_date`, `created_date`, `updated_user`, `created_user`, `name`, `note`, `width`, `height`, `depth`, `flap`, `insertion`, `grain`, `development_width`, `development_height`, `min_width`, `max_width`, `min_height`, `max_height`, `min_depth`, `max_depth`, `file_id`, `gluing_part`) VALUES (10, '2017-2-20 16:00:56', '2017-2-20 16:00:56', 1, 1, '蓋身（貼りナシ・縁ナシ・フラップ２本）', '蓋と身が分かれた２ピースタイプ。贈答用（蓋）などに最適。箱の比率が平らな場合に最適。底面がフラットなので底抜け強度が強く、組み立ても簡単。', 150.0, 35.0, 120.0, 0, 15, 0, 318.0, 288.0, NULL, NULL, NULL, NULL, NULL, NULL, 9, NULL);
INSERT INTO `sfr_sf_mst_shape` (`id`, `updated_date`, `created_date`, `updated_user`, `created_user`, `name`, `note`, `width`, `height`, `depth`, `flap`, `insertion`, `grain`, `development_width`, `development_height`, `min_width`, `max_width`, `min_height`, `max_height`, `min_depth`, `max_depth`, `file_id`, `gluing_part`) VALUES (11, '2017-2-20 16:00:56', '2017-2-20 16:00:56', 1, 1, '蓋身（貼りナシ・縁ナシ・フラップ三角）', '蓋と身が分かれた２ピースタイプ。贈答用（蓋）などに最適。箱の比率が平らな場合に最適。底面がフラットなので底抜け強度が強く、組み立ても簡単。\n組み立て後は全ての面がフラットになるためデザインも良く見せることができる。三角フラップなので紙のエッジが見えない\n', 150.0, 35.0, 120.0, 0, 15, 0, 318.0, 288.0, NULL, NULL, 25.0, NULL, NULL, NULL, 10, NULL);
INSERT INTO `sfr_sf_mst_shape` (`id`, `updated_date`, `created_date`, `updated_user`, `created_user`, `name`, `note`, `width`, `height`, `depth`, `flap`, `insertion`, `grain`, `development_width`, `development_height`, `min_width`, `max_width`, `min_height`, `max_height`, `min_depth`, `max_depth`, `file_id`, `gluing_part`) VALUES (12, '2017-2-20 16:00:56', '2017-2-20 16:00:56', 1, 1, '蓋身（貼りナシ・縁アリ・フラップ三角）', '蓋と身が分かれた２ピースタイプ。贈答用（身）などに最適。額があるので高級感UP。箱の比率が平らな場合に最適。底面がフラットなので底抜け強度が強く、組み立ても簡単。組み立て後は全ての面がフラットになるためデザインも良く見せることができる。三角フラップなので紙のエッジが見えない', 150.0, 35.0, 120.0, 0, 15, 0, 328.0, 296.0, NULL, NULL, 25.0, NULL, NULL, NULL, 11, NULL);
INSERT INTO `sfr_sf_mst_shape` (`id`, `updated_date`, `created_date`, `updated_user`, `created_user`, `name`, `note`, `width`, `height`, `depth`, `flap`, `insertion`, `grain`, `development_width`, `development_height`, `min_width`, `max_width`, `min_height`, `max_height`, `min_depth`, `max_depth`, `file_id`, `gluing_part`) VALUES (13, '2017-2-20 16:00:56', '2017-2-20 16:00:56', 1, 1, '蓋身（貼りアリ・縁ナシ・サイド貼り）', '蓋と身が分かれた２ピースタイプ。贈答用（蓋）などに最適。両サイドが内側に折り曲げられて貼られているため、作業性がよい。組み立て後は全ての面がフラットになるためデザインも良く見せることができる。三角フラップなので紙のエッジが見えない', 150.0, 35.0, 120.0, 0, 15, 0, 330.0, 260.0, NULL, NULL, 27.0, NULL, NULL, NULL, 12, NULL);
INSERT INTO `sfr_sf_mst_shape` (`id`, `updated_date`, `created_date`, `updated_user`, `created_user`, `name`, `note`, `width`, `height`, `depth`, `flap`, `insertion`, `grain`, `development_width`, `development_height`, `min_width`, `max_width`, `min_height`, `max_height`, `min_depth`, `max_depth`, `file_id`, `gluing_part`) VALUES (14, '2017-2-20 16:00:56', '2017-2-20 16:00:56', 1, 1, '蓋付き４コーナー貼り（内・内）', 'TN式よりも作業性を良くしたい場合。納品サイズをコンパクトにしたい場合に。納品時、内側に倒れている側面を起こしてフラップを折り曲げるだけで自立します。両サイド以外はフラットなのでデザインを良く見せることができます。', 150.0, 35.0, 120.0, 35, 20, 0, 330.0, 260.0, NULL, NULL, NULL, NULL, NULL, NULL, 13, NULL);
INSERT INTO `sfr_sf_mst_shape` (`id`, `updated_date`, `created_date`, `updated_user`, `created_user`, `name`, `note`, `width`, `height`, `depth`, `flap`, `insertion`, `grain`, `development_width`, `development_height`, `min_width`, `max_width`, `min_height`, `max_height`, `min_depth`, `max_depth`, `file_id`, `gluing_part`) VALUES (15, '2017-2-20 16:00:56', '2017-2-20 16:00:56', 1, 1, '蓋付き４コーナー貼り（内・外）', 'TN式よりも作業性を良くしたい場合。納品サイズをコンパクトにしたい場合に。納品時、内側に倒れている側面を起こしてフラップを折り曲げ自立します。、正面は外側に倒れているため内側へ折り曲げ起こす必要があります。両サイド以外はフラットなのでデザインを良く見せることができます。', 150.0, 35.0, 120.0, 25, 20, 0, 330.0, 260.0, NULL, NULL, NULL, NULL, NULL, NULL, 14, NULL);
INSERT INTO `sfr_sf_mst_shape` (`id`, `updated_date`, `created_date`, `updated_user`, `created_user`, `name`, `note`, `width`, `height`, `depth`, `flap`, `insertion`, `grain`, `development_width`, `development_height`, `min_width`, `max_width`, `min_height`, `max_height`, `min_depth`, `max_depth`, `file_id`, `gluing_part`) VALUES (16, '2017-2-20 16:00:56', '2017-2-20 16:00:56', 1, 1, '蓋ナシ４コーナー貼り（内・内）', '作業性重視。納品時、内側に倒れている側面を起こすとてフラップが突っ張り自立します。両サイド以外はフラットなのでデザインを良く見せることができます。蓋・身に使用', 150.0, 35.0, 120.0, 0, 0, 0, 220.0, 190.0, NULL, NULL, NULL, NULL, NULL, NULL, 15, NULL);
commit;
SET FOREIGN_KEY_CHECKS = 1;

-- Task 2005 Update
ALTER TABLE sfr_sf_product MODIFY COLUMN flap DECIMAL(10, 1);
ALTER TABLE sfr_sf_product MODIFY COLUMN insertion DECIMAL(10, 1);

ALTER TABLE sfr_sf_mst_shape MODIFY COLUMN flap DECIMAL(10, 1);
ALTER TABLE sfr_sf_mst_shape MODIFY COLUMN insertion DECIMAL(10, 1);

-- Expand width + height in sheetsize table

ALTER TABLE sfr_sf_mst_sheet_size MODIFY COLUMN width DECIMAL(10, 1);
ALTER TABLE sfr_sf_mst_sheet_size MODIFY COLUMN height DECIMAL(10, 1);

SET FOREIGN_KEY_CHECKS = 0;
DELETE  from sfr_sf_mst_sheet_size;
commit;
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (1, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', 'L半才', 800.0, 550.0, 0, 0, 1);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (357, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', 'L３才', 800.0, 365.0, 0, 0, 1);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (713, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', 'L４才', 400.0, 550.0, 0, 0, 1);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (1069, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', 'L６才', 400.0, 366.0, 0, 0, 1);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (1425, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', 'K全才', 650.0, 950.0, 0, 0, 1);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (1781, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', 'K半才', 650.0, 475.0, 0, 0, 1);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (2137, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', 'K３才', 650.0, 316.0, 0, 0, 1);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (2493, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', 'K全才', 950.0, 650.0, 1, 0, 1);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (2849, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', 'K半才', 475.0, 650.0, 1, 0, 1);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3205, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', 'K３才', 316.0, 650.0, 1, 0, 1);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3206, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 500.0, 750.0, 1, 116, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3207, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 500.0, 800.0, 1, 116, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3208, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 500.0, 900.0, 1, 116, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3209, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 560.0, 660.0, 1, 116, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3210, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 550.0, 750.0, 1, 116, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3211, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 550.0, 800.0, 1, 116, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3212, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 550.0, 850.0, 1, 116, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3213, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 550.0, 920.0, 1, 116, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3214, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 560.0, 950.0, 1, 116, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3215, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 600.0, 800.0, 1, 116, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3216, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 600.0, 850.0, 1, 116, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3217, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 600.0, 950.0, 1, 116, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3218, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 610.0, 770.0, 1, 116, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3219, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 610.0, 970.0, 1, 116, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3220, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 630.0, 780.0, 1, 116, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3221, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 650.0, 750.0, 1, 116, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3222, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 650.0, 800.0, 1, 116, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3223, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 650.0, 850.0, 1, 116, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3224, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 650.0, 900.0, 1, 116, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3225, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 650.0, 950.0, 1, 116, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3226, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 660.0, 990.0, 1, 116, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3227, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 670.0, 830.0, 1, 116, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3228, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 670.0, 880.0, 1, 116, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3229, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 700.0, 750.0, 1, 116, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3230, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 700.0, 900.0, 1, 116, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3231, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 700.0, 950.0, 1, 116, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3232, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 750.0, 1000.0, 1, 116, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3233, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 800.0, 550.0, 1, 116, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3234, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 800.0, 650.0, 1, 116, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3235, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 800.0, 1100.0, 1, 116, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3236, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 950.0, 650.0, 1, 116, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3237, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 970.0, 610.0, 1, 116, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3238, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 500.0, 700.0, 1, 117, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3239, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 500.0, 750.0, 1, 117, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3240, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 500.0, 800.0, 1, 117, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3241, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 500.0, 900.0, 1, 117, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3242, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 560.0, 650.0, 1, 117, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3243, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 550.0, 750.0, 1, 117, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3244, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 550.0, 800.0, 1, 117, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3245, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 550.0, 850.0, 1, 117, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3246, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 550.0, 900.0, 1, 117, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3247, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 550.0, 920.0, 1, 117, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3248, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 560.0, 950.0, 1, 117, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3249, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 600.0, 700.0, 1, 117, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3250, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 600.0, 800.0, 1, 117, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3251, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 600.0, 850.0, 1, 117, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3252, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 600.0, 900.0, 1, 117, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3253, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 600.0, 950.0, 1, 117, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3254, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 610.0, 770.0, 1, 117, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3255, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 610.0, 970.0, 1, 117, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3256, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 620.0, 720.0, 1, 117, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3257, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 650.0, 750.0, 1, 117, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3258, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 650.0, 800.0, 1, 117, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3259, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 650.0, 850.0, 1, 117, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3260, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 650.0, 900.0, 1, 117, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3261, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 650.0, 950.0, 1, 117, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3262, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 670.0, 830.0, 1, 117, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3263, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 700.0, 750.0, 1, 117, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3264, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 700.0, 900.0, 1, 117, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3265, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 700.0, 950.0, 1, 117, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3266, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 750.0, 900.0, 1, 117, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3267, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 750.0, 1000.0, 1, 117, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3268, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 800.0, 550.0, 1, 117, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3269, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 800.0, 650.0, 1, 117, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3270, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 800.0, 750.0, 1, 117, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3271, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 800.0, 900.0, 1, 117, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3272, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 800.0, 1100.0, 1, 117, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3273, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 950.0, 650.0, 1, 117, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3274, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 970.0, 610.0, 1, 117, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3275, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 500.0, 650.0, 1, 118, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3276, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 500.0, 750.0, 1, 118, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3277, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 500.0, 800.0, 1, 118, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3278, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 500.0, 900.0, 1, 118, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3279, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 560.0, 650.0, 1, 118, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3280, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 550.0, 750.0, 1, 118, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3281, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 550.0, 800.0, 1, 118, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3282, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 550.0, 850.0, 1, 118, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3283, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 550.0, 900.0, 1, 118, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3284, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 550.0, 920.0, 1, 118, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3285, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 560.0, 950.0, 1, 118, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3286, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 600.0, 700.0, 1, 118, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3287, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 600.0, 800.0, 1, 118, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3288, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 600.0, 850.0, 1, 118, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3289, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 600.0, 900.0, 1, 118, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3290, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 600.0, 950.0, 1, 118, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3291, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 610.0, 770.0, 1, 118, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3292, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 610.0, 970.0, 1, 118, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3293, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 650.0, 750.0, 1, 118, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3294, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 650.0, 800.0, 1, 118, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3295, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 650.0, 850.0, 1, 118, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3296, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 650.0, 900.0, 1, 118, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3297, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 650.0, 950.0, 1, 118, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3298, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 670.0, 830.0, 1, 118, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3299, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 700.0, 750.0, 1, 118, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3300, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 700.0, 800.0, 1, 118, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3301, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 700.0, 900.0, 1, 118, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3302, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 700.0, 950.0, 1, 118, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3303, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 750.0, 900.0, 1, 118, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3304, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 750.0, 1000.0, 1, 118, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3305, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 800.0, 550.0, 1, 118, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3306, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 800.0, 650.0, 1, 118, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3307, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 800.0, 750.0, 1, 118, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3308, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 800.0, 900.0, 1, 118, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3309, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 800.0, 1100.0, 1, 118, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3310, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 950.0, 650.0, 1, 118, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3311, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 970.0, 610.0, 1, 118, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3312, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 560.0, 650.0, 1, 119, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3313, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 550.0, 800.0, 1, 119, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3314, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 650.0, 950.0, 1, 119, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3315, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 750.0, 1000.0, 1, 119, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3316, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 800.0, 550.0, 1, 119, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3317, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 800.0, 1100.0, 1, 119, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3318, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 950.0, 650.0, 1, 119, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3319, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 500.0, 750.0, 1, 318, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3320, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 500.0, 800.0, 1, 318, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3321, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 500.0, 900.0, 1, 318, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3322, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 560.0, 660.0, 1, 318, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3323, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 550.0, 750.0, 1, 318, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3324, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 550.0, 800.0, 1, 318, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3325, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 550.0, 850.0, 1, 318, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3326, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 550.0, 920.0, 1, 318, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3327, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 560.0, 950.0, 1, 318, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3328, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 600.0, 800.0, 1, 318, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3329, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 600.0, 850.0, 1, 318, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3330, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 600.0, 950.0, 1, 318, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3331, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 610.0, 770.0, 1, 318, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3332, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 610.0, 970.0, 1, 318, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3333, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 630.0, 780.0, 1, 318, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3334, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 650.0, 750.0, 1, 318, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3335, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 650.0, 800.0, 1, 318, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3336, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 650.0, 850.0, 1, 318, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3337, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 650.0, 900.0, 1, 318, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3338, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 650.0, 950.0, 1, 318, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3339, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 660.0, 990.0, 1, 318, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3340, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 670.0, 830.0, 1, 318, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3341, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 670.0, 880.0, 1, 318, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3342, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 700.0, 750.0, 1, 318, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3343, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 700.0, 900.0, 1, 318, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3344, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 700.0, 950.0, 1, 318, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3345, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 750.0, 1000.0, 1, 318, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3346, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 800.0, 550.0, 1, 318, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3347, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 800.0, 650.0, 1, 318, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3348, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 800.0, 1100.0, 1, 318, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3349, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 950.0, 650.0, 1, 318, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3350, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 970.0, 610.0, 1, 318, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3351, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 500.0, 700.0, 1, 319, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3352, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 500.0, 750.0, 1, 319, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3353, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 500.0, 800.0, 1, 319, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3354, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 500.0, 900.0, 1, 319, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3355, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 560.0, 650.0, 1, 319, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3356, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 550.0, 750.0, 1, 319, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3357, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 550.0, 800.0, 1, 319, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3358, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 550.0, 850.0, 1, 319, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3359, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 550.0, 900.0, 1, 319, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3360, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 550.0, 920.0, 1, 319, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3361, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 560.0, 950.0, 1, 319, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3362, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 600.0, 700.0, 1, 319, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3363, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 600.0, 800.0, 1, 319, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3364, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 600.0, 850.0, 1, 319, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3365, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 600.0, 900.0, 1, 319, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3366, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 600.0, 950.0, 1, 319, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3367, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 610.0, 770.0, 1, 319, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3368, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 610.0, 970.0, 1, 319, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3369, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 620.0, 720.0, 1, 319, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3370, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 650.0, 750.0, 1, 319, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3371, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 650.0, 800.0, 1, 319, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3372, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 650.0, 850.0, 1, 319, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3373, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 650.0, 900.0, 1, 319, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3374, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 650.0, 950.0, 1, 319, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3375, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 670.0, 830.0, 1, 319, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3376, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 700.0, 750.0, 1, 319, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3377, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 700.0, 900.0, 1, 319, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3378, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 700.0, 950.0, 1, 319, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3379, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 750.0, 900.0, 1, 319, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3380, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 750.0, 1000.0, 1, 319, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3381, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 800.0, 550.0, 1, 319, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3382, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 800.0, 650.0, 1, 319, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3383, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 800.0, 750.0, 1, 319, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3384, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 800.0, 900.0, 1, 319, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3385, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 800.0, 1100.0, 1, 319, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3386, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 950.0, 650.0, 1, 319, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3387, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 970.0, 610.0, 1, 319, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3388, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 500.0, 650.0, 1, 320, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3389, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 500.0, 750.0, 1, 320, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3390, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 500.0, 800.0, 1, 320, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3391, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 500.0, 900.0, 1, 320, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3392, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 560.0, 650.0, 1, 320, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3393, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 550.0, 750.0, 1, 320, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3394, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 550.0, 800.0, 1, 320, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3395, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 550.0, 850.0, 1, 320, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3396, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 550.0, 900.0, 1, 320, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3397, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 550.0, 920.0, 1, 320, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3398, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 560.0, 950.0, 1, 320, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3399, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 600.0, 700.0, 1, 320, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3400, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 600.0, 800.0, 1, 320, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3401, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 600.0, 850.0, 1, 320, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3402, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 600.0, 900.0, 1, 320, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3403, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 600.0, 950.0, 1, 320, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3404, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 610.0, 770.0, 1, 320, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3405, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 610.0, 970.0, 1, 320, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3406, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 650.0, 750.0, 1, 320, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3407, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 650.0, 800.0, 1, 320, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3408, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 650.0, 850.0, 1, 320, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3409, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 650.0, 900.0, 1, 320, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3410, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 650.0, 950.0, 1, 320, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3411, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 670.0, 830.0, 1, 320, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3412, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 700.0, 750.0, 1, 320, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3413, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 700.0, 800.0, 1, 320, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3414, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 700.0, 900.0, 1, 320, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3415, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 700.0, 950.0, 1, 320, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3416, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 750.0, 900.0, 1, 320, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3417, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 750.0, 1000.0, 1, 320, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3418, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 800.0, 550.0, 1, 320, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3419, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 800.0, 650.0, 1, 320, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3420, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 800.0, 750.0, 1, 320, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3421, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 800.0, 900.0, 1, 320, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3422, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 800.0, 1100.0, 1, 320, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3423, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 950.0, 650.0, 1, 320, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3424, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 970.0, 610.0, 1, 320, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3425, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 560.0, 650.0, 1, 321, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3426, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 550.0, 800.0, 1, 321, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3427, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 650.0, 950.0, 1, 321, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3428, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 750.0, 1000.0, 1, 321, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3429, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 800.0, 550.0, 1, 321, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3430, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 800.0, 1100.0, 1, 321, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3431, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 950.0, 650.0, 1, 321, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3432, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 500.0, 750.0, 1, 407, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3433, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 500.0, 800.0, 1, 407, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3434, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 500.0, 900.0, 1, 407, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3435, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 560.0, 660.0, 1, 407, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3436, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 550.0, 750.0, 1, 407, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3437, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 550.0, 800.0, 1, 407, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3438, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 550.0, 920.0, 1, 407, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3439, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 560.0, 950.0, 1, 407, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3440, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 600.0, 950.0, 1, 407, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3441, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 610.0, 970.0, 1, 407, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3442, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 650.0, 800.0, 1, 407, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3443, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 650.0, 950.0, 1, 407, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3444, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 670.0, 830.0, 1, 407, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3445, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 700.0, 900.0, 1, 407, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3446, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 700.0, 950.0, 1, 407, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3447, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 750.0, 1000.0, 1, 407, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3448, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 800.0, 650.0, 1, 407, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3449, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 800.0, 1100.0, 1, 407, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3450, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 950.0, 650.0, 1, 407, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3451, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 970.0, 610.0, 1, 407, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3452, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 550.0, 800.0, 1, 408, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3453, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 650.0, 950.0, 1, 408, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3454, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 800.0, 1100.0, 1, 408, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3455, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 500.0, 750.0, 1, 409, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3456, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 500.0, 800.0, 1, 409, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3457, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 500.0, 900.0, 1, 409, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3458, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 560.0, 660.0, 1, 409, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3459, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 550.0, 750.0, 1, 409, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3460, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 550.0, 800.0, 1, 409, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3461, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 550.0, 920.0, 1, 409, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3462, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 560.0, 950.0, 1, 409, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3463, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 600.0, 950.0, 1, 409, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3464, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 610.0, 970.0, 1, 409, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3465, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 650.0, 800.0, 1, 409, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3466, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 650.0, 950.0, 1, 409, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3467, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 670.0, 830.0, 1, 409, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3468, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 700.0, 900.0, 1, 409, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3469, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 700.0, 950.0, 1, 409, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3470, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 750.0, 1000.0, 1, 409, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3471, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 800.0, 650.0, 1, 409, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3472, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 800.0, 1100.0, 1, 409, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3473, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 950.0, 650.0, 1, 409, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3474, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 970.0, 610.0, 1, 409, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3475, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 550.0, 800.0, 1, 410, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3476, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 650.0, 950.0, 1, 410, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3477, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 800.0, 1100.0, 1, 410, NULL);
INSERT INTO `sfr_sf_mst_paper` VALUES (1474, 8, 8, '2017-1-5 09:29:00', '2017-1-5 09:29:00', 3, 230, 169.0, 1, 2, 1, 1, '1', 2, NULL);
INSERT INTO `sfr_sf_mst_paper` VALUES (1475, 8, 8, '2017-1-5 09:29:00', '2017-1-5 09:29:00', 3, 600, 155.0, 1, 2, 1, 1, '1', 2, NULL);

INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3478, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 800.0, 1100.0, 1, 1474, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` (created_user, updated_user, created_date, updated_date, width, height, grain, paper_id)
					VALUES (0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', 550.0, 800.0, 1, 1475);
					INSERT INTO `sfr_sf_mst_sheet_size` (created_user, updated_user, created_date, updated_date, width, height, grain, paper_id)
					VALUES (0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', 650.0, 950.0, 1, 1475);
					INSERT INTO `sfr_sf_mst_sheet_size` (created_user, updated_user, created_date, updated_date, width, height, grain, paper_id)
					VALUES (0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', 800.0, 1100.0, 1, 1475);
SET FOREIGN_KEY_CHECKS = 1;
commit;

-- Update Customer table picName -> customerContact
update sfr_sf_customer set customer_contact = pic_name;
ALTER TABLE sfr_sf_customer DROP pic_name;
commit;

-- ----------------------------
-- Drop column 'denno_product_code'
-- Date: 26-Apr-17
-- Related issue: N/A
-- ----------------------------
ALTER TABLE sfr_sf_product DROP COLUMN denno_product_code;

-- Update sfr_sf_mst_sheet_size
INSERT INTO `sfr_sf_mst_paper` VALUES (1476, 8, 8, '2017-1-5 09:29:00', '2017-1-5 09:29:00', 3, 230, 169.0, 1, 2, 1, 1, '2', 2, NULL);
INSERT INTO `sfr_sf_mst_paper` VALUES (1477, 8, 8, '2017-1-5 09:29:00', '2017-1-5 09:29:00', 3, 600, 155.0, 1, 2, 1, 1, '2', 2, NULL);

INSERT INTO `sfr_sf_mst_sheet_size` VALUES (3482, 0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', '', 800.0, 1100.0, 1, 1476, NULL);
INSERT INTO `sfr_sf_mst_sheet_size` (created_user, updated_user, created_date, updated_date, width, height, grain, paper_id)
					VALUES (0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', 550.0, 800.0, 1, 1477);
					INSERT INTO `sfr_sf_mst_sheet_size` (created_user, updated_user, created_date, updated_date, width, height, grain, paper_id)
					VALUES (0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', 650.0, 950.0, 1, 1477);
					INSERT INTO `sfr_sf_mst_sheet_size` (created_user, updated_user, created_date, updated_date, width, height, grain, paper_id)
					VALUES (0, 0, '2017-1-5 09:29:00', '2017-1-5 09:29:00', 800.0, 1100.0, 1, 1477);
update sfr_sf_mst_sheet_size set grain = 0 where paper_id != 0;
commit;
-----------------------------
--Update sfr_sf_mst_paper data (Based on data given by Seimiya)
UPDATE sfr_sf_mst_paper SET norm_value = '30.15' WHERE name = 'AKｸﾞﾚｰ' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '36.72' WHERE name = 'B1' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '36.38' WHERE name = 'B2' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '11.56' WHERE name = 'C170ｷｬﾝ' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '29.92' WHERE name = 'C2ｸﾘｰﾑ' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '51.51' WHERE name = 'D20木目' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '38.59' WHERE name = 'G1' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '35.7' WHERE name = 'G2' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '35.36' WHERE name = 'G7' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '77.4' WHERE name = 'Gｸﾘｰﾑ' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '76.5' WHERE name = 'GｺﾞｰﾙﾄﾞE' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '76.5' WHERE name = 'GｼﾙﾊﾞｰE' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '77.4' WHERE name = 'Gﾌﾞﾙｰ' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '41.48' WHERE name = 'JEﾌﾞﾗｯｸ' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '13.5' WHERE name = 'K170' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '93.5' WHERE name = 'KGｸﾘｽﾀﾙ' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '38.76' WHERE name = 'N赤' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '70' WHERE name = 'OFK180' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '70' WHERE name = 'OFK210' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '70' WHERE name = 'OFK280' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '58' WHERE name = 'OND125' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '58' WHERE name = 'OND160' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '35.36' WHERE name = 'OR2' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '32.13' WHERE name = 'OSｸﾘｰﾑ' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '39.44' WHERE name = 'R1' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '39.61' WHERE name = 'R7' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '75.05' WHERE name = 'USﾎﾞｰﾄﾞ茶' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '63.75' WHERE name = 'ｱｰﾄ2552' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '63' WHERE name = 'ｱｰﾊﾞﾝｴﾝｼﾞ' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '78.15' WHERE name = 'あららぎオリーブ' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '66.12' WHERE name = 'あららぎ白茶' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '77.38' WHERE name = 'あららぎ藍' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '52.19' WHERE name = 'アロマ202' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '52.19' WHERE name = 'アロマ203' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '53.21' WHERE name = 'アロマ204' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '53.21' WHERE name = 'アロマ206' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '54.4' WHERE name = 'アロマ209' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '56.44' WHERE name = 'アロマ№1' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '63' WHERE name = 'ｵｰｽﾄｴﾝｼﾞ' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '63' WHERE name = 'ｵｰｽﾄｸﾘｰﾑ' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '34.68' WHERE name = 'ｶﾗｰｸﾘｰﾝ水' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '37.32' WHERE name = 'ｶﾞﾘﾚｵ薄黄' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '58.47' WHERE name = 'きぬもみ薄鼠' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '93.5' WHERE name = 'ｷﾝｸﾞｺﾞｰﾙﾄﾞ' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '85.85' WHERE name = 'ｷﾝｸﾞｼﾙﾊﾞｰ' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '28.05' WHERE name = 'ｸﾗｼｶﾙC' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '40.46' WHERE name = 'ｸﾞﾘｰﾝﾍﾞﾀ' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '50.6' WHERE name = 'ｸﾞﾛｽｺｰﾄ' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '26.64' WHERE name = 'ｺｰﾄ180' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '63' WHERE name = 'ｻﾝｽﾏｳｽ' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '69' WHERE name = 'サンス黒' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '63' WHERE name = 'サンス青鼠' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '63' WHERE name = 'サンス白茶' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '63' WHERE name = 'ｻﾝｽ抹茶' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '37.4' WHERE name = 'ｻﾝﾄﾞｸﾘｰﾑ' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '40.46' WHERE name = 'ｻﾝﾄﾞﾎﾜｲﾄ' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '36.38' WHERE name = 'すずめ' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '77.4' WHERE name = 'チェリー' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '69.47' WHERE name = 'つづれｸﾘｰﾑ' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '69.47' WHERE name = 'つづれとのこ' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '78.53' WHERE name = 'つづれ藍' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '52.92' WHERE name = 'つむぎかれは' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '52.92' WHERE name = 'つむぎこうぞ' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '61.99' WHERE name = 'つむぎ栗' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '38.5' WHERE name = 'ディオ茶' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '51.3' WHERE name = 'ﾆｭｰｸﾞﾘｰﾝ' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '51.3' WHERE name = 'ﾆｭｰﾌﾞﾗｳﾝ' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '56.34' WHERE name = 'ネイビー1' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '56.34' WHERE name = 'ネイビー2' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '56.34' WHERE name = 'ネイビー5' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '54.89' WHERE name = 'ﾊｲﾁｪｯｸｸﾘｰﾑ' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '42' WHERE name = 'ﾋﾟｭｱNｸﾘｰﾑ' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '62.22' WHERE name = 'フシ木目' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '38.76' WHERE name = 'ブラウン' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '36.72' WHERE name = 'ブルー2号' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '48.11' WHERE name = 'ベタ110' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '48.11' WHERE name = 'ベタ110' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '40.46' WHERE name = 'ベタ143金' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '57.6' WHERE name = 'ベタ402' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '61.74' WHERE name = 'ベタ410E' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '63' WHERE name = 'ベタ47' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '63' WHERE name = 'ﾍﾟﾝｼﾙﾌﾞﾛﾝﾄﾞ' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '63' WHERE name = 'ﾍﾟﾝｼﾙ抹茶' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '34.34' WHERE name = 'ﾎｰﾌﾟﾌﾞﾙｰ' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '51.3' WHERE name = 'ﾏｯﾄｴﾝｼﾞ' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '47.55' WHERE name = 'ﾏｯﾄｸﾘｰﾑ' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '50.25' WHERE name = 'ﾏｯﾄこげ茶' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '47.7' WHERE name = 'ﾏｯﾄにぶ桃' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '47.7' WHERE name = 'ﾏｯﾄねずみ' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '47.7' WHERE name = 'ﾏｯﾄﾌﾞﾙｰ' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '46.65' WHERE name = 'ﾏｯﾄﾏｳｽ' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '47.7' WHERE name = 'ﾏｯﾄﾓﾓ' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '49.35' WHERE name = 'ﾏｯﾄらくだ' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '48.45' WHERE name = 'ﾏｯﾄﾛｰｽﾞ' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '52.8' WHERE name = 'ﾏｯﾄ黒' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '51.3' WHERE name = 'ﾏｯﾄ紺' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '49.35' WHERE name = 'マット紫' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '46.65' WHERE name = 'ﾏｯﾄ青鼠' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '51.3' WHERE name = 'ﾏｯﾄ鉄紺' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '47.55' WHERE name = 'ﾏｯﾄ白茶' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '47.7' WHERE name = 'ﾏｯﾄ抹茶' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '47.09' WHERE name = 'マロン' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '54.89' WHERE name = 'ﾚｻﾞｯｸ66ｸﾘｰﾑ' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '54.89' WHERE name = 'ﾚｻﾞｯｸ66ｺｿﾒ' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '76.76' WHERE name = 'ﾚｻﾞｯｸ75黒' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '46.07' WHERE name = 'ﾚｻﾞｯｸ絞り' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '60.96' WHERE name = 'ﾚｻﾞｯｸ木目' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '58.85' WHERE name = 'ろうけつ鼠' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '58.85' WHERE name = 'ろうけつ白' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '58.85' WHERE name = 'ﾛｳｹﾂ白茶' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '58.85' WHERE name = 'ろうけつ肌' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '65.94' WHERE name = 'ろうけつ藍' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '59.88' WHERE name = 'ﾛﾌﾃｨｰ深緑' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '59.88' WHERE name = 'ﾛﾌﾃｨｰ淡茶' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '57.48' WHERE name = 'ﾛﾌﾃｨｰ藤' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '40.12' WHERE name = 'わさび' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '39' WHERE name = '銀糸あずき' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '39' WHERE name = '銀糸鉄紺' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '49.13' WHERE name = '紺波ﾍﾞﾀ' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '35.85' WHERE name = '紫紺' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '42' WHERE name = '吹雪空' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '47.09' WHERE name = '吹雪桜' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '60.84' WHERE name = '赤ﾍﾞﾀｴﾝﾎﾞｽ' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '48.11' WHERE name = '藤ベタ1' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '48.11' WHERE name = '藤ベタ１' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '56.34' WHERE name = '藤ベタ2' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '36.04' WHERE name = '藤ライン' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '39.78' WHERE name = '濃茶' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '16.32' WHERE name = '白170' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '51.51' WHERE name = '白柾№2' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '51.51' WHERE name = '白柾目' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '46.07' WHERE name = '白木目' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '74.9' WHERE name = '平和印' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '78.33' WHERE name = '宝生桐' AND factory_id='1';
UPDATE sfr_sf_mst_paper SET norm_value = '67.66' WHERE name = '本桐' AND factory_id='1';

-- ----------------------------
-- Drop column 'sfr_sf_deal.user_id'
-- Date: 22-May-17
-- Related issue: N/A
-- ----------------------------
ALTER TABLE sfr_sf_deal DROP FOREIGN KEY sfr_sf_deal_ibfk_2;
ALTER TABLE sfr_sf_deal DROP INDEX fk_sfr_sf_deal_sfr_sf_user1_idx;
ALTER TABLE sfr_sf_deal DROP COLUMN user_id;

-- ----------------------------
-- Add 'title' into sfr_sf_quotation table
-- Date: 01-Jun-17
-- Related issue: http://fridaynight.vnext.vn/issues/2333
-- ----------------------------
ALTER TABLE sfr_sf_quotation
  ADD COLUMN title INT(1) DEFAULT 1;
UPDATE sfr_sf_quotation SET title = 1;

-- ----------------------------
-- Add new column 'request_lot' into table 'sfr_sf_product'
-- Date: 28-Jun-17
-- Related issue: http://fridaynight.vnext.vn/issues/2595
-- ----------------------------
ALTER TABLE sfr_sf_product ADD COLUMN request_lot INT(11) DEFAULT NULL;

-- Date: 29-Jun-17
ALTER TABLE sfr_sf_product ADD COLUMN denno INT(1) DEFAULT 0;
