# 運用タスク

## タスク名

設定ファイル自動適用(Job)

## 親タスクURLとこのタスクの説明

https://app.asana.com/0/632692545701047/641385021209175

## 実行手順

1. 下記コマンドを実行し、scriptを設置する。

```
$ scp <sgsk_sefuri_jobs>/deploy/remote/production/AllJob/deploy.sh centos@sgsk_pr_job:~/production/AllJob/.
$ scp <sgsk_sefuri_jobs>/deploy/remote/production/AllJob/restart.sh centos@sgsk_pr_job:~/production/AllJob/.
$ scp <sgsk_sefuri_jobs>/deploy/remote/production/MailJob/deploy.sh centos@sgsk_pr_front:~/production/MailJob/.
$ scp <sgsk_sefuri_jobs>/deploy/remote/production/MailJob/restart.sh centos@sgsk_pr_front:~/production/MailJob/.
```
