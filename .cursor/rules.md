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

### 2.1 前端依赖组件及版本（务必保持一致）

> 以下依赖版本来自 `frontend/package.json`，如需升级请全员同步并更新本规则。

- next: 15.3.4
- react: ^19.0.0
- react-dom: ^19.0.0
- @radix-ui/react-label: ^2.1.7
- @radix-ui/react-separator: ^1.1.7
- @radix-ui/react-slot: ^1.2.3
- @radix-ui/react-tabs: ^1.1.12
- class-variance-authority: ^0.7.1
- clsx: ^2.1.1
- lucide-react: ^0.522.0
- tailwind-merge: ^3.3.1
- tailwindcss-animate: ^1.0.7

**开发依赖：**
- @eslint/eslintrc: ^3
- @tailwindcss/postcss: ^4
- @types/node: ^20
- @types/react: ^19
- @types/react-dom: ^19
- eslint: ^9
- eslint-config-next: 15.3.4
- tailwindcss: ^4
- tw-animate-css: ^1.3.4
- typescript: ^5

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

### 3.1 后端核心模块及说明（务必保持结构与规范）

- **API 路由层**：负责定义 RESTful API 接口，进行参数校验、权限控制、调度服务层。每个功能独立 endpoint，便于扩展和维护。
- **数据模型（Schemas）**：使用 Pydantic 定义所有请求体和响应体，自动数据校验与文档生成，保证类型安全。
- **服务层（Services）**：封装核心业务逻辑，包括公众号文章抓取（Playwright 实现）、AI分析（多模型工厂模式）、AI模型适配等，API 层只负责调度。
- **AI模型工厂与适配层**：统一AI模型接口，支持多模型注册与动态选择，便于后续扩展不同大模型。
- **配置管理（Config）**：集中管理环境变量和敏感信息，保障安全，便于多环境切换。
- **依赖与测试体系**：所有依赖集中管理，单元测试覆盖抓取与AI分析核心流程，保障代码质量。

#### 主要代码文件清单

- main.py：FastAPI 应用入口，负责应用启动、路由注册、全局中间件等。
- api/v1/endpoints/analysis.py：分析接口路由，负责接收前端请求、参数校验、调度服务层。
- schemas/analysis.py：Pydantic 数据模型，定义请求体与响应体结构，自动校验与文档。
- services/scraper_service.py：公众号文章抓取服务，基于 Playwright 异步实现，负责获取正文内容。
- services/ai_service.py：AI分析服务，封装大模型（如Qwen、Gemini）API调用逻辑。
- services/ai_factory.py：AI模型工厂，支持多模型注册与动态选择，便于扩展。
- services/base_ai_model.py：AI模型统一接口基类，规范各模型实现。
- services/qwen_service.py：Qwen大模型服务实现，负责Qwen API对接与结果解析。
- core/config.py：配置与环境变量管理，集中读取API Key等敏感信息，保障安全。

## 4. 开发与协作规则

- **Git提交**: 遵循 [Conventional Commits](https.www.conventionalcommits.org/) 规范编写提交信息（例如: `feat(frontend): add analysis form`）。
- **所有 commit message 必须使用英文。**
- **API设计**: 后端API应遵循 RESTful 风格。
- **调试**:
    - 前端问题使用 **Chrome DevTools**。
    - 后端问题利用 **FastAPI 的交互式文档** (`/docs`) 进行API调试。
- **AI 协作**:
    - 当你需要我生成代码时，可以简单地说"帮我实现XXX功能"，我会参考上述规则进行。
    - 当你需要我修改代码时，请使用 `@` 符号引用相关文件或代码片段。

---
*本规则由 AI 根据 `design.md` 文件生成，可随时进行修改和完善。*

## 5. 里程碑记录（2024-06）

### 5.1 前端项目可正常运行

#### 核心知识点总结

1. **技术栈与架构**
   - 使用 Next.js（App Router）+ React 19 进行前端开发，支持服务端渲染和现代路由。
   - 采用 TypeScript 全面类型约束，提升代码健壮性和可维护性。
   - UI 组件体系基于 Shadcn UI v4（源码生成模式），结合 Radix UI 组件和 Tailwind CSS 原子化样式。
   - 状态管理采用 React Hooks（本地）+ TanStack Query（服务端数据交互）。
   - 依赖版本已固化，团队开发环境高度一致。

2. **开发规范**
   - 组件开发优先通过 Shadcn CLI 生成，统一风格和可维护性。
   - 复用型 UI 组件集中于 `frontend/components/ui/`，页面级组件在 `frontend/app/(components)/`。
   - 严格遵循 TypeScript 类型定义和 React 最佳实践。
   - 样式全部采用 Tailwind CSS，无传统 CSS 文件。

#### 核心组件清单

- `Button`、`Input`、`Label`、`Textarea`、`Tabs`、`Alert`、`Badge`、`Card`、`Separator` 等，均为 Shadcn UI 标准组件，位于 `components/ui/`。
- 页面主功能组件：
  - `analysis-form.tsx`：用户输入与分析表单
  - `report-display.tsx`：AI 分析报告展示

#### 里程碑意义

- 前端项目已实现**完整启动、页面渲染、核心交互与组件体系搭建**，为后续功能扩展和团队协作打下坚实基础。
- 依赖与规范已固化，便于新成员快速上手和团队长期维护。

### 5.2 后端项目可正常运行

#### 核心知识点总结

1. **技术栈与架构**
   - 使用 FastAPI 进行后端开发，支持依赖注入和自动生成的API文档。
   - 采用 Python 3.9+ 进行后端开发，使用类型提示 (Type Hinting)。
   - 数据模型使用 Pydantic 模型来定义，确保数据验证和API文档的准确性。
   - 异步编程使用 `async/await` 语法，特别是I/O密集型操作（如调用外部API、网页抓取）。
   - AI集成调用 Google Gemini API 的逻辑封装在 ai_service.py 中。
   - 配置管理通过读取环境变量，集中读取API Key等敏感信息，保障安全。
   - 依赖管理记录所有Python包在 requirements.txt 文件中。

2. **开发规范**
   - 后端项目已实现**完整启动、API接口、数据模型与AI集成**，为后续功能扩展和团队协作打下坚实基础。
   - 依赖与规范已固化，便于新成员快速上手和团队长期维护。

#### 核心组件清单

- `main.py`：FastAPI 应用入口，负责应用启动、路由注册、全局中间件等。
- `api/v1/endpoints/analysis.py`：分析接口路由，负责接收前端请求、参数校验、调度服务层。
- `schemas/analysis.py`：Pydantic 数据模型，定义请求体与响应体结构，自动校验与文档。
- `services/scraper_service.py`：公众号文章抓取服务，基于 Playwright 异步实现，负责获取正文内容。
- `services/ai_service.py`：AI分析服务，封装大模型（如Qwen、Gemini）API调用逻辑。
- `services/ai_factory.py`：AI模型工厂，支持多模型注册与动态选择，便于扩展。
- `services/base_ai_model.py`：AI模型统一接口基类，规范各模型实现。
- `services/qwen_service.py`：Qwen大模型服务实现，负责Qwen API对接与结果解析。
- `core/config.py`：配置与环境变量管理，集中读取API Key等敏感信息，保障安全。

## 6. 工具使用注意事项

- 使用 mcp_filesystem 相关工具（如 mcp_filesystem_read_file、mcp_filesystem_write_file）时，**必须传递绝对路径**，即以 `/Users/sunhongyue/work/code/github/ipo-saber/` 为前缀的完整路径，否则会出现"路径超出允许目录"或"Access denied"错误。

--- 