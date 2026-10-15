import { ArrowRight, CircleDot, Play } from 'lucide-react';

type Props = { event: number; eventData: readonly (readonly string[])[]; onSelect: (index: number) => void; onFullDemo: () => void };
const validationTargets = [
  ['Valid modeled route recognized', 'Target'],
  ['Missing permission blocks transition', 'Target'],
  ['Credential invalidation removes modeled access', 'Target'],
  ['Uncovered route remains visible', 'Target'],
  ['Duplicate evidence does not duplicate observations', 'Target'],
];

export default function PrototypeSummary({ event, eventData, onSelect, onFullDemo }: Props) {
  const current = eventData[event];
  return <div className="prototype-summary">
    <div className="prototype-live-card">
      <div className="prototype-status"><i/> WORKING BROWSER PROTOTYPE <span>PREDEFINED SYNTHETIC SCENARIO</span></div>
      <div className="prototype-flow"><b>01 · RECEIVE</b><ArrowRight/><b>02 · ASSESS MODELED PATH</b><ArrowRight/><b>03 · SIMULATE FIX</b></div>
      <div className="prototype-event">
        <div className="prototype-event-select" role="group" aria-label="Choose a shared scenario event">{eventData.map((entry, index) => <button key={entry[2]} type="button" onClick={() => onSelect(index)} aria-pressed={event === index} title={`${entry[0]} ${entry[1]}`}><span>{String(index + 1).padStart(2, '0')}</span><i/></button>)}</div>
        <span className="prototype-time">{current[0]} · {current[2]}</span>
        <h3>{current[1]}</h3>
        <p>{current[4]}</p>
        <small>{current[8]} · {current[7]}</small>
      </div>
      <button type="button" className="primary-btn prototype-open" onClick={onFullDemo}>Open full replay &amp; evidence inspector <Play size={14}/></button>
    </div>
    <div className="prototype-validation">
      <span className="risk-kicker">VALIDATION TARGETS · NOT MEASURED RESULTS</span>
      {validationTargets.map(([label, status]) => <div key={label}><CircleDot size={14}/><span>{label}</span><b>{status}</b></div>)}
      <p>Next milestone: persistent backend, one telemetry/inventory integration and evaluation on held-out scenarios.</p>
    </div>
  </div>;
}
