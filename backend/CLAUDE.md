# CLAUDE.md - Backend

This file provides guidance to Claude Code for backend development in the `backend/` directory.

## Backend Overview

Python FastAPI application with async/await for all I/O operations, Playwright for web scraping, and multi-model LLM integration.

## Development Rules

- **Framework**: FastAPI with async/await for all I/O operations
- **Data Models**: Pydantic for all request/response validation
- **Web Scraping**: Playwright for WeChat article extraction
- **AI Integration**: Multi-model factory pattern supporting Qwen (current), Gemini, and future LLM APIs
- **Configuration**: Environment variables only, no hardcoded secrets
- **Model Registry**: Factory pattern allows easy addition of new LLM providers
- **Testing**: Use `pytest-asyncio` for async testing

## Core Modules

- **Entry**: `app/main.py` - FastAPI app initialization
- **API**: `app/api/v1/endpoints/analysis.py` - RESTful analysis endpoint
- **Services**:
  - `scraper_service.py` - Playwright-based WeChat article extraction
  - `ai_service.py` - Core AI service layer
  - `ai_factory.py` - Multi-model factory pattern (supports Qwen, Gemini, OpenAI, Claude)
  - `qwen_service.py` - Qwen model implementation (current)
  - `base_ai_model.py` - Abstract base class for all LLM providers
- **Schemas**: `schemas/analysis.py` - Pydantic data models
- **Config**: `core/config.py` - Environment variable management

## Development Commands

```bash
# Install dependencies
pip3 install -r requirements.txt

# Development server
python3 -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Alternative from project root
PYTHONPATH=. python3 -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Tests
python3 -m pytest -s tests/
python3 -m pytest -s tests/test_scraper_service.py
python3 -m pytest -s tests/test_ai_service.py
```

## Environment Variables

Required environment variables:
- `DASHSCOPE_API_KEY` - Alibaba DashScope API key (for Qwen - current)
- `GEMINI_API_KEY` - Google Gemini API key (for future Gemini support)
- `OPENAI_API_KEY` - OpenAI API key (for future OpenAI support)
- `ANTHROPIC_API_KEY` - Anthropic API key (for future Claude support)

## API Endpoints

- **POST** `/api/v1/analysis` - Analyze WeChat article
  - Request: `{ "url": "wechat_article_url" }`
  - Response: `{ core_arguments, argument_analysis, critical_questions, key_quotes }`

## Multi-Model Support Architecture

**Current Setup**: Qwen via DashScope API
**Extensibility**: Factory pattern allows easy addition of new LLM providers

### Adding New LLM Providers:
1. Create new service file in `app/services/` (e.g., `gemini_service.py`, `openai_service.py`)
2. Extend `base_ai_model.py` abstract class
3. Register in `ai_factory.py` with model name mapping
4. Add corresponding environment variable and API key
5. Update prompt templates as needed for different model characteristics