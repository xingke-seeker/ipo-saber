#!/bin/bash

# 停止后端 FastAPI
if [ -f backend/backend.pid ]; then
  kill $(cat backend/backend.pid) && rm backend/backend.pid
  echo "后端 FastAPI 已停止"
else
  echo "未找到后端 PID 文件，可能后端未启动或已停止"
fi

# 停止前端 Next.js
if [ -f frontend/frontend.pid ]; then
  kill $(cat frontend/frontend.pid) && rm frontend/frontend.pid
  echo "前端 Next.js 已停止"
else
  echo "未找到前端 PID 文件，可能前端未启动或已停止"
fi
