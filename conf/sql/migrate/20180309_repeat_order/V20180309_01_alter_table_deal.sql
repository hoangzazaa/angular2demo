-- -*- SQL -*-
-- 案件にリピート元案件の ID 列を追加

-- sfr_sf_deal に source_deal_id 列を追加
ALTER TABLE sfr_sf_deal
  ADD COLUMN source_deal_id INT COMMENT '元案件 ID (NULL: リピート案件ではない) (FK:sfr_sf_deal.id)',
  ADD CONSTRAINT sfr_sf_deal_ibfk_2
        FOREIGN KEY fk_sfr_sf_deal_source_deal_id (source_deal_id)
            REFERENCES sfr_sf_deal (id);

/**
-- ROLLBACK
UPDATE sfr_sf_deal SET source_deal_id = NULL;

ALTER TABLE sfr_sf_deal
  DROP FOREIGN KEY sfr_sf_deal_ibfk_2,
  DROP COLUMN source_deal_id;
*/
