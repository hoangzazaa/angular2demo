# 運用タスク

## タスク名

ログ設定ファイルの適用

## 親タスクURLとこのタスクの説明

「[親タスク](https://trello.com/c/dM4ITex0/1254-%E3%83%AD%E3%82%B0%E8%A8%AD%E5%AE%9A%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%81%AE%E9%81%A9%E7%94%A8front-alljob-mailjob)」

## 実行手順

### Front
1. scpによる実行ファイル設置後、「application_prod.conf」を本番環境にscpする。
2. 下記コマンドを実行する
```
$ mv ~/application_prod.conf ~/production/Front/mst_conf/application.conf
```
3. デプロイコマンドを実行する

### AllJob
1. scpによる実行ファイル設置後、「logback_prod.xml」を本番環境にscpする。
2. 下記コマンドを実行する
```
$ mv ~/logback_prod.xml ~/production/AllJob/config/logback.xml
```
3. デプロイコマンドを実行する

### MailJob
1. scpによる実行ファイル設置後、「logback_prod.xml」を本番環境にscpする。
2. 下記コマンドを実行する
```
$ mv ~/logback_prod.xml ~/production/MailJob/config/logback.xml
```
3. デプロイコマンドを実行する
