#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const os = require("os");

const DEFAULT_WORKSPACE = process.env.CODEXWORKSPACE_ROOT || process.cwd();
const CODEX_SKILLS = process.env.CODEX_SKILLS_ROOT || path.join(os.homedir(), ".codex", "skills");
const AGENTS_SKILLS = process.env.AGENTS_SKILLS_ROOT || path.join(os.homedir(), ".agents", "skills");
const CODEX_AUTOMATIONS = process.env.CODEX_AUTOMATIONS_ROOT || path.join(os.homedir(), ".codex", "automations");

function parseArgs(argv) {
  const args = { workspace: DEFAULT_WORKSPACE, outputDir: null, codexSkills: CODEX_SKILLS, agentsSkills: AGENTS_SKILLS, automationConfigDir: CODEX_AUTOMATIONS, check: false, format: "text", noWriteState: false };
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--workspace") args.workspace = argv[++i];
    else if (arg === "--output-dir") args.outputDir = argv[++i];
    else if (arg === "--codex-skills") args.codexSkills = argv[++i];
    else if (arg === "--agents-skills") args.agentsSkills = argv[++i];
    else if (arg === "--automation-config-dir") args.automationConfigDir = argv[++i];
    else if (arg === "--check") args.check = true;
    else if (arg === "--json") args.format = "json";
    else if (arg === "--no-write-state") args.noWriteState = true;
    else if (arg === "--help" || arg === "-h") { printHelp(); process.exit(0); }
    else throw new Error(`Unknown argument: ${arg}`);
  }
  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/build_ledger_dashboard.js [options]

Options:
  --workspace <path>   Workspace root. Default: ${DEFAULT_WORKSPACE}
  --output-dir <path>  Output directory. Default: <workspace>\\shared\\ledgers\\skill-automation-ledger
  --codex-skills <path>  Codex skills root for scanning or fixture tests
  --agents-skills <path> Agents skills root for scanning or fixture tests
  --automation-config-dir <path> Automation config directory for change detection
  --check              Skip writing outputs when source hash is unchanged
  --json               Print machine-readable summary
  --no-write-state     Do not update state.json after generation
  --help               Show this help`);
}

function readText(file) { return fs.existsSync(file) ? fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "") : ""; }
function readJson(file, fallback) { try { return JSON.parse(readText(file)); } catch (_) { return fallback; } }
function ensureDir(dir) { fs.mkdirSync(dir, { recursive: true }); }
function sha256(value) { return crypto.createHash("sha256").update(value).digest("hex"); }
function fileMtime(file) { try { return fs.statSync(file).mtime.toISOString(); } catch (_) { return null; } }

function listSkillDirs(root) {
  if (!fs.existsSync(root)) return [];
  return fs.readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
    .map((entry) => path.join(root, entry.name))
    .filter((dir) => fs.existsSync(path.join(dir, "SKILL.md")));
}

function parseFrontmatter(text) {
  if (!text.startsWith("---")) return {};
  const end = text.indexOf("\n---", 3);
  if (end === -1) return {};
  const data = {};
  for (const line of text.slice(3, end).split(/\r?\n/)) {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) continue;
    let value = match[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
    data[match[1]] = value;
  }
  return data;
}

function makeSkillKey(sourceGroup, dir, name) {
  return [sourceGroup || "", dir || "", name || dir || ""].join("::");
}

function skillKey(item) {
  return item.key || makeSkillKey(item.sourceGroup, item.dir, item.name);
}

function parseInventory(inventoryText) {
  const rows = [];
  const byDir = {};
  let section = "";
  for (const line of inventoryText.split(/\r?\n/)) {
    const heading = line.match(/^##\s+(.+)$/);
    if (heading) { section = heading[1].trim(); continue; }
    if (!line.startsWith("|") || line.includes("---")) continue;
    const cells = line.split("|").slice(1, -1).map((cell) => cell.trim());
    if (cells.length < 6 || cells[0] === "序号") continue;
    const [index, dir, name, description, addedAt, notes] = cells;
    const row = { key: makeSkillKey(section, dir, name), index, dir, name, description, addedAt, notes, sourceGroup: section };
    rows.push(row);
    if (!byDir[dir]) byDir[dir] = [];
    byDir[dir].push(row);
  }
  return { rows, byDir };
}

function parseAutomationOverview(automationText) {
  const rows = [];
  let inOverview = false;
  for (const line of automationText.split(/\r?\n/)) {
    if (line.startsWith("## 自动化总览")) inOverview = true;
    else if (inOverview && line.startsWith("## ")) inOverview = false;
    if (!inOverview || !line.startsWith("|") || line.includes("---")) continue;
    const cells = line.split("|").slice(1, -1).map((cell) => cell.trim());
    if (cells.length < 9 || cells[0] === "编号") continue;
    rows.push({
      id: cells[0],
      scenario: cells[1],
      status: cells[2],
      trigger: cells[3],
      schedule: cells[4],
      output: cells[5],
      externalDelivery: cells[6],
      lastVerified: cells[7],
      detail: stripMarkdown(cells[8])
    });
  }
  return rows;
}

function stripMarkdown(value) { return String(value || "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/`/g, "").trim(); }
function resourceFlags(dir) { const has = (name) => fs.existsSync(path.join(dir, name)); return { scripts: has("scripts"), references: has("references"), assets: has("assets"), agents: has("agents") }; }

function classifySkill(skill, rules, overrides) {
  const exact = (overrides.byDir && overrides.byDir[skill.dir]) || (overrides.byName && overrides.byName[skill.name]);
  if (exact) return exact;
  const haystack = [skill.dir, skill.name, skill.description, skill.sourceGroup, skill.path].join(" ").toLowerCase();
  let bestName = rules.defaultCategory || "未分类";
  let bestScore = 0;
  for (const category of rules.categories || []) {
    const score = (category.keywords || []).reduce((sum, keyword) => haystack.includes(String(keyword).toLowerCase()) ? sum + 1 : sum, 0);
    if (score > bestScore) { bestName = category.name; bestScore = score; }
  }
  return bestScore > 0 ? bestName : (rules.defaultCategory || "未分类");
}

function loadSkills(inventory, rules, overrides, skillRoots) {
  const inventoryRows = inventory.rows || [];
  const inventoryByDir = inventory.byDir || {};
  const skills = [];
  const seenKeys = new Set();
  for (const { root, installScope } of skillRoots) {
    for (const dirPath of listSkillDirs(root)) {
      const dir = path.basename(dirPath);
      const skillMd = path.join(dirPath, "SKILL.md");
      const frontmatter = parseFrontmatter(readText(skillMd));
      const candidates = inventoryByDir[dir] || [];
      const inv = candidates.find((row) => row.name === frontmatter.name) || candidates[0] || {};
      const skill = {
        key: inv.key || makeSkillKey(installScope, dir, frontmatter.name || dir),
        dir,
        name: inv.name || frontmatter.name || dir,
        description: inv.description || frontmatter.description || "",
        sourceGroup: inv.sourceGroup || (installScope === "codex" ? "未登记 Codex Skills" : "未登记 Agents Skills"),
        installScope,
        path: dirPath,
        addedAt: inv.addedAt || "",
        notes: inv.notes || "",
        lastModified: fileMtime(skillMd),
        resources: resourceFlags(dirPath),
        validation: frontmatter.name && frontmatter.description ? "ok" : "missing-frontmatter"
      };
      skill.capability = classifySkill(skill, rules, overrides);
      skills.push(skill);
      seenKeys.add(skill.key);
    }
  }
  for (const inv of inventoryRows) {
    if (seenKeys.has(inv.key)) continue;
    const skill = {
      key: inv.key,
      dir: inv.dir,
      name: inv.name || inv.dir,
      description: inv.description || "",
      sourceGroup: inv.sourceGroup || "清单登记",
      installScope: "inventory-only",
      path: "",
      addedAt: inv.addedAt || "",
      notes: inv.notes || "",
      lastModified: null,
      resources: { scripts: false, references: false, assets: false, agents: false },
      validation: "missing-installed-dir"
    };
    skill.capability = classifySkill(skill, rules, overrides);
    skills.push(skill);
  }
  return skills.sort((a, b) => a.capability.localeCompare(b.capability, "zh-Hans-CN") || a.sourceGroup.localeCompare(b.sourceGroup, "zh-Hans-CN") || a.dir.localeCompare(b.dir));
}

function stableSkill(item) { return { key: skillKey(item), dir: item.dir, name: item.name, capability: item.capability, sourceGroup: item.sourceGroup, description: item.description, installScope: item.installScope, path: item.path, validation: item.validation, resources: item.resources }; }
function stableAutomation(item) { return { id: item.id, scenario: item.scenario, status: item.status, trigger: item.trigger, schedule: item.schedule, output: item.output, externalDelivery: item.externalDelivery, lastVerified: item.lastVerified }; }
function diffMaps(kind, previous, current) {
  const changes = [];
  for (const [id, value] of current.entries()) {
    if (!previous.has(id)) changes.push({ kind, type: "added", id, name: value.name || value.scenario || id });
    else if (JSON.stringify(previous.get(id)) !== JSON.stringify(value)) changes.push({ kind, type: "modified", id, name: value.name || value.scenario || id });
  }
  for (const [id, value] of previous.entries()) if (!current.has(id)) changes.push({ kind, type: "removed", id, name: value.name || value.scenario || id });
  return changes;
}
function computeChanges(previous, current) {
  return [
    ...diffMaps("skill", new Map((previous.skills || []).map((item) => [skillKey(item), stableSkill(item)])), new Map(current.skills.map((item) => [skillKey(item), stableSkill(item)]))),
    ...diffMaps("automation", new Map((previous.automations || []).map((item) => [item.id, stableAutomation(item)])), new Map(current.automations.map((item) => [item.id, stableAutomation(item)])))
  ];
}

function groupSkills(skills) {
  const grouped = {};
  for (const skill of skills) {
    if (!grouped[skill.capability]) grouped[skill.capability] = {};
    if (!grouped[skill.capability][skill.sourceGroup]) grouped[skill.capability][skill.sourceGroup] = [];
    grouped[skill.capability][skill.sourceGroup].push(skill);
  }
  return grouped;
}
function escapeHtml(value) { return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

function renderHtml(data) {
  const grouped = groupSkills(data.skills);
  const style = `body{margin:0;font-family:Inter,Segoe UI,Arial,sans-serif;background:#f7f8fb;color:#182033}header{padding:28px 36px;background:#10233f;color:#fff}h1{margin:0 0 8px;font-size:28px;letter-spacing:0}main{padding:24px 36px 48px}.meta{opacity:.82}.cards{display:grid;grid-template-columns:repeat(4,minmax(150px,1fr));gap:12px;margin:18px 0}.card{background:#fff;border:1px solid #e2e6ef;border-radius:8px;padding:16px}.num{font-size:28px;font-weight:700}.toolbar{margin:18px 0;display:flex;gap:10px;align-items:center;flex-wrap:wrap}input,select{padding:10px 12px;border:1px solid #cfd6e4;border-radius:6px;background:#fff;min-width:220px}section{margin-top:24px}details{background:#fff;border:1px solid #e2e6ef;border-radius:8px;margin:10px 0;padding:12px}summary{cursor:pointer;font-weight:700}.source{margin:12px 0 4px;color:#46536b;font-weight:700}.skill-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:10px}.skill{border:1px solid #e8ebf2;border-radius:8px;padding:12px;background:#fbfcff}.skill h4{margin:0 0 6px;font-size:15px}.tags{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}.tag{font-size:12px;background:#eaf1ff;color:#1d4e89;border-radius:999px;padding:3px 8px}table{width:100%;border-collapse:collapse;background:#fff;border:1px solid #e2e6ef;border-radius:8px;overflow:hidden}th,td{border-bottom:1px solid #edf0f6;padding:10px;text-align:left;vertical-align:top}th{background:#f0f3f8}.muted{color:#647086;font-size:13px}.change{display:inline-block;margin:4px 6px 4px 0;padding:5px 9px;border-radius:999px;background:#fff4d6;color:#6b4b00}@media(max-width:800px){.cards{grid-template-columns:1fr 1fr}main,header{padding-left:18px;padding-right:18px}.skill-grid{grid-template-columns:1fr}}`;
  const skillSections = Object.entries(grouped).map(([capability, sources]) => {
    const total = Object.values(sources).reduce((sum, list) => sum + list.length, 0);
    const sourceHtml = Object.entries(sources).map(([source, skills]) => `<div class="source">${escapeHtml(source)} (${skills.length})</div><div class="skill-grid">${skills.map((skill) => `<article class="skill" data-search="${escapeHtml([skill.name, skill.dir, skill.description, skill.capability, skill.sourceGroup].join(" ").toLowerCase())}"><h4>${escapeHtml(skill.name)}</h4><div class="muted">${escapeHtml(skill.dir)} · ${escapeHtml(skill.validation)}</div><p>${escapeHtml(skill.description)}</p><div class="tags">${Object.entries(skill.resources).filter(([, yes]) => yes).map(([name]) => `<span class="tag">${name}</span>`).join("")}<span class="tag">${escapeHtml(skill.installScope)}</span></div></article>`).join("")}</div>`).join("");
    return `<details open><summary>${escapeHtml(capability)} (${total})</summary>${sourceHtml}</details>`;
  }).join("");
  const automationRows = data.automations.map((item) => `<tr data-search="${escapeHtml(Object.values(item).join(" ").toLowerCase())}"><td>${escapeHtml(item.id)}</td><td>${escapeHtml(item.scenario)}</td><td>${escapeHtml(item.status)}</td><td>${escapeHtml(item.trigger)}</td><td>${escapeHtml(item.schedule)}</td><td>${escapeHtml(item.output)}</td><td>${escapeHtml(item.externalDelivery)}</td><td>${escapeHtml(item.lastVerified)}</td></tr>`).join("");
  const changes = data.changes.length ? data.changes.map((change) => `<span class="change">${escapeHtml(change.kind)} ${escapeHtml(change.type)}: ${escapeHtml(change.name)}</span>`).join("") : `<span class="muted">No changes compared with previous state.</span>`;
  return `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Skills 与自动化台账</title><style>${style}</style></head><body><header><h1>Skills 与自动化台账</h1><div class="meta">Generated at ${escapeHtml(data.generatedAt)} · Workspace ${escapeHtml(data.workspace)}</div></header><main><div class="cards"><div class="card"><div class="num">${data.summary.skillsTotal}</div><div>Skills 总数</div></div><div class="card"><div class="num">${data.summary.automationsTotal}</div><div>自动化总数</div></div><div class="card"><div class="num">${data.summary.enabledAutomations}</div><div>启用自动化</div></div><div class="card"><div class="num">${data.summary.unclassifiedSkills}</div><div>未分类 Skills</div></div></div><div class="toolbar"><input id="search" placeholder="搜索 skill、描述或自动化"><select id="status"><option value="">全部自动化状态</option>${[...new Set(data.automations.map((a) => a.status).filter(Boolean))].map((status) => `<option>${escapeHtml(status)}</option>`).join("")}</select></div><section><h2>Skills 能力地图</h2>${skillSections}</section><section><h2>自动化任务</h2><table><thead><tr><th>编号</th><th>场景</th><th>状态</th><th>触发</th><th>运行时间</th><th>产出</th><th>外部投递</th><th>最后验证</th></tr></thead><tbody>${automationRows}</tbody></table></section><section><h2>变更详情</h2><div>${changes}</div></section></main><script>const search=document.getElementById('search');const status=document.getElementById('status');function applyFilters(){const q=search.value.trim().toLowerCase();const s=status.value;document.querySelectorAll('[data-search]').forEach((el)=>{const textMatch=!q||el.dataset.search.includes(q);const statusMatch=!s||!el.matches('tr')||el.children[2]?.textContent===s;el.style.display=textMatch&&statusMatch?'':'none';});}search.addEventListener('input',applyFilters);status.addEventListener('change',applyFilters);</script></body></html>`;
}

function main() {
  const args = parseArgs(process.argv);
  const workspace = path.resolve(args.workspace);
  const skillRoot = path.resolve(__dirname, "..");
  const outputDir = args.outputDir || path.join(workspace, "shared", "ledgers", "skill-automation-ledger");
  const inventoryText = readText(path.join(workspace, "codex-skills-inventory.md"));
  const automationText = readText(path.join(workspace, "automation-index.md"));
  const rules = readJson(path.join(skillRoot, "references", "category-rules.json"), { categories: [], defaultCategory: "未分类" });
  const overrides = readJson(path.join(skillRoot, "references", "category-overrides.json"), { byDir: {}, byName: {} });
  const statePath = path.join(outputDir, "state.json");
  const codexSkillsRoot = path.resolve(args.codexSkills);
  const agentsSkillsRoot = path.resolve(args.agentsSkills);
  const automationConfigDir = path.resolve(args.automationConfigDir);
  const skillRoots = [{ root: codexSkillsRoot, installScope: "codex" }, { root: agentsSkillsRoot, installScope: "agents" }];
  const sourceHash = sha256(JSON.stringify({ inventoryText, automationText, rules, overrides, codexSkills: listSkillDirs(codexSkillsRoot).map((dir) => [path.basename(dir), fileMtime(path.join(dir, "SKILL.md"))]), agentsSkills: listSkillDirs(agentsSkillsRoot).map((dir) => [path.basename(dir), fileMtime(path.join(dir, "SKILL.md"))]), automationConfigNames: fs.existsSync(automationConfigDir) ? fs.readdirSync(automationConfigDir, { withFileTypes: true }).map((entry) => entry.name) : [] }));
  const previousState = readJson(statePath, {});
  if (args.check && previousState.sourceHash === sourceHash) {
    const result = { changed: false, skipped: true, outputDir, sourceHash };
    if (args.format === "json") console.log(JSON.stringify(result, null, 2)); else console.log(`No ledger source changes detected. Output unchanged: ${outputDir}`);
    return;
  }
  const skills = loadSkills(parseInventory(inventoryText), rules, overrides, skillRoots);
  const automations = parseAutomationOverview(automationText);
  const data = { generatedAt: new Date().toISOString(), workspace, sourceHash, summary: { skillsTotal: skills.length, automationsTotal: automations.length, enabledAutomations: automations.filter((item) => item.status === "启用").length, unclassifiedSkills: skills.filter((item) => item.capability === (rules.defaultCategory || "未分类")).length }, skills, automations, changes: [] };
  data.changes = computeChanges(previousState, data);
  ensureDir(outputDir);
  const jsonPath = path.join(outputDir, "latest.json");
  const htmlPath = path.join(outputDir, "latest.html");
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), "utf8");
  fs.writeFileSync(htmlPath, renderHtml(data), "utf8");
  if (!args.noWriteState) fs.writeFileSync(statePath, JSON.stringify(data, null, 2), "utf8");
  const result = { changed: data.changes.length > 0, skipped: false, outputDir, htmlPath, jsonPath, statePath, summary: data.summary, changes: data.changes };
  if (args.format === "json") console.log(JSON.stringify(result, null, 2));
  else {
    console.log(`Ledger refreshed: ${htmlPath}`);
    console.log(`JSON snapshot: ${jsonPath}`);
    console.log(`Skills: ${data.summary.skillsTotal}; automations: ${data.summary.automationsTotal}; enabled automations: ${data.summary.enabledAutomations}; unclassified skills: ${data.summary.unclassifiedSkills}; changes: ${data.changes.length}`);
  }
}

try { main(); } catch (error) { console.error(error.stack || error.message); process.exit(1); }