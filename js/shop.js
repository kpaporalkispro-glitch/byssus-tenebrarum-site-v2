
let ALL=[];
async function initShop(){
  const [catalog,products]=await Promise.all([BT.catalog(),BT.products()]);
  ALL=products;
  filterCategory.innerHTML='<option value="">Toutes</option>'+catalog.categories.map(c=>`<option value="${c.slug}">${c.name}</option>`).join('');
  filterStone.innerHTML='<option value="">Toutes</option>'+[...new Set(products.map(p=>p.stone))].map(s=>`<option>${s}</option>`).join('');
  const q=new URLSearchParams(location.search).get('cat'); if(q) filterCategory.value=q;
  [filterCategory,filterStone,filterPrice,sort].forEach(el=>el.addEventListener('input',renderShop));
  resetFilters.onclick=()=>{filterCategory.value='';filterStone.value='';filterPrice.value=220;sort.value='default';renderShop()};
  renderShop();
}
function renderShop(){
  priceOut.textContent=filterPrice.value+' €';
  let list=ALL.filter(p=>(!filterCategory.value||p.category===filterCategory.value)&&(!filterStone.value||p.stone===filterStone.value)&&p.price<=+filterPrice.value);
  if(sort.value==='asc') list.sort((a,b)=>a.price-b.price);
  if(sort.value==='desc') list.sort((a,b)=>b.price-a.price);
  shopCount.textContent=`${list.length} création${list.length>1?'s':''}`;
  shopGrid.innerHTML=list.map(BT.productCard).join('');
}
document.addEventListener('DOMContentLoaded',initShop);
