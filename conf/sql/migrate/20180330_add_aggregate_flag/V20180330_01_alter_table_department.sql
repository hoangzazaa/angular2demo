-- -*- SQL -*-
-- 売り上げ集計対象部門フラグ

-- 売り上げ集計対象部門フラグ
ALTER TABLE sfr_sf_department
  ADD COLUMN
  sales_aggregate_flag int COMMENT '売り上げ集計対象部門フラグ';

/*
-- ROLLBACK
ALTER TABLE sfr_sf_department
  DROP COLUMN sales_aggregate_flag;
*/
