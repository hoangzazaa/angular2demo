-- -*- SQL -*-
-- 案件にリピート元案件の ID 列を記入

BEGIN;

-- テンポラリテーブル作成
DROP TEMPORARY TABLE _target_product;
CREATE TEMPORARY TABLE _target_product (
    id INT PRIMARY KEY COMMENT '商品ID',
    min_deal_id INT NOT NULL COMMENT '最小案件 ID'
);


-- 製品が 1 件の案件のみ、各製品に対応する最小案件 ID (=元案件) を集計する
INSERT INTO _target_product (id, min_deal_id)
SELECT p.id, MIN(d.id) AS min_deal_id
  FROM sfr_sf_deal d
      INNER JOIN sfr_sf_deal_product dp
          ON d.id = dp.deal_id
      INNER JOIN (
          -- 製品が 1 件のみの案件の商品
          SELECT DISTINCT MIN(p.id) AS id
            FROM sfr_sf_deal d
              INNER JOIN sfr_sf_deal_product dp
                  ON d.id = dp.deal_id
              INNER JOIN sfr_sf_product p
                  ON dp.product_id = p.id
              GROUP BY d.id
              HAVING COUNT(p.id) = 1
                 ) p
          ON dp.product_id = p.id
  GROUP BY p.id;


-- リピート案件記入プレビュー
/*
SELECT -- 案件 ID
       d.id AS deal_id,
       -- 案件コード
       d.deal_code,
       -- 案件名
       d.deal_name,
       -- 得意先 ID
       c.id AS customer_id,
       -- 得意先コード
       c.customer_code,
       -- 得意先名
       c.name AS customer_name,
       -- 営業担当 ID
       u.id AS sales_user_id,
       -- 営業担当コード
       u.user_code AS sales_user_code,
       -- 営業担当名
       u.username AS sales_user_name,
       -- 案件ステータス 1: 仕掛中, 2: 設計依頼中, 3: 設計完了, 4: 受注確定, 5: 出荷待ち, 6: 一部出荷待ち, 7: 出荷済
       d.deal_status,
       -- 製品 ID
       p.id AS product_id,
       -- 製品コード
       p.product_code,
       -- 製品名
       p.product_name,
       -- リピート元案件 ID
       CASE WHEN d.id <> t.min_deal_id THEN min_deal_id END AS original_deal_id
  FROM sfr_sf_deal d
      INNER JOIN sfr_sf_deal_product dp
          ON d.id = dp.deal_id
      INNER JOIN sfr_sf_product p
          ON dp.product_id = p.id
      LEFT JOIN sfr_sf_user u
          ON d.sales_id = u.id
      LEFT JOIN sfr_sf_customer c
          ON d.customer_id = c.id
      INNER JOIN _target_product t
          ON p.id = t.id
  ORDER BY COALESCE(original_deal_id, deal_id), deal_id;
*/

-- リピート案件記入
UPDATE sfr_sf_deal d
      INNER JOIN sfr_sf_deal_product dp
          ON d.id = dp.deal_id
      INNER JOIN sfr_sf_product p
          ON dp.product_id = p.id
      INNER JOIN _target_product t
          ON p.id = t.id
   SET d.source_deal_id = CASE WHEN d.id <> t.min_deal_id THEN min_deal_id END;


-- テンポラリテーブル削除
DROP TEMPORARY TABLE _target_product;

COMMIT;
