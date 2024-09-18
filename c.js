function createOrder() {
    // Clear any existing order summary section
    const existingCheckout = document.querySelector(".checkout-section");
    if (existingCheckout) {
    existingCheckout.remove();
    }
    // creat order summary section
  const checkout = document.createElement("section");
  checkout.setAttribute("class", "checkout-section");
  mainContainer.appendChild(checkout);

  const checkoutHeader = document.createElement("h2");
  checkoutHeader.textContent = "Your order";
  checkout.appendChild(checkoutHeader);

  const oderDiv = document.createElement("div");
  oderDiv.setAttribute("class", "order");
  checkout.appendChild(oderDiv);

  for (let currentOrder of orderCheckout) {
    const orderItemDiv = document.createElement("div");
    orderItemDiv.setAttribute("class", "orderItem");
    oderDiv.appendChild(orderItemDiv);

    const oderItemNane = document.createElement("div");
    oderItemNane.setAttribute("class", "itemNane");
    orderItemDiv.appendChild(oderItemNane);

    const oderName = document.createElement("div");
    oderName.textContent = `${currentOrder.name}`;
    oderItemNane.appendChild(oderName);

    const removeOrder = document.createElement("button");
    removeOrder.setAttribute("id", `${currentOrder.name}`);
    removeOrder.addEventListener("click", () => {
      handleRemoveOrder(`${currentOrder.name}`);
    });
    removeOrder.textContent = "remove";
    oderItemNane.appendChild(removeOrder);

    const oderPrice = document.createElement("div");
    oderPrice.setAttribute("class", "itemPrice");
    oderPrice.textContent = `${currentOrder.price}`;
    orderItemDiv.appendChild(oderPrice);
  }

  const oderSummary = document.createElement("div");
  oderSummary.setAttribute("class", "orderItem");
  checkout.appendChild(oderSummary);

  const total = document.createElement("div");
  total.setAttribute("class", "summary");
  total.textContent = "Total";
  oderSummary.appendChild(total);

  const totalPrice = document.createElement("div");
  totalPrice.setAttribute("class", "summary");
  totalPrice.textContent = `$ ${getTotalPrice()} . 00`;
  oderSummary.appendChild(totalPrice);

  const completeOrderBtn = document.createElement("button");
  completeOrderBtn.textContent = "Complete order";
  completeOrderBtn.addEventListener("click", () => proceedToPayment());
  checkout.appendChild(completeOrderBtn);

  // hasNotCreateOrder = false
}