
window.BT = {
  products: async function(){
    if(!this._products){
      this._products = await fetch('data/products.json').then(r=>r.json());
    }
    return this._products;
  },
  catalog: async function(){
    if(!this._catalog){
      this._catalog = await fetch('data/catalog.json').then(r=>r.json());
    }
    return this._catalog;
  },
  money: v => new Intl.NumberFormat('fr-FR',{style:'currency',currency:'EUR'}).format(v),
  productCard: function(p){
    return `<article class="product-card">
      <a class="product-photo" href="produit.html?id=${p.id}"><img src="${p.image}" alt="${p.name}"></a>
      <div class="product-copy">
        <small>${p.categoryName}</small>
        <a href="produit.html?id=${p.id}"><h3>${p.name}</h3></a>
        <p>${p.stone}</p>
        <div class="product-row"><strong>${BT.money(p.price)}</strong><button data-add="${p.id}" class="add-mini">Ajouter</button></div>
      </div>
    </article>`
  }
};

document.addEventListener('DOMContentLoaded',()=>{
  const navToggle=document.getElementById('navToggle'), nav=document.getElementById('mainNav');
  if(navToggle && nav) navToggle.onclick=()=>nav.classList.toggle('open');
  updateCartCount();
});
document.addEventListener('click', async e=>{
  const btn=e.target.closest('[data-add]');
  if(!btn) return;
  const products=await BT.products();
  const p=products.find(x=>x.id===btn.dataset.add);
  if(p){ addToCart({id:p.id,name:p.name,price:p.price,image:p.image},1); btn.textContent='Ajouté ✓'; setTimeout(()=>btn.textContent='Ajouter',900); }
});
