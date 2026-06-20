import { useCallback, useEffect, useState, useMemo } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

import IONode      from './nodes/IONode';
import AgentNode   from './nodes/AgentNode';
import ToolNode    from './nodes/ToolNode';
import MemoryNode  from './nodes/MemoryNode';
import { initialNodes, initialEdges } from './agentData';
import './App.css';

const nodeTypes = {
  io:     IONode,
  agent:  AgentNode,
  tool:   ToolNode,
  memory: MemoryNode,
};

const miniMapColors = {
  io:     '#2dd4bf',
  agent:  '#818cf8',
  tool:   '#f59e0b',
  memory: '#c084fc',
};

// Each step: which nodes/edges glow
const STEPS = [
  { nodes: ['input'],                                                   edges: [] },
  { nodes: ['router', 'memory'],                                        edges: ['e-in-router', 'e-router-mem', 'e-mem-router'] },
  { nodes: ['planner'],                                                  edges: ['e-router-plan'] },
  { nodes: ['selector'],                                                 edges: ['e-plan-sel'] },
  { nodes: ['tool-web', 'tool-rag', 'tool-code', 'tool-calc'],          edges: ['e-sel-web', 'e-sel-rag', 'e-sel-code', 'e-sel-calc'] },
  { nodes: ['synthesizer'],                                              edges: ['e-web-syn', 'e-rag-syn', 'e-code-syn', 'e-calc-syn'] },
  { nodes: ['output'],                                                   edges: ['e-syn-out'] },
  { nodes: [],                                                           edges: [] },
];

const STEP_MS = 950;

export default function App() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [step, setStep] = useState(0);

  // Cycle through steps on a timer
  useEffect(() => {
    const id = setInterval(() => setStep(s => (s + 1) % STEPS.length), STEP_MS);
    return () => clearInterval(id);
  }, []);

  const { nodes: activeNodeIds, edges: activeEdgeIds } = STEPS[step];

  // Inject className onto active nodes/edges
  const animatedNodes = useMemo(() =>
    nodes.map(n => ({
      ...n,
      className: activeNodeIds.includes(n.id) ? 'active' : '',
    })),
    [nodes, activeNodeIds]
  );

  const animatedEdges = useMemo(() =>
    edges.map(e => ({
      ...e,
      className: activeEdgeIds.includes(e.id) ? 'edge-active' : '',
      style: {
        ...e.style,
        ...(activeEdgeIds.includes(e.id) ? { strokeWidth: 3, opacity: 1 } : { opacity: 0.35 }),
      },
    })),
    [edges, activeEdgeIds]
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [setEdges]
  );

  const stepLabels = [
    'User sends a message',
    'Intent Router classifies query ↔ Memory',
    'Task Planner breaks into sub-tasks',
    'Tool Selector picks tools via function call',
    'Tools execute in parallel',
    'Synthesizer merges results',
    'Final response delivered',
    '',
  ];

  return (
    <div className="app">
      <header className="header">
        <h1>LLM Agent Workflow</h1>
        <div className="step-label">{stepLabels[step] || 'Route → Plan → Tool call → Synthesize'}</div>
        <div className="legend">
          <span className="legend-item io">I/O</span>
          <span className="legend-item agent">Agents</span>
          <span className="legend-item tool">Tools</span>
          <span className="legend-item memory">Memory</span>
        </div>
      </header>

      <div className="canvas">
        <ReactFlow
          nodes={animatedNodes}
          edges={animatedEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.15 }}
        >
          <Background color="#1e293b" gap={24} />
          <Controls />
          <MiniMap
            nodeColor={(n) => miniMapColors[n.type] || '#888'}
            style={{ background: '#0f172a' }}
          />
        </ReactFlow>
      </div>
    </div>
  );
}
