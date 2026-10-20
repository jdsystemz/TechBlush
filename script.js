const products = [
{
id:1,
badge:"BESTSELLER",
name:"Pink Mechanical Keyboard",
category:"Keyboard",
price:79,
rating:5,
stock:5,
image:"https://www.gravastar.com/cdn/shop/files/2_8e9d7480-575d-420a-81ab-1e1687db85cc.webp?v=1742546105&width=1920"
},
{
id:2,
badge:"NEW",
name:"Lavender Mouse",
category:"Accessory",
price:39,
rating:4,
stock:3,
image:"https://m.media-amazon.com/images/I/61PxscUq6uL._AC_SL1500_.jpg"
},
{
id:3,
badge:"HOT",
name:"RGB USB Hub",
category:"Accessory",
price:29,
rating:5,
stock:8,
image:"https://static.wixstatic.com/media/695b2a_7d2371f0da924cac9f6b16a8f9f68fd4~mv2.png"
},
{
id:4,
badge:"SALE",
name:"Bluetooth Headset",
category:"Electronics",
price:99,
rating:5,
stock:2,
image:"https://down-ph.img.susercontent.com/file/7e12fcacb282df73115a3187c37033f8"
},
{
id:5,
badge:"NEW",
name:"Webcam Pro",
category:"Electronics",
price:69,
rating:4,
stock:4,
image:"https://pccaus.com/storage/media/OWbf11VcameLBAEGFhgLT2leVzJQN4CeqjDhAnYm.jpeg"
},
{
id:6,
badge:"TRENDING",
name:"Pastel Desk Lamp",
category:"Accessory",
price:49,
rating:5,
stock:7,
image:"https://img.freepik.com/premium-photo/clay-task-lamp-pastel_773922-68325.jpg"
},
{
id:7,
badge:"NEW",
name:"Pink Office Chair",
category:"Accessory",
price:99,
rating:5,
stock:8,
image:"https://mobileimages.lowes.com/productimages/e5d42b99-8130-4060-8937-6123520f0852/61391106.jpg?size=pdhism"
}
];

let cart =
JSON.parse(localStorage.getItem("cart")) || {};

let wishlist =
JSON.parse(localStorage.getItem("wishlist")) || [];

let discount = 0;

function applyPromo(){

    const code =
    document.getElementById("promoCode").value;

    if(code === "PINK10"){

        discount = 10;

        alert("10% discount applied!");

        updateCart();

    }else{

        alert("Invalid promo code");

    }
}

const productsContainer =
document.getElementById("products");

function saveData(){
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );
}

function renderProducts(){

    const search =
    document.getElementById("search")
    .value.toLowerCase();

    const category =
    document.getElementById("category")
    .value;

    productsContainer.innerHTML = "";

    const filtered = products.filter(p => {

        return (
            p.name.toLowerCase()
            .includes(search)
            &&
            (
                category==="All" ||
                p.category===category
            )
        );

    });

    const sort =
    document.getElementById("sort").value;

    if(sort === "priceLow"){
        filtered.sort((a,b)=>a.price-b.price);
    }

    if(sort === "priceHigh"){
        filtered.sort((a,b)=>b.price-a.price);
    }

    if(sort === "rating"){
        filtered.sort((a,b)=>b.rating-a.rating);
    }

    filtered.forEach(product => {

        const card =
        document.createElement("div");

        card.className="card";

        card.innerHTML = `
        <div class="badge">${product.badge}</div>

        <img src="${product.image}">

        <div class="content">

        <h3>${product.name}</h3>

        <div class="category">
        ${product.category}
        </div>

        <div class="stock">
        Stock: ${product.stock}
        </div>

        <div class="rating">
        ${"⭐".repeat(product.rating)}
        </div>

        <div class="price">
        $${product.price}
        </div>

        <div class="actions">

        <button
        class="buy"
        onclick="addToCart(${product.id})">
        Add To Cart
        </button>

        <button
        class="wishlist"
        onclick="toggleWishlist(${product.id})">
        ${wishlist.includes(product.id) ? "❤️" : "🤍"}
        </button>

        </div>

        </div>
        `;

        productsContainer.appendChild(card);
    });

}

function addToCart(id){

    cart[id] = (cart[id] || 0) + 1;

    saveData();
    updateCart();
}

function decreaseCart(id){

    cart[id]--;

    if(cart[id] <= 0){
        delete cart[id];
    }

    saveData();
    updateCart();
}

function toggleWishlist(id){

    if(wishlist.includes(id)){
        wishlist =
        wishlist.filter(x => x !== id);
    }
    else{
        wishlist.push(id);
    }

    saveData();
    renderProducts();

    document.getElementById("wishlistCount").textContent =
    wishlist.length;
}

function updateCart(){

    const cartItems =
    document.getElementById("cartItems");

    cartItems.innerHTML="";

    let total = 0;
    let count = 0;

    products.forEach(product => {

        const qty = cart[product.id];

        if(qty){

            total += qty * product.price;

            count += qty;

            const item =
            document.createElement("div");

            item.className="cart-item";

            item.innerHTML=`

            <div>

                <strong>
                ${product.name}
                </strong>

                <br>

                $${product.price}

            </div>

            <div class="qty">

                <button onclick="
                decreaseCart(${product.id})
                ">-</button>

                ${qty}

                <button onclick="
                addToCart(${product.id})
                ">+</button>

            </div>
            `;

            cartItems.appendChild(item);
        }

    });

    document.getElementById(
        "cartCount"
    ).textContent = count;

    document.getElementById(
        "total"
    ).textContent = total.toFixed(2);
}

document
.getElementById("search")
.addEventListener(
    "input",
    renderProducts
);

document
.getElementById("category")
.addEventListener(
    "change",
    renderProducts
);

renderProducts();
updateCart();


document.getElementById(
"wishlistCount"
).textContent = wishlist.length;


document
.getElementById("sort")
.addEventListener(
"change",
renderProducts
);
