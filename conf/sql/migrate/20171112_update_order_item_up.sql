ALTER TABLE sfr_sf_order_item
  ADD COLUMN order_code2 VARCHAR(40) DEFAULT NULL AFTER order_code;