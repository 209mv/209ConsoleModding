let selectedConsole = "";
let selectedService = "";
let selectedPayment = "";

function toggle(el) {
  el.classList.toggle("open");
}

function selectConsole(name) {
  selectedConsole = name;
  document.getElementById("console").innerText = name;
}

function setService(type) {
  selectedService = type;
  document.getElementById("service").innerText = type;

  updatePayment(type);
}

function updatePayment(service) {
  const box = document.getElementById("paymentOptions");
  box.innerHTML = "";
  selectedPayment = "";
  document.getElementById("payment").innerText = "None";

  if (service === "Mail-in") {
    box.innerHTML = `<button onclick="setPayment('QR Code')">💳 QR Only</button>`;
  }

  if (service === "Local Pickup") {
    box.innerHTML = `
      <button onclick="setPayment('Cash')">💵 Cash</button>
      <button onclick="setPayment('QR Code')">💳 QR Code</button>
    `;
  }
}

function setPayment(method) {
  selectedPayment = method;
  document.getElementById("payment").innerText = method;
}

function submitOrder() {
  const name = document.getElementById("name").value;
  const contact = document.getElementById("contact").value;

  if (!name || !contact || !selectedConsole || !selectedService || !selectedPayment) {
    alert("Fill all fields");
    return;
  }

  const formData = new URLSearchParams();
  formData.append("name", name);
  formData.append("contact", contact);
  formData.append("console", selectedConsole);
  formData.append("service", selectedService);
  formData.append("payment", selectedPayment);

  fetch("https://script.google.com/macros/s/AKfycbxwTR1AjNkQRJtc7MWnzO-a5VbNCvXRN2Jt2NpRgiEiclZQTLSvQHgMQEUblnKzleTa/exec", {
    method: "POST",
    body: formData
  })
  .then(res => res.text())
  .then(res => {
    console.log(res);
    alert("Order submitted!");
  })
  .catch(err => {
    console.error(err);
    alert("Error submitting order");
  });
}
