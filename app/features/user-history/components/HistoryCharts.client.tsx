import * as d3 from 'd3';
import { SelectUserHistory } from '~/db/schemas';

const width = window.innerWidth - 32;
const height = 300;
const margin = 24;

export function HistoryCharts({ history }: { history: SelectUserHistory[] }) {
  const x = d3.scaleLinear(
    [0, history.length - 1],
    [margin * 2, width - margin * 2]
  );
  const y = d3.scaleLinear([0, 50], [height - margin, margin]);
  const line = d3.line((_, i) => x(i), y);
  //
  return (
    <svg width={width} height={height}>
      <defs>
        <marker
          id="arrow"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" />
        </marker>
      </defs>

      <line
        x1={margin}
        y1={height - margin}
        x2={margin}
        y2={margin}
        stroke="black"
        strokeWidth={1.5}
        markerEnd="url(#arrow)"
      />
      <line
        x1={margin}
        y1={height - margin}
        x2={width - margin}
        y2={height - margin}
        stroke="black"
        strokeWidth={1.5}
        markerEnd="url(#arrow)"
      />
      <text x={0} y={margin} fontSize={14}>
        50
      </text>
      <text x={0} y={height - margin} fontSize={14}>
        0
      </text>

      <line
        x1={margin}
        x2={width - margin}
        y1={y(40)}
        y2={y(40)}
        stroke="green"
      />
      <path
        d={line(history.map(({ score }) => score)) ?? ''}
        strokeWidth={4}
        stroke="red"
        fill="none"
      />
      <g>
        {history.map(({ score }, i) => (
          <>
            <circle key={i} cx={x(i)} cy={y(score)} r={4} fill="red" />
            <text
              x={x(i)}
              y={y(score) - 12}
              fontSize={12}
              fontWeight={600}
              textAnchor="middle"
            >
              {score}
            </text>
          </>
        ))}
      </g>
    </svg>
  );
}
