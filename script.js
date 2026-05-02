let selectedConsole = "";
let selectedService = "";
let selectedPayment = "";
let total = 0;

const PRICES = {
  "Old 3DS": 25,
  "Old 2DS": 25,
  "New 3DS": 35,
  "New 3DS XL": 35,
  "New 2DS XL": 35,
  "PSP 1000": 25,
  "PSP 2000": 25,
  "PSP 3000": 25,
  "PSP Go": 35,
  "PS Vita 1000": 35,
  "PS Vita 2000": 35,
  "Wii": 25,
  "Wii U": 35
};

function updateTotal() {
  const consoleVal = document.getElementById("consoleSelect").value;

  selectedConsole = consoleVal;
  total = PRICES[consoleVal] || 0;

  document.getElementById("total").innerText = total;
}

function updatePaymentOptions() {
  selectedService = document.getElementById("serviceSelect").value;

  const box = document.getElementById("paymentOptions");
  box.innerHTML = "";

  if (selectedService === "Mail-in") {
    box.innerHTML = `<button onclick="setPayment('Card')">Pay with Card</button>`;
  }

  if (selectedService === "Local Pickup") {
    box.innerHTML = `
      <button onclick="setPayment('Cash')">Cash</button>
      <button onclick="setPayment('Card')">Card</button>
    `;
  }
}

function setPayment(method) {
  selectedPayment = method;
}

function submitOrder() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!name || !email || !selectedConsole || !selectedService || !selectedPayment) {
    alert("Fill everything correctly");
    return;
  }

  const data = new URLSearchParams();
  data.append("name", name);
  data.append("email", email);
  data.append("console", selectedConsole);
  data.append("service", selectedService);
  data.append("payment", selectedPayment);

  fetch("https://script.google.com/macros/s/AKfycbx_Z6FZ_kxTmTC2ajjwVQ7Ox9EsxA1eBDrZmcvh9dVpgjINpBe92EX74EXyEYw0M-h3/exec", {
    method: "POST",
    body: data
  })
  .then(res => res.json())
  .then(res => showSuccess(res))
  .catch(err => {
    console.error(err);
    alert("Error submitting order");
  });
}

function showSuccess(res) {
  if (res.payment === "Cash") {
    document.body.innerHTML = `
      <h1>Order Confirmed</h1>
      <h2>${res.orderId}</h2>
      <h2>Total: $${res.total}</h2>
      <p>Pay in person (Cash)</p>
    `;
  } else {
    document.body.innerHTML = `
      <h1>Order Confirmed</h1>
      <h2>${res.orderId}</h2>
      <h2>Total: $${res.total}</h2>

      <a href="${res.paymentUrl}" target="_blank"
        style="padding:15px;background:#3a7bfd;color:white;border-radius:10px;text-decoration:none;">
        💳 Pay with Card
      </a>

      <p style="margin-top:15px;opacity:0.7;">
        Enter exactly $${res.total} when paying.
      </p>
    `;
  }
}
