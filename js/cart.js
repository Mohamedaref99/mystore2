// Load cart items from localStorage
function loadCartItems() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty!</p>';
        return;
    }

    cart.forEach(item => {
        let itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <h3>${item.name}</h3>
            <p>Price: $${item.price}</p>
            <p>Quantity: <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${item.name}', this.value)"></p>
            <button onclick="removeFromCart('${item.name}')">Remove</button>
        `;
        cartItemsContainer.appendChild(itemDiv);
    });
}

// Remove item from the cart
function removeFromCart(productName) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.name !== productName);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
}

// Update item quantity in cart
function updateQuantity(productName, newQuantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = cart.find(item => item.name === productName);
    if (product) {
        product.quantity = parseInt(newQuantity);
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

// Clear the cart
function clearCart() {
    localStorage.removeItem('cart');
    loadCartItems();
}

// Initial call to load cart items when the page loads
window.onload = loadCartItems;
