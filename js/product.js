
let CURRENT=null,QTY=1;
document.addEventListener('DOMContentLoaded', async ()=>{
  const products=await BT.products();
  const id=new URLSearchParams(location.search).get('id')||products[0].id;
  CURRENT=products.find(p=>p.id===id)||products[0];
  productImage.src=CURRENT.image; productName.textContent=CURRENT.name; productCategory.textContent=CURRENT.categoryName.toUpperCase();
  productPrice.textContent=BT.money(CURRENT.price); productDesc.textContent=CURRENT.short+' Pierre : '+CURRENT.stone+'.';
  qtyMinus.onclick=()=>{QTY=Math.max(1,QTY-1);qty.textContent=QTY}; qtyPlus.onclick=()=>{QTY++;qty.textContent=QTY};
  productAdd.onclick=()=>{addToCart({id:CURRENT.id,name:CURRENT.name,price:CURRENT.price,image:CURRENT.image},QTY); productAdd.textContent='Ajouté ✓'};
  related.innerHTML=products.filter(p=>p.category===CURRENT.category && p.id!==CURRENT.id).slice(0,4).map(BT.productCard).join('');
});
