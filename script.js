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

function toggle(id) {
  document.getElementById(id).classList.toggle("hidden");
}

function selectConsole(v) {
  document.getElementById("console").value = v;
  updatePrice();
}

function updatePrice() {
  const c = document.getElementById("console").value;
  document.getElementById("total").innerText = PRICES[c] || 0;
}

function updatePaymentOptions() {
  const method = document.getElementById("method").value;
  const payment = document.getElementById("payment");

  payment.innerHTML = "";

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

function submitOrder() {

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const console = document.getElementById("console").value;
  const method = document.getElementById("method").value;
  const payment = document.getElementById("payment").value;

  const data = new URLSearchParams();
  data.append("name", name);
  data.append("email", email);
  data.append("console", console);
  data.append("method", method);
  data.append("payment", payment);

  fetch("YOUR_WEBAPP_URL", {
    method: "POST",
    body: data
  })
  .then(r => r.json())
  .then(res => {

    if (payment === "Card") {
      window.open("https://step.com/$/209_mv", "_blank");
    }

    window.location.href = "summary.html?order=" + res.orderId;
  })
  .catch(err => alert("Error"));
}
