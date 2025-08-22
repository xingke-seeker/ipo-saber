# CLAUDE.md - Frontend

This file provides guidance to Claude Code for frontend development in the `frontend_new/` directory.

## Frontend Overview

Next.js 15 application with App Router, React 19, TypeScript 5, and Shadcn/UI for WeChat Article Analyzer.

## Development Rules

- **Framework**: Use **Next.js** App Router (`/app` directory), following its routing and layout conventions.
- **Language**: **TypeScript**. Write explicit type definitions for all component Props and functions.
- **UI & Styling**:
    - **UI Library**: Primary use of **Shadcn/UI**. When new components are needed, prefer adding them via CLI rather than manual creation.
    - **CSS**: Use **Tailwind CSS** for atomic styling development. Avoid writing traditional CSS files.
    - **Components**: Reusable small components go in the shared components directory, page-level large components go in the app-specific components directory.
- **State Management**:
    - Client-side state prioritizes React Hooks (e.g., `useState`, `useContext`).
    - Server-side state (API requests, caching, synchronization) must use **TanStack Query (React Query)**. Use `useQuery` and `useMutation` to manage data interaction with the backend.
- **Code Style**: Follow community-standard React and TypeScript best practices, such as functional components, Hooks rules, etc.
- **i18n**: All UI components must support both Chinese and English.
- **Language**: All commit messages must be in English

## Development Commands

```bash
# Install dependencies (uses pnpm as lockfile indicates)
# Install pnpm if not available: npm install -g pnpm
pnpm install

# Development server
pnpm run dev

# Build
pnpm run build

# Lint
pnpm run lint
```

## Directory Structure

- `/app` - Next.js App Router pages and layouts
- `/components` - Reusable UI components
- `/lib` - Utility functions and shared logic
- `/hooks` - Custom React hooks
- `/types` - TypeScript type definitions