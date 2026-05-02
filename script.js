let selectedConsole = "";
let selectedService = "";
let selectedPayment = "";

// Toggle console categories
function toggle(el) {
  el.classList.toggle("open");
}

// Select console
function selectConsole(name) {
  selectedConsole = name;
  document.getElementById("console").innerText = name;
}

// Set service + update payment options
function setService(type) {
  selectedService = type;
  document.getElementById("service").innerText = type;

  updatePaymentOptions(type);
}

// Dynamic payment options
function updatePaymentOptions(service) {
  const box = document.getElementById("paymentOptions");
  box.innerHTML = "";
  selectedPayment = "";
  document.getElementById("payment").innerText = "None";

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

// Set payment method
function setPayment(method) {
  selectedPayment = method;
  document.getElementById("payment").innerText = method;
}

// Submit order to Apps Script backend
function submitOrder() {
  const name = document.getElementById("name").value;
  const contact = document.getElementById("contact").value;

  // basic validation
  if (!name || !contact || !selectedConsole || !selectedService || !selectedPayment) {
    alert("Please complete all fields.");
    return;
  }

  const data = {
    name: name,
    contact: contact,
    console: selectedConsole,
    service: selectedService,
    payment: selectedPayment,
    status: "Pending"
  };

  fetch("https://script.google.com/macros/s/AKfycbyKGMTA4HfBijE6VhSfwQ-sNafopyBXw29ZZkYoHyyfFTSYMtoAWZcKjeQnD5tCFrtq/exec", {
    method: "POST",
    body: JSON.stringify(data)
  })
  .then(res => res.text())
  .then(res => {
    console.log("Server response:", res);
    alert("Order submitted successfully!");
  })
  .catch(err => {
    console.error("Submission error:", err);
    alert("Error submitting order");
  });
}
