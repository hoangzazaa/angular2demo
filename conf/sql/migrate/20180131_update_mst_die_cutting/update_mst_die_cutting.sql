-- -------------------------------------------
-- K判・L判半才
-- -------------------------------------------

-- EF(paperboard_type = 2)の場合

update sfr_sf_mst_die_cutting set basic_cost = 17000, through_wage = 0 where paperboard_type = 2 and size = 1 and imposition_number = 1 and through_number = 2;
update sfr_sf_mst_die_cutting set basic_cost = 18000, through_wage = 0 where paperboard_type = 2 and size = 1 and imposition_number between 2 and 3 and through_number = 2;
update sfr_sf_mst_die_cutting set basic_cost = 20000, through_wage = 0 where paperboard_type = 2 and size = 1 and imposition_number between 4 and 5 and through_number = 2;
update sfr_sf_mst_die_cutting set basic_cost = 23000, through_wage = 0 where paperboard_type = 2 and size = 1 and imposition_number between 6 and 7 and through_number = 2;
update sfr_sf_mst_die_cutting set basic_cost = 24000, through_wage = 0 where paperboard_type = 2 and size = 1 and imposition_number between 8 and 9 and through_number = 2;
update sfr_sf_mst_die_cutting set basic_cost = 27000, through_wage = 0 where paperboard_type = 2 and size = 1 and imposition_number = 10 and through_number = 2;
update sfr_sf_mst_die_cutting set basic_cost = 29000, through_wage = 0 where paperboard_type = 2 and size = 1 and imposition_number between 11 and 20 and through_number = 2;
update sfr_sf_mst_die_cutting set basic_cost = 31000, through_wage = 0 where paperboard_type = 2 and size = 1 and imposition_number between 21 and 40 and through_number = 2;


-- GF(paperboard_type = 4)の場合

update sfr_sf_mst_die_cutting set basic_cost = 17000, through_wage = 0 where paperboard_type = 4 and size = 1 and imposition_number = 1 and through_number = 2;
update sfr_sf_mst_die_cutting set basic_cost = 18000, through_wage = 0 where paperboard_type = 4 and size = 1 and imposition_number between 2 and 3 and through_number = 2;
update sfr_sf_mst_die_cutting set basic_cost = 20000, through_wage = 0 where paperboard_type = 4 and size = 1 and imposition_number between 4 and 5 and through_number = 2;
update sfr_sf_mst_die_cutting set basic_cost = 23000, through_wage = 0 where paperboard_type = 4 and size = 1 and imposition_number between 6 and 7 and through_number = 2;
update sfr_sf_mst_die_cutting set basic_cost = 24000, through_wage = 0 where paperboard_type = 4 and size = 1 and imposition_number between 8 and 9 and through_number = 2;
update sfr_sf_mst_die_cutting set basic_cost = 27000, through_wage = 0 where paperboard_type = 4 and size = 1 and imposition_number = 10 and through_number = 2;
update sfr_sf_mst_die_cutting set basic_cost = 29000, through_wage = 0 where paperboard_type = 4 and size = 1 and imposition_number between 11 and 20 and through_number = 2;
update sfr_sf_mst_die_cutting set basic_cost = 31000, through_wage = 0 where paperboard_type = 4 and size = 1 and imposition_number between 21 and 40 and through_number = 2;

-- BF(paperboard_type = 3)の場合

update sfr_sf_mst_die_cutting set basic_cost = 17500, through_wage = 0 where paperboard_type = 3 and size = 1 and imposition_number = 1 and through_number = 2;
update sfr_sf_mst_die_cutting set basic_cost = 19000, through_wage = 0 where paperboard_type = 3 and size = 1 and imposition_number between 2 and 3 and through_number = 2;
update sfr_sf_mst_die_cutting set basic_cost = 21000, through_wage = 0 where paperboard_type = 3 and size = 1 and imposition_number between 4 and 5 and through_number = 2;
update sfr_sf_mst_die_cutting set basic_cost = 23500, through_wage = 0 where paperboard_type = 3 and size = 1 and imposition_number between 6 and 7 and through_number = 2;
update sfr_sf_mst_die_cutting set basic_cost = 25000, through_wage = 0 where paperboard_type = 3 and size = 1 and imposition_number between 8 and 9 and through_number = 2;
update sfr_sf_mst_die_cutting set basic_cost = 28000, through_wage = 0 where paperboard_type = 3 and size = 1 and imposition_number = 10 and through_number = 2;
update sfr_sf_mst_die_cutting set basic_cost = 30000, through_wage = 0 where paperboard_type = 3 and size = 1 and imposition_number between 11 and 20 and through_number = 2;
update sfr_sf_mst_die_cutting set basic_cost = 32000, through_wage = 0 where paperboard_type = 3 and size = 1 and imposition_number between 21 and 40 and through_number = 2;


-- -------------------------------------------
-- L判以上
-- -------------------------------------------

-- EF(paperboard_type = 2)の場合

update sfr_sf_mst_die_cutting set basic_cost = 14500, through_wage = 0 where paperboard_type = 2 and size <> 1 and imposition_number = 1 and through_number = 2;
update sfr_sf_mst_die_cutting set basic_cost = 16000, through_wage = 0 where paperboard_type = 2 and size <> 1 and imposition_number between 2 and 3 and through_number = 2;
update sfr_sf_mst_die_cutting set basic_cost = 18000, through_wage = 0 where paperboard_type = 2 and size <> 1 and imposition_number between 4 and 5 and through_number = 2;
update sfr_sf_mst_die_cutting set basic_cost = 21000, through_wage = 0 where paperboard_type = 2 and size <> 1 and imposition_number between 6 and 7 and through_number = 2;
update sfr_sf_mst_die_cutting set basic_cost = 22000, through_wage = 0 where paperboard_type = 2 and size <> 1 and imposition_number between 8 and 9 and through_number = 2;
update sfr_sf_mst_die_cutting set basic_cost = 24000, through_wage = 0 where paperboard_type = 2 and size <> 1 and imposition_number = 10 and through_number = 2;
update sfr_sf_mst_die_cutting set basic_cost = 27000, through_wage = 0 where paperboard_type = 2 and size <> 1 and imposition_number between 11 and 20 and through_number = 2;
update sfr_sf_mst_die_cutting set basic_cost = 29000, through_wage = 0 where paperboard_type = 2 and size <> 1 and imposition_number between 21 and 40 and through_number = 2;


-- GF(paperboard_type = 4)の場合

update sfr_sf_mst_die_cutting set basic_cost = 14500, through_wage = 0 where paperboard_type = 4 and size <> 1 and imposition_number = 1 and through_number = 2;
update sfr_sf_mst_die_cutting set basic_cost = 16000, through_wage = 0 where paperboard_type = 4 and size <> 1 and imposition_number between 2 and 3 and through_number = 2;
update sfr_sf_mst_die_cutting set basic_cost = 18000, through_wage = 0 where paperboard_type = 4 and size <> 1 and imposition_number between 4 and 5 and through_number = 2;
update sfr_sf_mst_die_cutting set basic_cost = 21000, through_wage = 0 where paperboard_type = 4 and size <> 1 and imposition_number between 6 and 7 and through_number = 2;
update sfr_sf_mst_die_cutting set basic_cost = 22000, through_wage = 0 where paperboard_type = 4 and size <> 1 and imposition_number between 8 and 9 and through_number = 2;
update sfr_sf_mst_die_cutting set basic_cost = 24000, through_wage = 0 where paperboard_type = 4 and size <> 1 and imposition_number = 10 and through_number = 2;
update sfr_sf_mst_die_cutting set basic_cost = 27000, through_wage = 0 where paperboard_type = 4 and size <> 1 and imposition_number between 11 and 20 and through_number = 2;
update sfr_sf_mst_die_cutting set basic_cost = 29000, through_wage = 0 where paperboard_type = 4 and size <> 1 and imposition_number between 21 and 40 and through_number = 2;

-- BF(paperboard_type = 3)の場合

update sfr_sf_mst_die_cutting set basic_cost = 15000, through_wage = 0 where paperboard_type = 3 and size <> 1 and imposition_number = 1 and through_number = 2;
update sfr_sf_mst_die_cutting set basic_cost = 17000, through_wage = 0 where paperboard_type = 3 and size <> 1 and imposition_number between 2 and 3 and through_number = 2;
update sfr_sf_mst_die_cutting set basic_cost = 19000, through_wage = 0 where paperboard_type = 3 and size <> 1 and imposition_number between 4 and 5 and through_number = 2;
update sfr_sf_mst_die_cutting set basic_cost = 21000, through_wage = 0 where paperboard_type = 3 and size <> 1 and imposition_number between 6 and 7 and through_number = 2;
update sfr_sf_mst_die_cutting set basic_cost = 23000, through_wage = 0 where paperboard_type = 3 and size <> 1 and imposition_number between 8 and 9 and through_number = 2;
update sfr_sf_mst_die_cutting set basic_cost = 25000, through_wage = 0 where paperboard_type = 3 and size <> 1 and imposition_number = 10 and through_number = 2;
update sfr_sf_mst_die_cutting set basic_cost = 28000, through_wage = 0 where paperboard_type = 3 and size <> 1 and imposition_number between 11 and 20 and through_number = 2;
update sfr_sf_mst_die_cutting set basic_cost = 30000, through_wage = 0 where paperboard_type = 3 and size <> 1 and imposition_number between 21 and 40 and through_number = 2;




