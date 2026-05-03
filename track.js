
const API_URL =
  "https://script.google.com/macros/s/AKfycbwwgVD5KWy7g2I6MoGtWBnsF1TVF_RdXyFwhq6RO0tLRjLEH5qu79nT9XzjDPF6bvRc/exec";

async function fetchOrders() {

  const res = await fetch(API_URL);
  const data = await res.json();

  const orderId = document.getElementById("orderInput").value.trim();

  const order = data.find(o => o.orderId === orderId);

  if (!order) {
    document.getElementById("result").innerHTML = "Order not found";
    return;
  }

  const color =
    order.status === "Done" ? "green" :
    order.status === "Processing" ? "blue" :
    order.status === "Pending" ? "orange" :
    "purple";

  document.getElementById("result").innerHTML = `
    <h2>${order.orderId}</h2>
    <p><b>Console:</b> ${order.console}</p>
    <p><b>Price:</b> $${order.price}</p>
    <p><b>Status:</b> <span style="color:${color}">${order.status}</span></p>
  `;
}

// LIVE UPDATE (NO REFRESH)
setInterval(fetchOrders, 5000);

// AUTO LOAD FROM EMAIL LINK
window.onload = async function () {

  const params = new URLSearchParams(window.location.search);
  const orderId = params.get("order");

  if (!orderId) return;

  document.getElementById("orderInput").value = orderId;

  await fetchOrders();
};
