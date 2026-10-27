// Vato Labs: theme toggle, servo trace (simulated), pinned story, stage slider, ledger preview, entrances.
(function(){
  // theme: follows the system until the visitor picks one; the choice is stored when storage allows
  const root=document.documentElement,dark=matchMedia('(prefers-color-scheme: dark)');
  const current=()=>root.dataset.theme||(dark.matches?'dark':'light');
  const sync=()=>document.querySelectorAll('.theme').forEach(b=>b.setAttribute('aria-pressed',current()==='dark'));
  document.querySelectorAll('.theme').forEach(b=>b.addEventListener('click',()=>{const t=current()==='dark'?'light':'dark';root.dataset.theme=t;try{localStorage.setItem('theme',t);}catch(e){}sync();}));
  dark.addEventListener('change',sync);sync();
})();
(function(){
  const NS='http://www.w3.org/2000/svg';
  // Simple STS3215-like position servo: PD on error, speed limit 299 deg/s (5.22 rad/s), 10 ms delay, +-0.5 deg backlash.
  // An illustration with published limits, not a measurement.
  function sim(T,amp){const dt=.001,N=1200,d=10,vmax=298.8,kp=900,kd=55,umax=3e4,bl=.5;
    let m=0,v=0,o=0;const r=[],a=[];
    for(let i=0;i<N;i++){const s=Math.min(Math.max((i*dt-.1)/T,0),1);r.push(amp*(10*s**3-15*s**4+6*s**5));}
    let peak=0;for(let i=0;i<N;i++){const e=r[Math.max(0,i-d)]-o;const u=Math.max(-umax,Math.min(umax,kp*e-kd*v));
      v=Math.max(-vmax,Math.min(vmax,v+u*dt));m+=v*dt;if(m-o>bl)o=m-bl;else if(m-o<-bl)o=m+bl;a.push(o);peak=Math.max(peak,Math.abs(r[i]-o));}
    return {r,a,peak};}
  function el(n,at){const e=document.createElementNS(NS,n);for(const k in at)e.setAttribute(k,at[k]);return e;}
  function path(arr,W,H,pad,max){let p='';const n=arr.length;for(let i=0;i<n;i+=4){const x=pad+(W-2*pad)*i/(n-1),y=H-pad-(H-2*pad)*arr[i]/max;p+=(i?'L':'M')+x.toFixed(1)+' '+y.toFixed(1);}return p;}
  function draw(svg,T){const W=560,H=260,P=24,R=sim(T,60);svg.textContent='';
    for(const g of [0,30,60]){const y=H-P-(H-2*P)*g/66;svg.append(el('line',{x1:P,x2:W-8,y1:y,y2:y,class:'axis'}));const t=el('text',{x:2,y:y+4,class:'axl'});t.textContent=g+'°';svg.append(t);}
    let band='';const n=R.r.length;for(let i=0;i<n;i+=4)band+=(i?'L':'M')+(P+(W-P-8)*i/(n-1)).toFixed(1)+' '+(H-P-(H-2*P)*R.r[i]/66).toFixed(1);
    for(let i=n-1;i>=0;i-=4)band+='L'+(P+(W-P-8)*i/(n-1)).toFixed(1)+' '+(H-P-(H-2*P)*R.a[i]/66).toFixed(1);
    svg.append(el('path',{d:band+'Z',class:'err'}));
    const pr=s=>{let p='';for(let i=0;i<n;i+=4){p+=(i?'L':'M')+(P+(W-P-8)*i/(n-1)).toFixed(1)+' '+(H-P-(H-2*P)*s[i]/66).toFixed(1);}return p;};
    svg.append(el('path',{d:pr(R.r),class:'ln-ref'}),el('path',{d:pr(R.a),class:'ln-act'}));
    const lag=document.getElementById('lag');if(lag)lag.textContent=R.peak.toFixed(1)+'°';}
  const plot=document.getElementById('plot');let T=.25;
  if(plot){draw(plot,T);document.querySelectorAll('.seg button').forEach(b=>b.addEventListener('click',()=>{
    document.querySelectorAll('.seg button').forEach(x=>x.setAttribute('aria-pressed',x===b));T=+b.dataset.t;draw(plot,T);}));}
  // corrected command (stage 3): the command leads the target by the modelled delay and is shaped near the speed limit
  const p2=document.getElementById('plot2');
  if(p2){const W=440,H=220,P=20,N=1200,r=[],c=[];for(let i=0;i<N;i++){const s=Math.min(Math.max((i*.001-.15)/.4,0),1);r.push(60*(10*s**3-15*s**4+6*s**5));}
    for(let i=0;i<N;i++){const j=Math.min(N-1,i+10);c.push(r[j]+0.5*Math.sign(r[j]-r[Math.max(0,j-1)]));}
    const pr=s=>{let p='';for(let i=0;i<N;i+=4)p+=(i?'L':'M')+(P+(W-2*P)*i/(N-1)).toFixed(1)+' '+(H-P-(H-2*P)*s[i]/64).toFixed(1);return p;};
    for(const g of [0,30,60]){const y=H-P-(H-2*P)*g/64;p2.append(el('line',{x1:P,x2:W-P,y1:y,y2:y,class:'axis'}));}
    p2.append(el('path',{d:pr(r),class:'ln-ref'}),el('path',{d:pr(c),class:'ln-act'}));}
  // pinned story: the chart holds while three statements pass; the one crossing the middle of the screen sets its state
  const servo=document.getElementById('servo');
  if(servo){const beats=[...servo.querySelectorAll('.beat')];const set=k=>{if(servo.dataset.step!=k){servo.dataset.step=k;beats.forEach((b,i)=>b.classList.toggle('on',i===k));}};
    if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>{for(const e of es)if(e.isIntersecting)set(beats.indexOf(e.target));},{rootMargin:'-45% 0px -45% 0px'});beats.forEach(b=>io.observe(b));}
    set(0);}
  // stage slider
  const S=[['Record 20 minutes','The arm runs chirps, steps and sweeps chosen so each one isolates a few parameters.','Record'],
    ['Fit every servo','Delay, gains, speed limit, backlash, friction and gravity, fitted per joint on your arm.','Fit'],
    ['Correct each command','The model shapes each command before it is sent, so the joint arrives where the policy asked.','Correct'],
    ['Measure at the tip','Accuracy is measured at the tip with a dial indicator, stock against calibrated, before any claim.','Measure']];
  const sc=document.getElementById('scrub'),box=document.getElementById('stages');
  if(sc){const h=document.getElementById('stage-title'),n=document.getElementById('stage-note'),lis=box.querySelectorAll('.scrub li'),panes=box.querySelectorAll('.pane');
    const set=k=>{box.classList.add('swap');setTimeout(()=>{h.textContent=S[k][0];n.textContent=S[k][1];panes.forEach(p=>p.hidden=+p.dataset.stage!==k);
      lis.forEach((l,i)=>l.classList.toggle('on',i===k));box.classList.remove('swap');},200);sc.value=k;sc.setAttribute('aria-valuetext',S[k][2]);sc.parentElement.style.setProperty('--p',(k/3*100)+'%');};
    sc.addEventListener('input',()=>set(+sc.value));box.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>set(+b.dataset.go)));}
  // ledger preview
  const peek=document.getElementById('peek');
  if(peek)document.querySelectorAll('.ledger a').forEach(a=>{const show=()=>{const src=a.dataset.img;if(!src)return;
      peek.src=src;peek.style.top=(a.offsetTop-60)+'px';peek.classList.add('on');};
    a.addEventListener('mouseenter',show);a.addEventListener('focus',show);});
  // entrances: stagger the parts of each section
  const items=document.querySelectorAll('.rise');
  document.querySelectorAll('main section').forEach(s=>s.querySelectorAll('.rise').forEach((e,i)=>{if(!e.style.getPropertyValue('--i'))e.style.setProperty('--i',i%6);}));
  if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{rootMargin:'0px 0px -8% 0px'});items.forEach(i=>io.observe(i));}
  else items.forEach(i=>i.classList.add('in'));
  if(matchMedia("(prefers-reduced-motion: reduce)").matches)document.querySelectorAll("video[autoplay]").forEach(v=>{v.pause();v.removeAttribute("autoplay");v.controls=true;});
})();
