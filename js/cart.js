/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
var table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
var cart;

function loadCart() {
  var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  var clearTbody = document.getElementsByTagName('tbody')[0];
  clearTbody.innerHTML='';
}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {

  // TODO: Find the table body
  var tBody = document.getElementsByTagName('tbody')[0];

  // TODO: Iterate over the items in the cart
  for (var i=0; i<cart.items.length;i++){
  // TODO: Create a TR
    var newRow = document.createElement('tr');
  // TODO: Create a TD for the delete link, quantity,  and the item
    var delCell = document.createElement('td');
    var quanCell = document.createElement('td');
    var itemCell = document.createElement('td');
    var itemImg = document.createElement('img');
  // TODO: Add the TR to the TBODY and each of the TD's to the TR
    delCell.textContent = 'X';
    delCell.id = i;
    quanCell.textContent = cart.items[i].quantity;
    var imgSrc;
    for (var a=0; a < Product.allProducts.length; a++){
      if(cart.items[i].product === Product.allProducts[a].name ){
        imgSrc = Product.allProducts[a].filePath;
      }
    }
    
    itemImg.src = imgSrc;
    itemImg.style = 'height:80px;'
    itemCell.appendChild(itemImg);
    newRow.appendChild(delCell);
    newRow.appendChild(quanCell);
    newRow.appendChild(itemCell);
    tBody.appendChild(newRow);
 }
  
}

function removeItemFromCart(event) {
  event.preventDefault();
  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  if (event.target.id !== ''){
    cart.removeItem(event.target.id);

  }
  console.log(event.target.id);
  // TODO: Save the cart back to local storage
  cart.saveToLocalStorage();
  // TODO: Re-draw the cart table
  renderCart();
}

// This will initialize the page and draw the cart on screen
renderCart();
function updateCounter() {
  var countEl = document.getElementById('itemCount');
  var count =0;
  for (var i=0; i<cart.items.length;i++){
    count += Number(cart.items[i].quantity);  
  }
  countEl.textContent = ' has ' + count + ' items';
}
updateCounter();