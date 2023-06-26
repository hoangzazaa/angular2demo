# 運用タスク

## タスク名

AllJob及びMailJobのバッチDB接続先変更

## 親タスクURLとこのタスクの説明

「[親タスク](https://trello.com/c/9Z7MMBm9/1255-%E6%9C%AC%E7%95%AA%E7%92%B0%E5%A2%83%E3%83%90%E3%83%83%E3%83%81db%E6%8E%A5%E7%B6%9A%E5%85%88%E3%81%AE%E5%A4%89%E6%9B%B4)」

## 実行手順

### AllJob
1. scpによる実行ファイル設置後、「application_prod.yml」を本番環境にscpする。
2. 下記コマンドを実行する
```
$ mv ~/application_prod.yml ~/production/AllJob/config/application.yml
```
3. 本番環境用RDSのsfr_batchのdumpを取得する
4. 本番環境用RDSのsgsk_batch_productionに3で作成したdumpを展開する
5. デプロイコマンドを実行する
