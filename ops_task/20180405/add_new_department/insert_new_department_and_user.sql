-- デザイングループの部門コードを変更
update
	sfr_sf_department
set
	department_code = 'ZZ01',
	updated_date = now()
where
	department_code = 'EE96'
;

-- デザイングループに所属するユーザの部門コードを変更
update
	sfr_sf_user
set
	department_id = (
		select
			id
		from
			sfr_sf_department
		where
			department_code = 'ZZ01'
		),
	department_code = 'ZZ01',
	updated_date = now()
where
	department_code = 'EE96'
;

-- 新部門「江崎G」を追加
INSERT INTO `sfr_sf_department` (`created_date`, `updated_date`, `created_user`, `updated_user`, `department`, `department_code`, `type`, `address`, `tel`, `fax`, `postal_code`, `bank_name`, `mail_group_flag`, `sales_aggregate_flag`)
VALUES
	(now(), now(), NULL, NULL, '江崎G', 'EE96', 1, '大阪市中央区南船場4-10-3\\nナガホリビル7F', '06-6252-8585', '06-6252-8587', '542-0081', NULL, 0, 1);

-- 新ユーザ「好崎２」を追加
INSERT INTO `sfr_sf_user` (`created_user`, `updated_user`, `created_date`, `updated_date`, `username`, `password`, `enable_flag`, `role`, `email`, `delete_flag`, `department_id`, `user_code`, `department_code`)
VALUES
	(0, 0, now(), now(), '好崎２', '8d5c2bbd87886b03fd69326f1361d235', 1, '1', 'a_yoshizaki+ezaki@sagasiki.co.jp', 0, 1, 'G60', 'EE96');

-- 新ユーザ「好崎２」の部門IDを更新(部門のIDが不定なため)
update
	sfr_sf_user
set
	department_id = (
		select
			id
		from
			sfr_sf_department
		where
			department_code = 'EE96'
		),
	updated_date = now()
where
	email = 'a_yoshizaki+ezaki@sagasiki.co.jp'
;

-- 「好崎２」に江崎グリコ関係の得意先を移す
update
	sfr_sf_customer
SET
	pic_code = 'G60'
WHERE
	customer_code in (
		"0001001",
		"0001002",
		"0001003",
		"0001008",
		"0001009",
		"0001014",
		"0001015",
		"0001016",
		"0001555",
		"0001828",
		"0020297",
		"0001123",
		"0020966"
	)
;
