function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = products.find(p => p.id === id);
    if (product) {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("محصول به سبد خرید اضافه شد");
    }
}

function displayCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsDiv = document.getElementById("cart-items");

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = "<p>هیچ محصولی در سبد خرید شما موجود نیست.</p>";
        return;
    }

    cartItemsDiv.innerHTML = cart.map(item => `
        <div class="cart-item">
            <h2>${item.name}</h2>
            <p>${item.price.toLocaleString()} تومان</p>
        </div>
    `).join("");
}
