
document.addEventListener('DOMContentLoaded', async ()=>{
  const [cat,products]=await Promise.all([BT.catalog(),BT.products()]);
  homeCategories.innerHTML=cat.categories.map(c=>{
    const img=`${c.folder}/${c.prefix}-01.png`;
    return `<a class="category-card" href="boutique.html?cat=${c.slug}"><img src="${img}" alt="${c.name}"><span>${c.name}</span></a>`;
  }).join('');
  featuredProducts.innerHTML=products.filter(p=>p.featured).slice(0,8).map(BT.productCard).join('');
});
