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

  updatePaymentOptions(type);
}

function updatePaymentOptions(service) {
  const box = document.getElementById("paymentOptions");
  box.innerHTML = "";

  if (service === "Mail-in") {
    box.innerHTML = `
      <button onclick="setPayment('QR Code')">💳 QR Code Only</button>
    `;
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
  if (!selectedConsole || !selectedService || !selectedPayment) {
    alert("Please complete all fields.");
    return;
  }

  const data = {
    name: document.getElementById("name").value,
    contact: document.getElementById("contact").value,
    console: selectedConsole,
    service: selectedService,
    payment: selectedPayment,
    status: "Pending"
  };

  fetch("YOUR_APPS_SCRIPT_URL_HERE", {
    method: "POST",
    body: JSON.stringify(data)
  })
  .then(() => {
    alert("Order submitted successfully!");
  })
  .catch(err => {
    alert("Error submitting order");
    console.error(err);
  });
}
