#!/bin/bash

# 新前后端服务状态检查脚本
# 前端 PID 文件: frontend.pid
# 后端 PID 文件: backend.pid

BACKEND_PID_FILE=backend.pid
FRONTEND_PID_FILE=frontend.pid

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
  echo -n "新后端 FastAPI 状态："
  check_pid $BACKEND_PID
else
  echo "新后端 FastAPI 状态：未找到 PID 文件，可能未启动"
fi

# 检查前端
if [ -f $FRONTEND_PID_FILE ]; then
  FRONTEND_PID=$(cat $FRONTEND_PID_FILE)
  echo -n "新前端 Next.js 状态："
  check_pid $FRONTEND_PID
else
  echo "新前端 Next.js 状态：未找到 PID 文件，可能未启动"
fi
