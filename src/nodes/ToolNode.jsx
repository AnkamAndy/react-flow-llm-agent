import { Handle, Position } from 'reactflow';

export default function ToolNode({ data }) {
  return (
    <div className="node node-tool">
      <Handle type="target" position={Position.Left} />
      <div className="node-icon">{data.icon}</div>
      <div className="node-label">{data.label}</div>
      <div className="node-sub">{data.sub}</div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
