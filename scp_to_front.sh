#!/bin/bash

host="$1"

if [ "$host" == "" ]; then
	echo "input ssh host name to argument 1."
	exit
fi


scp target/universal/sefuri_salesfront-1.0-SNAPSHOT.zip centos@"$host":~/.
