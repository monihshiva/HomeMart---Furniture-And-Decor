const products=[
{id:1,name:"Modern Sectional Sofa",category:"Living Room",price:129999,material:"Fabric",dimensions:"98 x 65 x 34 in",icon:"🛋️"},
{id:2,name:"Wooden King Bed",category:"Bedroom",price:89999,material:"Wood",dimensions:"80 x 76 x 48 in",icon:"🛏️"},
{id:3,name:"Coffee Table",category:"Living Room",price:24999,material:"Wood",dimensions:"48 x 24 x 18 in",icon:"▱"},
{id:4,name:"Dining Table Set",category:"Dining",price:69999,material:"Wood",dimensions:"72 x 36 x 30 in",icon:"🍽️"},
{id:5,name:"Ergonomic Office Chair",category:"Office",price:18999,material:"Fabric",dimensions:"26 x 26 x 42 in",icon:"💺"},
{id:6,name:"Study Desk",category:"Office",price:29999,material:"Wood",dimensions:"48 x 24 x 30 in",icon:"🖥️"},
{id:7,name:"Metal Bar Stool",category:"Dining",price:8999,material:"Metal",dimensions:"18 x 18 x 30 in",icon:"🪑"},
{id:8,name:"Decorative Floor Lamp",category:"Office",price:7999,material:"Metal",dimensions:"12 x 12 x 60 in",icon:"💡"}
];
let cart=[];
let activeCategory="";
function money(n){return "₹"+n.toLocaleString("en-IN")}
function renderProducts(){
 let q=document.getElementById("search").value.toLowerCase(),m=document.getElementById("material").value,s=document.getElementById("sort").value;
 let list=products.filter(p=>(!activeCategory||p.category===activeCategory)&&p.name.toLowerCase().includes(q)&&(!m||p.material===m));
 if(s==="low")list.sort((a,b)=>a.price-b.price);if(s==="high")list.sort((a,b)=>b.price-a.price);
 document.getElementById("productGrid").innerHTML=list.map(p=>`<article class="card"><div class="pic">${p.icon}</div><div class="card-content"><h3>${p.name}</h3><p>${p.material} · ${p.dimensions}</p><p class="price">${money(p.price)}</p><button onclick="addToCart(${p.id})">Add to Cart</button></div></article>`).join("")||"<p>No products found.</p>";
}
function filterProducts(c){activeCategory=c;document.getElementById("products").scrollIntoView();renderProducts()}
function showAll(){activeCategory="";renderProducts()}
function addToCart(id){let x=cart.find(i=>i.id===id);if(x)x.qty++;else cart.push({id,qty:1});renderCart()}
function changeQty(id,d){let x=cart.find(i=>i.id===id);if(!x)return;x.qty+=d;if(x.qty<=0)cart=cart.filter(i=>i.id!==id);renderCart()}
function renderCart(){
 let total=0;
 document.getElementById("cartItems").innerHTML=cart.length?cart.map(i=>{let p=products.find(x=>x.id===i.id);total+=p.price*i.qty;return `<div class="cart-row"><span><b>${p.name}</b> × ${i.qty}</span><span>${money(p.price*i.qty)} <button onclick="changeQty(${p.id},-1)">−</button><button onclick="changeQty(${p.id},1)">+</button></span></div>`}).join(""):"<p>Your cart is empty.</p>";
 document.getElementById("cartTotal").textContent="Total: "+money(total);document.getElementById("cartCount").textContent=cart.reduce((a,b)=>a+b.qty,0);
}
document.getElementById("checkoutForm").addEventListener("submit",e=>{e.preventDefault();if(!cart.length){document.getElementById("orderMessage").textContent="Please add a product to the cart first.";return}
let orderId="HM"+Date.now().toString().slice(-6);let name=document.getElementById("customerName").value;let date=document.getElementById("deliveryDate").value;
document.getElementById("orderMessage").textContent=`Order ${orderId} placed successfully for ${name}. Delivery scheduled for ${date}.`;
cart=[];renderCart();e.target.reset()});
renderProducts();renderCart();
