# sgsk_sefuri_sf ローカル環境用 Docker

## 事前準備

1. [Docker for Mac](https://www.docker.com/docker-mac) / [Docker for Windows](https://docs.docker.com/docker-for-windows/) / [Docker Toolbox on Windows](https://docs.docker.com/toolbox/toolbox_install_windows/) をインストール

## 起動方法 / 終了方法

### 起動

1. Docker for Mac/Windows or Docker machine を起動
2. 当ディレクトリ (リポジトリルート/docker/) で以下のコマンドを実行する
```bash
docker-compose up -d
```
3. (初回のみ) MySQL リストア
```bash
# 以下は staging02 データベースをローカルにコピーする手順です。
echo "CREATE DATABASE sfr_batch;GRANT ALL ON sfr_batch.* TO sefuri_admin @'%';" \
  | mysql -h 127.0.0.1 -u root

mysqldump -h sgsk-staging02.cqjnq1fpk5zc.ap-northeast-1.rds.amazonaws.com -P 13400 -u sgsk_staging02 -psgsk_st02 --routines sgsk_staging02 \
  | sed -e 's/`sgsk_staging02`/`sefuri_admin`/' \
  | mysql -u sefuri_admin -p123 -h 127.0.0.1 sfr_sf

mysqldump -h sgsk-staging02.cqjnq1fpk5zc.ap-northeast-1.rds.amazonaws.com -P 13400 -u sgsk_staging02 -psgsk_st02 --routines sgsk_batch_staging02 \
  | mysql -u sefuri_admin -p123 -h 127.0.0.1 sfr_batch
```

### 終了

1. 当ディレクトリ (リポジトリルート/docker/) で以下のコマンドを実行する
```bash
docker-compose down
```
2. Docker for Mac/Windows or Docker machine 停止

### 使用上の注意

Docker volume を使用するため、誤って volume を削除しないようにしてください。


## 接続パラメーター

### MySQL

名前 | 値
-------| --------
ホスト | 127.0.0.1 (localhost)
ポート | 3306
ユーザー名 | sefuri_admin
パスワード | 123
データベース名 | sfr_sf / sfr_batch
root パスワード | 空

※sfr_sf と sfr_batch はデータベース名のみの違いです。


#### sefuri_admin でのログイン
```bash
mysql -u sefuri_admin -p123 -h 127.0.0.1 sfr_sf
mysql -u sefuri_admin -p123 -h 127.0.0.1 sfr_batch
```

#### root でのログイン
```bash
mysql -u root -h 127.0.0.1 sfr_sf
```


### ActiveMQ

名前 | 値
-------| --------
Web コンソール URL | http://localhost:8161/
Web コンソールユーザー名 | admin
Web コンソールパスワード | admin
Active MQ ホスト | localhost
Active MQ ポート | 61616


### Elasticsearch

名前 | 値
-------| --------
REST ポート | 9200
node 間通信 | 9300


## メンテナンス

### データベースのバックアップ

```bash
docker-compose exec db sh -c 'exec mysqldump --all-databases -uroot' \
  | gzip > CHANGEME.sql.gz
```

### データベースの初期化

```bash
# コンテナ 停止
docker-compose down
# ボリューム削除
docker voluem rm docker_db_sfr_sf
# コンテナ起動
docker-compose up -d
# DB リストア作業をする
```


## 本番 DB をローカルにコピーする方法

### Docker mysql 上にデータベースとユーザーを作成

echo "
  CREATE DATABASE sgsk_local_replica;
  CREATE DATABASE sgsk_batch_local_replica;
  GRANT ALL ON sgsk_local_replica.* TO sefuri_admin @'%';
  GRANT ALL ON sgsk_batch_local_replica.* TO sefuri_admin @'%';
  GRANT ALL ON sgsk_local_replica.* TO sgsk_local_replica @'%' IDENTIFIED BY '123';
  GRANT ALL ON sgsk_batch_local_replica.* TO sgsk_local_replica @'%' IDENTIFIED BY '123';
" | mysql -h 127.0.0.1 -u root

### 本番 DB バックアップ

```
# パスワードは本番 DB のものに置換してください。
mysqldump -h sgsk-production.cqjnq1fpk5zc.ap-northeast-1.rds.amazonaws.com -P 13400 -u sgsk_production -pCHANGEME --routines sgsk_production \
  | gzip -c > production-sgsk_production-CHANGEME.sql.gz

mysqldump -h sgsk-production.cqjnq1fpk5zc.ap-northeast-1.rds.amazonaws.com -P 13400 -u sgsk_production -pCHANGEME --routines sgsk_batch_production \
  | gzip -c > production-sfr_batch-CHANGEME.sql.gz
```

### 投入

```
gunzip -c production-sgsk_production-CHANGEME.sql.gz \
  | sed -e 's/`sgsk_production`/`sgsk_local_replica`/' \
  | mysql -u sgsk_local_replica -p123 -h 127.0.0.1 sgsk_local_replica

gunzip -c roduction-sfr_batch-CHANGEME.sql.gz \
  | mysql -u sgsk_local_replica -p123 -h 127.0.0.1 sgsk_batch_local_replica
```

### 接続確認

以上の手順で本番 DB をローカルにコピーできます。
接続パラメータは以下のとおりです。

名前 | 値
-------| --------
ホスト | 127.0.0.1 (localhost)
ポート | 3306
ユーザー名 | sgsk_local_replica
パスワード | 123
データベース名 | sgsk_local_replica / sgsk_batch_local_replica
root パスワード | 空

※sgsk_local_replica と sgsk_batch_local_replica はデータベース名のみの違いです。
