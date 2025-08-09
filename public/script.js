/* document.getElementById("loadCustomers").addEventListener("click", fetchCustomers)
function fetchCustomers() {
    console.log("fetchCustomers");
    fetch("http://localhost:3000/customers")  // Fetch from backend
        .then(response => response.json())  // Convert response to JSON
        .then(data => {
            console.log("Customers:", data);  // Debugging
            const tableBody = document.getElementById("customersTable").getElementsByTagName("tbody")[0];
        
            // Clear existing rows
            tableBody.innerHTML = "";
        
            // Loop through customers and create table rows
            data.forEach(customer => {
                let row = tableBody.insertRow();
                row.insertCell(0).innerText = customer.customer_id;
                row.insertCell(1).innerText = customer.first_name;
                row.insertCell(2).innerText = customer.last_name;
                row.insertCell(3).innerText = customer.email;
                row.insertCell(4).innerText = customer.creation_date;
            });
        })
        .catch(error => console.error("Error fetching customers:", error));
} */

const socket = new WebSocket("ws://localhost:3000");

socket.onopen = () => {
    console.log("Connected to WebSocket server");
};

socket.onmessage = event => {
    const customers = JSON.parse(event.data);
    console.log("Received update:", customers);
    displayCustomers(customers);
};

socket.onclose = () => {
    console.log("WebSocket connection closed");
};

function displayCustomers(customers) {
    const container = document.getElementById("customers-list");
    container.innerHTML = ""; // Clear previous content

    customers.forEach(customer => {
        const div = document.createElement("div");
        div.classList.add("customer-item");
        div.innerHTML = `<strong>${customer.name}</strong> - ${customer.email}`;
        container.appendChild(div);
    });
}

// const openBtn = document.getElementById("openSearchModal");
// const closeBtn = document.getElementById("closeSearchModal");
// const modal = document.getElementById("searchModal");

document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("login-form");
  if (openBtn) {
    openBtn.addEventListener("click", () => {
      modal.style.display = "block";
    });
  }
});

// openBtn.addEventListener("click", () => {
//   modal.style.display = "block";
// });

document.addEventListener("DOMContentLoaded", () => {
  const closeBtn = document.getElementById("closeSearchModal");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }
});

// closeBtn.addEventListener("click", () => {
//   modal.style.display = "none";
// });

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("searchModal");
  if (modal) {
    window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
  }
});

// // Mock in-memory store for carts (replace with a database in production)
// let carts = {};

// // Mock user ID (replace with real authentication later)
// const mockUserId = 'user123';

// // API Endpoints

// // Get cart for a user
// app.get('/api/cart', (req, res) => {
//   const cart = carts[mockUserId] || [];
//   res.json(cart);
// });

// // Add or update item in cart
// app.post('/api/cart', (req, res) => {
//   const { name, price, quantity } = req.body;
//   if (!name || price === undefined || quantity === undefined) {
//     return res.status(400).json({ error: 'Missing required fields' });
//   }

//   let cart = carts[mockUserId] || [];
//   const existingProduct = cart.find(item => item.name === name);

//   if (existingProduct) {
//     existingProduct.quantity += quantity;
//     existingProduct.subtotal = existingProduct.price * existingProduct.quantity;
//   } else {
//     cart.push({
//       name,
//       price,
//       quantity,
//       subtotal: price * quantity
//     });
//   }

//   carts[mockUserId] = cart;
//   res.json(cart);
// });

// // Update quantity of an item
// app.put('/api/cart/:name', (req, res) => {
//   const { name } = req.params;
//   const { quantity } = req.body;
//   if (!quantity || quantity < 1) {
//     return res.status(400).json({ error: 'Invalid quantity' });
//   }

//   let cart = carts[mockUserId] || [];
//   const existingProduct = cart.find(item => item.name === name);

//   if (existingProduct) {
//     existingProduct.quantity = quantity;
//     existingProduct.subtotal = existingProduct.price * quantity;
//     carts[mockUserId] = cart;
//     res.json(cart);
//   } else {
//     res.status(404).json({ error: 'Item not found' });
//   }
// });

// // Remove item from cart
// app.delete('/api/cart/:name', (req, res) => {
//   const { name } = req.params;
//   let cart = carts[mockUserId] || [];
//   const initialLength = cart.length;

//   carts[mockUserId] = cart.filter(item => item.name !== name);

//   if (cart.length < initialLength) {
//     res.json(carts[mockUserId]);
//   } else {
//     res.status(404).json({ error: 'Item not found' });
//   }
// });

// // Get total for the cart
// app.get('/api/cart/total', (req, res) => {
//   const cart = carts[mockUserId] || [];
//   const total = cart.reduce((sum, item) => sum + item.subtotal, 0);
//   res.json({ total: total.toFixed(2) });
// });

const productData = {
  name: 'Bunny Plushie',
  price: 8.00
};

// document.getElementById('product-name').textContent = productData.name;
// document.getElementById('product-price').textContent = productData.price.toFixed(2);

// async function addToCart() {
//   const product = {
//     name: productData.name,
//     price: productData.price,
//     quantity: 1
//   };

//   try {
//     const response = await fetch('http://localhost:3000/api/cart', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(product)
//     });
//     const data = await response.json();
//     if (response.ok) {
//       alert('Product added to cart!');
//       // window.location.href = 'cart.html'; // Uncomment to redirect
//     } else {
//       alert('Failed to add product: ' + data.error);
//     }
//   } catch (error) {
//     alert('Error adding to cart: ' + error.message);
//   }
// }

// scripts/include.js
document.addEventListener("DOMContentLoaded", () => {
  // Load header
  fetch("../partials/header.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("header").innerHTML = data;
    });

  // Load footer
  fetch("../partials/footer.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("footer").innerHTML = data;
    });
});