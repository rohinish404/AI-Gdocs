# Docs0 - Google Docs Clone with AI

<!-- Demo section - placeholder for video/gif -->
## Demo
*Demo video/screenshots coming soon*

---

A powerful, feature-rich Google Docs clone built with modern web technologies. Docs0 combines real-time collaborative document editing with AI-powered writing assistance, providing a seamless and intelligent document creation experience.

## Key Features

### Core Functionality
- **Rich Text Editor**: Full-featured document editing with TipTap/ProseMirror
- **Real-time Collaboration**: Live document synchronization across users
- **AI Writing Assistant**: Cursor-like AI sidebar for content generation and editing
- **Document Templates**: Pre-built templates for various document types
- **DOCX Import/Export**: Upload and download Microsoft Word documents
- **Search & Discovery**: Full-text search across all documents
- **User Authentication**: Secure user management with Clerk

### 🤖 AI Features
- **Context-aware Suggestions**: AI understands document context for relevant suggestions
- **Multiple AI Models**: Support for various AI providers (Groq, OpenAI, Anthropic, Google)
- **Smart Content Generation**: Generate and edit content based on selected text
- **Visual Diff Interface**: See changes before applying AI suggestions

### Editor Capabilities
- **Advanced Formatting**: Text styling, colors, fonts, alignment
- **Tables & Lists**: Create complex document structures
- **Images & Media**: Insert and resize images
- **Custom Extensions**: Font size, line height, and highlighting controls
- **Task Lists**: Interactive checkboxes and to-do items

## Tech Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Components**: Radix UI + shadcn/ui
- **State Management**: Zustand
- **Package Manager**: pnpm

### Backend & Infrastructure
- **Database & Real-time**: Convex (serverless backend)
- **Authentication**: Clerk
- **AI Integration**: Vercel AI SDK with multiple providers
- **File Processing**: mammoth (DOCX parsing), docx (DOCX generation)

### Editor Technology
- **Rich Text Engine**: TipTap (ProseMirror-based)
- **Custom Extensions**: Font controls, selection highlighting, AI suggestions
- **Document Format**: JSON-based document structure

## Architecture

### Project Structure
```
src/
├── app/
│   ├── (home)/              # Dashboard with templates and documents
│   └── documents/[id]/      # Document editor interface
├── components/
│   ├── ui/                  # shadcn/ui components
│   └── [feature-components] # Custom components
├── extensions/              # Custom TipTap extensions
├── hooks/                   # Reusable React hooks
├── store/                   # Zustand state management
└── lib/                     # Utilities and configurations

convex/
├── schema.ts                # Database schema
├── documents.ts             # Document CRUD operations
├── ai.ts                    # AI integration
└── auth.config.ts           # Authentication setup
```

### Key Design Patterns
- **Server Components**: Leveraging Next.js 15 for optimal performance
- **Real-time Updates**: Convex provides instant document synchronization
- **Custom TipTap Extensions**: Modular editor functionality
- **State Management**: Zustand stores for client-side state
- **Type Safety**: Full TypeScript coverage with Convex-generated types

## Getting Started

### Prerequisites
- Node.js 18+ (recommended: use the latest LTS version)
- pnpm (preferred package manager)
- Convex account for backend services
- Clerk account for authentication

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/docs0.git
   cd docs0
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up Convex backend**
   ```bash
   # Install Convex CLI globally
   npm install -g convex

   # Initialize Convex
   npx convex dev
   ```

4. **Configure environment variables**

   Create `.env.local`:
   ```env
   # Convex
   CONVEX_DEPLOYMENT=your-convex-deployment
   NEXT_PUBLIC_CONVEX_URL=https://your-convex-url

   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
   CLERK_SECRET_KEY=your-clerk-secret-key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/
   NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/
   ```

   Configure Convex environment variables:
   ```bash
   npx convex env set GROQ_API_KEY your-groq-api-key
   # Add other AI provider keys as needed
   ```

5. **Deploy database schema**
   ```bash
   npx convex push
   ```

6. **Start development server**
   ```bash
   pnpm dev
   ```

7. **Access the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser

### Additional Setup (Optional)

**AI Models Configuration**: The app supports multiple AI providers. Configure your preferred models in `src/config/models.ts` and ensure corresponding API keys are set in Convex environment.

**Clerk Authentication**: Set up your Clerk application with the appropriate redirect URLs and authentication methods.

## Usage

1. **Create Account**: Sign up using Clerk authentication
2. **Choose Template**: Select from available document templates or start blank
3. **Edit Document**: Use the rich text editor with full formatting capabilities
4. **AI Assistance**: Select text and use the AI sidebar for content suggestions
5. **Export**: Download documents as DOCX files when needed
6. **Collaborate**: Share documents for real-time collaboration

## Development Commands

```bash
# Development with Turbopack
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint

# Convex development
npx convex dev

# Deploy Convex functions
npx convex deploy
```

## Highlights for Recruiters

### Technical Excellence
- **Modern Stack**: Next.js 15, React 19, TypeScript for cutting-edge development
- **Real-time Architecture**: Convex backend enabling instant collaboration
- **AI Integration**: Multi-provider AI system with context-aware suggestions
- **Custom Extensions**: Built custom TipTap extensions for enhanced functionality
- **Type Safety**: Comprehensive TypeScript usage with generated types

### Code Quality
- **Component Architecture**: Well-structured, reusable components with shadcn/ui
- **State Management**: Clean state architecture with Zustand
- **Performance**: Optimized with Next.js 15 features and Turbopack
- **Developer Experience**: Excellent DX with TypeScript, hot reload, and modern tooling

### Features Complexity
- **Document Processing**: DOCX import/export with format preservation
- **Real-time Sync**: Complex state synchronization across multiple users
- **AI Context Management**: Sophisticated context extraction and management
- **Custom Editor**: Extended TipTap with custom nodes and functionality
- **Multi-tenancy**: User isolation and document ownership

### Production Ready
- **Authentication**: Secure user management with Clerk
- **Scalable Backend**: Serverless architecture with Convex
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
