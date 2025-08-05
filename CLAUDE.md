# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Google Docs clone called "Gdocs AI" built with Next.js 15, React 19, TypeScript, and Convex for the backend. The application features rich text editing using TipTap, AI-powered writing assistance, and real-time document collaboration.

## Key Architecture Components

### Tech Stack
- **Frontend**: Next.js 15 with App Router, React 19, TypeScript
- **Styling**: Tailwind CSS 4, Radix UI components, shadcn/ui
- **Editor**: TipTap (ProseMirror-based rich text editor)
- **Backend**: Convex (real-time database and serverless functions)
- **Authentication**: Clerk
- **AI Integration**: OpenAI-compatible API via Groq (using Kimi model)
- **State Management**: Zustand stores
- **Package Manager**: pnpm

### Application Structure

#### Frontend Routes
- **Home Page** (`src/app/(home)/page.tsx`): Document dashboard with templates gallery and documents table
- **Document Editor** (`src/app/documents/[documentId]/page.tsx`): Individual document editing interface

#### Core Features
1. **Document Management**: Create, read, update, delete documents via Convex mutations/queries
2. **Rich Text Editing**: TipTap editor with formatting, tables, images, and custom extensions
3. **AI Sidebar**: Context-aware AI assistance for writing and editing (Cursor-like chat interface)
4. **Templates**: Pre-built document templates for different use cases
5. **Search**: Full-text search across document titles
6. **Real-time Updates**: Convex provides real-time synchronization

#### Data Layer (Convex)
- **Schema** (`convex/schema.ts`): Documents table with title, content, owner, and timestamps
- **Documents API** (`convex/documents.ts`): CRUD operations, search, pagination
- **AI API** (`convex/ai.ts`): Integration with AI model for content generation/editing

#### State Management
- **AI Sidebar Store** (`src/store/use-aisidebar-store.ts`): Manages AI sidebar state and context
- **Editor Store** (`src/store/use-editor-store.ts`): Editor-specific state
- **Saving Store** (`src/store/use-saving-store.ts`): Document save status

#### Custom TipTap Extensions
- Font size control (`src/extensions/font-size.ts`)
- Line height control (`src/extensions/line-height.ts`)
- Selection highlighting (`src/extensions/highlight-selection.ts`)
- AI suggestion nodes (`src/extensions/suggestion-node.ts`)

## Development Commands

```bash
# Development server with Turbopack
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

## Environment Setup

The project requires several environment variables:
- Convex configuration for database and auth
- Clerk authentication keys
- GROQ_API_KEY for AI functionality (configured in Convex environment)

Convex handles most backend operations, so ensure you have Convex CLI configured and the database schema deployed.

## Key Patterns

### Document Operations
- All document operations go through Convex mutations/queries
- Authentication is handled at the Convex level using Clerk tokens
- Documents are owned by users and include real-time updates

### AI Integration
- AI requests are processed through Convex actions (`convex/ai.ts`)
- The system uses a structured prompt with HTML context for content modifications
- AI responses are JSON formatted with content and explanation fields
- Integration uses Groq API with Kimi model (OpenAI-compatible interface)

### Editor Architecture
- TipTap provides the rich text editing foundation
- Custom extensions handle specific formatting needs
- Editor state is managed through Zustand stores
- Real-time collaboration is handled via Convex

### Component Organization
- UI components use shadcn/ui and Radix primitives
- Document-specific components are in `/documents/[documentId]/` route directory
- Shared components in `/components/` directory
- Custom hooks in `/hooks/` directory

## Testing

No specific test commands are configured in package.json. Check for test files or add testing setup as needed.