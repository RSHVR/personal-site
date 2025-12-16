# personal-site

Personal portfolio website for Arshveer Gahir. Built with SvelteKit and deployed on Cloudflare Workers.

## Features

- **AI Chat Assistant** - Claude-powered chat on the contact page using [embeddable-chatbot](https://github.com/RSHVR/embeddable-chatbot)
- **Persistent Chat Sessions** - Chat history stored in Supabase
- **Cloudflare Workers** - Edge deployment for fast global access
- **TailwindCSS v4** - Modern styling with forms and typography plugins
- **MDsveX** - Markdown support in Svelte components

## Pages

- `/` - Home page
- `/projects` - Projects showcase
- `/resume` - Resume/CV
- `/contact` - AI chat assistant
- `/faq` - Frequently asked questions
- `/how-do-you-say` - Name pronunciation guide
- `/ruh` - Ruh project page

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Run tests
pnpm test

# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

## Environment Variables

```bash
# Required for AI chat
ANTHROPIC_API_KEY=sk-ant-...

# Required for chat persistence
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SECRET_KEY=your-secret-key

# Optional for database features
DATABASE_URL=postgres://...
```

For Cloudflare Workers deployment, set these as secrets:

```bash
wrangler secret put ANTHROPIC_API_KEY
wrangler secret put SUPABASE_URL
wrangler secret put SUPABASE_SECRET_KEY
```

## Database Schema

Chat persistence uses Supabase with this schema:

```sql
CREATE TABLE chats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL UNIQUE,
  messages JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_chats_session_id ON chats(session_id);
```

## Tech Stack

- **Framework**: SvelteKit 2 with Svelte 5
- **Styling**: TailwindCSS v4
- **Database**: PostgreSQL with Drizzle ORM, Supabase for chat
- **Deployment**: Cloudflare Workers
- **AI**: Anthropic Claude via embeddable-chatbot
- **Testing**: Vitest with Testing Library

## Project Structure

```
src/
├── lib/
│   ├── components/     # Reusable Svelte components
│   ├── server/         # Server-side code
│   │   ├── db/         # Drizzle ORM schema and connection
│   │   └── supabase.ts # Chat persistence
│   └── styles/         # Global styles
├── routes/
│   ├── api/
│   │   └── chat/       # Chat API endpoints
│   ├── contact/        # AI chat page
│   └── ...             # Other pages
└── app.html
```

## Requirements

- Node.js 20.18.1+
- pnpm 10.18.3+
- Anthropic API key (for chat)
- Supabase project (for chat persistence)

## License

Private
