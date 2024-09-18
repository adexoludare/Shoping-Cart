import { menuArray } from "./data.js";

const menuId = Object.keys(menuArray);
const orderCheckout = [];
// let hasNotCreateOrder = true

const mainContainer = document.getElementById("main-containner");
const paymentForm = document.getElementById("paymentForm");

paymentForm.addEventListener('submit', (e)=>{
  e.preventDefault()
  handelFormSubmit()
})

// Loop through the menuArray and create a menu item for each item
menuArray.map((menuItem) => {
  createMenuList(menuItem);
});

function createMenuList(item) {
  // Create a menu item container div
  const menuItem = document.createElement("div");
  menuItem.setAttribute("class", "item");

  // create a menu item image
  const div = document.createElement("div");
  div.setAttribute("class", "item-image");
  div.textContent = item.emoji;
  menuItem.appendChild(div);

  const itemBody = document.createElement("div");
  itemBody.setAttribute("class", "item-body");
  menuItem.appendChild(itemBody);

  // create a menu item title
  const title = document.createElement("h3");
  title.textContent = item.name;
  itemBody.appendChild(title);

  // create a menu item description
  const description = document.createElement("p");
  description.textContent = item.ingredients.join(", ");
  itemBody.appendChild(description);

  // create a menu item price
  const price = document.createElement("p");
  price.setAttribute("class", "price");
  price.textContent = `$${item.price}`;
  itemBody.appendChild(price);

  // create a add to cart button
  const btn = document.createElement("button");
  btn.setAttribute("id", `${item.id}`);
  btn.textContent = "+";
  btn.addEventListener("click", () => handelAddItem(item.id));
  menuItem.appendChild(btn);

  // append the menu item to the body
  mainContainer.appendChild(menuItem);
}

function handelAddItem(i) {
  const myOrder = menuArray.filter((oder) => {
    return oder.id == i ? oder.id == i : null;
  });
  orderCheckout.includes(...myOrder)
    ? alert("item already added")
    : orderCheckout.push(...myOrder);

  // console.log(orderCheckout[0].name)

  setTimeout(() => {
    // hasNotCreateOrder ? createOrder() :clear()
    createOrder();
  }, 300);
}

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
}

function getTotalPrice() {
  const totalPrice = orderCheckout.reduce((total, currentPrice) => {
    return total + currentPrice.price;
  }, 0);
  return totalPrice;
}

function handleRemoveOrder(name) {
  // Remove the order item with the given name
  const index = orderCheckout.findIndex((item) => item.name === name);
  if (index !== -1) {
    orderCheckout.splice(index, 1);
  }

  // Re-render the order summary
  orderCheckout.length == 0 ? history.go(0) : createOrder();
}

function proceedToPayment() {
  paymentForm.classList.add("completeOrder");
}

function handelFormSubmit(){
  paymentForm.classList.remove("completeOrder");

  const successMessage = document.createElement('div')
  successMessage.setAttribute('class',"orderSuccess")
  successMessage.textContent = "Thanks, Your order is on its way!"
  mainContainer.appendChild(successMessage)
}
// history.go(0) reload the page
