# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WeChat Article Analyzer - A full-stack application that fetches WeChat articles via URL and generates AI-powered structured analysis reports using Google's Gemini API.

## Architecture

**Client-Server Architecture**:
- **Frontend**: Next.js 15 with App Router, React 19, TypeScript, Tailwind CSS, Shadcn/UI
- **Backend**: Python FastAPI, asynchronous Playwright for web scraping, Google Gemini API integration
- **Data Flow**: URL → Playwright scraper → Gemini AI → Structured JSON response → Frontend display

## Key Directories

- **Active Frontend**: `frontend_new/` - Current production frontend (Shadcn/UI)
- **Legacy Frontend**: `frontend/` - Previous version (deprecated)
- **Backend**: `backend/` - FastAPI services
- **Design Rules**: `.cursor/rules.md` - Comprehensive development guidelines

## Development Rules (from .cursor/rules.md)

### Frontend Development (`frontend_new/`)
- **Framework**: Next.js App Router, TypeScript
- **UI Library**: Shadcn/UI (use CLI to add components)
- **Styling**: Tailwind CSS only, no traditional CSS files
- **State Management**: React Hooks + TanStack Query for server state
- **Language**: All commit messages must be in English

### Backend Development (`backend/`)
- **Framework**: FastAPI with async/await for all I/O operations
- **Data Models**: Pydantic for all request/response validation
- **Web Scraping**: Playwright for WeChat article extraction
- **AI Integration**: Google Gemini API with factory pattern for multi-model support
- **Configuration**: Environment variables only, no hardcoded secrets

## Development Commands

### Backend
```bash
# Install dependencies
cd backend && pip3 install -r requirements.txt

# Set environment variables
export GEMINI_API_KEY=your_key
export DASHSCOPE_API_KEY=your_key  # For Qwen

# Development server (from project root)
cd backend && python3 -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Alternative from project root
PYTHONPATH=backend python3 -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Tests
python3 -m pytest -s backend/tests/
python3 -m pytest -s backend/tests/test_scraper_service.py
```

### Frontend (Current)
```bash
# New frontend (recommended) - Use pnpm as lockfile indicates
# Install pnpm if not available: npm install -g pnpm
cd frontend_new && pnpm install && pnpm run dev

# Build
pnpm run build

# Lint
pnpm run lint

# Legacy frontend (deprecated) - Uses npm
# Note: frontend/ uses npm, frontend_new/ uses pnpm (pnpm-lock.yaml)
cd frontend && npm install && npm run dev
```

### Full Stack Development
```bash
# Quick start both services
./start_new.sh    # Uses frontend_new + backend
./start.sh        # Uses frontend + backend (legacy)

# Check service status
./status.sh
./status_new.sh

# Stop services
./stop.sh
./stop_new.sh
```

## Backend Core Modules

From `backend/backend.md` and `.cursor/rules.md`:
- **Entry**: `app/main.py` - FastAPI app initialization
- **API**: `app/api/v1/endpoints/analysis.py` - RESTful analysis endpoint
- **Services**:
  - `scraper_service.py` - Playwright-based WeChat article extraction
  - `ai_service.py` - Gemini API integration
  - `ai_factory.py` - Multi-model factory pattern
  - `qwen_service.py` - Qwen model implementation
  - `base_ai_model.py` - AI model interface
- **Schemas**: `schemas/analysis.py` - Pydantic data models
- **Config**: `core/config.py` - Environment variable management

## API Endpoints

- **POST** `/api/v1/analysis` - Analyze WeChat article
  - Request: `{ "url": "wechat_article_url" }`
  - Response: `{ core_arguments, argument_analysis, critical_questions, key_quotes }`

## Environment Setup

Required environment variables:
- `GEMINI_API_KEY` - Google Gemini API key
- `DASHSCOPE_API_KEY` - Alibaba DashScope API key (for Qwen)

## Testing

Backend tests use `pytest-asyncio` for async testing:
- `test_scraper_service.py` - Tests WeChat article scraping
- `test_ai_service.py` - Tests AI analysis integration

## Important Notes

1. **Frontend_new is active** - frontend/ is deprecated
2. **All commits** must follow conventional commits format in English
3. **i18n required** - All UI components must support both Chinese and English
4. **Design rules** in `.cursor/rules.md` take precedence over this file