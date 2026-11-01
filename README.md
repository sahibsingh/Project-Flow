# Project Flow

A category-aware project skill for Codex, Claude Code, Qwen Code, and other agents that support the shared Agent Skills format.

Project Flow helps an agent understand a new or active project, select a useful depth, research current category trends, compare feature choices, improve UX and UI where relevant, diagnose SEO gaps for search-led websites, and plan proportionate quality and security checks. It routes optional local skills only when they fit the task.

## Install

Requires Node.js 22.20+. At the prompts, select `project-flow` and the agents you want to install it for.

```sh
npx skills add sahibsingh/project-flow -g
```

## Start a project

Invoke `project-flow` or describe the project. The skill summarizes its understanding, asks for a primary category when one has not been chosen, then follows the current project stage. Categories are Product/Software, UX/UI, Business/Market, Data/Analytics, Content/Marketing, Research/Docs, Operations/Automation, Creative/Media, and Other. A secondary category can be added for work that crosses areas.

The skill has three depth lanes: Quick for one low-risk outcome, Standard for several flows or integrations, and High assurance for sensitive, regulated, production, or security-sensitive work. It keeps small tasks short and does not load every reference or integration at once.

## Workflow

![Project Flow workflow: start or resume, frame the project, research and choose, optionally audit SEO for a search-led website, design and deliver, validate, then continue or close with findings.](docs/workflow.svg)

## Try the demo

A no-build interactive preview is in [docs/index.html](docs/index.html). It lets a visitor choose a project category and depth, then shows the matching work path.

To publish it with GitHub Pages, open **Settings → Pages**, select **Deploy from a branch**, then choose branch <code>main</code> and folder <code>/docs</code>. The expected URL is <https://sahibsingh.github.io/Project-Flow/> after Pages finishes its first deployment.

The demo is static HTML, CSS, and JavaScript. It has no external dependencies and sends no form data.

## What it does

- Frames the user's problem, audience, outcome, constraints, and success signal.
- Checks current category trends for new project decisions and reports useful findings with sources, not raw scrape lists.
- For public websites that depend on search acquisition, diagnoses the path from indexability and search clicks to qualified leads or conversions. See [the website SEO workflow](skills/project-flow/references/website-seo.md).
- Compares features by value, effort, risk, pros, and cons.
- Finds user-flow friction and defines the simplest usable UI when design is in scope.
- Continues an active project from its current stage instead of restarting.
- Defines project-sized validation and defensive security checks. It does not promise that software can be made impossible to compromise.

## Skills and integrations

The workflow is self-contained. If the agent has relevant local skills, it can route to product/business analysis for metric-backed decisions, Mobbin for a specific screen redesign, Impeccable for frontend design, Humanizer for user-facing prose, Ponytail for minimal code changes, or Scrapling for an authorized, policy-permitted site crawl. Missing integrations use a clearly labeled manual fallback. The repository does not copy or install those skills.

## Validate this package

```sh
node tests/validate-skill.mjs
```

The check uses Node.js built-ins and validates the skill metadata and local Markdown links. The public installer command can also discover the skill without installing it:

```sh
npx skills add sahibsingh/project-flow --list
```

## License

MIT. See [LICENSE](LICENSE).

## Security

See [SECURITY.md](SECURITY.md). Project Flow gives defensive process guidance; it is not a security guarantee or an authorization to test third-party systems.

## References

- [Agent Skills specification](https://agentskills.io/specification)
- [Skills CLI](https://github.com/vercel-labs/skills)
- [Supported agents and install paths](https://github.com/vercel-labs/skills/blob/main/docs/agents.md)

