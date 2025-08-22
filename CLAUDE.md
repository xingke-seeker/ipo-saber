# CLAUDE.md

This file provides high-level guidance to Claude Code for the WeChat Article Analyzer monorepo.

## Project Overview

WeChat Article Analyzer - A full-stack application that fetches WeChat articles via URL and generates AI-powered structured analysis reports using LLM APIs.

## Architecture

**Client-Server Architecture**:
- **Frontend**: Next.js 15 with App Router, React 19, TypeScript 5, Tailwind CSS v3, Shadcn/UI
- **Backend**: Python FastAPI, asynchronous Playwright for web scraping, LLM integration with multi-model support
- **Current LLM**: Qwen (via DashScope API), **Future Support**: Gemini, OpenAI, Claude, etc.

## Directory Structure

- **Active Frontend**: `frontend_new/` - Current production frontend (Shadcn/UI) - [See frontend_new/CLAUDE.md](./frontend_new/CLAUDE.md)
- **Legacy Frontend**: `frontend/` - Previous version (deprecated)
- **Backend**: `backend/` - FastAPI services - [See backend/CLAUDE.md](./backend/CLAUDE.md)

## Quick Start

### Full Stack Development
```bash
# Quick start both services
./start_new.sh    # Uses frontend_new + backend

# Check service status
./status_new.sh

# Stop services
./stop_new.sh
```

## Important Notes

1. **Frontend_new is active** - frontend/ is deprecated
2. **All commits** must follow conventional commits format in English
3. **i18n required** - All UI components must support both Chinese and English
4. **Detailed development rules** are found in the respective CLAUDE.md files in each directory

## Development Specifics

For detailed development rules, API documentation, and setup instructions, see:
- [Frontend Development Guide](./frontend_new/CLAUDE.md)
- [Backend Development Guide](./backend/CLAUDE.md)