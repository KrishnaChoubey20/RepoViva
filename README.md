# RepoViva MVP

RepoViva helps students prepare to explain and defend their own software projects in interviews. Provide a public GitHub repository, get a project map, and practice answering targeted interview questions.

## Architecture

This MVP is built as a **Full-Stack Next.js Application**.
Due to host environment constraints, the originally proposed Python/FastAPI backend was combined into Next.js API routes. This ensures easy local setup and seamless Vercel deployment while retaining all PRD requirements.
- **Frontend**: Next.js App Router (React), Tailwind CSS, Framer Motion.
- **Backend**: Next.js Serverless API routes.
- **AI**: OpenRouter API.
- **Database**: Supabase (with an in-memory fallback for immediate demo usage if keys are not provided).

## Setup Instructions

1. **Install Dependencies**
   Navigate to the `frontend` directory:
   ```bash
   cd frontend
   npm install
   ```

2. **Environment Variables**
   Copy `.env.example` to `frontend/.env.local` and fill in the values:
   - `OPENROUTER_API_KEY`: Required.
   - `OPENROUTER_MODEL`: Defaults to `anthropic/claude-3.5-sonnet:beta`.
   - `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`: Optional. If provided, data is persisted. If not, data is kept in memory.
   - `GITHUB_TOKEN`: Optional, used to increase rate limits when analyzing repositories.

3. **Supabase Database (Optional)**
   If using Supabase, run the SQL script found in `supabase_schema.sql` in your Supabase SQL Editor to create the required tables and policies.

## Running Locally

Run the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## Testing

Run unit tests (Vitest):
```bash
npx vitest run
```

## Known Limitations

- Only analyzes text files from public GitHub repositories.
- File limits apply (max 40 files, total 500KB) to ensure prompt sizes stay within reasonable limits.
- The in-memory fallback database will lose session data when the development server restarts.
- Does not execute code or clone repositories fully (reads via GitHub REST API).
