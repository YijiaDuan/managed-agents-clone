import type { Template } from '../../types/template';

export const mockTemplates: Template[] = [
  {
    id: 'tpl_blank',
    name: 'Blank agent config',
    description: 'A blank starting point with the core toolset.',
    connectorIcons: [],
  },
  {
    id: 'tpl_deep_researcher',
    name: 'Deep researcher',
    description: 'Conducts multi-step web research with source synthesis and citations.',
    connectorIcons: [],
  },
  {
    id: 'tpl_extractor',
    name: 'Structured extractor',
    description: 'Parses unstructured text into a typed JSON schema.',
    connectorIcons: [],
    highlighted: true,
  },
  {
    id: 'tpl_field_monitor',
    name: 'Field monitor',
    description: 'Scans software blogs for a topic and writes a weekly what-changed brief.',
    connectorIcons: [{ initial: 'N', color: '#191919' }],
  },
  {
    id: 'tpl_support_agent',
    name: 'Support agent',
    description: 'Answers customer questions from your docs and knowledge base, and escalates when needed.',
    connectorIcons: [
      { initial: 'N', color: '#191919' },
      { initial: 'S', color: '#4A154B' },
    ],
  },
  {
    id: 'tpl_incident',
    name: 'Incident commander',
    description: 'Triages a Sentry alert, opens a Linear incident ticket, and runs the Slack war room.',
    connectorIcons: [
      { initial: 'A', color: '#5E6AD2' },
      { initial: 'B', color: '#5E6AD2' },
      { initial: 'S', color: '#4A154B' },
      { initial: 'G', color: '#181717' },
    ],
  },
  {
    id: 'tpl_feedback',
    name: 'Feedback miner',
    description: 'Clusters raw feedback from Slack and Notion into themes and drafts Asana tasks for the top asks.',
    connectorIcons: [
      { initial: 'S', color: '#4A154B' },
      { initial: 'N', color: '#191919' },
      { initial: 'A', color: '#F06A6A' },
    ],
  },
  {
    id: 'tpl_retro',
    name: 'Sprint retro facilitator',
    description: 'Pulls a closed sprint from Linear, synthesizes themes, and writes the retro doc before the meeting.',
    connectorIcons: [
      { initial: 'L', color: '#5E6AD2' },
      { initial: 'S', color: '#4A154B' },
      { initial: 'D', color: '#2563EB' },
    ],
  },
  {
    id: 'tpl_support_eng',
    name: 'Support-to-eng escalator',
    description: 'Reads an Intercom conversation, reproduces the bug, and files a linked Jira issue with repro steps.',
    connectorIcons: [
      { initial: 'I', color: '#1F8DED' },
      { initial: 'A', color: '#0052CC' },
      { initial: 'S', color: '#4A154B' },
    ],
  },
  {
    id: 'tpl_data_analyst',
    name: 'Data analyst',
    description: 'Load, explore, and visualize data; build reports and answer questions from datasets.',
    connectorIcons: [{ initial: 'A', color: '#0EA5E9' }],
  },
];
