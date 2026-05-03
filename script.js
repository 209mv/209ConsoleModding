
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
// CONSOLE SELECTION SYSTEM
// -----------------------------

function selectConsole(value) {
  document.getElementById("console").value = value;
  updatePrice();
}


// -----------------------------
// PRICE UPDATE
// -----------------------------

function updatePrice() {
  const c = document.getElementById("console").value;
  document.getElementById("total").innerText = PRICES[c] || 0;
}


// -----------------------------
// PAYMENT OPTIONS (RULES)
// -----------------------------

function updatePaymentOptions() {

  const method = document.getElementById("method").value;
  const payment = document.getElementById("payment");

  payment.innerHTML = `<option value="">Payment</option>`;

  if (method === "Mail-in") {
    payment.innerHTML += `<option value="Card">Card (Required)</option>`;
  }

  if (method === "Local Pickup") {
    payment.innerHTML += `
      <option value="Cash">Cash</option>
      <option value="Card">Card</option>
    `;
  }
}


// -----------------------------
// SUBMIT ORDER (FULL FLOW FIXED)
// -----------------------------

function submitOrder() {

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const console = document.getElementById("console").value;
  const method = document.getElementById("method").value;
  const payment = document.getElementById("payment").value;

  if (!name || !email || !console || !method || !payment) {
    alert("Please fill all fields");
    return;
  }

  const data = new URLSearchParams();
  data.append("name", name);
  data.append("email", email);
  data.append("console", console);
  data.append("method", method);
  data.append("payment", payment);

  fetch("https://script.google.com/macros/s/AKfycbzlZM8Ehv7guuRnE-q0HHe7BUD0B8HOkq01LdZcYMfqNM2iv1vAmqoQDn8zj7FRg88E/exec", {
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
      alert("Order failed (no ID returned)");
      return;
    }

    // CARD PAYMENT FLOW
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
