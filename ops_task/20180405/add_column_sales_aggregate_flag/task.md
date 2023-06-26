# 運用タスク

## タスク名

売り上げ集計フラグの追加

## 親タスクURLとこのタスクの説明

https://trello.com/c/Z8bgilPX/1109-5-%E6%96%B0%E9%83%A8%E9%96%80%E8%BF%BD%E5%8A%A0%E3%81%AE%E5%AF%BE%E5%BF%9C%E3%82%92%E3%81%99%E3%82%8B
・カラム追加

## 実行手順

1. 同ディレクトリ内にある「add_aggregate_flag.sql」を実行する。

2. カラムが追加されたことを確認する。
```
show columns from sfr_sf_department;
```
3. 同ディレクトリ内にある「update_aggregate_flag.sql」を実行する。

4. 売り上げ集計対象部門のsales_aggregate_flagに1が設定されたことを確認する。
```
select
    department,
    department_code,
    sales_aggregate_flag
from
    sfr_sf_department
where
    department_code in(
	'EE01', 'EE02', 'EE03', 'EE04', 'EE05', 'EE06', 'EE07', 'EE08', 'EE09', 'EE10', 'EE11', 'EE12', 'EE18', 'EE95'
    )
;
```

集計対象部門：
```
東京支店
大阪支店
福岡支店
大分支店
熊本支店
鹿児島支店
田原
佐賀一部
佐賀二部
佐賀三部
佐賀四部
アクトン
長崎支店
佐賀有明漁協
```
