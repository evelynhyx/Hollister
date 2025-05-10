document.getElementById("loadCustomers").addEventListener("click", fetchCustomers)
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
}

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

const openBtn = document.getElementById("openSearchModal");
const closeBtn = document.getElementById("closeSearchModal");
const modal = document.getElementById("searchModal");

openBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});