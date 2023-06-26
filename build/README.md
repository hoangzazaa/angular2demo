sgsk\_sefuri\_sf ビルド環境
===========================

事前準備
--------

- Docker ( `docker` ) 及び Docker Compose ( `docker-compose` ) の導入

構築
----

```
$ docker-compose build
```

起動, ビルド
------------

1. コンテナの起動
    `docker-compose up -d`
2. ビルドコマンド実行
    `docker-compose exec app /bin/bash build.sh`

プロジェクトのルートディレクトリ内 `target` フォルダにビルド成果が出力されます.

※ Dockerコンテナでのビルドが終了してからホストOSのファイルシステムに出力されるまで時間がかかる場合があります. デプロイ, 実行前にファイルの最終更新時刻をご確認ください.
