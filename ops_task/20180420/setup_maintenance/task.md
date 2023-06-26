# 運用タスク

## タスク名

メンテナンス画面切り替え機能の本番環境適用

## 親タスクURLとこのタスクの説明

https://app.asana.com/0/632692545701047/634395773541213

## 実行手順

1. 下記のようなファイルを作成する。
```
$ sudo vi /etc/yum.repos.d/nginx.repo
```
```
[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/centos/7/$basearch/
gpgcheck=0
enabled=1
```
2. 下記コマンドでnginxをインストールする。
```
$ sudo yum install nginx
```

3. 下記のようなファイルを作成する。
```
$ sudo vi /etc/nginx/conf.d/server.conf
※中身は<sgsk_sefuri_misc>/nginx/server_prod.confを参照
```
```
$ sudo vi /etc/nginx/conf.d/default.conf
※中身は<sgsk_sefuri_misc>/nginx/default_prod_st02.confを参照
```
```
$ vi /home/centos/production/Front/deploy.sh
※中身は<sgsk_sefuri_sf>/deoloy/remote/production/deploy.shを参照
```

4. nginxを再起動し設定ファイルを適用する。
```
$ sudo nginx -s reload
```

5. 本番環境のELBのhttpsのターゲットグループを「sgsk-production」にする。

6. 下記の様にmaintenance用リソースをarchiveしてファイルをリモートに設置する。
```
$ cd <sgsk_sefuri_misc>
$ tar -zcvf maintenance.tar.gz maintenance
$ scp <sgsk_sefuri_misc>/maintenance.tar.gz centos@sgsk_pr_front:~/.
```

7. リモートログインして、下記の様にリソースを設置する。
```
$ ssh sgsk_pr_front
$ tar -xzvf maintenance.tar.gz
$ sudo mkdir /var/maintenance
$ sudo cp -rfp ~/maintenance/* /var/maintenance/.
```

8. 下記コマンドを実行
```
$ bash /var/maintenance/maintenance start
```

9. ブラウザで開いてメンテナンス画面になっていることを確認する。
```
http://production.sgsk.jp
```

10. 下記コマンドを実行
```
$ bash /var/maintenance/maintenance stop
```

11. ブラウザで開いてメンテナンス画面になっていることを確認する。
```
http://production.sgsk.jp
```
