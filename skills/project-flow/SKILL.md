---
name: project-flow
description: The user's fixed project workflow. Use at the start of any project discussion, when the user says "project-flow", "naya project", "project start", or asks which skill or plugin to use at a stage. Maps each phase (understand, R&D, trend research, UX, UI, build, testing and security, deploy) to the installed skills and plugins, and scales depth to project size so small projects stay cheap.
argument-hint: "<project idea> | <phase name> | inventory"
---

# Project Flow

One flow for every project. Use ONLY the skills named for the current phase. Never load the whole list, never run phases the size gate skips.

## Hard rules

- Free paths only: no hallmark Together AI images, no claude-seo paid extensions (DataForSEO etc.), no Semrush or Firecrawl connectors (spend API units or credits), no Mobbin, no Hopper or IDA Pro in rea, no paid broker or data APIs, no paid scanners or SaaS tiers. Unsure if it costs money: skip it.
- Scrapling runs from `~/.venvs/scrapling`. Never use its Cloudflare or anti-bot bypass options. Scrape only public pages, respect robots.txt, no personal data.
- Security and pentest steps only on code or systems the user owns. Confirm the target before any active test.
- Before using a skill, check it is in this session's skill list. In Codex or another agent where a `plugin:skill` name does not exist, do that phase's work directly and say which skill was missing. If a phase needs a missing tool, plugin or skill: name it, why, and that it is free, then ask the user. On their yes, review its code (licence, install scripts, hooks, network calls, paid parts), install it and continue the phase; on a no, use the fallback.
- Costs the project itself needs (payment gateway fees, a domain, live API keys) are the user's business decision: name the cost and the free test mode, and ask. Never sign up or pay; build in test mode.
- Reply in the user's language (Hinglish if they write Hinglish).

## Step 0: size gate (always first, one line)

Pick one and tell the user:

| Size | What it means | Phases to run |
|---|---|---|
| **S** | one page, script or small fix, no users' data | 1 (2-line brief), 5 only if it has a screen, 6, 7 (quick checks only). No subagents, no deep research. |
| **M** | an app or site with a few flows, one stack | 1-8, each short. Subagents only for research or review. |
| **L** | many users, payments, logins, personal data, public launch | 1-8 in full, plus threat model and release checklist. |

If unsure, pick the smaller size and say so. The user can bump it.

## Phases and their skills

In phases 1-4, use the first skill listed; the others only if the first is missing or the phase needs it. Phases 5-8 name a skill per job.

**1. Understand the project**
- S: no skill, a 2-line brief (goal, done-signal).
- M, L: `superpowers:brainstorming` (ask, restate goal, user, deliverable, constraints, done-signal).
- Existing code: read it first; `Explore` agent only for size L.
- Output: 2-line brief (S) or 5-line brief (M, L). Ask only what blocks the next step.
- This flow decides which skills load. It overrides any skill that says it must run first (e.g. brainstorming at size S).

**2. R&D: features, pros and cons** (M, L)
- `product-management:product-brainstorming` or `product-management:write-spec`.
- Output: table of features with value, effort, pros, cons, and now / later / no.

**3. Category trends** (M, L)
- Web search first (`WebSearch`). `anthropic-skills:deep-research` only for size L.
- `scrapling-official` only when search cannot give the evidence.
- `product-management:competitive-brief` for competitors.
- `rea:reverse-engineer-anything` only to understand how a shipped JavaScript or web app works, with Ghidra or static analysis (free), and only on apps the user may analyse.
- Output: 3-7 current trends with date and source, and what each means for this project. No raw lists, no URL dumps.

**4. UX problems** (M, L)
- `ux-researcher-designer` (personas, journey) or `design:user-research`.
- `design:ux-copy` for buttons, errors, empty states.
- Output: top user pain points, the main journey, how each pain is solved.

**5. UI: the easiest way to use it**
- Pick ONE design skill per project, never two at once. A project with both a marketing page and app screens: pick by its main screen (a shop or site people browse → the landing pick; a tool people work in → `impeccable`).
  - landing page or marketing site: `hallmark` (free photo library only) or `design-taste-frontend`
  - app screens, dashboards, polish of an existing UI: `impeccable`
  - general new UI: `frontend-design:frontend-design` (the official plugin; fall back to `frontend-design`)
- Stack help: `senior-frontend`, `tailwind-patterns`; mobile: `mobile-design`.
- Review (M, L): `design:accessibility-review`, `design:design-critique`. S: a short accessibility note, no skill.
- Output: screens, the one primary action per screen, accessibility notes.

**6. Build** (skills per job, not fallbacks: use each one only when that job comes up)
- Plan: `superpowers:writing-plans` (M, L); size S goes straight to code.
- Code: `superpowers:test-driven-development` for logic (M, L); size S writes the code with one small assert-based self-check. Ponytail mode is on by its hook; it is a mode, not a skill to load.
- Bugs: `superpowers:systematic-debugging`.
- Text and copy (M, L, or S with real page text): `copywriting`, then `humanizer` to remove AI tone. Button labels alone need neither.
- SEO for public sites: `claude-seo:seo-page` or `claude-seo:seo-audit` (free sources only).

**7. Testing, security, hacking checks**
- S: run the project's tests, `superpowers:verification-before-completion`. No tests and no lint config: check by hand against the done-signal (open it, use it, report what you saw); do not set up a test framework for S.
- M: add `engineering:testing-strategy`, `code-review` (or `/ponytail-review`), `security-review`.
- L: add `ateam-security-audit:security-audit` (it also covers the threat model), then `ateam-security-audit:security-fix`, then `ateam-security-audit:security-verify`; browser end-to-end checks with the installed Playwright plugin.
- Free tools, run with `npx` or `pip` inside the project (ask before installing one the project lacks):
  - S: the project's own lint and tests (`npx eslint .`, `npx vitest run`).
  - M: add `semgrep scan --config auto --metrics=off` (code security; it downloads rules, metrics off), `npm audit` (dependencies), `npx lighthouse <url>` (speed, SEO, accessibility).
  - L: add a Playwright test suite in the project (`@playwright/test`, only if the user wants tests kept in the repo), and an OWASP ZAP baseline scan (`zap-baseline.py -t <url>`) on the user's own staging site.
- Pentest = defensive checks on the user's own app: input validation, auth and access control, secrets in code, dependency vulnerabilities, OWASP Top 10. Plan first, run only after the user confirms the target.

**8. Deploy and monitor** (M, L)
- `engineering:deploy-checklist` before release.
- Free or self-hosted only: Docker, Coolify on the user's own server, or a free hosting tier the user already has. Errors and analytics: self-hosted Sentry or PostHog, or skip. Never a paid plan.
- Output: how to deploy, how to roll back, what is monitored.

## Plugins a project usually needs

Installed (keep): claude-seo, seo-cockpit, ponytail, hallmark, impeccable, humanizer, frontend-design, rea, day-trader-skill (trading only), plus superpowers, engineering, product-management, design, ateam-security-audit, Playwright.

Free and worth adding (all Anthropic, from `claude-plugins-official`). Suggest, never install without the user's yes:

| Plugin | Phase | Why |
|---|---|---|
| `feature-dev` | 6 | explore code, design, build, review in one guided workflow |
| `pr-review-toolkit` | 7 | review agents for tests, errors, types, simplification |
| `security-guidance` | 7 | warns on risky code while editing (adds hooks) |
| `claude-security` | 7 | deep vulnerability scan of your own code inside the session |

Needs a sign-in via `/mcp` before use (installed, not connected): context7 (library docs), github, supabase, figma. Use only their free features.

`inventory` argument: re-check with `claude plugin list`, `ls ~/.claude/skills` and `ls ~/.agents/skills`, then update this section.

## Prompts for Claude Code and Codex

Ready-to-paste prompts and the step-by-step way to drive both tools: `references/prompts.md`. Show them when the user asks for "prompt".

## Keep it lean

- Start every reply with: size, current phase, the skill used.
- M, L: one phase per turn unless the user says "continue". S: run all its phases in one turn after the brief, unless a question blocks.
- Do not print this skill's tables back to the user.
