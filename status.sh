#!/bin/bash

# 检查后端服务状态
BACKEND_PID_FILE=backend/backend.pid
FRONTEND_PID_FILE=frontend/frontend.pid

check_pid() {
  PID=$1
  if [ -z "$PID" ]; then
    echo "未找到 PID"
    return 1
  fi
  if ps -p $PID > /dev/null 2>&1; then
    echo "运行中 (PID: $PID)"
    return 0
  else
    echo "未运行 (PID: $PID)"
    return 1
  fi
}

# 检查后端
if [ -f $BACKEND_PID_FILE ]; then
  BACKEND_PID=$(cat $BACKEND_PID_FILE)
  echo -n "后端 FastAPI 状态："
  check_pid $BACKEND_PID
else
  echo "后端 FastAPI 状态：未找到 PID 文件，可能未启动"
fi

# 检查前端
if [ -f $FRONTEND_PID_FILE ]; then
  FRONTEND_PID=$(cat $FRONTEND_PID_FILE)
  echo -n "前端 Next.js 状态："
  check_pid $FRONTEND_PID
else
  echo "前端 Next.js 状态：未找到 PID 文件，可能未启动"
fi
