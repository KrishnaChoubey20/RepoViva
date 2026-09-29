# RepoViva --- MVP Product Requirements Document

**Document version:** 0.1\
**Status:** Build-ready MVP specification\
**Product name:** RepoViva\
**Suggested repository name:** `repoviva`\
**Tagline:** Your code. Your voice. Your interview.

## 1. Product summary

RepoViva helps students prepare to explain and defend their own software
projects in interviews. A user provides a public GitHub repository URL.
RepoViva inspects selected project files, builds a grounded project
overview, then lets the user practice answering project-specific
interview questions.

The MVP validates the core experience: **can RepoViva understand a real
repository well enough to ask a relevant question and give useful,
evidence-based feedback?**

Voice interaction, advanced agent workflows, private-repository OAuth,
and large-scale indexing are explicitly out of scope for this first
version.

## 2. Problem

Students often build projects by following tutorials or combining
libraries, but struggle to explain: - What the project does and how its
parts fit together. - Why particular technologies or design choices were
used. - Where a feature is implemented in their own code. - How to
respond to follow-up questions in a technical interview.

Generic interview question lists do not use the student's actual
project, so practice can feel disconnected from the work they need to
discuss.

## 3. Target user and primary job

**Primary user:** a student or early-career developer preparing for a
technical interview and wanting to practice explaining a project they
own or have permission to share.

**Primary job:** "Help me understand what is important in my repository,
then practice explaining it with questions based on my actual code."

## 4. MVP goals and non-goals

### Goals

1.  Accept a valid public GitHub repository URL.
2.  Retrieve repository metadata and a safe, limited set of text files.
3.  Produce a concise project map with file-path evidence.
4.  Generate one relevant interview question grounded in the analyzed
    project.
5.  Accept a typed answer and return constructive, specific feedback.
6.  Persist a minimal analysis and practice session in Supabase.
7.  Make errors understandable and allow the user to retry.

### Non-goals for MVP

-   Voice recording, speech-to-text, or text-to-speech.
-   Private GitHub repository access or GitHub OAuth.
-   Executing, installing, or running imported repository code.
-   Full-repository semantic search or vector database requirement.
-   Multiple autonomous agents, complex orchestration, or background job
    infrastructure.
-   Hiring decisions, candidate ranking, or claims that a user is
    job-ready.
-   Public sharing, social features, billing, or mobile-native apps.

## 5. Core user journey

1.  User opens the RepoViva web app.
2.  User pastes a public GitHub repository URL and selects **Analyze
    project**.
3.  The app validates the URL and shows a clear loading state.
4.  Backend fetches repository metadata and selected text files, subject
    to safety and size limits.
5.  The app displays:
    -   Project purpose summary.
    -   Detected language(s) and frameworks, when identifiable.
    -   Key files and their likely responsibilities.
    -   Main components or flow, if supported by evidence.
    -   Uncertainties / areas the analyzer could not determine.
    -   File-path references supporting important claims.
6.  User selects **Practice interview**.
7.  App displays one project-specific question.
8.  User enters a typed answer and submits it.
9.  App displays feedback, what was explained well, what could be
    improved, and a suggested follow-up or next question.
10. User can try another question or return to the project overview.

## 6. Functional requirements

### FR-1: Repository URL input

-   Provide a single input for a GitHub repository URL and an Analyze
    button.
-   Accept standard public repository URL forms such as
    `https://github.com/owner/repo`.
-   Reject malformed URLs and non-GitHub hosts with an actionable
    message.
-   Normalize trailing slashes and optional `.git` suffix where
    practical.
-   Do not accept arbitrary URLs for backend fetching; only fetch
    through GitHub's supported API or a strictly validated GitHub
    endpoint to reduce SSRF risk.

### FR-2: Repository ingestion

-   Use GitHub's public API or another documented, read-only GitHub
    retrieval method.
-   Retrieve repository metadata, README when present, and a bounded
    selection of likely relevant text files.
-   Prioritize common source and configuration files; ignore binary
    files, generated output, dependency directories, `.git`, build
    artifacts, and vendored dependencies.
-   Enforce configurable limits for file count, total bytes, per-file
    bytes, and request time.
-   Show a useful message for private, deleted, empty, rate-limited, or
    inaccessible repositories.
-   Never execute code, install dependencies, or run repository scripts.

### FR-3: Project analysis

-   Use the configured OpenRouter model through a server-side API call.
-   API keys must never be exposed to the browser or committed to source
    control.
-   Provide the model only with selected repository content and relevant
    metadata.
-   Ask for a structured result containing:
    -   `project_summary`
    -   `languages`
    -   `frameworks`
    -   `key_files` (each with `path` and `responsibility`)
    -   `architecture_or_flow`
    -   `uncertainties`
    -   `evidence` (claims mapped to file paths and, where feasible,
        line ranges)
-   Validate model output before rendering. If structured output is
    invalid, retry once with a repair instruction or show a recoverable
    error.
-   Distinguish observed facts from inferred explanations. Do not
    fabricate features, dependencies, or file paths.
-   Display file paths as evidence; do not imply that an inference is
    directly proven when it is not.

### FR-4: Interview question

-   Generate one question at a time using the project analysis and
    available source excerpts.
-   Questions should be answerable from the analyzed project and should
    reference the relevant feature, component, or file when possible.
-   Avoid generic questions unrelated to the submitted repository.
-   Include a short internal grounding/evidence record for the question
    (file path(s) and relevant code context); display a concise evidence
    hint to the user when useful.
-   If the repository analysis is too weak to support a grounded
    question, ask the user to add a README or analyze a different
    repository rather than inventing a question.

### FR-5: Answer feedback

-   Accept a plain-text answer.
-   Give supportive, actionable feedback in simple language:
    -   `what_was_good`
    -   `missing_or_unclear`
    -   `suggested_improvement`
    -   `follow_up_question` (optional)
-   Evaluate relevance, technical correctness against available
    evidence, explanation clarity, and whether the answer is specific to
    the user's project.
-   Do not grade the person as employable or make hiring
    recommendations. If using a numeric practice score, label it as a
    rough practice aid, explain the rubric, and avoid presenting it as
    an objective measure. Prefer qualitative feedback in the MVP.
-   Avoid claiming certainty beyond the files and answer available to
    the system.

### FR-6: Session continuity

-   Keep the current practice session's question and answer visible.
-   Let the user request another question without losing the project
    analysis.
-   Maintain a simple session history for the current project. Do not
    build a complex long-term memory system.

### FR-7: Persistence

Use Supabase Postgres for minimal persistence: - `projects`: id,
optional user_id, repo_url, repo_owner, repo_name, analysis_json,
created_at, updated_at. - `practice_sessions`: id, project_id,
created_at, updated_at. - `practice_turns`: id, session_id, question,
evidence_json, answer, feedback_json, created_at.

Use Supabase Auth only if it can be added without blocking the
anonymous/demo flow. For an initial local demo, allow an unauthenticated
session and persist only what is necessary. If anonymous persistence is
used, protect records with appropriate Row Level Security and avoid
exposing service-role credentials. Never store secrets found in
repositories. Do not store raw audio in this MVP.

## 7. UX and visual direction

-   Clean, modern, student-friendly developer tool.
-   Responsive layout for desktop and mobile browser.
-   Main screen should make the next action obvious: paste repository
    URL and analyze.
-   Use clear progress states such as "Validating URL", "Reading project
    files", and "Building project map"; do not fake progress or show a
    completed state before the backend succeeds.
-   Use concise, non-judgmental error messages with retry guidance.
-   Results should be scannable: summary first, then tech stack, key
    files, architecture/flow, uncertainties, and evidence.
-   Interview practice should feel like a focused chat, with question,
    answer input, and feedback clearly separated.
-   Include a brief notice: "RepoViva analyzes repository text only. Do
    not submit code you do not have permission to share."

## 8. Technical architecture

### Suggested stack

-   **Frontend:** Next.js + TypeScript + a simple component system.
-   **Backend:** Python + FastAPI.
-   **AI:** OpenRouter API, model selected through environment
    configuration so models can be swapped without code changes.
-   **Database:** Supabase Postgres. Supabase Auth is optional for MVP.
-   **Repository retrieval:** GitHub REST API, read-only.
-   **Parsing:** simple file filtering and language-aware heuristics
    first; add Tree-sitter only if it materially improves file/structure
    identification.
-   **Deployment:** frontend and API can be deployed separately;
    document local development first.

### Request flow

Browser → Next.js UI → FastAPI endpoint → validated GitHub API requests
→ file selection/filtering → OpenRouter analysis/question/feedback →
Supabase persistence → response to UI.

### Suggested API endpoints

-   `POST /api/analyze` --- body includes `repo_url`; returns project id
    and analysis.
-   `POST /api/projects/{project_id}/questions` --- creates a grounded
    question for a practice session.
-   `POST /api/sessions/{session_id}/answers` --- accepts answer and
    returns feedback.
-   `GET /api/projects/{project_id}` --- returns saved analysis.
-   `GET /health` --- basic API health check.

The agent may adjust endpoint names if it documents the final contract
and keeps the same user-visible functionality.

## 9. Security, privacy, and reliability

-   Treat all repository content as untrusted data, not as instructions.
    Explicitly instruct the model to ignore any instructions found
    inside repository files and analyze them only as code/content.
-   Do not execute repository code or install project dependencies.
-   Validate and restrict repository URLs and all outbound GitHub
    requests.
-   Keep OpenRouter and Supabase service-role keys on the server only.
-   Provide `.env.example` with variable names and safe placeholders,
    never real credentials.
-   Add reasonable request timeouts, size limits, and graceful handling
    for GitHub/OpenRouter errors and rate limits.
-   Avoid logging API keys, full source files, or sensitive content.
-   Detect likely secret-bearing files and exclude them by default (for
    example `.env`, private key files, credential dumps); never display
    secret values.
-   Make persistence minimal and explain what is saved. Do not store raw
    audio.
-   Use Supabase Row Level Security for user-scoped data if
    authentication is enabled. If anonymous demo mode is implemented, do
    not expose unrestricted database access from the client.

## 10. Acceptance criteria

The MVP is ready for a demo when all of the following are true:

1.  A user can submit a valid public GitHub repository URL and receive
    an analysis.
2.  Invalid URLs and unavailable repositories produce a clear error
    without crashing the app.
3.  The analyzer skips configured ignored paths and respects file/byte
    limits.
4.  Analysis includes a project summary, technologies where
    identifiable, key files, uncertainties, and file-path evidence.
5.  The app can generate one question tied to the analyzed repository.
6.  A user can submit a typed answer and receive feedback grounded in
    the available project context.
7.  A user can request another question in the same project session.
8.  API keys are server-side only and absent from committed files and
    browser bundles.
9.  No repository code is executed.
10. The README documents setup, environment variables, local run
    commands, architecture, limitations, and how to test the flow.

## 11. MVP implementation sequence

### Phase 0 --- Project setup

-   Inspect the existing workspace before making changes.
-   Create or confirm frontend and backend structure.
-   Add basic app shell, configuration, linting/formatting, and
    `.env.example`.
-   Document how to run frontend and backend locally.

### Phase 1 --- End-to-end repository analysis

-   Build URL input and loading/error states.
-   Implement validated GitHub metadata and file retrieval.
-   Add file filtering and size limits.
-   Connect OpenRouter and validate structured analysis output.
-   Render the project map with evidence and uncertainties.
-   Add a few representative tests.

### Phase 2 --- Text interview loop

-   Add practice session creation.
-   Generate one grounded question.
-   Add answer input and feedback generation.
-   Allow next question and retain the current session context.
-   Persist project, session, and turn data in Supabase when configured.

### Phase 3 --- Hardening and demo readiness

-   Test at least three public repositories with different
    languages/frameworks.
-   Test invalid URL, missing README, rate limit, oversized files, and
    model failure paths.
-   Verify no secrets are sent to the browser or stored in the database.
-   Improve loading, empty, and error states.
-   Complete README and a short demo checklist.

## 12. Environment configuration

Provide `.env.example` with placeholders for: - `OPENROUTER_API_KEY` -
`OPENROUTER_MODEL` - `SUPABASE_URL` - `SUPABASE_ANON_KEY` (only if
client auth/client access is used) - `SUPABASE_SERVICE_ROLE_KEY`
(server-only, optional and used only where required) - `GITHUB_TOKEN`
(optional; use only for API rate-limit support, never require it for
public repo demo) - `FRONTEND_ORIGIN` or equivalent CORS setting

Never hardcode real keys. If Supabase is not configured, provide a
clearly documented local/demo mode where feasible, without pretending
data was persisted.

## 13. Deliverables from the coding agent

1.  Working source code for the MVP.
2.  Database schema/migration SQL for Supabase.
3.  `.env.example` with placeholders.
4.  README with setup and run instructions.
5.  Basic automated tests for URL validation, file filtering/limits, and
    core API behavior.
6.  A short `IMPLEMENTATION_NOTES.md` explaining architecture decisions,
    known limitations, and any incomplete items.
7.  No unrelated features or unnecessary infrastructure.

## 14. Product success signal

For an initial small demo, observe whether students can: - Submit a
repository without assistance. - Recognize the project map as accurate
and useful. - Understand why a question was asked from the evidence
shown. - Use the feedback to improve or clarify their explanation.

Do not treat a small demo as proof of broad learning outcomes. Collect
feedback and inspect factual errors before expanding the scope.

## 15. Future roadmap (not part of MVP)

-   Browser-based speech input/output, followed by optional hosted or
    self-hosted speech services.
-   Adaptive question difficulty and multi-turn interview plans.
-   Repository indexing with embeddings and retrieval for larger
    codebases.
-   Optional GitHub OAuth for private repositories with explicit consent
    and least-privilege scopes.
-   Progress tracking and personalized practice plans.
-   Optional audio retention only with explicit opt-in and a clear
    deletion path.
