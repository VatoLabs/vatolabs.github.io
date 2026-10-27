// Vato Labs: theme toggle, simulated servo trace with its peak lag dimensioned, corrected-command plot.
(function(){
  const d=document.documentElement, NS='http://www.w3.org/2000/svg';
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

  // theme: follows the system until the visitor picks; the pick persists
  const mq=matchMedia('(prefers-color-scheme: dark)');
  const isDark=()=>{const t=d.getAttribute('data-theme');return t?t==='dark':mq.matches;};
  const toggles=document.querySelectorAll('.theme');
  const sync=()=>toggles.forEach(b=>b.setAttribute('aria-pressed',String(isDark())));
  toggles.forEach(b=>b.addEventListener('click',()=>{const next=isDark()?'light':'dark';d.setAttribute('data-theme',next);
    try{localStorage.setItem('theme',next);}catch(e){}sync();redraw();}));
  if(mq.addEventListener)mq.addEventListener('change',()=>{sync();redraw();});
  sync();

  function el(n,at){const e=document.createElementNS(NS,n);for(const k in at)e.setAttribute(k,at[k]);return e;}

  // STS3215-like position servo: PD on error, speed limit 299 deg/s (5.22 rad/s), 10 ms delay, +-0.5 deg backlash.
  // An illustration from published limits, not a measurement.
  function sim(T,amp){const dt=.001,N=1200,dl=10,vmax=298.8,kp=900,kd=55,umax=3e4,bl=.5;
    let m=0,v=0,o=0,peak=0,ip=0;const r=[],a=[];
    for(let i=0;i<N;i++){const s=Math.min(Math.max((i*dt-.1)/T,0),1);r.push(amp*(10*s**3-15*s**4+6*s**5));}
    for(let i=0;i<N;i++){const e=r[Math.max(0,i-dl)]-o;const u=Math.max(-umax,Math.min(umax,kp*e-kd*v));
      v=Math.max(-vmax,Math.min(vmax,v+u*dt));m+=v*dt;if(m-o>bl)o=m-bl;else if(m-o<-bl)o=m+bl;a.push(o);
      const g=Math.abs(r[i]-o);if(g>peak){peak=g;ip=i;}}
    return {r,a,peak,ip};}

  const plot=document.getElementById('plot'), lagOut=document.getElementById('lag');
  let T=.25;
  function drawTrace(animate){
    if(!plot)return;const box=plot.parentElement,W=box.clientWidth,H=box.clientHeight;if(!W||!H)return;
    const L=40,R=Math.min(96,W*.18),Tp=14,B=30,ymax=66,N=1200,R0=sim(T,60);
    const X=i=>L+(W-L-R)*i/(N-1), Y=v=>H-B-(H-Tp-B)*v/ymax;
    plot.setAttribute('viewBox',`0 0 ${W} ${H}`);plot.textContent='';plot.classList.remove('drawn');
    for(const g of [0,30,60]){plot.append(el('line',{x1:L,x2:W-R+8,y1:Y(g),y2:Y(g),class:g?'axis':'axis0'}));
      const t=el('text',{x:L-8,y:Y(g)+4,'text-anchor':'end',class:'axl'});t.textContent=g+'°';plot.append(t);}
    for(let s=0;s<=1.2001;s+=.2){const x=X(Math.min(N-1,Math.round(s*1000)));plot.append(el('line',{x1:x,x2:x,y1:H-B,y2:H-B+5,class:'axis0'}));
      const t=el('text',{x,y:H-8,'text-anchor':'middle',class:'axl'});t.textContent=(s===0?'0':s.toFixed(1))+(s>1.1?' s':'');plot.append(t);}
    const line=s=>{let p='';for(let i=0;i<N;i+=3)p+=(i?'L':'M')+X(i).toFixed(1)+' '+Y(s[i]).toFixed(1);return p;};
    let band=line(R0.r);for(let i=N-1;i>=0;i-=3)band+='L'+X(i).toFixed(1)+' '+Y(R0.a[i]).toFixed(1);
    plot.append(el('path',{d:band+'Z',class:'err'}),el('path',{d:line(R0.r),class:'ln-ref'}));
    const act=el('path',{d:line(R0.a),class:'ln-act'});plot.append(act);
    // the dimension: extension lines from both curves at the peak, a dimension line, arrowheads, the value
    const x=X(R0.ip),y1=Y(R0.r[R0.ip]),y2=Y(R0.a[R0.ip]),top=Math.min(y1,y2),bot=Math.max(y1,y2);
    const xd=Math.min(W-R+18,x+Math.max(26,(W-L-R)*.06)),g=el('g',{class:'dimg'});
    g.append(el('line',{x1:x+3,x2:xd+7,y1:y1,y2:y1,class:'ext'}),el('line',{x1:x+3,x2:xd+7,y1:y2,y2:y2,class:'ext'}));
    const ah=(y,dir)=>el('path',{d:`M${xd} ${y}l-3.2 ${-9*dir}h6.4z`,class:'arrow'});
    if(bot-top>22){g.append(el('line',{x1:xd,x2:xd,y1:top,y2:bot,class:'dim'}),ah(top,-1),ah(bot,1));}
    else{g.append(el('line',{x1:xd,x2:xd,y1:top-16,y2:bot+16,class:'dim'}),ah(top,1),ah(bot,-1));}
    const t=el('text',{x:xd+10,y:(top+bot)/2+5,class:'dimt'});t.textContent=R0.peak.toFixed(1)+'°';g.append(t);plot.append(g);
    if(lagOut)lagOut.textContent=R0.peak.toFixed(1)+'°';
    if(animate&&!reduce){const len=act.getTotalLength();act.style.strokeDasharray=len;act.style.setProperty('--len',len);
      void plot.getBoundingClientRect();plot.classList.add('drawn');}
  }
  const segs=document.querySelectorAll('.seg button');
  segs.forEach(b=>b.addEventListener('click',()=>{segs.forEach(x=>x.setAttribute('aria-pressed',String(x===b)));T=+b.dataset.t;drawTrace(true);}));

  // corrected command: leads the target by the modelled delay, offset by backlash in the direction of travel
  const p2=document.getElementById('plot2');
  function drawCorrect(){
    if(!p2)return;const box=p2.parentElement,W=box.clientWidth,H=box.clientHeight;if(!W||!H)return;
    const L=40,Rm=12,Tp=12,B=28,N=1200,r=[],c=[],ymax=64;
    for(let i=0;i<N;i++){const s=Math.min(Math.max((i*.001-.15)/.4,0),1);r.push(60*(10*s**3-15*s**4+6*s**5));}
    for(let i=0;i<N;i++){const j=Math.min(N-1,i+10);c.push(r[j]+.5*Math.sign(r[j]-r[Math.max(0,j-1)]));}
    const X=i=>L+(W-L-Rm)*i/(N-1),Y=v=>H-B-(H-Tp-B)*v/ymax;
    p2.setAttribute('viewBox',`0 0 ${W} ${H}`);p2.textContent='';
    for(const g of [0,30,60]){p2.append(el('line',{x1:L,x2:W-Rm,y1:Y(g),y2:Y(g),class:g?'axis':'axis0'}));
      const t=el('text',{x:L-8,y:Y(g)+4,'text-anchor':'end',class:'axl'});t.textContent=g+'°';p2.append(t);}
    for(let s=0;s<=1.2001;s+=.4){const x=X(Math.min(N-1,Math.round(s*1000)));const t=el('text',{x,y:H-6,'text-anchor':'middle',class:'axl'});t.textContent=(s===0?'0':s.toFixed(1))+(s>1.1?' s':'');p2.append(t);}
    const line=s=>{let p='';for(let i=0;i<N;i+=3)p+=(i?'L':'M')+X(i).toFixed(1)+' '+Y(s[i]).toFixed(1);return p;};
    p2.append(el('path',{d:line(r),class:'ln-ref'}),el('path',{d:line(c),class:'ln-act'}));
  }
  function redraw(){drawTrace(false);drawCorrect();}
  redraw();
  if('ResizeObserver' in window){let w=0;const ro=new ResizeObserver(es=>{const nw=Math.round(es[0].contentRect.width);if(nw!==w){w=nw;redraw();}});
    const b=plot&&plot.parentElement;if(b)ro.observe(b);}
  else addEventListener('resize',redraw);

  if(reduce)document.querySelectorAll('video[autoplay]').forEach(v=>{v.pause();v.removeAttribute('autoplay');v.controls=true;});
})();
