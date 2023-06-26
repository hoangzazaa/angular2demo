#!/bin/bash

deploy_dir=`dirname $0`

cd ${deploy_dir}

if [ "${1}" == "" ]; then
        echo "input env.name."
        echo "example : {st02.salesfront, prod.salesfront}"
        exit
fi

exist=`ls deploy/config | grep config.${1}.sh`

if [ "${exist}" = "" ]; then
    echo "env.name not found."
    echo "example : {st02.salesfront, prod.salesfront}"
    exit
fi

. ./deploy/config/config.${1}.sh

scp ${target_file} centos@${ssh_dest}:~/.

ssh ${ssh_dest} "bash /home/centos/${base_dir}/deploy.sh"
