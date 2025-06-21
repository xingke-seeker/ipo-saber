# AI 辅助开发规则

本规则旨在指导 AI (Cursor) 更高效、更准确地辅助本项目开发。

## 1. 项目总体认知

- **项目类型**: 这是一个前后端分离的Web应用，采用单体仓库 (Monorepo) 结构进行管理。
- **目录结构**:
    - `frontend/`: 存放所有前端代码，基于 Next.js 和 React。
    - `backend/`: 存放所有后端代码，基于 Python 和 FastAPI。
- **核心功能**: 用户输入一个URL，后端抓取文章内容并使用 Gemini AI进行分析，然后将结果返回给前端展示。
- **主要语言**: 前端使用 **TypeScript**，后端使用 **Python**。

## 2. 前端开发规则 (frontend/)

- **框架**: 使用 **Next.js** App Router (`/app` 目录)，请遵循其路由和布局规范。
- **语言**: **TypeScript**。请为所有组件的 Props 和函数编写明确的类型定义。
- **UI & 样式**:
    - **UI库**: 主要使用 **Shadcn/UI**。需要新组件时，请优先通过其CLI添加，而不是手动创建。
    - **CSS**: 使用 **Tailwind CSS** 进行原子化样式开发。避免编写传统的 CSS 文件。
    - **组件**: 可复用的小组件放在 `frontend/components/`，页面级的大型组件放在 `frontend/app/(components)/`。
- **状态管理**:
    - 客户端状态优先使用 React Hooks (如 `useState`, `useContext`)。
    - 服务端状态（API请求、缓存、同步）必须使用 **TanStack Query (React Query)**。请使用 `useQuery` 和 `useMutation` 来管理与后端的数据交互。
- **代码风格**: 遵循社区通用的 React 和 TypeScript 最佳实践，例如函数式组件、Hooks规则等。

## 3. 后端开发规则 (backend/)

- **框架**: 使用 **FastAPI**，请充分利用其 **依赖注入** 和 **自动生成的API文档** 功能。
- **语言**: **Python 3.9+**，请使用类型提示 (Type Hinting)。
- **数据模型**:
    - 所有API的请求体和响应体都必须使用 **Pydantic** 模型来定义 (`backend/app/schemas/`)。这能确保数据验证和API文档的准确性。
- **异步编程**: 核心业务逻辑，特别是I/O密集型操作（如调用外部API、网页抓取），**必须** 使用 `async/await` 语法。
- **网页抓取**: 使用 **Playwright** 库 (`backend/app/services/scraper_service.py`) 来进行文章内容的抓取。
- **AI集成**: 调用 Google Gemini API 的逻辑应封装在 `backend/app/services/ai_service.py` 中。
- **配置管理**: 敏感信息（如 API Keys）和环境配置应通过 `backend/app/core/config.py` 读取环境变量，**严禁硬编码**。
- **依赖管理**: 所有Python包都应记录在 `backend/requirements.txt` 文件中。

## 4. 开发与协作规则

- **Git提交**: 遵循 [Conventional Commits](https.www.conventionalcommits.org/) 规范编写提交信息（例如: `feat(frontend): add analysis form`）。
- **API设计**: 后端API应遵循 RESTful 风格。
- **调试**:
    - 前端问题使用 **Chrome DevTools**。
    - 后端问题利用 **FastAPI 的交互式文档** (`/docs`) 进行API调试。
- **AI 协作**:
    - 当你需要我生成代码时，可以简单地说"帮我实现XXX功能"，我会参考上述规则进行。
    - 当你需要我修改代码时，请使用 `@` 符号引用相关文件或代码片段。

---
*本规则由 AI 根据 `design.md` 文件生成，可随时进行修改和完善。* 