-- -*- SQL -*-
-- 得意先カルテ機能 (得意先)

-- 届け先
ALTER TABLE sfr_sf_customer
  ADD COLUMN
    remarks_for_shipping TEXT COMMENT '備考(出荷部門用カルテ)';
-- 注: SELECT * とかされている可能性があるので、一番最後に追加しておきます。


/*
-- ROLLBACK
ALTER TABLE sfr_sf_customer
  DROP COLUMN remarks_for_shipping;
*/
