#!/bin/bash -e

target_dir="sefuri_salesfront-1.0-SNAPSHOT"
target_zip="${target_dir}.zip"
log_name="run.log_"`date +%Y%m%d%H%M%S`
root_dir=`dirname $0`

cd ${root_dir}

# デプロイ対象のファイルがない場合は処理を止める
exist=`ls | grep sefuri_salesfront || true`
if [ "${exist}" == "" ]; then
        echo "zip file not exists."
        exit
fi

# 画面表示
echo ""
pid=`cat ${root_dir}/${target_dir}/RUNNING_PID`
echo "Process ID (before deploy) : ${pid}"

# 古いzipをoldに移し、デプロイ対象を実行ディレクトリに移す
# mkdir ${root_dir}/old
# mv ${root_dir}/"${target_zip}" ${root_dir}/old/"${target_dir}"_`date +%Y%m%d_%H%M%S`.zip
rm ${root_dir}/"${target_zip}"
mv ~/"${target_zip}" ${root_dir}

# 現在のプロセスを止める
sudo kill -9 "${pid}"

sleep 1

# 実行ディレクトリの現在動いているシステムのディレクトリを削除
rm -rf ${root_dir}/"${target_dir}"

# zipファイルを展開
unzip ${root_dir}/"${target_zip}"

# confファイルを移動する
cp -p ${root_dir}/mst_conf/application.conf ${root_dir}/"${target_dir}"/conf/.
cp -p ${root_dir}/mst_conf/directory.conf   ${root_dir}/"${target_dir}"/conf/setting/.
cp -p ${root_dir}/mst_conf/jms.conf         ${root_dir}/"${target_dir}"/conf/setting/.
cp -p ${root_dir}/mst_conf/mail.conf        ${root_dir}/"${target_dir}"/conf/setting/.
cp -p ${root_dir}/mst_conf/search.conf      ${root_dir}/"${target_dir}"/conf/setting/.
cp -p ${root_dir}/mst_conf/restapi.conf     ${root_dir}/"${target_dir}"/conf/setting/.

# 古いログをログディレクトリに移す
mv ${root_dir}/run.log* ${root_dir}/logs/.

# プロセスを立ち上げる
nohup ${root_dir}/"${target_dir}"/bin/sefuri_salesfront -Dhttp.port=9000 -Dhttps.port=9001 -J-Xms300M -J-Xmx600M -Dthumbnailator.conserveMemoryWorkaround=true > "${root_dir}/${log_name}" &

# 画面表示
sleep 5
pid=`cat "${target_dir}/RUNNING_PID"`
echo "Process ID (after deploy) : ${pid}"


