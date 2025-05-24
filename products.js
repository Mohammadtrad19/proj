// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get all elements we need to work with
    const categoryButtons = document.querySelectorAll('.category-btn');
    const productCards = document.querySelectorAll('.product-card');
    const cartItems = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');
    const confirmPurchaseButton = document.getElementById('confirmPurchase');
    
    let cart = [];
    let totalPrice = 0;
    
    // Category filtering functionality
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the category from the button's data attribute
            const category = this.getAttribute('data-category');
            
            // Show or hide products based on category
            productCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.getAttribute('data-name');
            const productPrice = parseFloat(this.getAttribute('data-price'));
            
            // Add to cart array
            cart.push({
                name: productName,
                price: productPrice
            });
            
            // Update total price
            totalPrice += productPrice;
            totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
            
            // Update cart display
            updateCartDisplay();
            
            // Show a confirmation message
            alert(`Added ${productName} to cart!`);
        });
    });
    
    // Function to update the cart display
    function updateCartDisplay() {
        // Clear current list
        cartItems.innerHTML = '';
        
        // Add each item to the list
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${item.name} - $${item.price.toFixed(2)}
                <button class="remove-item" data-index="${index}">Remove</button>
            `;
            cartItems.appendChild(li);
        });
        
        // Add event listeners to remove buttons
        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                removeFromCart(index);
            });
        });
    }
    
    // Function to remove item from cart
    function removeFromCart(index) {
        // Subtract price from total
        totalPrice -= cart[index].price;
        totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
        
        // Remove from array
        cart.splice(index, 1);
        
        // Update display
        updateCartDisplay();
    }
    
    // Checkout functionality
    confirmPurchaseButton.addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        alert(`Thank you for your purchase! Total: $${totalPrice.toFixed(2)}`);
        
        // Clear cart
        cart = [];
        totalPrice = 0;
        totalPriceElement.textContent = 'Total: $0.00';
        updateCartDisplay();
    });
    
    // Initialize the page with "All Products" selected
    document.querySelector('.category-btn[data-category="all"]').click();
});