#!/bin/bash

# 启动后端 FastAPI（必须在项目根目录下运行）
nohup python3 -m uvicorn backend.app.main:app --reload > backend/backend.log 2>&1 &
echo $! > backend/backend.pid

# 启动前端 Next.js
cd frontend
nohup npm run dev > ../frontend/frontend.log 2>&1 &
echo $! > ../frontend/frontend.pid
cd ..

sleep 2
echo "后端 FastAPI 已启动，日志见 backend/backend.log，PID: $(cat backend/backend.pid)"
echo "前端 Next.js 已启动，日志见 frontend/frontend.log，PID: $(cat frontend/frontend.pid)"
echo "如需停止服务，请运行 ./stop.sh"
