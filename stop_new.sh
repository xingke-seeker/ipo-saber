#!/bin/bash
# 停止新的前端和后端服务（基于PID文件）

# 停止后端
if [ -f backend.pid ]; then
  BACKEND_PID=$(cat backend.pid)
  kill $BACKEND_PID && echo "[SUCCESS] 已停止后端 (PID: $BACKEND_PID)" || echo "[WARN] 后端进程未找到或已退出"
  rm backend.pid
else
  echo "[WARN] 未找到 backend.pid，无法停止后端"
fi

# 停止前端
if [ -f frontend.pid ]; then
  FRONTEND_PID=$(cat frontend.pid)
  kill $FRONTEND_PID && echo "[SUCCESS] 已停止前端 (PID: $FRONTEND_PID)" || echo "[WARN] 前端进程未找到或已退出"
  rm frontend.pid
else
  echo "[WARN] 未找到 frontend.pid，无法停止前端"
fi

echo "[INFO] 所有服务已处理完毕。"
