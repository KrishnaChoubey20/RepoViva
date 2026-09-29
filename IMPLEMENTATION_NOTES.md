# Implementation Notes

## Architecture Decision: Full-Stack Next.js

The PRD suggested a Python/FastAPI backend and a Next.js frontend. However, the local environment where this MVP is being developed does not have Python installed. 

To ensure the application can be run locally and to streamline deployment, I have chosen to build the entire MVP as a full-stack Next.js application using Next.js API Routes (Server Actions / App Router API). 

This approach still adheres to the PRD's requirement to keep API keys server-side (Next.js server-side handles this perfectly) and maintains all required endpoints without needing a separate backend service.

## Limitations & Simplifications

1. **GitHub Ingestion**: We rely strictly on the public GitHub REST API. Large repositories might hit rate limits faster if a `GITHUB_TOKEN` is not provided. We limit the number of files ingested and skip binary/irrelevant directories.
2. **Supabase Persistence**: The MVP works gracefully even if Supabase variables are missing, by running in memory during the session. When Supabase is configured, it persists projects, sessions, and turns.
3. **OpenRouter**: We expect structured JSON output. If the model fails to return valid JSON, the application attempts to gracefully handle the error.
