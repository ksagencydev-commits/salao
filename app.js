'use strict';
// Configure confirmed contacts here. Empty values preserve the concept demonstration.
const CONFIG = { whatsapp: '', instagram: '', message: 'Olá! Conheci o Maison Belle pelo site e gostaria de saber mais sobre os serviços e agendar um horário. Podem me informar os valores e a disponibilidade?' };
const services = [
 {name:'Hair Design', description:'Cortes, escovas e finalizações que expressam você.', image:'salon-service', alt:'Cuidado profissional com os cabelos'},
 {name:'Color Studio', description:'Coloração, mechas e iluminação com personalidade.', image:'hair-campaign', alt:'Campanha conceitual de cabelo em recorte transparente'},
 {name:'Nail Atelier', description:'Manicure e cuidados com as unhas, em cada detalhe.', image:'salon-nails', alt:'Manicure profissional em cena conceitual'},
 {name:'Makeup Artistry', description:'Maquiagem para os seus momentos especiais.', image:'salon-makeup', alt:'Atendimento conceitual de maquiagem profissional'},
 {name:'Hair Care', description:'Tratamentos e rituais de cuidado capilar.', image:'hair-curtain', alt:'Textura editorial de fios castanhos'}
];
const list = document.querySelector('.service-list');
services.forEach((service,i)=>{const button=document.createElement('button');button.className='service-row'+(i===0?' active':'');button.setAttribute('aria-pressed',String(i===0));button.innerHTML=`<span class="num">0${i+1}</span><strong>${service.name}</strong><span class="arrow" aria-hidden="true">↗</span><p>${service.description}</p>`;button.addEventListener('click',()=>selectService(i));button.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse')selectService(i)});list.append(button)});
let currentService=0;
function selectService(i){if(currentService===i)return;currentService=i;list.querySelectorAll('button').forEach((button,n)=>{button.classList.toggle('active',n===i);button.setAttribute('aria-pressed',String(n===i))});const image=document.querySelector('#service-image');image.src=`public/images/${services[i].image}.webp`;image.alt=services[i].alt;document.querySelector('#service-caption').textContent=`0${i+1} — ${services[i].name.toUpperCase()}`;document.querySelector('#experience').selectedIndex=i}
function showDialog(dialog){dialog.showModal();document.body.classList.add('locked')}
document.querySelectorAll('dialog').forEach(dialog=>{dialog.addEventListener('close',()=>{if(!document.querySelector('dialog[open]'))document.body.classList.remove('locked')});dialog.querySelectorAll('[data-close]').forEach(button=>button.addEventListener('click',()=>dialog.close()));dialog.addEventListener('click',event=>{if(event.target===dialog && dialog.id==='booking'){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()}})});
const menu=document.querySelector('#menu');document.querySelector('.menu-toggle').addEventListener('click',()=>showDialog(menu));menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>menu.close()));
document.querySelector('.booking-message').textContent=CONFIG.message;
document.querySelectorAll('[data-book]').forEach(button=>button.addEventListener('click',()=>{if(CONFIG.whatsapp){window.open(`https://wa.me/${CONFIG.whatsapp.replace(/\D/g,'')}?text=${encodeURIComponent(CONFIG.message)}`,'_blank','noopener,noreferrer')}else showDialog(document.querySelector('#booking'))}));
const gallery=[...document.querySelectorAll('.gallery-item')];const lightbox=document.querySelector('#lightbox');let activeImage=0;
function loadImage(index){activeImage=(index+gallery.length)%gallery.length;const item=gallery[activeImage];lightbox.querySelector('img').src=`public/images/${item.dataset.image}.webp`;lightbox.querySelector('img').alt=item.querySelector('img').alt;lightbox.querySelector('figcaption').textContent=item.dataset.caption}
gallery.forEach((item,index)=>item.addEventListener('click',()=>{loadImage(index);showDialog(lightbox)}));lightbox.querySelector('.prev').addEventListener('click',()=>stepGallery(-1));lightbox.querySelector('.next').addEventListener('click',()=>stepGallery(1));lightbox.addEventListener('keydown',event=>{if(event.key==='ArrowLeft')stepGallery(-1);if(event.key==='ArrowRight')stepGallery(1)});let touchStart;lightbox.addEventListener('touchstart',event=>touchStart=event.changedTouches[0].screenX,{passive:true});lightbox.addEventListener('touchend',event=>{const diff=event.changedTouches[0].screenX-touchStart;if(Math.abs(diff)>50)stepGallery(diff<0?1:-1)},{passive:true});
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduced&&'IntersectionObserver'in window){document.documentElement.classList.add('js-motion');const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));}

// Native document scrolling avoids wheel/RAF contention and reaches the footer reliably.
(() => {
 document.documentElement.classList.remove('smooth-scrolling');
 document.addEventListener('click', event => {
  const link=event.target.closest('a[href^="#"]');
  if(!link||event.defaultPrevented||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey||event.button!==0)return;
  const target=document.getElementById(link.hash.slice(1));
  if(!target)return;
  event.preventDefault();
  document.querySelectorAll('dialog[open]').forEach(dialog=>dialog.close());
  document.body.classList.remove('locked');
  requestAnimationFrame(()=>{
   target.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
   history.pushState(null,'',link.hash);
   if(!target.hasAttribute('tabindex'))target.setAttribute('tabindex','-1');
   target.focus({preventScroll:true});
  });
 });
 document.addEventListener('visibilitychange',()=>{
  if(!document.querySelector('dialog[open]'))document.body.classList.remove('locked');
 });
})();

// Local image drift follows the viewport; no layout offsets or perpetual render loop.
(() => {
 const motion = matchMedia('(prefers-reduced-motion: reduce)');
 const desktop = matchMedia('(min-width: 701px)');
 const elements = [...document.querySelectorAll('.atelier-photo img, .detail-main img, .flow-model')];
 let pending = false;
 function render() {
  pending = false;
  elements.forEach(el => {
   if (motion.matches || !desktop.matches) { el.style.translate = ''; return; }
   const box = el.parentElement.getBoundingClientRect();
   if (box.bottom < -100 || box.top > innerHeight + 100) return;
   const progress = (innerHeight / 2 - (box.top + box.height / 2)) / innerHeight;
   el.style.translate = `0 ${Math.max(-22, Math.min(22, progress * 36))}px`;
  });
 }
 function schedule() { if (!pending) { pending = true; requestAnimationFrame(render); } }
 addEventListener('scroll', schedule, { passive: true });
 addEventListener('resize', schedule, { passive: true });
 motion.addEventListener('change', schedule);
 render();
 const fine = matchMedia('(hover: hover) and (pointer: fine)');
 document.querySelectorAll('.hero-reserve,.whatsapp-float,.solid-button').forEach(button => {
  button.addEventListener('pointermove', event => {
   if (motion.matches || !fine.matches) return;
   const box = button.getBoundingClientRect();
   button.style.translate = `${(event.clientX-box.left-box.width/2)*.09}px ${(event.clientY-box.top-box.height/2)*.09}px`;
  });
  button.addEventListener('pointerleave', () => button.style.translate = '');
 });
})();

// Service-specific consultation notes live alongside the editable service catalogue.
const serviceNotes = [
 ['Entender o seu estilo, sua rotina e o movimento natural do cabelo.','Desenhar o corte e a finalização com atenção à sua identidade.','Orientar os cuidados para levar essa sensação para o dia a dia.'],
 ['Conversar sobre a cor desejada e o histórico dos seus fios.','Explorar tons, contrastes e iluminação em uma proposta personalizada.','Planejar a manutenção e os cuidados que a cor precisa.'],
 ['Conhecer suas preferências de formato, cor e acabamento.','Cuidar das unhas com atenção ao desenho e aos pequenos detalhes.','Compartilhar orientações para preservar o acabamento.'],
 ['Entender a ocasião e como você deseja se apresentar.','Construir uma maquiagem que respeite seus traços e sua expressão.','Pensar no acabamento para acompanhar o seu momento.'],
 ['Conversar sobre a rotina e as necessidades do cabelo.','Escolher um ritual de cuidado após avaliação profissional.','Sugerir uma continuidade possível para a sua rotina.']
];
function updateDossier(index) {
 ['service-intention','service-method','service-finish'].forEach((id,n)=>document.getElementById(id).textContent=serviceNotes[index][n]);
}
list.querySelectorAll('.service-row').forEach((button,index)=>{
 button.addEventListener('click',()=>updateDossier(index));
 button.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse')updateDossier(index)});
});
const atmospheres = [
 ['01 / UM NOVO OLHAR','Diante do espelho, mais você.','O ponto de partida é uma conversa. O resultado respeita o que faz você se reconhecer.'],
 ['02 / LUZ QUE ACOLHE','Outro ritmo. Outra perspectiva.','Luz, materiais e espaço como inspiração para uma experiência tranquila, longe da pressa.'],
 ['03 / TEMPO PARA VOCÊ','Uma pausa que faz parte.','O ritual vai além do resultado. Há espaço para conversar, respirar e aproveitar o cuidado.']
];
document.querySelectorAll('[data-atmosphere]').forEach(button=>button.addEventListener('click',()=>{
 const data=atmospheres[Number(button.dataset.atmosphere)];
 document.querySelectorAll('[data-atmosphere]').forEach(other=>{other.classList.toggle('active',other===button);other.setAttribute('aria-pressed',String(other===button))});
 ['atmosphere-number','atmosphere-title','atmosphere-copy'].forEach((id,index)=>document.getElementById(id).textContent=data[index]);
}));
const rail=document.querySelector('.editorial-rail');
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll('[data-filter]').forEach(other=>{other.classList.toggle('active',other===button);other.setAttribute('aria-pressed',String(other===button))});
 gallery.forEach(item=>item.hidden=button.dataset.filter!=='all'&&item.dataset.category!==button.dataset.filter);
 rail.scrollTo({left:0,behavior:'instant'});
 const count=gallery.filter(item=>!item.hidden).length;
 document.querySelector('.gallery-count').textContent=`0${count} FOTOGRAFIAS / EDIÇÃO 01`;
}));
document.querySelectorAll('[data-rail]').forEach(button=>button.addEventListener('click',()=>{
 rail.scrollBy({left:Number(button.dataset.rail)*rail.clientWidth*.65,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
}));
const intentions = [
 {service:0,description:'Um novo corte, outra forma de se olhar. Explore cortes e finalizações que acompanham a sua identidade.'},
 {service:1,description:'Explore novas nuances e pontos de luz. A proposta começa por uma conversa sobre o seu cabelo e o resultado desejado.'},
 {service:4,description:'Desacelere e dedique um momento aos seus fios. Um ritual de cuidado começa pelas necessidades do seu cabelo.'},
 {service:3,description:'Uma maquiagem para acompanhar a ocasião, com acabamento e expressão que fazem sentido para você.'}
];
let chosenIntention=0;
document.querySelectorAll('[data-ritual]').forEach(button=>button.addEventListener('click',()=>{
 chosenIntention=Number(button.dataset.ritual);const chosen=intentions[chosenIntention];
 document.querySelectorAll('[data-ritual]').forEach(other=>{other.classList.toggle('active',other===button);other.setAttribute('aria-pressed',String(other===button))});
 document.querySelector('#ritual-name').textContent=services[chosen.service].name;
 document.querySelector('#ritual-description').textContent=chosen.description;
}));
document.querySelector('#ritual-book').addEventListener('click',()=>{
 const chosen=services[intentions[chosenIntention].service];
 const message=`${CONFIG.message} Tenho interesse em ${chosen.name}.`;
 document.querySelector('#experience').selectedIndex=intentions[chosenIntention].service;
 document.querySelector('.booking-message').textContent=message;
 if(CONFIG.whatsapp)window.open(`https://wa.me/${CONFIG.whatsapp.replace(/\D/g,'')}?text=${encodeURIComponent(message)}`,'_blank','noopener,noreferrer');
 else showDialog(document.querySelector('#booking'));
});
if('IntersectionObserver' in window){
 const chapters=[...document.querySelectorAll('.chapter-nav a')];
 const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting)chapters.forEach(link=>{
   const active=link.hash===`#${entry.target.id}`;link.classList.toggle('active',active);
   if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');
  })});
 },{rootMargin:'-20% 0px -55% 0px',threshold:0});
 chapters.forEach(link=>observer.observe(document.querySelector(link.hash)));
}

function stepGallery(direction) {
 const visible = gallery.map((item,index)=>({item,index})).filter(entry=>!entry.item.hidden);
 if(!visible.length)return;
 const position=visible.findIndex(entry=>entry.index===activeImage);
 loadImage(visible[(position+direction+visible.length)%visible.length].index);
}

// A shallow hair-only layer moves around the fixed portrait, without facial warping.
(() => {
 const preference=matchMedia('(prefers-reduced-motion: reduce)');
 const hero=document.querySelector('.hero');
 const veil=document.querySelector('.scroll-veil');
 let frame=0, previous=scrollY, drift=0;
 function render(){
  frame=0;
  if(preference.matches){hero.style.removeProperty('--hair-x');hero.style.removeProperty('--hair-angle');if(veil)veil.style.opacity=0;return}
  const delta=scrollY-previous;previous=scrollY;
  drift+=(Math.max(-1,Math.min(1,delta/12))-drift)*.1;
  const progress=Math.min(1,scrollY/Math.max(1,hero.offsetHeight));
  hero.style.setProperty('--hair-x',`${Math.sin(progress*5)*4+drift*5}px`);
  hero.style.setProperty('--hair-angle',`${Math.sin(progress*4)*.4+drift*.45}deg`);
  const remaining=document.documentElement.scrollHeight-innerHeight-scrollY;
  if(veil)veil.style.opacity=String(Math.min(1,Math.max(0,remaining/250)));
  if(Math.abs(drift)>.005){drift*=.94;frame=requestAnimationFrame(render)}
 }
 function schedule(){if(!frame)frame=requestAnimationFrame(render)}
 addEventListener('scroll',schedule,{passive:true});preference.addEventListener('change',schedule);render();
})();

// Gallery controls reflect the actual scroll boundaries after filtering and resizing.
(() => {
 const buttons=[...document.querySelectorAll('[data-rail]')];
 let scheduled=false;
 function update(){scheduled=false;const end=rail.scrollWidth-rail.clientWidth;buttons.forEach(button=>{button.disabled=Number(button.dataset.rail)<0?rail.scrollLeft<=2:rail.scrollLeft>=end-2})}
 function schedule(){if(!scheduled){scheduled=true;requestAnimationFrame(update)}}
 rail.addEventListener('scroll',schedule,{passive:true});
 addEventListener('resize',schedule,{passive:true});
 document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',schedule));
 rail.querySelectorAll('img').forEach(img=>img.addEventListener('load',schedule));
 let drag=null, moved=false;
 rail.addEventListener('pointerdown',event=>{
  if(event.pointerType!=='mouse'||event.button!==0)return;
  drag={x:event.clientX,left:rail.scrollLeft,id:event.pointerId};moved=false;
 });
 rail.addEventListener('pointermove',event=>{
  if(!drag)return;
  const distance=event.clientX-drag.x;
  if(Math.abs(distance)>6){moved=true;rail.setPointerCapture(drag.id);rail.style.scrollSnapType='none';rail.scrollLeft=drag.left-distance;event.preventDefault()}
 });
 function release(){drag=null;rail.style.scrollSnapType=''}
 rail.addEventListener('pointerup',release);rail.addEventListener('pointercancel',release);
 rail.addEventListener('lostpointercapture',release);
 rail.addEventListener('pointerleave',()=>{if(drag&&!moved)release()});
 rail.addEventListener('click',event=>{if(moved){event.preventDefault();event.stopPropagation();moved=false}},{capture:true});
 update();
})();

// Smooth wheel motion with a floating-point accumulator and a finite settling step.
// Unlike the previous controller, this never uses rounded scrollY as animation state.
(() => {
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 const pointer=matchMedia('(hover: hover) and (pointer: fine)');
 const root=document.documentElement;
 let position=scrollY, destination=scrollY, frame=0, last=0, written=scrollY;
 const limit=()=>Math.max(0,document.scrollingElement.scrollHeight-document.scrollingElement.clientHeight);
 const clamp=value=>Math.max(0,Math.min(limit(),value));
 function stop(){
  cancelAnimationFrame(frame);frame=0;last=0;
  position=destination=written=scrollY;
  root.classList.remove('smooth-scrolling');
 }
 function paint(time){
  if(motion.matches||!pointer.matches||document.querySelector('dialog[open]'))return stop();
  // Scrollbar, focus changes and other native navigation take priority.
  if(Math.abs(scrollY-written)>3)return stop();
  const elapsed=Math.min(last?time-last:16.67,64);last=time;
  destination=clamp(destination);
  position+=(destination-position)*(1-Math.exp(-elapsed/175));
  const settled=Math.abs(destination-position)<.6;
  if(settled)position=destination;
  written=Math.round(clamp(position));
  window.scrollTo({top:written,behavior:'instant'});
  if(settled)return stop();
  frame=requestAnimationFrame(paint);
 }
 function nestedCanScroll(node,direction){
  for(let element=node; element&&element!==document.body&&element!==root; element=element.parentElement){
   const style=getComputedStyle(element);
   if(!/(auto|scroll)/.test(style.overflowY)||element.scrollHeight<=element.clientHeight+1)continue;
   if(direction>0&&element.scrollTop+element.clientHeight<element.scrollHeight-1)return true;
   if(direction<0&&element.scrollTop>1)return true;
  }
  return false;
 }
 addEventListener('wheel',event=>{
  if(motion.matches||!pointer.matches||!event.cancelable||event.ctrlKey||event.metaKey||event.shiftKey||Math.abs(event.deltaX)>Math.abs(event.deltaY)||document.querySelector('dialog[open]')||nestedCanScroll(event.target,event.deltaY))return;
  const unit=event.deltaMode===1?20:event.deltaMode===2?innerHeight:1;
  if(!frame)position=destination=written=scrollY;
  const next=clamp(destination+event.deltaY*unit);
  if(next===destination&&!frame)return;
  event.preventDefault();destination=next;
  if(!frame){root.classList.add('smooth-scrolling');last=0;frame=requestAnimationFrame(paint)}
 },{passive:false});
 addEventListener('pointerdown',stop,{passive:true});
 addEventListener('touchstart',stop,{passive:true});
 addEventListener('keydown',event=>{if(['ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' '].includes(event.key))stop()});
 document.addEventListener('click',event=>{if(event.target.closest('a[href^="#"]'))stop()},{capture:true});
 addEventListener('resize',stop);addEventListener('popstate',stop);
 document.addEventListener('visibilitychange',stop);
 motion.addEventListener('change',stop);pointer.addEventListener('change',stop);
 document.querySelectorAll('dialog').forEach(dialog=>new MutationObserver(()=>{if(dialog.open)stop()}).observe(dialog,{attributes:true,attributeFilter:['open']}));
})();

// Comb-driven curtain reveal: both panels share one photograph at identical scale.
(() => {
 const story=document.querySelector('.comb-story');
 const preference=matchMedia('(prefers-reduced-motion: reduce)');
 let frame=0;
 const clamp=v=>Math.max(0,Math.min(1,v));
 function paint(){
  frame=0;
  if(preference.matches){story.style.cssText='';return}
  const box=story.getBoundingClientRect();
  if(box.bottom<0||box.top>innerHeight)return;
  const p=clamp(-box.top/Math.max(1,story.offsetHeight-innerHeight));
  const travel=clamp((p-.06)/.85);
  const open=travel*travel*(3-2*travel);
  story.style.setProperty('--curtain-open',open.toFixed(4));
  story.style.setProperty('--curtain-shift',`${open*112}%`);
  story.style.setProperty('--comb-y',`${-22+travel*142}vh`);
  story.style.setProperty('--comb-angle',`${-14+Math.sin(travel*Math.PI)*22}deg`);
  story.style.setProperty('--comb-opacity',String(p<.92?1:1-clamp((p-.92)/.08)));
  story.style.setProperty('--intro-opacity',String(1-clamp(p/.22)));
  story.style.setProperty('--reveal-opacity',String(clamp((p-.18)/.4)));
  story.style.setProperty('--reveal-y',`${(1-open)*30}px`);
 }
 const schedule=()=>{if(!frame)frame=requestAnimationFrame(paint)};
 addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});preference.addEventListener('change',schedule);paint();
})();
