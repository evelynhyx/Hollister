// ============================================
// CART MANAGEMENT SYSTEM
// ============================================

class ShoppingCart {
  constructor() {
    this.cart = this.loadCart();
    this.initializeModal();
    this.setupEventListeners();
  }

  // Load cart from localStorage
  loadCart() {
    const saved = localStorage.getItem('shopping_cart');
    return saved ? JSON.parse(saved) : [];
  }

  // Save cart to localStorage
  saveCart() {
    localStorage.setItem('shopping_cart', JSON.stringify(this.cart));
  }

  // Add item to cart (or increment quantity if it exists)
  addToCart(productId, productName, productPrice) {
    // Check if item already exists in cart
    const existingItem = this.cart.find(item => item.id === productId);

    if (existingItem) {
      // If it exists, increment quantity
      existingItem.quantity += 1;
    } else {
      // If new item, add it
      this.cart.push({
        id: productId,
        name: productName,
        price: parseFloat(productPrice),
        quantity: 1
      });
    }

    this.saveCart();
    this.renderCart();
    this.showCartModal(); // Open the modal when item is added
  }

  // Remove item from cart
  removeFromCart(productId) {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.saveCart();
    this.renderCart();
  }

  // Update quantity
  updateQuantity(productId, newQuantity) {
    newQuantity = parseInt(newQuantity);

    if (newQuantity < 1) {
      this.removeFromCart(productId);
      return;
    }

    const item = this.cart.find(item => item.id === productId);
    if (item) {
      item.quantity = newQuantity;
      this.saveCart();
      this.renderCart();
    }
  }

  // Calculate subtotal
  getSubtotal() {
    return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  // Initialize modal structure
  initializeModal() {
    // Check if modal already exists
    if (document.getElementById('cart-modal')) return;

    // Inject modal HTML
    const modalHTML = `
      <div id="cart-modal" class="cart-modal">
        <div class="cart-modal-overlay" id="cart-modal-overlay"></div>
        <div class="cart-modal-content">
          <div class="cart-modal-header">
            <h2>Your Cart</h2>
            <button class="cart-modal-close" id="cart-modal-close" aria-label="Close cart">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div class="cart-modal-items" id="cart-modal-items"></div>
          <div class="cart-modal-empty" id="cart-modal-empty" style="display: none;">
            <p>Your cart is empty</p>
          </div>
          <div class="cart-modal-footer">
            <div class="cart-modal-totals">
              <div class="cart-modal-subtotal">
                <span>Subtotal:</span>
                <span id="cart-modal-subtotal">$0.00</span>
              </div>
            </div>
            <button class="cart-modal-go-to-bag" id="cart-modal-go-to-bag">Go to Bag</button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  // Render cart items in the modal
  renderCart() {
    const itemsContainer = document.getElementById('cart-modal-items');
    const emptyMessage = document.getElementById('cart-modal-empty');
    const subtotalElement = document.getElementById('cart-modal-subtotal');
    const goToBagBtn = document.getElementById('cart-modal-go-to-bag');

    if (this.cart.length === 0) {
      itemsContainer.innerHTML = '';
      emptyMessage.style.display = 'block';
      goToBagBtn.disabled = true;
      subtotalElement.textContent = '$0.00';
      return;
    }

    emptyMessage.style.display = 'none';
    goToBagBtn.disabled = false;

    itemsContainer.innerHTML = this.cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-info">
          <h3 class="cart-item-name">${item.name}</h3>
          <p class="cart-item-price">$${item.price.toFixed(2)}</p>
        </div>
        <div class="cart-item-controls">
          <div class="quantity-control">
            <button class="qty-btn qty-minus" data-id="${item.id}" aria-label="Decrease quantity">−</button>
            <input 
              type="number" 
              class="cart-item-quantity" 
              value="${item.quantity}" 
              data-id="${item.id}"
              min="1"
            />
            <button class="qty-btn qty-plus" data-id="${item.id}" aria-label="Increase quantity">+</button>
          </div>
          <p class="cart-item-subtotal">$${(item.price * item.quantity).toFixed(2)}</p>
        </div>
        <button class="cart-item-remove" data-id="${item.id}" aria-label="Remove from cart">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </button>
      </div>
    `).join('');

    // Update subtotal
    subtotalElement.textContent = `$${this.getSubtotal().toFixed(2)}`;

    // Attach event listeners to new elements
    this.attachItemEventListeners();
  }

  // Attach event listeners to cart item controls
  attachItemEventListeners() {
    // Remove buttons
    document.querySelectorAll('.cart-item-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productId = e.currentTarget.dataset.id;
        this.removeFromCart(productId);
      });
    });

    // Quantity input change
    document.querySelectorAll('.cart-item-quantity').forEach(input => {
      input.addEventListener('change', (e) => {
        const productId = e.target.dataset.id;
        this.updateQuantity(productId, e.target.value);
      });
    });

    // Minus button
    document.querySelectorAll('.qty-minus').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productId = e.currentTarget.dataset.id;
        const item = this.cart.find(i => i.id === productId);
        if (item) {
          this.updateQuantity(productId, item.quantity - 1);
        }
      });
    });

    // Plus button
    document.querySelectorAll('.qty-plus').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productId = e.currentTarget.dataset.id;
        const item = this.cart.find(i => i.id === productId);
        if (item) {
          this.updateQuantity(productId, item.quantity + 1);
        }
      });
    });
  }

  // Setup modal visibility controls
  setupEventListeners() {
    const modal = document.getElementById('cart-modal');
    const overlay = document.getElementById('cart-modal-overlay');
    const closeBtn = document.getElementById('cart-modal-close');
    const goToBagBtn = document.getElementById('cart-modal-go-to-bag');

    // Close modal
    const closeModal = () => {
      modal.classList.remove('active');
    };

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    // Keyboard support (ESC to close)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });

    // Go to Bag button - redirects to full cart page
    goToBagBtn.addEventListener('click', () => {
      window.location.href = '/pages/cart/cart.html';
    });

    // Wire up cart icon in navbar to open modal
    this.setupCartIconListener();
  }

  // Setup cart icon click to open modal
  setupCartIconListener() {
    // Find the cart icon in the header
    // The cart icon is the second .icon-btn with an SVG (after the login icon)
    const topBarLinks = document.querySelector('.top-bar-links');
    
    if (topBarLinks) {
      const cartLink = topBarLinks.querySelectorAll('a.icon-btn')[1]; // Get the 2nd link (cart)
      
      if (cartLink) {
        // Prevent default navigation and open modal instead
        cartLink.addEventListener('click', (e) => {
          e.preventDefault();
          this.showCartModal();
        });
      }
    }
  }

  // Show the cart modal
  showCartModal() {
    const modal = document.getElementById('cart-modal');
    modal.classList.add('active');
  }

  // Hide the cart modal
  hideCartModal() {
    const modal = document.getElementById('cart-modal');
    modal.classList.remove('active');
  }
}

// Initialize cart when DOM is ready
let shoppingCart;
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    shoppingCart = new ShoppingCart();
  });
} else {
  shoppingCart = new ShoppingCart();
}

// ============================================
// ADD TO CART FUNCTION - Call this from your buttons
// ============================================
function addToCart(event) {
  // Get the product box
  const productBox = event.target.closest('.product-box');
  
  // Extract product details
  const productName = productBox.querySelector('.product-name').textContent;
  const productPrice = productBox.querySelector('.product-cost').textContent.replace('$', '');
  const productId = productBox.dataset.productId || productName.toLowerCase().replace(/\s+/g, '-');

  // Add to cart
  shoppingCart.addToCart(productId, productName, productPrice);
}