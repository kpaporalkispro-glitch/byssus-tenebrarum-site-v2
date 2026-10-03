
const B={
 step:0,
 steps:[
  {key:'type',title:'Type de bijou',desc:'Choisissez la base de votre création.',options:['Collier','Manchette','Chaîne de taille','Parure de buste','Boucles d’oreilles','Ensemble couple','Bijou de corps']},
  {key:'style',title:'Univers esthétique',desc:'L’ambiance générale de la pièce.',options:['Gothique sobre','Romantique sombre','Mystique','Égyptien','Botanique noir','Minimaliste','Baroque']},
  {key:'stone',title:'Pierre principale',desc:'La pierre centrale de la création.',options:['Améthyste','Labradorite','Onyx','Pierre de lune','Quartz rose','Grenat','Œil de tigre','Obsidienne','Fluorite','Quartz fumé']},
  {key:'thread',title:'Fil & couleurs',desc:'Couleur dominante et contraste.',options:['Noir profond','Noir + violet','Noir + bronze','Prune + noir','Sable + bronze','Vert sombre + noir']},
  {key:'metal',title:'Perles & métal',desc:'Choisissez les accents.',options:['Bronze vieilli','Laiton doré','Argent vieilli','Noir mat','Sans métal']},
  {key:'intention',title:'Intention symbolique',desc:'Le thème narratif du bijou.',options:['Protection','Lien','Confiance','Transformation','Ancrage','Intuition','Passion','Liberté']},
  {key:'size',title:'Taille & mesures',desc:'Choisissez une base, puis précisez si nécessaire.',options:['XS','S','M','L','XL','Sur mesure']},
  {key:'closure',title:'Fermeture',desc:'Le système le plus adapté à l’usage.',options:['Nœud coulissant','Lien à nouer','Mousqueton','Bouton perle','Anneau + lien','À définir avec l’artisane']},
  {key:'finish',title:'Niveau de finition',desc:'Du plus sobre au plus travaillé.',options:['Minimal','Équilibré','Détaillé','Pièce signature']},
  {key:'note',title:'Message & détails',desc:'Ajoutez vos souhaits finaux.',options:[]}
 ],
 data:{}
};
const basePrice={'Collier':75,'Manchette':55,'Chaîne de taille':85,'Parure de buste':115,"Boucles d’oreilles":45,'Ensemble couple':125,'Bijou de corps':135};

function renderProgress(){
 builderProgress.innerHTML=B.steps.map((s,i)=>`<button class="${i===B.step?'active':''} ${i<B.step?'done':''}" data-goto="${i}"><b>${i+1}</b><span>${s.title}</span></button>`).join('');
 builderProgress.querySelectorAll('[data-goto]').forEach(x=>x.onclick=()=>{B.step=+x.dataset.goto;renderBuilder()});
}
function renderBuilder(){
 renderProgress();
 const s=B.steps[B.step];
 if(s.key==='note'){
   builderStep.innerHTML=`<div class="builder-step"><span class="step-no">${B.step+1}</span><div><h2>${s.title}</h2><p>${s.desc}</p></div></div>
   <div class="form-grid">
    <label>Mesures précises<textarea id="measureNote" rows="4" placeholder="Tour de cou, poignet, taille, buste…">${B.data.measureNote||''}</textarea></label>
    <label>Votre message<textarea id="customNote" rows="6" placeholder="Décrivez le symbole, la personne, une référence, un détail important…">${B.data.customNote||''}</textarea></label>
    <label>Budget maximum<select id="budget"><option>80 €</option><option>120 €</option><option>160 €</option><option>220 €</option><option>300 € et +</option></select></label>
    <label>Référence visuelle<input id="refImage" type="file" accept=".png,image/png"><small>Prévisualisation locale uniquement dans cette version statique.</small></label>
   </div>
   <div id="localRefPreview"></div>`;
   measureNote.oninput=()=>{B.data.measureNote=measureNote.value;summary()};
   customNote.oninput=()=>{B.data.customNote=customNote.value;summary()};
   budget.oninput=()=>{B.data.budget=budget.value;summary()};
   refImage.onchange=e=>{const f=e.target.files[0]; if(f){const url=URL.createObjectURL(f); localRefPreview.innerHTML=`<img class="local-preview" src="${url}">`;B.data.reference='PNG ajouté localement';summary()}};
 } else {
   builderStep.innerHTML=`<div class="builder-step"><span class="step-no">${B.step+1}</span><div><h2>${s.title}</h2><p>${s.desc}</p></div></div>
   <div class="option-grid">${s.options.map(o=>`<button class="option ${B.data[s.key]===o?'selected':''}" data-opt="${o}"><span>✦</span><strong>${o}</strong></button>`).join('')}</div>`;
   builderStep.querySelectorAll('[data-opt]').forEach(btn=>btn.onclick=()=>{B.data[s.key]=btn.dataset.opt;renderBuilder()});
 }
 builderPrev.disabled=B.step===0;
 builderNext.textContent=B.step===B.steps.length-1?'Ajouter ma création au panier':'Étape suivante →';
 summary();
}
function summary(){
 builderSummary.innerHTML=Object.entries(B.data).filter(([k,v])=>v && !['measureNote','customNote'].includes(k)).map(([k,v])=>`<dt>${({type:'Type',style:'Style',stone:'Pierre',thread:'Fil',metal:'Métal',intention:'Intention',size:'Taille',closure:'Fermeture',finish:'Finition',budget:'Budget',reference:'Référence'})[k]||k}</dt><dd>${v}</dd>`).join('');
 const type=B.data.type||'Collier';
 const price=(basePrice[type]||75)+({Minimal:0,'Équilibré':20,'Détaillé':45,'Pièce signature':80}[B.data.finish]||0);
 builderEstimate.textContent=`${price} € – ${price+35} €`;
 const imgMap={'Collier':'colliers/colliers-01.png','Manchette':'manchettes/manchettes-01.png','Chaîne de taille':'chaines-taille/chaines-taille-01.png','Parure de buste':'parures-buste/parures-buste-01.png',"Boucles d’oreilles":'boucles-oreilles/boucles-oreilles-01.png','Ensemble couple':'ensembles-couple/ensembles-couple-01.png','Bijou de corps':'bijoux-corps/bijoux-corps-01.png'};
 builderPreview.src='assets/images/products/'+(imgMap[type]||imgMap.Collier);
}
function addCustom(){
 const type=B.data.type||'Collier', price=(basePrice[type]||75)+({Minimal:0,'Équilibré':20,'Détaillé':45,'Pièce signature':80}[B.data.finish]||0);
 addToCart({id:'custom-'+Date.now(),name:'Sur-mesure · '+type,price,image:builderPreview.getAttribute('src'),options:{...B.data}},1);
 location.href='panier.html';
}
document.addEventListener('DOMContentLoaded',()=>{
 builderPrev.onclick=()=>{B.step=Math.max(0,B.step-1);renderBuilder()};
 builderNext.onclick=()=>{if(B.step===B.steps.length-1)addCustom();else{B.step++;renderBuilder()}};
 renderBuilder();
});
