import { Handle, Position } from 'reactflow';

export default function MemoryNode({ data }) {
  return (
    <div className="node node-memory">
      <Handle type="target" position={Position.Bottom} id="mem-in" />
      <div className="node-icon">{data.icon}</div>
      <div className="node-label">{data.label}</div>
      <div className="node-sub">{data.sub}</div>
      <Handle type="source" position={Position.Right} id="mem-out" />
    </div>
  );
}
