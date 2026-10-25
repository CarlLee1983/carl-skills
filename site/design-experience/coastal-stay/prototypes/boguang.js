const hero=document.querySelector('.hero');
const motion=document.querySelector('#motion');
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
let paused=false;
function updateMotion(){hero.classList.toggle('paused',paused||reduce.matches);motion.hidden=reduce.matches;motion.setAttribute('aria-pressed',String(paused));motion.textContent=paused?'播放景色動態':'暫停景色動態'}
motion.addEventListener('click',()=>{paused=!paused;updateMotion()});
reduce.addEventListener('change',updateMotion);updateMotion();
let inView=true;
function backgroundPause(){hero.classList.toggle('offscreen',!inView||document.hidden)}
new IntersectionObserver(([entry])=>{inView=entry.isIntersecting;backgroundPause()}).observe(hero);
document.addEventListener('visibilitychange',backgroundPause);
// Match the lantern to the image's object-fit crop at every viewport size.
const coast=document.querySelector('.coast');
const beam=document.querySelector('.beam');
function alignLight(){
  const width=hero.clientWidth,height=hero.clientHeight;
  const scale=Math.max(width/1672,height/941);
  const objectX=parseFloat(getComputedStyle(coast).objectPosition)/100;
  beam.style.left=`${1280*scale-(1672*scale-width)*objectX}px`;
  beam.style.top=`${324*scale-(941*scale-height)/2}px`;
}
new ResizeObserver(alignLight).observe(hero);
alignLight();
const form=document.querySelector('#inquiry-form');
const fieldset=document.querySelector('#form-fields');
const controls=Object.fromEntries(['room','guests','checkin','checkout','notes'].map(id=>[id,document.getElementById(id)]));
const summary=document.querySelector('#summary');const done=document.querySelector('#done');
const localISO=date=>`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
const today=()=>localISO(new Date());
controls.checkin.min=today();controls.checkout.min=today();
function show(state){form.hidden=state!=='form';summary.hidden=state!=='summary';done.hidden=state!=='done'}
function focusAt(el){el.focus({preventScroll:true});el.scrollIntoView({block:'center',behavior:'instant'})}
function error(name,message){const el=controls[name],note=document.querySelector(`#${name}-error`);note.textContent=message;note.hidden=!message;if(message)el.setAttribute('aria-invalid','true');else el.removeAttribute('aria-invalid')}
function clearErrors(){for(const id of ['room','checkin','checkout'])error(id,'');document.querySelector('#error-summary').hidden=true}
function isoDay(value){if(!/^\d{4}-\d{2}-\d{2}$/.test(value))return NaN;const date=new Date(value+'T12:00:00Z');return Number.isFinite(+date)&&date.toISOString().slice(0,10)===value?+date/86400000:NaN}
function dateLabel(value){const [year,month,day]=value.split('-');return `${year} 年 ${Number(month)} 月 ${Number(day)} 日`}
function renderSummary(){const nights=Math.round(isoDay(controls.checkout.value)-isoDay(controls.checkin.value));const values=[['房間',controls.room.value],['同行',`${controls.guests.value} 位成人`],['入住',dateLabel(controls.checkin.value)],['離開',dateLabel(controls.checkout.value)],['停留',`${nights} 晚`],['備註',controls.notes.value.trim()||'沒有補充事項']];const dl=document.querySelector('#summary-list');dl.replaceChildren();for(const[label,value]of values){const row=document.createElement('div'),dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=label;dd.textContent=value;row.append(dt,dd);dl.append(row)}}
form.addEventListener('submit',event=>{event.preventDefault();clearErrors();const errors=[];if(!['望海','藏灣'].includes(controls.room.value))errors.push(['room','請先選一間喜歡的房。']);const start=isoDay(controls.checkin.value),end=isoDay(controls.checkout.value);if(!Number.isFinite(start))errors.push(['checkin','請填寫完整的入住日期。']);else if(controls.checkin.value<today())errors.push(['checkin','入住日期請選今天或之後。']);if(!Number.isFinite(end))errors.push(['checkout','請填寫完整的離開日期。']);else if(Number.isFinite(start)&&end<=start)errors.push(['checkout','離開日期須晚於入住，至少住一晚。']);if(errors.length){for(const[id,message]of errors)error(id,message);const note=document.querySelector('#error-summary');note.textContent=`還有 ${errors.length} 個欄位需要確認，內容已保留。`;note.hidden=false;focusAt(controls[errors[0][0]]);return}renderSummary();show('summary');focusAt(document.querySelector('#summary-title'))});
for(const name of ['room','checkin','checkout'])controls[name].addEventListener('input',()=>{error(name,'');const count=form.querySelectorAll('[aria-invalid=true]').length;const note=document.querySelector('#error-summary');note.hidden=!count;note.textContent=`還有 ${count} 個欄位需要確認，內容已保留。`});
for(const choice of document.querySelectorAll('.room-choice'))choice.addEventListener('click',event=>{event.preventDefault();controls.room.value=choice.dataset.room;clearErrors();show('form');focusAt(controls.room)});
document.querySelector('#edit').addEventListener('click',()=>{show('form');focusAt(controls.room)});
document.querySelector('#complete').addEventListener('click',()=>{show('done');focusAt(document.querySelector('#done-title'))});
document.querySelector('#back-summary').addEventListener('click',()=>{show('summary');focusAt(document.querySelector('#summary-title'))});
// Enable only after handlers exist; no-JS cannot submit or expose date data in a URL.
fieldset.disabled=false;
document.documentElement.classList.add('motion-ready');
