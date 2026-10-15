import { ArrowRight, CircleCheck, CircleDot } from 'lucide-react';

export default function PrototypeSummary({onFullDemo}:{onFullDemo:()=>void}){
  return <div className="prototype-summary">
    <div className="prototype-live-card">
      <span className="synthetic-label">SYNTHETIC PROTOTYPE · DEMONSTRATED BEHAVIOR</span>
      <div className="prototype-result">
        <CircleCheck size={28}/>
        <span className="risk-kicker">INTERVENTION RESULT</span>
        <h3>Two high-priority modeled routes blocked with a 3-point action combination.</h3>
        <p>One residual route remains visible.</p>
      </div>
      <div className="prototype-mini-flow"><span>SHARED EVENT</span><ArrowRight/><span>MODELED PATH</span><ArrowRight/><span>SIMULATED FIX</span></div>
      <button type="button" className="primary-btn prototype-open" onClick={onFullDemo}>Open full event replay &amp; evidence <ArrowRight size={15}/></button>
    </div>
    <div className="prototype-validation">
      <span className="risk-kicker">WHAT THE PROTOTYPE DOES</span>
      <div><CircleDot/><span>Inspects one predefined synthetic event sequence</span></div>
      <div><CircleDot/><span>Compares four candidate actions in the browser</span></div>
      <div><CircleDot/><span>Shows blocked routes and residual exposure</span></div>
      <details className="scope-assumptions"><summary>Future validation targets · not measured</summary><p>Held-out and temporal scenarios; valid-path and missing-permission checks; duplicate evidence handling; ranking quality; update latency; intervention coverage and residual exposure.</p></details>
    </div>
  </div>;
}
