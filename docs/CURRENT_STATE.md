# RepoViva Current State Audit

## Architecture
- **Framework:** Next.js 16.3.7 (App Router, Turbopack)
- **Database / Auth:** Supabase (Auth, PostgreSQL)
- **AI Model:** OpenRouter (currently `gpt-4o-mini` by default)
- **GitHub Ingestion:** Direct REST API calls via `axios` in `/lib/github.ts`

## Working Features
- GitHub OAuth login (using `@supabase/ssr`).
- Dashboard UI structure.
- Basic GitHub Repository ingestion: URL is parsed, file tree is fetched via GitHub API, and up to 40 files are downloaded.
- Basic AI Analysis: The fetched files and metadata are passed into a single prompt to OpenRouter, returning a JSON structure summarizing the architecture.
- Chat MVP: A simple `api/interview/chat` route processes the AST-based analysis and generates questions/feedback in a sequence up to 5 questions.
- Projects are saved to the `projects` table in Supabase.

## Broken Features
- **Build Failure:** `npm run build` fails on static generation for `/login/page.tsx` due to a missing `<Suspense>` boundary around `useSearchParams()` (a Next.js 15 breaking change).
- **Linting:** `npm run lint` hangs or fails silently.
- **Project Files/Memory limitations:** `api/analyze/route.ts` creates entries in `project_files` with `content_hash: 'raw'` but does not save chunks, evidence, or actual embeddings. The `analysis_json` column is overloaded to hold everything.

## Missing Environment Variables
- In production, we are missing validation for:
  - `OPENROUTER_API_KEY`
  - `GITHUB_TOKEN` (used for increasing API rate limits)
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- A proper `.env.example` file needs to be updated with `AI_MOCK_MODE=false`.

## Database Assumptions
- The database schema `20260930_init_schema.sql` defines robust tables (`project_chunks`, `project_evidence`, `project_topics`, `interview_reports`, etc.), but the current code does not use them.
- RLS is defined in the schema but relies on `auth.uid() = user_id`, which is working well for basic access control, though evidence/chunks logic is absent in the app code.

## Known Technical Debt
- **Missing Embeddings/pgvector:** The AI logic relies on dumping the entire AST/file JSON into one LLM prompt instead of utilizing `project_chunks`, vector embeddings, and RAG retrieval.
- **Hardcoded Prompts in Code:** Prompts are hardcoded directly into `src/lib/openrouter.ts` instead of a versioned `/prompts` folder.
- **Synchronous Analysis:** The `/api/analyze` route fetches from GitHub and queries OpenRouter synchronously, making it extremely vulnerable to timeouts.
- **No Rate Limiting:** The API endpoints lack rate limiting.

## Test Status
- **Tests:** No test files exist. `vitest` is in `package.json`, but there is no test script and no integration/e2e tests defined.
