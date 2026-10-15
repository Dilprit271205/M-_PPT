import { ArrowRight, ShieldAlert } from 'lucide-react';

const factors = ['Credential validity', 'Permissions', 'Exposure', 'Exploit prerequisites', 'Defensive controls', 'Observed activity', 'Asset criticality'];
const trust = [
  ['Source reliability', 'Source-specific; not scored'],
  ['Freshness', 'Event timestamp shown'],
  ['Corroboration', 'Not independently established'],
  ['Entity matching', 'Inventory link; validity unverified'],
  ['Prerequisite coverage', 'Role and access need validation'],
];

export default function RiskTrustSlide() {
  return <div className="risk-trust-panel">
    <div className="risk-trust-main">
      <div className="risk-card">
        <span className="risk-kicker">RISK · POTENTIAL IMPACT + MODELED ROUTE</span>
        <h3>Critical potential impact</h3>
        <p>Path A reaches sensitive customer-data storage if the credential, principal binding and role permissions are valid.</p>
        <div className="risk-factor-list">{factors.map(factor => <span key={factor}>{factor}</span>)}</div>
        <small>Path priorities are predefined scenario categories. This prototype does not calculate likelihood or a numeric risk score.</small>
      </div>
      <div className="trust-card">
        <span className="risk-kicker">TRUST VECTOR · EVIDENCE QUALITY</span>
        <h3>Early evidence · verify before escalation</h3>
        <p>Secret exposure observed. Credential validity and downstream permissions require verification.</p>
        <dl>{trust.map(([name, value]) => <div key={name}><dt>{name}</dt><dd>{value}</dd></div>)}</dl>
        <b className="risk-recommendation">NEXT STEP <ArrowRight size={14}/> Validate key status, principal binding and role policy.</b>
      </div>
    </div>
    <div className="proposed-inference"><ShieldAlert size={17}/><span><b>PROPOSED INTELLIGENCE · NOT IMPLEMENTED</b> Bayesian updates for defined hypotheses → Monte Carlo target-reachability estimates → risk assessment. Results depend on evidence dependencies and transition assumptions; neither method is automatically calibrated.</span></div>
  </div>;
}
