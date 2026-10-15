import { ArrowRight } from 'lucide-react';

export default function RiskTrustSlide() {
  return <div className="risk-trust-panel">
    <span className="synthetic-label">SYNTHETIC PROTOTYPE · PRIORITIES ARE PREDEFINED SCENARIO CATEGORIES</span>
    <div className="risk-decision-grid">
      <article className="risk-decision-card">
        <span>RISK</span>
        <h3>Potential likelihood × business impact</h3>
        <p>Path A could reach sensitive customer-data storage if the credential and role permissions are valid.</p>
      </article>
      <article className="risk-decision-card">
        <span>TRUST</span>
        <h3>Evidence quality and completeness</h3>
        <p>A secret finding is observed. Credential validity, principal binding and downstream permissions still need confirmation.</p>
      </article>
      <article className="risk-decision-card decision-next">
        <span>DECISION · NEXT STEP</span>
        <h3>Path A: urgent validation</h3>
        <p>Sensitive customer data is potentially reachable. Verify credential validity and role permissions; contain access if confirmed.</p>
        <ArrowRight size={18} aria-hidden="true"/>
      </article>
    </div>
    <details className="scope-assumptions"><summary>Scope &amp; assumptions</summary><p>Current priorities are predefined scenario categories. This prototype calculates neither likelihood nor a numeric risk/trust score. Bayesian evidence updating and probability calibration are proposed, not implemented.</p></details>
  </div>;
}
