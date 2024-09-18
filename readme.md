# Shopping Cart
![Shopping Cart Menu](/images/menu.PNG)
This app simulate the a e-commerce site where you can order food online.
This project is aimed at learning some advance html, javascript and css skill needed to build good frontend app.

## How to Access

To access this app directly online click [here](#)
. or
locally on your system no installation is required just clone the repo and open the index.html with your web browser or open the whole folder with your prefer text editor and the index.html with live server.

## How to use
Select item of your choice by clicking on the + button to add it to the cart, a preview of your selected items with the price of and the total price of the selected items will be display. you can as well remove any item from the checkout list by clicking on the remove button beside the name of the item you want to remove.

![Checkout Preview](/images/checkout.PNG)
click on Complete order to procee to payment portal.
![make payment](/images/payment.PNG)
enter your card detail and click on pay

## How it works
The menu item is fetch from the array of object imported from data.js using map methods of the array to fetch each item and pass as argument to a createMenuList function to create and render the menu on the dom.
```javascript
import { menuArray } from "./data.js";

// Loop through the menuArray and create a menu item for each item
menuArray.map((menuItem) => {
  createMenuList(menuItem);
});

```
when a + button is clicked the event Listener added respond to the clicke event by calling on handelAddItem function and the handelAddItem( ) use filter method to grab the Id of item clicked and push it the array that hold users order. if the item is alread in the users checkout, "item already added" is alerted. finaly createOrder function is called after some seconds of delay needed for orderCheckout to have a stable element.
```js
function handelAddItem(i) {
  const myOrder = menuArray.filter((oder) => {
    return oder.id == i ? oder.id == i : null;
  });
  orderCheckout.includes(...myOrder)
    ? alert("item already added")
    : orderCheckout.push(...myOrder);

  setTimeout(() => {
    createOrder();
  }, 300);
}
```
the reduce method is applied on orderCheckout to calcule the total price of all items selected by the user encapusule in a function called getTotalPrice( )
```js
function getTotalPrice() {
  const totalPrice = orderCheckout.reduce((total, currentPrice) => {
    return total + currentPrice.price;
  }, 0);
  return totalPrice;
}
```
when a remove button is clicked on Your order preview, the splice method is used to remove the selected item from the orderCheckout array and then call the createOrder function re-create and render the Your order preview. if their is no more item remaining orderCheckout the page is refresh.
```js
function handleRemoveOrder(name) {
  // Remove the order item with the given name
  const index = orderCheckout.findIndex((item) => item.name === name);
  if (index !== -1) {
    orderCheckout.splice(index, 1);
  }

  // Re-render the order summary
  orderCheckout.length == 0 ? history.go(0) : createOrder();
}
```

### Contact

Adedipupo OLudare A - adexoludare@gmail.com

Project Link: https://github.com/adexoludare/