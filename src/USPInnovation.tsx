import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, FlaskConical, Lightbulb } from 'lucide-react';

const reveals = [
  {
    label: 'THE USP',
    title: 'Benefits across one connected workflow.',
    intro: 'Consume existing security-tool outputs, connect them to a potential path, then compare targeted defensive actions.',
    items: [
      ['Evidence-backed paths', 'Show why each modeled transition exists and which prerequisites remain uncertain.'],
      ['Context-aware risk & trust', 'Review potential impact alongside evidence quality. A maintenance window can explain activity; it does not prove every action is legitimate.'],
      ['Cost-aware intervention simulation', 'Compare action coverage, illustrative disruption and residual exposure on the modeled scenario.'],
    ],
  },
  {
    label: 'THE INNOVATION',
    title: 'A time-aware, auditable reasoning layer.',
    intro: 'These are proposed capabilities beyond the current synthetic browser prototype; each needs implementation and validation.',
    items: [
      ['Time-aware graph + evidence provenance · proposed', 'Track which entity or permission changed and when its source evidence arrived.'],
      ['Auditable business-context ledger · proposed', 'Record the owner and source for criticality and data-sensitivity context.'],
      ['Counterfactuals on a graph copy · proposed', 'Compare defensive actions without rewriting historical observations.'],
      ['Constrained action optimization', 'The browser demo searches four predefined actions; broader constraints and cost models are proposed.'],
    ],
  },
];

export default function USPInnovation() {
  const [active, setActive] = useState(0);
  const reveal = reveals[active];
  return <div className="usp-panel" aria-label="Why AttackTwin and innovation">
    <div className="usp-tabs" role="group" aria-label="USP and innovation reveals">
      <span>0{active + 1} / 02</span>
      {reveals.map((item, index) => <button type="button" key={item.label} aria-pressed={active === index} className={active === index ? 'active' : ''} onClick={() => setActive(index)}>{item.label}</button>)}
    </div>
    <div className="usp-content" key={reveal.label}>
      <div className="usp-heading"><i>{active === 0 ? <Check size={17}/> : <FlaskConical size={17}/>}</i><div><span>{active === 0 ? 'THE WORKING APPROACH' : 'PROPOSED BEYOND THE PROTOTYPE'}</span><h3>{reveal.title}</h3><p>{reveal.intro}</p></div></div>
      <div className="usp-items">{reveal.items.map(([title, description], index) => <article key={title}><span>0{index + 1}</span><div><h4>{title}</h4><p>{description}</p></div></article>)}</div>
    </div>
    <div className="usp-controls">{active === 1 && <button type="button" className="usp-back" onClick={() => setActive(0)}><ArrowLeft size={15}/> USP</button>}<button type="button" className="usp-next" onClick={() => setActive(active === 0 ? 1 : 0)}>{active === 0 ? 'Reveal the innovation' : 'Back to the USP'}{active === 0 ? <ArrowRight size={15}/> : <Lightbulb size={15}/>}</button></div>
  </div>;
}
