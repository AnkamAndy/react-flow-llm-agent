import { useCallback } from 'react';
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

export default function App() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [setEdges]
  );

  return (
    <div className="app">
      <header className="header">
        <h1>LLM Agent Workflow</h1>
        <p>Route → Plan → Tool call → Synthesize</p>
        <div className="legend">
          <span className="legend-item io">I/O</span>
          <span className="legend-item agent">Agents</span>
          <span className="legend-item tool">Tools</span>
          <span className="legend-item memory">Memory</span>
        </div>
      </header>

      <div className="canvas">
        <ReactFlow
          nodes={nodes}
          edges={edges}
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
