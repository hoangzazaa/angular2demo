#!/bin/bash

cd client
npm run build
cd ..
activator clean compile dist
