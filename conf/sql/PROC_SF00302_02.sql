DROP PROCEDURE IF EXISTS `PROC_SF00302_02`;

CREATE PROCEDURE `PROC_SF00302_02`()

BEGIN
	#http://fridaynight.vnext.vn/issues/2903
	SELECT DISTINCT p.*,ss.width, ss.height, ss.`name`,ss.paper_code as `code` FROM sfr_sf_mst_paper p

	INNER JOIN sfr_sf_mst_sheet_size ss on ss.paper_id = p.id

	WHERE convert(p.paper_material_code,unsigned) 

	BETWEEN convert('0200000',unsigned) AND convert('9999999',unsigned) AND p.created_user = 272 AND p.hidden_flag IS NULL;

END