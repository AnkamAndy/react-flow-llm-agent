import { Handle, Position } from 'reactflow';

export default function IONode({ data }) {
  const isInput = data.direction === 'input';
  return (
    <div className={`node node-io ${isInput ? 'node-io--in' : 'node-io--out'}`}>
      <div className="node-icon">{data.icon}</div>
      <div className="node-label">{data.label}</div>
      <div className="node-sub">{data.sub}</div>
      {isInput && <Handle type="source" position={Position.Right} />}
      {!isInput && <Handle type="target" position={Position.Left} />}
    </div>
  );
}
