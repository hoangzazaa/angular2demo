# sgsk_sefuri_sf

## 事前準備

`docker-compose` を使えるようにしておく
https://docs.docker.com/compose/

※ 適宜ショートカットとか設定しておくと便利

### docker-compose.override.ymlの設定
アプリ、mysql のローカル側のポートを設定するため、docker-compose.override.ymlを作成してください。
基本はdocker-compose.override.yml.exampleをそのままコピーするだけでOKですが、変更が必要であれば適宜実施してください。

## 構築

```
$ docker-compose build
```

※ 追ってutilityスクリプト追加予定


## サーバー起動

### コンテナ起動

```
$ docker-compose up
```

※ activator run の自動実行を解除中。コンテナに直接アクセスして、コマンドを実行すること

### App コンテナにアクセス

```
$ docmer-compose exec app bash
```

### Docker app コンテナ内にてサーバー起動

```
# activator run
``` 


### 構成に変更があった場合

#### Dockerfile

```
$ docker-compose build app
```