
const CART_KEY='bt-cart-v2';
function getCart(){try{return JSON.parse(localStorage.getItem(CART_KEY))||[]}catch{return[]}}
function saveCart(c){localStorage.setItem(CART_KEY,JSON.stringify(c));updateCartCount()}
function addToCart(item,qty=1){
  const c=getCart(); const found=c.find(x=>x.id===item.id && JSON.stringify(x.options||{})===JSON.stringify(item.options||{}));
  if(found) found.qty+=qty; else c.push({...item,qty});
  saveCart(c);
}
function removeFromCart(id){saveCart(getCart().filter(x=>x.id!==id))}
function changeQty(id,qty){const c=getCart(); const x=c.find(i=>i.id===id); if(x){x.qty=Math.max(1,qty);saveCart(c)}}
function updateCartCount(){const el=document.getElementById('cartCount'); if(el) el.textContent=getCart().reduce((s,i)=>s+i.qty,0)}
