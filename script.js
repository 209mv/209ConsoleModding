
const PRICES = {
  "Old 3DS": 25,
  "Old 3DS XL": 25,
  "New 3DS": 35,
  "New 3DS XL": 35,

  "Old 2DS": 25,
  "New 2DS XL": 35,

  "DS": 20,

  "Wii (GameCube Ports)": 35,
  "Wii (No GameCube Ports)": 30,
  "Wii Mini": 25,

  "Wii U": 35,

  "PSP 1000": 25,
  "PSP 2000": 25,
  "PSP 3000": 25,
  "PSP Go": 30,

  "PS Vita 1000": 35,
  "PS Vita 2000": 35
};



// -----------------------------
// CONSOLE SYSTEM
// -----------------------------

function selectConsole(value) {
  document.getElementById("console").value = value;
  updatePrice();
}



// -----------------------------
// PRICE SYSTEM
// -----------------------------

function updatePrice() {
  const c = document.getElementById("console").value;
  document.getElementById("total").innerText = PRICES[c] || 0;
}



// -----------------------------
// METHOD + PAYMENT (CLICK UI)
// -----------------------------

function selectMethod(value) {
  document.getElementById("method").value = value;
  renderPaymentOptions(value);
}

function renderPaymentOptions(method) {

  const box = document.getElementById("paymentOptions");
  box.innerHTML = "";

  // reset payment
  document.getElementById("payment").value = "";

  if (method === "Mail-in") {
    box.innerHTML = `
      <div class="btn" onclick="selectPayment('Card')">
        Card (Required)
      </div>
    `;
  }

  if (method === "Local Pickup") {
    box.innerHTML = `
      <div class="btn" onclick="selectPayment('Cash')">Cash</div>
      <div class="btn" onclick="selectPayment('Card')">Card</div>
    `;
  }
}

function selectPayment(value) {
  document.getElementById("payment").value = value;
}



// -----------------------------
// ORDER SUBMIT (FULL SAFE FLOW)
// -----------------------------

function submitOrder() {

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const console = document.getElementById("console").value;
  const method = document.getElementById("method").value;
  const payment = document.getElementById("payment").value;

  if (!name || !email || !console || !method || !payment) {
    alert("Please complete all fields");
    return;
  }

  const data = new URLSearchParams();
  data.append("name", name);
  data.append("email", email);
  data.append("console", console);
  data.append("method", method);
  data.append("payment", payment);

  fetch("https://script.google.com/macros/s/AKfycbwwgVD5KWy7g2I6MoGtWBnsF1TVF_RdXyFwhq6RO0tLRjLEH5qu79nT9XzjDPF6bvRc/exec", {
    method: "POST",
    body: data
  })
  .then(r => r.text())
  .then(text => {

    let res;
    try {
      res = JSON.parse(text);
    } catch (e) {
      alert("Server error");
      return;
    }

    const orderId = res.orderId;

    if (!orderId) {
      alert("Order failed (no ID)");
      return;
    }

    // STEP PAYMENT FLOW
    if (payment === "Card") {
      window.open("https://step.com/$/209_mv", "_blank");
    }

    // ALWAYS GO TO SUMMARY
    setTimeout(() => {
      window.location.href = "summary.html?order=" + orderId;
    }, 600);

  })
  .catch(err => {
    console.log(err);
    alert("Submission failed");
  });
}
