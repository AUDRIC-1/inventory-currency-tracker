let products = [];

document.getElementById("productForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const price = parseFloat(document.getElementById("price").value);
  const quantity = parseInt(document.getElementById("quantity").value);

  const product = { name, price, quantity, converted: null };
  products.push(product);
  updateTable();
  this.reset();
});

function updateTable() {
  const tbody = document.querySelector("#productTable tbody");
  tbody.innerHTML = "";

  products.forEach((product) => {
    const totalValue = product.price * product.quantity;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${product.name}</td>
      <td>${product.price} RWF</td>
      <td>${product.quantity}</td>
      <td>${totalValue.toFixed(2)} RWF</td>
      <td>${product.converted ? product.converted : "-"}</td>
    `;
    tbody.appendChild(row);
  });
}

document.getElementById("convertBtn").addEventListener("click", async function () {
  const targetCurrency = document.getElementById("currencySelect").value;
  const url = `https://v6.exchangerate-api.com/v6/5109736d5b64454811009a71/latest/RWF`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const rate = data.conversion_rates[targetCurrency];

    products = products.map((p) => ({
      ...p,
      converted: `${(p.price * rate).toFixed(2)} ${targetCurrency}`,
    }));

    updateTable();
  } catch (error) {
    alert("Error fetching exchange rates. Try again later.");
    console.error(error);
  }
});
