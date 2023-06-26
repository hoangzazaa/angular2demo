#!/bin/bash

target_dir="sefuri_salesfront-1.0-SNAPSHOT"
target_zip="${target_dir}.zip"
log_name="run.log_"`date +%Y%m%d%H%M%S`


# デプロイ対象のファイルがない場合は処理を止める






# 画面表示
echo ""
pid=`ps -ef | grep java | grep -v "grep" | grep -v "exec.jar" | awk '{print $2}'`
echo "Process ID (before deploy) : ${pid}"

# 古いzipをoldに移し、デプロイ対象を実行ディレクトリに移す



# 現在のプロセスを止める
sudo kill -9 "${pid}"

# 実行ディレクトリの現在動いているシステムのディレクトリを削除
sudo rm -rf "${target_dir}"

# zipファイルを展開
unzip "${target_zip}"

# confファイルを移動する
cp -p ./mst_conf/application.conf ./"${target_dir}"/conf/.
cp -p ./mst_conf/directory.conf ./"${target_dir}"/conf/setting/.
cp -p ./mst_conf/jms.conf ./"${target_dir}"/conf/setting/.
cp -p ./mst_conf/mail.conf ./"${target_dir}"/conf/setting/.
cp -p ./mst_conf/search.conf ./"${target_dir}"/conf/setting/.

# 古いログをログディレクトリに移す
sudo mv ./run.log* ./logs/.

# プロセスを立ち上げる
sudo nohup ./"${target_dir}"/bin/sefuri_salesfront -Dhttp.port=80 -Dhttps.port=443 -J-Xms300M -J-Xmx600M -Dthumbnailator.conserveMemoryWorkaround=true > "${log_name}" &

# 画面表示
sleep 2
pid=`ps -ef | grep java | grep -v "grep" | grep -v "exec.jar" | awk '{print $2}'`
echo "Process ID (after deploy) : ${pid}"


