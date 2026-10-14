# AttackTwin AI

An interactive, scroll-driven story for the Manipal Hackathon security digital twin concept. The NovaBank events, scores, findings, and mitigation outcomes in this prototype are synthetic. Applying an intervention only updates the local simulation.

## Run locally

```sh
npm install
npm run dev
```

Create a production build with `npm run build`, then serve it with `npm run preview`.

## Prototype notes

- A shared synthetic scenario drives the event replay, graph, evidence inspector, heuristic risk displays, and intervention simulator.
- Three.js renders the persistent spatial network. The labeled SVG graph remains readable if WebGL is unavailable.
- The graph and event replay advance with scroll. Replay controls take ownership when used; Reset returns progression to scroll control.
- Current path ranking uses explicit prerequisites and illustrative heuristics. The GNN and probabilistic inference are proposed future work, not part of this demo.
- Framework references link to their official sources.
