-- 兵動さん 熊本→大分
update sfr_sf_user set department_id = '3', department_code = 'EE04' where id = 118;

-- 元生さん 大阪支店長
-- 変更不要

-- 福原さん SPC
update sfr_sf_user set delete_flag = '1', enable_flag = '0' where id = '331';

-- 秋山さん 大分→佐賀4
update sfr_sf_user set department_id = '31', department_code = 'EE11' where id = 170;

-- 南里さん 佐賀4→福岡
update sfr_sf_user set department_id = '2', department_code = 'EE03' where id = 67;

-- 龍さん　佐賀2→熊本
update sfr_sf_user set department_id = '4', department_code = 'EE05' where id = 68;
