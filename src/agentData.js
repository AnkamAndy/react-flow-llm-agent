export const initialNodes = [
  // Input
  {
    id: 'input',
    type: 'io',
    position: { x: 20, y: 280 },
    data: { label: 'User Message', sub: 'Natural language query', icon: '💬', direction: 'input' },
  },

  // Memory
  {
    id: 'memory',
    type: 'memory',
    position: { x: 230, y: 80 },
    data: { label: 'Conversation Memory', sub: 'Chat history + context', icon: '🧠' },
  },

  // Agent layer 1 — Router
  {
    id: 'router',
    type: 'agent',
    position: { x: 230, y: 270 },
    data: {
      label: 'Intent Router',
      sub: 'Classify & decompose',
      icon: '🔀',
      badge: 'GPT-4o',
      memoryHandle: true,
    },
  },

  // Agent layer 2 — Planner
  {
    id: 'planner',
    type: 'agent',
    position: { x: 470, y: 270 },
    data: { label: 'Task Planner', sub: 'Break into sub-tasks', icon: '🗂️', badge: 'ReAct' },
  },

  // Agent layer 3 — Tool Selector
  {
    id: 'selector',
    type: 'agent',
    position: { x: 710, y: 270 },
    data: { label: 'Tool Selector', sub: 'Choose best tool(s)', icon: '⚙️', badge: 'Function call' },
  },

  // Tools
  {
    id: 'tool-web',
    type: 'tool',
    position: { x: 960, y: 60 },
    data: { label: 'Web Search', sub: 'Tavily / SerpAPI', icon: '🌐' },
  },
  {
    id: 'tool-rag',
    type: 'tool',
    position: { x: 960, y: 210 },
    data: { label: 'RAG Retrieval', sub: 'Pinecone · pgvector', icon: '📚' },
  },
  {
    id: 'tool-code',
    type: 'tool',
    position: { x: 960, y: 360 },
    data: { label: 'Code Executor', sub: 'Python sandbox', icon: '🐍' },
  },
  {
    id: 'tool-calc',
    type: 'tool',
    position: { x: 960, y: 510 },
    data: { label: 'Calculator', sub: 'Wolfram Alpha', icon: '🧮' },
  },

  // Synthesizer
  {
    id: 'synthesizer',
    type: 'agent',
    position: { x: 1210, y: 270 },
    data: { label: 'Synthesizer', sub: 'Merge & reason over results', icon: '✍️', badge: 'GPT-4o' },
  },

  // Output
  {
    id: 'output',
    type: 'io',
    position: { x: 1460, y: 280 },
    data: { label: 'Final Response', sub: 'Grounded · cited', icon: '✅', direction: 'output' },
  },
];

const agentEdge   = (id, s, t, label) => ({ id, source: s, target: t, label, animated: true,  style: { stroke: '#818cf8' }, labelStyle: { fill: '#c7d2fe', fontSize: 10 }, labelBgStyle: { fill: '#1e1b4b' } });
const toolEdge    = (id, s, t)        => ({ id, source: s, target: t,        animated: false, style: { stroke: '#f59e0b', strokeDasharray: '5 3' } });
const resultEdge  = (id, s, t)        => ({ id, source: s, target: t,        animated: true,  style: { stroke: '#34d399' } });
const memEdge     = (id, s, sh, t, th) => ({ id, source: s, sourceHandle: sh, target: t, targetHandle: th, animated: false, style: { stroke: '#c084fc', strokeDasharray: '4 3' }, type: 'smoothstep' });

export const initialEdges = [
  // Input → Router
  agentEdge('e-in-router',   'input',    'router',      ''),

  // Memory ↔ Router
  memEdge('e-router-mem',  'router',  'mem',    'memory', 'mem-in'),
  memEdge('e-mem-router',  'memory',  'mem-out','router',  null),

  // Router → Planner
  agentEdge('e-router-plan', 'router',   'planner',     'Intent'),

  // Planner → Selector
  agentEdge('e-plan-sel',    'planner',  'selector',    'Sub-tasks'),

  // Selector → Tools
  toolEdge('e-sel-web',  'selector', 'tool-web'),
  toolEdge('e-sel-rag',  'selector', 'tool-rag'),
  toolEdge('e-sel-code', 'selector', 'tool-code'),
  toolEdge('e-sel-calc', 'selector', 'tool-calc'),

  // Tools → Synthesizer
  resultEdge('e-web-syn',  'tool-web',  'synthesizer'),
  resultEdge('e-rag-syn',  'tool-rag',  'synthesizer'),
  resultEdge('e-code-syn', 'tool-code', 'synthesizer'),
  resultEdge('e-calc-syn', 'tool-calc', 'synthesizer'),

  // Synthesizer → Output
  agentEdge('e-syn-out', 'synthesizer', 'output', ''),
];
