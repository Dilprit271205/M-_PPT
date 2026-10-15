import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

type Status = 'Implemented' | 'Planned MVP' | 'Future extension';
type Technology = {
  name: string;
  status: Status;
  role: string;
  input: string;
  output: string;
  example: string;
};

const statusLabel: Record<Status, string> = {
  Implemented: 'IMPLEMENTED',
  'Planned MVP': 'PLANNED MVP',
  'Future extension': 'FUTURE EXTENSION',
};

const layers: { name: string; technologies: Technology[]; note?: string }[] = [
  {
    name: '01 · FRONTEND & VISUALIZATION',
    technologies: [
      { name: 'React + TypeScript', status: 'Implemented', role: 'Renders the presentation, evidence inspector, graph controls and intervention simulation.', input: 'Synthetic event and asset data held in the browser.', output: 'Interactive dashboard with shared client-side state.', example: 'Selecting a replay event updates its evidence and predicted next step.' },
      { name: 'SVG + CSS', status: 'Implemented', role: 'Draws the current illustrative graph and its path labels in the browser.', input: 'Predefined scenario nodes, edges and selected route.', output: 'Interactive, styled graph illustration.', example: 'Choose a path to emphasize its modeled sequence.' },
      { name: 'Cytoscape.js', status: 'Planned MVP', role: 'Proposed graph interaction and analytical layout library.', input: 'Typed assets and relationships from the graph API.', output: 'Selectable graph nodes, relationships and route overlays.', example: 'Highlight the identity-to-customer-data path while dimming unrelated assets.' },
      { name: 'Three.js', status: 'Future extension', role: 'Optional real-time 3D visualization for the cinematic network scene.', input: 'Graph topology and presentation state.', output: 'A rendered 3D overview scene.', example: 'Animate a restrained event pulse across a candidate route.' },
      { name: 'GSAP ScrollTrigger', status: 'Implemented', role: 'Coordinates scroll-aware chapter state and visual transitions.', input: 'Scroll position and chapter boundaries.', output: 'Chapter updates and synchronized demo replay progress.', example: 'Scrolling through the synthetic replay advances the visible event.' },
      { name: 'Lenis', status: 'Implemented', role: 'Provides smooth wheel-driven scrolling for the presentation.', input: 'User scroll input.', output: 'Smoothed page-scroll updates shared with GSAP ScrollTrigger.', example: 'A chapter jump scrolls to the corresponding reading area.' },
    ],
  },
  {
    name: '02 · BACKEND & INGESTION',
    technologies: [
      { name: 'FastAPI + Pydantic', status: 'Planned MVP', role: 'Proposed API for validated security-event ingestion and graph analysis.', input: 'Source event payloads mapped to a canonical schema.', output: 'Validated events and graph-analysis responses.', example: 'Normalize Event ID, timestamp, source, actor, action, target and evidence reference before analysis.' },
    ],
    note: 'Canonical fields: Event ID · timestamp · source · actor · action · target · evidence reference',
  },
  {
    name: '03 · DATA STORAGE',
    technologies: [
      { name: 'PostgreSQL', status: 'Planned MVP', role: 'Proposed source of record for assets and traceable security evidence.', input: 'Asset inventory, identities, permissions, normalized events and provenance.', output: 'Durable records available to graph construction and investigations.', example: 'Trace a relationship back to the source event and ingestion time.' },
    ],
  },
  {
    name: '04 · GRAPH & PATH ENGINE',
    technologies: [
      { name: 'NetworkX', status: 'Planned MVP', role: 'Proposed typed graph and bounded candidate-path search engine.', input: 'Entities, relationships, permissions, prerequisites and reachability.', output: 'Feasible candidate paths with explicit assumptions.', example: 'Exposed key → allowed role assumption → sensitive-data access.' },
    ],
    note: 'Feasibility rules stay explicit; a model cannot invent missing permissions or connections.',
  },
  {
    name: '05 · INTERVENTION OPTIMIZER',
    technologies: [
      { name: 'Python action optimizer', status: 'Planned MVP', role: 'Backend implementation of the small-scenario exhaustive action search.', input: 'Modeled routes, candidate actions, route coverage and operational costs.', output: 'Lowest-cost action set that blocks every modeled Critical and High route.', example: 'Invalidate exposed credential access + restrict public staging → A and B blocked → 3 units.' },
    ],
    note: 'The current demo runs this exhaustive comparison in TypeScript in the browser.',
  },
];

const modelDetails: Technology = {
  name: 'PyTorch + PyTorch Geometric',
  status: 'Future extension',
  role: 'Proposed heterogeneous graph neural network to rank candidate paths using learned relational signals.',
  input: 'Identities, roles, repositories, secrets, endpoints, services and data assets; features include privilege scope, exposure, secret validity, applicable vulnerability context, asset criticality and event timing.',
  output: 'A learned ranking signal for candidate paths. Explicit permission and reachability checks remain outside the model.',
  example: 'Compare a feasible key-to-role route against other feasible routes; never create an edge or grant that is absent from inventory.',
};

const probabilityDetails: Technology = {
  name: 'Bayesian evidence assessment',
  status: 'Future extension',
  role: 'A separate probabilistic layer for updating explicit hypotheses as evidence changes.',
  input: 'Named hypotheses, stated priors, evidence likelihoods and supporting or contradictory observations.',
  output: 'An updated assessment only after dependencies, correlated evidence and calibration are handled.',
  example: 'A scanner finding and a downstream alert from the same source should not be counted as independent corroboration.',
};

const intelDetails: Technology = {
  name: 'Threat-intelligence enrichment',
  status: 'Planned MVP',
  role: 'Add source-linked context to a candidate path; mappings do not establish that an attack occurred.',
  input: 'MITRE ATT&CK behavior context; CVE/CVSS identity and severity; EPSS likelihood; CISA KEV known exploitation; D3FEND countermeasure vocabulary.',
  output: 'Enriched evidence context and defensive options attached to relevant entities or findings.',
  example: 'Use CVE applicability and KEV status as separate facts, then verify installed version and exploit prerequisites.',
};

function TechStackSlide() {
  const [reveal, setReveal] = useState<1 | 2>(1);
  const [selected, setSelected] = useState<Technology | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const openDetails = (technology: Technology, trigger: HTMLElement) => {
    returnFocusRef.current = trigger;
    setSelected(technology);
  };

  useEffect(() => {
    if (!selected) return;
    const dialog = dialogRef.current;
    const previousFocus = returnFocusRef.current;
    dialog?.querySelector<HTMLButtonElement>('button')?.focus();
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        setSelected(null);
        return;
      }
      if (event.key !== 'Tab' || !dialog) return;
      const items = [...dialog.querySelectorAll<HTMLElement>('button:not([disabled])')];
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      requestAnimationFrame(() => previousFocus?.focus());
    };
  }, [selected]);

  const onRevealKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      event.stopPropagation();
      setReveal(2);
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      event.stopPropagation();
      setReveal(1);
    }
  };

  return <div className="techstack-panel" aria-label="AttackTwin technology and intelligence engine">
    <div className="techstack-reveal" role="group" aria-label="Chapter 7 content reveals">
      <span className="techstack-step-count">0{reveal} / 02</span>
      <button type="button" onClick={() => setReveal(1)} onKeyDown={onRevealKeyDown} aria-pressed={reveal === 1} className={reveal === 1 ? 'active' : ''}>01&nbsp; ARCHITECTURE &amp; IMPLEMENTATION</button>
      <button type="button" onClick={() => setReveal(2)} onKeyDown={onRevealKeyDown} aria-pressed={reveal === 2} className={reveal === 2 ? 'active' : ''}>02&nbsp; SECURITY REASONING</button>
    </div>

    {reveal === 1 ? <div className="techstack-reveal-content" key="core">
      <div className="techstack-flow-pair">
        <div className="techstack-flow-track current-track"><div className="techstack-flow-label"><span>CURRENT PROTOTYPE</span><b>IMPLEMENTED</b></div><div className="techstack-flow" aria-label="Implemented browser prototype flow">{['Synthetic events', 'TypeScript rules + optimizer', 'React dashboard'].map((step, index) => <div className="techstack-flow-step" key={step}><span>{step}</span>{index < 2 && <ArrowRight aria-hidden="true" size={15}/>}</div>)}</div></div>
        <div className="techstack-flow-track planned-track"><div className="techstack-flow-label"><span>PLANNED SERVICE ARCHITECTURE</span><b>PLANNED MVP</b></div><div className="techstack-flow" aria-label="Planned service architecture">{['Telemetry', 'FastAPI', 'PostgreSQL + NetworkX', 'Python optimizer', 'React dashboard'].map((step, index) => <div className="techstack-flow-step" key={step}><span>{step}</span>{index < 4 && <ArrowRight aria-hidden="true" size={15}/>}</div>)}</div></div>
      </div>
      <div className="techstack-layers">
        {layers.map(layer => <section className="techstack-layer" key={layer.name} aria-label={layer.name}>
          <h3>{layer.name}</h3>
          <div className="techstack-technologies">
            {layer.technologies.map(technology => <button type="button" className="techstack-tech" key={technology.name} onClick={event => openDetails(technology, event.currentTarget)} aria-haspopup="dialog">
              <span className="techstack-tech-name">{technology.name}</span>
              <span className={`techstack-status status-${technology.status.toLowerCase().replaceAll(' ', '-')}`}>{statusLabel[technology.status]}</span>
              <ArrowRight aria-hidden="true" size={14}/>
            </button>)}
          </div>
          {layer.note && <p className="techstack-layer-note">{layer.note}</p>}
        </section>)}
      </div>
      <button className="techstack-next" type="button" onClick={() => setReveal(2)}>Reveal ML &amp; threat intelligence <ArrowRight size={15}/></button>
    </div> : <div className="techstack-reveal-content" key="intelligence">
      <div className="techstack-engine-heading">
        <span>PROPOSED INTELLIGENCE LAYER · NOT IMPLEMENTED</span>
        <h3>Rules validate feasibility.<br/><em>ML improves ranking.</em></h3>
      </div>
      <div className="techstack-intelligence-grid">
        <section className="techstack-intel-card proposed-card">
          <div className="techstack-card-heading"><h4>Heterogeneous graph model</h4><span className="techstack-status status-future-extension">FUTURE EXTENSION</span></div>
          <button className="techstack-open-tech" type="button" onClick={event => openDetails(modelDetails, event.currentTarget)} aria-haspopup="dialog">PyTorch + PyTorch Geometric <ArrowRight size={14}/></button>
          <p><b>Entities</b> Identities, roles, repositories, secrets, endpoints, services and data assets.</p>
          <p><b>Features</b> Privilege scope, exposure, secret validity, vulnerability context, asset criticality and event timing.</p>
          <p><b>Task</b> Improve ranking across paths that already pass explicit feasibility checks.</p>
        </section>
        <section className="techstack-intel-card proposed-card">
          <div className="techstack-card-heading"><h4>Probabilistic assessment</h4><span className="techstack-status status-future-extension">FUTURE EXTENSION</span></div>
          <button className="techstack-open-tech" type="button" onClick={event => openDetails(probabilityDetails, event.currentTarget)} aria-haspopup="dialog">Bayesian inference <ArrowRight size={14}/></button>
          <p>Define hypotheses, priors and evidence likelihoods. Update as supporting or contradictory evidence arrives.</p>
          <p>Account for correlated evidence and validate calibration before showing numerical probabilities.</p>
          <small className="techstack-separation">Separate layer; not a “Bayesian GNN.”</small>
        </section>
      </div>
      <div className="techstack-intel-lower">
        <section className="techstack-enrichment">
          <div className="techstack-card-heading"><h4>Threat enrichment</h4><span className="techstack-status status-planned-mvp">PLANNED MVP</span></div>
          <button className="techstack-open-tech" type="button" onClick={event => openDetails(intelDetails, event.currentTarget)} aria-haspopup="dialog">ATT&amp;CK · CVE/CVSS · EPSS · KEV · D3FEND <ArrowRight size={14}/></button>
          <p>Behavior · identity and severity · exploitation likelihood · known exploitation · countermeasure vocabulary.</p>
        </section>
        <section className="techstack-validation">
          <h4>Validation gates</h4>
          <ul>{['Held-out scenarios · temporal splits', 'Precision@k · false-path rate', 'Probability calibration · where applicable', 'Graph-update latency', 'Residual exposure after intervention', 'Compare learned ranking with rules-only baseline'].map(item => <li key={item}>{item}</li>)}</ul>
        </section>
      </div>
      <div className="techstack-feasibility-note"><b>Feasibility remains deterministic.</b> Learned scores may reorder valid candidate paths; they cannot create nonexistent permissions, entities or connections.</div>
      <section className="techstack-reasoning" aria-label="Security frameworks referenced by the prototype"><h4>SECURITY FRAMEWORKS · REFERENCED, NOT INTEGRATED</h4><div><article><b>STRIDE</b><span>Threats at components and trust boundaries.</span></article><article><b>MITRE ATT&amp;CK</b><span>Behavior context; Valid Accounts may contextualize supported credential misuse.</span></article><article><b>MITRE Attack Flow</b><span>Structure connected attack-action narratives.</span></article><article><b>MITRE D3FEND</b><span>Defensive countermeasure vocabulary.</span></article></div><p><b>Vulnerability enrichment:</b> CVE identifies · CVSS severity · EPSS exploitation-likelihood context · CISA KEV known exploitation. These mappings add context; permissions, prerequisites and evidence establish feasibility. Scoring and optimization are separate.</p></section>
      <button className="techstack-back" type="button" onClick={() => setReveal(1)}><ArrowLeft size={15}/> Back to core technology</button>
    </div>}

    <p className="techstack-footer">Prototype: synthetic events, explicit graph rules and explainable priorities.<br/>Trained ML and live integrations require implementation and validation.</p>

    {selected && <div className="techstack-dialog-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) setSelected(null); }}>
      <div className="techstack-dialog" role="dialog" aria-modal="true" aria-labelledby="techstack-dialog-title" tabIndex={-1} ref={dialogRef}>
        <div className="techstack-dialog-top"><span>COMPONENT DETAIL</span><button type="button" onClick={() => setSelected(null)} aria-label="Close technology details"><X size={18}/></button></div>
        <h3 id="techstack-dialog-title">{selected.name}</h3>
        <span className={`techstack-status status-${selected.status.toLowerCase().replaceAll(' ', '-')}`}>{statusLabel[selected.status]}</span>
        <dl><div><dt>ROLE</dt><dd>{selected.role}</dd></div><div><dt>INPUT</dt><dd>{selected.input}</dd></div><div><dt>OUTPUT</dt><dd>{selected.output}</dd></div><div><dt>EXAMPLE</dt><dd>{selected.example}</dd></div></dl>
        <button type="button" className="techstack-dialog-close" onClick={() => setSelected(null)}>Close details <X size={14}/></button>
      </div>
    </div>}
  </div>;
}

export default TechStackSlide;
