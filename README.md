# Managed Agents Clone

A static frontend clone of the **Managed Agents** module from the Anthropic [Claude Console](https://console.anthropic.com/), built with mock data — no real API calls.

Built to match the look and feel of the official Console for: Quickstart, Agents, Sessions, Environments, and Credential Vaults.

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS v3
- React Router v6
- lucide-react

## Getting started

```bash
npm install
npm run dev
```

Then open <http://localhost:5173>.

## What's included

| Section | List | Detail | Modal |
| --- | --- | --- | --- |
| Quickstart | — | 4-step indicator, hero prompt, 10 template cards | — |
| Agents | ID / Name / Model / Status / Created / Updated | Tabs: Agent (version, model, system prompt, MCPs & tools, skills) + Sessions filtered by agent | New Agent (Describe / Template, YAML / JSON preview) |
| Sessions | ID / Name / Status / Agent / Created | Top meta bar, Transcript & Debug tabs, message detail side panel, Actions menu | New Session (title / agent / env / vaults / resources) |
| Environments | All / Active filter | Networking, Packages, Metadata cards | Add Environment (name / hosting / description) |
| Credential vaults | All / Active filter | Vault info + Credentials sub-table | New Vault, Add Credential (with MCP server search dropdown) |

The `Build` and `Analytics` sections in the sidebar render placeholder pages.

## Notes

- All data lives in `src/data/mock/` — `Agent 1`, `Agent 2`, etc. as generic placeholders.
- Forms inside modals are non-persistent: `Create` just closes the modal.
- Routing is set up so refresh keeps you on the right tab (`/sessions/:id` vs `/sessions/:id/debug` etc).
- `id` columns include real clipboard-copy buttons.
