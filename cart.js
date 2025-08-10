// فایل cart.js

// افزودن محصول به سبد خرید بر اساس id و اطلاعات محصولات در products.js
function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    // چک می‌کنیم محصول قبلا هست یا نه
    const existingIndex = cart.findIndex(item => item.id === id);
    if (existingIndex !== -1) {
        // اگر بود تعداد را 1 افزایش می‌دهیم
        cart[existingIndex].quantity++;
    } else {
        // اگر نبود، محصول را اضافه می‌کنیم با تعداد 1
        // برای دریافت اطلاعات محصول از فایل products.js فرضی استفاده می‌کنیم
        const product = products.find(p => p.id === id);
        if (!product) {
            alert("محصول یافت نشد!");
            return;
        }
        cart.push({...product, quantity: 1});
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

// نمایش سبد خرید در یک المنت با آیدی cartItems
function displayCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsDiv = document.getElementById("cartItems");
    if (!cartItemsDiv) return;

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = "<p>هیچ محصولی در سبد خرید شما موجود نیست.</p>";
        return;
    }

    cartItemsDiv.innerHTML = cart.map(item => `
        <div class="cart-item">
            <h3>${item.name}</h3>
            <p>قیمت: ${item.price.toLocaleString()} تومان</p>
            <p>تعداد: ${item.quantity}</p>
            <button onclick="removeFromCart(${item.id})">حذف</button>
        </div>
    `).join("");

    // نمایش جمع کل قیمت
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartItemsDiv.innerHTML += `<hr><h4>جمع کل: ${totalPrice.toLocaleString()} تومان</h4>`;
}

// حذف یک محصول از سبد خرید بر اساس id
function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cart.findIndex(item => item.id === id);
    if (index !== -1) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
    }
}

// پاک کردن کامل سبد خرید
function clearCart() {
    localStorage.removeItem("cart");
    displayCart();
}

// اجرای نمایش سبد خرید هنگام بارگذاری صفحه
document.addEventListener("DOMContentLoaded", displayCart);
