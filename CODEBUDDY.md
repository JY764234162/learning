# CODEBUDDY.md This file provides guidance to CodeBuddy Code when working with code in this repository.

## Project Overview

This is a learning repository showcasing modern frontend web development techniques with React, TypeScript, and various web APIs. The project is organized as a monorepo using pnpm workspaces with multiple packages focusing on different aspects of web development.

## Workspace Structure

- **packages/web**: Main frontend application with React demos
- **packages/utils**: Shared utility library
- **others/backend**: Express.js backend for API demos
- **others/node-test**: Node.js testing experiments
- **others/test-rollup**: Rollup bundler testing

## Development Commands

### Root Level Commands
- `pnpm dev` - Start development server for web package
- `pnpm build` - Build the web application
- `pnpm preview` - Preview built web application
- `pnpm format` - Format code using prettier

### Web Package Commands (packages/web)
- `pnpm dev` - Start Vite development server
- `pnpm dev:prod` - Start development server in production mode
- `pnpm build` - Build with TypeScript compilation and Vite bundling
- `pnpm lint` - Run ESLint
- `pnpm preview` - Preview production build
- `pnpm format` - Format code with prettier

### Backend Commands (others/backend)
- `pnpm dev` - Start Express.js server

## Architecture

### Frontend Architecture (packages/web)

The frontend application uses a modular architecture with the following key components:

- **Entry Point**: `src/main.tsx` sets up the application with plugins and providers
- **App Structure**: `src/App.tsx` wraps the app with context providers (Theme, Antd, App)
- **Routing**: Uses React Router v6 with configurable routing modes (hash/history/memory)
- **State Management**: Redux toolkit for global state, with additional context providers
- **Plugin System**: Modular initialization in `src/plugins/` for app setup

### Key Directories

- `src/pages/`: Demo pages showcasing different frontend techniques
- `src/components/`: Reusable components
- `src/context/`: React context providers
- `src/store/`: Redux store and state management
- `src/router/`: Routing configuration
- `src/plugins/`: App initialization plugins
- `src/types/`: TypeScript type definitions
- `src/Layout/`: Layout components

### Demo Pages

The application contains numerous demo pages showcasing:
- Canvas operations (image processing, pixelation, watermarking)
- React features (Suspense, state management, error boundaries)
- Interactive components (drag & drop, lazy loading)
- Browser APIs (notifications, file processing)
- Visualization tools (charts, 3D graphics)

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Libraries**: Ant Design, Arco Design, Radix UI
- **Styling**: Tailwind CSS, Sass
- **State Management**: Redux Toolkit, Zustand, Jotai, Recoil
- **Routing**: React Router v6
- **Build Tools**: Vite, TypeScript, ESLint, Prettier
- **Package Manager**: pnpm with workspaces

## Environment Configuration

The project supports multiple routing modes via environment variables:
- `VITE_ROUTE_MODE`: Set to 'hash', 'history', or 'memory'
- `VITE_BASENAME`: Base path for the application

## Development Notes

- Use pnpm for package management (configured in pnpm-workspace.yaml)
- The web package references utils with `workspace:*` protocol
- Backend is a separate Express.js application for API demos
- No test framework is currently configured in the main packages
- The project uses Changesets for version management