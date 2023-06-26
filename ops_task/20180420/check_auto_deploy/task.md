# 運用タスク

## タスク名

本番環境用ビルド＆デプロイ自動化スクリプトの作成

## 親タスクURLとこのタスクの説明

https://app.asana.com/0/632692545701047/634395773541216
上記作成されたものについて実行して正しく動作していることを確認する。

## 実行手順

1. デプロイ作業用ディレクトリへ移動
```
$ ssh sgsk_bastion
$ cd ~/automation
```

2. 下記コマンドを実行し、本番環境のSalesFront Appをデプロイする
```
$ bash execute_auto_deploy.sh prod.salesfront
```

3. 下記コマンドを実行し、本番環境のAllJobをデプロイする
```
$ bash execute_auto_deploy.sh prod.alljob
```

4. 下記コマンドを実行し、本番環境のMailJobをデプロイする
```
$ bash execute_auto_deploy.sh prod.mailjob
```

5. 本番環境確認用のELB及びドメインを作成する

5. 画面が開けることを確認する
```
https://production-tmp.sgsk.jp
```

6. 「設計依頼」を行い、メールが帰ってくることを確認する。