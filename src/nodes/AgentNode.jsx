import { Handle, Position } from 'reactflow';

export default function AgentNode({ data }) {
  return (
    <div className="node node-agent">
      <Handle type="target" position={Position.Left} />
      <div className="node-icon">{data.icon}</div>
      <div className="node-label">{data.label}</div>
      <div className="node-sub">{data.sub}</div>
      {data.badge && <div className="node-badge">{data.badge}</div>}
      <Handle type="source" position={Position.Right} />
      {data.memoryHandle && (
        <Handle type="source" position={Position.Top} id="mem" />
      )}
    </div>
  );
}
