import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const skillPath = path.join(root, 'skills', 'project-flow', 'SKILL.md');
const source = readFileSync(skillPath, 'utf8');
const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);

assert.ok(match, 'SKILL.md must start with YAML frontmatter');
const frontmatter = match[1];
const name = frontmatter.match(/^name:\s*(.+)$/m)?.[1]?.trim();
const description = frontmatter.match(/^description:\s*(.+)$/m)?.[1]?.trim();
assert.equal(name, 'project-flow');
assert.ok(/^[a-z0-9-]{1,64}$/.test(name), 'skill name must follow the shared format');
assert.ok(description && description.length <= 1024, 'description must be present and within the format limit');

for (const file of [
  'README.md',
  'skills/project-flow/SKILL.md',
  'skills/project-flow/references/categories.md',
  'skills/project-flow/references/research-and-design.md',
  'skills/project-flow/references/delivery-and-security.md',
]) {
  const text = readFileSync(path.join(root, file), 'utf8');
  for (const [, href] of text.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
    if (/^(?:https?:|mailto:|#)/i.test(href)) continue;
    const target = href.split('#', 1)[0];
    assert.ok(existsSync(path.resolve(root, path.dirname(file), target)), `${file} links to missing ${href}`);
  }
}

console.log('Project Flow skill metadata and local links are valid.');
