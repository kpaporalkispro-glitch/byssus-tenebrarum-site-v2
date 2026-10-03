
function renderCart(){
 const c=getCart();
 cartItems.innerHTML=c.length?c.map(i=>`<article class="cart-row"><img src="${i.image}" alt=""><div><h3>${i.name}</h3>${i.options?`<small>${Object.values(i.options).filter(Boolean).slice(0,5).join(' · ')}</small>`:''}</div><div class="qty-mini"><button data-dec="${i.id}">−</button><span>${i.qty}</span><button data-inc="${i.id}">+</button></div><strong>${BT.money(i.price*i.qty)}</strong><button data-del="${i.id}">×</button></article>`).join(''):'<div class="empty">Votre panier est vide.<br><a class="btn secondary" href="boutique.html">Voir la boutique</a></div>';
 const total=c.reduce((s,i)=>s+i.price*i.qty,0);cartSubtotal.textContent=BT.money(total);cartTotal.textContent=BT.money(total);
}
document.addEventListener('click',e=>{
 let c=getCart();
 if(e.target.dataset.del){removeFromCart(e.target.dataset.del);renderCart()}
 if(e.target.dataset.inc){let x=c.find(i=>i.id===e.target.dataset.inc);changeQty(x.id,x.qty+1);renderCart()}
 if(e.target.dataset.dec){let x=c.find(i=>i.id===e.target.dataset.dec);changeQty(x.id,x.qty-1);renderCart()}
});
document.addEventListener('DOMContentLoaded',()=>{renderCart();checkoutBtn.onclick=()=>alert('Connectez ici votre Stripe Checkout / PayPal / solution e-commerce.')});
