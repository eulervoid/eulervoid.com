# Agent Guide: eulervoid.com

This repository contains the source code for the personal website of eulervoid, built with **TanStack Start** (React), **Vite** and **Tailwind CSS**.

## Essential Commands

- `bun run dev`: Start the development server (port 3000)
- `bun run build`: Build the project for production and run type checks
- `bun run check`: Run typecheck, formatter and linter

> **Note**: The project uses `bun` as the preferred package manager.

## Code Organization

- `src/routes/`: TanStack Router file-based routes.
    - `__root.tsx`: The root layout.
    - `index.tsx`: The home page containing Hero, Work, and Timeline sections.
- `src/components/`: React components.
- `src/data/`: Static data for the site (resume, work entries).
- `src/shaders/`: Custom GLSL shaders.
- `src/styles/`: global CSS and Tailwind configurations.
- `src/utils/`: Utility functions and middleware.
- `public/`: Static public assets
- `assets/`: Static assets imported via vite, e.g. images that will be optimized on build

## Tech Stack & Patterns

### Frameworks

- **TanStack Start**: Used for routing and SSR/Streaming.
- **React 19**: Using the latest React features.
- **React Three Fiber (@react-three/fiber)**: For 3D elements and canvas-based rendering.
- **Tailwind CSS 4**: For styling using the `@tailwindcss/vite` plugin.

### Key Patterns

- **File-based Routing**: Routes are defined in `src/routes`.
- **Damping & Motion**: Use `motion` (formerly framer-motion) for animations.
- **Data-Driven**: Content for "Work" and "Timeline" is managed in `src/data/*.ts`.
- **Absolute Imports**: Uses `@src/` and `@assets/` aliases to refer to `src/` and `assets/` (configured in `tsconfig.json`).

## Important Gotchas

- **Generated Routes**: `src/routeTree.gen.ts` is automatically managed by TanStack Router. Do not edit it manually.

## Styling Conventions

- Uses Tailwind CSS 4 utility classes.
- Shared spacing patterns often use custom classes like `section` and `section-px` (defined in `src/styles/`).
- Mobile-first approach is followed using Tailwind's `md:` and other breakpoints.
- Pixel-art aesthetic: Often uses `NearestFilter` for textures and custom pixelation shaders.

## Testing

There are not tests configured.
