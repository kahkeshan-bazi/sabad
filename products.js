const products = [
    { id: 1, name: "محصول تست ۱", price: 100000 },
    { id: 2, name: "محصول تست ۲", price: 200000 },
    { id: 3, name: "محصول تست ۳", price: 300000 }
];

const productList = document.getElementById("product-list");

if (productList) {
    products.forEach(product => {
        const div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `
            <h2>${product.name}</h2>
            <p>${product.price.toLocaleString()} تومان</p>
            <button onclick="addToCart(${product.id})">افزودن به سبد خرید</button>
        `;
        productList.appendChild(div);
    });
}
