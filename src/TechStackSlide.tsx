import { useEffect, useRef, useState } from 'react';
import { ArrowRight, X } from 'lucide-react';

type Status='Implemented'|'Planned'|'Proposed';
type Detail={name:string;status:Status;role:string;input:string;output:string;example:string};
const layers:{name:string;status:Status;flow:string;items:Detail[]}[]=[
  {name:'Browser prototype',status:'Implemented',flow:'Predefined synthetic events → TypeScript intervention comparison → React interface',items:[
    {name:'React + TypeScript',status:'Implemented',role:'Runs the browser interface, shared demo state, replay and intervention comparison.',input:'Predefined synthetic event and path data.',output:'Interactive presentation, event replay and modeled changes.',example:'Select actions, preview coverage, then simulate changes.'},
    {name:'SVG + CSS · Lenis · GSAP ScrollTrigger',status:'Implemented',role:'Draws the illustrative graph and provides website-mode visual transitions and smooth scrolling.',input:'Predefined graph paths and website scroll position.',output:'Illustrative route view and scroll-linked presentation effects.',example:'Presentation mode disables scroll-linked effects; website mode retains continuous scrolling.'},
  ]},
  {name:'Ingestion & storage',status:'Planned',flow:'Telemetry → FastAPI / Pydantic → PostgreSQL',items:[
    {name:'Backend ingestion',status:'Planned',role:'Validate and normalize incoming security events.',input:'Event ID, timestamp, source, actor, action, target and evidence reference.',output:'Validated canonical events with source provenance.',example:'Ingest an identity event and preserve its source reference.'},
    {name:'PostgreSQL',status:'Planned',role:'Persist inventory, events, evidence and time-aware relationships.',input:'Assets, identities, permissions and normalized events.',output:'Traceable records for graph construction and investigation.',example:'Open a permission relationship and inspect its source and timestamp.'},
  ]},
  {name:'Graph & intervention services',status:'Planned',flow:'PostgreSQL → graph construction + prerequisite checks → bounded paths → action comparison',items:[
    {name:'NetworkX graph service',status:'Planned',role:'Build typed relationships and check permissions, prerequisites and reachability.',input:'Validated entities, inventory links and event evidence.',output:'Candidate paths with explicit assumptions.',example:'Exposed key → allowed role assumption → sensitive-data access.'},
    {name:'Event-driven updates',status:'Planned',role:'Recompute affected paths after a new event or permission change.',input:'Changed event, policy or asset relationship.',output:'Updated affected paths and residual exposure.',example:'A confirmed missing permission blocks the corresponding modeled transition.'},
  ]},
];
const intelligence:Detail={name:'Proposed ML & security framework detail',status:'Proposed',role:'Rules check feasibility. Proposed ML assists ranking. A heterogeneous graph model may rank paths that already pass explicit permission and reachability checks. Bayesian updating is a separate proposed layer for defined hypotheses, priors and evidence likelihoods.',input:'Typed entities and features such as privilege scope, exposure, secret validity, vulnerability context, asset criticality and event timing. Evidence dependencies and correlation require explicit handling.',output:'Learned candidate-path ranking and separately updated hypothesis assessments, only after evaluation and calibration.',example:'STRIDE: threats to components and trust boundaries. MITRE ATT&CK: context for attacker behavior. Attack Flow: connected attack-action narratives. D3FEND: defensive countermeasure vocabulary. CVE/CVSS, EPSS and CISA KEV add vulnerability context. Framework labels do not establish path feasibility.'};

export default function TechStackSlide(){
  const [selected,setSelected]=useState<Detail|null>(null);
  const dialogRef=useRef<HTMLDivElement>(null);
  const returnFocus=useRef<HTMLElement|null>(null);
  const open=(item:Detail,trigger:HTMLElement)=>{returnFocus.current=trigger;setSelected(item)};
  useEffect(()=>{
    if(!selected)return;
    const dialog=dialogRef.current;
    dialog?.querySelector<HTMLButtonElement>('button')?.focus();
    const key=(event:KeyboardEvent)=>{
      if(event.key==='Escape'){event.preventDefault();event.stopPropagation();setSelected(null);return}
      if(event.key!=='Tab'||!dialog)return;
      const focusables=[...dialog.querySelectorAll<HTMLElement>('button:not([disabled])')];
      if(!focusables.length)return;
      if(event.shiftKey&&document.activeElement===focusables[0]){event.preventDefault();focusables.at(-1)?.focus()}
      else if(!event.shiftKey&&document.activeElement===focusables.at(-1)){event.preventDefault();focusables[0].focus()}
    };
    document.addEventListener('keydown',key);
    return()=>{document.removeEventListener('keydown',key);requestAnimationFrame(()=>returnFocus.current?.focus())};
  },[selected]);
  return <div className="techstack-panel">
    <div className="techstack-status-label">IMPLEMENTED BROWSER PROTOTYPE · PLANNED SERVICES · PROPOSED INTELLIGENCE</div>
    <div className="techstack-layers">
      {layers.map(layer=><section className="architecture-layer" key={layer.name}>
        <header><h3>{layer.name}</h3><span className={`layer-status ${layer.status.toLowerCase()}`}>{layer.status}</span></header>
        <p className="architecture-flow">{layer.flow}</p>
        <div className="architecture-layer-items">{layer.items.map(item=><button key={item.name} onClick={event=>open(item,event.currentTarget)}><b>{item.name}</b><span>{item.status}</span><ArrowRight size={15}/></button>)}</div>
      </section>)}
    </div>
    <div className="architecture-proposal"><b>Rules check feasibility. Proposed ML assists ranking.</b><span>Learned scores cannot create missing permissions or graph connections.</span></div>
    <button className="techstack-details-button" onClick={event=>open(intelligence,event.currentTarget)}>ML &amp; framework details <ArrowRight size={15}/></button>
    <p className="techstack-footer">Synthetic prototype: predefined scenarios and browser-side intervention comparison. Backend ingestion, graph construction, prerequisite checks and event-driven updates are planned.</p>
    {selected&&<div className="techstack-dialog-backdrop" onMouseDown={event=>{if(event.target===event.currentTarget)setSelected(null)}}>
      <div className="techstack-dialog" role="dialog" aria-modal="true" aria-labelledby="techstack-dialog-title" ref={dialogRef}>
        <div className="techstack-dialog-top"><span>COMPONENT DETAILS · {selected.status.toUpperCase()}</span><button onClick={()=>setSelected(null)} aria-label="Close details"><X size={18}/></button></div>
        <h2 id="techstack-dialog-title">{selected.name}</h2>
        <dl><div><dt>ROLE</dt><dd>{selected.role}</dd></div><div><dt>INPUT</dt><dd>{selected.input}</dd></div><div><dt>OUTPUT</dt><dd>{selected.output}</dd></div><div><dt>EXAMPLE / SCOPE</dt><dd>{selected.example}</dd></div></dl>
        <button className="techstack-dialog-close" onClick={()=>setSelected(null)}>Close details</button>
      </div>
    </div>}
  </div>
}
