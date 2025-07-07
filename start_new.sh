#!/bin/bash

# 启动新的前端和后端服务，并记录PID到文件
# 前端目录: frontend_new
# 后端目录: backend
# 默认前端端口: 3000，后端端口: 8000

# 1. 启动后端（后台运行，日志输出到 backend.log）
echo "[INFO] 启动后端服务..."
nohup python3 -m uvicorn backend.app.main:app --host 0.0.0.0 --port 8000 > backend.log 2>&1 &
echo $! > backend.pid

# 2. 启动新前端（后台运行，日志输出到 frontend_new/frontend.log）
echo "[INFO] 启动新前端服务..."
cd frontend_new
if [ ! -d "node_modules" ]; then
  echo "[INFO] 检测到未安装依赖，正在安装..."
  pnpm install || npm install
fi
nohup pnpm run dev > ./frontend.log 2>&1 &
echo $! > ../frontend.pid
cd ..

# 3. 输出访问信息
echo "[SUCCESS] 后端已启动 (PID: $(cat backend.pid))，端口: 8000"
echo "[SUCCESS] 新前端已启动 (PID: $(cat frontend.pid))，端口: 3000"
echo "[INFO] 前端访问地址: http://localhost:3000"
echo "[INFO] 后端访问地址: http://localhost:8000"
echo "[TIP] 如需停止服务，可使用 stop_new.sh 脚本或 kill $(cat backend.pid) $(cat frontend.pid)"
