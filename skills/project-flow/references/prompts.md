# Prompts: Claude Code and Codex

## How to split the work

| Step | Tool | Why |
|---|---|---|
| 1-5: understand, R&D, trends, UX, UI | Claude Code | has the project-flow skill, design skills, web search |
| 6: build | Claude Code or Codex | either; one tool per task, never both on the same files |
| 7: review and security | the OTHER tool | a second pair of eyes catches what the builder missed |

Flow: Claude plans and designs, writes `PLAN.md` in the project. Codex (or Claude) builds from `PLAN.md`. The other tool reviews. Commit after each phase so either tool can pick up.

## Prompt for Claude Code

```
/project-flow
Project: <ek line mein project kya hai>
Users: <kaun use karega>
Must have: <zaroori features>
Stack (agar pata hai): <jaise Next.js, Supabase>

Rules:
- Pehle size batao (S/M/L), phir ek phase ek turn mein.
- Sirf wahi skill use karo jo project-flow us phase ke liye bolta hai.
- Koi paid feature, paid API ya paid image generation nahi.
- Trends ka result: 3-7 trends, date aur source ke saath, raw list nahi.
- Har phase ke end mein decisions PLAN.md mein likho.
- Phase 7 ke security checks sirf mere code par, run se pehle mujhse confirm karo.
Shuru karo phase 1 se.
```

Continue later: `/project-flow continue from phase <n>, read PLAN.md first`

## Prompt for Codex

```
Use the project-flow skill.
Read PLAN.md and AGENTS.md first. Build only the milestone: <milestone name>.
Rules:
- Smallest complete change; follow the existing code style.
- Add or update one test for new logic; run the tests and show the result.
- No new paid services, API keys or paid dependencies.
- Do not change files outside this milestone. Do not push.
- At the end: what changed, test output, open risks.
```

Review prompt (give to the tool that did NOT build):

```
Review the last commit against PLAN.md: bugs, security (OWASP Top 10, secrets, auth),
missing tests, accessibility. List findings by severity with file:line. Change no code.
```

## Steps

1. Claude Code: run the Claude prompt. Answer its questions. Approve size.
2. Go phase by phase. After phase 5, check `PLAN.md` has features, UX and UI decisions.
3. Commit: `git add PLAN.md && git commit -m "plan"`.
4. Build: Codex prompt (or Claude `superpowers:executing-plans`), one milestone at a time.
5. Review with the other tool. Fix in the builder tool.
6. Size L: Claude runs `ateam-security-audit:security-audit` before release.
