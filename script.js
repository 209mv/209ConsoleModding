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

function updatePrice() {
  const c = document.getElementById("console").value;
  document.getElementById("total").innerText = PRICES[c] || 0;
}

function submitOrder() {

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const console = document.getElementById("console").value;
  const method = document.getElementById("method").value;
  const payment = document.getElementById("payment").value;

  if (!name || !email || !console || !method || !payment) {
    alert("Fill all fields");
    return;
  }

  const data = new URLSearchParams();
  data.append("name", name);
  data.append("email", email);
  data.append("console", console);
  data.append("method", method);
  data.append("payment", payment);

  fetch("https://script.google.com/macros/s/AKfycbzxqt2JvH15YV8vMylzSvAeQ-XUQcU-GxFj8g44FA6ZJgHAFgutdWBq2UrdPGnYYbba/exec", {
    method: "POST",
    body: data
  })
  .then(r => r.json())
  .then(res => {

    // card redirect
    if (payment === "Card") {
      window.open("https://step.com/$/209_mv", "_blank");
    }

    window.location.href = "summary.html?order=" + res.orderId;
  })
  .catch(err => alert("Error submitting order"));
}
