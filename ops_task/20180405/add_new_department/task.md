# 運用タスク

## タスク名

新部門「江崎G」及び新ユーザ「好埼２」の追加

## 親タスクURLとこのタスクの説明

https://trello.com/c/Z8bgilPX/1109-5-%E6%96%B0%E9%83%A8%E9%96%80%E8%BF%BD%E5%8A%A0%E3%81%AE%E5%AF%BE%E5%BF%9C%E3%82%92%E3%81%99%E3%82%8B
・クエリ作成及び実行

## 他タスクとの依存関係

下記タスクが終わった後に実行すること。
```
20180405/add_column_sales_aggregate_flag
```

## 実行手順

1. 「a_yoshizaki+ezaki@sagasiki.co.jp」のメールアドレスのユーザが存在しないことを確認
```
select * from sfr_sf_user where email = 'a_yoshizaki+ezaki@sagasiki.co.jp';
```

2. 「EE96」の部門コードである部門が「デザイングループ」のみであることを確認
```
select department from sfr_sf_department where department_code = 'EE96';
```

3. 「ZZ01」の部門コードである部門が存在しないことを確認
```
select department from sfr_sf_department where department_code = 'ZZ01';
```

4. 「EE96」の部門コードであるユーザの人数を記録しておく
```
select count(*) from sfr_sf_user where department_code = 'EE96';
```

5. 「ZZ01」の部門コードであるユーザの人数が0であることを確認
```
select count(*) from sfr_sf_user where department_code = 'ZZ01';
```

6. 同ディレクトリ内にあるinsert_new_department_and_user.sqlを本番環境に適用

7. 「EE96」の部門コードである部門が「江崎G」のみであることを確認
```
select department_code, department from sfr_sf_department where department_code = 'EE96';
```

8. 「ZZ01」の部門コードである部門が「デザイングループ」のみであることを確認
```
select department_code, department from sfr_sf_department where department_code = 'ZZ01';
```

9. 「EE96」の部門コードであるユーザの人数が1であることを確認
```
select count(*) from sfr_sf_user where department_code = 'EE96';
```

10. 「ZZ01」の部門コードであるユーザの人数が作業4で記録した人数と一致することを確認
```
select count(*) from sfr_sf_user where department_code = 'ZZ01';
```

11. 「a_yoshizaki+ezaki@sagasiki.co.jp」のメールアドレスのユーザが存在し、ユーザー名が「好埼２」、人員コードが「G60」、部門コードが「EE96」であることを確認
```
select username, user_code, department_code from sfr_sf_user where email = 'a_yoshizaki+ezaki@sagasiki.co.jp';
```
12. 新部門「江崎G」で担当するグリコ関係の得意先の担当営業の人員コードが「G60」になっていることを確認する。
```
select
    customer_code,
    name,
    pic_code
from
    sfr_sf_customer
where
	customer_code in (
		"0001001",
		"0001002",
		"0001003",
		"0001008",
		"0001009",
		"0001014",
		"0001015",
		"0001555",
		"0001828",
		"0020297",
		"0001123",
		"0020966"
	)
;
```


