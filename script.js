let step = 1;

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

/* STEP CONTROL WITH VALIDATION */
function nextStep(n) {

  if (step === 1) {
    if (!document.getElementById("name").value ||
        !document.getElementById("email").value) {
      alert("Enter name and email");
      return;
    }
  }

  if (step === 2 && !selectedConsole) {
    alert("Select a console");
    return;
  }

  if (step === 3 && !selectedService) {
    alert("Select service type");
    return;
  }

  document.getElementById("step" + step).classList.remove("active");
  step = n;
  document.getElementById("step" + step).classList.add("active");

  if (step === 4) updateSummary();
}

/* PRICE */
function updateTotal() {
  const val = document.getElementById("consoleSelect").value;
  selectedConsole = val;
  total = PRICES[val] || 0;
  document.getElementById("total").innerText = total;
}

/* PAYMENT OPTIONS */
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

/* SAFE PAYMENT SETTER */
function setPayment(method) {
  selectedPayment = method;
}

/* SUMMARY */
function updateSummary() {
  document.getElementById("summary").innerText =
`Console: ${selectedConsole}
Service: ${selectedService}
Payment: ${selectedPayment}
Total: $${total}`;
}

/* SUBMIT */
function submitOrder() {

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  const data = new URLSearchParams();
  data.append("name", name);
  data.append("email", email);
  data.append("console", selectedConsole);
  data.append("service", selectedService);
  data.append("payment", selectedPayment);

  fetch("https://script.google.com/macros/s/AKfycbx26EGwkNOP2R6za22cXSr-GgKIqfEFOuhq51QsO2n5w2WN6ziRwEEhTSel9202GSpV/exec", {
    method: "POST",
    body: data
  })
  .then(res => res.json())
  .then(res => {

    document.body.innerHTML = `
      <h1>Order Confirmed</h1>
      <h2>${res.orderId}</h2>
      <h2>Total: $${res.total}</h2>

      <a href="${res.paymentUrl}" target="_blank"
        style="padding:12px;background:#3a7bfd;color:white;text-decoration:none;">
        Pay with Card
      </a>
    `;

  });
}
