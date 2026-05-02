let selectedConsole = "";
let selectedService = "";
let selectedPayment = "";
let total = 0;

const PRICES = {
  "Old 3DS": 25,
  "Old 2DS": 25,
  "New 3DS": 35,
  "New 2DS XL": 35,
  "PSP 2000": 25,
  "PS Vita 1000": 35,
  "Wii U": 35
};

function updateTotal() {
  selectedConsole = document.getElementById("consoleSelect").value;
  total = PRICES[selectedConsole] || 0;
  document.getElementById("total").innerText = total;
}

function updatePaymentOptions() {
  selectedService = document.getElementById("serviceSelect").value;

  const box = document.getElementById("paymentOptions");
  box.innerHTML = "";

  if (selectedService === "Local Pickup") {
    box.innerHTML = `
      <button onclick="setPay('Cash')">Cash</button>
      <button onclick="setPay('Card')">Card</button>
    `;
  }

  if (selectedService === "Mail-in") {
    box.innerHTML = `<button onclick="setPay('Card')">Pay with Card</button>`;
  }
}

function setPay(m) {
  selectedPayment = m;
}

function submitOrder() {
  const data = new URLSearchParams();
  data.append("name", document.getElementById("name").value);
  data.append("email", document.getElementById("email").value);
  data.append("console", selectedConsole);
  data.append("service", selectedService);
  data.append("payment", selectedPayment);

  fetch("https://script.google.com/macros/s/AKfycbyuCUlA5PKOO3GoSjV2CXjpWK_B6ksc13j6AVtOw51mFZRsn2uni9FlSNM48kMKtn1o/exec", {
    method: "POST",
    body: data
  })
  .then(r => r.json())
  .then(res => {
    window.location.href = "track.html?order=" + res.orderId;
  });
}
