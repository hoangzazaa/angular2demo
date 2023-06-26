-- -*- SQL -*-
-- 得意先カルテ機能 (届け先)

-- 届け先
ALTER TABLE sfr_sf_shipping_destination
  ADD COLUMN
    delivery_company VARCHAR(255) COMMENT '路線会社指定',
  ADD COLUMN
    specify_vehicle INTEGER COMMENT '配送車両指定',
  ADD COLUMN
    specify_vehicle_others VARCHAR(255) COMMENT '配送車両指定(その他)',
  ADD COLUMN
    delivery_time VARCHAR(255) COMMENT '納品時間',
  ADD COLUMN
    tel_before_delivery TINYINT(1) COMMENT '納品前TEL',
  ADD COLUMN
    attachment_ebo TINYINT(1) COMMENT 'エボ添付',
  ADD COLUMN
    delivery_in_case_of_bad_weather TINYINT(1) COMMENT '天候不良時納品',
  ADD COLUMN
    stretch_film TINYINT(1) COMMENT 'ストレッチフィルム巻き',
  ADD COLUMN 
    upstairs TINYINT(1) COMMENT '2F上げ',
  ADD COLUMN 
    upstairs_detail INTEGER COMMENT '2F上げ (有の内容)',
  ADD COLUMN 
    upstairs_detail_others VARCHAR(255) COMMENT '2F上げその他',
  ADD COLUMN
    palette_delivery TINYINT(1) COMMENT 'パレット納品',
  ADD COLUMN
    palette_take_back TINYINT(1) COMMENT 'パレット引取',
  ADD COLUMN
    limit_quantity INTEGER COMMENT '数量制限',
  ADD COLUMN
    unloading_place VARCHAR(255) COMMENT '降ろし場所指定',
  ADD COLUMN
    parking_place VARCHAR(255) COMMENT '車両停車位置',
  ADD COLUMN
    lift_user_in_unloading INTEGER COMMENT '荷降ろし時のリフト使用者',
  ADD COLUMN
    unload_form VARCHAR(255) COMMENT '荷降ろし形態',
  ADD COLUMN
    attention TEXT COMMENT 'その他注意事項';
/*
  TINYINT(1) 項目は全て 1: 有, 0: 無, null: 記入なし

  specify_vehicle
    1     2t未満
    2     2t迄
    3     4t迄
    4     10t可
    9999 その他

  upstairs_detail
    1    昇降機 
    2    階段
    9999 その他

  limit_quantity   sfr_sf_checksheet.question_code=1008 と同じ意味
    1 ◯ / ◯
    2 ◯ / ×
    3 × / ◯
    4 × / ×
    5 ＃ / ◯
    6 ◯ / ＃
    7 ＃ / ×
    8 × / ＃
    9 ＃ / ＃

  lift_user_in_unloading
    1 納品先担当者
    2 配送ドライバー
*/


-- 届け先画像情報
CREATE TABLE sfr_sf_shipping_destination_image (
    id INT PRIMARY KEY AUTO_INCREMENT COMMENT 'ID',
    created_date DATETIME NOT NULL COMMENT '作成日時',
    updated_date DATETIME NOT NULL COMMENT '更新日時',
    created_user INT COMMENT '作成ユーザー ID',
    updated_user INT COMMENT '更新ユーザー ID',
    --
    shipping_destination_id INT NOT NULL COMMENT '届け先 ID (FK: sfr_sf_shipping_destination.id)',
    display_order INT NOT NULL COMMENT '表示順',
    file_id INT NOT NULL COMMENT 'ファイル ID (FK: sfr_sf_file.id)',
    memo TEXT COMMENT 'コメント',
    --
    FOREIGN KEY (shipping_destination_id)
        REFERENCES sfr_sf_shipping_destination (id)
          ON DELETE CASCADE,
    FOREIGN KEY (file_id)
        REFERENCES sfr_sf_file (id)
          ON DELETE CASCADE
) COMMENT '届け先画像情報';


/*
-- ROLLBACK
DROP TABLE sfr_sf_shipping_destination_image;

ALTER TABLE sfr_sf_shipping_destination
  DROP COLUMN attention,
  DROP COLUMN unload_form,
  DROP COLUMN lift_user_in_unloading,
  DROP COLUMN parking_place,
  DROP COLUMN unloading_place,
  DROP COLUMN limit_quantity,
  DROP COLUMN palette_take_back,
  DROP COLUMN palette_delivery,
  DROP COLUMN upstairs_detail_others,
  DROP COLUMN upstairs_detail,
  DROP COLUMN upstairs,
  DROP COLUMN stretch_film,
  DROP COLUMN delivery_in_case_of_bad_weather,
  DROP COLUMN attachment_ebo,
  DROP COLUMN tel_before_delivery,
  DROP COLUMN delivery_time,
  DROP COLUMN specify_vehicle_others,
  DROP COLUMN specify_vehicle,
  DROP COLUMN delivery_company;
*/
