let selectedConsole = "";
let selectedService = "";

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
}

function submitOrder() {
  if (!selectedConsole || !selectedService) {
    alert("Select console and service first");
    return;
  }

  const data = {
    name: document.getElementById("name").value,
    contact: document.getElementById("contact").value,
    console: selectedConsole,
    service: selectedService,
    status: "Pending"
  };

  fetch("YOUR_APPS_SCRIPT_URL_HERE", {
    method: "POST",
    body: JSON.stringify(data)
  })
  .then(res => res.text())
  .then(() => {
    alert("Order submitted successfully!");
  })
  .catch(err => {
    alert("Error submitting order");
    console.error(err);
  });
}
