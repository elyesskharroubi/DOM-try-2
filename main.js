if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

let filterInput = document.querySelector("#search");
let products = document.querySelector(".productsContainer");
filterInput.addEventListener("keyup", (e) => {
  let text = e.target.value.toLowerCase();
  let items = products.getElementsByClassName("item");
  Array.from(items).forEach((e) => {
    let itemName = e.children[1].textContent;
    if (itemName.toLowerCase().indexOf(text) != -1) {
      e.style.display = "block";
    } else {
      e.style.display = "none";
    }
  });
});
function ready() {
  let removeCartBtns = document.getElementsByClassName("itemDelete");
  for (let i = 0; i < removeCartBtns.length; i++) {
    let button = removeCartBtns[i];
    button.addEventListener("click", removeCartItem);
  }
  let quantityInputs = document.getElementsByClassName("itemQuantity");
  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  let addToCartBtns = document.getElementsByClassName("buyButton");
  for (let i = 0; i < addToCartBtns.length; i++) {
    let button = addToCartBtns[i];
    button.addEventListener("click", addToCartClicked);
  }
}

const redHeart = (e) => e.classList.toggle("red");

function removeCartItem(e) {
  let buttonClicked = e.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function quantityChanged(e) {
  let input = e.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function addToCartClicked(e) {
  let button = e.target;
  let shopItem = button.parentElement.parentElement;
  let name = shopItem.querySelectorAll("h4")[0].innerHTML;
  let price = shopItem.getElementsByClassName("price")[0].innerHTML;
  addItemToCart(name, price);
  updateCartTotal();
}

function addItemToCart(name, price) {
  let cartItem = document.createElement("div");
  cartItem.classList.add("cartItem");
  let cartItems = document.getElementsByClassName("cartContainer")[0];
  let cartItemNames = cartItems.getElementsByClassName("itemName");
  for (let i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == name) {
      alert("You already added this item to the cart.");
      return;
    }
  }
  let cartItemContent = `
    <span class="itemName">${name}</span>
    <span class="itemPrice">${price}</span>
    <div>
        <input class="itemQuantity" type="number" value="1" />
        <button class="itemDelete">X</button>
    </div>
    `;
  cartItem.innerHTML = cartItemContent;
  cartItems.insertBefore(cartItem, cartItems.children[1]);

  cartItem
    .getElementsByClassName("itemDelete")[0]
    .addEventListener("click", removeCartItem);

  cartItem
    .getElementsByClassName("itemQuantity")[0]
    .addEventListener("change", quantityChanged);
}

function updateCartTotal() {
  let cartItemContainer = document.getElementsByClassName("cartContainer")[0];
  let cartItems = cartItemContainer.getElementsByClassName("cartItem");
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) {
    let cartItem = cartItems[i];
    let priceElement = cartItem.getElementsByClassName("itemPrice")[0];
    let quantityElement = cartItem.getElementsByClassName("itemQuantity")[0];
    let price = parseInt(priceElement.innerText.replace(" DT", ""));
    let quantity = quantityElement.value;
    total = total + price * quantity;
  }
  document.getElementsByClassName("totalPrice")[0].innerText = total + " DT";
}
