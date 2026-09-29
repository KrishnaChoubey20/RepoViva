# RepoViva

**Your Code. Your Voice. Your Interview.**

RepoViva is a modern web application that transforms your GitHub repository into a personalized technical interview experience. By analyzing your codebase, it generates project-specific interview questions, allowing you to practice explaining your architectural choices and implementation details before the real interview.

## Features
- **GitHub Integration:** Instantly connect and pull down public repositories.
- **AI-Powered Code Analysis:** Seamlessly understands your project structure, frameworks, and architecture.
- **Dynamic Interview Questions:** Generates highly relevant, evidence-based interview questions directly mapped to your actual code.
- **Feedback & Insights:** Submit answers and receive AI-driven feedback on how you can improve your technical communication.

## Tech Stack
- **Frontend:** Next.js (App Router), React, Tailwind CSS, Framer Motion
- **Backend/Database:** Supabase, Next.js API Routes
- **AI Integration:** OpenRouter (Claude-3.5-Sonnet)
- **Icons:** Lucide React

## Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/KrishnaChoubey20/RepoViva.git
   cd RepoViva/frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the `frontend` directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   OPENROUTER_API_KEY=your_openrouter_api_key
   ```
   *(Note: Without the `OPENROUTER_API_KEY`, the app runs in demo mode using mocked data for analysis and questions).*

4. **Run the local development server:**
   ```bash
   npm run dev
   ```

## Design

RepoViva is built with a premium, futuristic SaaS aesthetic, featuring smooth micro-animations, a responsive bento grid, and a sleek navy/indigo color palette.

---
Built with ❤️ for developers leveling up their interview skills.
