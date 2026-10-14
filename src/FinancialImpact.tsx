import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ExternalLink } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const indiaBreachCosts = [
  { year: 2024, cost: 19.5 },
  { year: 2025, cost: 22.0 },
  { year: 2026, cost: 25.5 },
];
const globalBreachCosts = [
  { year: 2024, cost: 4.88 },
  { year: 2025, cost: 4.44 },
  { year: 2026, cost: 4.99 },
];
const automationBreachCosts = [
  { level: 'No use', cost: 31.6 },
  { level: 'Limited use', cost: 23.1 },
  { level: 'Extensive use', cost: 21.3 },
];
const sourceIndia2026 = 'https://in.newsroom.ibm.com/India-Records-its-Highest-Average-Cost-of-a-Data-Breach-2026';
const sourceIndia2025 = 'https://in.newsroom.ibm.com/2025-08-07-India-Records-Highest-Average-Cost-of-a-Data-Breach-IBM';
const sourceGlobal = 'https://www.ibm.com/reports/data-breach';

type CostMarket = 'india' | 'global';
function FinancialImpact(){
  const [market,setMarket]=useState<CostMarket>('india');
  const [showTable,setShowTable]=useState(false);
  const [animateBars,setAnimateBars]=useState(false);
  const [touchTooltips,setTouchTooltips]=useState(false);
  const chapterRef=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    setTouchTooltips(window.matchMedia('(hover: none)').matches);
    const node=chapterRef.current;
    if(!node)return;
    const observer=new IntersectionObserver(entries=>{
      if(entries.some(entry=>entry.isIntersecting)){
        if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
          setAnimateBars(true);
          window.setTimeout(()=>setAnimateBars(false),1300);
        }
        observer.disconnect();
      }
    },{threshold:.2});
    observer.observe(node);
    return()=>observer.disconnect();
  },[]);
  const india=market==='india';
  const series=india?indiaBreachCosts:globalBreachCosts;
  const unit=india?'₹ crore':'US$ million';
  const axisLabel=india?'Average cost per breach, ₹ crore':'Average cost per breach, US$ million';
  const domain=india?[0,30] as [number,number]:[0,6] as [number,number];
  const ticks=india?[0,5,10,15,20,25,30]:[0,1,2,3,4,5,6];
  const formatValue=(value:number)=>india?`₹${value.toFixed(1)} crore`:`$${value.toFixed(2)} million`;
  const tooltipTrigger=touchTooltips?'click':'hover';
  return <div className="financial-content" ref={chapterRef}>
    <div className="financial-charts">
      <section className="financial-card" aria-labelledby="breach-cost-title">
        <div className="financial-card-head">
          <div><span className="chart-kicker">AVERAGE ORGANIZATIONAL COST</span><h3 id="breach-cost-title">Cost per breach</h3></div>
          <div className="market-toggle" role="group" aria-label="Choose breach-cost region">
            <button type="button" aria-pressed={india} className={india?'active':''} onClick={()=>setMarket('india')}>India</button>
            <button type="button" aria-pressed={!india} className={!india?'active':''} onClick={()=>setMarket('global')}>Global</button>
          </div>
        </div>
        <p className="chart-unit">{axisLabel}</p>
        <div className="chart-wrap" aria-label={`${india?'India':'Global'} average breach cost by report year. Use arrow keys to inspect bars.`}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={series} margin={{top:58,right:18,bottom:8,left:18}} accessibilityLayer>
              <CartesianGrid vertical={false} stroke="#34343b" strokeDasharray="3 5"/>
              <XAxis dataKey="year" tick={{fill:'#c4c4cc',fontSize:13}} tickLine={false} axisLine={{stroke:'#66666f'}}/>
              <YAxis domain={domain} ticks={ticks} allowDataOverflow={false} tick={{fill:'#b2b2bb',fontSize:12}} tickLine={false} axisLine={false} width={38} label={{value:axisLabel,angle:-90,position:'insideLeft',offset:2,fill:'#c4c4cc',fontSize:11}}/>
              <Tooltip trigger={tooltipTrigger} position={{x:52,y:0}} cursor={{fill:'#ffffff0a'}} content={({active,payload,label}:any)=>active&&payload?.length?<div className="chart-tooltip"><strong>{label} report</strong><span>{formatValue(payload[0].value)}</span></div>:null}/>
              <Bar dataKey="cost" name="Average cost" radius={[4,4,0,0]} isAnimationActive={animateBars} animationDuration={1100}>
                {series.map((point,index)=><Cell key={point.year} fill={point.year===2026?'#ff454f':index===1?'#a94149':'#713239'}/>)}
                <LabelList dataKey="cost" position="top" formatter={(value:any)=>india?`₹${Number(value).toFixed(1)}`:`$${Number(value).toFixed(2)}`} fill="#f6f6f8" fontSize={13} fontWeight={700}/>
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="chart-help">Hover, tap, or use the chart arrow keys. Exact values stay visible above the bars.</p>
        <div className="source-links" aria-label="Breach cost sources">
          {india?<><a href={sourceIndia2026} target="_blank" rel="noreferrer">IBM India 2026 <ExternalLink size={12}/></a><a href={sourceIndia2025} target="_blank" rel="noreferrer">IBM India 2025 + 2024 <ExternalLink size={12}/></a></>:<a href={sourceGlobal} target="_blank" rel="noreferrer">IBM global report <ExternalLink size={12}/></a>}
        </div>
      </section>
      <section className="financial-card automation-card" aria-labelledby="automation-title">
        <div className="financial-card-head">
          <div><span className="chart-kicker">INDIA · 2026</span><h3 id="automation-title">Breach cost by security AI and automation use</h3></div>
        </div>
        <p className="chart-unit">Average cost per breach · ₹ crore</p>
        <div className="chart-wrap automation-chart" aria-label="Breach cost by security AI and automation use in India in 2026. Use arrow keys to inspect bars.">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={automationBreachCosts} layout="vertical" margin={{top:56,right:116,bottom:8,left:4}} accessibilityLayer>
              <CartesianGrid horizontal={false} stroke="#34343b" strokeDasharray="3 5"/>
              <XAxis type="number" domain={[0,35]} ticks={[0,5,10,15,20,25,30,35]} tick={{fill:'#b2b2bb',fontSize:11}} tickLine={false} axisLine={{stroke:'#66666f'}}/>
              <YAxis type="category" dataKey="level" width={122} tick={{fill:'#d2d2d8',fontSize:12}} tickLine={false} axisLine={false}/>
              <Tooltip trigger={tooltipTrigger} position={{x:128,y:0}} cursor={{fill:'#ffffff0a'}} content={({active,payload}:any)=>active&&payload?.length?<div className="chart-tooltip"><strong>{payload[0].payload.level}</strong><span>₹{Number(payload[0].value).toFixed(1)} crore</span></div>:null}/>
              <Bar dataKey="cost" name="Average breach cost" barSize={30} radius={[0,4,4,0]} isAnimationActive={animateBars} animationDuration={1100}>
                {automationBreachCosts.map((point,index)=><Cell key={point.level} fill={index===2?'#ff454f':index===1?'#bd4850':'#713239'}/>)}
                <LabelList dataKey="cost" position="right" formatter={(value:any)=>`₹${Number(value).toFixed(1)} crore`} fill="#f6f6f8" fontSize={11} fontWeight={700}/>
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="observed-difference"><strong>₹10.3 crore</strong><span>observed difference<br/>No use vs extensive use</span></div>
        <p className="association-note">An association reported across studied organizations.<br/>Not guaranteed savings, causal proof or an AttackTwin benchmark.</p>
        <a className="source-link" href={sourceIndia2026} target="_blank" rel="noreferrer">IBM India 2026 source <ExternalLink size={12}/></a>
      </section>
    </div>
    <div className="financial-footer">
      <p>Average organizational cost per breach in IBM’s study. Report years are shown. Figures are not annual losses.</p>
      <button type="button" className="table-toggle" aria-expanded={showTable} aria-controls="financial-data-table" onClick={()=>setShowTable(value=>!value)}>{showTable?'Hide data table':'View data table'} <ArrowDown size={13}/></button>
    </div>
    {showTable&&<div className="financial-table-wrap" id="financial-data-table"><table><caption>IBM Cost of a Data Breach values used in these charts</caption><thead><tr><th scope="col">Measure</th><th scope="col">Period / group</th><th scope="col">Average cost</th></tr></thead><tbody>
      {indiaBreachCosts.map(row=><tr key={`india-${row.year}`}><th scope="row">India</th><td>{row.year}</td><td>₹{row.cost.toFixed(1)} crore</td></tr>)}
      {globalBreachCosts.map(row=><tr key={`global-${row.year}`}><th scope="row">Global</th><td>{row.year}</td><td>US${row.cost.toFixed(2)} million</td></tr>)}
      {automationBreachCosts.map(row=><tr key={row.level}><th scope="row">India · AI/automation</th><td>{row.level} · 2026</td><td>₹{row.cost.toFixed(1)} crore</td></tr>)}
    </tbody></table></div>}
  </div>;
}

export default FinancialImpact;
