# Agent Guide: eulervoid.com

This repository contains the source code for the personal website of eulervoid, built with **TanStack Start** (React), **Vite**, **Tailwind CSS**, and **React Three Fiber**.

## 🚀 Essential Commands

- `bun dev`: Start the development server (port 3000)
- `bun build`: Build the project for production and run type checks
- `bun start`: Run the production build locally

> **Note**: The project uses `bun` as the preferred package manager.

## 📁 Code Organization

- `src/routes/`: TanStack Router file-based routes.
    - `__root.tsx`: The root layout.
    - `index.tsx`: The home page containing Hero, Work, and Timeline sections.
- `src/components/`: React components.
    - `SimulatedCursor/`: A complex cursor simulation system with its own provider, types, and hooks.
- `src/data/`: Static data for the site (resume, work entries).
- `src/shaders/`: Custom GLSL shaders.
- `src/styles/`: global CSS and Tailwind configurations.
- `src/utils/`: Utility functions and middleware.
- `public/`: Static assets like images, videos, and fonts.
- `sprites/`: Aseprite files used for animations/cursors.

## 🛠 Tech Stack & Patterns

### Frameworks

- **TanStack Start**: Used for routing and SSR/Streaming.
- **React 19**: Using the latest React features.
- **React Three Fiber (@react-three/fiber)**: For 3D elements and canvas-based rendering.
- **Tailwind CSS 4**: For styling using the `@tailwindcss/vite` plugin.

### Key Patterns

- **File-based Routing**: Routes are defined in `src/routes`.
- **Damping & Motion**: Uses `motion` (formerly framer-motion) for animations.
- **Data-Driven**: Content for "Work" and "Timeline" is managed in `src/data/*.ts`.
- **Absolute Imports**: Uses `~/` alias to refer to the `src/` directory (configured in `tsconfig.json`).

## ⚠️ Important Gotchas

- **Vite Polling**: The dev server is configured with `usePolling: true` in `vite.config.ts` to ensure HMR works across different environments.
- **R3F + Shaders**: Custom rendering logic often involves `useFBO` and custom shaders (see `src/components/Pixelate.tsx`).
- **Strict Typing**: The project uses strict TypeScript. Always ensure props and data structures are correctly typed in `types.ts` or inline.
- **Generated Routes**: `src/routeTree.gen.ts` is automatically managed by TanStack Router. Do not edit it manually.

## 🎨 Styling Conventions

- Uses Tailwind CSS 4 utility classes.
- Shared spacing patterns often use custom classes like `section` and `section-px` (defined in `src/styles/`).
- Mobile-first approach is followed using Tailwind's `md:` and other breakpoints.
- Pixel-art aesthetic: Often uses `NearestFilter` for textures and custom pixelation shaders.

## 🧪 Testing

There is currently no automated test suite (Jest/Cypress/Playwright) configured in `package.json`. Manual verification of the dev build is recommended for UI changes.
