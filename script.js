let selectedConsole = "";
let selectedMethod = "";
let selectedPayment = "";
let total = 0;

const PRICES = {
  "Old 3DS": 25,
  "Old 2DS": 25,
  "New 3DS": 35,
  "New 3DS XL": 35,
  "New 2DS XL": 35,
  "PSP 2000": 25,
  "PS Vita 1000": 35,
  "Wii U": 35
};

function updateConsole() {
  selectedConsole = document.getElementById("consoleSelect").value;
  total = PRICES[selectedConsole] || 0;
  document.getElementById("total").innerText = total;
}

function updateMethod() {
  selectedMethod = document.getElementById("methodSelect").value;

  const box = document.getElementById("paymentBox");
  box.innerHTML = "";
  selectedPayment = "";

  if (!selectedMethod) return;

  if (selectedMethod === "Mail-in") {
    box.innerHTML = `<button onclick="setPayment('Card')">Pay with Card</button>`;
  }

  if (selectedMethod === "Local Pickup") {
    box.innerHTML = `
      <button onclick="setPayment('Cash')">Cash</button>
      <button onclick="setPayment('Card')">Card</button>
    `;
  }
}

function setPayment(method) {
  selectedPayment = method;
  event.target.style.background = "#22c55e";
}

function submitOrder() {

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  if (!name) return alert("Enter name");
  if (!email) return alert("Enter email");
  if (!selectedConsole) return alert("Select console");
  if (!selectedMethod) return alert("Select method");
  if (!selectedPayment) return alert("Select payment");

  const data = new URLSearchParams();
  data.append("name", name);
  data.append("email", email);
  data.append("console", selectedConsole);
  data.append("method", selectedMethod);
  data.append("payment", selectedPayment);

  fetch("https://script.google.com/macros/s/AKfycby9WlMzerm-tqYvuiHySkP6hVMoKjbUew7_RNFaLZmz6oOS0iNjqki5ZkvAzfyQkRtb/exec", {
    method: "POST",
    body: data
  })
  .then(r => r.json())
  .then(res => {
    window.location.href = "track.html?order=" + res.orderId;
  })
  .catch(err => alert("Error submitting order"));
}
