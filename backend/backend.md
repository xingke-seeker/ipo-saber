# 后端项目设计文档（FastAPI）

> 本文档结合项目 design.md 及 .cursor/rules.md，系统梳理后端架构、核心模块、开发规范与最佳实践，便于团队协作与长期维护。

---

## 1. 项目定位与目标

- **目标**：为前端提供高效、稳定的 RESTful API，支持微信公众号文章抓取、AI 分析与结构化报告生成。
- **技术栈**：Python 3.9+、FastAPI、Playwright、Pydantic、Google Gemini API。
- **架构风格**：分层解耦（API 路由 / 业务服务 / 数据模型 / 配置管理）。

---

## 2. 目录结构与核心模块

```
backend/
  ├── app/
  │   ├── __init__.py
  │   ├── main.py                # FastAPI 应用入口
  │   ├── api/
  │   │   └── v1/
  │   │       └── endpoints/
  │   │           └── analysis.py # 文章分析相关API
  │   ├── core/
  │   │   └── config.py          # 配置与环境变量管理
  │   ├── schemas/
  │   │   └── analysis.py        # Pydantic数据模型
  │   └── services/
  │       ├── ai_service.py      # Gemini AI 调用逻辑
  │       └── scraper_service.py # Playwright 抓取逻辑
  └── requirements.txt           # 依赖清单
```

### 2.1 API 路由层（Endpoints）
- 位置：`app/api/v1/endpoints/`
- 作用：定义 RESTful API，参数校验、权限控制、调用 service 层。
- 规范：每个功能独立 endpoint 文件，使用 APIRouter。

### 2.2 数据模型（Schemas）
- 位置：`app/schemas/`
- 作用：Pydantic 定义所有请求体/响应体，自动数据校验与文档。
- 规范：字段类型明确，必要时加校验与注释。

### 2.3 业务服务层（Services）
- 位置：`app/services/`
- 作用：封装核心业务逻辑，API 层只负责调度。
- 主要服务：
  - `scraper_service.py`：Playwright 抓取公众号文章内容，异步实现。
  - `ai_service.py`：调用 Google Gemini API，生成结构化分析报告。

### 2.4 配置管理（Config）
- 位置：`app/core/config.py`
- 作用：统一管理环境变量、API Key，禁止硬编码。
- 规范：用 Pydantic BaseSettings，自动读取环境变量。

### 2.5 应用入口（Main）
- 位置：`app/main.py`
- 作用：FastAPI 实例创建、路由注册、中间件配置、启动应用。

### 2.6 依赖管理
- 位置：`requirements.txt`
- 作用：记录所有 Python 依赖，便于环境一致性和部署。

---

## 3. 开发规范与最佳实践

1. **API 设计**
   - 遵循 RESTful 风格，接口语义清晰。
   - 路由函数只做参数校验、权限判断、调用 service 层。
2. **数据模型**
   - 所有请求体、响应体均用 Pydantic 定义，类型准确，必要时加校验。
   - 利用 Pydantic 注释提升自动文档可读性。
3. **服务层**
   - 业务逻辑全部写在 service 层，便于单元测试和复用。
   - Playwright 抓取、AI 调用等 I/O 操作必须用 async/await 实现异步。
4. **配置管理**
   - 用 Pydantic BaseSettings，所有敏感信息和环境变量都通过配置类读取。
   - 配置文件只负责读取和校验，不做业务逻辑。
5. **类型提示**
   - 全项目强制使用 Python 类型提示，提升代码可读性和 IDE 智能提示。
6. **依赖管理**
   - 新增依赖包后，及时更新 requirements.txt，并在提交说明中注明。
7. **文档与注释**
   - 关键函数、类、接口要有 docstring，便于自动生成 API 文档和团队协作。

---

## 4. 典型数据流与调用链

1. 用户通过前端提交微信公众号文章 URL。
2. API 路由层（如 /api/v1/analysis）接收请求，校验参数。
3. 调用 scraper_service 抓取文章纯文本。
4. 调用 ai_service，将文本传递给 Gemini API，获取结构化分析报告。
5. API 层将分析结果返回前端。

---

## 5. 开发流程建议

1. 先设计 API 数据流和 schema，明确输入输出。
2. 编写 service 层的核心逻辑（如抓取、AI 调用），并用 async/await。
3. 编写 endpoint，串联 schema 和 service。
4. 配置好 config，确保本地和生产环境变量一致。
5. 本地用 FastAPI 的 /docs 交互式文档调试接口。
6. 编写单元测试，保证核心逻辑可用。

---

## 6. 里程碑与团队协作

- 目录结构与核心模块已固化，便于团队协作和新成员快速上手。
- 依赖与开发规范已文档化，保证长期可维护性。
- 后续如有重大架构调整或新功能，请及时补充本设计文档。

---

## 7. 启动方式（本地开发）

### 安装依赖

```bash
cd backend
pip install -r requirements.txt
```

### 启动 FastAPI 服务

请在项目根目录（ipo-saber）下运行：

```bash
python3 -m uvicorn backend.app.main:app --reload
```

- `--reload` 支持热重载，开发调试更方便。
- 启动后可通过 http://127.0.0.1:8000/docs 访问自动生成的 API 文档。

---

> 本文档为后端开发的权威参考，建议与 rules.md、design.md 配合查阅。

---

如需进一步细化某一模块的实现细节或代码模板，请随时告知！